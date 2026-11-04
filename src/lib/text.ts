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
