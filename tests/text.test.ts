import { describe, expect, it } from 'vitest';
import { shingles, similarity, stripMarkdown, wordCount } from '../src/lib/text';

describe('text helpers', () => {
  it('counts words without markdown syntax', () => {
    expect(wordCount('## Pricing\n\nPlans start at **$19** a [month](https://example.com).')).toBe(7);
    expect(stripMarkdown('- item')).toBe('item');
  });

  it('scores identical copy as 1 and unrelated copy as 0', () => {
    const a = shingles('Payroll teams in small companies run pay every two weeks and file taxes each quarter.');
    const b = shingles('Security teams review vulnerability scans every Monday before the weekly patch window opens.');
    expect(similarity(a, a)).toBe(1);
    expect(similarity(a, b)).toBe(0);
  });
});
