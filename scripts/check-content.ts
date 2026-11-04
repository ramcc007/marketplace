// Runs the writing rules over every category file and product summary.
// Usage: npm run check:content        Exit code 1 when any error is found.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkMetaDescription, checkProse, type Issue } from '../src/lib/content-checks.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const report: { file: string; issues: Issue[] }[] = [];

const categoriesDir = join(root, 'content', 'categories');
if (existsSync(categoriesDir)) {
  for (const name of readdirSync(categoriesDir).filter((f) => f.endsWith('.md') && f !== 'README.md')) {
    const text = readFileSync(join(categoriesDir, name), 'utf8');
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    const front = match?.[1] ?? '';
    const body = match?.[2] ?? text;
    const definition = front.match(/^definition:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? '';
    report.push({
      file: `content/categories/${name}`,
      issues: [...checkProse(body), ...checkProse(definition), ...checkMetaDescription(definition)],
    });
  }
}

const productsDir = join(root, 'content', 'products');
if (existsSync(productsDir)) {
  for (const name of readdirSync(productsDir).filter((f) => f.endsWith('.json'))) {
    const data = JSON.parse(readFileSync(join(productsDir, name), 'utf8'));
    const facts = (data.facts ?? []).map((f: { text: string }) => f.text);
    const prose = [data.summary, data.handsOnNote, ...facts].filter(Boolean).join('\n\n');
    report.push({ file: `content/products/${name}`, issues: checkProse(prose) });
  }
}

let errors = 0;
let warnings = 0;
for (const { file, issues } of report) {
  if (issues.length === 0) continue;
  console.log(`\n${file}`);
  for (const issue of issues) {
    if (issue.severity === 'error') errors++;
    else warnings++;
    console.log(`  ${issue.severity.toUpperCase()} [${issue.rule}] ${issue.message}`);
    if (issue.excerpt) console.log(`    > ${issue.excerpt}`);
  }
}
console.log(`\nChecked ${report.length} files: ${errors} errors, ${warnings} warnings.`);
process.exit(errors > 0 ? 1 : 0);
