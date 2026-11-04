---
title: Incident management and on-call software compared
definition: Eight incident management tools compared on prices checked at the source, on-call, alert routing and postmortems.
primaryKeyword: incident management software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages. Prices read twice from the vendor's own site.
---

Incident management software decides who gets paged when something breaks, escalates when that person does not answer, and keeps a record of what happened so the team can write the postmortem. The eight products on this page each provide on-call schedules with escalation, alert routing, and an incident timeline with postmortem support. We read every price on the vendor's own website on November 4, 2026, twice in separate fetches, and each product page links to the pages we used. Prices are in US dollars and some vendors vary them by region or contract.

## Where this category sits next to uptime monitoring

An uptime monitor notices that a site or API stopped answering. An incident tool takes over from that point and gets a human to look at the problem. The two jobs meet at the alert. Many vendors in our [uptime monitoring](/categories/uptime-monitoring) category also sell paging, and [Better Stack](/products/better-stack) appears in both.

The split matters when you buy. A monitoring tool with a paging add-on can be enough for a team of three that wants a phone call at night. A team with several services, several rotations and a formal review process needs scheduling, routing rules and postmortems that a monitor does not provide.

## What the on-call chapter of the SRE book asks for

Google's [chapter on being on-call](https://sre.google/sre-book/being-on-call/) gives numbers that are worth testing any tool against. It says SRE teams should spend at least 50% of their time on engineering, and no more than 25% of total time on call. It sets a ceiling of 2 incidents per 12-hour shift, because it estimates that one incident takes about 6 hours once root-cause analysis, remediation and follow-up are counted.

Those figures turn into buying questions. A schedule tool should show how often each person was paged, so a team can see whether one engineer carries the rotation. Escalation should reach a second person when the first does not respond, and it should be easy to hand a shift to someone else.

## Postmortems as a feature

The same book's [chapter on postmortem culture](https://sre.google/sre-book/postmortem-culture/) says a blameless postmortem focuses on contributing causes without blaming an individual or a team. It says triggers should be defined before an incident happens. They include user-visible downtime beyond a threshold, data loss, on-call intervention such as a rollback, a long resolution time, and a monitoring failure that left the team finding the problem by hand.

Software cannot make a review blameless, but it can supply the raw material. Every product here keeps a record of alerts, acknowledgments and status changes. PagerDuty includes an incident timeline on its free plan but no postmortems, and its Professional plan adds one custom template. incident.io offers multiple postmortem documents from Pro upward. FireHydrant lists one retrospective template on Pro and unlimited templates on Enterprise. Better Stack drafts a postmortem from channel history and the incident timeline, according to its product page. Grafana describes a post-incident review stage but does not describe a template. Zenduty lists postmortem templates on every plan.

## Entry prices and what they leave out

Prices are quoted per user, per responder or per active user, and the unit changes the total more than the headline number. Here is the arithmetic for a team of 10 people who all need paging, using each vendor's published rates and ignoring discounts. The totals are ours, and the vendor does not publish them.

PagerDuty Professional costs $21 per user a month on annual billing, or $210 for ten. On monthly billing it costs $25. incident.io Team costs $15 per user a month on annual billing plus $10 for on-call, which comes to $250 for ten. On monthly billing the same setup costs $29 per user. incident.io Pro costs $25 plus a $20 on-call add-on, or $450 for ten, though the page does not say whether Pro is billed monthly or annually. Rootly's Incident Response and On-Call products cost $20 each per user, so a team that wants both pays $400 for ten.

FireHydrant Pro costs $25 per responder a month billed annually, or $250 for ten, and it lists no monthly option. [Better Stack](/products/better-stack) costs $29 per responder a month on annual billing, or $290 for ten, as of our November 3 check. All Quiet costs $4.99 per user a month on Standard and $9.99 on Pro, both billed monthly, so ten users cost $49.90 or $99.90. Zenduty lists $6 for Starter and $16 for Growth, though its page does not say whether yearly billing is assumed. Grafana IRM charges $20 per active IRM user plus a $19 monthly platform fee that includes 3 active users.

## Which vendors publish enough to compare

Some vendors publish a price list that a buyer can total, and others publish a floor. PagerDuty publishes its plans but shows no price for its AIOps, Status Pages, Runbook Automation or Live Call Routing add-ons. FireHydrant says SMS and voice notifications are available for purchase and that its Signals alerting is charged by the number of alerts sent, with no per-alert price. Rootly publishes prices for two products and asks for contact on its AI SRE product and Enterprise tier. Zenduty and incident.io leave a billing period unstated on at least one plan.

All Quiet is the opposite case. Its FAQ says there are no per-channel or per-message charges and that every alert channel is included on every plan. Its pricing page also marks status pages as included only from Pro, and it lists status page SMS subscribers as custom.

## Free plans and trials

Four of the eight products have a free plan that includes some incident features. PagerDuty's covers 5 users, 1 schedule, 1 escalation policy and 100 SMS or phone notifications a month. incident.io's Basic plan covers single-team on-call and one public status page. FireHydrant's free plan covers up to 10 responders with a chat bot and one status page. Grafana IRM is free for up to 3 active users a month.

Trials fill the gap for the rest. FireHydrant, All Quiet and Zenduty state 14 days, and Rootly says trials typically last two weeks and can be extended. Rootly also runs a startup program with up to 50% off for companies under 100 employees. Companies under 25 employees can pay what they can, starting at $1 according to its FAQ.

## Security statements

PagerDuty states that it completed SOC 2 Type II examinations and holds ISO 27001 certification. incident.io states SOC 2 Type I and II and GDPR compliance. Rootly shows SOC 2 Type 2, HIPAA, GDPR and CCPA badges. FireHydrant states SOC 2 Type II compliance and gives September 2021 as the date it first reached it.

All Quiet is the one product here with an ISO 27001 certificate and no SOC 2 report. It names Tempo Audits, a UKAS-accredited certification body, and says it is not HIPAA compliant. It also lets customers choose between Frankfurt and US-East 1 hosting. We did not find a security statement we could read for Grafana IRM or Zenduty, and their profiles leave the fields blank.

## A tool that is leaving the market

Opsgenie, once a common alternative to PagerDuty, is no longer sold. Atlassian's [pricing page](https://www.atlassian.com/software/opsgenie/pricing) states that new sales ended on June 4, 2025, and that end of support comes on April 5, 2027. After that date access is shut off, and any data not migrated is deleted. Atlassian points customers to Jira Service Management or Compass.

We left Opsgenie out for that reason, even though its page still lists plans at $9.45 to $31.90 per user a month on annual billing. A buyer cannot sign up. A current customer with a renewal in the next year should check the migration date against the contract term and test the export path before the cutoff.

## Products we left out

Some products did not meet the bar on what we could read. Spike.sh publishes prices of $7 and $14 per user a month and describes schedules, escalations and alert routing, but we could not find a page of its own that describes postmortems. PagerTree describes schedules, escalation layers and routers, and its pages did not mention postmortems or an incident timeline. Splunk On-Call's product page returned an error on its pricing URL, and we did not find a price we could verify.

Each of the three could qualify once a postmortem feature is documented on a vendor page. We will recheck them when the category is next updated.

## Where each product is strongest

PagerDuty has the longest history and the most published structure: a free tier, a per-user plan, and four platform tiers that start at $2,800 a year. Its cost rises quickly once a team needs the add-ons whose prices are not shown. incident.io and Rootly both split on-call from incident response, so the cost of paging a rotation is a separate line item. FireHydrant combines on-call and retrospectives in one Pro price but sells SMS and voice separately.

Smaller teams will look at All Quiet, Zenduty and Better Stack. All Quiet is the lowest priced of the eight with unlimited SMS and phone alerts. Better Stack bundles unlimited SMS and phone alerts with its responder license and ties paging to its monitoring. Grafana IRM suits teams that already run Grafana Alerting, since that is the alert source its documentation names.

## What to test during a trial

- Trigger a test alert at 3 a.m. local time on a phone with do-not-disturb on, and time how long escalation takes to reach a second person.
- Route one alert by service and one by team, and confirm each page goes to the right schedule.
- Run a practice incident, then check that the timeline holds every acknowledgment and status change with correct times.
- Write a postmortem from the incident and confirm which template and export options your plan includes.
- Ask the vendor for the price of SMS, voice and status pages in writing, since several pricing pages leave those blank.


