// JSON-LD builders. Only facts shown on the page go into structured data.

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbList(crumbs: Crumb[], site: URL): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.path, site).toString(),
    })),
  };
}

export function itemList(items: { name: string; path: string }[], site: URL): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: new URL(item.path, site).toString(),
    })),
  };
}

/** A category page: a CollectionPage whose main entity is the list of products on it, in the order shown. */
export function collectionPage(input: {
  name: string;
  description: string;
  path: string;
  siteName: string;
  site: URL;
  about: string;
  products: { name: string; path: string }[];
}): Record<string, unknown> {
  const url = new URL(input.path, input.site).toString();
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url,
    inLanguage: 'en',
    about: { '@type': 'Thing', name: input.about },
    isPartOf: { '@type': 'WebSite', name: input.siteName, url: new URL('/', input.site).toString() },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: input.products.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: input.products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: new URL(p.path, input.site).toString(),
      })),
    },
  };
}

export function softwareApplication(input: {
  name: string;
  path: string;
  site: URL;
  description: string;
  vendor: string;
  lowestMonthlyUsd: number | null;
  freePlan?: boolean;
}): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    url: new URL(input.path, input.site).toString(),
    description: input.description,
    applicationCategory: 'BusinessApplication',
    publisher: { '@type': 'Organization', name: input.vendor },
  };
  // A free plan is a real offer at 0, so the cheapest paid plan is never presented as the only price.
  const offers: Record<string, unknown>[] = [];
  if (input.freePlan) offers.push({ '@type': 'Offer', name: 'Free plan', price: '0', priceCurrency: 'USD' });
  if (input.lowestMonthlyUsd !== null) {
    offers.push({ '@type': 'Offer', price: input.lowestMonthlyUsd.toFixed(2), priceCurrency: 'USD' });
  }
  if (offers.length === 1) data.offers = offers[0];
  else if (offers.length > 1) data.offers = offers;
  // aggregateRating is added once verified reviews exist; never before.
  return data;
}
