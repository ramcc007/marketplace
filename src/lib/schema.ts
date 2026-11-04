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

export function softwareApplication(input: {
  name: string;
  path: string;
  site: URL;
  description: string;
  vendor: string;
  lowestMonthlyUsd: number | null;
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
  if (input.lowestMonthlyUsd !== null) {
    data.offers = { '@type': 'Offer', price: input.lowestMonthlyUsd.toFixed(2), priceCurrency: 'USD' };
  }
  // aggregateRating is added once verified reviews exist; never before.
  return data;
}
