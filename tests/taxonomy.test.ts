import { describe, expect, it } from 'vitest';
import { categories, categoryTitle, departments, getCategory, parseTaxonomy } from '../src/lib/taxonomy';

describe('taxonomy.csv', () => {
  it('has 557 categories in 21 departments', () => {
    expect(categories).toHaveLength(557);
    expect(departments).toHaveLength(21);
  });

  it('has 50 wave-1, 130 wave-2 and 377 wave-3 categories', () => {
    const count = (w: number) => categories.filter((c) => c.wave === w).length;
    expect([count(1), count(2), count(3)]).toEqual([50, 130, 377]);
  });

  it('only puts wave 1 and 2 in the launch departments', () => {
    const launch = new Set(['finance', 'hr', 'it-management', 'security', 'development']);
    for (const c of categories) {
      expect(c.wave === 3).toBe(!launch.has(c.departmentSlug));
    }
  });

  it('has unique slugs in URL format', () => {
    const slugs = categories.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('gives every subcategory an existing top-level parent', () => {
    for (const c of categories.filter((c) => c.level === 'L2')) {
      expect(getCategory(c.parentSlug!)?.level, c.slug).toBe('L1');
    }
    for (const c of categories.filter((c) => c.level === 'L1')) expect(c.parentSlug).toBeNull();
  });

  it('gives every category three must-haves and at least one alias', () => {
    for (const c of categories) {
      expect(c.mustHave, c.slug).toHaveLength(3);
      expect(c.aliases.length, c.slug).toBeGreaterThan(0);
    }
  });

  it('never uses one alias for two categories', () => {
    const aliases = categories.flatMap((c) => c.aliases.map((a) => a.toLowerCase()));
    expect(new Set(aliases).size).toBe(aliases.length);
  });
});

describe('parseTaxonomy', () => {
  const header = 'department_slug,department,level,slug,name,parent_slug,aliases,must_have,wave';

  it('rejects a wrong header', () => {
    expect(() => parseTaxonomy('a,b,c\n')).toThrow(/header/);
  });

  it('rejects a line with the wrong number of fields', () => {
    expect(() => parseTaxonomy(`${header}\nhr,HR,L1,payroll,Payroll,,a,b;c;d\n`)).toThrow(/line 2/);
  });
});

describe('categoryTitle', () => {
  it('adds "software" only when the name lacks a product noun', () => {
    expect(categoryTitle(getCategory('payroll')!)).toBe('Payroll software');
    expect(categoryTitle(getCategory('crm')!)).toBe('CRM software');
    expect(categoryTitle(getCategory('seo-tools')!)).toBe('SEO tools');
    expect(categoryTitle(getCategory('webinar')!)).toBe('Webinar platforms');
  });
});
