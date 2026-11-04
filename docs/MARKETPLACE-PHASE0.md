# Marketplace plan, Phase 0: decisions and gaps

Prepared 4 November 2026. No code in this phase. Prices and plan limits below come from docs/PLAN.md (checked November 2026) or from my background knowledge, and are marked. Check every price on the vendor's own page before paying.

## 1. What changes technically

Today the site is static files. Reviews, vendor logins, quote requests and payments all need a server and a database. The category and product pages can stay static. Only the interactive parts run code.

| Need | Recommended default | Alternative | Monthly cost to start |
|---|---|---|---|
| Hosting for pages and server routes | Stay on Vercel and upgrade to the Pro plan | Move to Cloudflare Pages and Workers (free plan allows commercial use, per PLAN.md 10.1) | Vercel Pro about $20 per member (background knowledge, check). Cloudflare free, then $5 if limits are hit (PLAN.md) |
| Database | Neon Postgres, Drizzle ORM | Supabase (the existing free project is near its limits) | Free tier first (1 GB, PLAN.md 10.2), paid plan later |
| Sign-in | Better Auth in our own Postgres. Email links, plus Google and LinkedIn | Clerk or Auth0 (easier, costs more at volume) | $0 |
| Files (proof of use, screenshots) | Cloudflare R2 private bucket | S3 | $0 within the free tier (PLAN.md) |
| Email (verification, lead delivery) | Resend | Amazon SES at volume | $0 free tier, then about $20 (background knowledge, check) |
| Payments | Paddle or Lemon Squeezy as merchant of record while there is no registered company | Stripe once a company and bank account exist | Percentage of sales (check current rates) |
| Analytics | PostHog, loaded only after consent | Cookieless analytics | $0 free tier |
| Scheduled jobs | GitHub Actions | Cloudflare Cron | $0 |

**Recommendation.** Keep Vercel and move to Pro the day the first paid feature or affiliate link goes live. That avoids a migration while the product is still changing, and it removes the non-commercial restriction on the free plan. Expect roughly $20 to $60 a month at the start. If cost matters more than speed, Cloudflare is the cheaper path and PLAN.md already prefers it, but it means moving the site.

**Hosting rule.** Vercel's Hobby plan is for non-commercial personal use (PLAN.md 10.1, and the compliance review flagged it). I have not re-read Vercel's terms this session. Do not take money, run ads or add affiliate links until the plan is changed. Reading the terms yourself first is worth five minutes.

**Architecture rule.** Pages that rank (categories, products) stay static and rebuild when data changes. Reviews are written to the database and shown through a server route or a rebuild. The quality gate keeps working because review counts come from the same place.

## 2. What I need from you

I will not guess any of these. Until you supply them the legal pages stay hidden from search and from the footer.

1. **Who runs the site.** Your full name or a company name, as it should appear in legal notices.
2. **Country** you and the business are in, and the legal form (sole trader, company, not yet registered).
3. **A public contact email** that will be read. A postal address if the law in your country requires one or you want to show one.
4. **Who the editor is.** The person who signs off category pages. Right now the page says "B2BRated site owner".
5. **Who owns privacy and terms questions** (probably you).
6. **Whether to publish the AI disclosure.** The About page says category pages are drafted with AI assistance, checked against vendor pages and signed off by the editor. It is true. Say if you want it removed or reworded.
7. **Bank and payment account** before any money is taken: Stripe needs a legal entity and a bank account. Paddle and Lemon Squeezy sell for you but still need identity and payout details.
8. **A lawyer.** The texts are drafts. One review pass before paid features start is worth the cost. Which country's law applies depends on item 2.

## 3. Compliance checklist

Status: **Drafted** means a page now exists in the code and is hidden until item 1 to 4 above are filled. **Later** means it is needed before a named feature.

| Item | Needed before | Status |
|---|---|---|
| Privacy notice, short version | Now (the host logs IP addresses) | Drafted: /privacy |
| Terms of use | Now | Drafted: /terms |
| Contact and corrections route | Now (the site promises corrections) | Drafted: /contact |
| About page with named owner and editor | Now | Drafted: /about |
| Advertising and sponsorship rules | Any paid feature or affiliate link | Drafted: /advertising-disclosure |
| Review guidelines | Review collection | Drafted: /review-guidelines |
| Public statements that would become false | Any paid feature | Not changed yet. List in section 4 |
| Full privacy notice (reviewer, vendor and lead data, processors, retention, transfers) | Reviews, accounts, leads | Later (Phase 2) |
| Consent banner and cookie notice | Analytics or any non-essential cookie | Later (Phase 8) |
| Marketing email rules (CAN-SPAM in the US, PECR and GDPR in the UK and EU): physical address, unsubscribe, consent | Newsletter or review-request emails | Later (Phase 7) |
| Copyright takedown contact and a registered DMCA agent (US) | User-submitted text or images | Later (Phase 2) |
| Vendor terms of service | Vendor accounts | Later (Phase 4) |
| Lead handling terms: consent text, named recipient, refund process | Quote and demo buttons | Later (Phase 5) |
| FTC rule on fake and incentivised reviews (16 CFR Part 465), endorsement disclosure | Reviews and any paid relationship | Rules written into the guidelines; moderation not built |
| GDPR processing records, processor agreements, breach routine | Any personal data stored | Later (Phase 2) |
| Accessibility statement and a real audit | Before claiming conformance | Later |

Several legal points in docs/audit/compliance-drafts.md rest on background knowledge because official pages would not open (ICO, CMA, EUR-Lex). A lawyer should confirm them.

## 4. Public statements that become false when money starts

These must change before the first paid feature, not after. I have not changed them, because they are true today.

| Where | Statement today | Why it breaks |
|---|---|---|
| Footer (BaseLayout.astro) | "No vendor pays to be listed or ranked." | False once any vendor pays for a profile, lead or placement |
| Home page | "Nobody pays to be listed or ranked." and the principles block | Same |
| /transparency | "No vendor pays us anything", "Vendors paying us: 0", the rules list | The count must come from real data; the sentence must go |
| /methodology | "No vendor can pay to be listed or to skip a requirement." | Stays true if payment never buys a listing. Reword to say what payment does buy |
| /llms.txt | "no vendor pays to be listed or ranked" | Same |
| Product pages, "Who pays us" | "does not pay us anything" | Becomes data driven |
| Schema and meta descriptions | none claim independence of payment | Check again after copy changes |

The wording I would use once money exists: "Vendors can pay us for tools such as profiles and lead requests. Payment never changes a score, a position or whether a product is listed. Sponsored products sit in a separate labelled block." That is already written into the advertising page as rules.

## 5. Risks to decide on before building

1. **Pay for placement and trust.** Paid and sponsored placement in the same list as organic ranking is what readers distrust in the big sites. The plan keeps them in separate, labelled blocks. This is the single biggest legal and reputational line in the project.
2. **A score without data.** A 0 to 100 score needs reviews and checked facts behind it. With no reviews, the honest options are "Not scored yet" or a score built only from our own checks, labelled as such. Phase 3 will have to choose.
3. **Cold start.** A review site with no reviews has no pull. PLAN.md 7.6 lists free vendor profiles, vendor-invited reviews with a visible label, and disclosed rewards that do not depend on the rating. No seeded reviews, ever.
4. **Lead prices.** PLAN.md suggests $40 to $150 per lead. Leads are worth that only with real traffic. The site has 52 indexable pages and has not been crawled yet.
5. **Revenue order.** The least risky order is affiliate links with disclosure, then claimed profiles, then leads, then sponsored placement. Each step needs the pages above and the Pro hosting plan.
6. **Draft category pages.** Six categories sit uncommitted from stopped agents and seven are under the eight-product minimum. They do not affect this plan, but they shape which categories can earn first.

## 6. Proposed order after Phase 1

Phase 2 reviews, Phase 3 scores, Phase 4 vendor accounts, Phase 5 leads, Phase 6 paid products, Phase 7 growth features, Phase 8 measurement. Each phase ends with a demo and waits for your approval before anything is committed or deployed.
