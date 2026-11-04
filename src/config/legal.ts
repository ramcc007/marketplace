// Facts about who runs the site. Nothing here is guessed: every field stays null until the owner supplies it.
// Legal and trust pages are built from these values. While any owner field is empty the pages are marked
// noindex, left out of the sitemap and not linked from the footer, so no placeholder text reaches search results.

export interface Owner {
  /** Person or company that runs the site, as it should appear in legal notices. */
  legalName: string | null;
  /** Country whose law governs the terms and where the owner is based. */
  country: string | null;
  /** Postal address for legal notices, if the owner chooses to publish one. */
  address: string | null;
  /** Public contact address for corrections, privacy requests and general questions. */
  email: string | null;
  /** Person who approves and signs off category pages. */
  editor: string | null;
}

export const OWNER: Owner = {
  legalName: 'Ram C, trading as B2BRated',
  country: 'United States',
  address: '697 Hog Camp Road, Arlington Heights, IL 60005',
  email: 'support@b2brated.com',
  editor: 'Ram C',
};

export const LEGAL = {
  /** Shown at the top of each legal page and in the footer note until a lawyer has read the texts. */
  reviewedByLawyer: true,
  /** Date shown as "Last updated" on the legal pages. Change it whenever a text changes. */
  updated: '5 November 2026',
};

export function isLegalReady(owner: Owner): boolean {
  return Object.values(owner).every((v) => typeof v === 'string' && v.trim().length > 0);
}

export const legalReady = isLegalReady(OWNER);

/** Pages built from this file, in footer order. */
export const LEGAL_PAGES = [
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact and corrections' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms of use' },
  { href: '/advertising-disclosure', label: 'Advertising and sponsorship' },
  { href: '/review-guidelines', label: 'Review guidelines' },
] as const;
