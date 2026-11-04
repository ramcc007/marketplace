import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, departments, type Category } from './taxonomy';
import { getProducts, meetsInclusion, isCompleteProfile, pricingAgeDays, type Product } from './catalog';
import { getReviewStats } from './reviews';
import { evaluateCategory, evaluateDepartment, evaluateProduct, type GateResult } from './quality-gate';
import { checkProse } from './content-checks';
import { shingles, similarity, wordCount } from './text';
import { todayIso } from './dates';

// Computes the quality gate for every page once per build. Page templates, sitemaps and
// the robots meta tag all read from here, so they can never disagree about what is indexed.

export type Editorial = CollectionEntry<'categoryEditorial'>;

export interface CategoryData {
  category: Category;
  products: Product[];
  editorial: Editorial | null;
  gate: GateResult;
}

export interface SiteIndex {
  today: string;
  products: Product[];
  categories: Map<string, CategoryData>;
  productGates: Map<string, GateResult>;
  departmentGates: Map<string, GateResult>;
}

let cached: Promise<SiteIndex> | null = null;

export function getSiteIndex(): Promise<SiteIndex> {
  cached ??= build();
  return cached;
}

async function build(): Promise<SiteIndex> {
  const today = todayIso();
  const products = await getProducts();
  const editorials = await getCollection('categoryEditorial');
  const editorialBySlug = new Map(editorials.map((e) => [e.id, e]));

  const shingleSets = editorials.map((e) => ({ id: e.id, set: shingles(e.body ?? '') }));
  const maxSimilarity = new Map<string, number>();
  for (const a of shingleSets) {
    let max = 0;
    for (const b of shingleSets) if (a.id !== b.id) max = Math.max(max, similarity(a.set, b.set));
    maxSimilarity.set(a.id, max);
  }

  const keywordUse = new Map<string, number>();
  for (const e of editorials) {
    const key = e.data.primaryKeyword.toLowerCase();
    keywordUse.set(key, (keywordUse.get(key) ?? 0) + 1);
  }

  const categoryData = new Map<string, CategoryData>();
  for (const category of categories) {
    // Alphabetical until verified reviews allow scoring; the category page says so.
    const qualifying = products
      .filter((p) => meetsInclusion(p, category))
      .sort((a, b) => a.data.name.localeCompare(b.data.name));
    const editorial = editorialBySlug.get(category.slug) ?? null;
    const body = editorial?.body ?? '';
    const gate = evaluateCategory({
      level: category.level,
      qualifyingProducts: qualifying.length,
      completeProfiles: qualifying.filter((p) => isCompleteProfile(p, today)).length,
      reviewCount: qualifying.reduce((sum, p) => sum + getReviewStats(p.id).count, 0),
      handsOnProducts: qualifying.filter((p) => p.data.handsOnNote).length,
      editorial: editorial
        ? {
            criteriaApproved: editorial.data.criteriaApproved,
            signedOff: Boolean(editorial.data.editor && editorial.data.signedOffAt),
            wordCount: wordCount(body),
            checkErrors: checkProse(body).filter((i) => i.severity === 'error').length,
          }
        : null,
      maxSimilarity: maxSimilarity.get(category.slug) ?? 0,
      keywordConflict: editorial ? (keywordUse.get(editorial.data.primaryKeyword.toLowerCase()) ?? 0) > 1 : false,
    });
    categoryData.set(category.slug, { category, products: qualifying, editorial, gate });
  }

  const productGates = new Map<string, GateResult>();
  for (const product of products) {
    productGates.set(
      product.id,
      evaluateProduct({
        isDraft: product.data.status === 'draft',
        hasSummary: product.data.summary.trim().length > 0,
        pricingAgeDays: pricingAgeDays(product, today),
        qualifiesForCategories: categories.filter((c) => meetsInclusion(product, c)).length,
        reviewCount: getReviewStats(product.id).count,
        hasHandsOnNote: Boolean(product.data.handsOnNote),
      }),
    );
  }

  const departmentGates = new Map<string, GateResult>();
  for (const dept of departments) {
    departmentGates.set(
      dept.slug,
      evaluateDepartment({
        indexedCategories: dept.categories.filter((c) => categoryData.get(c.slug)?.gate.indexable).length,
        // Department overviews are not written yet.
        hasOverview: false,
      }),
    );
  }

  return { today, products, categories: categoryData, productGates, departmentGates };
}
