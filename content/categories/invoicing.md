---
title: Invoicing software compared
definition: Eight invoicing products compared on fees checked at the source, free plan limits, payment methods, status tracking and e-invoicing rules.
primaryKeyword: invoicing software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages. Prices read from US pages and confirmed by a second fetch.
---

Invoicing software creates a bill, delivers it to the customer, lets the customer pay it online and shows whether it has been paid. The eight products on this page each create invoices, attach an online payment option to them and track the payment status. We read every fee on the vendor's own website on November 4, 2026, using the US pages, and each product page links to the sources we used. Prices shown to visitors outside the US can differ.

## Two kinds of cost

Invoicing products charge in two places, and most buyers compare only the first. The first is a subscription for the software. The second is a fee on each payment that arrives through the invoice, taken by the payment processor behind the product. A freelancer who sends a handful of large invoices cares mostly about the second number. A business that sends hundreds of small invoices a month cares about both.

Five of the eight products here have a free way to start. [Zoho Invoice](/products/zoho-invoice) is free with limits of two users, three projects and 500 invoices a year. [Wave](/products/wave) has a $0 Starter plan with unlimited invoices. [Invoice Ninja](/products/invoice-ninja) has a free plan for up to five clients. [SumUp Invoices](/products/sumup-invoices) and [PayPal Invoicing](/products/paypal-invoicing) charge no subscription and make their money from payment fees.

The other three charge a subscription or a per-invoice fee. [FreshBooks](/products/freshbooks) starts at $23 a month for five billable clients. [Billdu](/products/billdu) lists $4.99 a month for its Lite plan on annual billing. [Stripe Invoicing](/products/stripe-invoicing) charges 0.4% of each paid invoice on its Starter tier, on top of Stripe's payment processing fees.

## How the payment fees compare

Payment fees are close to each other for cards and differ more for bank transfers. The table shows what each product takes from a card payment on an invoice, using the US rates we read on the vendor pages.

| Product | Card payment fee on an invoice |
|---|---|
| SumUp Invoices | 2.90% + $0.15 |
| FreshBooks | 2.9% + $0.30 |
| Wave Starter | 2.9% + $0.60 |
| PayPal Invoicing | 2.99% + $0.49 |
| Stripe Invoicing | Stripe Payments rate, plus 0.4% per paid invoice |

On a $200 invoice paid by card, the fee is $5.95 at SumUp, $6.10 at FreshBooks, $6.40 at Wave Starter and $6.47 at PayPal. On a $2,000 invoice the gap is smaller in relative terms. SumUp takes $58.15, Wave Starter $58.60, FreshBooks $58.30 and PayPal $60.29. These figures exclude subscription fees and currency conversion.

Wave's Pro plan changes the fixed part. It charges 2.9% with no fixed fee on the first ten card transactions in each monthly period and 2.9% + $0.60 after that, at $19 a month or $190 a year. A business with fewer than ten card payments a month saves the fixed fee but pays the subscription, which cancels the saving for most small senders.

Bank payments are cheaper for large invoices. PayPal charges 1% for Pay by Bank, capped at $10, so a $2,000 invoice costs $10 in fees. FreshBooks charges 1% for ACH bank transfers with no stated cap, which makes the same invoice cost $20. SumUp does not list a bank payment rate on the pages we read. Wave's invoicing page states 1% with a $1 minimum, but its pricing page does not repeat it, so we did not confirm that figure twice and do not compare it here.

Read the footnotes. PayPal adds 1.5% to its domestic rate on international invoices, and its Pay Later option costs 4.99% + $0.49. FreshBooks charges 6% + $0.30 for Buy Now, Pay Later payments and 1.5% for Instant Payouts. Billdu says its payment fees vary by method and location and gives no rates on the page we read.

## Free plans and their limits

A free plan is useful only while the business fits inside it. Invoice Ninja's free plan stops at five clients, and its table shows that the REST API, automatic payment reminders and e-invoicing with PEPPOL belong to paid plans. Zoho Invoice's free plan puts "Powered by Zoho Invoice" branding on invoices and caps invoices at 500 a year. Zoho also says that data on a free account is deleted after more than 180 days of inactivity, with a notice first.

Wave's Starter plan is the least restricted free plan we found for invoice volume, because it allows unlimited invoices. The Pro plan adds automatic bank transaction imports, automated late payment reminders and custom invoice branding. Billdu has no free plan, only a 7-day trial, and FreshBooks gives a 30-day trial with no card required.

Prices on pages can include temporary discounts. FreshBooks showed 80% off for four months on the day we checked, and we list the regular prices. A discount that has expired by the time you read this does not change the plan limits, so compare the regular price when you budget for a second year.

## What invoice status tracking means

Every product here shows whether an invoice is paid, but the detail varies. Stripe documents five statuses: draft, open, paid, void and uncollectible. FreshBooks lists draft, sent, viewed, paid, auto-paid, partially paid, disputed, outstanding and overdue, and it notifies the sender when a client is late. SumUp shows sent, paid, pending or overdue, and PayPal says it tracks when invoices are sent, opened and paid.

Partial payments matter for deposits and instalments. Invoice Ninja updates the invoice with the remaining balance and a new due date after each partial payment. Stripe supports partial payments and payment plans on invoices. Zoho Invoice lets customers pay partially from its customer portal.

Chasing late payers is a separate feature. Wave offers late payment reminders with online payments or on its Pro plan. PayPal and Billdu both list automatic reminders. Stripe sends reminder emails and retries as part of its automatic collection features.

## Late payment law

Invoice terms interact with the law in most markets. In the UK, businesses may charge statutory interest on late business-to-business payments at [8% plus the Bank of England base rate](https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt). That right does not apply where the contract sets a different rate for late payment, and lower rates cannot be used in contracts with public authorities.

The EU's [Late Payment Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0007) sets a standard payment term of 30 days and a maximum of 60 days between businesses. Interest on late payment runs at the reference rate plus eight percentage points, and the creditor is entitled to at least EUR 40 in compensation. Member states apply the directive in their own law, so the details differ by country.

An invoice that states its due date and late-payment terms gives the sender a clear basis for either rule. Check that the product prints payment terms on the invoice and lets you set a due date per customer. FreshBooks, for example, lets you set the due date to the issue date, a number of days after it, or a custom date.

## E-invoicing rules are spreading

A PDF emailed to a customer is no longer a valid invoice everywhere. The EU's [ViDA package](https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en) entered into force on April 14, 2025, and lets member states introduce mandatory e-invoicing under specific conditions. Digital reporting for cross-border business transactions follows from July 1, 2030, and member states with domestic real-time reporting must align with the EU model by January 1, 2035.

National rules are already in force. Since January 1, 2026, [Belgian VAT-liable enterprises](https://einvoice.belgium.be/en) have had to use structured electronic invoices between businesses. In Poland, [KSeF](https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/zakres-obowiazkowego-ksef/) became mandatory for invoice issuing on February 1, 2026 for taxpayers whose 2024 sales exceeded PLN 200 million and on April 1, 2026 for other taxpayers. Receiving invoices through KSeF has been mandatory for all taxpayers since February 1, 2026.

None of the eight products here states full support for these national systems on the pages we read. The only reference we found is on Invoice Ninja's comparison table, which lists e-invoicing and PEPPOL among features missing from its free plan. A business with customers in Belgium or Poland should ask the vendor in writing which formats and networks it supports, and treat that answer as part of the evaluation. Our taxonomy treats [e-invoicing](/software/e-invoicing) as its own category for this reason.

## US tax reporting through payment processors

Invoices paid through a processor can end up on a tax form. For 2025 and later, third-party settlement organizations, including payment apps and online marketplaces, must issue a Form 1099-K only when gross payments to a payee [exceed $20,000 and more than 200 transactions](https://www.irs.gov/newsroom/irs-issues-faqs-on-form-1099-k-threshold-under-the-one-big-beautiful-bill-dollar-limit-reverts-to-20000), according to the IRS. The IRS page is marked as archival content, so check the current rule when you file.

Taxability does not depend on whether a form arrives. Income from services remains reportable either way, so the invoice records and payment reports in your invoicing product need to match what you report. Export a year of paid invoices during the trial and compare the total with the processor's payout report.

## Security claims

Security disclosures are thin across this group. Stripe states PCI Service Provider Level 1 certification and annual SOC 1 and SOC 2 Type II reports. Zoho states SOC 2 Type 2 compliance and ISO/IEC 27001 certification for its cloud services. We did not find a security or compliance page that loaded for FreshBooks, Wave or Invoice Ninja, and we found no SOC 2 statement on the SumUp, Billdu or PayPal invoicing pages we read.

Card data is handled by the processor in most of these products, not by the invoicing tool itself. Billdu says it is powered by Stripe and PayPal, and Invoice Ninja connects to gateways including Stripe, PayPal, Square, GoCardless, Authorize.net and Mollie. Ask which party stores the card details, because that decides where the PCI obligations sit.

## What to test during a trial

- Send a test invoice with a due date, a deposit and a tax line, and check what the customer sees on the payment page.
- Pay the invoice with a card and with a bank transfer, then compare the fee shown in the report with the vendor's rate card.
- Let a test invoice go past its due date and record each reminder the customer receives.
- Create an invoice in the currency of your largest foreign customer and check the conversion fee before sending it.
- Export all invoices and payments to CSV and confirm that every paid invoice carries its payment date.
