# Software marketplace plan (working name: [Brand])

Status: draft v2, 2 November 2026. Your decisions are recorded in section 0.1 and override anything older in this document. Facts about competitors and free tiers were checked in November 2026 and will change.

---

## 0. The plan on one page

| Topic | Decision |
|---|---|
| What we are | A software review and comparison marketplace for business buyers, competing with G2, Capterra, GetApp and Software Advice on trust: public methods, visible review provenance, real prices with dates, and rankings that cannot be bought. |
| Categories | About 550 categories in the taxonomy (21 departments, each with categories and subcategories). Every category is stored from day one, but a category page is **indexed only after it passes a quality gate**. Expect 50 at launch, 150 by month 6, 300+ by month 12. Launch departments: Finance & HR, and IT, Security & DevOps. Full list in `data/taxonomy.csv`. |
| Thin-page control | Every page type has written thresholds (products, reviews, verified data, human-written copy, uniqueness). Pages below the threshold stay `noindex` and out of the sitemap. Compare and alternatives pages are never mass-generated. |
| Content | Most of each page is **data we own** (prices, features, review statistics). Claude drafts the prose to your writing rules (section 6.4), code checks enforce them, and you review and sign off each page before it can be indexed. The humanizer, inserted grammar slips and detector-score targets are left out (reasons in section 6.3). |
| Pricing (USD) | Free for buyers and vendors at launch. Paid vendor plans come later and will be decided then. Section 8 holds the current proposal (Free, Growth $149/mo, Pro $499/mo, Enterprise from $1,500/mo, plus clearly separated sponsored slots). Paying never changes organic rank. |
| Hosting | Astro. Vercel Hobby while the site earns nothing, then Cloudflare's free plan (which allows commercial use) before any revenue starts. Astro can also run on a VPS later if needed. |
| Database | **Neon (Postgres) free plan**: 1 GB per project, 100 projects, 100 compute-hours per project each month. It is plain Postgres, so moving to your own server later is a `pg_dump`. Auth moves to Better Auth (in our own database), files go to Cloudflare R2, and the app reaches the database through Cloudflare Hyperdrive. |

### 0.1 Decisions (2 November 2026)

| Question | Decision |
|---|---|
| Scope | B2B software only |
| Market | Global English (US, UK, India, Australia, Canada), prices in USD |
| Launch departments | Finance & HR for small and mid-size businesses, plus IT, Security & DevOps |
| Who writes | Claude drafts category and product copy to the rules in 6.4. You review and sign off every page. Revisit when there is budget for editors. |
| Editorial budget | None at launch |
| Vendor pricing | Free listing for every vendor at launch. Paid plans decided later. |
| Database | $0: Neon free plan. Supabase had hit its database size, egress and project limits. |
| Hosting | Vercel Hobby until the site earns money, then Cloudflare's free plan |
| Framework | Astro, because it fits Cloudflare's free limits (3 MB server code, 10 ms CPU per request) |
| Company | Not registered yet. Use a merchant of record (Paddle or Lemon Squeezy) when paid plans start. |
| Starting data | From zero: no product list, vendors or reviews |
| Review verification | Work email or LinkedIn required from day one |
| Brand | Claude suggests names with available .com domains (section 15) |
| Writer tool | Same logic as the other project, new code in this repo |

---

## 1. How G2, Capterra, GetApp and Software Advice are built

### 1.1 Category structure

| | G2 | Capterra | GetApp | Software Advice |
|---|---|---|---|---|
| Owner | G2 (independent) | Gartner Digital Markets | Gartner Digital Markets | Gartner Digital Markets |
| Category count | About 2,100 (G2's own 2023 figure, likely higher now) | About 900 (third-party figure) | Shares the Gartner catalog | Smaller set |
| Hierarchy | Parent category, child category, sometimes a third level. Each category has written inclusion criteria a product must meet. | Mostly flat list of "X software" categories, grouped by function and industry for browsing | Department then category | Category, with advisor-led matching |
| Category URL (as observed) | `/categories/{slug}` (flat, hierarchy only in breadcrumbs) | `/{slug}-software/` | `/{department}-software/{category}/` | `/{category}/` |
| Product URL (as observed) | `/products/{slug}/reviews` | `/p/{id}/{Name}/` | `/{department}-software/a/{slug}/` | `/{category}/{slug}-profile/` |
| Other page types | Compare (`/compare/a-vs-b`), alternatives, pricing, features, Grid reports | Compare, alternatives, pricing, buyer guides | Compare, alternatives | Compare, alternatives |

What they all share:

1. **Departments** (Sales, Marketing, HR, Finance, IT, and so on) for browsing.
2. **Categories** as the main SEO pages ("CRM software", "payroll software").
3. **Industry or vertical categories** ("dental practice management", "church management").
4. **Attributes** (deployment, company size, pricing model, platform) used as filters, not as categories.
5. A product belongs to several categories but has one primary category.

G2's practice of writing inclusion criteria for each category is the part worth copying. It is what makes a category page authoritative: a product is listed because it meets a stated definition, not because the vendor asked.

### 1.2 How they make money

| Platform | Model | Known prices |
|---|---|---|
| G2 | Vendor subscriptions plus a buyer-intent data add-on and sponsored placements | Public: Free, and Starter at $2,999/yr. Professional, Enterprise and Buyer Intent are "contact us". Third-party reports put negotiated Professional at roughly $11k to $14k/yr, Enterprise at $17k to $21k/yr, and Buyer Intent from about $10k to over $50k/yr. |
| Capterra, GetApp | Pay-per-click on category placements. Vendors bid per category; higher bids get higher positions in sponsored sorting. | Minimum bid widely reported at $2 per click; competitive categories run much higher. Monthly budget floor is reported at different levels by different sources. |
| Software Advice | Pay-per-lead. Advisors phone buyers and pass qualified leads to vendors. | Per-lead prices are not published. |

### 1.3 Their weak points (where we win)

1. **Pay-to-play perception.** Sponsored sorting and paid positions sit close to organic results. Buyers cannot tell what is earned and what is bought.
2. **Size bias.** G2's Grid weighs "market presence", so large vendors dominate and small, well-reviewed tools get little visibility.
3. **Rating inflation.** Vendor-run review campaigns with gift cards push most products to between 4.3 and 4.7 stars, so the stars stop helping a buyer choose.
4. **Missing or stale prices.** Many profiles say "contact vendor" with no date and no detail on hidden costs.
5. **Forced lead capture.** Software Advice routes buyers into phone calls, and buyer details can go to several vendors.
6. **Templated category pages.** Long generic intros with little that is specific to the category.
7. **Opaque, expensive vendor pricing.** Real packages are quoted privately and cost tens of thousands of dollars a year.

---

## 2. Positioning: the transparency charter

These are product rules, not marketing lines. Each one maps to a feature in section 9.

1. **Money never moves organic rank.** Sponsored products appear in a separate, labeled row (at most 3 per page), never mixed into the organic list. The default sort is never "sponsored".
2. **Every score explains itself.** Clicking a score shows its inputs and weights. The method is public, versioned and has a change log.
3. **Review provenance is visible.** Each review shows how the reviewer was verified and how the review was sourced (organic, vendor-invited, incentivized). Each product shows the mix, for example "58% of reviews came from vendor invitations".
4. **Moderation is visible.** Each product shows how many reviews were removed in the last 12 months and why (duplicate, conflict of interest, spam, no proof of use). Vendors can flag reviews; they cannot delete them.
5. **Real prices with dates.** Every price shows its source and the date we verified it. Hidden costs are flagged: SSO only on top plans, onboarding fees, minimum seats, annual-only billing, auto-renewal terms. Price history is kept and shown.
6. **What people actually paid.** Reviewers can add what they paid (optional, anonymous). We show the aggregate only after at least 5 data points.
7. **Buyer data belongs to the buyer.** No sign-up wall to see any page. Contact details go to a vendor only when the buyer picks that vendor, and the buyer can see who received them.
8. **Fair visibility for small vendors.** The free plan includes a full profile, review collection, analytics and badges. Scores use a Bayesian average and confidence, not company size. "Rising" lists are based on rating trend and verified review growth.
9. **We show who pays us.** Each category page lists which of its products have a paid plan, sponsored slot or affiliate link with us.
10. **Named editors.** Every editorial page shows who wrote it, who checked it, and when.

### 2.1 Scoring (draft, weights to be tuned and published)

| Component | Weight | How it is computed |
|---|---|---|
| Satisfaction | 40% | Bayesian average of overall rating (pulled toward the category mean until there are enough reviews), with recent reviews weighted more (18-month half-life) |
| Review confidence | 20% | Number of reviews, verification level, share of organic reviews |
| Value and price clarity | 15% | Value-for-money rating, published pricing, hidden-cost flags |
| Vendor responsiveness | 10% | Share of reviews answered, support ratings |
| Momentum | 15% | Rating and verified review trend over the last 6 months |

Instead of G2's "satisfaction vs market presence" grid, our category chart plots **satisfaction against review confidence**, with filters for company size and industry. A small product with 40 verified, recent, positive reviews can sit next to a large one.

---

## 3. Category taxonomy (550 planned, 500+ guaranteed)

### 3.1 Levels

| Level | What it is | Page? | Example |
|---|---|---|---|
| Department (L0) | Business function or industry group | Hub page, indexed once it has 5+ indexed categories | Marketing |
| Category (L1) | One buyer job | Main SEO page | Email marketing software |
| Subcategory (L2) | A real specialization with its own products | Page only when it passes the gate | Email marketing for e-commerce |
| Attribute | Filter, not a category | No page (except a few curated facets, see 5.3) | Free plan, cloud, 11 to 50 employees |
| Industry hub | Cross-links categories used by an industry | Hub page | Healthcare |

### 3.2 Rules that stop overlap and cannibalization

1. **One category per buyer job.** Synonyms become aliases, not pages. "Help desk", "ticketing system" and "support ticket software" are one category with aliases that redirect.
2. **Written inclusion criteria.** Each category has a definition and 3 to 5 must-have capabilities. A product is listed only if it has them.
3. **One primary keyword per page.** The taxonomy tool blocks a new category whose primary keyword is already owned by another page.
4. **Flat URLs.** `/software/{slug}` for every category and subcategory, so a category can move to a new parent without changing its URL.
5. **One primary category per product** (drives breadcrumbs and the canonical product context). Secondary categories are allowed.
6. **Subcategories must be different.** A subcategory needs at least 5 products that are actually specialized, not the parent's products relabeled.

### 3.3 Category record (database fields)

`name, slug, aliases[], department_id, parent_id, definition, inclusion_criteria, must_have_features[], filter_features[], related_category_ids[], primary_keyword, secondary_keywords[], monthly_search_volume, editor_id, status (draft | gated | indexed | merged | retired), quality_score, quality_failures[], last_reviewed_at`

### 3.4 Planned counts by department

| # | Department | Target | Example categories |
|---|---|---|---|
| 1 | Sales | 30 | CRM, sales engagement, sales intelligence, CPQ, proposal software, sales enablement, commission management, territory management, lead scoring, revenue intelligence |
| 2 | Marketing | 45 | Email marketing, marketing automation, SEO tools, social media management, landing pages, ABM, influencer marketing, affiliate management, webinar software, SMS marketing, A/B testing, customer data platform, digital asset management, review management |
| 3 | Customer service and success | 20 | Help desk, live chat, knowledge base, call center, customer success, chatbots, customer feedback, community platforms |
| 4 | HR and people | 35 | HRIS, payroll, applicant tracking, onboarding, performance management, employee engagement, time tracking, employee scheduling, benefits administration, LMS (corporate), compensation, EOR, background checks |
| 5 | Finance and accounting | 35 | Accounting, AP automation, expense management, invoicing, subscription billing, FP&A, tax, payment processing, spend management, procurement, revenue recognition, corporate cards, fixed assets |
| 6 | IT management | 35 | ITSM, RMM, MDM, network monitoring, IT asset management, backup, password management, remote desktop, patch management, SaaS management |
| 7 | Security | 35 | Endpoint protection, SIEM, vulnerability management, email security, VPN, zero trust, IAM, CASB, DLP, GRC, security awareness training, SOAR, secrets management |
| 8 | Development and DevOps | 40 | IDE, version control, CI/CD, APM, log management, bug tracking, API management, feature flags, low-code, headless CMS, test automation, container management, infrastructure as code, error tracking |
| 9 | Data, analytics and AI | 35 | BI, data warehouse, ETL/ELT, data catalog, product analytics, web analytics, reverse ETL, MLOps, vector databases, LLM observability, conversational AI, AI agent platforms |
| 10 | Collaboration and productivity | 30 | Project management, task management, team chat, video conferencing, online whiteboard, note-taking, document management, file sharing, meeting scheduling, intranet |
| 11 | Design and content creation | 20 | Graphic design, UX and prototyping, video editing, photo editing, 3D modeling, CAD, screen recording, presentation software |
| 12 | E-commerce and retail | 25 | E-commerce platforms, POS, inventory management, order management, shipping, marketplace management, PIM, loyalty programs |
| 13 | Operations, supply chain, manufacturing | 30 | ERP, MRP, WMS, fleet management, supply chain planning, quality management, CMMS, EHS, field service management, TMS |
| 14 | Legal, risk and compliance | 15 | Contract management, e-signature, legal practice management, eDiscovery, compliance management, policy management, board management, whistleblowing |
| 15 | Healthcare | 20 | EHR, medical practice management, medical billing, telehealth, dental, pharmacy, mental health practice, patient engagement, veterinary |
| 16 | Real estate and construction | 20 | Property management, real estate CRM, construction management, construction estimating, takeoff, BIM, HOA management, coworking management |
| 17 | Hospitality, food and travel | 15 | Restaurant POS, hotel PMS, channel manager, reservations, catering, travel agency software |
| 18 | Education | 15 | School management, student information system, K-12 LMS, online course platforms, tutoring, exam proctoring |
| 19 | Nonprofit, church and public sector | 12 | Donor management, fundraising, church management, volunteer management, grant management, association management |
| 20 | Professional services | 15 | PSA, agency management, accounting practice management, consulting, architecture practice |
| 21 | Other verticals | 30 | Gym management, salon booking, auto repair shop, HVAC and plumbing, farm management, insurance agency management, loan origination, core banking, pest control, cleaning services |
| | **Total** | **557** | |

The full list of all 557 is in `data/taxonomy.csv` (section 3.6).

### 3.5 Launch strategy: depth before breadth

Do not launch 557 shallow pages. Pick **one or two departments** and make every category in them excellent first. Decided: **Finance & HR** and **IT, Security & DevOps**. Search engines reward a site that covers a topic area completely; 50 strong pages in one area beat 500 weak ones spread thin. The remaining categories exist in the database and in navigation, marked `noindex` until they pass.

### 3.6 The full list: `data/taxonomy.csv`

One row per category. Columns:

| Column | Meaning |
|---|---|
| `department_slug`, `department` | One of the 21 departments |
| `level` | `L1` category or `L2` subcategory |
| `slug`, `name` | URL slug (`/software/{slug}`) and display name |
| `parent_slug` | For `L2` only: the category it specializes. A parent can sit in another department (for example, Real estate CRM under CRM). |
| `aliases` | Other names people search for, separated by `|`. These redirect to the category; they never get their own page. |
| `must_have` | Draft inclusion criteria: the capabilities a product needs to be listed, separated by `;`. You approve these per category before launch. |
| `wave` | `1` = the 50 launch categories, `2` = the rest of the launch departments, `3` = everything else |

Wave 1 (50): 12 finance, 14 HR, 8 IT management, 9 security, 7 DevOps categories, chosen for high buyer intent among small and mid-size businesses.

---

## 4. Page types and the quality gate (thin-page prevention)

Every page has an `index_status` stored in the database: `indexed`, `noindex` (visible to users, not to search engines) or `not_created`. A nightly job recalculates it. Only `indexed` pages go into the sitemap. Every change is logged with the reason.

### 4.1 Thresholds by page type (starting values, tune with Search Console data)

| Page type | Indexed only when all of these are true |
|---|---|
| **Category (L1)** | Definition and inclusion criteria written by an editor. At least 8 qualifying products, of which 5 or more have complete profiles (price verified in the last 120 days, 80% or more of must-have features mapped, screenshots). At least 25 published reviews across the category, or 5 or more products with our own hands-on notes. At least 600 words of editorial copy that passed all checks and has an editor's sign-off. Data blocks populated (price ranges, feature matrix, segment ratings). Less than 30% text similarity to any other page. Primary keyword not used by another page. |
| **Subcategory (L2)** | Same as above, but at least 5 specialized products and an angle that is not covered on the parent page. |
| **Department hub** | 5 or more indexed categories under it, plus a human-written overview. |
| **Product overview** | Description written by us (not copied from the vendor), primary category, pricing information with a verified date (even "quote only"), features mapped, and either 3 or more published reviews or our own hands-on note. |
| **Product reviews subpage** | 20 or more published reviews. Until then reviews live on the overview, and `/reviews` redirects there. |
| **Product pricing subpage** | Plan-level prices for 2 or more plans (or a documented quote process) plus price history or "what users paid" data. Until then pricing is a section on the overview. |
| **Alternatives** | Product is indexed, 5 or more indexed alternatives in the same primary category, and switching reasons drawn from real reviews. |
| **Compare A vs B** | Both products indexed, same primary category, and either measurable search demand or 20 or more on-site comparisons of that pair in 90 days. Product names in alphabetical order; the reversed URL redirects. |
| **Curated facet page** (for example "free CRM software") | Searched phrase with real volume, 8 or more matching products, and its own editorial section. |
| **Guides, reports** | Named author, sources linked, editor sign-off. |
| **Search results, filter combinations, reviewer profiles, shortlists** | Never indexed. |

### 4.2 Why compare pages need a gate

20 products in a category make 190 possible pairs. Across 550 categories that is close to 100,000 pages built from the same data. That is exactly the pattern search engines treat as thin or scaled content. We build a pair only when people search for it or use it.

### 4.3 Keeping pages from going stale

- Prices are re-verified every 90 days. After 180 days without verification, the price shows a "not recently verified" notice and the page loses data-completeness points, which can drop it below the gate.
- Each indexed page gets a human review every 6 months. The page shows a visible update log ("November 2026: added 3 products, price changes for 2 products").

### 4.4 Rollout pacing

- Add at most 50 new indexed pages a week.
- Watch Search Console's "Crawled, currently not indexed" report by page type. If more than 20% of a page type lands there, stop adding that type and improve the template first.

---

## 5. SEO architecture

### 5.1 URL scheme

```
/                                   home
/categories                         all categories, A to Z and by department
/categories/{department}            department hub
/software/{category}                category or subcategory page (flat)
/software/{category}/free           curated facet page (gated, few of them)
/software/{category}/pricing        category pricing comparison (gated)
/products/{product}                 product overview (includes reviews until split)
/products/{product}/reviews
/products/{product}/pricing
/products/{product}/alternatives
/compare/{a}-vs-{b}                 alphabetical order only
/vendors/{vendor}
/industries/{industry}              industry hub
/guides/{slug}                      buyer guides
/reports/{slug}                     original data reports
/authors/{slug}                     editor and writer pages
/methodology  /editorial-policy  /review-guidelines  /transparency
```

Lowercase, hyphens, no IDs in URLs, no trailing query strings on indexed pages. Category merges and slug changes create permanent 301 redirects automatically.

### 5.2 Titles and descriptions

- Titles up to 60 characters, meta descriptions up to 155, unique site-wide (checked in code).
- Use 4 or 5 title patterns per page type, not one pattern for 550 pages.
- A year appears in a title only if the page content was actually updated that year.

### 5.3 Indexing controls

- `robots` meta comes from `index_status`, never set by hand in templates.
- Sitemaps split by type (`sitemap-categories.xml`, `sitemap-products-1.xml`, and so on, 10,000 URLs per file). `lastmod` is the real content-change date, not the build date.
- Filters use query parameters (`?size=11-50&deployment=cloud`) with `noindex, follow` and a canonical to the clean category URL.
- A short list of high-value facets ("free", "for small business", "open source") can become real pages only if they pass the gate in 4.1.
- Paginated pages are self-canonical with plain crawlable links.
- Internal search results are `noindex`.

### 5.4 Structured data

| Page | Schema |
|---|---|
| Category | `ItemList` of products, `BreadcrumbList` |
| Product | `SoftwareApplication` with `aggregateRating`, a few `review` items, `offers` in USD, `applicationCategory`, `operatingSystem`; `BreadcrumbList` |
| Guides | `Article` with `author` as a `Person` linked to the author page |
| Site | `Organization`, `WebSite` |

Ratings in schema must match what is visible on the page. FAQ sections are fine for readers, but since 2023 Google shows FAQ rich results only for well-known government and health sites, so do not plan traffic around them.

### 5.5 Internal linking

- Breadcrumbs on every page: Home, Department, Category, Product.
- Category pages link to the department, sibling categories, subcategories, top products, the category pricing page and related guides.
- "Related categories" are computed from shared products (categories with many products in common), then checked by an editor.
- Product pages link to every category they belong to, their alternatives, their top compare pages and the vendor page.
- A weekly job finds orphans: every indexed page needs at least 3 links from other indexed pages.

### 5.6 Speed

- Category, department and guide pages are pre-built at deploy time. Product, compare and alternatives pages are rendered on demand, cached at the edge, and refreshed when their data changes. This keeps us under Cloudflare's 20,000-file limit per deployment.
- Little JavaScript on content pages; filters, compare and forms load as small React islands.
- Targets: LCP under 2.0 s, INP under 200 ms, CLS under 0.1.

### 5.7 Trust signals (E-E-A-T)

Real editor pages with background and contact, a "how we score" page, an editorial policy, a review moderation policy, a corrections log, company address and ownership, and affiliate and sponsorship disclosure on every page where it applies.

### 5.8 AI search

AI answers (Google AI Overviews, ChatGPT, Perplexity) cite pages that hold clear, specific facts. Our prices, verified dates, price history and review statistics are exactly that. Put key facts in plain HTML tables with stable headings. Decide whether to allow AI crawlers (recommended: allow, since citations bring brand visibility).

### 5.9 Earning links

- Free badges and review widgets for vendors, linking back with the product name as anchor text.
- Quarterly data reports, for example "SaaS price increases this quarter" from our price history. Journalists and vendors cite this kind of data.

### 5.10 Measurement

Search Console segmented by folder (`/software/`, `/products/`, `/compare/`), index coverage by page type, click-through rate by title pattern, and rank tracking for the 50 launch categories.

---

## 6. Content system (adapting the two-layer logic)

### 6.1 The main point

What keeps 550 category pages from being thin is **the data and judgment on them**, not the writing style. Google's scaled content abuse policy (March 2024) targets producing many pages mainly to rank, however they are made. A pipeline that mass-produces 550 intros is the risk, even if no detector flags them. Unique data plus your review of every page is the protection.

So each category page is built from three parts:

| Part | Share of page | Who makes it |
|---|---|---|
| **Data blocks**: product list, price ranges, "has a free plan" counts, feature matrix, segment ratings, review themes with counts and real quotes, price history | about 60% | Code, from our database. Not AI prose. |
| **Editorial**: what the category covers, who needs it, how to choose, cost traps, how products differ, our take | about 35% | Claude drafts it to the rules in 6.4 from a packet of sourced facts; you review, correct and sign off |
| **Reviews** | the rest | Users. Never rewritten by AI. |

For "what users say" sections, use code-based theme counts with linked real review quotes ("Mentioned in 41 reviews: setup took longer than expected") instead of an AI summary. It is more transparent and contains no AI prose.

### 6.2 What to keep from the other pipeline

1. **Rules in every prompt** that touches text (adapted below).
2. **Fact guard**: every number, price, date or product claim must come from a fact record with a source URL and a capture date.
3. **Plan sees what already exists**: outlines are made with every existing category title and heading in view, so pages do not repeat each other.
4. **Section-by-section drafting** with earlier sections visible.
5. **Code clean-up**: dashes, quotes, "13 percent" to "13%", removal of notes and leftovers.
6. **Title and heading uniqueness checks** and length limits.
7. **A final "never publish" gate.**

### 6.3 What to drop or change, and why

| From the other pipeline | Change | Reason |
|---|---|---|
| Humanizer model at high temperature | Drop | Rewording at high temperature changes facts, and on a site about prices and ratings a changed number is a real error. The fact guard has to work harder to undo it. |
| Deliberately added grammar slips | Drop | A review site asks readers to trust its numbers. Errors lower that trust and look careless to editors, vendors and journalists. |
| GPTZero score as the target | Replace with human edit share | Detector scores are not a ranking factor. Measure what matters instead: how much of the final text a human wrote or changed. |
| "No other brand names" rule | Reverse | Naming products is the point of this site. Instead, every claim about a named product must map to a fact record. |

### 6.4 Writing rules for this site (sent with every writing prompt)

- **Voice**: plain, specific US English, like an experienced software buyer writing for a colleague. Not marketing copy, not chatty.
- **People first**: most sentences are about buyers, admins, finance leads, IT teams or small business owners, with the facts inside those sentences.
- **Honesty**: no invented quotes, testers, studies, numbers, customer stories or test results. Every price and number comes from the fact store or our own review data. "Best" or "fastest" only when backed by our score, with the method linked.
- **Banned vendor language**: seamless, robust, cutting-edge, all-in-one solution, empower, streamline, leverage, game-changer, revolutionize, best-in-class, world-class, next-gen, unlock, delve, crucial, furthermore, landscape, elevate, holistic, synergy, plus the full list from the other project.
- **Banned structures**: "It's not X, it's Y", lists of exactly three adjectives, a question answered straight away, a one-line moral, a closing summary paragraph, "when it comes to", "in today's fast-paced world", em and en dashes, writing about the article itself.
- **Openings**: start with a specific buyer situation or a fact from our data. A plain definition is allowed in its own "What is X software" section, not as the first sentence.
- **Endings**: end on a specific check the buyer can do or a fact, never a summary or a call to action.
- **Disclosure**: any sentence near a sponsored or affiliate link carries the label.

### 6.5 Code checks (run whatever the writer or model did)

1. **Fact match**: every number, price, percentage, date and product name in editorial text must match a fact record or a computed statistic. Unmatched items block publishing and are highlighted for the editor.
2. **Freshness**: facts older than 180 days are flagged.
3. **Banned words and structures**: pattern checks, plus dash and quote clean-up.
4. **Boilerplate detector**: any sentence that appears (or nearly appears) on more than 2 pages is blocked. Page-level similarity must stay under 30%.
5. **Minimum substance**: editorial word count excluding boilerplate, and all data blocks populated.
6. **Titles and meta**: length, uniqueness, pattern variety.
7. **Links**: every source link is checked to be live.
8. **Human sign-off**: editor ID, timestamp and a short checklist are required to publish.
9. **Edit share**: the AI draft is stored next to the final text, and the share you changed is recorded for every page. While you are the only reviewer this is information, not a blocker. When an editor joins later, it shows which pages had the least human input.
10. **Never publish**: placeholder text, "as an AI", "I could not find", TODO, lorem ipsum, internal notes, "[citation needed]", unsourced numbers.

### 6.6 Workflow for one category page

1. **Scope** (Claude drafts from `data/taxonomy.csv`, you approve): definition, inclusion criteria, must-have features, buyer types, primary and secondary keywords, how this category differs from its neighbors.
2. **Research packet** (automated): vendor pricing pages, documentation, security and compliance pages, change logs, the questions people search for, and our own reviews. Each fact is stored with URL, capture date and a saved snapshot.
3. **Data assembly** (code): qualifying products, feature matrix, price statistics, review themes.
4. **Outline** (AI-assisted, editor approves): built with all existing headings in view.
5. **Drafting** (Claude, one section at a time, to the rules in 6.4), then **your review** (see 6.7).
6. **Checks** (code), fix, re-check.
7. **Sign-off**, then the gate decides whether the page is indexed.
8. **Maintenance**: price re-verification every 90 days, page review every 6 months.

### 6.7 Who writes, and how long it takes

Decided: Claude drafts category and product copy in this repo, following 6.4, and you review and sign off each page. There is no editorial budget at launch.

- Your review is the bottleneck: about 20 to 30 minutes per category page (check numbers against sources, add what you know first-hand, cut anything generic). The 50 wave-1 pages take roughly 20 to 25 hours of your time.
- Product summaries (60 to 120 words each, from verified facts) take about 5 minutes each to review.
- Risk to keep in view: AI-drafted prose across hundreds of pages is the pattern Google's scaled content policy targets. Our protection is that most of each page is our own data, every page has your sign-off, pages are indexed only after the gate, and at most 50 new pages are indexed each week. When there is budget, a freelance editor should go over the 50 highest-traffic pages first.
- Revisit this decision once vendors start paying.

---

## 7. Reviews: collection, verification, moderation, law

### 7.1 Review form

Overall rating, ease of use, support, value for money, likelihood to recommend, features used, pros, cons, main use case, company size, role, industry, how long used, what they switched from, what they paid (optional, anonymous), contract terms they ran into. Minimum combined length for pros and cons. Autosave.

### 7.2 Verification levels (shown on every review and used in scoring)

| Level | How |
|---|---|
| 1 | Email verified |
| 2 | Work email domain or LinkedIn sign-in matching the stated role and company |
| 3 | Proof of use (redacted screenshot of the logged-in product or an invoice) checked by a moderator |

### 7.3 Source labels

Organic, vendor-invited, incentivized (with the incentive named). Reviews copied from other sites are never accepted.

### 7.4 Moderation

- Automated: duplicate text, device and IP clusters, bursts of reviews for one product, reviewer from the vendor or a competitor, personal data detection and redaction.
- Human: everything flagged, all level 3 proofs, all vendor disputes.
- Public reason codes for every removal, counted on the product page.

### 7.5 Legal (United States, get a lawyer to review)

- **FTC rule on consumer reviews and testimonials** (16 CFR Part 465, in force since 21 October 2024) bans fake reviews (including AI-generated fake reviews), buying reviews conditioned on sentiment, undisclosed insider reviews, review suppression, and company-controlled review sites posing as independent. Civil penalties are over $50,000 per violation.
- **FTC Endorsement Guides**: incentivized reviews must be disclosed, and the incentive cannot depend on the rating.
- **Never seed fake reviews** to fill empty categories, and never copy reviews from G2, Capterra or anywhere else (their terms and copyright forbid it).
- Privacy: privacy policy, cookie consent, GDPR if you accept EU reviewers, CCPA for California.

### 7.6 Cold start (the hardest problem)

1. Invite vendors to claim free profiles; give them free review invites and free badges so they send their own customers.
2. Founding vendor offer (section 8.4).
3. Reviewer incentive budget with disclosure, same reward whatever the rating.
4. Partner with communities (SaaS founder groups, accountant and HR communities) for verified practitioner reviews.
5. Our own hands-on notes for launch categories, clearly labeled as editorial, not as reviews.

---

## 8. Pricing model (USD)

### 8.1 Principles

Decided: everything is free for vendors at launch. Sections 8.2 to 8.4 are a proposal to revisit once there are listings and traffic.

- Buyers never pay.
- Every vendor gets a free listing.
- All vendor prices are published on our site (unlike G2's "contact us").
- Annual billing gets 2 months free.
- Paid plans buy tools and data, never position, scores or review control.

### 8.2 Vendor plans

| Plan | Monthly | Annual | For | Includes |
|---|---|---|---|---|
| **Free** | $0 | $0 | Every vendor | Claimed profile, fact editing (goes through verification), respond to reviews, 25 review invites a month, basic analytics (views, clicks), free badges and review widget, 1 seat |
| **Growth** | $149 | $1,490 | Small SaaS | Unlimited review invites with automation (email, CSV, webhooks), full analytics (category position history, who you are compared with and how often), tracking for 5 competitors, video and 20 screenshots, demo and quote request routing, review syndication to your own site, 3 seats |
| **Pro** | $499 | $4,990 | Growing vendors | Everything in Growth, plus buyer-intent signals (company-level, aggregated from category and compare activity, privacy-safe), HubSpot and Salesforce integration, API access, up to 5 products, quarterly review-theme report, 10 seats |
| **Enterprise** | from $1,500 | custom | Large vendors | Unlimited products, SSO, dedicated support, custom exports, intent API |

For comparison, G2's published Starter plan is $2,999 a year and its higher tiers and intent data run from about $10,000 to over $50,000 a year.

### 8.3 Sponsored placements (start once traffic justifies it)

- Up to 3 sponsored slots per category page, in their own labeled row, never mixed into the organic list.
- Cost per click with a **public rate card** of minimum bids per category tier (for example $2, $5, $10, $15), second-price auction.
- **Quality floor**: a product needs a rating of at least 3.5 from at least 5 verified reviews to buy a slot, which protects buyers.
- "Why am I seeing this?" explains the rule on every slot.
- Invalid clicks filtered with automatic credits, and vendors get their own click logs (a common complaint about Capterra).
- Start when traffic reaches about 50,000 monthly visits; before that, the slots are worth too little to sell.

### 8.4 Other revenue

1. **Pay-per-lead** (later): buyer-initiated demo or quote requests, $40 to $150 per lead depending on category, 14-day return window for invalid leads, buyer chooses each vendor.
2. **Affiliate commissions**: many SaaS products pay 20% to 30% recurring. Likely the earliest revenue. Disclosed on every link and listed on each category page under "who pays us". Never affects rank.
3. **Data reports and licensing** (later): pricing index, category trend reports.
4. **Founding vendor offer**: the first 100 vendors get Growth free for 6 months, to fill profiles and start review invites.

### 8.5 Billing

No company is registered yet, so the plan is a merchant of record (Paddle or Lemon Squeezy). It sells on your behalf and handles sales tax and VAT. Revisit once the company is set up.

---

## 9. Feature list

Tags: **[MVP]** at launch, **[v2]** months 3 to 6, **[v3]** months 6 to 12.

### 9.1 Buyers

- [MVP] Search with autocomplete across products, categories, vendors and alias terms
- [MVP] Category pages: organic list sorted by score, filters (company size, pricing model, free plan, free trial, deployment, platform, integrations, features, data residency, compliance)
- [MVP] Segment view: "ratings from companies with 11 to 50 employees", by industry
- [MVP] Product profile: summary, score with explanation, pricing table with verified date, hidden-cost flags, features, integrations, screenshots, security and compliance (SOC 2, ISO 27001, GDPR, HIPAA, which plan includes SSO), contract terms (trial, cancellation, data export, minimum seats, annual-only, auto-renewal), support channels, reviews with filters, review source mix, moderation counts, vendor responses
- [MVP] Side-by-side compare of up to 4 products (on the fly, not indexed)
- [MVP] No sign-up needed to see anything
- [v2] Price history chart and "what people paid"
- [v2] Shortlist: save products and notes, share a link with the team, export to CSV or PDF
- [v2] Follow a product: email on price or rating changes
- [v2] Requirements wizard: 5 to 8 questions, then a ranked shortlist with reasons, no phone call, no contact details needed
- [v2] Demo or quote request with explicit choice of vendors and a record of who received the details
- [v3] Ask verified reviewers a question
- [MVP] WCAG 2.2 AA accessibility

### 9.2 Reviewers

- [MVP] Structured review form with autosave
- [MVP] Email, work-email and LinkedIn verification
- [MVP] Display options: full name, initials, or anonymous but verified
- [v2] Proof-of-use upload (private storage)
- [v2] Update a review later, with history kept
- [v2] Notification when the vendor responds
- [MVP] Automatic incentive disclosure

### 9.3 Vendors (portal)

- [MVP] Claim profile (domain email or DNS TXT check)
- [MVP] Edit product facts; changes go to verification and show "vendor-provided" until checked
- [MVP] Pricing editor with plan structure; every change is logged and feeds public price history
- [MVP] Respond to reviews publicly; flag with a reason
- [MVP] Review invite links and badges
- [v2] Email campaigns, CSV upload, HubSpot, Salesforce, Intercom, Zapier and webhook triggers
- [v2] Analytics: profile views, category impressions, position history, compare traffic, outbound clicks, leads
- [v2] Billing and plans, team seats and roles
- [v3] Buyer-intent signals (Pro)
- [v3] Sponsored campaigns: bids, budgets, click logs, invalid-click credits

### 9.4 Admin and editorial

- [MVP] Taxonomy manager: categories, aliases, merges with automatic 301 redirects, inclusion criteria, features per category
- [MVP] Product catalog with data-completeness score
- [MVP] Fact store: value, source URL, capture date, snapshot, who verified it and when, provenance (vendor, editor, user)
- [MVP] Price verification queue on a 90-day cycle
- [MVP] Review moderation queue with fraud signals
- [MVP] Editorial workflow: draft, checks, editor review, approved, published; assignments; edit-share tracking
- [MVP] Quality gate dashboard: index status per page with the reasons it fails
- [MVP] Redirect manager and audit log of every change
- [v2] Monthly transparency report generator

### 9.5 Platform and SEO

- [MVP] Pre-built category pages, plus edge-cached on-demand product pages that refresh when their data changes
- [MVP] Sitemaps by page type built from `index_status`
- [MVP] Structured data generator per page type
- [MVP] Canonical and redirect logic (compare ordering, alias slugs, merges)
- [MVP] Bot protection on forms (Cloudflare Turnstile, free)
- [MVP] Transactional email
- [v2] Internal link jobs and orphan detection
- [v2] Source link monitor
- [v2] Search Console data import per page type

---

## 10. Tech stack and database

### 10.1 Stack (Vercel now, Cloudflare when earning, VPS possible later)

| Need | Choice | Why |
|---|---|---|
| Framework | Astro + TypeScript + Tailwind, with React components for interactive parts (filters, compare, review form, vendor portal) | Small server code that fits Cloudflare's free limits; adapters for Vercel, Cloudflare and Node |
| Database | Postgres on Neon, Drizzle ORM, SQL migrations in the repo, reached from Cloudflare through Hyperdrive (free plan: 100,000 queries a day) | Plain Postgres, no lock-in |
| Auth | Better Auth (library, users stored in our Postgres) | Replaces Supabase Auth; email links, Google and LinkedIn sign-in |
| Files | Cloudflare R2 | 10 GB free, no egress fees; private bucket for proof-of-use uploads |
| Search | Postgres full-text search + `pg_trgm` to start; Meilisearch or Typesense later | Both later options can be self-hosted |
| Email | Resend free tier to start, Amazon SES at volume | |
| Product analytics | PostHog free tier | Kept out of the main database |
| Click and billing events | Our own table, partitioned by month (or a separate Neon project) | CPC billing needs records we control |
| Background jobs | GitHub Actions on a schedule for heavy jobs (quality gate recompute, price checks), Cloudflare Cron Triggers for light ones | Free; heavy work stays out of the 10 ms request limit |
| Payments (later) | Paddle or Lemon Squeezy as merchant of record | No registered company yet; they handle sales tax and VAT |
| AI calls | Claude API for research packets and checks | Server-side only |

Avoid Vercel-only storage products (Vercel KV, Blob, Edge Config) so the move to your own hosting stays simple.

**Hosting path:** Vercel's Hobby plan is for non-commercial personal use only. It is fine while the site earns nothing (no paid plans, no affiliate links). Before any revenue starts, deploy to Cloudflare's free plan, which allows commercial use. Since Cloudflare is the target and is also free, deploying there from day one would avoid the move entirely.

Cloudflare free plan limits to design around (checked November 2026):

| Limit | Free plan | How we stay inside it |
|---|---|---|
| Server code size | 3 MB compressed | Astro, few heavy server libraries |
| CPU per request | 10 ms (time spent waiting on the database does not count) | Heavy work in SQL or scheduled jobs; rendered pages cached |
| Requests that run code | 100,000 a day | Static files do not count; product pages cached at the edge |
| Static files | 20,000 per deployment | Pre-build category and guide pages only; render product, compare and alternatives pages on demand |
| Hyperdrive database queries | 100,000 a day | Cached pages rarely touch the database |

If traffic outgrows these, Workers Paid costs $5 a month.

### 10.2 Database options (free tiers checked November 2026)

| Option | Free tier | Type | Fit for this project | Moving to own hosting |
|---|---|---|---|---|
| **Neon** (recommended) | 1 GB storage per project (20 GB across free projects), 100 projects, 100 compute-hours per project per month, 5 GB egress per project per month, scales to zero after 5 minutes, 6-hour restore window | Postgres | Best fit: relational data, full-text search, branches for preview deploys, Vercel integration | `pg_dump` to any Postgres |
| Turso | 100 databases, 5 GB total, 500 million rows read and 10 million written per month | SQLite (libSQL) | Generous, good for read-heavy pages, weaker for complex joins, search and reporting; different SQL dialect | Self-host libSQL server or a SQLite file |
| Cloudflare D1 | Free tier with daily read and write caps | SQLite | Only makes sense if the app moves to Cloudflare Workers | SQL export |
| New Supabase project | 500 MB database, 5 GB egress, 2 active free projects, pauses after 7 days idle | Postgres plus auth and storage | Same limits that you already hit | `pg_dump` |
| Oracle Cloud Always Free VM | 4 ARM cores, 24 GB RAM, 200 GB disk (check current terms) | Run Postgres yourself | Most resources for $0, but you handle backups, updates and security, and idle free VMs can be reclaimed | Already self-hosted |
| Small VPS (Hetzner or similar) | Not free, about $5 to $8 a month | Run Postgres yourself | The planned end state | n/a |

**Recommendation: Neon free plan now, your own Postgres later.** Honest caveat: Neon is only a database. Supabase also gave you auth, storage and realtime, which is why the stack above adds Better Auth and R2. The trade is worth it because every piece is portable.

### 10.3 Why a free database can carry this site

Category and product pages are static files refreshed when data changes. Visitors read the cached page, not the database. The database is queried when a page is rebuilt, when someone writes a review, and from the admin tools. Rough first-year storage:

| Data | Rows | Size |
|---|---|---|
| Products and vendors | 20,000 | about 100 MB |
| Reviews | 100,000 | about 300 MB |
| Facts and price history | 200,000 | about 100 MB |
| Indexes and overhead | | about 150 MB |
| **Total** | | **about 650 MB**, inside 1 GB |

Click logs and analytics go to PostHog or a second Neon project, so they do not fill the main database.

---

## 11. Data model outline

```
departments, categories (parent_id, aliases[], definition, inclusion_criteria, status, index_status, primary_keyword, quality_score)
category_features
vendors, vendor_members, products, product_categories (is_primary)
features, product_features (value, fact_id)
pricing_plans, price_points (history)
facts (subject_type, subject_id, field, value, source_url, captured_at, snapshot_url, provenance, verified_by, verified_at)
users, reviews (ratings, text, source_type, incentive, verification_level, status), review_verifications
moderation_actions (public reason code), vendor_responses
subscriptions, ad_campaigns, bids, click_events (partitioned), leads, lead_consents
editorial_docs (ai_draft, final, editor_id, edit_share, checks_passed, signed_off_at)
page_index_status (url, page_type, status, reasons[], changed_at)
redirects, audit_log
```

---

## 12. Roadmap

| Phase | When | Deliverables |
|---|---|---|
| 0. Setup | Weeks 1 to 2 | Brand and domain (section 15), `data/taxonomy.csv` loaded into the database (all `noindex`), legal pages drafted, repo set up with Astro, Neon, Better Auth and R2 |
| 1. MVP | Weeks 3 to 10 | Catalog, category and product pages, review collection and verification, vendor claim, admin tools, quality gate engine, editorial workflow, sitemaps. Content: the 50 wave-1 categories drafted by Claude and signed off by you, about 1,000 products with verified data |
| 2. Growth | Months 3 to 6 | Review acquisition (vendor invites, badges), free vendor self-listing, 150 indexed categories (rest of wave 2), compare and alternatives pages under the gate, first price-change report |
| 3. Scale | Months 6 to 12 | 300+ indexed categories (wave 3 begins), move to Cloudflare, then decide and launch paid vendor plans, sponsored slots once traffic allows, requirements wizard, price alerts |
| 4. Full catalog | Month 12+ | All 557 categories at or above the gate, Workers Paid ($5/mo) or a VPS if traffic outgrows the free plan, additional languages |

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| Too few reviews (cold start) | Free vendor tools, founding offer, disclosed incentives, editorial hands-on notes, depth in 1 or 2 departments first |
| Thin or scaled content | Quality gate, rollout pacing, Search Console monitoring by page type |
| Fake review attacks and legal exposure | Verification levels, fraud signals, public moderation, legal review |
| AI answers taking clicks | Own unique data (prices, history, review statistics) that AI answers cite; long-tail and comparison intent |
| Wrong vendor data | Sources and dates on every fact, vendor corrections queue, public corrections log |
| AI-drafted prose at scale (Google's scaled content policy) | Data-first pages, your sign-off on every page, the quality gate, at most 50 new indexed pages a week, a freelance editor for top pages once there is budget |
| Hosting limits | Move from Vercel Hobby to Cloudflare before any revenue; Workers Paid ($5/mo) if the free limits are reached |

---

## 14. Open items

The launch questions were answered on 2 November 2026 (section 0.1). Still open:

1. Brand name and domain: shortlist in section 15.
2. Paid vendor plan prices: decide once there are listings and traffic (section 8).
3. Whether to deploy to Cloudflare from day one instead of starting on Vercel Hobby, which would avoid a move later.
4. When budget allows: a freelance editor for the highest-traffic pages.

---

## 14a. Build status (3 November 2026)

Version 0.1 of the site is built in this repo (see `README.md`).

- **Built:** Astro 7 + Tailwind 4 static site. All 557 category pages, 21 department pages, a categories index with filter, the product page template, methodology and transparency pages, the quality gate, the writing-rule checks, sitemaps split by type, and robots.txt. 29 unit tests pass.
- **Changed from section 10:** until the database is set up, the catalog lives in files (`data/taxonomy.csv`, `content/products/*.json`, `content/categories/*.md`). Only `src/lib/catalog.ts` and `src/lib/reviews.ts` read this data, so moving it to Neon later changes those two files, not the pages.
- **Not built yet:** database, reviews and verification, vendor accounts, search, deployment.
- **Needed from you later:** the brand name, a Neon account, a hosting account (Vercel or Cloudflare), and Git installed so the code can go to GitHub.
- **First category filled (3 November 2026):** Password manager, with 10 products (1Password, Bitwarden, Dashlane, Keeper, LastPass, NordPass, Passbolt, Proton Pass, RoboForm, Zoho Vault). Every price was read from the vendor's own site and confirmed by a second, independent check. The category copy (about 1,300 words) passes every writing rule. Still blocking indexing: screenshots for 5 products, reviews or hands-on notes for 5 products, your approval of the inclusion criteria, and your sign-off.
- **Second category filled (3 November 2026):** Time tracking, with 11 products (Buddy Punch, Clockify, Everhour, Harvest, Hubstaff, Kimai, QuickBooks Time, Time Doctor, TimeCamp, Timely, Toggl). Prices were confirmed by a second, independent check. The category copy (about 1,800 words) covers recording laws in the EU, Germany, Spain, the UK and the US, and monitoring rules from the UK ICO and France's CNIL. Jibble was left out because it publishes no paid prices and has no submit-for-approval step yet. New schema fields: `listedPrice` for vendors with no USD price (Kimai, in euros) and `baseFeeUsd` for plans with a monthly base fee (QuickBooks Time, Buddy Punch). The same four items block indexing as for Password manager.
- **Third category filled (3 November 2026):** Uptime monitoring, with 11 products (Better Stack, Checkly, HetrixTools, Hyperping, Pingdom, Site24x7, StatusCake, updown.io, Uptime.com, UptimeRobot, Uptrends). Prices were confirmed by a second, independent check. The category copy (about 1,900 words) covers check locations and failure confirmation, interval maths, alert costs, free-plan terms, the CA/Browser Forum certificate lifetime schedule, Let's Encrypt changes, and the AWS, Cloudflare and GitHub postmortems. Oh Dear was left out because it checks each site from one chosen location and uses a second only to confirm a failure. UptimeRobot shows prices by visitor region; we list the USD figures from an archived copy of its pricing page and say so on the product page. Same four items block indexing.
- **Fourth category filled (3 November 2026):** Subscription billing, with 11 products (Chargebee, ChargeOver, FastSpring, Lago, Lemon Squeezy, Maxio, Paddle, Polar, Recurly, Stripe Billing, Zoho Billing). The copy covers merchant of record versus billing layer, Wayfair and EU OSS, dunning, card portability, payout holds, the vacated FTC click-to-cancel rule and California's auto-renewal law. Billsby was left out because its website was down on the day of checking. New schema field `volumeFee` shows share-of-revenue and per-transaction pricing. Same four items block indexing.

## 15. Brand name shortlist

Checked on 2 November 2026 against Verisign's registry records (RDAP), which are the authoritative source for whether a `.com` is registered. The .com registry has no premium tier, so an unregistered `.com` sells at each registrar's standard price. Nothing has been bought, and availability can change at any time.

**Correction:** the first round used GoDaddy's availability tool, which listed StackProof, BuyClear, Verdictly, SoftwareVerdict, ClearBuyer, GlassStack, SoftwareLedger, Proofr and ListFair as available. The registry shows all nine are already registered, so they are off the list.

### Shortlist (all unregistered `.com`)

| Name | Domain | Why it fits |
|---|---|---|
| **SoftwareCandor** | softwarecandor.com | Says what the site covers and what it promises. Risky: many companies already use "Candor" in their names. |
| **BuyerTally** | buyertally.com | A tally is a count of real reviews and real prices, and the name puts the buyer first |
| **SoftwareReceipts** | softwarereceipts.com | Receipts as proof: dated prices, verified reviews, what people actually paid |
| **StackCandor** | stackcandor.com | Shorter version of the first; "stack" is how buyers talk about their tools |
| **CompareProof** | compareproof.com | Comparisons backed by evidence |
| **PriceCandor** | pricecandor.com | Leans on price transparency; narrower than the whole site |
| **FairShortlist** | fairshortlist.com | Describes what buyers do on the site; long |
| **CandidSaaS** | candidsaas.com | Short; "SaaS" narrows it to cloud software |

Also unregistered: softwareproven.com, softwaretally.com, softwarereceipt.com, saasreceipts.com, shortlistproof.com, plainbuyer.com, softwareplain.com, softwarecandid.com, candidmeter.com, verdictclear.com, verdictfair.com, verdictsaas.com, proofedstack.com, b2bverdicts.com.

Avoid openstackreview.com: OpenStack is an existing trademark.

### Coined names (checked 3 November 2026, preferred)

Names built from common words (Candor, Verdict, Clear) collide with existing companies and make weak trademarks. Made-up words are the strongest marks and the most likely to be free. Of 300 coined names checked, these 55 have `.com`, `.net`, `.org` and `.ai` all unregistered (registry RDAP). `.io` and `.co` have no public RDAP service and were not checked.

Still to do before choosing: a web search for companies already using each finalist, and a USPTO / WIPO trademark search in classes 35 (business information) and 42 (software as a service).

| Name | Domain | Idea |
|---|---|---|
| **Weighvane** | weighvane.com | Weigh the options; a vane shows which way to go |
| **Lumivett** | lumivett.com | Light on vetted software |
| **VettScope** | vettscope.com | A close look at vetted products |
| **Siftvane** | siftvane.com | Sift the options, then point the way |
| **Tallyvane** | tallyvane.com | A tally of real reviews and prices |
| **Peervane** | peervane.com | Direction from peers |
| **Stackfide** | stackfide.com | A bona fide view of your software stack |
| **Choicevane** | choicevane.com | Points to the right choice |

Also free on all four endings: assaybo, assaylo, benchello, benchlo, benchvane, candilume, candisift, candivane, choicelume, evidello, evidvo, fidalist, fidasift, fidvio, gaugello, gaugevane, honesift, honvane, lucidsift, lumiproof, lumisift, lumvetta, maravett, opalsift, peerello, plumbello, plumbsift, plumbvane, quorlist, saasello, saasvane, siftista, softwisa, tallilane, toolello, vanelist, vaneproof, verdivane, vettello, vettista, vettledger, vettmark, vettvane, weighlist, weighlume, weighsift, weighvio (all `.com`; lumvetta's `.org` could not be checked).

### What a `.com` costs now

- Verisign raised the .com wholesale fee from $10.26 to $10.97 on 1 November 2026. With the $0.20 ICANN fee, no registrar can sell a `.com` at cost for less than $11.17 a year.
- So a price under $10 is only possible as a **first-year promotion**, where the registrar takes a loss to win the customer. Price-comparison sites cite Spaceship for this, but figures conflict; check the live price and any promo code at checkout.
- Renewals cost at least $11.17 a year everywhere. Cloudflare Registrar sells at cost, so it is the cheapest to keep long term; some registrars renew at $18 or more.
- Cheapest route: register where the first-year promo is lowest, then transfer to Cloudflare Registrar once the 60-day transfer lock ends. The transfer adds a year at Cloudflare's at-cost price, and the site is moving to Cloudflare anyway.

### Before buying

1. Trademarks in your main markets: USPTO (US), UKIPO (UK), the WIPO Global Brand Database, and India's IP office if you plan to register there.
2. Social handles (LinkedIn, X, YouTube) for the same name.
3. That the name is not close to a competitor's brand (G2, Capterra, GetApp, Software Advice, TrustRadius, Trustpilot).

