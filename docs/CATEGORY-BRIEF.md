# Category fill brief (read before starting)

Fill ONE category end to end. Your slug is given in your task. Look it up in data/taxonomy.csv for name, must_have and aliases.

Read first: README.md, docs/PLAN.md (writing rules, quality gate), src/content.config.ts, src/lib/content-checks.ts, scripts/check-content.ts. Templates: content/categories/subscription-billing.md and content/products/paddle.json, polar.json. Pick a closer template from content/categories/ if a similar category exists.

## Deliver
- 8 to 11 qualifying products as content/products/<slug>.json. status published, primaryCategory = your slug, qualifies[] with one entry per category and a sourceUrl for each must_have. Use the exact must_have strings from the taxonomy as the evidence capability names. Facts carry sourceUrl and checkedAt. Pricing carries verifiedAt. Add security, contract and integrations only where a vendor page states them. screenshots [], paidRelationship null, all dates 2026-11-04.
- content/categories/<slug>.md with 1,500+ words of original editorial built on real, sourced context, criteriaApproved: false, writer "Claude (AI draft)", and an updateLog entry. Link each product with /products/<slug> and other categories with /software/<slug> (never /categories/).

## Shared files
Other agents write in parallel and many products already exist. Before creating any product file, check it does not exist, and check again right before writing. If it exists, never overwrite it. Read it, add a second qualifies[] entry for your category only if every must_have is sourced from the vendor page, and rewrite the file. Otherwise skip it. Do not change primaryCategory, pricing or other fields of someone else's file.

## Hard rules
- Never fabricate any fact, price, source or review. Read every price and claim from the vendor's own page with WebFetch (not the shared browser). Verify each price a second time with a separate fetch (append ?recheck=1). Leave out any vendor you cannot verify and say why.
- If a page does not say whether a price is monthly or annual, or names no currency, record that in the notes. Do not guess. Use US/USD figures and note location dependence. Non-USD prices go in listedPrice with priceUsd null.
- pricing.model must match the plans: use quote_only only when no plan has a price.
- billing one_time only for genuine one-off licences, not per-check, per-term or credit-pack prices.
- No git, no deploys, no purchases, no sign-ups, no edits under src/.

## Writing rules (check:content enforces these)
- Files are UTF-8 without a BOM. Use the Write tool, not Set-Content or Out-File.
- No sentence starts with And, But, Also or So.
- No banned words such as next-gen, next-generation, streamlined, unlock, seamless, placeholder, harness, ultimate, even in summaries and facts.
- Meta description and definition under 155 characters. No ", which is why". Sentences under 40 words. No dashes or bold text in prose.

## Verify
Build with `npx astro build --outDir <unique temp dir under your scratch space>` (never the shared dist or .astro). Run `npm test` and `npm run check:content`. Fix every ERROR in your files. Report products included and excluded with reasons, word count, weak evidence, and anything unresolved.
