# Marketplace build status, 5 November 2026

Work lives on the `marketplace` branch. `main` and the live site are unchanged by it. Nothing here is pushed or deployed.

## Built (S2 to S6, engine level)

| Step | What exists | Where |
|---|---|---|
| S2 | Store interface with a JSON file for local use. Emailed sign-in links: one use, 15 minutes, hashed, five per hour per address | `src/lib/marketplace/store.ts`, `auth.ts` |
| S3 | Reviews: required fields, own-experience tick, incentive disclosure (rewards that depend on rating are refused), one review per product per year, vendor staff blocked, verification by work email or checked proof, moderation by written reason only, removal counts, vendor reply and flag, newest-first listing | `reviews.ts` |
| S4 | 0 to 100 score: 50 editorial points, 50 review points, no score under 10 verified reviews, no payment input possible. Method text in `docs/SCORE-METHOD.md` | `score.ts` |
| S5 | Vendor claims: address must be on the vendor's domain, editor approves, four editable vendor-supplied fields, history kept | `vendors.ts` |
| S6 | Quote and demo requests: unticked consent naming the vendor, honeypot, three per address per day, visible only to the named vendor, erasure | `leads.ts` |

Feature switches are in `src/config/marketplace.ts`. All are off. No public page reads them.

Try it locally with `npm run marketplace` (opens on 127.0.0.1 only; sign-in links are printed in the terminal).

## Not built, and why

- **No live backend.** The site is static. Running this for real needs a database, email sending and a server host. Those need accounts only you can create and the hosting decision in the plan (S1).
- **No public pages for reviews, scores, claims or forms.** Showing them would change what the site says about itself. That rewrite (S8) ships with the first paid feature.
- **Proof-of-use uploads.** File storage is not set up. For now a person marks proof as checked.
- **Email sending** (sign-in links, lead delivery). The code makes the token; sending needs Resend or similar.
- **Spam and abuse beyond per-address limits** (IP limits, CAPTCHA) need the live host.
- **Privacy text for stored personal data** (reviews, vendor accounts, leads). A lawyer should see it before launch.
- **S0** (owner facts) still waits on you.

## To go live, in order

1. Send the owner facts (S0) and unhide the legal pages.
2. Choose hosting (S1) and create Neon and Resend accounts.
3. Swap the JSON store for Postgres behind the same `Store` interface; add server routes and pages.
4. Lawyer review of privacy, terms, review guidelines, lead terms.
5. Rewrite the statements in section 4 of `docs/MARKETPLACE-PHASE0.md`, then switch on features one at a time.
