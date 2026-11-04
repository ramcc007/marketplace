---
title: Sales tax and VAT software compared
definition: Nine sales tax and VAT tools compared on rate calculation, registration, filing and nexus monitoring, with fees checked at the source.
primaryKeyword: sales tax software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Nine products checked against vendor pages. Figures are US dollars unless noted.
---

Sales tax software works out how much tax to charge on each sale, tells a seller where it has to register, and prepares and files the returns. To appear on this page a product had to show, on its own website, tax rate calculation, filing and remittance, and either registration or nexus tracking. Nine products met that bar: [Stripe Tax](/products/stripe-tax), [Avalara](/products/avalara), [TaxJar](/products/taxjar), [TaxCloud](/products/taxcloud), [Numeral](/products/numeral), [Zamp](/products/zamp), [Kintsugi](/products/kintsugi), [Sphere](/products/sphere) and [Quaderno](/products/quaderno). We read every price on the vendor's own site, and read each price a second time before publishing.

## Why sellers need this software

The rules changed in 2018. In [South Dakota v. Wayfair](https://www.supremecourt.gov/opinions/17pdf/585us1r58_pok0.pdf), the US Supreme Court let states require out-of-state sellers to collect sales tax, upholding a threshold of more than $100,000 in sales or 200 transactions in the state. Before that ruling a seller generally owed tax only where it had a physical presence. Now a seller with no office in a state can still have an obligation there, which is called economic nexus.

Each state sets its own test. According to Avalara's [state-by-state guide](https://www.avalara.com/us/en/learn/guides/state-by-state-guide-economic-nexus-laws.html), California and Texas use $500,000 in sales, New York uses $500,000 and 100 transactions, Alabama and Mississippi use $250,000, and Florida, Washington, Illinois, Pennsylvania and Colorado use $100,000. The same guide lists a 200-transaction test in Arkansas, Connecticut, Georgia, Hawaii, Maryland, Michigan, Minnesota, Nebraska, Nevada, New Jersey, Ohio, Rhode Island, Vermont, Virginia, West Virginia and several other places. A seller shipping to customers in many states can cross several of these lines in a single year without noticing.

Outside the US the same idea applies to VAT. The EU's [One Stop Shop](https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en) lets a seller declare VAT on digital services to EU consumers in one return, and the UK [requires overseas sellers](https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers) of digital services to consumers to register for UK VAT. Several tools below handle those returns, and others stop at US sales tax. Rules change often, and what counts as taxable depends on the product and the state, so check a tool's coverage for your own case.

## Four jobs, and who does which

Every product here covers some mix of four jobs. Calculation finds the correct rate for a customer's address at the time of sale. Monitoring, also called nexus tracking, compares a seller's sales in each place with the registration thresholds. Registration signs the seller up with a tax authority. Filing prepares the return and remits the tax.

The tools split on how they price those jobs. Stripe Tax, Avalara and Sphere bundle several jobs into one price. Numeral and Kintsugi give monitoring away and charge for each registration or filing. TaxCloud and TaxJar sell filing subscriptions. Zamp quotes one price for everything. That difference shapes the bill more than any feature checklist, so the next section compares prices on one footing where the data allows.

## How the fees compare

Stripe Tax charges per transaction, only in places where the seller is registered. The no-code route costs 0.5% of the transaction, and the API route costs $0.50 and includes 10 calculation calls. A seller with a $40 average sale pays about $0.20 a sale on the no-code route and $0.50 on the API route. Registration and filing prices are not on its pricing page.

Avalara charges per state. Core Compliance costs $79 per state per month, or $799 per year, with a three-state minimum. Core Compliance plus SST Services costs $69 per state per month, or $699 per year, with no minimum. A seller registered in three states pays $2,397 a year on the first plan. That covers calculation, nexus tracking and filing with no per-return fees, though registration outside the Streamlined Sales Tax program is a separate service.

TaxJar charges by order volume and filing credits. Starter costs $39 a month and Professional costs $99 a month, both for 200 orders a month. Starter includes 2 AutoFile credits a year and Professional includes 4. Extra credits cost $50 and $55. A seller filing monthly in four states needs 48 returns a year, so credit costs can exceed the subscription itself.

TaxCloud lists filing plans from $39 a month, or as low as $20 per filing, and charges 7% extra for credit card payments. Audit support starts at $99 a month. Its page text did not show dollar amounts for the Starter and Premium order tiers, so a buyer should confirm those before comparing it with TaxJar.

Numeral and Kintsugi are the most granular. Numeral's Professional plan costs $75 per filing and $150 per registration. Kintsugi's Starter plan costs $75 per action in the US and Canada, where an action can be a registration, a filing, an amended return or a deregistration. At those rates, a seller filing quarterly in five states pays $1,500 a year in filing fees on either tool, before any registration charge.

Sphere's Starter plan costs $100 per region per month for fewer than 10 regions, and its page does not define a region. Five regions come to $6,000 a year. Quaderno lists plans by monthly transaction count, from a 25-transaction Hobby plan to a 2,500-transaction Growth plan, but its pricing text did not state a currency, so we show those figures as listed and not as dollars. Zamp publishes no price at all and says it scopes each quote to the seller's footprint.

## Free monitoring is a real starting point

A seller who is unsure whether it has an obligation can start without paying. Numeral's Monitoring plan is free and includes a nexus study once the seller connects its stores or billing platform. Kintsugi's Free plan covers nexus monitoring, historical liability auditing and threshold alerts. Zamp's free plan includes a one-time nexus analysis and a 30-minute consultation with a tax expert. TaxCloud offers a 30-day trial with no credit card, and Quaderno offers a 7-day trial.

Stripe Tax also watches thresholds, but only for payments processed by Stripe, invoices processed outside Stripe and transactions sent through its Tax APIs. It sends alerts only after a business has had $10,000 in revenue in the previous year, and the documentation says the decision to register stays with the seller.

## Registration and filing are separate purchases

Registering with a state and filing returns after that are different services. Stripe says so directly: its Register for me option signs a business up but does not prepare returns or remit tax. Stripe offers automated filing in the US and for selected registrations in Ireland and Canada, and sends other locations to partners including Taxually and TaxJar, with filing credits bundled into its Tax Complete plan.

For qualifying sellers, the Streamlined Sales Tax program is the cheapest route. Avalara describes 24 member and associate states plus Pennsylvania, with state-funded calculation and filing in up to 25 states for qualifying sellers who have no significant physical presence. TaxCloud says filing and registration are free in 24 states through the same program. A remote seller with sales into many SST states should check this before paying per return elsewhere.

## Guarantees and who is on the hook

Late filing is the main risk a seller hands over. Numeral guarantees that sales tax is filed on time or it pays the penalties and interest. Zamp says it covers penalties and interest when a Zamp-managed calculation or filing causes them, and says it covers tax, penalties and interest, up to 12 months of fees, if an inaccurate API result triggers an audit. TaxJar states a 100% on-time filing rate for 2025. These are vendor statements, and the full terms sit on each vendor's commitment pages, so read them before relying on any of them.

Security evidence is thin on some sites. Avalara says AvaTax has SOC 2 Type 2 compliance, Zamp says it is SOC 2 Type II compliant, and Kintsugi says it holds a SOC 2 Type II report. We found no SOC 2 statement on the pages we read for Numeral, TaxCloud, TaxJar, Sphere or Quaderno, though Numeral links to a separate security site that we could not read. Quaderno states GDPR compliance and a 99.99% uptime SLA.

## Integrations and the billing system

Most sellers choose around the systems they already use. Stripe Tax is built into Stripe Payments, Billing, Checkout and Connect and can also calculate tax for other processors through its API. TaxCloud lists Shopify, BigCommerce, WooCommerce, QuickBooks, Stripe and Chargebee. Numeral lists Shopify, Stripe, NetSuite, QuickBooks, Xero and Salesforce, among others. Zamp lists more than 30 integrations, and Quaderno lists Shopify, WooCommerce, Amazon FBA, Stripe, PayPal and GoCardless.

Software companies that already use a billing tool should read the [subscription billing comparison](/software/subscription-billing) alongside this page. A merchant of record such as Paddle collects and remits tax on the seller's behalf, so a seller using one may not need a separate sales tax tool for those sales. A seller on a billing layer such as Stripe Billing or Chargebee keeps the registrations and filings, and this category is where that work gets done.

## What to test during a trial

- Enter ten real customer addresses across different states and compare the rates shown with each state's published rate.
- Ask in writing which of calculation, registration, filing and notice handling are in the quoted price, and which are charged per action.
- Export the filing history and calculation data, and ask how a return would be handled if you left mid-quarter.
- Find your last twelve months of sales by state and compare them with the thresholds above to see where you may already owe tax.
- Ask what happens when a state sends a notice, who answers it, and how fast.
