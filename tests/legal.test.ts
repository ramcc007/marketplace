import { describe, expect, it } from 'vitest';
import { LEGAL_PAGES, isLegalReady, type Owner } from '../src/config/legal';

const filled: Owner = {
  legalName: 'Example Ltd',
  country: 'Example country',
  address: '1 Example Street',
  email: 'hello@example.test',
  editor: 'Example Person',
};

describe('isLegalReady', () => {
  it('is ready only when every owner fact is supplied', () => {
    expect(isLegalReady(filled)).toBe(true);
    for (const key of Object.keys(filled) as (keyof Owner)[]) {
      expect(isLegalReady({ ...filled, [key]: null })).toBe(false);
      expect(isLegalReady({ ...filled, [key]: '  ' })).toBe(false);
    }
  });

  it('lists each legal page once', () => {
    const hrefs = LEGAL_PAGES.map((p) => p.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of ['/privacy', '/cookies', '/content-policy', '/terms']) expect(hrefs).toContain(href);
  });
});
