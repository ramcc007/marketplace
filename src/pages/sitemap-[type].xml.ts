import type { APIRoute } from 'astro';
import { getSiteIndex } from '../lib/site-index';
import { SITEMAP_TYPES, urlset, xmlHeaders, type SitemapEntry } from '../lib/sitemap';

// Only pages that pass the quality gate are listed.

export function getStaticPaths() {
  return SITEMAP_TYPES.map((type) => ({ params: { type } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const index = await getSiteIndex();
  const url = (path: string) => new URL(path, site).toString();
  let entries: SitemapEntry[] = [];

  switch (params.type) {
    case 'pages':
      entries = ['/', '/categories', '/methodology', '/transparency'].map((p) => ({ loc: url(p) }));
      break;
    case 'departments':
      entries = [...index.departmentGates]
        .filter(([, gate]) => gate.indexable)
        .map(([slug]) => ({ loc: url(`/categories/${slug}`) }));
      break;
    case 'categories':
      entries = [...index.categories.values()]
        .filter((c) => c.gate.indexable)
        .map((c) => ({
          loc: url(`/software/${c.category.slug}`),
          lastmod: c.editorial?.data.updateLog.at(-1)?.date ?? c.editorial?.data.signedOffAt,
        }));
      break;
    case 'products':
      entries = index.products
        .filter((p) => index.productGates.get(p.id)?.indexable)
        .map((p) => ({ loc: url(`/products/${p.id}`), lastmod: p.data.updatedAt }));
      break;
  }

  return new Response(urlset(entries), { headers: xmlHeaders });
};
