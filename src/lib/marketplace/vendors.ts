// Vendor accounts. A vendor proves it works at the company by signing in with an address on the
// company's own domain, then an editor approves the claim. A claimed page can carry a short set of
// vendor-supplied fields. Those fields are labeled as vendor-supplied wherever they appear, and
// nothing a vendor does can touch reviews, scores, rank or badges.

import { emailDomain, isWorkEmail, type User } from './auth';
import type { Doc, Store } from './store';

export interface ProductRef {
  id: string;
  /** Host of the vendor's website, for example "example.com". */
  vendorDomain: string;
}

export interface Claim extends Doc {
  userId: string;
  productId: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  decidedAt?: string;
  decidedBy?: string;
  note?: string;
}

/** The only fields a vendor can set. Each is shown with the label "Supplied by the vendor". */
export const VENDOR_FIELDS = {
  vendorSummary: { max: 600, url: false },
  pricingNote: { max: 300, url: false },
  demoUrl: { max: 300, url: true },
  supportUrl: { max: 300, url: true },
} as const;
export type VendorField = keyof typeof VENDOR_FIELDS;

export interface VendorProfile extends Doc {
  /** Product id. */
  fields: Partial<Record<VendorField, string>>;
  label: 'vendor-supplied';
  updatedBy: string;
  updatedAt: string;
  history: { at: string; by: string; fields: Partial<Record<VendorField, string>> }[];
}

const hostOf = (domain: string) => domain.replace(/^www\./, '').toLowerCase();

/** True when the address is on the vendor's domain or one of its subdomains. */
export function emailMatchesVendor(email: string, vendorDomain: string): boolean {
  const mail = emailDomain(email);
  const vendor = hostOf(vendorDomain);
  return isWorkEmail(email) && (mail === vendor || mail.endsWith(`.${vendor}`));
}

export function requestClaim(store: Store, user: User, product: ProductRef, now = new Date()): { claim?: Claim; error?: string } {
  if (!emailMatchesVendor(user.email, product.vendorDomain)) {
    return { error: 'Sign in with an email address on the vendor company\'s own domain to claim this page.' };
  }
  const id = `${user.id}:${product.id}`;
  const existing = store.get<Claim>('claims', id);
  if (existing && existing.status !== 'rejected') return { claim: existing };
  const claim = store.put<Claim>('claims', {
    id,
    userId: user.id,
    productId: product.id,
    status: 'pending',
    requestedAt: now.toISOString(),
  });
  return { claim };
}

/** An editor approves or rejects a claim. The reason is kept. */
export function decideClaim(
  store: Store,
  claimId: string,
  decision: 'approved' | 'rejected',
  editor: string,
  note: string,
  now = new Date(),
): Claim | null {
  const claim = store.get<Claim>('claims', claimId);
  if (!claim || claim.status !== 'pending' || !editor.trim() || !note.trim()) return null;
  return store.put<Claim>('claims', { ...claim, status: decision, decidedBy: editor, decidedAt: now.toISOString(), note });
}

export function isApprovedVendor(store: Store, userId: string, productId: string): boolean {
  return store.get<Claim>('claims', `${userId}:${productId}`)?.status === 'approved';
}

export function validateVendorFields(input: Record<string, unknown>): { ok: Partial<Record<VendorField, string>>; errors: string[] } {
  const ok: Partial<Record<VendorField, string>> = {};
  const errors: string[] = [];
  for (const [key, raw] of Object.entries(input)) {
    const rule = VENDOR_FIELDS[key as VendorField];
    if (!rule) {
      errors.push(`"${key}" is not a field vendors can edit.`);
      continue;
    }
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (!value) continue;
    if (value.length > rule.max) errors.push(`${key} is longer than ${rule.max} characters.`);
    else if (/[<>]/.test(value)) errors.push(`${key} cannot contain HTML.`);
    else if (rule.url && !/^https:\/\/[^\s]+$/.test(value)) errors.push(`${key} must be a link starting with https://.`);
    else ok[key as VendorField] = value;
  }
  return { ok, errors };
}

export function saveVendorFields(
  store: Store,
  user: User,
  productId: string,
  input: Record<string, unknown>,
  now = new Date(),
): { profile?: VendorProfile; errors: string[] } {
  if (!isApprovedVendor(store, user.id, productId)) return { errors: ['This account has no approved claim on the product.'] };
  const { ok, errors } = validateVendorFields(input);
  if (errors.length || !Object.keys(ok).length) return { errors: errors.length ? errors : ['Nothing to save.'] };
  const old = store.get<VendorProfile>('vendorProfiles', productId);
  const at = now.toISOString();
  const profile = store.put<VendorProfile>('vendorProfiles', {
    id: productId,
    fields: { ...old?.fields, ...ok },
    label: 'vendor-supplied',
    updatedBy: user.id,
    updatedAt: at,
    history: [...(old?.history ?? []), { at, by: user.id, fields: ok }],
  });
  return { profile, errors: [] };
}
