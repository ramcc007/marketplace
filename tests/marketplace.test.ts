import { describe, expect, it } from 'vitest';
import { MemoryStore } from '../src/lib/marketplace/store';
import { consumeLoginLink, getSessionUser, isWorkEmail, requestLoginLink, type User } from '../src/lib/marketplace/auth';
import { decideClaim, emailMatchesVendor, requestClaim, saveVendorFields } from '../src/lib/marketplace/vendors';
import {
  flagReview,
  listPublished,
  markProofChecked,
  moderate,
  publicStats,
  replyToReview,
  submitReview,
  type ReviewInput,
} from '../src/lib/marketplace/reviews';
import { MIN_REVIEWS_FOR_SCORE, computeScore, editorialPoints } from '../src/lib/marketplace/score';
import { LEADS_PER_EMAIL_PER_DAY, eraseLeads, leadsForVendor, submitLead } from '../src/lib/marketplace/leads';

const T0 = new Date('2026-11-05T10:00:00Z');
const product = { id: 'acme', vendorDomain: 'acme.com' };

function signIn(store: MemoryStore, email: string, now = T0): User {
  const link = requestLoginLink(store, email, now)!;
  return consumeLoginLink(store, link.token, now)!.user;
}

const goodReview: ReviewInput = {
  rating: 4,
  title: 'Solid for a small team',
  usedFor: 'We used it to track invoices and reminders for about forty customers.',
  pros: 'Setup took an afternoon and the import from our spreadsheet worked first time.',
  cons: 'The reporting screens are slow when the date range is longer than a year.',
  role: 'Finance manager',
  companySize: '11-50',
  usageLength: '6 to 12 months',
  ownExperience: true,
  incentive: { kind: 'none' },
};

describe('sign-in links', () => {
  it('works once, then fails', () => {
    const s = new MemoryStore();
    const link = requestLoginLink(s, 'Ann@Example.org', T0)!;
    const first = consumeLoginLink(s, link.token, T0);
    expect(first?.user.email).toBe('ann@example.org');
    expect(consumeLoginLink(s, link.token, T0)).toBeNull();
    expect(getSessionUser(s, first!.session, T0)?.id).toBe('ann@example.org');
  });
  it('expires after 15 minutes and stores only a hash', () => {
    const s = new MemoryStore();
    const link = requestLoginLink(s, 'ann@example.org', T0)!;
    expect(JSON.stringify(s.list('loginLinks'))).not.toContain(link.token);
    expect(consumeLoginLink(s, link.token, new Date(T0.getTime() + 16 * 60_000))).toBeNull();
  });
  it('limits links per address and rejects bad addresses', () => {
    const s = new MemoryStore();
    for (let i = 0; i < 5; i++) expect(requestLoginLink(s, 'a@b.org', T0)).not.toBeNull();
    expect(requestLoginLink(s, 'a@b.org', T0)).toBeNull();
    expect(requestLoginLink(s, 'nope', T0)).toBeNull();
  });
  it('tells work addresses from free mailboxes', () => {
    expect(isWorkEmail('x@gmail.com')).toBe(false);
    expect(isWorkEmail('x@company.io')).toBe(true);
  });
});

describe('reviews', () => {
  it('keeps unverified reviewers out until checked', () => {
    const s = new MemoryStore();
    const user = signIn(s, 'pat@gmail.com');
    const { review } = submitReview(s, user, product, goodReview, T0);
    expect(review?.verification).toBe('unverified');
    expect(moderate(s, review!.id, { action: 'publish' }, 'Editor', T0).error).toMatch(/not verified/);
    markProofChecked(s, review!.id, 'Editor', T0);
    expect(moderate(s, review!.id, { action: 'publish' }, 'Editor', T0).review?.status).toBe('published');
  });

  it('rejects incomplete reviews, ticked-for-you consent and rating-dependent rewards', () => {
    const s = new MemoryStore();
    const user = signIn(s, 'pat@company.io');
    expect(submitReview(s, user, product, { ...goodReview, ownExperience: false }, T0).errors.length).toBeGreaterThan(0);
    expect(submitReview(s, user, product, { ...goodReview, rating: 6 }, T0).errors.length).toBeGreaterThan(0);
    const bad = { ...goodReview, incentive: { kind: 'reward' as const, description: 'Gift card', dependsOnRating: true } };
    expect(submitReview(s, user, product, bad, T0).errors.join()).toMatch(/depends on the rating/);
    const ok = { ...goodReview, incentive: { kind: 'reward' as const, description: 'Gift card for any honest review', dependsOnRating: false } };
    expect(submitReview(s, user, product, ok, T0).review).toBeDefined();
  });

  it('blocks vendor staff and a second review within a year', () => {
    const s = new MemoryStore();
    const staff = signIn(s, 'sam@acme.com');
    expect(submitReview(s, staff, product, goodReview, T0).errors[0]).toMatch(/Staff of the vendor/);
    const user = signIn(s, 'pat@company.io');
    expect(submitReview(s, user, product, goodReview, T0).review).toBeDefined();
    expect(submitReview(s, user, product, goodReview, T0).errors[0]).toMatch(/already reviewed/);
  });

  it('moderates by written reason only and counts removals without hiding by rating', () => {
    const s = new MemoryStore();
    const a = signIn(s, 'a@one.io');
    const b = signIn(s, 'b@two.io');
    const low = submitReview(s, a, product, { ...goodReview, rating: 1 }, T0).review!;
    const high = submitReview(s, b, product, { ...goodReview, rating: 5 }, T0).review!;
    moderate(s, low.id, { action: 'publish' }, 'Editor', T0);
    moderate(s, high.id, { action: 'publish' }, 'Editor', T0);
    expect(publicStats(s, 'acme').published).toBe(2);
    expect(moderate(s, low.id, { action: 'remove', reason: 'nonsense' as never }, 'Editor', T0).error).toBeDefined();
    moderate(s, high.id, { action: 'remove', reason: 'vendor-written' }, 'Editor', T0);
    const stats = publicStats(s, 'acme');
    expect(stats.published).toBe(1);
    expect(stats.removedByReason['vendor-written']).toBe(1);
    expect(stats.averageRating).toBe(1);
    expect(moderate(s, low.id, { action: 'publish' }, '', T0).error).toBeDefined();
  });

  it('lists newest first with no rating or payment ordering', () => {
    const s = new MemoryStore();
    const first = submitReview(s, signIn(s, 'a@one.io'), product, { ...goodReview, rating: 5 }, new Date('2026-11-01T00:00:00Z')).review!;
    const second = submitReview(s, signIn(s, 'b@two.io'), product, { ...goodReview, rating: 1 }, new Date('2026-11-03T00:00:00Z')).review!;
    moderate(s, first.id, { action: 'publish' }, 'Editor');
    moderate(s, second.id, { action: 'publish' }, 'Editor');
    expect(listPublished(s, 'acme').map((r) => r.id)).toEqual([second.id, first.id]);
  });

  it('lets an approved vendor reply and flag but never change the review', () => {
    const s = new MemoryStore();
    const reviewer = signIn(s, 'pat@company.io');
    const review = submitReview(s, reviewer, product, goodReview, T0).review!;
    moderate(s, review.id, { action: 'publish' }, 'Editor', T0);
    const staff = signIn(s, 'sam@acme.com');
    expect(replyToReview(s, review.id, staff, 'Thanks for the feedback.', T0).error).toBeDefined();
    const claim = requestClaim(s, staff, product, T0).claim!;
    decideClaim(s, claim.id, 'approved', 'Editor', 'Domain matches', T0);
    const replied = replyToReview(s, review.id, staff, 'Thanks, we are working on report speed.', T0).review!;
    expect(replied.reply?.text).toMatch(/report speed/);
    const flagged = flagReview(s, review.id, staff, 'We cannot find this customer', T0).review!;
    expect(flagged.status).toBe('published');
    expect(flagged.input).toEqual(review.input);
    expect(flagged.flags).toHaveLength(1);
  });
});

describe('vendor accounts', () => {
  it('needs an address on the vendor domain and an editor approval', () => {
    const s = new MemoryStore();
    expect(emailMatchesVendor('x@mail.acme.com', 'www.acme.com')).toBe(true);
    expect(emailMatchesVendor('x@notacme.com', 'acme.com')).toBe(false);
    const outsider = signIn(s, 'x@other.io');
    expect(requestClaim(s, outsider, product, T0).error).toBeDefined();
    const staff = signIn(s, 'sam@acme.com');
    const claim = requestClaim(s, staff, product, T0).claim!;
    expect(claim.status).toBe('pending');
    expect(saveVendorFields(s, staff, 'acme', { vendorSummary: 'We make invoicing software.' }, T0).errors[0]).toMatch(/no approved claim/);
    expect(decideClaim(s, claim.id, 'approved', 'Editor', '', T0)).toBeNull();
    decideClaim(s, claim.id, 'approved', 'Editor', 'Domain matches', T0);
    const saved = saveVendorFields(s, staff, 'acme', { vendorSummary: 'We make invoicing software.', demoUrl: 'https://acme.com/demo' }, T0);
    expect(saved.profile?.label).toBe('vendor-supplied');
  });

  it('accepts only the listed fields and no HTML or non-https links', () => {
    const s = new MemoryStore();
    const staff = signIn(s, 'sam@acme.com');
    const claim = requestClaim(s, staff, product, T0).claim!;
    decideClaim(s, claim.id, 'approved', 'Editor', 'ok', T0);
    for (const bad of [{ score: 100 }, { badge: 'top' }, { vendorSummary: '<b>x</b>' }, { demoUrl: 'http://acme.com' }, { vendorSummary: 'x'.repeat(601) }]) {
      expect(saveVendorFields(s, staff, 'acme', bad, T0).errors.length).toBeGreaterThan(0);
    }
  });
});

describe('score', () => {
  const full = { pricingPublished: true, freePlanOrTrial: true, securityDocumented: true, contractTermsDocumented: true, dataExportDocumented: true, integrationsListed: true };
  it('is not scored below the review minimum', () => {
    const r = computeScore({ editorial: full, reviewRatings: Array(MIN_REVIEWS_FOR_SCORE - 1).fill(5) });
    expect(r.scored).toBe(false);
    expect(editorialPoints(full)).toBe(50);
  });
  it('maps ratings to half the score', () => {
    const top = computeScore({ editorial: full, reviewRatings: Array(10).fill(5) });
    const bottom = computeScore({ editorial: full, reviewRatings: Array(10).fill(1) });
    expect(top.scored && top.score).toBe(100);
    expect(bottom.scored && bottom.score).toBe(50);
  });
  it('refuses any input about payment, rank or plans', () => {
    expect(() => computeScore({ editorial: full, reviewRatings: [], paidRelationship: 'sponsored' } as never)).toThrow();
    expect(() => computeScore({ editorial: { ...full, sponsored: true }, reviewRatings: [] } as never)).toThrow();
  });
});

describe('leads', () => {
  const lead = {
    requestType: 'quote' as const,
    productId: 'acme',
    productName: 'Acme Invoices',
    vendorName: 'Acme Inc',
    name: 'Pat Lee',
    email: 'pat@company.io',
    company: 'Company',
    message: 'We need pricing for 40 users.',
    consent: true,
  };
  it('needs explicit consent and stores the wording naming the vendor', () => {
    const s = new MemoryStore();
    expect(submitLead(s, { ...lead, consent: false }, T0).errors.length).toBeGreaterThan(0);
    expect(submitLead(s, { ...lead, consent: 'yes' as never }, T0).errors.length).toBeGreaterThan(0);
    const ok = submitLead(s, lead, T0).lead!;
    expect(ok.consentText).toContain('Acme Inc');
    expect(ok.consentText).toContain('does not pass them to anyone else');
  });
  it('drops bots and limits requests per address', () => {
    const s = new MemoryStore();
    expect(submitLead(s, { ...lead, website: 'http://spam' }, T0).errors).toBeDefined();
    expect(s.list('leads')).toHaveLength(0);
    for (let i = 0; i < LEADS_PER_EMAIL_PER_DAY; i++) expect(submitLead(s, lead, T0).lead).toBeDefined();
    expect(submitLead(s, lead, T0).errors[0]).toMatch(/Too many/);
  });
  it('shows a request only to an approved vendor of that product and erases on request', () => {
    const s = new MemoryStore();
    submitLead(s, lead, T0);
    const staff = signIn(s, 'sam@acme.com');
    expect(leadsForVendor(s, staff.id, 'acme')).toHaveLength(0);
    decideClaim(s, requestClaim(s, staff, product, T0).claim!.id, 'approved', 'Editor', 'ok', T0);
    expect(leadsForVendor(s, staff.id, 'acme')).toHaveLength(1);
    const rival = signIn(s, 'x@rival.com');
    const rivalProduct = { id: 'rival', vendorDomain: 'rival.com' };
    decideClaim(s, requestClaim(s, rival, rivalProduct, T0).claim!.id, 'approved', 'Editor', 'ok', T0);
    expect(leadsForVendor(s, rival.id, 'acme')).toHaveLength(0);
    expect(eraseLeads(s, 'PAT@company.io')).toBe(1);
    expect(s.list('leads')).toHaveLength(0);
  });
});
