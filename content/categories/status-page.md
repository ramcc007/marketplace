---
title: Status page software for incident communication
definition: Nine status page tools compared on prices checked at the source, subscriber channels, uptime history, free plans and open source options.
primaryKeyword: status page software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Nine products checked against vendor pages, with prices read twice from the pricing pages.
  - date: 2026-11-05
    note: Second pass. Removed claims the pages did not support, including the uptime history and SMS claims that could not be confirmed, and rewrote the body in our own words.
---

A status page tells customers whether a service works, what the team knows about a problem and when the next update is due. The nine products on this page each offer a public status page and a way to post incident updates that subscribers can receive. We read each vendor's pricing page and, for a few claims, its help pages. Uptime history is covered separately, because the evidence for it is thin.

## What a status page has to do during an outage

Google's SRE book treats communication during an incident as a defined role. The communications lead is the public face of the response team, and the chapter says that role includes regular updates to the response team and to stakeholders. The chapter describes an incident in which nobody knew what colleagues were doing, and business leaders and customers grew frustrated. A status page takes part of that load off the support queue, because one post reaches everyone who subscribed.

The page also has to survive the outage it reports. Cloudflare's postmortem of the November 18, 2025 incident says the network began failing at 11:20 UTC, and that all systems were functioning normally again at 17:06 UTC. The post says Cloudflare's status page is hosted completely off its own infrastructure, and that the status page went down during the incident anyway. Cloudflare calls that a coincidence. The outage did lead some people diagnosing the problem to suspect an attacker, and the post says the incident was not caused by a cyber attack.

The lesson for a buyer is practical. A status page that runs on the same infrastructure as the product it reports on is a weak design, because it can fail at the same moment. A page that fails for unrelated reasons still creates confusion.

## What qualifies a product for this page

We listed a product when its pages show a public status page that anyone can open without an account, and a way for visitors to subscribe to updates. Products that only monitor, or only page an on-call engineer, belong under [uptime monitoring](/software/uptime-monitoring) or [incident management](/software/incident-management) instead. Several products here sit in one of those categories as well, and we say so where it matters.

Uptime history is a check item rather than a hard test. Few pricing pages describe it, so we report what we could confirm and no more.

## Free plans

Five products let a team publish a status page without paying.

- Atlassian Statuspage's free plan includes 100 subscribers, 25 components and 2 team members, with email, Slack and Microsoft Teams notifications.
- OneUptime's free plan has one status page and 100 subscribers.
- Instatus's free Starter plan has 200 subscribers and a public page, but no custom domain.
- openstatus's free Hobby plan includes one monitor and one status page with three components, and needs no credit card.
- UptimeRobot's free plan includes basic status pages, with one page.

The free plans differ in what they leave out. Hyperping's free plan includes one basic status page but no subscriber notifications. Sorry and Status.io have no free plan. Sorry offers a 7-day trial without a card, and Status.io lists only paid plans.

A free page is enough for a small product that needs a place to post. It stops being enough when customers expect to be told. Statuspage's Hobby plan sends email, Slack and Microsoft Teams messages, but not SMS or webhooks, and those start on its Startup plan at $99 a month.

## Entry prices

Prices below are the lowest paid plan each pricing page lists for a status page with subscribers.

- OneUptime: Growth, from $22 per user according to the page heading, billed monthly or yearly. Subscribers are unlimited.
- Instatus: Pro, from $20 a month, with 25% off for yearly billing. Up to 5,000 subscribers.
- Atlassian Statuspage: Hobby, $29 a month, with up to 250 subscribers.
- openstatus: Starter, $30 a month or $300 a year. Subscribers are included, but the page gives no count.
- Status.io: Basic, $79 a month, with up to 500 subscribers. It offers 5% off annual subscriptions but publishes no yearly prices.
- Sorry: Status Page, from $99 a month, with up to 1,000 subscribers.
- Hyperping: Essentials, $24 a month billed yearly ($290 a year), with up to 100 subscribers.

Some of these need a note. The OneUptime unit appears only in the page heading, not on the plan card. Instatus does not show a price for its Business plan. Atlassian Statuspage, Status.io and OneUptime show a dollar sign without naming a currency. openstatus says it supports USD and EUR, and Sorry's page names US dollars.

## How pricing scales

Subscriber counts drive most of the difference between vendors. Statuspage steps from 100 subscribers on its free plan to 250 on Hobby, 1,000 on Startup, 5,000 on Business and 25,000 on Enterprise, which costs $1,499 a month. Status.io steps from 500 subscribers at $79 to 2,000 at $149 and 5,000 at $349. Instatus allows 5,000 subscribers on Pro and 25,000 on Business. OneUptime lists unlimited subscribers on its paid plans.

Per-seat and per-page charges matter as well. incident.io prices its Team plan per user, at $19 a month or $15 on annual billing. Its on-call add-on costs $10 more per user. openstatus charges $20 a month for each extra status page on any paid plan. Statuspage prices private pages by employee count, starting at $79 a month for 50 employees, and audience-specific pages from $300 a month. Sorry includes five team members and charges $5 a month for each extra member.

Annual billing is not always simple. Atlassian lists only monthly prices, and says yearly billing is set up by hand with a signed order form. Status.io offers the 5% discount without publishing yearly prices. openstatus lists yearly totals of $300, $1,000 and $5,000 for its three paid plans, and says annual billing gives two months free.

## Subscriber channels

Email is common across these vendors. The differences start after it.

Instatus lists the widest set on its help pages. Subscribers can get email, SMS through a connected provider, RSS and Atom feeds, and signed webhooks, and the page describes posting updates to Slack, Microsoft Teams, Discord and Google Chat. It also lists X. Status.io lists email, webhooks, SMS through Twilio or Vonage, RSS, a calendar feed, and ChatOps channels including Slack and Microsoft Teams. Subscribers there can choose which components to follow. Sorry lists email, Slack, Microsoft Teams and Google Chat notifications, and its pricing page does not mention SMS. Hyperping offers email, Slack and Microsoft Teams on its paid plans, plus SMS credits, with 20 on Essentials, 75 on Pro and 200 on Business. Statuspage sends email on every plan, and adds SMS and webhooks from Startup upward.

Component subscriptions deserve a separate check. A customer who uses one API should not receive notices about a dashboard they never open. Statuspage includes component subscriptions from its Business plan at $399 a month. Status.io lists them among the features all its plans include, and Sorry includes them on its single plan.

## Open source and self-hosting

Two products publish their code. OneUptime is open source under the Apache License 2.0, except for an enterprise directory that has a separate license. Its README describes self-hosting with Docker Compose or a Helm chart, and it says a Compose server needs at least 8 GB of memory. openstatus is licensed under AGPL-3.0, describes itself as open source and self-hostable, and recommends Docker Compose.

Self-hosting raises the question the Cloudflare incident exposed. A page on the same servers as the product goes down with it. Teams that self-host should put the page on separate infrastructure, ideally with a different provider and a separate DNS setup. That is our recommendation, not a vendor claim.

## Products that bundle a status page with something else

[Hyperping](/products/hyperping) and [UptimeRobot](/products/uptimerobot) sell uptime monitoring alongside their status pages. Hyperping's pricing page lists email, Slack and Microsoft Teams notifications on paid plans. UptimeRobot says its status pages can notify users by email about important updates.

[incident.io](/products/incident-io) builds its status page into its incident product. Its Basic plan is free and includes one public page. Pro adds one internal page and metrics, and Enterprise allows unlimited public, internal and customer pages. The Team plan is priced per user, at $15 a month on annual billing or $19 billed monthly.

A bundled route suits a team that already pays for the parent product. A team that only needs a page may find a dedicated tool cheaper, and easier to host away from the systems it reports on.

## Private and internal pages

Statuspage offers private pages for employees and audience-specific pages for selected customers. Sorry sells private status pages as an add-on, but its pricing page gives no price for it. incident.io's Pro plan includes an internal page, and Enterprise adds customer pages.

Single sign-on thresholds differ. Statuspage includes team member SSO through Atlassian Guard on its Startup, Business and public Enterprise plans. Sorry includes SSO with any SAML provider on its single plan. Instatus lists SAML SSO on its Business plan. A buyer who wants a customer portal with SSO should compare these thresholds closely before choosing.

## Uptime history

Uptime history has the weakest evidence on this page. Status.io's pricing page says its status pages can show 90-day historical uptime charts for components, but it does not say which plans include them. Sorry's pricing page does not mention uptime history. We did not confirm uptime history on the pricing pages of the other vendors, so treat it as a question for each vendor during a trial.

## What to test during a trial

- Post a test incident, add two updates and mark it resolved, then confirm that a subscriber on each channel received all three messages.
- Subscribe to one component only, and confirm that an incident on another component sends nothing.
- Open the page on a phone and check that any uptime history is readable without a login.
- Point the custom domain at the page and confirm that the TLS certificate renews without manual work.
- Simulate an outage of the status page itself and check that your monitoring still alerts the on-call engineer.
- Export the subscriber list and incident history, and note which formats each vendor supports.
