// Switches for the marketplace features. Everything stays off until the owner turns it on, and
// nothing here is read by a public page yet. Turning a switch on needs the services listed in
// docs/MARKETPLACE-PHASE0.md and the public statements listed in section 4 of that file rewritten.

export const MARKETPLACE = {
  reviews: false,
  vendorAccounts: false,
  leads: false,
  score: false,
  /** Money. Needs the hosting plan decision and the statements rewrite first. */
  paid: false,
} as const;

export type MarketplaceFeature = keyof typeof MARKETPLACE;

/** True only for features the owner has switched on. */
export function isOn(feature: MarketplaceFeature): boolean {
  return MARKETPLACE[feature];
}
