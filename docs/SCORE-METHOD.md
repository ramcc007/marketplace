# Score method, draft 0.1

This is the working text for a future public method page. It is not published and the site shows no score. Code: `src/lib/marketplace/score.ts`.

## What the score is

A number from 0 to 100 for one product. Half comes from facts we check on the vendor's own pages. Half comes from verified reviews.

## Editorial half, up to 50 points

| Check | Points |
|---|---|
| Prices are published (not "contact sales" only) | 15 |
| A free plan or free trial exists | 5 |
| Security certifications or compliance are documented | 10 |
| Contract terms are documented (term, renewal, cancellation) | 10 |
| Data export is documented | 5 |
| At least 10 integrations are listed | 5 |

Each check uses fields we already publish with a source link and the date we looked.

## Review half, up to 50 points

The average rating of published, verified reviews maps from 1 star = 0 points to 5 stars = 50 points. A product needs at least 10 such reviews. Below that it shows "Not scored yet" and no number, even if the editorial half is complete.

## What does not count

Whether the vendor pays us, sponsors a slot, has a claimed page, buys leads or holds a badge. The scoring function has no input for any of these and throws an error if one is passed. A test enforces it.

## Limits to state publicly

- The editorial half rewards disclosure, not quality. A good product that hides its prices loses points.
- Ten reviews is a small sample. The page must show the review count next to the score.
- The weights are our judgment. Changes get a new version number and a dated note.

## Before publishing

1. The owner decides whether to keep these weights.
2. /methodology is rewritten to describe the score (today it says there is none).
3. Real reviews exist. No score is shown with zero.
