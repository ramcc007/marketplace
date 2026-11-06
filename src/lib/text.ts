/** Rough markdown-to-text conversion for counting and comparing prose. */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/[*_>|]/g, ' ');
}

export function words(text: string): string[] {
  return stripMarkdown(text).toLowerCase().match(/[a-z0-9][a-z0-9'%.-]*/g) ?? [];
}

export function wordCount(text: string): number {
  return words(text).length;
}

export function shingles(text: string, size = 5): Set<string> {
  const list = words(text);
  const set = new Set<string>();
  for (let i = 0; i + size <= list.length; i++) {
    set.add(list.slice(i, i + size).join(' '));
  }
  return set;
}

/** Jaccard similarity of 5-word shingles: 0 means no shared phrasing, 1 means identical. */
export function similarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const s of a) if (b.has(s)) shared++;
  return shared / (a.size + b.size - shared);
}

export function paragraphs(markdown: string): string[] {
  return markdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p !== '' && !p.startsWith('#') && !p.startsWith('```'));
}

export function sentences(paragraph: string): string[] {
  return stripMarkdown(paragraph)
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
    .map((s) => s.trim())
    .filter((s) => s !== '');
}

/**
 * Meta description from longer prose. Keeps whole sentences up to `max` characters (a first sentence under 70 characters may run on to 180).
 * If the first sentence is too long, it ends before the last connecting word that fits (", with", " plus", ", so" and similar).
 * If there is no clean break, it keeps the whole first sentence when that is 200 characters or fewer.
 * It never cuts a word and never adds an ellipsis.
 */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentences = clean.split(/(?<=[.!?])\s+(?=[A-Z$0-9])/);
  let out = '';
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (next.length > (out.length > 0 && out.length < 70 ? 180 : max)) break;
    out = next;
  }
  if (out.length >= 70) return out;
  const first = sentences[0];
  const head = first.slice(0, max + 1);
  const joiner = /,? (?:with|plus|which|that|so|but|including|and|billed|where|while|from|for)\s/g;
  let cut = -1;
  for (const m of head.matchAll(joiner)) if (m.index >= 85) cut = m.index;
  if (cut >= 85) return `${head.slice(0, cut)}.`;
  if (first.length <= 200) return first;
  const space = head.lastIndexOf(' ');
  return `${head.slice(0, space).replace(/[\s,;:]+$/, '')}.`;
}

const SMALL_WORDS = new Set(['and', 'or', 'of', 'for', 'to', 'in', 'on', 'the', 'a', 'an', 'with', 'by', 'vs']);

/** Capitalises each word of a category name for a page title. Words that already have a capital (CRM, HRIS) stay as written. */
export function titleCase(name: string): string {
  return name
    .split(' ')
    .map((w, i) => {
      if (!w || /[A-Z]/.test(w)) return w;
      if (i > 0 && SMALL_WORDS.has(w)) return w;
      return w[0].toUpperCase() + w.slice(1);
    })
    .join(' ');
}
