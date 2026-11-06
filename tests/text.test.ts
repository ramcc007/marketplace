import { describe, expect, it } from 'vitest';
import { metaDescription, shingles, similarity, stripMarkdown, titleCase, wordCount } from '../src/lib/text';

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

describe('metaDescription', () => {
  it('returns short text unchanged', () => {
    expect(metaDescription('Short and complete.')).toBe('Short and complete.');
  });
  it('keeps whole sentences and never adds an ellipsis', () => {
    const text = 'A hosted CI/CD service that bills in credits and runs on a free plan with limits. Performance starts at $15 a month for five active users and grows with usage over time.';
    const out = metaDescription(text, 100);
    expect(out.length).toBeLessThanOrEqual(100);
    expect(out.endsWith('.')).toBe(true);
    expect(out).not.toContain('...');
  });
  it('ends before a connecting word when the first sentence is too long', () => {
    const text = 'Arq is a backup app for Mac and Windows sold as a $59.99 license per computer with no storage included, so backups go to a cloud account, NAS, SFTP server or external drive the buyer already pays for.';
    const out = metaDescription(text);
    expect(out).toBe('Arq is a backup app for Mac and Windows sold as a $59.99 license per computer with no storage included.');
  });
  it('keeps a moderately long single sentence whole instead of cutting it', () => {
    const text = 'Zuplo is a gateway for APIs and AI traffic, with per-key rate limits, API key, JWT and OAuth authentication, a developer portal and request analytics for teams.';
    expect(metaDescription(text, 120)).toBe(text);
  });
});

describe('titleCase', () => {
  it('capitalises words but keeps acronyms and small words', () => {
    expect(titleCase('Global payroll Software')).toBe('Global Payroll Software');
    expect(titleCase('Recruiting CRM Software')).toBe('Recruiting CRM Software');
    expect(titleCase('Ticketing and help desk Software')).toBe('Ticketing and Help Desk Software');
  });
});
