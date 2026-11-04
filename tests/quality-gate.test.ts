import { describe, expect, it } from 'vitest';
import { evaluateCategory, evaluateDepartment, evaluateProduct, type CategoryGateInput } from '../src/lib/quality-gate';

const passing: CategoryGateInput = {
  level: 'L1',
  qualifyingProducts: 8,
  completeProfiles: 5,
  reviewCount: 25,
  handsOnProducts: 0,
  editorial: { criteriaApproved: true, signedOff: true, wordCount: 600, checkErrors: 0 },
  maxSimilarity: 0.1,
  keywordConflict: false,
};

describe('evaluateCategory', () => {
  it('indexes a category that meets every threshold', () => {
    expect(evaluateCategory(passing)).toEqual({ indexable: true, reasons: [] });
  });

  it('keeps an empty category out of the index and says why', () => {
    const result = evaluateCategory({
      ...passing,
      qualifyingProducts: 0,
      completeProfiles: 0,
      reviewCount: 0,
      editorial: null,
      maxSimilarity: 0,
    });
    expect(result.indexable).toBe(false);
    expect(result.reasons).toContain('0 of 8 qualifying products');
    expect(result.reasons).toContain('No editorial copy yet');
  });

  it('accepts hands-on notes in place of reviews', () => {
    expect(evaluateCategory({ ...passing, reviewCount: 0, handsOnProducts: 5 }).indexable).toBe(true);
    expect(evaluateCategory({ ...passing, reviewCount: 24, handsOnProducts: 4 }).indexable).toBe(false);
  });

  it('needs only 5 products for a subcategory', () => {
    expect(evaluateCategory({ ...passing, level: 'L2', qualifyingProducts: 5 }).indexable).toBe(true);
    expect(evaluateCategory({ ...passing, level: 'L1', qualifyingProducts: 5 }).indexable).toBe(false);
  });

  it('blocks unsigned, short, rule-breaking, duplicate or conflicting copy', () => {
    const ed = passing.editorial!;
    expect(evaluateCategory({ ...passing, editorial: { ...ed, signedOff: false } }).indexable).toBe(false);
    expect(evaluateCategory({ ...passing, editorial: { ...ed, criteriaApproved: false } }).indexable).toBe(false);
    expect(evaluateCategory({ ...passing, editorial: { ...ed, wordCount: 599 } }).indexable).toBe(false);
    expect(evaluateCategory({ ...passing, editorial: { ...ed, checkErrors: 1 } }).indexable).toBe(false);
    expect(evaluateCategory({ ...passing, maxSimilarity: 0.3 }).indexable).toBe(false);
    expect(evaluateCategory({ ...passing, keywordConflict: true }).indexable).toBe(false);
  });
});

describe('evaluateProduct', () => {
  const product = {
    isDraft: false,
    hasSummary: true,
    pricingAgeDays: 10,
    qualifiesForCategories: 1,
    reviewCount: 3,
    hasHandsOnNote: false,
  };

  it('indexes a published product with reviews or a hands-on note', () => {
    expect(evaluateProduct(product).indexable).toBe(true);
    expect(evaluateProduct({ ...product, reviewCount: 0, hasHandsOnNote: true }).indexable).toBe(true);
  });

  it('never indexes drafts, stale prices or products without reviews or notes', () => {
    expect(evaluateProduct({ ...product, isDraft: true }).indexable).toBe(false);
    expect(evaluateProduct({ ...product, pricingAgeDays: 181 }).indexable).toBe(false);
    expect(evaluateProduct({ ...product, reviewCount: 2 }).indexable).toBe(false);
  });
});

describe('evaluateDepartment', () => {
  it('needs 5 indexed categories and an overview', () => {
    expect(evaluateDepartment({ indexedCategories: 5, hasOverview: true }).indexable).toBe(true);
    expect(evaluateDepartment({ indexedCategories: 4, hasOverview: true }).indexable).toBe(false);
    expect(evaluateDepartment({ indexedCategories: 9, hasOverview: false }).indexable).toBe(false);
  });
});
