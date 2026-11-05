---
title: Software development and DevOps tools
description: Compare the build, release and monitoring tools engineering teams buy, with a guide to each live development category on B2BRated.
writer: Claude (AI draft)
---

Engineering teams buy software for three separate jobs: building and shipping code, watching it run, and dealing with the problems that follow. B2BRated has eleven live category pages for development and DevOps. Each compares eight to eleven products, and the notes below say what each page covers.

## Building and shipping

[CI/CD](/software/ci-cd) compares nine tools on minute and credit allowances, approvals, logs and supply chain exposure. Start there if your code host already bundles a pipeline and you want to know whether its allowance covers your workload.

[Infrastructure as code](/software/infrastructure-as-code) looks at plan and apply steps and how each platform handles state. [Feature flags](/software/feature-flags) covers targeting rules, gradual rollouts and SDK coverage, which matter when a team wants to ship code before it switches the feature on for anyone.

[API management](/software/api-management) covers gateways, rate limits, authentication and developer portals. [Bug and issue tracking](/software/issue-tracking) compares trackers on workflow states, assignment, priorities and links to Git.

## Watching what runs

[Application performance monitoring](/software/apm) covers tracing depth, alerting and how each vendor charges, including what sampling costs. [Log management](/software/log-management) looks at how retention is set, how log alerts are built and what the free plans allow. [Error tracking](/software/error-tracking) adds event quotas, grouping, release tracking, data location and scrubbing of personal data.

[Uptime monitoring](/software/uptime-monitoring) checks a site or API from outside and compares check locations, how failures are confirmed, alert costs and status pages. When a check fails, [Incident management and on-call](/software/incident-management) picks up the work: on-call schedules, alert routing and postmortems.

Some products appear on more than one of these pages. New Relic and SigNoz are listed under both application performance monitoring and log management, and Better Stack appears under log management, uptime monitoring and incident management. On each page the prices cover only the part of the product that category is about, so read the note on the page before comparing numbers.

[Transactional email](/software/transactional-email) is the odd one out. It covers services that send the messages your application generates, such as password resets and receipts, and compares log retention, bounce and complaint handling and contract terms.

## How prices are handled

Every price on these pages comes from the vendor's own website, and each product page links to the pages we used. Some vendors publish no amount for their larger plans. CircleCI's Scale plan is quote only, Harness sells its paid plans by quote, and Azure API Management shows its tiers without amounts. The category pages mark those cases instead of filling the gap.

The unit matters more than the headline figure. CI/CD vendors charge per user, per machine minute or in credits. Error trackers count events, errors, requests or page views. Before you compare two quotes, convert both to your own monthly volume and see what happens when you exceed it. Some tools stop accepting data at the quota, and others bill for the overage.

Also ask where the vendor stores your data, what the free plan leaves out, and which plan adds single sign-on or longer retention.
