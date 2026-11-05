// Lists products whose newest price or fact check is getting old. The site hides a product page
// from search once its prices are older than 180 days, so refresh before that.
// Usage: npm run check:stale [days]   (default warns at 150 days)
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const WARN_DAYS = Number(process.argv[2] ?? 150);
const LIMIT_DAYS = 180;
const dir = join(import.meta.dirname, '..', 'content', 'products');
const now = Date.now();
const rows: { slug: string; days: number }[] = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const p = JSON.parse(readFileSync(join(dir, file), 'utf8'));
  if (p.status !== 'published') continue;
  const dates: string[] = [
    ...(p.qualifies ?? []).map((q: { checkedAt?: string }) => q.checkedAt),
    ...(p.facts ?? []).map((f: { checkedAt?: string }) => f.checkedAt),
  ].filter(Boolean);
  if (dates.length === 0) {
    rows.push({ slug: file.replace('.json', ''), days: Infinity });
    continue;
  }
  const newest = Math.max(...dates.map((d) => Date.parse(d)));
  rows.push({ slug: file.replace('.json', ''), days: Math.floor((now - newest) / 86_400_000) });
}

const due = rows.filter((r) => r.days >= WARN_DAYS).sort((a, b) => b.days - a.days);
const past = due.filter((r) => r.days > LIMIT_DAYS).length;
console.log(`Checked ${rows.length} published products. ${due.length} are ${WARN_DAYS}+ days old; ${past} are past the ${LIMIT_DAYS}-day limit.`);
for (const r of due.slice(0, 40)) console.log(`  ${r.days === Infinity ? 'no date' : r.days + ' days'}  ${r.slug}`);
if (due.length > 40) console.log(`  ... and ${due.length - 40} more`);
process.exit(past > 0 ? 1 : 0);
