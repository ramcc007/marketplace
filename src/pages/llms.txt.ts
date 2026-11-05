import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { departments } from '../lib/taxonomy';
import { getSiteIndex } from '../lib/site-index';

// Plain-text summary for language-model crawlers. Lists only the category pages that pass the quality gate,
// so it can never point at a page that is marked noindex.
export const GET: APIRoute = async ({ site }) => {
  const index = await getSiteIndex();
  const u = (path: string) => new URL(path, site).toString();

  const sections: string[] = [];
  for (const dept of departments) {
    const lines = dept.categories
      .map((c) => index.categories.get(c.slug))
      .filter((c) => c?.gate.indexable)
      .map((c) => {
        const title = c!.editorial?.data.title ?? c!.category.name;
        const summary = c!.editorial?.data.definition;
        return `- [${title}](${u(`/software/${c!.category.slug}`)}): ${summary ?? `${c!.products.length} products compared`}`;
      });
    if (lines.length > 0) sections.push(`### ${dept.name}\n\n${lines.join('\n')}`);
  }

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} compares business software by category. A product is listed only when it meets the written rules for its category, every price links to the vendor page it came from, and no vendor pays to be listed or ranked.

## How the site works

- [How we rank and list software](${u('/methodology')}): inclusion rules, how prices are checked, how scores and reviews will work
- [Advertising and sponsorship](${u('/advertising-disclosure')}): who pays us and the rules that apply to every paid placement
- [All categories](${u('/categories')}): every software category, with the number of products checked in each

## Category comparisons

Each page lists the products that meet the category's written criteria, in alphabetical order, with starting prices, plan details and links to the vendor pages the figures came from.

${sections.join('\n\n')}

## Notes for citing

- Product pages link to the vendor page each price came from. Check that page before relying on a figure, because vendors change prices.
- Products are listed alphabetically. There is no score yet and no vendor pays for placement.
- Category pages are drafted with AI assistance and checked against vendor pages. Product pages and the remaining categories are not open to search engines yet, so they are marked noindex on purpose.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
