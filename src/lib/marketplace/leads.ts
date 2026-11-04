// Quote and demo requests. The visitor ticks an unticked box that names the vendor, the request goes
// to that vendor only, and the exact consent wording is stored with the request.

import { normalizeEmail, sha256 } from './auth';
import type { Doc, Store } from './store';
import { isApprovedVendor } from './vendors';

export const LEAD_NOTICE_VERSION = '2026-11-draft';
export const LEADS_PER_EMAIL_PER_DAY = 3;

export interface LeadInput {
  requestType: 'quote' | 'demo';
  productId: string;
  productName: string;
  vendorName: string;
  name: string;
  email: string;
  company: string;
  message: string;
  /** Must be exactly true. The form never ticks it for the visitor. */
  consent: boolean;
  /** Hidden field; real visitors leave it empty. */
  website?: string;
}

export interface Lead extends Doc {
  requestType: LeadInput['requestType'];
  recipientProductId: string;
  recipientVendor: string;
  name: string;
  email: string;
  company: string;
  message: string;
  consentText: string;
  noticeVersion: string;
  createdAt: string;
  status: 'queued' | 'delivered';
  deliveredAt?: string;
}

export function consentText(vendorName: string, productName: string): string {
  return `I agree that B2BRated sends my name, work email, company and message to ${vendorName} so that they can contact me about ${productName}. B2BRated does not pass them to anyone else.`;
}

export function submitLead(store: Store, input: LeadInput, now = new Date()): { lead?: Lead; errors: string[] } {
  if (input.website) return { errors: ['Request not accepted.'] };
  const errors: string[] = [];
  const email = normalizeEmail(input.email ?? '');
  if (input.consent !== true) errors.push('Tick the box to agree before sending.');
  if (!email) errors.push('Enter a valid email address.');
  if (!input.name?.trim()) errors.push('Enter your name.');
  if (!input.company?.trim()) errors.push('Enter your company.');
  const message = input.message?.trim() ?? '';
  if (message.length < 10 || message.length > 2000) errors.push('Write a message of 10 to 2000 characters.');
  if (input.requestType !== 'quote' && input.requestType !== 'demo') errors.push('Choose quote or demo.');
  if (!input.productId || !input.vendorName || !input.productName) errors.push('The product is missing.');
  if (errors.length || !email) return { errors };

  const dayAgo = now.getTime() - 86_400_000;
  const mine = store.list<Lead>('leads', (l) => sha256(l.email) === sha256(email) && Date.parse(l.createdAt) > dayAgo);
  if (mine.length >= LEADS_PER_EMAIL_PER_DAY) return { errors: ['Too many requests from this address today. Try again tomorrow.'] };

  const lead = store.put<Lead>('leads', {
    id: crypto.randomUUID(),
    requestType: input.requestType,
    recipientProductId: input.productId,
    recipientVendor: input.vendorName,
    name: input.name.trim(),
    email,
    company: input.company.trim(),
    message,
    consentText: consentText(input.vendorName, input.productName),
    noticeVersion: LEAD_NOTICE_VERSION,
    createdAt: now.toISOString(),
    status: 'queued',
  });
  return { lead, errors: [] };
}

/** Only an approved vendor of the named product sees its requests. */
export function leadsForVendor(store: Store, userId: string, productId: string): Lead[] {
  if (!isApprovedVendor(store, userId, productId)) return [];
  return store.list<Lead>('leads', (l) => l.recipientProductId === productId);
}

export function markDelivered(store: Store, leadId: string, now = new Date()): Lead | null {
  const lead = store.get<Lead>('leads', leadId);
  return lead ? store.put<Lead>('leads', { ...lead, status: 'delivered', deliveredAt: now.toISOString() }) : null;
}

/** Erasure on request: removes every request tied to the address. Returns how many were removed. */
export function eraseLeads(store: Store, rawEmail: string): number {
  const email = normalizeEmail(rawEmail);
  if (!email) return 0;
  const found = store.list<Lead>('leads', (l) => l.email === email);
  for (const lead of found) store.remove('leads', lead.id);
  return found.length;
}
