---
title: Uptime monitoring tools for websites and APIs
definition: Eleven uptime monitors compared on prices checked at the source, check locations, how failures are confirmed, alert costs and status pages.
primaryKeyword: uptime monitoring
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-03
    note: First draft. Eleven products checked against vendor pages.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

An uptime monitor requests a website, an API or a server from the outside at a set interval and tells someone when it stops answering. The eleven products on this page each run HTTP and ICMP ping checks from several locations, send alerts, and keep uptime reports. We checked every price on the vendor's own website, and each product page links to the pages we used.

## Why the check runs from outside

Google's chapter on [monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/) advises spending more effort on catching symptoms that users see than on their causes, and says every page to an on-call engineer should be actionable. An outside check is the plainest symptom test there is, because it fails when a customer's request would fail.

Large outages show what a check inside the same infrastructure can miss. AWS's [own summary](https://aws.amazon.com/message/101925/) of the October 2025 disruption in its Northern Virginia region describes an event from 11:48 PM PDT on October 19 to 2:20 PM PDT on October 20, caused by a race condition in DynamoDB's DNS management. Cloudflare's [postmortem](https://blog.cloudflare.com/18-november-2025-outage/) of November 18, 2025 describes an outage from 11:20 UTC that took until 17:06 to clear fully. Cloudflare's status page went down at the same time, by coincidence, and the overlap led responders to suspect an attack at first.

The monitor itself runs somewhere too. [Checkly](/products/checkly) stores data in AWS in Ireland, [Uptime.com](/products/uptime-com) runs on AWS in the United States, [Better Stack](/products/better-stack) keeps data in EU regions by default, and [Hyperping](/products/hyperping) holds data in Frankfurt. [updown.io](/products/updown-io) spreads hosting across OVH, Hetzner and DigitalOcean.

## Locations and how a failure gets confirmed

A single failed request is often a network problem between one probe and the site. Most of these products ask a second location to repeat the check before they alert. Better Stack checks each monitor from at least 4 locations by default and opens an incident only when 3 fail. [Pingdom](/products/pingdom) marks a failure as unconfirmed and asks a probe elsewhere to repeat it. [HetrixTools](/products/hetrixtools) lets the user set how many of up to 12 locations must agree, and suggests more than half. [Uptrends](/products/uptrends), updown.io, Hyperping and [Site24x7](/products/site24x7) also confirm from a second location.

[UptimeRobot](/products/uptimerobot) and [StatusCake](/products/statuscake) confirm from another server in the same region. A monitor tied to one region can still raise a false alarm when that region has a network problem, so both work best with monitors set to run from several regions. UptimeRobot reported false alerts from its EU region on [August 1, 2025](https://uptimerobot.com/blog/false-positives-in-eu-monitoring-region/). Better Stack sent incorrect alerts for single-region monitors on [October 21, 2026](https://status.betterstack.com/incident/1097882) and advised customers to use more than one region.

Location counts vary more than prices. Uptrends lists 229 checkpoints, Pingdom more than 100 probe servers and StatusCake 43 locations. Checkly's pricing page lists 22 locations on Team, and Hobby and Starter checks can use 3 of 6. Hyperping has 18 regions, HetrixTools 12 locations and updown.io 10. UptimeRobot offers four regions on paid plans. Site24x7's cheapest plan checks from one location, and multi-location checks start on Web Perf at $36 a month.

## What a check interval means for downtime

A 99.9% uptime target allows about 43 minutes of downtime in a 30-day month, and 99.99% allows about 4 minutes. A monitor that checks every 5 minutes cannot tell those two targets apart, since a short outage can start and end between checks. The interval also sets how long a real outage runs before anyone hears about it, plus the time the confirmation check takes.

Free plans mostly check slowly. UptimeRobot checks 50 free monitors every 5 minutes, Hyperping 20 every 5 minutes, Better Stack 10 every 3 minutes and Checkly 10 every 2 minutes. HetrixTools is the exception, with 15 free monitors checked every minute from 4 locations. Site24x7's free plan covers 50 websites every 5 minutes from one location. StatusCake's pricing page showed its free plan at 3 monitors every 15 minutes, for personal use only.

On paid plans, a 1-minute interval is standard and faster checks cost more. UptimeRobot moves from 60 seconds on Solo to 30 seconds on Team and 15 seconds on Scale. Hyperping offers 30 seconds on Essentials and 20 seconds on Business. Uptrends offers 2 minutes on Core, 1 minute on Pro and 30 seconds on Enterprise. updown.io charges per check, so one monitor running every minute uses about 43,200 credits in 30 days. That comes to about €1.08 a month with its smallest credit pack and €0.36 with its largest.

## Entry prices

The cheapest paid plans cost between $84 and $108 a year. Uptime.com costs $84 a year for 10 basic checks, HetrixTools $99.95 a year for 30 monitors, and Site24x7 $9 a month for 25 websites from one location with email alerts only. UptimeRobot's Solo plan costs $144 a year for 10 monitors, and Pingdom costs $198 a year for 10 uptime checks.

The next group costs more but includes more. StatusCake Superior costs $244.92 a year for 100 monitors, Hyperping Essentials $290 a year for 50 monitors at 30-second checks, and Checkly Starter $24 a month. Better Stack charges $29 per responder a month, and Uptrends Core starts at $42 a month.

Two pricing details change these figures. UptimeRobot sets prices by the visitor's region. Its live page showed us Solo at $9 a month, while an archived copy from November 2 showed $12. updown.io publishes prices only in euros, and we list them as published without converting them.

## Alert costs and who gets woken up

SMS and phone alerts are where small bills grow. UptimeRobot sells one-time credit packs from $3 for 10 credits to $100 for 1,000, and a voice call uses 2 credits. HetrixTools charges $0.10 for each extra credit, and updown.io takes about €0.10 of credits per SMS. Pingdom and Uptime.com bundle a monthly SMS allowance into each tier. Pingdom can buy extra credits automatically when they run out, while Uptime.com asks customers to move up a tier. Better Stack includes unlimited SMS and phone alerts in each responder license, and Hyperping includes phone calls on its paid plans.

On-call scheduling is built into fewer products. Better Stack includes on-call scheduling for responders, Hyperping includes 1 schedule on Essentials, 3 on Pro and unlimited on Business, and Uptrends supports up to three escalation levels. UptimeRobot's own comparison page says it has [no on-call scheduling built in](https://uptimerobot.com/knowledge-hub/comparisons-and-alternatives/uptime-kuma-alternatives/). A team on a tool without scheduling usually forwards alerts to a separate paging service such as PagerDuty or Opsgenie.

## Free plans and their terms

Free plan terms can change with little notice. UptimeRobot's terms in [December 2024](https://web.archive.org/web/20241201203510/https://uptimerobot.com/terms/) limited the free plan to personal, non-commercial use, and its [current terms](https://uptimerobot.com/terms/) allow any use, including commercial use. StatusCake's terms limit the free account to personal use, and Better Stack labels its free tier as free for personal projects. HetrixTools keeps a free account free as long as the owner logs in at least once every 90 days, and Checkly hard-caps the check runs on its free Hobby plan.

## Certificates and domain names

Certificate expiry is becoming a more frequent risk. The CA/Browser Forum [voted in April 2025](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/) to cut the maximum life of public TLS certificates from 398 days in steps. The limit became 200 days on March 15, 2026, drops to 100 days on March 15, 2027, and reaches 47 days on March 15, 2029. Let's Encrypt [stopped sending expiry reminder emails](https://letsencrypt.org/2025/01/22/ending-expiration-emails/) on June 4, 2025, and it [plans to move](https://letsencrypt.org/2025/12/02/from-90-to-45) its default certificates to 64 days in February 2027 and 45 days in February 2028.

Expired certificates still take down large services. GitHub's [November 2025 availability report](https://github.blog/news-insights/company-news/github-availability-report-november-2025/) says all Git operations failed from 20:30 to 21:34 UTC on November 18 because of an expired certificate used between internal services.

All eleven products check SSL certificates, though UptimeRobot and StatusCake keep that check off their free plans. Domain expiry checks are less common. Checkly says it does not cover domain expiration, and we found no domain expiry check in the documentation for Pingdom or Uptrends. Hyperping includes SSL and domain expiry checks on every plan, the free plan included.

## Status pages

Some products include status pages and others sell them separately. HetrixTools includes status pages on every plan, UptimeRobot includes 1 on Free and 3 on Solo, and Pingdom includes public status pages on every tier. Hyperping includes 1 to 10 depending on the plan, and Uptrends includes 10 on Core and unlimited on Pro. StatusCake sells status pages as a separate product from $12.46 a month on annual billing, Uptime.com sells them as an add-on, and Better Stack charges $12 a month for each page beyond the first.

## Security claims and data location

Six vendors state a SOC 2 report: UptimeRobot, whose report is Type I, along with Better Stack, Pingdom, Site24x7, Checkly and Uptime.com. Site24x7 and Uptrends state ISO 27001 certification. Hyperping says it holds neither certification. We found no certification statement from HetrixTools, StatusCake or updown.io, and all three either state GDPR compliance or offer a data processing agreement.

## Leaving a product later

History retention decides how far back a later uptime report can go. UptimeRobot keeps 3 months of history on Free, 12 on Solo and 24 on Team and Scale. Site24x7 keeps 2 to 5 years depending on the plan, Hyperping keeps 2 years and HetrixTools keeps uptime history without a time limit. Checkly keeps raw results for 7 days on Hobby and Starter, with aggregated data for 30 days on those plans and 1 year on Team.

Export options differ as well. Pingdom exports test results as CSV at 10,000 lines per download, about a week of data at a 1-minute interval. Site24x7 exports reports as CSV or PDF, Uptime.com as PDF or XLS, and Hyperping as CSV on paid plans. HetrixTools, StatusCake and updown.io provide history through their APIs, and Better Stack's CSV export needs its Reporting add-on.

## What to test during a trial

- Take a test page offline and time how long the alert takes to arrive, confirmation check included.
- Block one monitoring region from reaching a test page and see whether the tool alerts or treats it as a local problem.
- Send a test SMS and phone call to the phone of the person who will be on call, with do-not-disturb turned on.
- Point a monitor at a certificate that expires within the warning window and confirm that the expiry alert arrives.
- Export a month of check history and work out the uptime percentage yourself from the raw data.
