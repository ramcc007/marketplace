// Thresholds from docs/PLAN.md section 4.1. A page is indexed only when every check passes;
// otherwise it renders with "noindex, follow" and stays out of the sitemap.

export const GATE = {
  category: {
    minQualifyingProducts: 8,
    minCompleteProfiles: 5,
    minReviews: 25,
    minHandsOnProducts: 5,
    minEditorialWords: 600,
    maxSimilarity: 0.3,
  },
  subcategory: { minQualifyingProducts: 5 },
  department: { minIndexedCategories: 5 },
  product: { minReviews: 3 },
  /** A product profile counts as complete only if its prices were verified this recently. */
  completeProfilePricingDays: 120,
  /** After this many days without re-verification, prices are shown as stale. */
  stalePricingDays: 180,
  /**
   * Launch phase, set by the site owner on 4 November 2026. Review collection has not opened and no product has
   * screenshots yet, so none of these can be required. While requireProductReviewsOrNote is off, a product page
   * is indexed only if it sits in at least one category page that is itself indexed. Set all three to true once
   * reviews and notes exist to restore the full rules.
   */
  launch: { requireScreenshots: false, requireReviewsOrNotes: false, requireProductReviewsOrNote: false },
};

export type LaunchRules = typeof GATE.launch;

export interface GateResult {
  indexable: boolean;
  reasons: string[];
}

export interface EditorialStatus {
  criteriaApproved: boolean;
  signedOff: boolean;
  wordCount: number;
  checkErrors: number;
}

export interface CategoryGateInput {
  level: 'L1' | 'L2';
  qualifyingProducts: number;
  completeProfiles: number;
  reviewCount: number;
  handsOnProducts: number;
  editorial: EditorialStatus | null;
  /** Highest similarity of this page's editorial copy to any other page, 0 to 1. */
  maxSimilarity: number;
  keywordConflict: boolean;
}

function result(reasons: string[]): GateResult {
  return { indexable: reasons.length === 0, reasons };
}

export function evaluateCategory(input: CategoryGateInput, launch: LaunchRules = GATE.launch): GateResult {
  const c = GATE.category;
  const reasons: string[] = [];
  const minProducts = input.level === 'L2' ? GATE.subcategory.minQualifyingProducts : c.minQualifyingProducts;

  if (input.qualifyingProducts < minProducts) {
    reasons.push(`${input.qualifyingProducts} of ${minProducts} qualifying products`);
  }
  if (input.completeProfiles < c.minCompleteProfiles) {
    reasons.push(`${input.completeProfiles} of ${c.minCompleteProfiles} complete product profiles`);
  }
  if (launch.requireReviewsOrNotes && input.reviewCount < c.minReviews && input.handsOnProducts < c.minHandsOnProducts) {
    reasons.push(
      `${input.reviewCount} of ${c.minReviews} reviews, and ${input.handsOnProducts} of ${c.minHandsOnProducts} products with hands-on notes`,
    );
  }
  if (!input.editorial) {
    reasons.push('No editorial copy yet');
  } else {
    if (!input.editorial.criteriaApproved) reasons.push('Inclusion criteria not approved');
    if (!input.editorial.signedOff) reasons.push('Editorial copy not signed off');
    if (input.editorial.wordCount < c.minEditorialWords) {
      reasons.push(`Editorial copy has ${input.editorial.wordCount} of ${c.minEditorialWords} words`);
    }
    if (input.editorial.checkErrors > 0) {
      reasons.push(`${input.editorial.checkErrors} writing-rule errors in editorial copy`);
    }
  }
  if (input.maxSimilarity >= c.maxSimilarity) {
    reasons.push(`Editorial copy is ${Math.round(input.maxSimilarity * 100)}% similar to another page`);
  }
  if (input.keywordConflict) {
    reasons.push('Primary keyword is also used by another page');
  }
  return result(reasons);
}

export interface ProductGateInput {
  isDraft: boolean;
  hasSummary: boolean;
  /** Days since prices were last verified. */
  pricingAgeDays: number;
  qualifiesForCategories: number;
  reviewCount: number;
  hasHandsOnNote: boolean;
  /** Number of category pages that list this product and are indexed themselves. */
  indexedCategories: number;
}

export function evaluateProduct(input: ProductGateInput, launch: LaunchRules = GATE.launch): GateResult {
  const reasons: string[] = [];
  if (input.isDraft) reasons.push('Draft');
  if (!input.hasSummary) reasons.push('No summary written by us');
  if (input.pricingAgeDays > GATE.stalePricingDays) {
    reasons.push(`Prices last verified ${input.pricingAgeDays} days ago`);
  }
  if (input.qualifiesForCategories === 0) reasons.push('Does not meet the inclusion criteria of any category');
  if (launch.requireProductReviewsOrNote) {
    if (input.reviewCount < GATE.product.minReviews && !input.hasHandsOnNote) {
      reasons.push(`${input.reviewCount} of ${GATE.product.minReviews} reviews and no hands-on note`);
    }
  } else if (input.indexedCategories === 0) {
    reasons.push('Not listed in any indexed category page');
  }
  return result(reasons);
}

export interface DepartmentGateInput {
  indexedCategories: number;
  hasOverview: boolean;
}

export function evaluateDepartment(input: DepartmentGateInput): GateResult {
  const reasons: string[] = [];
  const min = GATE.department.minIndexedCategories;
  if (input.indexedCategories < min) reasons.push(`${input.indexedCategories} of ${min} indexed categories`);
  if (!input.hasOverview) reasons.push('No written overview yet');
  return result(reasons);
}
