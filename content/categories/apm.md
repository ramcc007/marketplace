---
title: Application performance monitoring tools compared
definition: Ten APM tools compared on prices read from vendor pages, how each charges, tracing depth, alerting and the cost of sampling.
primaryKeyword: application performance monitoring
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Ten products checked against vendor pages, with prices confirmed by a second fetch.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Application performance monitoring tools record how long requests take inside your own software and where the time goes. A slow checkout page, a database call that runs 200 times per request or a service that fails only under load all show up as traces and metrics before a customer writes in. The ten products on this page each trace requests across services, report performance metrics and send alerts. We read every price on the vendor's own website, and each product page links to the pages we used.

## What a product needs to be listed

We list a product here when its own documentation or product pages show three things: request tracing, performance metrics and alerting. Request tracing means following one request through the services it touches. Performance metrics means latency, error rate and throughput per service or endpoint. Alerting means a rule that notifies a person or a chat channel when those numbers cross a limit.

The draft criteria for this category also list "observability platform" as an alias, so several products below sell logs, infrastructure monitoring and more beyond APM. Where a vendor's page left one of the three capabilities unclear, we say so on its product page instead of guessing. Grafana's alerting documentation, for example, describes alerts on metrics and logs and does not mention traces.

## The numbers to watch

Google's chapter on [monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/) names four golden signals: latency, traffic, errors and saturation. Latency is the time it takes to serve a request, traffic is the demand on the system, and errors are the rate of requests that fail. Most APM dashboards open with the first three for each service.

The same chapter warns against designing around the mean. It notes that 1% of requests can easily take 5 seconds while the average looks healthy, and that the 99th percentile of one backend can become the median response of the frontend that calls it. A tool that shows only averages hides the requests your slowest customers see. SigNoz lists p99, p90 and p50 latency for each service, and that view is the one to ask for in any demo.

The chapter also says every page to an on-call engineer should be actionable, and that effort is better spent on symptoms than causes. For APM, that means alerts on latency percentiles and error rates for user-facing endpoints, rather than alerts on every internal queue.

## How the ten products charge

APM pricing falls into four patterns. Each one punishes a different kind of system, so the pattern matters more than the headline number.

Per host: [Datadog APM](/products/datadog-apm) costs $36 a host a month standalone on annual billing, $41 for APM Pro and $47 for APM Enterprise. Each APM host includes 150 GB of ingested spans and 1 million indexed spans a month, and extra ingestion costs $0.10 per GB. [Splunk Observability Cloud](/products/splunk-observability-cloud) lists APM inside its App & Infra edition at $60 a host a month and End-to-End at $75, both billed annually. A company with 10 application hosts pays about $4,320 a year for Datadog's base APM tier and $7,200 for Splunk's App & Infra edition. Per-host pricing suits steady fleets. It gets expensive when many small containers are counted as hosts.

By memory per hour: [Dynatrace](/products/dynatrace) charges $0.01 per memory GiB-hour, which is $58 a month for an 8 GiB host and includes APM and code-level profiling. A host with 32 GiB of memory costs four times as much as that example. Dynatrace also lists a 15-day free trial and a minimum annual spend commitment that usage draws down.

By data volume: [Middleware](/products/middleware) charges $0.30 per GB for metrics, logs and traces together. [SigNoz](/products/signoz) charges $0.30 per GB of traces and $0.10 per million metric samples on its cloud plans. [Grafana Cloud](/products/grafana-cloud) charges for traces in three parts on its Pro plan: $0.05 per GB for processing, $0.40 per GB for writing and $0.10 per GB for retaining. Honeycomb prices by event count instead, with Pro starting at $150 a month for 50 million events. Volume pricing rewards teams that sample and punishes chatty services.

By seat plus data: [New Relic](/products/new-relic) gives 100 GB of ingest and one full platform user free, then charges $0.40 per GB of data. Full users on the Standard edition cost $10 for the first and $99 for each additional user, up to 5. Pro costs $349 per full user a month with an annual commitment. A team of three engineers on Standard who send 500 GB a month would pay $160 for the 400 GB over the free amount and $208 for users, or $368 a month before any add-ons. Three Pro users on an annual commitment cost $1,047 a month before data.

[Sentry](/products/sentry) and [AppSignal](/products/appsignal) are listed here too, though their primary listing is error tracking. Both charge by plan tier and by request or error quota. Their product pages carry the prices we checked, and the quota unit is different from every other product above.

## Tracing in practice

A trace is a record of one request moving through services. For services to appear in the same trace, each hop passes a header to the next. The W3C Trace Context specification, a W3C Recommendation published on November 23, 2021, defines the `traceparent` header for this, with a trace ID, a parent ID and a flag that marks whether the trace was sampled. Products built on OpenTelemetry can read it, and Splunk describes its APM as OpenTelemetry-native.

That matters when you leave a product. Instrumentation written with OpenTelemetry libraries can send data to another back end by changing the exporter. Instrumentation written with a vendor's own agent usually needs to be redone. SigNoz, Honeycomb, Grafana Cloud, Splunk and Middleware all describe OpenTelemetry support on their pages. Ask any vendor you shortlist what happens to your traces if you send them to two back ends at once.

The detail level differs. Datadog's pricing page lists distributed tracing, automatic service discovery and dependency mapping in the base tier, and says request, error and duration metrics are based on 100% of traffic with 15 months of retention. Splunk's page says 100% of traces are stored for search. Dynatrace lists 10 days of trace retention with Full-Stack Monitoring. Retention is the question to settle before a purchase, because an incident review two weeks later needs the trace from that day.

## Sampling decides your bill and your blind spots

At high volume most teams keep only some of their traces. The OpenTelemetry documentation describes two approaches. Head sampling decides when a trace starts, using the trace ID and a target percentage, so it is simple and cheap but cannot promise to keep traces that contain errors. Tail sampling decides after most of a trace has arrived, so it can keep every trace with an error or high latency, but it needs stateful components that handle large amounts of data and are often tied to one vendor.

The same documentation calls sampling one of the most effective ways to reduce observability costs without losing visibility. It also lists three costs of sampling: the compute to run it, the engineering time to maintain the rules, and the chance that poor rules drop the trace you needed. It adds that allocating more resources to observability can sometimes be cheaper than sampling.

Products differ on how much sampling you must do yourself. Datadog's included allotment is 150 GB of ingested spans per APM host, which leaves room before the $0.10 per GB overage starts. Splunk states that 100% of traces are stored. Honeycomb's page mentions a Refinery service for controlling data volume, though its pricing page does not explain how it works. Check how sampling interacts with your alert rules, since an alert built on sampled data can under-count errors.

## Alerting differences

Alerting is where the three capabilities meet, and the sourced documentation shows real differences. Honeycomb's triggers notify a team when query results cross a threshold, through Slack, PagerDuty or email, and the Free plan limits you to 2 triggers while Pro allows 100. SigNoz documents alerts on span conditions such as high p99 latency or elevated error counts, plus alerts on metric queries.

Dynatrace takes a baseline approach. Its documentation says the platform learns baselines that include the response times of applications and services and notifies users of detected problems in real time. That removes hand-set thresholds, and it also means you depend on the vendor's model to decide what counts as abnormal. Splunk's page says users can receive alerts on slow response times or problematic queries for common databases.

Grafana Alerting watches incoming metrics data or log entries, and its page does not mention traces. A team that wants an alert on trace latency would build metrics from its traces first. Sentry's alerts page describes notifications for issues, and examples such as traffic spikes or error counts over a threshold, and it points to a separate page for the details of triggers.

## Free plans and trials

Seven products offer a permanent free plan or free licence on their pricing pages. New Relic gives 100 GB of ingest a month, and its page says ingest stops at 100 GB until the next month or an upgrade. Grafana Cloud's free tier includes 50 GB of traces, 50 GB of logs and 10,000 active metric series, with 14-day retention. Middleware includes 100 GB of data with 14-day retention. Honeycomb's Free plan covers 20 million events and 100 million metric data points a month. SigNoz Community Edition is open source, so the licence is free and your team pays for servers and upkeep. AppSignal and Sentry also have free plans, listed on their product pages.

Datadog and Splunk list no permanent free APM plan on the pages we read. Datadog shows a free trial button for each tier without a length, and Dynatrace states a 15-day trial. Middleware states a 14-day trial with unlimited ingestion.

## Questions to settle before you buy

Start with who will use the tool. Seat-based pricing such as New Relic's makes sense when five engineers do all the investigation. Honeycomb lists unlimited seats, which suits a broad team that wants many people reading traces. Per-host and volume pricing do not change with the number of people.

Then count what scales. Hosts grow with fleet size, memory-based units grow with instance size, and data volume grows with traffic and instrumentation depth. Adding one new log line to every request can double an ingest bill on a per-GB plan and cost nothing on a per-host plan.

We did not find enough on the vendor pages we read to compare SOC 2, ISO 27001 or HIPAA status for most of these products, so the security fields on those product pages are empty. Ask each vendor for its current report and the regions where it stores your data. New Relic charges an extra $0.05 per GB a month to store data in its EU data center, which is a cost to include if your data must stay in the EU.

## What to test during a trial

- Instrument one real service, then compare the p99 latency the tool shows with the p99 your load balancer logs report.
- Generate a deliberate error in a downstream service and check that the trace shows which service failed.
- Create an alert on error rate for one endpoint, trigger it, and time how long the notification takes to arrive.
- Turn on the sampling you plan to use in production and confirm the slow and failed requests are still kept.
- Estimate a month of data volume from one day of traffic, then price it on the vendor's page with the plan you intend to buy.
