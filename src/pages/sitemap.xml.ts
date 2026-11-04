import type { APIRoute } from 'astro';
import { SITEMAP_TYPES, sitemapIndex, xmlHeaders } from '../lib/sitemap';

export const GET: APIRoute = ({ site }) =>
  new Response(sitemapIndex(SITEMAP_TYPES.map((type) => new URL(`/sitemap-${type}.xml`, site).toString())), {
    headers: xmlHeaders,
  });
