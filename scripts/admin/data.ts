// Reads content/ and data/taxonomy.csv and computes, for every page, the same quality-gate result the
// site build uses (src/lib/site-index.ts). The gate and writing rules are imported, not copied, so
// the dashboard and the build can only disagree if this file's loading logic drifts. A test guards that.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateCategory, evaluateDepartment, evaluateProduct, GATE } from '../../src/lib/quality-gate.ts';
import { checkProse } from '../../src/lib/content-checks.ts';
import { shingles, similarity, wordCount } from '../../src/lib/text.ts';
import { daysBetween } from '../../src/lib/dates.ts';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));

export interface Category {
  departmentSlug: string;
  department: string;
  level: 'L1' | 'L2';
  slug: string;
  name: string;
  parentSlug: string | null;
  aliases: string[];
  mustHave: string[];
  wave: number;
}

// Same format and rules as src/lib/taxonomy.ts, which cannot be imported here because it uses a Vite-only import.
export function loadTaxonomy(): Category[] {
  const text = readFileSync(join(ROOT, 'data', 'taxonomy.csv'), 'utf8');
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
  return lines.slice(1).map((line) => {
    const [departmentSlug, department, level, slug, name, parentSlug, aliases, mustHave, wave] = line.split(',');
    return {
      departmentSlug,
      department,
      level: level as 'L1' | 'L2',
      slug,
      name,
      parentSlug: parentSlug || null,
      aliases: aliases ? aliases.split('|') : [],
      mustHave: mustHave.split(';'),
      wave: Number(wave),
    };
  });
}

export interface ProductFile {
  id: string;
  data: any;
}

export function loadProducts(): ProductFile[] {
  const dir = join(ROOT, 'content', 'products');
  if (!existsSync(dir)) return [];
  const out: ProductFile[] = [];
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    try {
      const text = readFileSync(join(dir, name), 'utf8').replace(/^﻿/, '');
      out.push({ id: name.replace(/\.json$/, ''), data: JSON.parse(text) });
    } catch {
      out.push({ id: name.replace(/\.json$/, ''), data: null });
    }
  }
  return out;
}

export interface EditorialFile {
  id: string;
  front: Record<string, string>;
  body: string;
}

const unquote = (s: string) => s.trim().replace(/^["']|["']$/g, '');

export function parseFrontmatter(text: string): { front: Record<string, string>; body: string } {
  const clean = text.replace(/^﻿/, '');
  const match = clean.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { front: {}, body: clean };
  const front: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (m) front[m[1]] = unquote(m[2]);
  }
  return { front, body: match[2] };
}

export function loadEditorials(): EditorialFile[] {
  const dir = join(ROOT, 'content', 'categories');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((name) => {
      const { front, body } = parseFrontmatter(readFileSync(join(dir, name), 'utf8'));
      return { id: name.replace(/\.md$/, ''), front, body };
    });
}

function meetsInclusion(product: ProductFile, category: Category): boolean {
  const entry = product.data?.qualifies?.find((q: any) => q.category === category.slug);
  if (!entry) return false;
  const met = new Set<string>(entry.evidence.map((e: any) => String(e.capability).trim().toLowerCase()));
  return category.mustHave.every((m) => met.has(m.toLowerCase()));
}

export type PageType = 'category' | 'product' | 'department';

export interface PageRow {
  type: PageType;
  slug: string;
  url: string;
  title: string;
  indexable: boolean;
  reasons: string[];
  /** Category: qualifying products. Product: categories it qualifies for. Department: categories. */
  count: number;
  words: number;
  /** Product only. */
  priceAgeDays: number | null;
  verifiedAt: string | null;
  status: string;
  writingErrors: number;
  writingWarnings: number;
  criteriaApproved: boolean;
  signedOff: boolean;
}

export interface Overview {
  today: string;
  gate: typeof GATE;
  totals: {
    categories: number;
    categoriesWithProducts: number;
    products: number;
    productsStale: number;
    indexable: number;
    pages: number;
    unreadableFiles: number;
  };
  topBlockers: { reason: string; pages: number }[];
  pages: PageRow[];
}

const todayIso = () => new Date().toISOString().slice(0, 10);

/** Groups the same blocker across pages and words it for a person, since the raw reasons carry per-page numbers. */
function reasonKey(r: string): string {
  if (/complete product profiles/.test(r)) return 'Too few complete product profiles (each needs prices checked in the last 120 days, plus screenshots once those are required)';
  if (/reviews, and .* hands-on notes/.test(r)) return 'No verified reviews, and too few products with our own hands-on notes';
  if (/qualifying products/.test(r)) return 'Too few products that meet the inclusion criteria (8 needed, 5 for a subcategory)';
  if (/% similar to another page/.test(r)) return 'Editorial copy shares too much phrasing with another page';
  if (/words$/.test(r)) return 'Editorial copy is under the minimum length';
  return r.replace(/\d+/g, 'N');
}

export function buildOverview(today = todayIso()): Overview {
  const categories = loadTaxonomy();
  const productFiles = loadProducts();
  const unreadable = productFiles.filter((p) => !p.data).length;
  // The site only builds published products; drafts are previewed in dev only.
  const products = productFiles.filter((p) => p.data && p.data.status === 'published');
  const editorials = loadEditorials();
  const byId = new Map(editorials.map((e) => [e.id, e]));

  const shingleSets = editorials.map((e) => ({ id: e.id, set: shingles(e.body) }));
  const maxSim = new Map<string, number>();
  for (const a of shingleSets) {
    let max = 0;
    for (const b of shingleSets) if (a.id !== b.id) max = Math.max(max, similarity(a.set, b.set));
    maxSim.set(a.id, max);
  }
  const keywordUse = new Map<string, number>();
  for (const e of editorials) {
    const k = (e.front.primaryKeyword ?? '').toLowerCase();
    keywordUse.set(k, (keywordUse.get(k) ?? 0) + 1);
  }

  const pages: PageRow[] = [];
  const categoryIndexable = new Map<string, boolean>();

  for (const category of categories) {
    const qualifying = products.filter((p) => meetsInclusion(p, category));
    const editorial = byId.get(category.slug) ?? null;
    const issues = editorial ? checkProse(editorial.body) : [];
    const errors = issues.filter((i) => i.severity === 'error').length;
    const gate = evaluateCategory({
      level: category.level,
      qualifyingProducts: qualifying.length,
      completeProfiles: qualifying.filter(
        (p) => daysBetween(p.data.pricing.verifiedAt, today) <= GATE.completeProfilePricingDays && (!GATE.launch.requireScreenshots || (p.data.screenshots ?? []).length > 0),
      ).length,
      reviewCount: 0,
      handsOnProducts: qualifying.filter((p) => p.data.handsOnNote).length,
      editorial: editorial
        ? {
            criteriaApproved: editorial.front.criteriaApproved === 'true',
            signedOff: Boolean(editorial.front.editor && editorial.front.signedOffAt),
            wordCount: wordCount(editorial.body),
            checkErrors: errors,
          }
        : null,
      maxSimilarity: maxSim.get(category.slug) ?? 0,
      keywordConflict: editorial ? (keywordUse.get((editorial.front.primaryKeyword ?? '').toLowerCase()) ?? 0) > 1 : false,
    });
    categoryIndexable.set(category.slug, gate.indexable);
    pages.push({
      type: 'category',
      slug: category.slug,
      url: `/software/${category.slug}`,
      title: category.name,
      indexable: gate.indexable,
      reasons: gate.reasons,
      count: qualifying.length,
      words: editorial ? wordCount(editorial.body) : 0,
      priceAgeDays: null,
      verifiedAt: null,
      status: editorial ? 'editorial' : 'no editorial',
      writingErrors: errors,
      writingWarnings: issues.length - errors,
      criteriaApproved: editorial?.front.criteriaApproved === 'true',
      signedOff: Boolean(editorial?.front.editor && editorial?.front.signedOffAt),
    });
  }

  let stale = 0;
  for (const product of products) {
    const age = daysBetween(product.data.pricing.verifiedAt, today);
    if (age > GATE.stalePricingDays) stale++;
    const qualifiesFor = categories.filter((c) => meetsInclusion(product, c)).length;
    const gate = evaluateProduct({
      isDraft: product.data.status === 'draft',
      hasSummary: String(product.data.summary ?? '').trim().length > 0,
      pricingAgeDays: age,
      qualifiesForCategories: qualifiesFor,
      reviewCount: 0,
      hasHandsOnNote: Boolean(product.data.handsOnNote),
    });
    const facts = (product.data.facts ?? []).map((f: any) => f.text);
    const issues = checkProse([product.data.summary, product.data.handsOnNote, ...facts].filter(Boolean).join('\n\n'));
    const errors = issues.filter((i) => i.severity === 'error').length;
    pages.push({
      type: 'product',
      slug: product.id,
      url: `/products/${product.id}`,
      title: product.data.name,
      indexable: gate.indexable,
      reasons: gate.reasons,
      count: qualifiesFor,
      words: 0,
      priceAgeDays: age,
      verifiedAt: product.data.pricing.verifiedAt,
      status: product.data.status,
      writingErrors: errors,
      writingWarnings: issues.length - errors,
      criteriaApproved: false,
      signedOff: false,
    });
  }

  const departments = new Map<string, Category[]>();
  for (const c of categories) departments.set(c.departmentSlug, [...(departments.get(c.departmentSlug) ?? []), c]);
  for (const [slug, cats] of departments) {
    const gate = evaluateDepartment({
      indexedCategories: cats.filter((c) => categoryIndexable.get(c.slug)).length,
      hasOverview: false,
    });
    pages.push({
      type: 'department',
      slug,
      url: `/categories/${slug}`,
      title: `${cats[0].department} software`,
      indexable: gate.indexable,
      reasons: gate.reasons,
      count: cats.length,
      words: 0,
      priceAgeDays: null,
      verifiedAt: null,
      status: '',
      writingErrors: 0,
      writingWarnings: 0,
      criteriaApproved: false,
      signedOff: false,
    });
  }

  const blockers = new Map<string, number>();
  for (const p of pages.filter((x) => x.type === 'category')) {
    for (const r of p.reasons) blockers.set(reasonKey(r), (blockers.get(reasonKey(r)) ?? 0) + 1);
  }

  return {
    today,
    gate: GATE,
    totals: {
      categories: categories.length,
      categoriesWithProducts: pages.filter((p) => p.type === 'category' && p.count > 0).length,
      products: products.length,
      productsStale: stale,
      // Home, /categories, /methodology and /transparency are always indexable static pages.
      indexable: pages.filter((p) => p.indexable).length + 4,
      pages: pages.length + 4,
      unreadableFiles: unreadable,
    },
    topBlockers: [...blockers.entries()].map(([reason, n]) => ({ reason, pages: n })).sort((a, b) => b.pages - a.pages).slice(0, 8),
    pages,
  };
}
