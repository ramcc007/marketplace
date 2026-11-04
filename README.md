# Software marketplace (working name)

A B2B software review and comparison site built on trust: dated prices with sources, written inclusion criteria per category, and rankings that money cannot move. The full plan is in [docs/PLAN.md](docs/PLAN.md).

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22 or newer) |
| `npm run dev` | Dev server at http://localhost:4321. Shows draft products and an "Editor view" box explaining why each page is or is not indexed. |
| `npm run build` | Static build into `dist/` (583 pages today) |
| `npm run preview` | Serve the production build locally |
| `npm test` | Unit tests for the taxonomy, quality gate and writing rules |
| `npm run check` | TypeScript and Astro type check |
| `npm run check:content` | Run the writing rules over category copy and product summaries. Exits with code 1 on any error. |

Set `PUBLIC_SITE_URL` (for example `https://example.com`) before a production build so canonical URLs, sitemaps and robots.txt use the real domain.

## How it fits together

```
data/taxonomy.csv          557 categories: slugs, aliases, draft inclusion criteria, launch wave
content/products/*.json    One file per product; every fact carries a source URL and a check date
content/categories/*.md    Editorial copy per category (none written yet)
src/lib/taxonomy.ts        Parses the CSV; fails the build on any malformed line
src/lib/catalog.ts         The only module that knows where product data lives
src/lib/reviews.ts         Review counts (always 0 until the database is connected)
src/lib/quality-gate.ts    Thresholds from PLAN.md 4.1; decides index or noindex per page
src/lib/content-checks.ts  Writing rules from PLAN.md 6.4 as code
src/lib/site-index.ts      Runs the gate for every page once per build
src/pages/                 Home, categories, departments, category, product, methodology,
                           transparency, 404, robots.txt and sitemaps
```

Every page's robots tag and every sitemap entry come from the same gate result, so they cannot disagree. Today every category and department page is `noindex, follow` because no products, reviews or editorial copy exist yet; the home, categories, methodology and transparency pages are indexable.

## Adding content

- **Product:** add `content/products/<slug>.json` matching the schema in `src/content.config.ts`. Keep `"status": "draft"` until the facts are checked. A product appears in a category only when its `qualifies` entry lists every must-have from `data/taxonomy.csv`.
- **Category copy:** add `content/categories/<slug>.md` with the frontmatter in `src/content.config.ts`. Run `npm run check:content`, then set `criteriaApproved`, `editor` and `signedOffAt` once reviewed.
- `content/products/example-ledger.json` is a fictional draft used to check the product template in dev. Drafts never appear in a production build.

## Admin dashboard (local only)

```
npm run admin
```

Open the address it prints, including the `?token=` part. It listens on `127.0.0.1` only, the token changes on every start, and it adds no page to the public site.

- **Overview and Pages:** every page with its quality-gate result and the reasons it is still out of search, sortable and filterable.
- **Edit:** products open as JSON and categories as markdown. Saving is refused when the JSON does not parse. The writing rules run on every check.
- **Approvals:** buttons set `criteriaApproved`, `editor` and `signedOffAt` in a category file. They are an editor's decision and change only that file.
- **Checks and live site:** run the writing checks, the tests, or a build into a temporary folder, see `git status`, and check status codes and robots headers on https://b2brated.com.

The dashboard never commits, pushes or deploys. Publishing stays a terminal step: review `git status`, commit, push. Its page list is computed by `scripts/admin/data.ts`, which imports the same gate and writing-rule code as the build; `tests/admin-data.test.ts` guards against the two drifting.

## Not built yet

Database (Neon) for reviews, vendor accounts and claims; review submission and verification; vendor portal; search beyond the category filter; deployment. Prices and gate results are computed at build time, so the site needs a scheduled rebuild (for example nightly) once it is live.
