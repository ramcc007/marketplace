---
title: Transactional email services compared
definition: Eight transactional email services compared on checked prices, log retention, bounce and complaint handling, security claims and contract terms.
primaryKeyword: transactional email service
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages, prices fetched twice.
---

A password reset that arrives ten minutes late is a support ticket. Transactional email services exist to prevent that: they take a message your application generates, deliver it to the recipient's mailbox, and tell you what happened to it. The eight products on this page each send by API or SMTP, keep delivery logs, and handle bounces and spam complaints. We read every price on the vendor's own pricing page on November 4, 2026 and fetched each page a second time to confirm it.

## What qualifies for this page

A product is listed only if the vendor's own documentation shows three things. It must offer a sending API or an SMTP relay. It must keep delivery logs that show what happened to each message. It must handle bounces and complaints, which means recording them and stopping further sends to addresses that bounced or complained.

Marketing email platforms are not listed unless they also sell a separate sending API. The rules for a newsletter differ from the rules for a receipt, and the tools differ too. Products that failed to load in our checks, or whose pricing pages showed figures we could not confirm, are left out and named at the end of the next section.

## The eight products

[Postmark](/products/postmark) prices sending by monthly volume, from $15 a month for 10,000 emails. [Mailgun](/products/mailgun) and [SendGrid](/products/sendgrid) are developer-focused services with a sending API, and SendGrid also documents an SMTP relay. [Resend](/products/resend) sells an email API with a free tier of 3,000 emails a month. [Amazon SES](/products/amazon-ses) is a pay-per-use service inside AWS. [SMTP2GO](/products/smtp2go), [Mailtrap](/products/mailtrap) and [Elastic Email](/products/elastic-email) are smaller providers that sell plans by monthly volume.

We could not read usable plan prices for Brevo or MailerSend, because their pricing pages did not return plan figures to our fetch tool. We could not confirm Mailjet's log retention from its pricing page. None of the three is listed. They may qualify later.

## Why sender rules matter more than features

Since February 1, 2024, Google has required anyone sending more than 5,000 messages a day to Gmail addresses to set up SPF, DKIM and DMARC for the sending domain. Google tells bulk senders to keep their reported spam rate below 0.10% and never to reach 0.30%. Marketing and subscribed messages must support one-click unsubscribe. Google's page does not name transactional messages in that requirement.

[Yahoo's sender standards](https://senders.yahooinc.com/best-practices/) from the same month ask bulk senders for both SPF and DKIM, a DMARC policy of at least p=none, and a spam rate below 0.3%. A service that reports complaints quickly and suppresses complaining addresses helps you stay under those figures. A service that does neither leaves you to build it.

In the United States, the FTC's [CAN-SPAM guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) says a message with only transactional or relationship content has a transactional primary purpose. It also says the law reads those categories narrowly. Each violating email can cost up to $53,088, and opt-out requests must be honored within 10 business days. A receipt that carries a promotion can fall outside the exemption.

## How the prices compare

Prices fall into three shapes. Postmark, Mailgun, Resend, SMTP2GO, Mailtrap, SendGrid and Elastic Email sell monthly plans with an included volume. Amazon SES charges per message, at $0.10 per 1,000 outbound emails pay as you go. Several plans add overage rates for extra emails.

A rough example shows the spread. Take a product that sends 100,000 emails a month. Using the listed rates, the monthly bill is about $10 on Amazon SES pay as you go, $30 on Mailtrap Basic, $35 on Resend Pro, $75 on SMTP2GO Professional and $90 on Mailgun Scale or Resend Scale. On Postmark we calculated about $126 on the Platform plan from its $18 base and $1.20 per 1,000 for the extra 90,000 emails. The same sum gives $133.50 on Pro and $177 on Basic.

These are arithmetic on list prices, and they leave out features. Mailgun Scale includes SAML single sign-on and 30 days of logs. Mailtrap Business, at $85 for 100,000 emails, includes a dedicated IP and 15 days of logs. Amazon SES at $10 includes neither, and its dedicated IPs cost $24.95 a month each.

SendGrid and Elastic Email show only starting prices. SendGrid lists Essentials from $19.95 a month and Pro from $89.95, and its volume selector sets the final figure. Elastic Email lists Starter at $19 and Pro at $49 from 50,000 emails, with higher volumes set by a slider that did not show prices in the text we read.

## Free plans and trials

Free plans differ in what they cap. Postmark's free plan allows 100 emails a month with no overages. Mailgun's allows 100 emails a day, which is roughly 3,000 a month if you use it every day. Resend gives 3,000 emails a month with a 100 a day cap. Mailtrap gives 4,000 a month with 150 a day. Elastic Email gives 3,000 a month, and SMTP2GO gives 1,000.

SendGrid has no permanent free plan on the page we read. It offers a 60-day trial at 100 emails a day with no credit card. Amazon SES offers a free plan for 6 months after account creation, tied to up to $200 in AWS credits for new customers, which must be used within 12 months.

## How long you can see what happened

Log retention decides whether you can answer a customer who says the email never arrived last month. The range is wide. Mailgun keeps 1 day of logs on Free and Basic, 5 days on Foundation and 30 days on Scale. Mailtrap keeps 3 days on Free, 5 on Basic, 15 on Business and 30 on Enterprise.

Postmark keeps message history for 45 days by default, and the Pro and Platform plans can extend it up to 365 days. Resend lists 30 days on all plans. SendGrid lists 3 days of activity history on Essentials and 7 on Pro, with up to 30 days through a paid add-on. Elastic Email lists 3 days on Free and Starter and 7 on Pro.

Amazon SES works differently. It publishes event data for sends, deliveries, bounces and complaints to CloudWatch, Amazon Data Firehose or SNS, and the retention is whatever you configure there. That is flexible for an engineering team and extra work for everyone else.

## Bounces and complaints

All eight services record hard bounces, and most stop sending to an address after one. Postmark documents 23 bounce types, including SpamComplaint, and flags whether it deactivated each address. SendGrid adds a bouncing address to its bounce list and blocks a second attempt. Elastic Email retries temporary 4xx failures for up to 48 hours and does not retry permanent 5xx failures.

Complaints take more care. Mailgun records a complaint when a feedback loop reports one. Amazon SES warns that Gmail provides no complaint data, so a recipient who clicks Spam in the Gmail web client is not added to your suppression list.
Amazon SES uses an account-level suppression list by default for bounces and complaints on accounts started after November 25, 2019, and it adds only hard bounces. Resend's dashboard shows the bounce type and subtype with suggested next steps, and lets you remove an address from its suppression list. SMTP2GO exposes endpoints to view, add and remove suppressions.

## Security and compliance claims

Vendors differ in what they state on their own pages, and we list only what we read. Mailgun states SOC 2 Type II and ISO/IEC 27001 certification. Mailtrap names SOC 2 Type II, SOC 3 and ISO 27001:2022. Resend states SOC 2 Type II and GDPR compliance, says it holds no ISO 27001 certificate, and says it cannot sign a Business Associate Agreement.

SMTP2GO states ISO 27001 and GDPR compliance, and says its data centers carry SOC 2 Type 2 attestations. Postmark states GDPR preparation and describes its data center as SSAE 16 SOC 1 Type 2 accredited. Amazon SES documentation lists it under AWS SOC, PCI, FedRAMP and HIPAA programs, and Twilio says SendGrid is not HIPAA compliant and will not sign a Business Associate Agreement.

We found no statement of SOC 2 or ISO 27001 on the Elastic Email security page we read, which covers only GDPR training. That leaves the question open rather than answered. A buyer who needs a report should request it from the vendor under a non-disclosure agreement.

## Contracts and leaving

Most plans are monthly and cancel without a minimum term. Postmark cancels at the end of the billing period and warns that account data is lost on cancellation. Resend lets you cancel renewal from the account page, Mailtrap and SMTP2GO say you can cancel at any time, and Mailtrap and SMTP2GO offer refunds within 30 days of first purchase.

Mailgun's terms require a non-renewal notice at least 30 days before a term ends, which matters if you signed an annual or enterprise order. Twilio's terms allow either party to end the agreement for convenience with 30 days' written notice, though order forms in effect run to their end.

Several terms let the vendor end service without notice. SMTP2GO, Resend and Elastic Email all say they may end an account without notice. Keep a second sending path configured, even if it sits idle.

## Hidden costs to price in

The headline plan rarely includes everything. A dedicated IP costs $50 a month on Postmark, $59 on Mailgun as an add-on, $30 on Resend Scale, $24.95 on Amazon SES and is included in SMTP2GO Professional, Mailtrap Business and SendGrid Pro. Resend charges $150 a month for single sign-on on Scale, and Mailgun reserves it for Scale.

Mailgun's pricing page is inconsistent on whether Foundation includes a dedicated IP. SMTP2GO's page lists a Premier plan with prices that match Professional. We report these as unresolved rather than guess.

## What to test during a trial

- Send a message to an address that does not exist and time how long the bounce takes to appear in the log.
- Send to a Gmail and a Microsoft address and compare the delivery events you receive for each.
- Mark a test message as spam from a mailbox you control and check whether the complaint reaches your webhook.
- Look up a message sent 31 days ago and confirm the log still shows it on your plan.
- Ask in writing what happens to your dedicated IP and sending reputation if you leave.
