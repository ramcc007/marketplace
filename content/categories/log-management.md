---
title: Log management software for application and server logs
definition: Eight log management tools compared on prices checked at the source, how retention is set, how log alerts are built and what free plans allow.
primaryKeyword: log management
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pricing and documentation pages.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Log management software collects log lines from servers, containers and applications, stores them in one place, lets people search them, and sends an alert when a pattern appears. The eight products on this page each do all three jobs the category needs: log collection and search, retention policies, and alerts built on log queries. We read prices and documentation on the vendors' own websites, checked each price a second time, and link the pages we used from every product page.

Two products on this page, [New Relic](/products/new-relic) and [SigNoz](/products/signoz), are also listed under application performance monitoring, and [Better Stack](/products/better-stack) is listed under uptime monitoring. Logs are one product among several for all three, and the prices below are for the logs part only unless we say otherwise.

## What goes into a log, and what should stay out

Most of the risk in logging comes from what gets written in the first place. The OWASP [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) lists security events worth recording, such as authentication successes and failures, authorization failures, configuration changes and administrator activity. It asks that each entry record when, where, who and what, with a timestamp, host and application identifiers, the user and a severity.

The same document lists data that should usually be removed, masked, hashed or encrypted before it is written. That list includes passwords, access tokens, session identifiers, encryption keys, database connection strings, payment card numbers and personal data that is not needed. A log platform stores whatever the application sends, and a token that lands in a log line will sit there until retention deletes it.

OWASP also treats retention as a rule with two sides. Logs should not be destroyed before the legally or contractually required period ends, and they should not be kept past it. Both sides matter when choosing a plan, because longer retention costs money on every product here and keeps sensitive data around for longer.

## Four ways the products charge

Prices in this category are hard to compare, because the products meter different things. Four models cover the eight.

- Per gigabyte ingested, with retention priced separately or bundled. [Better Stack](/products/better-stack), [Coralogix](/products/coralogix), [SigNoz](/products/signoz) and [Grafana Cloud Logs](/products/grafana-cloud-logs) work this way.
- Per gigabyte ingested plus a charge per indexed event, which is how [Datadog Log Management](/products/datadog-logs) bills.
- Compute and storage metering, which is how [Axiom](/products/axiom) bills.
- Data volume plus a charge for each user, which is how [New Relic](/products/new-relic) bills.

[Logz.io](/products/logz-io) lists its price per ingested gigabyte per day, and its page gives no monthly figure. A daily rate is hard to turn into a monthly bill without knowing whether the volume is a daily peak or an average, so ask Logz.io before relying on a calculation.

## Entry prices at a glance

All figures below are US dollars from the vendor's pricing page. Better Stack publishes separate prices for Europe, the United States and Singapore, and we quote the US ones.

| Product | Free allowance | Paid entry point |
|---|---|---|
| Better Stack | 3 GB a month, 3-day retention | Pay as you go from $0.15 per GB ingested plus $0.08 per GB retained, or the Nano bundle of 40 GB for $45 a month ($38 on annual billing) |
| Axiom | 500 GB of loading, 25 GB storage, 30-day retention | $25 a month platform fee plus usage |
| SigNoz | Self-hosted Community Edition | Cloud Teams at $49 a month including $49 of usage |
| Datadog | None listed | $0.10 per GB ingested plus indexed logs from $1.06 per million events |
| Grafana Cloud | 50 GB a month, 14-day retention | Pro at $19 a month plus usage |
| New Relic | 100 GB a month, one full user | $0.40 per GB beyond the free 100 GB, plus user fees |
| Coralogix | 14-day trial | $0.42 per GB of logs |
| Logz.io | 14-day trial | $0.92 per ingested GB per day, 7-day retention |

Here is the same data as arithmetic for one team that sends 100 GB of logs a month. These are our calculations from list prices, not vendor quotes, and they leave out users, retention add-ons and taxes.

- SigNoz Teams: 100 GB at $0.30 per GB is $30 of usage, which fits inside the $49 plan.
- Coralogix: 100 GB at $0.42 per GB is $42.
- Grafana Cloud Pro: the first 50 GB is included, and the other 50 GB at the starting rates of $0.05, $0.40 and $0.10 per GB comes to $27.50, plus the $19 platform fee. That totals $46.50.
- New Relic: 100 GB fits inside the free tier.
- Axiom Cloud: 100 GB sits far below the 1 TB included, so the bill is the $25 platform fee.

Per-GB prices say little about what a team will really pay. Datadog's indexing charge depends on how many events you keep, and Axiom's depends on how much querying you do. Run a month of real traffic through a trial before trusting any of these figures.

## Retention is where the costs and the rules meet

Every product here sets retention differently, and the defaults vary from 3 days to forever.

Better Stack keeps data for 3 days on its free tier and 30 days in every bundle, and lets a team set retention per source. Grafana Cloud keeps 14 days on Free and 30 days on Pro. SigNoz Cloud keeps logs for 15 days by default, and its documentation lists 15, 30, 90 or 180 days or 1 year as choices, changed through a support request. Logz.io includes 7 days and charges for each extra day by tier: $0.03 for hot storage, $0.015 for warm and $0.001 for cold.

New Relic keeps log data for 30 days under its original data option and 120 days under Data Plus, according to its retention documentation. Axiom sets retention per dataset and allows it to be longer than the organization default, or forever, on Axiom Cloud. Datadog sets it per index, and its price list shows 3, 7, 15 and 30 days for indexed logs, with the separate Flex Logs tier for 6, 12 or 15 months. Coralogix writes every log to the customer's own Amazon S3 bucket and lists retention as infinite there, with a configurable period only for its indexed Frequent Search tier.

Two details deserve a second look. Changing retention in SigNoz applies only to newly ingested logs, so extending it later does not bring back data that has already expired. In Axiom, shortening a dataset's retention permanently deletes older data. The regulation or contract that sets your retention period should be read before anyone lowers a setting.

Grafana Loki, the open-source engine behind Grafana Cloud Logs, behaves differently when self-hosted. Its [retention documentation](https://grafana.com/docs/loki/latest/operations/storage/retention/) says retention is off by default and logs are kept indefinitely until the compactor is set up.

## How search is built, and why it matters for cost

A log platform either indexes everything it receives or indexes very little and scans at query time. The choice shapes both speed and price.

Grafana Loki indexes only labels, not the content of each line. Its [labels documentation](https://grafana.com/docs/loki/latest/get-started/labels/) warns that labels with many distinct values, such as IP addresses or timestamps, make the index large and slow, and recommends about 10 to 15 labels with long-lived values. A team that wants to search by arbitrary field should plan for that.

Coralogix describes remote, index-free querying against data in the customer's bucket. Datadog indexes the logs you choose and charges for each indexed event, so an exclusion filter that samples or drops noisy logs before indexing changes the bill directly. Its documentation notes that excluded logs still appear in Live Tail and can feed log-based metrics and archives.

Axiom meters query compute in gigabyte-hours, so the cost of a search depends on how much data it scans. SigNoz offers a query builder with aggregations and grouping, and a Logs API for programmatic searches. Better Stack lets users query by live tail filtering, a drag-and-drop builder, SQL or PromQL.

## Log-based alerts

Every product on this page can raise an alert from a log query, with differences in how the alert is defined.

- Datadog log monitors take the same query syntax as the Log Explorer. They evaluate only indexed, Standard Tier logs, and the longest rolling window is 2 days.
- SigNoz builds alerts from a filtered log query with an aggregation such as count, average or p95, grouped by an attribute. Its documentation includes an example that fires when Redis timeout errors exceed 7% of logs on average over five minutes.
- Grafana Loki alerting rules use the Prometheus rule format with LogQL as the expression language.
- New Relic can create an alert condition from a log search, using the Create alert option, which produces an NRQL query behind the scenes.
- Axiom monitors come in threshold, match and anomaly types, and can notify email, Slack, Microsoft Teams, PagerDuty, Opsgenie, Discord or a webhook.
- Coralogix documents eight log alert types, including immediate alerts on every matching event, ratio between two queries and first sighting of a new value.
- Better Stack alerts run on dashboard charts that are built from log queries, and each firing alert opens an incident.
- Logz.io describes alerts that combine several queries and trigger conditions, with a setting for how often they fire.

An alert that fires on every match can wake someone for a harmless line, and an alert on a count can miss a rare, serious event. Test both with real logs before relying on either.

## Free plans and what they cap

Free plans in this category are generous in volume and short in history. New Relic gives 100 GB a month and one full platform user. Axiom's Personal plan caps usage at the included amounts and has no overage option. New Relic's free tier stops ingesting once it passes 100 GB, until the next month or an upgrade. Grafana Cloud's free plan keeps 14 days of logs, and Better Stack's keeps 3 days.

A short retention window is fine for debugging a deploy and does not work for incident reviews that happen weeks later. Paid plans fix the history. The add-ons that come with them are worth reading. Axiom charges $100 a month for SAML sign-on, and New Relic charges $0.05 per GB a month more for storing data in its EU data center.

## Where the data sits and who certifies it

Data location varies. Better Stack stores data in EU regions by default and offers custom locations to enterprise accounts, and its US prices are higher than its EU prices. New Relic has a separate EU data center. SigNoz offers a dedicated cloud, a bring-your-own-cloud setup and self-hosting under its Enterprise plan. Coralogix writes to a bucket the customer controls.

Security statements we could confirm on vendor pages are limited. Axiom states SOC 2 Type II and ISO 27001 and offers a business associate agreement for HIPAA workloads. Grafana Labs lists ISO 27001, SOC 2 Type 2 and a data processing agreement. Better Stack states SOC 2 Type 2 and GDPR compliance and says it is not HIPAA compliant. SigNoz and New Relic point to trust centers that reference SOC 2 and ISO 27001. We did not find certification statements we could read for Datadog, Coralogix or Logz.io, and we have left their security fields blank rather than guess.

## Leaving a product later

Moving off a log platform means deciding what to do with old data. Few teams re-import history, and most keep the old tool until the retention period runs out. Coralogix is the exception among these eight, because the data already lives in a bucket the customer owns. Datadog offers archives, and its documentation says excluded logs can still feed them. A team that wants to switch easily should collect logs with the OpenTelemetry Collector or another vendor-neutral shipper, so that changing the destination is a configuration change.

## What to test during a trial

- Send a day of real production logs and compare the vendor's usage meter with your own count of bytes shipped.
- Write one query that spans your retention window and time how long it takes.
- Build an alert on a rare error, trigger it on purpose, and measure the delay between the log line and the notification.
- Send a fake secret in a log line and confirm you can find it and delete or mask it.
- Lower retention on a test source and confirm what the platform says it will delete.
