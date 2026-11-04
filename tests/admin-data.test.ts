import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { buildOverview, loadTaxonomy, parseFrontmatter } from '../scripts/admin/data.ts';
import { GATE } from '../src/lib/quality-gate.ts';

describe('admin dashboard data', () => {
  const overview = buildOverview('2026-11-04');

  it('lists every taxonomy category and every department once', () => {
    const taxonomy = loadTaxonomy();
    const categoryPages = overview.pages.filter((p) => p.type === 'category');
    expect(categoryPages).toHaveLength(taxonomy.length);
    expect(new Set(categoryPages.map((p) => p.slug)).size).toBe(taxonomy.length);
    const departments = new Set(taxonomy.map((c) => c.departmentSlug));
    expect(overview.pages.filter((p) => p.type === 'department')).toHaveLength(departments.size);
  });

  it('only marks a category indexable when every gate threshold is met', () => {
    for (const page of overview.pages.filter((p) => p.type === 'category' && p.indexable)) {
      const level = loadTaxonomy().find((c) => c.slug === page.slug)?.level;
      const minProducts =
        level === 'L2' ? GATE.subcategory.minQualifyingProducts : GATE.category.minQualifyingProducts;
      expect(page.count).toBeGreaterThanOrEqual(minProducts);
      expect(page.words).toBeGreaterThanOrEqual(GATE.category.minEditorialWords);
      expect(page.criteriaApproved).toBe(true);
      expect(page.signedOff).toBe(true);
      expect(page.writingErrors).toBe(0);
    }
  });

  it('gives every blocked page at least one reason, and passing pages none', () => {
    for (const page of overview.pages) {
      if (page.indexable) expect(page.reasons).toHaveLength(0);
      else expect(page.reasons.length).toBeGreaterThan(0);
    }
  });

  it('does not count draft products as pages', () => {
    const products = overview.pages.filter((p) => p.type === 'product');
    expect(products.every((p) => p.status === 'published')).toBe(true);
  });

  it('parses front matter with and without quotes', () => {
    const { front, body } = parseFrontmatter('---\ntitle: "A title"\ncriteriaApproved: false\ndefinition: Plain text\n---\nBody here.\n');
    expect(front.title).toBe('A title');
    expect(front.criteriaApproved).toBe('false');
    expect(front.definition).toBe('Plain text');
    expect(body.trim()).toBe('Body here.');
  });

  it('keeps the dashboard server away from the public site', () => {
    const server = readFileSync(new URL('../scripts/admin/server.ts', import.meta.url), 'utf8');
    expect(server).toContain("server.listen(PORT, '127.0.0.1'");
    expect(server).not.toMatch(/git['"],\s*\[\s*['"](push|commit)/);
    expect(existsSync(new URL('../scripts/admin/ui.html', import.meta.url))).toBe(true);
  });
});
