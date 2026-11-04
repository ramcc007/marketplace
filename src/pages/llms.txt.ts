import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

// Plain-text summary for language-model crawlers. Only describes what the site does and where the rules are written.
export const GET: APIRoute = ({ site }) => {
  const u = (path: string) => new URL(path, site).toString();
  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} compares business software by category. A product is listed only when it meets the written rules for its category, every price links to the vendor page it came from, and no vendor pays to be listed or ranked.

## How the site works

- [How we rank and list software](${u('/methodology')}): inclusion rules, how prices are checked, how scores and reviews will work
- [Transparency](${u('/transparency')}): who pays us, what we publish and what we do not
- [All categories](${u('/categories')}): every software category, with the number of products checked in each

## Notes for citing

- Category and product pages stay out of search results until a category has enough checked data, so some pages are marked noindex on purpose.
- Prices are list prices from each vendor's own pages and are linked on the product page. Check the vendor page before relying on a figure.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
