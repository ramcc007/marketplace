# B2BRated audit report

Written 4 November 2026. Covers https://b2brated.com as it stands in the working tree. **Nothing in this report is live yet.** All changes are uncommitted and undeployed, as the brief asked.

Detail behind this report is in three research files written during the audit:

- `docs/audit/security-performance-findings.md` (measurements on the live site and a local build)
- `docs/audit/competitor-gap.md` (feature comparison; most competitor sites blocked the fetch tool, see the limits there)
- `docs/audit/compliance-drafts.md` (gap list, claims check and draft policy text)

## One-page summary

**What changed, in order of importance**

1. **Indexing.** The blanket `X-Robots-Tag: noindex, nofollow` header is gone from `vercel.json`. Each page's own robots tag now decides, and the quality gate is untouched. After deploy, four pages are indexable (home, All categories, How we rank, Transparency). Every category, department and product page stays `noindex` through its own meta tag, because none passes the gate. The `*.vercel.app` addresses get a noindex header so they cannot compete with the real domain.
2. **Claims that were not true yet.** Home, footer, methodology, transparency and the product page described reviews, review verification, vendor corrections, a 90-day re-check schedule, fixed score weights and rankings as if they existed. None does. I rewrote the main sentences to say what is true today and what is planned.
3. **Brand and design.** New logo mark, favicon, touch icons, social share image and web manifest. New colour tokens, typography, header, footer, homepage, category page and product page. Category pages now have a sortable, filterable comparison table. Product pages have a quick-facts panel and a "compare with" block.
4. **Admin dashboard.** `npm run admin` runs a local-only tool: every page with its gate result and blockers, an editor for products and category files, approval buttons, check runners and a live-site check. It adds no public page.
5. **Headers and accessibility.** Added a content security policy, frame protection, referrer and permissions policies, cache headers, `scope` on table headers, readable text contrast, larger tap targets and visible focus states.

**What needs your decision** is listed under "Decisions for you" near the end.

## How "index all pages necessary" was handled

The brief asked for pages to be indexed and also said not to weaken the noindex rule or the gate. I resolved it this way: remove the site-wide header (the blunt block), keep the per-page gate. That makes every page that is allowed to be indexed indexable, and no page that is not.

Today that is 4 pages. A category page needs all of these before it passes: 8 products that meet the criteria, 5 product profiles with screenshots and prices checked in the last 120 days, 25 verified reviews or hands-on notes on 5 products, approved criteria, an editor's sign-off, 600+ words that pass the writing rules, and under 30% overlap with other pages. The admin dashboard shows which of these each page is missing.

I did not open pages that fail the gate. Doing so would publish unreviewed AI-drafted prices and claims, and the gate exists to stop that.

## Findings

Severity: high, medium, low. Status: fixed, needs decision, parked, not tested.

| Area | Page type | Evidence | Severity | Status | Where |
|---|---|---|---|---|---|
| SEO | All | `X-Robots-Tag: noindex, nofollow` on every response, which contradicted the page meta and `robots.txt`; Lighthouse SEO 66 on three pages because of it | High | Fixed in code, not deployed | `vercel.json` |
| SEO | Duplicates | `*.vercel.app` aliases serve the same site | Medium | Fixed in code, not deployed | `vercel.json` (host rule) |
| Truthfulness | Home, footer | "Scores come from a published formula based on verified reviews" and "Rankings are never for sale" while no scores or reviews exist | High | Fixed | `src/pages/index.astro`, `src/layouts/BaseLayout.astro` |
| Truthfulness | Methodology | Vendor corrections, 90-day re-checks, fixed weights and review verification described in the present tense | High | Fixed | `src/pages/methodology.astro` |
| Truthfulness | Transparency, product | Review removal counts and verification described as live; "Reviews removed: 0" | Medium | Fixed | `src/pages/transparency.astro`, `src/pages/products/[slug].astro` |
| Brand | All | No logo, favicon was a placeholder, no share image, no manifest | Medium | Fixed | `public/`, `src/components/Logo.astro`, `src/components/Seo.astro` |
| Social sharing | All | No `og:image` or Twitter card | Medium | Fixed | `src/components/Seo.astro` |
| Structured data | Home | WebSite only | Low | Fixed: Organization added with logo | `src/pages/index.astro` |
| Structured data | Product | SoftwareApplication with an offer only when a price exists; no ratings or reviews marked up | None | Checked, fine | `src/lib/schema.ts` |
| Homepage UI | Home | Plain template, no search, no real numbers, "Opening first" list of empty categories | Medium | Fixed | `src/pages/index.astro` |
| Category UI | Category | No comparison, filters or sort; empty categories gave no way forward | Medium | Fixed | `src/pages/software/[slug].astro`, `src/components/CompareTable.astro` |
| Product UI | Product | No at-a-glance summary; no link to peer products | Medium | Fixed | `src/pages/products/[slug].astro` |
| Engagement | Home, categories | No search from the homepage | Low | Fixed: search form sends `?q=` to the categories filter | `src/pages/index.astro`, `src/pages/categories/index.astro` |
| Security | All | No CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy or COOP | Low | Fixed in code, not deployed | `vercel.json` |
| Security | Dependencies | `npm audit`: 0 vulnerabilities (199 production, 89 dev) | None | Checked | `docs/audit/security-performance-findings.md` |
| Security | Repo | No secrets in tree or history; `.env*` ignored; one `set:html` (JSON-LD, escaped) | None | Checked | same |
| Security | Repo | The GitHub repo is public, so `docs/PLAN.md` and the audit documents are readable by anyone | Medium | Needs decision | see Decisions |
| Accessibility | Product | `text-slate-400` was 2.56:1 on white against the 4.5:1 minimum, on about 3,630 source links | Medium | Fixed (now slate-500, about 4.8:1) | `src/pages/products/[slug].astro` and others |
| Accessibility | Editorial tables | 462 markdown tables had header cells with no `scope` | Low | Fixed in the build | `astro.config.mjs` |
| Accessibility | Nav, footer | Text-only links with no padding, a tap-target risk | Low | Partly fixed: header links are now 40 px tall and footer links are padded; some links (for example the jump menu on product pages, 36 px) are still under the 44 px that is often recommended. Not tested on a device | `src/layouts/BaseLayout.astro` |
| Mobile | 6 page types | Tested at 375 px: no sideways scroll on home, category, product, categories, methodology and a long editorial page | None | Checked | n/a |
| Performance | All | Live Lighthouse mobile: performance 91 to 92. See the note below on the script that skewed it | Low | Not re-measured after changes | `docs/audit/security-performance-findings.md` |
| Performance | Home, category, product | My redesign made HTML larger: home 17.7 to 30.1 KB, category 29 to 45.6 KB, product 13 to 22.9 KB raw; CSS 18.9 to about 29 KB raw | Low | Known cost of the redesign | n/a |
| Performance | Categories | 557 links with repeated class strings | Low | Fixed: 173 KB reduced back to 108 KB | `src/styles/global.css` |
| Compliance | Site | No privacy notice, terms, contact details, disclosure or review policy pages | High before launch | Parked: no new pages allowed; drafts written | `docs/audit/compliance-drafts.md` |
| Content | `content/` | See the next section | Mixed | Left for you | n/a |

**Note on the performance numbers.** The live-site Lighthouse runs happened on a machine where an antivirus script injected about 146 KB into every page, so the JavaScript audits and the 2.7 to 2.8 s paint times are unreliable. The page weight figures are real. I did not re-run Lighthouse after my changes, so I cannot claim a score for the redesign.

## Search and LLM visibility

- Pages are plain static HTML. Prices, plans, dates and sources are text, not images. Confirmed from the build.
- `robots.txt` allows all crawlers and lists the sitemap, which now uses `https://b2brated.com`. I left AI crawlers on the same rule as everyone else. While most pages are `noindex`, there is little for them to take, and a separate rule would only add upkeep.
- Each product page states the price, the date it was checked and the source link in text. Each category page states what a product needs to be listed. That is the part a person or a model can lift cleanly.
- **Proposed `llms.txt`.** I did not add it, because it creates a new public URL. If you want one, this is the text:

```
# B2BRated
> Business software compared with dated prices and published inclusion criteria. Prices are read from each vendor's own pages and carry the date they were checked. No vendor pays to be listed or ranked.

## Method
- [How we rank and list software](https://b2brated.com/methodology): inclusion rules, price checks, score plans
- [Transparency](https://b2brated.com/transparency): who pays us and the rules we follow

## Browse
- [All categories](https://b2brated.com/categories)
```

I found no way to claim a ranking or citation benefit from this file, and did not try.

## Competitor features

Most competitor sites blocked the fetch tool (Capterra, GetApp, Software Advice, TrustRadius, SaaSworthy and most of G2), so the matrix is thin and "not seen" means "could not open". SoftwareSuggest and SelectHub opened. Re-run the rest in a real browser before relying on the comparison.

What the two readable sites have that we lacked, and what I did inside existing pages:

| Feature | Seen at | Status |
|---|---|---|
| Sorting and filters on category lists | SoftwareSuggest category page | Done: sort by any column; filters for free plan, free trial and published price |
| Side-by-side comparison | SelectHub (up to 5 products) | Done as a table of every product in the category, not a picker |
| Alternatives or related products on a product page | SoftwareSuggest product page | Done: "Compare with other products" |
| "Best for" tags | SoftwareSuggest cards | Parked: needs definitions we can defend |
| Deployment and platform tags | SoftwareSuggest filters | Parked: needs new data in every product file |
| Requirements checklist and shortlist | SelectHub | Parked: needs saved state or new pages |
| Price history and "what changed" | Not seen on either site | Parked: needs a second dated price per product |
| Screenshots, videos, Q and A, vendor-claimed profiles, quote flows | SoftwareSuggest | Parked: new pages or the planned database |

Where B2BRated is already ahead, only against those two sites and only as far as the page summaries showed: no sponsored sorting, and per-capability source links with the check date. SelectHub also says vendors cannot pay for a score, so that point is not unique.

## Compliance

Full text is in `docs/audit/compliance-drafts.md`. Every draft is marked as a draft for a lawyer to review. In short:

- **Needed even now:** a short privacy notice. The site collects nothing itself, but Vercel logs visitor IP addresses. Terms of use and contact details are close behind.
- **Needed before reviews, accounts, analytics or affiliate links go live:** a cookie notice (only if cookies are added), an affiliate and sponsorship disclosure, review guidelines that cover fake and incentivised reviews, a corrections and right-of-reply policy, and data-protection duties under UK and EU GDPR, CCPA and India's DPDP Act.
- **Later:** accessibility statement, copyright takedown contact.
- Some legal points in that file rest on background knowledge, not on a page the researcher opened. The file marks which. The ICO, CMA and EUR-Lex pages would not load.
- The research flagged 21 claims on existing pages that were not yet true. I fixed the main ones: the home page, the footer, the methodology page, the transparency page and the product page's reviews text. I did not re-check each of the 21 individually, so read `docs/audit/compliance-drafts.md` against the pages once more. Sentences that need a contact route (vendor corrections) now say the route does not exist yet.

## Content problems left for you

Nothing under `content/` was edited. Found along the way:

- **Billing label.** `kintsugi.json`, `numeral.json`, `updown-io.json` and `tenable-vulnerability-management.json` mark plans as `one_time` where the price is probably per term or per usage. I could not tell without re-reading each vendor page.
- **Hyperping.** `hyperping.json` says $29 on monthly billing; the status-page researcher saw $24 on yearly billing and no monthly figure. Re-check.
- **Fyle.** May now be sold as "Sage Expense Management (formerly Fyle)". Not confirmed.
- **Lost evidence.** Parallel agents overwrote some files. BambooHR and Connecteam kept their leave-management evidence but lost the original HRIS evidence.
- **Thin evidence flagged by the research agents.** Each category agent listed weak sources. Check those lists before you sign off any category.
- **Uncommitted drafts.** 66 files under `content/` are drafts left when nine category agents were stopped (API testing, DMARC, dunning, e-invoicing, employee recognition, privileged access management, status page, version control, plus partial SIEM, zero trust and secrets files). `employee-recognition.md` had broken front matter at one point. They are not part of this audit and I did not touch them.
- **Writing check.** `npm run check:content` passes with 0 errors and 32 warnings (long sentences and one-line paragraphs, mostly in tables).

## Before you remove noindex from a category page

The header is already gone. A category page becomes indexable by itself when it passes the gate, so nothing needs removing. These are the real prerequisites:

1. Screenshots for at least 5 products in that category, and prices checked within 120 days.
2. Either 25 verified reviews across the category or your own hands-on notes on 5 products.
3. You read the criteria and approve them, then read the copy and sign it off (the admin dashboard has both buttons).
4. The writing check shows 0 errors for the page, and its overlap with other pages is under 30%.
5. Every price and claim on its products has had a human spot-check against the vendor's page. The research agents worked from page summaries, not raw pages.
6. At least the privacy notice, terms and contact details exist as pages.
7. Decide whether to disclose that the first drafts were written with AI help. The front matter records `writer: "Claude (AI draft)"`.

## Decisions for you

1. **Deploy.** Say the word and I will commit the files listed below and push, which also deploys. Until then the live site is unchanged. Command to stage only the audit files:

```bash
git add README.md astro.config.mjs package.json vercel.json public src scripts/admin tests/admin-data.test.ts docs/audit docs/AUDIT-PROMPT.md docs/AUDIT-REPORT.md
```

   That leaves the 66 draft files under `content/` unstaged.
2. **Privacy notice and contact details.** These need pages, and the brief said no new pages. Tell me when to build them from the drafts. Contact details also need the legal owner and country, which I do not have.
3. **Public repository.** `docs/PLAN.md`, the audit documents and every draft are readable by anyone. If any of that is sensitive, make the repo private (Vercel keeps deploying from private repos).
4. **Hosting plan.** Vercel's free Hobby plan is meant for personal, non-commercial use. The compliance researcher flagged this but did not open Vercel's terms, so check them yourself. If the site will earn money through affiliate links or ads, you will probably need a paid plan or a different host. Cloudflare Pages is a free option for a static site like this one.
5. **AI-draft disclosure.** Decide whether the site says that first drafts were written with AI and then reviewed.

## What I could not verify

- Lighthouse after the redesign (the machine's antivirus script skews it).
- Keyboard-only and screen-reader walkthroughs. I fixed the known contrast, scope and tap-target problems and confirmed focus styles exist in CSS, but did not test with assistive technology.
- Competitor features on six of eight sites (blocked).
- Official sources for several legal points (listed in the compliance file).
- Near-duplicate text across product pages. The gate measures editorial overlap between categories; I did not measure the repeated boilerplate sections ("Who pays us" and similar).
- How the new pages look in browsers other than the one in the preview pane.

## Checks run on the final code

- `npm test`: 36 tests pass (6 new, for the admin data layer).
- `npm run check`: 0 errors, 0 warnings.
- `npm run check:content`: 0 errors, 32 warnings.
- `npm run build`: 1,040 pages, built to a temporary folder.
- Table headers: 0 `<th>` cells without `scope` in the build output.
- Admin tool: rejects requests with no token, with a wrong hostname and with a bad slug; validated a real product without saving; applied, signed off and withdrew approval on a throwaway file; refused an unsafe editor name. The throwaway file was deleted.
