import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from './taxonomy';
import { daysBetween, formatMoney, formatUsd, formatVolumeFee } from './dates';
import { GATE } from './quality-gate';

// The only module that knows where product data lives. Swap the body of getProducts()
// for a database query when the catalog moves to Postgres.

export type Product = CollectionEntry<'products'>;

/** Drafts are visible in `astro dev` so templates can be checked, and never in a production build. */
export async function getProducts(): Promise<Product[]> {
  const all = await getCollection('products');
  return all.filter((p) => import.meta.env.DEV || p.data.status === 'published');
}

export function meetsInclusion(product: Product, category: Category): boolean {
  const entry = product.data.qualifies.find((q) => q.category === category.slug);
  if (!entry) return false;
  const met = new Set(entry.evidence.map((e) => e.capability.trim().toLowerCase()));
  return category.mustHave.every((m) => met.has(m.toLowerCase()));
}

/** Source page for each must-have of a category, in taxonomy order. */
export function inclusionEvidence(product: Product, category: Category): { capability: string; sourceUrl: string }[] {
  const entry = product.data.qualifies.find((q) => q.category === category.slug);
  if (!entry) return [];
  return category.mustHave.map((capability) => ({
    capability,
    sourceUrl:
      entry.evidence.find((e) => e.capability.trim().toLowerCase() === capability.toLowerCase())?.sourceUrl ?? '',
  }));
}

export function pricingAgeDays(product: Product, today: string): number {
  return daysBetween(product.data.pricing.verifiedAt, today);
}

export function isCompleteProfile(product: Product, today: string): boolean {
  const hasScreenshots = !GATE.launch.requireScreenshots || product.data.screenshots.length > 0;
  return pricingAgeDays(product, today) <= GATE.completeProfilePricingDays && hasScreenshots;
}

type Plan = Product['data']['pricing']['plans'][number];

const monthlyUsd = (p: Plan) => (p.billing === 'year' ? p.priceUsd! / 12 : p.priceUsd!);

/** Cheapest paid plan with a published USD price, compared as a monthly figure. */
function cheapestPaidPlan(product: Product): Plan | null {
  const priced = product.data.pricing.plans.filter(
    (p) => p.priceUsd !== null && p.priceUsd > 0 && (p.billing === 'month' || p.billing === 'year'),
  );
  return priced.length ? priced.reduce((a, b) => (monthlyUsd(b) < monthlyUsd(a) ? b : a)) : null;
}

/** Cheapest paid plan as a monthly figure, or null when no plan has a published price. */
export function startingMonthlyUsd(product: Product): number | null {
  const plan = cheapestPaidPlan(product);
  return plan ? monthlyUsd(plan) : null;
}

/** Monthly base fee on the cheapest paid plan, so a "from" price never hides it. */
export function startingBaseFeeUsd(product: Product): number | null {
  return cheapestPaidPlan(product)?.baseFeeUsd ?? null;
}

/** Lowest share-of-revenue fee, for products priced only that way. */
export function startingVolumeFee(product: Product): NonNullable<Plan['volumeFee']> | null {
  const fees = product.data.pricing.plans.filter((p) => (p.priceUsd === null || p.priceUsd === 0) && p.volumeFee).map((p) => p.volumeFee!);
  return fees.length ? fees.reduce((a, b) => (b.percent < a.percent ? b : a)) : null;
}

/** Cheapest monthly price in the vendor's own currency, for products with no USD price. */
export function startingListedPrice(product: Product): { amount: number; currency: string } | null {
  const listed = product.data.pricing.plans
    .filter((p) => p.priceUsd === null && p.listedPrice && p.listedPrice.amount > 0 && (p.billing === 'month' || p.billing === 'year'))
    .map((p) => ({
      amount: p.billing === 'year' ? p.listedPrice!.amount / 12 : p.listedPrice!.amount,
      currency: p.listedPrice!.currency,
    }));
  return listed.length ? listed.reduce((a, b) => (b.amount < a.amount ? b : a)) : null;
}

/** The "from" price as shown on cards and in the comparison table. One place, so they never disagree. */
export function startingPriceLabel(product: Product): string {
  const volumeFee = startingVolumeFee(product);
  if (volumeFee) return formatVolumeFee(volumeFee);
  const start = startingMonthlyUsd(product);
  if (start !== null) {
    const baseFee = startingBaseFeeUsd(product);
    return `${formatUsd(start)} a month${baseFee ? ` plus a ${formatUsd(baseFee)} monthly base fee` : ''}`;
  }
  const listed = startingListedPrice(product);
  if (listed) return `${formatMoney(listed.amount, listed.currency)} a month`;
  return product.data.pricing.model === 'free' ? 'Free' : 'Price on request';
}

/** "From $4 a month", but plain "Price on request" or "Free" where "From" would read wrongly. */
export function fromPhrase(product: Product): string {
  const label = startingPriceLabel(product);
  return label === 'Price on request' || label === 'Free' ? label : `From ${label}`;
}

/** Numeric key for sorting by price. Products with no comparable flat price sort last. */
export function startingPriceSortKey(product: Product): number {
  if (startingVolumeFee(product)) return Number.MAX_SAFE_INTEGER - 1;
  return startingMonthlyUsd(product) ?? Number.MAX_SAFE_INTEGER;
}

export interface PriceSummary {
  products: number;
  withFreePlan: number;
  withFreeTrial: number;
  quoteOnly: number;
  /** Products with a published USD starting price; lowest and median cover only these. */
  withUsdStart: number;
  lowestStart: number | null;
  medianStart: number | null;
}

export function priceSummary(products: Product[]): PriceSummary {
  // Products priced by share of revenue have no comparable flat starting price.
  const starts = products
    .filter((p) => startingVolumeFee(p) === null)
    .map(startingMonthlyUsd)
    .filter((n): n is number => n !== null)
    .sort((a, b) => a - b);
  const mid = Math.floor(starts.length / 2);
  return {
    products: products.length,
    withFreePlan: products.filter((p) => p.data.pricing.freePlan).length,
    withFreeTrial: products.filter((p) => (p.data.pricing.freeTrialDays ?? 0) > 0).length,
    quoteOnly: products.filter((p) => p.data.pricing.model === 'quote_only').length,
    withUsdStart: starts.length,
    lowestStart: starts[0] ?? null,
    medianStart: starts.length ? (starts.length % 2 ? starts[mid] : (starts[mid - 1] + starts[mid]) / 2) : null,
  };
}
