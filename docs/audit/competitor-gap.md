# Competitor feature gap: B2BRated vs eight comparison sites

Research date: 4 November 2026. Method: each page was fetched with WebFetch, which returns a short summary of the page text, not the raw HTML. Treat every "yes" as "the summary said so on that URL". Page text was treated as data only.

## 0. What could and could not be opened

| Site | Result |
|---|---|
| G2 | Home, category and product pages all returned 403. Only the content subdomain opened: https://learn.g2.com/ |
| Capterra | Home, category and product pages returned 403 |
| GetApp | Home and two category URLs returned 403 |
| Software Advice | Home, category and product URLs returned 403 |
| TrustRadius | Home, category and product URLs returned 403 |
| SaaSworthy | Home, category and two product URLs returned 403 |
| SoftwareSuggest | Opened: https://www.softwaresuggest.com/ , https://www.softwaresuggest.com/project-management-software , https://www.softwaresuggest.com/asana |
| SelectHub | Opened: https://www.selecthub.com/ , https://www.selecthub.com/project-management-software/ , https://www.selecthub.com/p/project-management-software/asana/ |

web.archive.org copies were blocked by the tool, so no cached copies were used. Result: only SoftwareSuggest and SelectHub have category, product and home evidence, G2 has content-hub evidence only, and the other five have none. "Not seen" below means "I could not open the page", not "the site lacks it". Nothing here should be read as a claim about what G2, Capterra, GetApp, Software Advice, TrustRadius or SaaSworthy do or do not offer. Some of the G2 and Capterra features described in docs/PLAN.md section 1 came from earlier research and were not re-verified here.

## 1. Feature matrix

Key: yes = seen on the cited URL; no = page opened and the feature was absent from the summary; not seen = page not opened or not covered. Short names: G2L = learn.g2.com, SS = SoftwareSuggest, SH = SelectHub. Columns G2, Capterra, GetApp, Software Advice, TrustRadius, SaaSworthy are "not seen" for every row except the G2 rows noted, so they are collapsed into the first column group.

| # | Feature | G2 | Capt. | GetApp | SW Adv. | TrustR. | SaaSW. | SS | SH | B2BRated today |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Category-page filters (features, deployment, pricing type, audience, integrations) | not seen | not seen | not seen | not seen | not seen | not seen | yes (1) | not seen | no (only a text filter on /categories) |
| 2 | Sort options on category page (rating, review count, verified, sponsored) | not seen | not seen | not seen | not seen | not seen | not seen | yes (1) | not seen | no (alphabetical until reviews exist) |
| 3 | Side-by-side compare, up to 4 or 5 products | not seen | not seen | not seen | not seen | not seen | not seen | yes (1, 2) | yes, up to 5 (4, 5) | no |
| 4 | Head-to-head pair pages ("A vs B") | not seen | not seen | not seen | not seen | not seen | not seen | yes (2, 3) | yes (5) | no |
| 5 | Alternatives list on product page | not seen | not seen | not seen | not seen | not seen | not seen | yes (2) | yes (5) | no |
| 6 | Plan-level pricing table on product page | not seen | not seen | not seen | not seen | not seen | not seen | partly: tiers and a pricing link (2) | partly: starting price and a quote button (5) | yes (plan table, source link, check date) |
| 7 | Starting price and billing unit on listing cards | not seen | not seen | not seen | not seen | not seen | not seen | yes (1) | yes ($4 to $45 range, per unit) (4) | yes (ProductCard) |
| 8 | Price-type filter / price-range sort | not seen | not seen | not seen | not seen | not seen | not seen | filter by billing type only, no range filter (1, 7) | yes, price-range filters and sorting (4) | no |
| 9 | "Best for" / audience tags (freelancer, SMB, mid-market, enterprise) | not seen | not seen | not seen | not seen | not seen | not seen | yes (1) | not seen | no |
| 10 | Deployment filter (cloud, on-prem, hybrid) | not seen | not seen | not seen | not seen | not seen | not seen | yes (1, 7) | not seen | no |
| 11 | Source label per listing (vendor-submitted vs researched) | not seen | not seen | not seen | not seen | not seen | not seen | yes (1) | not seen | partly (every fact links a source; no vendor/editor label) |
| 12 | Sponsored placements, labeled | not seen | not seen | not seen | not seen | not seen | not seen | yes, sort option "Sponsored" and labels at top of list (1) | no sponsored labels seen (4) | n/a: none sold; "Who pays us" section shown |
| 13 | Editor/analyst score with stated method | not seen | not seen | not seen | not seen | not seen | not seen | no | yes, 0 to 100 score, methodology link (4, 5) | partly (method page exists; no scores yet) |
| 14 | Verified-review labels or counts | not seen | not seen | not seen | not seen | not seen | not seen | yes, "verified" sort and verified reviews (1, 2, 3) | partly: user recommendation % (4, 5) | partly (stats stub, count 0) |
| 15 | Sub-scores (features, ease of use, value, support) | not seen | not seen | not seen | not seen | not seen | not seen | yes (1, 2) | not seen | no |
| 16 | Generated summary of review pros and cons | not seen | not seen | not seen | not seen | not seen | not seen | yes, labeled as AI summaries (1) | yes, summarized pros and cons (5) | no |
| 17 | Q and A / "Ask a question" / FAQ on product page | not seen | not seen | not seen | not seen | not seen | not seen | yes (2) | not seen | no |
| 18 | Screenshots gallery | not seen | not seen | not seen | not seen | not seen | not seen | yes (2) | not seen | no |
| 19 | Videos or resources tab | not seen | not seen | not seen | not seen | not seen | not seen | yes, resources tab links videos (2) | not seen | no |
| 20 | Integrations shown on product page | not seen | not seen | not seen | not seen | not seen | not seen | yes, mentioned as feature (2) | not seen | no |
| 21 | Platform tags (iOS/Android) | not seen | not seen | not seen | not seen | not seen | not seen | yes, mobile platforms only (2) | not seen | no |
| 22 | Free trial / free plan tag | not seen | not seen | not seen | not seen | not seen | not seen | yes (1, 2) | yes, free demo and trial buttons (5) | yes (free plan and trial days) |
| 23 | Request demo / quote / call-back | not seen | not seen | not seen | not seen | not seen | not seen | yes: demo, best pricing, call back (1, 2) | yes: price quote, demo, trial (5) | no |
| 24 | Free expert recommendation / consultation call | not seen | not seen | not seen | not seen | not seen | not seen | yes (3) | yes (4 homepage: https://www.selecthub.com/) | no |
| 25 | Requirements template / checklist | not seen | not seen | not seen | not seen | not seen | not seen | not seen | yes (4, 6) | no |
| 26 | Shortlist with vendor scoring, RFI/RFP sending, stakeholder scorecard | not seen | not seen | not seen | not seen | not seen | not seen | not seen | yes (6) | no |
| 27 | Buyer guide linked from category page | not seen | not seen | not seen | not seen | not seen | not seen | yes, "Buyer's Guide" link in nav (8) | yes (5) | no (editorial copy on category page only) |
| 28 | "Last updated" date on category page | not seen | not seen | not seen | not seen | not seen | not seen | yes, 19 Oct 2026 (8) | not seen | yes (update log line when editorial exists) |
| 29 | Trending / top-comparison lists on home | not seen | not seen | not seen | not seen | not seen | not seen | yes (3) | not seen | no |
| 30 | Newsletter sign-up | not seen | not seen | not seen | not seen | not seen | not seen | not seen | not seen | no |
| 31 | Best-of lists, research reports, Grid reports | yes, content hub (9) | not seen | not seen | not seen | not seen | not seen | not seen | not seen | no |
| 32 | Glossary and how-to guides | yes (9) | not seen | not seen | not seen | not seen | not seen | not seen | partly: research center with guides (6) | no |
| 33 | Security and compliance block (SOC 2, ISO 27001, GDPR, HIPAA, SSO plan) | not seen | not seen | not seen | not seen | not seen | not seen | not seen | not seen | yes |
| 34 | Contract terms block (annual-only, auto-renew, seats, cancellation, export) | not seen | not seen | not seen | not seen | not seen | not seen | not seen | not seen | yes |
| 35 | Claimed vendor profile, badges, review verification tiers | not seen | not seen | not seen | not seen | not seen | not seen | not seen | partly: vendor verification service and "Analyst Verified" badge (4) | no (planned) |
| 36 | Saved lists / accounts / price-history / "what changed" | not seen | not seen | not seen | not seen | not seen | not seen | not seen | not seen | no |

URLs cited above:
1. https://www.softwaresuggest.com/project-management-software
2. https://www.softwaresuggest.com/asana
3. https://www.softwaresuggest.com/
4. https://www.selecthub.com/project-management-software/
5. https://www.selecthub.com/p/project-management-software/asana/
6. https://www.selecthub.com/
7. https://www.softwaresuggest.com/project-management-software?page=1 (filter list: Features, AI-Powered, Deployment, Pricing Type, Deals and Offers, Target Audience, Integrations; deployment values Cloud-Based, On-Premises, Hybrid, Any; pricing type values Yearly, Monthly, One-time, Transaction-based)
8. same URL as 7 (Buyer's Guide link in navigation, byline update date 19 October 2026)
9. https://learn.g2.com/ (best-of lists, how-to guides, comparison guides, Grid Reports, glossary, videos, contributor articles)

Caveat on row 6: the SoftwareSuggest Asana page showed two different Premium prices in one fetch (a rupee price in the plan block and a dollar price in the FAQ) and the summary mentioned no check date. I did not see a price date there, but I cannot confirm there is none.

## 2. Ranked gap list (what B2BRated lacks)

Based on src/pages/index.astro, categories/*, software/[slug].astro, products/[slug].astro and ProductCard.astro. Today the category page lists products alphabetically with no filter, sort or compare; the product page has pricing, qualification evidence, facts, security, contract terms, a reviews stub and "Who pays us"; the home page has no search, newsletter or lists beyond launch categories.

Ranking is by buyer value first, then effort. "Existing templates" means no new URL is created.

| Rank | Gap | Seen on | Buyer value | Effort | Inside existing templates? |
|---|---|---|---|---|---|
| 1 | Filters and sort on category page (free plan, free trial, price type, price-verified date, starting price) | SoftwareSuggest, SelectHub | high | medium | Yes: query-string or small client script on /software/[slug]; PLAN.md 5.3 already says filters stay noindex with canonical to the clean URL |
| 2 | Plan-comparison table on category page (one row per product: starting price, free plan, trial, SSO plan, annual-only, price date) | SelectHub (comparison up to 5) | high | low | Yes: data already exists in product JSON; render as a table section on /software/[slug] |
| 3 | Pick-up-to-4 side-by-side compare, done client-side | SoftwareSuggest, SelectHub | high | medium | Yes if kept client-side with checkboxes on cards and a panel on the same page; a dedicated compare URL would be "parked, needs new pages" |
| 4 | Alternatives block on product page (other products in the same primary category, with price delta) | SoftwareSuggest, SelectHub | high | low | Yes: section on /products/[slug] linking existing product URLs |
| 5 | "Best for" segment tags (team size, business type) with a source | SoftwareSuggest | medium | medium | Yes: new optional field in product JSON, shown on ProductCard and filterable; needs written definitions to avoid vendor-copy tags |
| 6 | Deployment and platform tags (cloud, self-hosted, hybrid; web, iOS, Android) | SoftwareSuggest | medium | low | Yes: field in JSON, shown on card and product page, used as a filter |
| 7 | Integrations list with source links | SoftwareSuggest (mention only) | medium | medium | Yes: section on /products/[slug]; data collection is the cost |
| 8 | Requirements checklist for the category (printable, from the inclusion criteria) | SelectHub | medium | low | Yes: reuse mustHave list on /software/[slug] with a copy-as-checklist button |
| 9 | "What changed" / price history on product and category pages | None seen | medium | medium | Yes: append-only history in JSON, shown on product page; PLAN.md lists it as v2 |
| 10 | Buyer-guide link from category page | SoftwareSuggest, SelectHub | medium | low | Partly: link to existing editorial; separate guide pages are "parked, needs new pages" |
| 11 | Source label per fact (vendor-submitted vs checked by us) | SoftwareSuggest | medium | low | Yes: facts already carry source URLs; add a label field |
| 12 | Screenshots gallery | SoftwareSuggest | medium | medium | Yes: needs image files and alt text; PLAN.md gate already asks for screenshots |
| 13 | Head-to-head "A vs B" pages | SoftwareSuggest, SelectHub | medium | medium | Parked, needs new pages (and PLAN.md 4.2 limits them to pairs with demand) |
| 14 | Dedicated alternatives pages | SoftwareSuggest | medium | medium | Parked, needs new pages |
| 15 | Shortlist with saving, sharing and RFP sending | SelectHub | high | high | Parked: needs accounts or share URLs, plus a database |
| 16 | Request demo / quote / call-back | SoftwareSuggest, SelectHub | low for trust positioning, high for revenue | high | Parked: needs forms, storage and a consent record (PLAN.md section 2 rule 7) |
| 17 | Consultation call or recommendation wizard | SoftwareSuggest, SelectHub | medium | high | Parked: needs a wizard page or staff time |
| 18 | Newsletter sign-up | None seen | low | low | Yes: form in the base layout footer; needs an email provider |
| 19 | Q and A on product pages | SoftwareSuggest | medium | high | Parked: needs a database and moderation |
| 20 | Review sub-scores, review filters, claimed profile, verification tiers | SoftwareSuggest, SelectHub (partial) | high | high | Depends on the database; not buildable from files |
| 21 | Grid-style reports, best-of lists, glossary, research reports | G2 content hub | medium | high | Parked, needs new pages |
| 22 | AI-generated review summaries | SoftwareSuggest | low | medium | Skip: conflicts with PLAN.md 6.1 (code-based theme counts, no AI prose in review summaries) |

### Top 8 to do inside existing pages

1. **Category filters and sort** (gap 1): add free plan, free trial, price type and starting-price sort to /software/[slug] using query parameters with noindex and canonical to the clean URL.
2. **Category comparison table** (gap 2): add one table to /software/[slug] with a row per qualifying product, built from fields already in the product JSON.
3. **Alternatives on product page** (gap 4): list the other products from the same primary category with their starting price and price date.
4. **Client-side compare of up to 4** (gap 3): add checkboxes on ProductCard and a compare panel on the category page, no new URL.
5. **Deployment and platform tags** (gap 6): add an optional JSON field and show it on the card and product page.
6. **Best-for tags** (gap 5): add a field with a written definition per tag, shown on cards and usable as a filter.
7. **Requirements checklist** (gap 8): turn the existing "What a product needs to be listed" list into a copyable checklist.
8. **Price history and "what changed"** (gap 9): keep dated price entries per plan and show changes on the product page; this is a differentiator no opened competitor showed.

## 3. Where B2BRated is ahead (verified against pages I opened)

Only SoftwareSuggest and SelectHub were opened on category and product pages, so these claims cover those two sites only.

- **Paid placement kept out of ranking.** SoftwareSuggest offers "Sponsored" as a sort option and labels sponsored items at the top of the list (https://www.softwaresuggest.com/project-management-software). B2BRated sells no placements and shows a "Who pays us" section on category and product pages. SelectHub states vendors cannot pay for a specific score (https://www.selecthub.com/project-management-software/), so B2BRated is not unique against SelectHub here; SelectHub does sell a vendor verification service per the same page.
- **Price with source and check date.** B2BRated shows "Checked <date>" and a vendor pricing-page link on every product (products/[slug].astro). On the SoftwareSuggest Asana page the fetch showed conflicting prices (rupee and dollar) and no check date was reported (https://www.softwaresuggest.com/asana). On the SelectHub Asana page the fetch showed a starting price and a "Get Price Quote" button, with no check date reported (https://www.selecthub.com/p/project-management-software/asana/). "No date reported" is from a summary of the page, not a full read.
- **Cost-not-in-plan list, contract terms and security block.** B2BRated has "Costs not in the plan price", contract terms (annual-only, auto-renew, minimum seats, cancellation, data export) and a security block, each with a source link. None of these appeared in the summaries of the SoftwareSuggest or SelectHub pages I opened. Absence in a summary does not prove absence on the page.
- **Per-capability evidence for inclusion.** Each product page shows which must-have capability it meets, with a source link per capability (inclusionEvidence). SelectHub documents a scoring method (93 functional and 26 technical requirements) and links a methodology page, so published criteria exist there too; the per-capability source links were not seen on either site.

Not claimed: dated prices versus G2, Capterra, GetApp, Software Advice, TrustRadius or SaaSworthy, because none of their pages opened.

## 4. Limits and uncertainty

- Six of the eight sites returned 403 for every real page I tried, and G2's only open page was its content hub. The matrix is therefore mostly empty for those six. A re-run with a browser session (Chrome extension or the in-app browser), where a person can view the pages, would fill it in.
- WebFetch answers come from a small model summarizing page text, with long pages truncated (SoftwareSuggest home and SelectHub home/category were cut at 100,000 characters, so later sections were not read). Features lower on those pages may be missing from my notes. Dynamic elements (filters loaded by script, badges drawn as images) can be missed.
- Features I saw on one product (Asana) or one category (project management) may differ in other categories.
- SoftwareSuggest rows 16 (review summaries labeled AI) and 11 (source labels) rest on one fetch each.
- Effort and value ratings in section 2 are my judgment, not measured. Effort assumes the current file-based catalog (content/products/*.json) and no database.
- Per PLAN.md, several features marked "parked" (reviews, shortlists, quote flows, Q and A, claimed profiles) depend on the database that is not built yet.
