// The 0 to 100 score. Half comes from facts we check on the vendor's own pages, half from
// verified reviews. Nothing about who pays us is an input: the function takes no such field, and
// it throws if one is passed. Below the review minimum there is no score, only "Not scored yet".

export const SCORE_METHOD_VERSION = '0.1-draft';
export const MIN_REVIEWS_FOR_SCORE = 10;

export const EDITORIAL_POINTS = {
  pricingPublished: 15,
  freePlanOrTrial: 5,
  securityDocumented: 10,
  contractTermsDocumented: 10,
  dataExportDocumented: 5,
  integrationsListed: 5,
} as const;
export const REVIEW_POINTS = 50;

export interface ScoreInput {
  editorial: Record<keyof typeof EDITORIAL_POINTS, boolean>;
  /** Ratings of published reviews that passed verification, 1 to 5. */
  reviewRatings: number[];
}

export type ScoreResult =
  | { scored: true; score: number; editorial: number; reviews: number; reviewCount: number; version: string }
  | { scored: false; reason: string; editorial: number; reviewCount: number; version: string };

const FORBIDDEN = ['paidRelationship', 'paid', 'sponsored', 'affiliate', 'badge', 'rank', 'plan', 'leads'];

/** Reads the editorial inputs from the same product fields the site already publishes, with sources. */
export function editorialFromProduct(p: {
  pricing: { model: string; freePlan: boolean; freeTrialDays: number | null };
  security?: { soc2: boolean | null; iso27001: boolean | null; gdpr: boolean | null; hipaa: boolean | null } | undefined;
  contract?: { annualOnly: boolean | null; autoRenew: boolean | null; cancellation: string | null; dataExport: string | null } | undefined;
  integrations: string[];
}): ScoreInput['editorial'] {
  const sec = p.security;
  const con = p.contract;
  return {
    pricingPublished: p.pricing.model !== 'quote_only',
    freePlanOrTrial: p.pricing.freePlan || (p.pricing.freeTrialDays ?? 0) > 0,
    securityDocumented: !!sec && [sec.soc2, sec.iso27001, sec.gdpr, sec.hipaa].some((v) => v !== null),
    contractTermsDocumented: !!con && con.annualOnly !== null && con.autoRenew !== null && con.cancellation !== null,
    dataExportDocumented: !!con && con.dataExport !== null,
    integrationsListed: p.integrations.length >= 10,
  };
}

export function editorialPoints(editorial: ScoreInput['editorial']): number {
  return (Object.keys(EDITORIAL_POINTS) as (keyof typeof EDITORIAL_POINTS)[]).reduce(
    (sum, key) => sum + (editorial[key] ? EDITORIAL_POINTS[key] : 0),
    0,
  );
}

export function computeScore(input: ScoreInput): ScoreResult {
  for (const key of Object.keys(input)) {
    if (key !== 'editorial' && key !== 'reviewRatings') throw new Error(`Score input "${key}" is not allowed.`);
  }
  for (const key of Object.keys(input.editorial)) {
    if (FORBIDDEN.includes(key) || !(key in EDITORIAL_POINTS)) throw new Error(`Editorial input "${key}" is not allowed.`);
  }
  const editorial = editorialPoints(input.editorial);
  const n = input.reviewRatings.length;
  if (n < MIN_REVIEWS_FOR_SCORE) {
    return {
      scored: false,
      reason: `Needs ${MIN_REVIEWS_FOR_SCORE} verified reviews; has ${n}.`,
      editorial,
      reviewCount: n,
      version: SCORE_METHOD_VERSION,
    };
  }
  if (input.reviewRatings.some((r) => !Number.isInteger(r) || r < 1 || r > 5)) throw new Error('Ratings must be whole numbers from 1 to 5.');
  const average = input.reviewRatings.reduce((s, r) => s + r, 0) / n;
  const reviews = Math.round(((average - 1) / 4) * REVIEW_POINTS * 10) / 10;
  return {
    scored: true,
    score: Math.round(editorial + reviews),
    editorial,
    reviews,
    reviewCount: n,
    version: SCORE_METHOD_VERSION,
  };
}
