---
title: Subscription billing software compared
definition: Eleven subscription billing platforms compared on fees checked at the source, merchant of record terms, dunning, card portability and tax.
primaryKeyword: subscription billing software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-03
    note: First draft. Eleven products checked against vendor pages.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Subscription billing software creates the recurring charges for a subscription business, prorates plan changes, retries failed payments and reports recurring revenue. The eleven products on this page each handle recurring plans with proration, run dunning for failed payments, and report MRR and churn. We checked every fee on the vendor's own website, and each product page links to the pages we used.

## Two different kinds of product

The biggest choice comes before any feature comparison. A merchant of record sells the product to the buyer on the vendor's behalf, collects and pays sales tax and VAT, and handles refunds and chargebacks. [Paddle](/products/paddle), [Lemon Squeezy](/products/lemon-squeezy), [FastSpring](/products/fastspring) and [Polar](/products/polar) work this way. The buyer's card statement shows their name, such as PADDLE.NET or LEMSQZY, followed by the seller's name.

The other seven leave the business as the seller. [Stripe Billing](/products/stripe-billing), [Chargebee](/products/chargebee), [Recurly](/products/recurly), [Maxio](/products/maxio), [Zoho Billing](/products/zoho-billing), [ChargeOver](/products/chargeover) and [Lago](/products/lago) create invoices and charge cards through a payment gateway, while tax registration and filing stay with the business.

## Why tax decides the choice for many sellers

In [South Dakota v. Wayfair](https://www.supremecourt.gov/opinions/17pdf/585us1r58_pok0.pdf) in 2018, the US Supreme Court allowed states to require out-of-state sellers to collect sales tax, upholding a threshold of more than $100,000 in sales or 200 transactions in the state. The EU's [One Stop Shop](https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en) has let sellers declare VAT on digital services to EU consumers through a single return since July 1, 2021. The UK [requires overseas businesses](https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers) that sell digital services to UK consumers to register for UK VAT.

A merchant of record takes on those registrations and filings. A seller using a billing layer needs a tax engine and its own registrations. Stripe Tax costs 0.5% per transaction where the business is registered on its no-code option, while Chargebee and Recurly include tax calculation in their plans. Maxio's managed sales tax ends on November 20, 2026, after which its Avalara option needs the customer's own Avalara account.

## How the fees compare

The merchants of record charge per transaction. Paddle and Lemon Squeezy both charge 5% plus 50 cents, though Lemon Squeezy adds 1.5% for transactions outside the US, 1.5% for PayPal and 0.5% for subscription payments. Polar charges the same 5% plus 50 cents with no monthly fee, or as little as 3.4% plus 30 cents on its $400 Scale plan, with 1.5% more on non-US cards. FastSpring quotes its rates through sales.

The billing layers charge on top of card processing. Stripe Billing takes 0.7% of billing volume, or a monthly fee from $620 on a one-year contract, and Chargebee's Flow plan takes 0.8%, or $99 a month plus 0.65%. Recurly's Starter plan costs $249 a month plus 0.9% above the first $40,000 each month.

Four products charge flat fees instead. Zoho Billing Premium costs $59 a month on annual billing, ChargeOver costs $229 a month for 200 customers, and Maxio's Grow plan starts at $599 a month for up to $100,000 in monthly billings. Lago's open-source version is free to self-host, and its Premium plan is sold by quote.

A rough example shows how this adds up. A business billing $50,000 a month pays about $2,500 plus 50 cents per transaction to Paddle before currency and chargeback fees, with processing and tax included. On Stripe Billing the same volume costs $350 a month for billing, plus card processing at 2.9% plus 30 cents per US charge and the cost of tax compliance.

## Failed payments and dunning

Every product here retries failed payments, but the schedules differ. Stripe recommends 8 tries within 2 weeks, Chargebee's smart dunning makes up to 12 retries, and Paddle retries up to seven times over 30 days. Lemon Squeezy retries four times over two weeks, Polar retries on days 2, 7, 14 and 21, and Zoho Billing allows up to 3 retries within 30 days.

Card updater services cut failures from expired or replaced cards. [Visa Account Updater](https://developer.visa.com/capabilities/vau/vau-faq) and [Mastercard's Automatic Billing Updater](https://developer.mastercard.com/product/automatic-billing-updater-abu/) let issuers pass new card details to merchants. Stripe updates saved cards automatically, Maxio supports updaters on several gateways, and Recurly sells Account Updater at extra cost on plans above Starter.

Plan level matters for some of these features. Recurly's MRR dashboard and intelligent retries are not on Starter, Zoho Billing keeps subscriptions, dunning and MRR reports for Premium and Enterprise, and Lago sells automatic dunning as a Premium add-on.

## Leaving with your customers' cards

Saved cards decide whether a business can switch platforms without asking every customer to re-enter payment details. Stripe exports card data only to another [PCI DSS Level 1 processor](https://docs.stripe.com/get-started/data-migrations/pan-export) and leaves subscriptions and payment history behind. Paddle says it moves payment details to a new provider's vault within 2 weeks, and Polar says it moves customers and saved cards at no charge.

Other routes are slower or unclear. A 2022 FastSpring post puts a subscription export at about 10 weeks and excludes PayPal agreements. We found no documented route for moving saved cards out of Lemon Squeezy, whose January 2026 update said it aims to move users to Stripe Managed Payments. On Chargebee, Zoho Billing, Lago and Maxio, cards stay with the payment gateway, so the gateway handles the move. Recurly offers one free tokenized card export when a merchant leaves, and Maxio charges $250 an hour when it has to format an import.

## Account holds at merchants of record

A merchant of record holds the seller's money for a while. Lemon Squeezy holds net sales for 13 days and pays out twice a month, Paddle pays out once a month with a $100 minimum, and FastSpring places a 45-day monitoring hold on new accounts. Polar pauses payouts for 120 days when a seller leaves, and Paddle releases held funds after termination at the later of six months or the end of the last subscription.

Regulators look at merchants of record too. In June 2025 Paddle agreed to pay [$5 million](https://www.ftc.gov/news-events/news/press-releases/2025/06/paddle-will-pay-5-million-settle-ftc-allegations-unfair-payment-processing-practices-facilitation) to settle FTC allegations of unfair payment processing for tech-support telemarketers, without admitting them.

## Renewal and cancellation rules

The FTC's 2024 click-to-cancel rule would have required cancellation to be as easy as sign-up, but the Eighth Circuit [vacated it](https://ecf.ca8.uscourts.gov/opndir/25/07/243137P.pdf) in July 2025 on procedural grounds. The FTC opened a new [advance notice of proposed rulemaking](https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-seeks-public-comment-response-advance-notice-proposed-rulemaking-regarding-negative-option) in March 2026. Enforcement continues under existing law, including a [$2.5 billion settlement](https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-secures-historic-25-billion-settlement-against-amazon) with Amazon over Prime in September 2025.

Business buyers are covered in some cases. The FTC [took action against Toast](https://www.ftc.gov/news-events/news/press-releases/2026/10/ftc-states-take-action-against-toast-inc-over-hidden-unauthorized-fees-deceptive-subscription) in October 2026 over subscriptions sold to restaurants. California's [amended Automatic Renewal Law](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2863), in force from July 1, 2025, requires express consent and cancellation in the same medium as sign-up, though it covers consumer purchases only. Mastercard's [subscription rules](https://www.mastercard.com/content/dam/public/mastercardcom/na/global-site/documents/subscription_recurring-payments-and-negative-option-billing-merchants.pdf) apply to business and consumer transactions alike.

Outside the US, card rules shape recurring charges as well. EU [payment rules](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32018R0389) require strong authentication when a series of recurring payments is set up, not for each later charge. India's [e-mandate framework](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=13374) allows recurring charges without extra authentication up to ₹15,000 per transaction.

## Security claims

Eight vendors state SOC 2 reports: Stripe, Chargebee, Recurly, Maxio, Zoho, Paddle and FastSpring, along with Lago for its hosted version. Stripe, Chargebee, Recurly, Maxio and ChargeOver state PCI DSS Level 1 compliance. Chargebee, Maxio and Zoho also state ISO 27001 certification. We found no SOC 2 statement from Lemon Squeezy, Polar or ChargeOver.

## What to test during a trial

- Change a test customer's plan mid-cycle and check the prorated invoice line by line.
- Fail a test payment and record each retry and reminder email the customer receives.
- Export customers, subscriptions and invoices, then ask in writing how saved cards would move to another processor and what that costs.
- Run a test sale to a buyer in another country and check the tax shown on the receipt.
- Cancel a test subscription the way a customer would and time each step.
