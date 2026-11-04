# Security, performance and accessibility findings

Measured 2026-11-04 against https://b2brated.com (Vercel, HTTP/1.1 via curl) and a local build of the working tree (1040 pages, `PUBLIC_SITE_URL=https://b2brated.com`, built to a scratch folder). Measurement only; no site files were changed. Read-only `git` commands were used for the history checks in item 4 because the task required them.

Not run or limited: no CSP/CORS testing in a browser; no real-device or field data (CrUX); Lighthouse ran once per page (no median of runs) and was contaminated by a third-party script (see 7); no screen reader or keyboard test; accessibility is static analysis of built HTML plus Lighthouse's axe checks on one page; the live site deployed slightly before the current uncommitted working tree (live CSS `BaseLayout.CyO9BekM.css` 18,908 B vs local `BaseLayout.BlmI79ET.css` 19,180 B), so local numbers are close to, not identical to, live.

## Ranked findings

| # | Risk | Finding | Where |
|---|------|---------|-------|
| 1 | HIGH (if the site is meant to be found) | Every response, including pages, `robots.txt` and the sitemaps, carries `X-Robots-Tag: noindex, nofollow`, while the page `<meta name="robots">` says `index, follow` and `robots.txt` says `Allow: /` plus a `Sitemap:` line. The header wins, so search engines are told not to index anything. Lighthouse SEO is 66 on all 3 pages solely because `is-crawlable` fails. Fine if this is a deliberate pre-launch block; contradictory otherwise. | `vercel.json` headers rule `source: /(.*)` |
| 2 | MEDIUM | Colour contrast failure: `text-slate-400` (#94a3b8 on white = 2.56:1; axe measured 2.63:1 with #90a1b9) is used for "source" links and "Source, checked <date>" links, 14px text. Fails WCAG AA 4.5:1. About 3,630 such links in 459 built pages (1,744 "Source, checked November 4", 219 "…November 3", 1,667 "source"), plus 58 `<span class="text-slate-400">`. Lighthouse flagged 12 failing nodes on /products/deel (accessibility 96 there, 100 on the other two). | `src/pages/products/[slug].astro` lines 141, 180, 199, 241 (class `text-slate-400`) |
| 3 | LOW-MEDIUM | No security headers beyond HSTS: no Content-Security-Policy, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy, COOP. Real exposure is low because the site is static, has no forms, cookies or auth, and ships no first-party JS beyond one inline script (below). Clickjacking and MIME-sniffing protections are simply absent. | `vercel.json` |
| 4 | LOW | Tap-target risk: nav and footer links are text-only `text-sm` (14px, about 20px line height), no padding, `gap-x-5 gap-y-1` (header) / `gap-y-2` (footer). Below the 24x24 CSS px minimum of WCAG 2.2 SC 2.5.8 in height and well below the 44px guideline; spacing offsets partly mitigate under 2.5.8. Not measured on a device. | `src/layouts/BaseLayout.astro` header/footer |
| 5 | LOW | 462 tables (product pages, `methodology.html` and a few others) have `<th>` in `<thead>` with no `scope` attribute. Browsers infer column headers here, so low impact. The category compare table does set `scope="col"`. | built `products/*.html`, `methodology.html`; source `src/pages/products/[slug].astro` |
| 6 | LOW | 191 outbound links in authored category guide text (e.g. IRS, SBA links in `software/accounting.html`) have no `rel` at all. No link in the site uses `target="_blank"`, so there is no tabnabbing exposure; the only effect is these are followable (no `nofollow`) while product-page vendor links use `rel="nofollow noopener"`. | built `software/*.html`; source in `content/categories/*.md` |
| 7 | LOW | `http://www.b2brated.com` takes two redirects (308 to `https://www.b2brated.com/`, then 308 to `https://b2brated.com/`). Works; one extra round trip. | Vercel domain config |
| 8 | LOW | Two source URLs in product data use `http://`: `http://www.workday.com/...` (content/products/workday-hcm.json lines 12-13, 6 links) and `http://www.watchguard.com/...` and `http://www.securden.com/...` (2 each). These are outbound links, not subresources, so not mixed content, but they open over HTTP first. | `content/products/workday-hcm.json` and the products that include the watchguard and securden URLs |
| 9 | INFO | `categories.html` is 109,310 B raw (15,090 B brotli by local compression; 18,972 B as served); it is 3.2x the next largest page (34,336 B). Cause: 587 links and 568 list items for 557 categories with descriptions, plus a 21-department layout. It is the only page with JS. | `src/pages/categories.astro` output |
| 10 | INFO | `Cache-Control: public, max-age=0, must-revalidate` on HTML (Vercel default, ETag revalidation, `X-Vercel-Cache: HIT`). Fingerprinted CSS has `max-age=31536000, immutable`. Correct as is. | live headers |

Nothing HIGH on the security side: no vulnerable dependencies, no secrets, no unsafe HTML sinks that take user input.

## 1. npm audit

Command: `npm audit --json` in the project folder. Result:

```
vulnerabilities: {}  info 0, low 0, moderate 0, high 0, critical 0, total 0
dependencies: prod 199, dev 89, optional 101, peer 0, total 388
```

No production or dev findings, so there is nothing to classify for reachability. Direct dependencies: runtime `astro ^7.4.5`, `tailwindcss ^4.3.3`, `@tailwindcss/vite ^4.3.3`; dev `@astrojs/check`, `@types/node`, `typescript`, `vitest`. The output is a static `dist` with no server code. An audit reports known advisories only; it says nothing about unreported issues.

## 2. Live headers (`curl -sI -H 'Accept-Encoding: br,gzip'`)

| Header | `/` | `/software/payroll` | `/products/deel` | `/robots.txt` |
|---|---|---|---|---|
| Strict-Transport-Security | `max-age=63072000` (no includeSubDomains, no preload) | same | same | same |
| Content-Security-Policy | absent | absent | absent | absent |
| X-Content-Type-Options | absent | absent | absent | absent |
| X-Frame-Options / frame-ancestors | absent | absent | absent | absent |
| Referrer-Policy | absent | absent | absent | absent |
| Permissions-Policy | absent | absent | absent | absent |
| Cross-Origin-Opener-Policy | absent | absent | absent | absent |
| Cache-Control | `public, max-age=0, must-revalidate` | same | same | same |
| X-Robots-Tag | `noindex, nofollow` | same | same | same |
| Content-Encoding | `br` | `br` | `br` | none (66 B, Content-Length present) |

Other values seen: `Access-Control-Allow-Origin: *` (Vercel static default), `Server: Vercel`, `Content-Type: text/html; charset=utf-8`, `Age: 1218`, `X-Vercel-Cache: HIT`, `ETag` weak on HTML. robots.txt body: `User-agent: *`, `Allow: /`, `Sitemap: https://b2brated.com/sitemap.xml`.

## 3. Redirects (`curl -sI`, first hop only)

| Request | Status | Location |
|---|---|---|
| http://b2brated.com | 308 | https://b2brated.com/ |
| https://www.b2brated.com | 308 | https://b2brated.com/ |
| http://www.b2brated.com | 308 | https://www.b2brated.com/ (then a second 308 to apex) |
| https://b2brated.com/software/payroll/ (trailing slash) | 308 | /software/payroll |
| https://b2brated.com/products/deel/ | 308 | /products/deel |
| https://b2brated.com/Software/Payroll (uppercase) | 404 | none |
| https://b2brated.com/index.html | 308 | / |

Consistent with `vercel.json` (`cleanUrls: true`, `trailingSlash: false`). Uppercase paths do not redirect to lowercase; a 404 is a defensible result.

## 4. Repository scan (excluding node_modules, dist, .astro)

- `.gitignore` contains `node_modules/`, `dist/`, `.astro/`, `.env`, `.env.*`, `!.env.example`, `*.log`, `.DS_Store`, `.claude/`. `git check-ignore -v` confirms `.env`, `.env.local` and `.claude/x` are ignored. No `.env*` file exists in the folder.
- `git log --all --diff-filter=A --name-only | grep -i env` returned one hit, `content/products/openvas-greenbone.json`, a false positive ("op-**env**-as"). No env file was ever added. `git ls-files` shows no `.pem`, `.key`, `.p12`, `.db` or `.claude` files. 50 commits, one author address (`ramcc007@users.noreply.github.com`, the GitHub noreply form).
- Secret patterns (`sk_live`, `sk-...`, `AKIA...`, `ghp_`, `xox[bp]-`, `-----BEGIN`, `api_key = "..."`) over src, public, scripts, data, content, docs, README, tests, config: no matches in the working tree. The same patterns run across all history with `git log -p -G`: no matches. A looser keyword search for "token/password/secret" matched many `content/` files; these are product-category text about those topics, not credentials.
- Email addresses in the tree: none found. Private URLs: only `http://localhost:4321` (README, and as the fallback `site` default in `astro.config.mjs` when `PUBLIC_SITE_URL` is unset) and `https://marketplace-neon-five.vercel.app` (a public Vercel alias, named in `docs/AUDIT-PROMPT.md`). Repo is public, so `docs/PLAN.md` (pricing tiers, roadmap) and `docs/AUDIT-PROMPT.md` are publicly readable; that is a business-confidentiality point, not a security finding.
- `set:html`: one use, `src/components/Seo.astro:25`, JSON-LD output. `serialize()` is `JSON.stringify(data).replace(/</g, '<')`, which prevents `</script>` breakout. Data comes from repo JSON/Markdown, not user input. `innerHTML`, `document.write`, `eval(`, `dangerouslySetInnerHTML`: no matches in src, public, scripts.
- External script/style tags: none. No `<script src>`, no remote `<link>`, no `@import url`, no Google Fonts. Fonts are the system stack only (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto ...`); no webfont files.
- Inline JS in the build: one `<script type="module">` (categories filter) in `categories.html` only. JSON-LD: 1,561 `<script type="application/ld+json">` blocks. Because of the one inline script, a strict CSP would need a hash or nonce for it.
- Mixed content: none in the built HTML subresources. `http://` appears only in XML namespaces (`sitemaps.org`, `w3.org`) and the three outbound vendor hrefs listed in finding 8.

## 5. Outbound links

Built HTML: 24,133 anchors, 5,206 with an `http(s)` href, 0 with `target="_blank"` (so none lacks `rel`). Product page vendor/source links all use `rel="nofollow noopener"` (`src/pages/products/[slug].astro` lines 91, 108, 141, 180, 199, 221, 241, 247). The 191 anchors without any `rel` are in authored category guide text (finding 6). 0 `<img>` elements in the site, 0 `<form>` elements.

## 6. Size and request measurements

Live, from curl (`-w time_starttransfer`; single run each, from this machine, HTTP/1.1, Vercel edge `bom1`, cached HIT):

| URL | Raw HTML | gzip as requested | brotli as served | TTFB | Total |
|---|---|---|---|---|---|
| / | 17,689 B | 3,338 B | 3,423 B | 0.369 s | 0.369 s |
| /software/payroll | 29,007 B | 8,078 B | 8,345 B | 0.324 s | 0.324 s |
| /products/deel | 13,042 B | 3,183 B | 3,300 B | 0.252 s | 0.252 s |
| /categories | 109,310 B | 18,338 B | 18,972 B | 0.474 s | 0.474 s |
| /_astro/BaseLayout.CyO9BekM.css | 18,908 B | n/a | 4,695 B | 0.164 s | 0.164 s |
| /favicon.svg | 237 B | 237 B | 237 B | 0.188 s | 0.189 s |

(Served brotli sizes are slightly larger than gzip-9 here because the edge uses a fast brotli level; local `zlib` brotli default gives 2,606 / 6,489 / 2,481 / 15,090 B for the same four pages, and gzip-9 gives 3,247 / 7,992 / 3,121 / 17,899 B.)

Resources per page (static HTML): home, /software/payroll, /products/deel, /categories each reference exactly 2 subresources: one CSS file (`/_astro/BaseLayout.<hash>.css`) and `/favicon.svg`. No JS file, no image, no font file. So 3 requests per page (document + CSS + favicon), 3 for `/categories` as well (its script is inline). Local CSS: 19,180 B raw, 4,534 B gzip-9, 3,914 B brotli. CSS is `Cache-Control: public, max-age=31536000, immutable`; HTML and favicon are `max-age=0, must-revalidate` (the favicon is not fingerprinted).

Build (`npx astro build --outDir <scratch>/build1`): 1040 HTML pages, 13 MB output, build time 13.12 s. HTML total 10,658,980 B, mean 10,249 B, median 9,205 B, p95 27,733 B, max 109,310 B. Page counts: 557 `software/*`, 457 `products/*`, 21 `categories/*` (the department pages), plus `index`, `categories`, `methodology`, `transparency`, `404`.

Five largest HTML files (local build, raw):

| File | Bytes | Why |
|---|---|---|
| categories.html | 109,310 | Lists all 557 categories grouped into 21 departments: 587 anchors, 568 list items, each with a description and a long class string on every link |
| software/time-tracking.html | 34,336 | About 17.1 KB of authored guide text (15 `h2` sections) plus 17.2 KB of markup |
| software/recruiting-crm.html | 32,665 | 16 `h2` sections, about 17.8 KB text |
| software/uptime-monitoring.html | 32,196 | 16 `h2` sections, about 15.6 KB text |
| software/global-payroll.html | 31,756 | 17 `h2` sections, about 16.3 KB text |

The next, `software/apm.html`, is 31,397 B. These are content-driven (long editorial guides plus per-product blocks, JSON-LD of 1.3-1.5 KB), not accidental bloat; markup is roughly half of each file because of repeated Tailwind class strings.

## 7. Lighthouse

Available: yes. `npx lighthouse` 13.6.0 with the installed Chrome (headless), default mobile emulation and simulated throttling, run once per page against the live site:

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index | TTI |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 92 | 100 | 100 | 66 | 2.7 s | 2.7 s | 40 ms | 0 | 2.7 s | 2.8 s |
| /software/payroll | 91 | 100 | 100 | 66 | 2.8 s | 2.8 s | 20 ms | 0 | 2.8 s | 2.9 s |
| /products/deel | 92 | 96 | 100 | 66 | 2.7 s | 2.7 s | 0 ms | 0 | 2.7 s | 2.8 s |

Server response time on these runs: 40 ms, 80 ms, 40 ms.

Caveats that change how to read this:
- **The run was contaminated by an antivirus injection.** The network log for `/` includes `https://gc.kis.v2.scr.kaspersky-labs.com/.../main.js` (146,220 B) plus three XHRs to the same host, injected by Kaspersky on the test machine, not by the site. This is why Lighthouse reports total weight of 162-178 KiB, "unminified JavaScript 53 KiB", "unused JavaScript 91 KiB", "legacy JavaScript 35 KiB" and a render-blocking estimate of 1,010-1,300 ms. The site itself sends about 18 KB document + 5 KB CSS + 0.6 KB favicon (transferred) on the home page. Treat the JavaScript audits as invalid; rerun on a machine without that antivirus web shield to get clean numbers.
- Only real opportunity visible once the contamination is set aside: the 5 KB stylesheet is render-blocking (it is the only blocking resource of the site's own), and FCP/LCP of 2.7 s is mostly the simulated slow-4G round trips (document, then CSS) rather than payload size. `document-latency-insight` scored 0.5 with estimated savings of 9-19 KiB, consistent with caching/compression headers on a `max-age=0` HTML.
- SEO 66 on all three pages: the only failing SEO audit is `is-crawlable` (the `X-Robots-Tag: noindex, nofollow` header, finding 1).
- /products/deel accessibility 96: failing `color-contrast`, 12 nodes, all the `text-slate-400` source links (finding 2).

## 8. Accessibility and mobile (static analysis of the 1040 built pages)

Script run over every built HTML file (`html.parser`):

- `<html lang>` missing: 0 (all `lang="en"`). `<title>` missing: 0. Viewport meta missing: 0 (`width=device-width, initial-scale=1`). Pages without exactly one `<main>`: 0.
- Images without alt: 0 (the site has 0 `<img>` elements).
- Links with no text and no aria-label: 0. Links with empty or `#` href: 0.
- Pages without exactly one `h1`: 0. Heading level skips: 0. Empty headings: 0. Duplicate ids: 0.
- Form controls without a label: 0. The only controls are the `filter` search input on `/categories` (has `<label for="filter">`) and three checkboxes in `CompareTable.astro` wrapped in labels. Only `/categories` has a script-driven filter in the build.
- Tables: 462 total. All have header cells; 462 of 462 lack `scope` on the `<th>` (finding 5). Compare-table headers use `scope="col"` and sortable buttons, in source `src/components/CompareTable.astro:55-56`; the built pages scanned did not contain a compare table with data rows.
- Skip link present: `<a href="#main" class="sr-only focus:not-sr-only ...">Skip to content</a>` immediately after `<body>`; `<main id="main">`.
- Nav: header `<nav aria-label="Main">` with 3 links (Categories, How we rank, Transparency); footer repeats them. Links are `text-sm` with no padding (finding 4).

Contrast (WCAG relative luminance on the Tailwind palette; the CSS uses oklch tokens that match these hex values to rounding), against white / `slate-50` / `teal-50` backgrounds:

| Foreground class | vs white | vs slate-50 | vs teal-50 | AA 4.5:1 |
|---|---|---|---|---|
| text-slate-900 (#0f172a) | 17.85 | 17.06 | 17.12 | pass |
| text-slate-700 (#334155) | 10.35 | 9.90 | 9.93 | pass |
| text-slate-600 (#475569) | 7.58 | 7.24 | 7.27 | pass |
| text-slate-500 (#64748b) | 4.76 | 4.55 | 4.56 | pass, narrow margin |
| text-teal-700 (#0f766e) | 5.47 | 5.23 | 5.25 | pass |
| text-teal-800 (#115e59) | 7.58 | 7.25 | 7.27 | pass |
| text-slate-400 (#94a3b8) | 2.56 | 2.45 | 2.46 | FAIL |
| text-white on bg-teal-700 | 5.47 | n/a | n/a | pass |

`text-slate-500` (10,023 uses, e.g. "30 categories" counts) passes by 0.05 on `slate-50` (4.55), so any slight lightening or any small-text use on a slightly darker tint would fail. `text-slate-400` uses are concentrated in the source-link text (finding 2); this is the only failing pair.

## What I could not support with evidence

I did not test keyboard focus visibility, zoom/reflow at 320 px, reduced-motion, or real tap accuracy; the "tap-target risk" is inferred from CSS classes. I did not verify Vercel edge behaviour for other regions, nor header differences between cache HIT and MISS. A security-header recommendation is stated only as "absent"; I did not assess whether adding them would break anything beyond noting the one inline script.
