One markdown file per category, named by its slug from `data/taxonomy.csv` (for example `payroll.md`).

Frontmatter fields are defined in `src/content.config.ts`. A category page is indexed only when the quality gate in `src/lib/quality-gate.ts` passes, which includes `criteriaApproved: true`, an `editor` and `signedOffAt`, at least 600 words of body copy, and no writing-rule errors from `npm run check:content`.
