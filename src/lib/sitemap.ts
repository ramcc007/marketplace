/** Split by page type so Search Console can report indexing per type. */
export const SITEMAP_TYPES = ['pages', 'departments', 'categories', 'products'] as const;

export interface SitemapEntry {
  loc: string;
  /** Real content-change date only. Omitted when unknown, never the build date. */
  lastmod?: string;
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function urlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => `  <url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function sitemapIndex(locs: string[]): string {
  const items = locs.map((loc) => `  <sitemap><loc>${escapeXml(loc)}</loc></sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export const xmlHeaders = { 'Content-Type': 'application/xml; charset=utf-8' };
