---
title: Usage-based billing software compared
definition: Eight usage-based billing platforms compared on event metering, tiered rating, usage invoices and prices checked at the vendor's own pages.
primaryKeyword: usage-based billing software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages and documentation.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Usage-based billing software, also called metered billing, charges customers for what they consume instead of, or on top of, a flat subscription. The eight products on this page each do three things. They meter usage events, they rate that usage with pricing tiers, and they produce invoices from the result. We read prices and capability claims from each vendor's own pages, and every product page links to the pages we used.

A plain subscription tool can sell a plan with a fixed monthly fee. A usage-based tool has to answer harder questions. It must count millions of events without double billing, apply the right rate to the thousandth unit compared with the first, and show the customer what they owe in good time. Those needs decide which product fits, so this page starts with the mechanics and then turns to prices.

## What the three tests mean

We listed a product only when its own documentation covered all three capabilities. Usage metering means the product accepts raw events and turns them into a number per customer. Rating and pricing tiers means it can apply graduated, volume, package or similar rates to that number. Invoices from usage means the result lands on an invoice or bill without someone typing it in.

Metering is the part buyers underestimate. [Orb](/products/orb) defines a billable metric as a query that filters and aggregates raw events, and it calculates the metric separately for each customer. [Lago](/products/lago) applies an aggregation type to incoming events, with count, count unique, latest, max, sum and weighted sum on offer. [Flexprice](/products/flexprice) links events to a metered feature by a case sensitive event name and offers eight aggregation functions. [m3ter](/products/m3ter) takes measurements by API or file upload, with up to 1,000 measurements per request and idempotent ingestion inside a 35-day window.

Duplicates and corrections matter once real money is involved. m3ter says ingested measurements cannot be edited and that errors are fixed with positive or negative corrective measurements. [Recurly](/products/recurly) lets merchants log usage only through its Usage API, either in real time or as hourly or daily aggregates. [Maxio](/products/maxio) separates the work into streams that receive events, meters that calculate usage and metered products that connect usage to price.

## Rating: tiers, volumes and packages

Rating is where the same usage produces different bills under different models. Graduated or tiered pricing charges each unit at the rate of the band it falls in. Volume pricing charges every unit at the rate of the highest band reached. Stairstep pricing charges a fixed amount for the band. Package pricing sets the size of a billable block.

Lago documents a graduated example with three bands, where units up to 100 cost $1.00, units 101 to 200 cost $0.50, and later units cost $0.10, so 250 calls cost $155. m3ter describes tiered, volume and stairstep pricing types, and Maxio lists per unit, tiered, volume based, stairstep and a hybrid scheme for metered components. Recurly supports tiered, volume and stairstep usage add-ons, but its documentation says volume and stairstep add-ons do not accept usage corrections.

Orb documents tiered and package pricing and says matrix pricing is deprecated and supported only for legacy accounts. Stripe's documentation lists tiered pricing as volume based or graduated, next to flat rate, per seat and usage-based models. Flexprice lists a volume based model where the price changes with usage volume. Its documentation does not use the word tiered, so a buyer who needs several bands should confirm that with the vendor.

A common design is a free first band. Maxio and Recurly both suggest a $0 first bracket to represent included usage, followed by paid bands for overage. A product that cannot express that shape forces a separate allowance workflow.

## From usage to an invoice

The last step is the one finance teams see. In [Stripe Billing](/products/stripe-billing), meter events are sent to Stripe and aggregated at the end of the billing period. Stripe processes events asynchronously, so upcoming invoices may not immediately reflect recent events. Stripe's own documentation recommends Metronome for new integrations and says basic usage-based billing remains supported for existing ones.

[Metronome](/products/metronome) works differently. When a contract's billing period starts, it creates a draft usage invoice that updates continuously as events arrive. Each line shows the rate card list price, the customer-specific price and the quantity consumed. Commitments and credits appear as adjustments, such as a prepaid $50 commitment offsetting the first $50 of usage. Orb takes a similar view, saying active subscriptions carry an upcoming invoice that captures accrued usage charges, with an ingestion grace period before the end of period invoice is issued.

Older subscription platforms bill usage in arrears at renewal. Recurly bills usage fees at the end of each cycle, and usage add-ons appear on every later invoice, even at zero usage. Maxio records usage during the period, charges it at renewal and resets usage to zero for the next period. m3ter supports only billing in arrears for usage charges, while standing charges and minimum spends can go either way.

Timing is a business choice as much as a software one. Arrears billing means a customer can run up a large bill before seeing it. Products with a running draft invoice and usage alerts let you warn customers sooner.

## Metronome now sits inside Stripe

Stripe's documentation says Metronome is now part of Stripe, and Stripe's newsroom page, cited on the Stripe Billing product page, records the completed acquisition in January 2026. The documentation says Metronome handles metering, rating and billing, while Stripe handles payment collection, tax calculation and revenue recognition. It also lists gaps. Metronome does not work with Stripe Connect, Adaptive Pricing or Workflows, and Checkout needs custom API calls and webhook setup.

For a buyer this means two Stripe-owned routes to usage billing. The basic route uses Stripe Meters and keeps full compatibility with Connect and Checkout. The Metronome route adds real-time usage visibility, prepaid credit drawdown, commits, ramp schedules and dimensional pricing. Stripe says to choose Metronome for new integrations unless you already bill with Billing Meters.

## How the fees compare

Usage-based vendors price in three ways. Some take a share of the billing they process, some charge a flat platform fee, and some sell credits.

Metronome's Starter plan lists 0.8% of billing volume plus $0.04 per 1,000 ingest events, and a quoted Custom plan adds invoicing integrations, data exports and enhanced service levels. Flexprice charges $199 a month plus 0.5% of billing for its Pay as you go plan with up to 50 million events, and $3,000 a month with no revenue share for Enterprise. Orb sells credits at $6.00 each or less with volume discounts, and says one credit is 0.60% of billing volume plus event ingestion and other metered dimensions. New Orb sign-ups get 100 free credits.

Stripe Billing charges 0.7% of billing volume on pay as you go, or a monthly fee from $620 on a one-year contract, with card processing on top. Recurly's Starter plan costs $249 a month plus 0.9% of billing volume above $40,000 a month. Maxio starts at $599 a month for up to $100,000 of monthly billings. Lago's open-source version is free to self-host, and its Premium plan is sold by quote. m3ter publishes no amounts and describes a monthly core platform fee with allowances for ingested usage data and bill calculations, plus add-ons, support and implementation services.

Several of these pages leave gaps. Metronome, Orb and Flexprice show a dollar sign without naming a currency, and Metronome and Orb do not say whether their rates are monthly or annual. We record those figures as US dollars with that caveat on each product page. Flexprice's FAQ lists a question about what its 0.5% applies to without an answer.

A rough example shows why the model matters. A company billing $200,000 a month would pay about $1,600 plus event fees on Metronome Starter at 0.8%, and about $1,199 on Flexprice Pay as you go. Those numbers exclude card processing, taxes and negotiated discounts. Change the volume and the order can flip, because flat fees dominate at low volume and shares of revenue dominate at high volume.

## Open source and self-hosting

Two products offer a self-hosted route. Lago's self-hosted version is free under the AGPL-3.0 licence, and its hosted version states SOC 2 Type 2 compliance. Flexprice lists an open-source version deployable from GitHub and describes it as suited to small projects. Self-hosting removes the vendor's fee but moves infrastructure, upgrades and event volume handling onto your team.

Features can differ between the free and paid editions. Lago sells automatic dunning, single sign-on and most integrations in Premium, so check which plan holds the features you need before comparing costs.

## Which buyer fits which product

Companies selling an API or an AI model, with high event volume and custom contracts, should test Metronome, Orb and m3ter first. Those three describe commitments, credits or running invoices, and they are priced for larger teams. Companies that already bill with Stripe and have moderate volume can start with Stripe Billing's meters and move to Metronome later.

Companies with a mostly subscription product and a metered add-on may prefer [Recurly](/products/recurly) or [Maxio](/products/maxio), which treat usage as an add-on or component on a subscription. Engineering-led teams that want control over the code can look at Lago and Flexprice. Readers who need plain recurring plans, dunning and revenue metrics should read the [subscription billing](/software/subscription-billing) comparison first, and anyone sending one-off invoices can look at [invoicing](/software/invoicing) software. Sellers who must collect tax on digital services can read the [sales tax](/software/sales-tax) category.

## Products we left out

Chargebee documents usage-based billing, but the pages we could reach showed metered features and fixed fee plus overage pricing, not tiered rating or how usage lands on an invoice. We left it out until its pages cover all three. OpenMeter's pricing page lists no plans or prices and describes real-time metering, not rating or invoices. Amberflo's pricing page failed to load during our checks. We did not review Zuora, which we did not reach in this pass.

## What to test during a trial

- Send the same event twice and check that the customer is billed once.
- Send a late event for last month and see whether the invoice changes or a correction appears on the next one.
- Configure a graduated plan with a free first band and compare the invoice to your own spreadsheet.
- Change a customer's plan mid-cycle and read the prorated usage lines.
- Ask the vendor what the percentage fee applies to, and whether free credits, taxes and refunds count toward it.
- Export invoices and raw usage, then ask how long old events are kept.
