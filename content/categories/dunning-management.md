---
title: Dunning management software compared
definition: Seven billing platforms compared on published fees and automatic retry rules after a failed card payment, checked at vendor pages.
primaryKeyword: dunning management software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Seven products checked against vendor pages, six more reviewed and left out.
  - date: 2026-11-05
    note: Second pass. Stripe retry rules and fees, Chargebee, Recurly, Maxio and Rebilly prices re-read from vendor pages. Card updater and reminder claims that were not re-read were removed. The left-out list was removed because its claims were not re-checked.
---

Dunning management is the work a subscription business does after a recurring charge fails. The software retries the payment, may ask the customer for new card details, and sends reminders until the invoice is paid or the subscription ends. Most dunning features ship inside a billing platform rather than as a separate product, so this page sits inside [subscription billing software](/software/subscription-billing).

The seven platforms on this page are Stripe Billing, Chargebee, Recurly, Maxio, Zuora, Rebilly and Ordway. This draft has checked published fees for Stripe, Chargebee, Recurly, Maxio and Rebilly, and it has read Stripe's retry documentation in full. For Zuora and Ordway we have not read a pricing or retry page in this pass, so their rows make no claims.

## Why failed payments split in two

A failed card payment usually has one of two causes. Some failures are temporary, such as a bank that declined a charge at a bad moment. Retrying later can work. Other failures are permanent, such as a card that was reported lost or stolen. Retrying does nothing until the customer supplies a new card.

Stripe's retry documentation draws the same line. It lists nine decline codes that count as hard declines, including lost_card, stolen_card and transaction_not_allowed. For those, Stripe keeps scheduling retries and counting attempts, but the charge only runs after a new payment method is found. That is a useful way to read any tool: ask what it does with a hard decline, and whether it stops, retries, or waits for the customer.

## Stripe's retry rules

Stripe's documentation gives the most detail of the group, and it is worth reading closely.

For new accounts, Smart Retries is on by default and set to up to 8 retries within 2 weeks. You can change the window to 1 week, 2 weeks, 3 weeks, 1 month or 2 months. Smart Retries uses machine learning to choose the retry times. If you turn it off, a custom schedule allows up to three retries, each a set number of days after the last.

When retries run out, Stripe can cancel the subscription, mark it unpaid, leave it past due or pause it. Stripe also says it does not retry payments when no payment method is available, when the issuer returns a hard decline, or on India-issued cards. Local debit methods are off by default. When switched on, ACH Direct Debit allows 2 retries over 40 days for insufficient funds, while SEPA and Bacs allow 2 retries each over 30 days. Australian BECS allows 4 retries over 30 days.

The Stripe Billing fee is 0.7% of billing volume, including billing transactions processed on and off Stripe. One-off invoices are excluded. Stripe's pricing page does not describe Smart Retries or whether it carries a separate fee, so ask Stripe in writing before assuming it is included.

## Chargebee's fee and Recurly's fee

Chargebee's pricing calculator shows $99 a month plus 0.65% of invoicing volume, or 0.80% with no monthly fee. The page does not name the plan that carries each figure, so confirm which tier includes dunning before you budget. Chargebee's retry and updater features are not described in this draft, because we did not re-read those pages.

Recurly's Starter plan costs $249 a month plus 0.9% of billing volume, with the first $40,000 each month included at no charge. The page does not say whether Account Updater or any other dunning feature is included in that price, so this draft makes no claim about it.

## Maxio and Rebilly

Maxio's pricing page lists Grow at $599 a month. Its Scale plan is priced on request. The page is silent on dunning fees, so this draft does not compare dunning features on price.

Rebilly lists Basic at $15 a month and Pro at $125 a month. It charges 1% of monthly revenue before volume discounts, and Pro offers volume discounts of up to 50%. Its pages list a 30-day free trial and a fee of $0.05 for each attempted 3D Secure authentication. Retry counts and intervals are not on the pages we read, so ask Rebilly for the schedule in writing.

## Card updater services

A card updater passes replacement card details from the card networks to the merchant after a card is reissued. Whether a platform offers one, and which networks it covers, is one of the most useful questions in a trial. This draft did not verify updater coverage for any of the seven platforms, so no product is credited with one here. Ask each vendor which card networks and countries its updater covers, and what it costs.

## Customer reminders

Reminders range from one notice to a sequence of emails, sometimes with SMS. We did not re-read the reminder documentation for any product in this pass, so this draft does not compare reminder features. The customer experience matters as much as the retry logic. A tool that retries without a reminder leaves the customer unaware, and one that sends reminders without retries asks people to act on payments that would have cleared by themselves.

## Products not covered in this pass

Zuora and Ordway are listed because they are common in this category, but their pages were not read for this draft. Several other billing tools that offer dunning were also not checked, and no judgment about them is made here.

## What to test during a trial

Fail a test payment with a hard decline and a soft decline, and record which one the tool retries. Count the emails a customer receives in the first two weeks, and read each one on a phone. Ask in writing which gateways and card networks any card updater covers and what it costs.

Check what happens to a subscription when the last retry fails, and whether the final action can be changed per plan. Stripe offers four options, so ask whether other vendors offer the same choice. Last, confirm the Smart Retries or dunning fee in writing, since a pricing page may not show it.
