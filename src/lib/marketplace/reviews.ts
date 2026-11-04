// Review rules. They follow /review-guidelines and the FTC rule on reviews: a review is checked,
// moderated by written rule, never hidden because of its rating, and a vendor can reply or flag
// but cannot edit or delete. Incentives are disclosed and cannot depend on the rating.

import { emailDomain, isWorkEmail, type User } from './auth';
import type { Doc, Store } from './store';
import { emailMatchesVendor, isApprovedVendor, type ProductRef } from './vendors';

export const USAGE_LENGTHS = ['under 1 month', '1 to 6 months', '6 to 12 months', '1 to 2 years', 'over 2 years'] as const;

/** Reasons a review may be rejected or removed. There is deliberately no code for a low rating. */
export const REASON_CODES = {
  'not-own-experience': 'Not written from the reviewer\'s own experience',
  'vendor-written': 'Written by the vendor, its staff or its agency without saying so',
  'paid-for-rating': 'Paid or rewarded for a required rating',
  copied: 'Copied from another site',
  'machine-written': 'Written by software and presented as a person\'s own experience',
  abuse: 'Personal attack, threat, hate speech or private data about others',
  duplicate: 'Duplicate of another review by the same reviewer',
  'cannot-verify': 'Reviewer could not be verified',
} as const;
export type ReasonCode = keyof typeof REASON_CODES;

export type Verification = 'work-email' | 'proof-of-use' | 'unverified';
export type ReviewStatus = 'pending' | 'published' | 'rejected' | 'removed';

export interface ReviewInput {
  rating: number;
  title: string;
  usedFor: string;
  pros: string;
  cons: string;
  role: string;
  companySize: string;
  usageLength: (typeof USAGE_LENGTHS)[number];
  /** The reviewer confirms the text is their own experience. Never pre-ticked. */
  ownExperience: boolean;
  incentive: { kind: 'none' } | { kind: 'vendor-invited' } | { kind: 'reward'; description: string; dependsOnRating: boolean };
}

export interface Review extends Doc {
  productId: string;
  userId: string;
  input: ReviewInput;
  verification: Verification;
  status: ReviewStatus;
  createdAt: string;
  log: { at: string; by: string; action: string; reason?: ReasonCode; note?: string }[];
  reply?: { text: string; by: string; at: string; history: { text: string; at: string }[] };
  flags: { at: string; by: string; note: string }[];
}

const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export function validateReview(input: Partial<ReviewInput> & Record<string, unknown>): string[] {
  const errors: string[] = [];
  if (!Number.isInteger(input.rating) || (input.rating as number) < 1 || (input.rating as number) > 5) errors.push('Choose a rating from 1 to 5.');
  if (text(input.title).length < 5 || text(input.title).length > 120) errors.push('Give the review a title of 5 to 120 characters.');
  for (const key of ['usedFor', 'pros', 'cons'] as const) {
    const n = text(input[key]).length;
    if (n < 30 || n > 3000) errors.push(`${key === 'usedFor' ? 'What you used it for' : key === 'pros' ? 'What worked' : 'What did not work'} needs 30 to 3000 characters.`);
  }
  if (!text(input.role)) errors.push('Say what your role is.');
  if (!text(input.companySize)) errors.push('Say how large your company is.');
  if (!USAGE_LENGTHS.includes(input.usageLength as (typeof USAGE_LENGTHS)[number])) errors.push('Say how long you have used the product.');
  if (input.ownExperience !== true) errors.push('Confirm that the review describes your own experience.');
  const inc = input.incentive as ReviewInput['incentive'] | undefined;
  if (!inc || !['none', 'vendor-invited', 'reward'].includes(inc.kind)) errors.push('Say whether you were invited or rewarded.');
  else if (inc.kind === 'reward') {
    if (!text(inc.description)) errors.push('Describe the reward you received.');
    if (inc.dependsOnRating !== false) errors.push('A reward that depends on the rating cannot be accepted.');
  }
  return errors;
}

export function submitReview(
  store: Store,
  user: User,
  product: ProductRef,
  input: ReviewInput,
  now = new Date(),
): { review?: Review; errors: string[] } {
  const errors = validateReview(input as ReviewInput & Record<string, unknown>);
  if (errors.length) return { errors };
  if (emailMatchesVendor(user.email, product.vendorDomain)) {
    return { errors: ['Staff of the vendor cannot review its product. Use the vendor reply tools instead.'] };
  }
  const yearAgo = now.getTime() - 365 * 86_400_000;
  const earlier = store.list<Review>('reviews', (r) => r.userId === user.id && r.productId === product.id && r.status !== 'rejected' && Date.parse(r.createdAt) > yearAgo);
  if (earlier.length) return { errors: ['You have already reviewed this product in the past year.'] };

  const at = now.toISOString();
  const review = store.put<Review>('reviews', {
    id: crypto.randomUUID(),
    productId: product.id,
    userId: user.id,
    input,
    verification: isWorkEmail(user.email) ? 'work-email' : 'unverified',
    status: 'pending',
    createdAt: at,
    log: [{ at, by: 'system', action: 'submitted' }],
    flags: [],
  });
  return { review, errors: [] };
}

/** A person with proof of use (shown to staff, not stored here) can raise an unverified review to proof-of-use. */
export function markProofChecked(store: Store, reviewId: string, moderator: string, now = new Date()): Review | null {
  const review = store.get<Review>('reviews', reviewId);
  if (!review || !moderator.trim()) return null;
  return store.put<Review>('reviews', { ...review, verification: 'proof-of-use', log: [...review.log, { at: now.toISOString(), by: moderator, action: 'proof-checked' }] });
}

export type Decision =
  | { action: 'publish' }
  | { action: 'reject' | 'remove'; reason: ReasonCode; note?: string };

/** Moderation always names who decided and, for reject or remove, a written rule. */
export function moderate(store: Store, reviewId: string, decision: Decision, moderator: string, now = new Date()): { review?: Review; error?: string } {
  const review = store.get<Review>('reviews', reviewId);
  if (!review) return { error: 'Review not found.' };
  if (!moderator.trim()) return { error: 'A moderator name is required.' };
  const at = now.toISOString();
  if (decision.action === 'publish') {
    if (review.status !== 'pending') return { error: 'Only a pending review can be published.' };
    if (review.verification === 'unverified') return { error: 'The reviewer is not verified yet.' };
    return { review: store.put<Review>('reviews', { ...review, status: 'published', log: [...review.log, { at, by: moderator, action: 'published' }] }) };
  }
  if (!(decision.reason in REASON_CODES)) return { error: 'A listed reason is required.' };
  if (decision.action === 'reject' && review.status !== 'pending') return { error: 'Only a pending review can be rejected.' };
  if (decision.action === 'remove' && review.status !== 'published') return { error: 'Only a published review can be removed.' };
  const status: ReviewStatus = decision.action === 'reject' ? 'rejected' : 'removed';
  return {
    review: store.put<Review>('reviews', { ...review, status, log: [...review.log, { at, by: moderator, action: status, reason: decision.reason, note: decision.note }] }),
  };
}

/** Vendor staff with an approved claim can answer a review in public. They cannot change the review. */
export function replyToReview(store: Store, reviewId: string, user: User, textValue: string, now = new Date()): { review?: Review; error?: string } {
  const review = store.get<Review>('reviews', reviewId);
  if (!review || review.status !== 'published') return { error: 'Review not found.' };
  if (!isApprovedVendor(store, user.id, review.productId)) return { error: 'Only a vendor with an approved claim can reply.' };
  const body = text(textValue);
  if (body.length < 10 || body.length > 2000 || /[<>]/.test(body)) return { error: 'A reply needs 10 to 2000 characters and no HTML.' };
  const at = now.toISOString();
  const history = review.reply ? [...review.reply.history, { text: review.reply.text, at: review.reply.at }] : [];
  return { review: store.put<Review>('reviews', { ...review, reply: { text: body, by: user.id, at, history } }) };
}

/** A vendor can ask us to look at a review. Flagging changes nothing about the review itself. */
export function flagReview(store: Store, reviewId: string, user: User, note: string, now = new Date()): { review?: Review; error?: string } {
  const review = store.get<Review>('reviews', reviewId);
  if (!review) return { error: 'Review not found.' };
  if (!isApprovedVendor(store, user.id, review.productId)) return { error: 'Only a vendor with an approved claim can flag.' };
  if (!text(note)) return { error: 'Say why you are flagging it.' };
  return { review: store.put<Review>('reviews', { ...review, flags: [...review.flags, { at: now.toISOString(), by: user.id, note: text(note) }] }) };
}

/** Published reviews, newest first. The order never depends on rating or on who pays. */
export function listPublished(store: Store, productId: string): Review[] {
  return store
    .list<Review>('reviews', (r) => r.productId === productId && r.status === 'published')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export interface PublicStats {
  published: number;
  averageRating: number | null;
  /** Counts of removals by written reason, shown on the product page. */
  removedByReason: Partial<Record<ReasonCode, number>>;
  invitedByVendor: number;
}

export function publicStats(store: Store, productId: string): PublicStats {
  const all = store.list<Review>('reviews', (r) => r.productId === productId);
  const published = all.filter((r) => r.status === 'published');
  const removedByReason: Partial<Record<ReasonCode, number>> = {};
  for (const r of all.filter((x) => x.status === 'removed' || x.status === 'rejected')) {
    const reason = r.log.at(-1)?.reason;
    if (reason) removedByReason[reason] = (removedByReason[reason] ?? 0) + 1;
  }
  const sum = published.reduce((s, r) => s + r.input.rating, 0);
  return {
    published: published.length,
    averageRating: published.length ? Math.round((sum / published.length) * 10) / 10 : null,
    removedByReason,
    invitedByVendor: published.filter((r) => r.input.incentive.kind === 'vendor-invited').length,
  };
}

export { emailDomain };
