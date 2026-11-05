import raw from '../../data/taxonomy.csv?raw';
import descriptionsRaw from '../../data/category-descriptions.json';

export type Level = 'L1' | 'L2';
export type Wave = 1 | 2 | 3;

export interface Category {
  departmentSlug: string;
  department: string;
  level: Level;
  slug: string;
  name: string;
  parentSlug: string | null;
  aliases: string[];
  /** One plain sentence on what the software does. Shown on department cards. */
  description: string;
  mustHave: string[];
  wave: Wave;
}

export interface Department {
  slug: string;
  name: string;
  categories: Category[];
}

const COLUMNS = [
  'department_slug',
  'department',
  'level',
  'slug',
  'name',
  'parent_slug',
  'aliases',
  'must_have',
  'wave',
];

// Fields never contain commas (checked when the file was built), so a plain split is safe.
// Any malformed line fails the build instead of producing a broken page.
export function parseTaxonomy(text: string): Category[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines[0] !== COLUMNS.join(',')) {
    throw new Error(`taxonomy.csv: unexpected header "${lines[0]}"`);
  }
  return lines.slice(1).map((line, i) => {
    const fields = line.split(',');
    if (fields.length !== COLUMNS.length) {
      throw new Error(`taxonomy.csv line ${i + 2}: expected ${COLUMNS.length} fields, got ${fields.length}`);
    }
    const [departmentSlug, department, level, slug, name, parentSlug, aliases, mustHave, wave] = fields;
    if (level !== 'L1' && level !== 'L2') {
      throw new Error(`taxonomy.csv line ${i + 2}: level must be L1 or L2`);
    }
    const waveNumber = Number(wave);
    if (waveNumber !== 1 && waveNumber !== 2 && waveNumber !== 3) {
      throw new Error(`taxonomy.csv line ${i + 2}: wave must be 1, 2 or 3`);
    }
    return {
      departmentSlug,
      department,
      level,
      slug,
      name,
      parentSlug: parentSlug || null,
      aliases: aliases ? aliases.split('|') : [],
      description: '',
      mustHave: mustHave.split(';'),
      wave: waveNumber,
    };
  });
}

const descriptions = descriptionsRaw as Record<string, string>;

export const categories: Category[] = parseTaxonomy(raw).map((c) => ({ ...c, description: descriptions[c.slug] ?? '' }));

const bySlug = new Map(categories.map((c) => [c.slug, c]));

export const departments: Department[] = (() => {
  const map = new Map<string, Department>();
  for (const c of categories) {
    let dept = map.get(c.departmentSlug);
    if (!dept) {
      dept = { slug: c.departmentSlug, name: c.department, categories: [] };
      map.set(c.departmentSlug, dept);
    }
    dept.categories.push(c);
  }
  return [...map.values()];
})();

export function getCategory(slug: string): Category | undefined {
  return bySlug.get(slug);
}

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

export function childrenOf(slug: string): Category[] {
  return categories.filter((c) => c.parentSlug === slug);
}

/** Other top-level categories in the same department, in taxonomy order. */
export function relatedCategories(category: Category, limit = 8): Category[] {
  return categories
    .filter(
      (c) =>
        c.departmentSlug === category.departmentSlug &&
        c.level === 'L1' &&
        c.slug !== category.slug &&
        c.slug !== category.parentSlug,
    )
    .slice(0, limit);
}

const ENDS_WITH_PRODUCT_NOUN =
  /\b(software|tools|platforms?|builders?|systems?|apps?|assistants|agents|databases|warehouses|catalogs|editors|clients|portals|checkers|engines|managers|dialers|rooms|suites|whiteboards|scribes|auctions|repositories|chatbots|notebooks|queues|pages|programs|cards|APIs)$/i;

/** Page title such as "Payroll software". Editorial frontmatter can override it. */
export function categoryTitle(category: Category): string {
  return ENDS_WITH_PRODUCT_NOUN.test(category.name) ? category.name : `${category.name} software`;
}
