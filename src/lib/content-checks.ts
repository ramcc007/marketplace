import { paragraphs, sentences } from './text.ts';

// The writing rules from docs/PLAN.md section 6.4, enforced in code.
// Errors block indexing; warnings are shown to the editor.

export type Severity = 'error' | 'warning';

export interface Issue {
  rule: string;
  severity: Severity;
  message: string;
  excerpt?: string;
}

export const BANNED_WORDS = [
  'delve', 'delves', 'delving', 'crucial', 'unlock', 'unlocks', 'unlocking', 'furthermore', 'moreover',
  'leverage', 'leverages', 'leveraging', 'seamless', 'seamlessly', 'robust', 'cutting-edge',
  'game-changer', 'game-changing', 'revolutionize', 'revolutionizes', 'revolutionary', 'empower',
  'empowers', 'empowering', 'streamline', 'streamlines', 'streamlined', 'elevate', 'elevates', 'holistic',
  'synergy', 'landscape', 'realm', 'tapestry', 'paramount', 'pivotal', 'ultimate', 'insane', 'addictive',
  'best-in-class', 'world-class', 'next-gen', 'next-generation', 'state-of-the-art', 'supercharge',
  'effortless', 'effortlessly', 'unparalleled', 'unleash', 'harness', 'foster', 'bolster', 'myriad',
  'plethora', 'testament', 'vibrant', 'intricate', 'meticulous', 'meticulously',
];

export const WARNING_WORDS = ['journey', 'navigate', 'navigating', 'embark', 'boasts', 'crafted', 'nestled'];

export const BANNED_PHRASES = [
  'when it comes to', "in today's fast-paced", 'in today’s fast-paced', "here's the thing", 'at its core',
  "it's worth noting", 'it is worth noting', 'serves as', 'plays a key role', 'in conclusion', 'in summary',
  'to sum up', 'experts say', 'studies show', 'research shows', 'in this article', 'this article',
  'in this guide', 'this guide will', "let's dive", 'dive into', 'look no further', "whether you're",
  'all-in-one solution', 'take it to the next level',
];

export const NEVER_PUBLISH = [
  'as an ai', "i couldn't find", 'i could not find', 'could not be found', 'todo', 'tbd', 'lorem ipsum',
  '[citation needed]', '[insert', 'placeholder', 'editor note', "editor's note", 'translation note',
  'research notes',
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const excerptOf = (s: string) => (s.length > 140 ? `${s.slice(0, 137)}...` : s);

function findTerms(text: string, terms: string[], wordBoundary: boolean): string[] {
  const lower = text.toLowerCase();
  return terms.filter((term) => {
    if (!wordBoundary) return lower.includes(term);
    return new RegExp(`(^|[^a-z0-9-])${escape(term)}($|[^a-z0-9-])`, 'i').test(lower);
  });
}

/** A capitalized banned word in mid-sentence is a product or plan name, such as TimeCamp Ultimate. */
function bannedWordsIn(text: string): string[] {
  return BANNED_WORDS.filter((term) => {
    const re = new RegExp(`(^|[^A-Za-z0-9-])(${escape(term)})(?=$|[^A-Za-z0-9-])`, 'gi');
    for (const match of text.matchAll(re)) {
      const word = match[2];
      const before = text.slice(0, match.index + match[1].length).trimEnd();
      const startsSentence = before === '' || /[.!?:]$/.test(before);
      if (word[0] === word[0].toLowerCase() || startsSentence) return true;
    }
    return false;
  });
}

const NOT_X_ITS_Y =/\b(it'?s|it is|this is|that'?s|that is)\s+not\b[^.!?]{1,80}?[,;]\s*(it'?s|it is|but)\b/i;
const BOLD = /\*\*[^*\n]+\*\*|__[^_\n]+__/;
const STARTS_WITH_CONJUNCTION = /^(and|but|also|so)\b[ ,]/i;
const CLOSING_SUMMARY = /^(overall|ultimately|in the end|all in all|in short|to conclude)\b/i;

function isTitleCase(heading: string): boolean {
  const small = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs', 'with']);
  const list = heading.split(/\s+/).slice(1).filter((w) => /^[A-Za-z]/.test(w) && !small.has(w.toLowerCase()));
  if (list.length < 2) return false;
  const capitalized = list.filter((w) => /^[A-Z][a-z]/.test(w)).length;
  return capitalized / list.length > 0.5;
}

/** Checks markdown prose against the writing rules. */
export function checkProse(markdown: string): Issue[] {
  const issues: Issue[] = [];
  const add = (rule: string, severity: Severity, message: string, excerpt?: string) =>
    issues.push({ rule, severity, message, excerpt: excerpt ? excerptOf(excerpt) : undefined });

  for (const term of findTerms(markdown, NEVER_PUBLISH, true)) {
    add('never-publish', 'error', `Contains "${term.trim()}", which must never be published.`);
  }
  if (/[—–]/.test(markdown)) {
    add('dashes', 'error', 'Em or en dash found. Rewrite the sentence or use a comma.', markdown.match(/[^\n]{0,60}[—–][^\n]{0,60}/)?.[0]);
  }
  if (BOLD.test(markdown)) {
    add('bold', 'error', 'Bold text is not used in body copy.', markdown.match(BOLD)?.[0]);
  }
  if (/[“”‘’]/.test(markdown)) {
    add('curly-quotes', 'warning', 'Curly quotes found. cleanText() converts them to straight quotes.');
  }

  for (const line of markdown.split('\n')) {
    const heading = line.match(/^#{1,6}\s+(.+)/)?.[1];
    if (heading && isTitleCase(heading)) {
      // Warning, not error: product names in headings are capitalized legitimately.
      add('title-case-heading', 'warning', 'Headings use sentence case, not Title Case.', heading);
    }
    if (heading?.trim().endsWith('?')) {
      add('question-heading', 'warning', 'Question headings tend to be answered straight away. Use a statement.', heading);
    }
  }

  const paras = paragraphs(markdown);
  paras.forEach((para, index) => {
    for (const word of bannedWordsIn(para)) {
      add('banned-word', 'error', `Banned word "${word}".`, para);
    }
    for (const word of findTerms(para, WARNING_WORDS, true)) {
      add('figurative-word', 'warning', `"${word}" is often figurative. Check that it is literal here.`, para);
    }
    for (const phrase of findTerms(para, BANNED_PHRASES, false)) {
      add('banned-phrase', 'error', `Banned phrase "${phrase}".`, para);
    }
    if (NOT_X_ITS_Y.test(para)) {
      add('not-x-its-y', 'error', '"It\'s not X, it\'s Y" structure.', para.match(NOT_X_ITS_Y)?.[0]);
    }
    if (/,\s*which is why\b/i.test(para)) {
      add('which-is-why', 'error', '", which is why" structure.', para);
    }
    if (/\b\d+(\.\d+)?\s+percent\b/i.test(para)) {
      add('percent', 'warning', 'Write "13%", not "13 percent". cleanText() fixes this.', para);
    }
    if (para.includes('!')) {
      add('exclamation', 'warning', 'Exclamation marks read as marketing copy.', para);
    }
    const list = sentences(para);
    for (const sentence of list) {
      if (STARTS_WITH_CONJUNCTION.test(sentence)) {
        add('starts-with-conjunction', 'error', 'Sentence starts with And, But, Also or So.', sentence);
      }
      const length = sentence.split(/\s+/).length;
      if (length > 40) {
        add('long-sentence', 'warning', `Sentence has ${length} words; aim for 12 to 25.`, sentence);
      }
      if (sentence.endsWith('?')) {
        add('question', 'warning', 'Question in body copy. Make sure it is not answered straight away.', sentence);
      }
    }
    if (list.length === 1 && list[0].split(/\s+/).length < 8 && !para.startsWith('-') && !para.startsWith('|')) {
      add('one-line-punchline', 'warning', 'Very short one-sentence paragraph. Fold it into the paragraph before.', para);
    }
    if (index === paras.length - 1 && CLOSING_SUMMARY.test(para)) {
      add('closing-summary', 'error', 'Closing paragraph sums up. End on a fact or a specific check instead.', para);
    }
  });

  return issues;
}

export function checkTitle(title: string): Issue[] {
  return title.length > 60
    ? [{ rule: 'title-length', severity: 'error', message: `Title is ${title.length} characters; the limit is 60.`, excerpt: title }]
    : [];
}

export function checkMetaDescription(description: string): Issue[] {
  return description.length > 155
    ? [{ rule: 'meta-length', severity: 'error', message: `Meta description is ${description.length} characters; the limit is 155.`, excerpt: description }]
    : [];
}

/** Mechanical clean-up applied before checks: straight quotes, "%" and no long dashes. */
export function cleanText(text: string): string {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\b(\d+(?:\.\d+)?)\s+percent\b/gi, '$1%')
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1 to $2')
    .replace(/\s*[—–]\s*/g, ', ');
}
