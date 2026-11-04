---
title: Error tracking software for web and mobile apps
definition: Nine error trackers compared on prices checked at the source, event quotas, grouping, release tracking, data location and PII scrubbing.
primaryKeyword: error tracking software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Nine products checked against vendor pages.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

An error tracker collects exceptions and crashes from a running application, adds the stack trace and context, groups repeats into one issue and tells someone when a new problem appears. The nine products on this page each capture exceptions with stack traces, group them and send alerts, and tie errors to releases. We read every price on the vendor's own website, and each product page links to the pages we used.

Two well-known products are missing. Rollbar and Bugsnag both show a free plan on their pricing pages, but the paid plans displayed no dollar amounts when we fetched them, since their prices sit behind an event calculator. Airbrake publishes two sets of plan prices that its page does not label as monthly or annual, and its FAQ lists tiers that do not match its cards. We left all three out until a price can be read plainly.

## What gets counted and billed

Pricing in this category starts with the unit. Most vendors bill by error or event count. Sentry defines an event as one instance of data sent to it, usually an error or a transaction or span, and attachments are counted apart. Exceptionless and GlitchTip also count events, Raygun and Honeybadger count errors, and Bugsink counts events with a separate figure for events retained.

Three products use a different unit. AppSignal prices by requests, with 30,000 on its free plan and 250,000 on the paid plan, and it bundles error tracking with performance monitoring. TrackJS prices by page views and apps, so a site that throws many errors on few page views pays less than one with the reverse pattern. Datadog bills standalone errors in a tiered scale, and it lists errors collected with APM traces and real user monitoring events as included at no additional cost.

The unit changes what a bad day costs. On Sentry, events beyond the quota are not accepted, so a traffic spike can leave a gap in your data unless pay-as-you-go quota is set. Honeybadger keeps processing errors up to 125% of the monthly quota and then stops until the month ends, and overage billing there is optional. Raygun bills errors above the reserved volume at $0.001 each, which is $1.00 per 1,000. TrackJS and AppSignal say they do not charge for overage, and TrackJS limits how many errors a minute it accepts: 20 on Starter, 60 on Professional and 90 on Business.

## Entry prices

The cheapest paid plans sit close together. GlitchTip Small costs $15 a month for up to 100,000 events and Exceptionless Small costs $15 for 15,000. Bugsink's 75,000-event plan costs 16 euros, and the vendor lists prices only in euros. AppSignal's paid plan is $279 a year, which its page shows as $23.25 a month, and Datadog charges $25 a month on annual billing for the first 50,000 standalone errors.

Sentry and Honeybadger both charge $26 a month for 50,000 errors with unlimited users, while GlitchTip allows twice the events for $15. The gap comes from what each includes. Sentry's Team plan keeps a lookback of up to 90 days and adds logs and application metrics, while Honeybadger adds uptime monitors and a status page. Raygun's Basic plan costs $40 a month for 100,000 errors on annual billing and $60 on monthly billing, with 180 days of retention.

At higher volumes the models split further. Datadog's price per 1,000 errors falls from $0.25 between 50,000 and 100,000 errors to $0.10 above 20 million, on annual billing. Exceptionless lists $199 a month for 1 million events and $499 for 3 million. GlitchTip lists $250 for 3 million events, and Raygun's Business plan costs $400 for 1 million errors. Compare these only after checking what each unit counts, because an event on one product is not an error on another.

## Free plans and how small they are

Free plans exist mainly to prove an integration works. Sentry Developer allows 1 user and 5,000 errors, Honeybadger Developer 1 user and 5,000 errors, and GlitchTip 1,000 events a month. Exceptionless allows 3,000 events with 3-day retention and only daily summaries for error notifications. Bugsink's evaluation plan covers 15,000 events but keeps only 5,000 of them.

Retention on free plans is short, which matters when a bug is reported a week after it happened. Honeybadger keeps error data 15 days on Developer, 90 on Team and 180 on Business. Sentry offers a 30-day lookback on Developer. AppSignal keeps 5 days on its free plan, and Exceptionless keeps events 3 days.

Raygun and TrackJS have no free plan. Raygun offers a 14-day trial on each plan, and TrackJS offers a free trial of unstated length. Datadog lists no free allowance for standalone errors.

## Grouping decides how many alerts you get

Grouping turns 10,000 identical exceptions into one issue. The vendors differ in what they compare. Honeybadger groups by file name, method name, line number, class name and component. Raygun groups by stack trace by default, offers message-based grouping that it suggests for client-side JavaScript, and accepts a custom key. AppSignal groups an exception with others of the same error type on the same action and namespace.

Datadog computes a fingerprint from attributes such as error type, message or stack trace. Bugsink normalizes variable parts of a message, such as IP addresses, ports and numbers, before it groups, so two connection errors to different addresses can land in one issue. TrackJS gives the most manual control, with a group builder in its dashboard and an onError callback in the agent that edits a report before it is sent.

Alerts follow from grouping. Bugsink alerts on new issues, regressions and issues returning from a mute, and does not send a new alert for every event added to an open issue. Honeybadger notifies on new errors and on resolved errors that recur, and an unresolved error stays quiet. Exceptionless flags a stack as regressed when a newer matching event arrives after it was marked fixed.

## Release tracking and regressions

Release tracking answers which deploy broke something. Sentry marks an issue as a regression when newer events arrive after it was resolved in a commit or release. Exceptionless compares an event's reported version with the version where a fix shipped. Bugsink infers releases from the identifier on incoming events and lets a fix be tied to a release.

Honeybadger resolves every error in a project when a deployment is reported, so anything that returns raises a new alert. That default can be switched off. AppSignal counts everything since the app was created as one deploy until deploy markers are added, and the new errors filter depends on them. Datadog resolves an issue after 14 days without new errors, or sooner when a newer version no longer reports it and version tags are set. Raygun's deployment tracking flags releases that add new errors and can confirm whether a fix worked.

## Sampling and filtering at the source

Sending less is the cheapest way to cut a bill. Sentry's JavaScript SDK has a sample rate between 0 and 1 for error events with a default of 1, and the docs describe the purpose as sending a representative subset to keep volume manageable. Sentry also offers inbound filters that drop chosen errors at ingest, and filtered events do not consume quota. Honeybadger has an events sample rate option and lets an ignored error stop being recorded, so it does not count against the quota.

Sampling has a cost. A sampled error stream can miss a rare failure that affects only a few users, and counts of affected users become estimates. Many teams filter known noise, such as browser extension errors, and keep the rate at 100% for the rest.

## Where the data lives and what gets scrubbed

Error reports often carry request data, user identifiers and environment variables, so the storage location and the scrubbing rules matter. Sentry creates each organization in either the US (Iowa) or the EU (Frankfurt) and says the choice cannot be changed afterwards. Honeybadger lets customers pick US or EU storage. GlitchTip runs separate US and EU instances, on DigitalOcean in New York and Frankfurt, with no replication between them. Bugsink stores managed data in the EU, and AppSignal describes itself as EU-based.

On scrubbing, Sentry's server-side scrubbing is on by default and removes card-like numbers and values whose keys contain words such as password, secret, token or api_key. Its docs add that geographic data is still extracted from IP addresses even when IP storage is off. Honeybadger filters request keys, with password and password_confirmation by default, and a before_notify callback can drop a whole notice. These are defaults for common cases. A team handling health or financial data should still test with realistic payloads and check what arrives in the dashboard.

## Security claims

Sentry states SOC 2 Type II compliance on its security page. Honeybadger states SOC 2 Type II certification and supports HIPAA through a Business Associate Agreement. AppSignal states ISO 27001 certification, and Raygun says it is configured for HIPAA compliance. GlitchTip says its controls follow SOC 2 and ISO 27001 but that it has not been audited or certified against either. We found no certification statement for TrackJS, Exceptionless, Bugsink or Datadog Error Tracking on the pages we read, which does not mean none exists.

Single sign-on costs more on several products. Sentry includes SAML2 and SCIM from the Business plan at $80 a month, with Google and GitHub sign-in on Team. Raygun includes SAML single sign-on on Business and sells it as an add-on on Basic. AppSignal sells enterprise SAML through its Customer Success team with no listed price.

## Self-hosting as an alternative

Three products can run on your own servers. Exceptionless states it can be hosted free, GlitchTip documents a self-hosted install built on PostgreSQL, and Bugsink is free to self-host with all features and unlimited users. Bugsink sells support for self-hosters at 15 euros per user a month. Self-hosting moves the data into your own infrastructure, and it also moves upgrades, storage and uptime onto your team.

## What to test during a trial

- Throw the same exception 10,000 times in a loop and confirm that it forms one issue and sends one alert.
- Send a request containing a fake card number and a password field, then check what the dashboard shows.
- Ship two releases, resolve an issue in the first, and see whether it returns as a regression in the second.
- Exceed the event quota on purpose in a test project and note whether data is dropped, billed or throttled.
- Check the project's data storage region against your contracts before the first production event is sent.
