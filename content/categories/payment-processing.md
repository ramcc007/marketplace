---
title: Payment processing software compared
definition: Eight payment processors compared on card and wallet acceptance, payouts and fraud screening, with fees checked at each vendor's own page.
primaryKeyword: payment processing software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages. Stripe Payments left out because its US pricing page could not be read.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Payment processing software lets a business accept card and wallet payments, receive the money in a bank account and screen out fraudulent orders. The eight products on this page each meet all three of those tests, and we checked every fee on the vendor's own website. Prices here are US figures in dollars unless a row says otherwise, and several vendors change their rates by country.

## What counts as a payment processor here

A product has to show, on a page we can link to, that it takes cards and digital wallets, that it pays out the funds, and that it screens payments for fraud. We read vendor documentation for each claim instead of marketing summaries where we could. [Square Payments](/products/square), [Adyen](/products/adyen), [Braintree](/products/braintree), [PayPal Checkout and Card Payments](/products/paypal-payments), [Helcim](/products/helcim), [Checkout.com](/products/checkout-com), [Mollie](/products/mollie) and [Airwallex](/products/airwallex) passed.

Terms vary between vendors. A payment gateway passes card details to a bank, a merchant account holds the money between the sale and the deposit, and a payment service provider bundles both. The difference matters when you read a fee table, because a gateway-only price leaves out the bank's charges. Authorize.net, for example, lists its gateway-only fee separately from an all-in-one rate.

## How a card fee is built

Every card payment carries three layers of cost. The first is interchange, which Visa describes as transfer fees between acquiring banks and issuing banks for each card transaction. Merchants do not pay interchange directly, according to [Visa](https://www.visa.com/en-us/support/business/regulation-fees). They pay a merchant discount to their own financial institution, and interchange sits inside it. The second layer is the card network's own assessment, and the third is the processor's markup.

Debit cards in the US show how much regulation shapes the first layer. Under Regulation II, a covered issuer's debit interchange fee is capped at [21 cents plus 0.05% of the transaction](https://www.federalreserve.gov/paymentsystems/regii-average-interchange-fee.htm), with a 1 cent fraud-prevention adjustment if the issuer qualifies. The Federal Reserve reports that the average fee across all debit transactions in 2024 was 34 cents, or 0.73% of the average transaction value. Covered transactions averaged 23 cents, and exempt transactions averaged 51 cents. A small issuer's debit card can therefore cost more to accept than a large bank's.

Processors package these layers in two ways. Flat-rate pricing bundles everything into one percentage plus a fixed fee, such as 2.89% plus 29 cents at Braintree. Interchange-plus pricing passes interchange and network costs through at cost and adds a stated markup, as Helcim and Adyen do. Flat rates are easier to forecast, and interchange-plus is usually cheaper once a business has volume or a mix of low-cost debit cards.

## Fee comparison at the same sales volume

An example shows the gap. Take 100 online card payments of $100 each in a month, which is $10,000 in sales. These figures use each vendor's published rate for US cards entered online and leave out chargebacks and currency conversion.

| Processor | Published rate | Monthly cost on $10,000 |
|---|---|---|
| Airwallex | 2.80% + $0.30 | $310 |
| Braintree | 2.89% + $0.29 | $318 |
| PayPal advanced cards | 2.89% + $0.29 | $318 |
| Square (API payments) | 2.90% + $0.30 | $320 |
| PayPal standard cards | 2.99% + $0.49 | $348 |
| PayPal Checkout | 3.49% + $0.49 | $398 |

Two vendors price differently and cannot sit in the same table. Helcim charges a markup of 0.50% plus 25 cents on keyed and online cards below $50,000 a month, which is $75 on this example, and interchange and network costs come on top. Adyen charges $0.13 per transaction plus 0.60% for Visa and Mastercard, which is $73 before interchange and scheme fees. Neither figure is comparable to the flat rates until you add a realistic interchange estimate for your card mix.

Checkout.com publishes no rates at all and prices by business profile and risk category. Mollie lists euro fees, from 1.80% plus 0.25 euro for EEA consumer Visa and Mastercard cards to 3.25% plus 0.25 euro for non-EEA cards, so a US seller would face a different table.

## Costs outside the headline rate

The headline percentage rarely tells the whole story, so check the extras before you sign.

- Chargebacks: PayPal charges $20 per chargeback and Braintree charges $15. Helcim charges $15 only when a chargeback is lost.
- International and currency: Braintree adds 1% for cards issued outside the US and for non-USD payments, and PayPal adds 1.50% to international commercial transactions. Airwallex lists 4.30% plus $0.30 for international cards.
- Manual entry: Square charges 3.5% plus 15 cents for manually entered cards and cards on file.
- Recurring payments: Helcim adds 0.4% per recurring transaction.
- Bank debits: Braintree charges 0.75% for standard ACH, capped at $5, and Square charges 1% with a $1 minimum.
- Minimums: Adyen applies a minimum invoice depending on industry or business model and does not publish the amount.

Monthly fees are mostly absent. Adyen, Helcim and Mollie list none for online payments, and Square's free plan carries none. Square's paid plans cut the in-person and invoice rates but we could not read their monthly prices on the fees page.

## Wallets and payment methods

Cards are the base, and wallets add conversion on mobile. Square's Web Payments SDK takes credit cards, Apple Pay, Google Pay, ACH bank transfers, Afterpay and Cash App Pay. Braintree supports cards, Apple Pay, Google Pay, PayPal and Venmo, and says Apple Pay and Google Pay are open to most merchants in the US, Canada, Europe, Australia and APAC.

Support is not uniform. Google Pay on Braintree needs Google's approval. Apple Pay on Checkout.com outside the EEA or UK requires the account manager. Helcim's online checkout tool supports Google Pay, and its developer page does not mention Apple Pay. Mollie lists Apple Pay, Google Pay and PayPal under wallets.

## Payouts and how fast money arrives

Payout timing decides how much working capital a business needs. Helcim deposits credit and debit sales the next business morning. Adyen says a payout can take one to two business days to be initiated after a batch closes, and the bank may need up to three more days to post the funds. Square's US cutoff is 5 PM Pacific each business day, and it sells Instant Deposit to a linked bank account or debit card within seconds for a fee.

Mollie defaults to weekly payouts on Wednesdays, though sellers can pick daily, weekly, monthly or manual payouts, and amounts under 5 euros roll over. Braintree sends one disbursement notification per merchant account per day for accounts it funds. PayPal lets a merchant withdraw a balance instantly for 1.50%, with a $0.50 minimum, and it offers PayPal Payouts for sending batch payments to many recipients in 96 countries or regions.

Payout timing in a brochure and in a contract can differ. Read the reserve and hold clauses before signing, and ask what slows a payout.

## Fraud screening differences

Fraud tools range from always-on defaults to separate paid products. Adyen's risk engine screens every payment and decides to block, allow or review it, and it is enabled by default. Helcim's Fraud Defender scores each online payment from 1.0 to 10.0 using seven factors, including CVV, address verification, IP location and card country. Square's Risk Manager lets a seller write rules that require 3D Secure, with blocks and alerts.

Braintree separates its tools. Basic fraud tools come with the account, Premium Fraud Management Tools run checks before authorization, and Chargeback Protection starts at 0.4% per transaction. PayPal Fraud Protection is for merchants who have integrated advanced card payments, and Checkout.com needs the account manager to switch Fraud Detection on. Mollie includes basic screening on a standard account, while its Acceptance & Risk upgrade has no published price.

Treat every score as an estimate. Helcim says its scores are estimates and that a voided transaction cannot be un-voided.

## PCI DSS and who carries the compliance work

The Payment Card Industry Data Security Standard is the rulebook for anyone who stores, processes or transmits cardholder data. The [PCI Security Standards Council](https://www.pcisecuritystandards.org/about_us/) was founded in 2006 by American Express, Discover, JCB International, Mastercard and Visa. The Council does not enforce compliance, and payment brands and acquirers decide whether a merchant must validate it.

For a small business the practical question is how much card data touches its own systems. Hosted fields and prebuilt checkout pages keep raw card numbers away from your servers, which narrows the scope. Helcim says it is a Level 1 PCI-DSS compliant service provider, and Square says it maintains PCI certification as merchant of record so sellers do not validate it individually. Checkout.com's Payments API only takes full card details from merchants at SAQ D compliance level, the heaviest self-assessment.

Ask each vendor for its attestation of compliance, and ask which self-assessment questionnaire your integration would require.

## Who each product fits

Choose by what you sell and how you take payment.

- A shop with a card reader and an online store: Square covers in-person and online sales on one account with no monthly fee on the free plan.
- A business that wants low markups and no contracts: Helcim lists no cancellation fee or contract and passes interchange through.
- A company selling in many countries: Adyen and Checkout.com are enterprise-oriented, and Airwallex adds multi-currency accounts.
- A site that already takes PayPal: PayPal's own card products or Braintree keep PayPal and Venmo in one integration.
- A European seller: Mollie prices in euros and pays out in 12 currencies including USD.

## What to test before choosing

- Request a written quote at your real volume and card mix, and ask for an interchange-plus estimate beside any flat rate.
- Run a test sale with Apple Pay and Google Pay in each country you sell to.
- Ask what triggers a payout hold, how long it lasts and how the reserve is released.
- Dispute a test charge and note the fee, the evidence you must upload and the deadline.
- Read the termination clause and ask what happens to saved cards if you leave.
