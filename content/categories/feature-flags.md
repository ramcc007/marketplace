---
title: Feature flag software compared
definition: Eight feature flag tools compared on targeting rules, gradual rollouts, SDK coverage and prices checked at the source, from free tiers to quotes.
primaryKeyword: feature flag software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages and documentation.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Feature flag software lets a team change what users see without shipping new code. A flag is a switch evaluated at run time, so a release can reach a few users first, be turned off in seconds if it misbehaves, and be switched on for everyone later. The eight products here all offer flag targeting rules, gradual rollouts and SDKs for major languages. We read every price on the vendor's own website, and each product page links to the pages we used.

## What the three must-haves mean

Targeting rules decide who gets a flag value. A rule matches on attributes of the user or request, such as country, plan or email domain, and serves a chosen value when the conditions hold. [LaunchDarkly](/products/launchdarkly) describes targeting rules as the mechanism for expressing precedence and conditions across several context kinds. On Unleash, every constraint on a strategy must match, and the flag is enabled if any one of its strategies matches.

Gradual rollouts expose a feature to a share of users and raise that share over time. [GrowthBook](/products/growthbook) and Unleash hash an identifier so a given user keeps the same experience as the percentage grows. [DevCycle](/products/devcycle) documents rollouts with a start percentage, an end percentage and dates, plus multi-step rollouts with percentage milestones. [Statsig](/products/statsig) gives each gate rule a Split % setting for the share of matching users who pass.

SDKs for major languages matter because the flag check runs inside your code. Statsig, Unleash, DevCycle and GrowthBook list server SDKs for Node.js, Python, Java and Go, and most of the eight add mobile and browser SDKs. ConfigCat lists SDKs for 16 platforms, including Unity and Unreal Engine. The lists differ, so check yours against the product page before you commit.

## Hosted service or something you run

The first split is between vendors that mainly sell a hosted service and those with a self-hosted core. [Flipt](/products/flipt) is open source with unlimited flags in its free edition, and sells Flipt Pro at $200 a month for up to 10 instances. The open source edition of Unleash is limited to 1 project, 2 environments and 5,000 flags per instance. GrowthBook lists an open source self-hosted plan with 1 project and unlimited flags, experiments and traffic.

Running your own flag server adds work. Someone must patch it, keep it available and answer for the data it holds. In exchange, flag evaluation can stay inside your network, and the price is infrastructure rather than a per-seat bill. Hosted plans move that work to the vendor, and the price follows seats, requests, users or events.

OpenFeature is worth knowing here. It is an Apache 2 licensed specification for a vendor-agnostic feature flag API and a CNCF incubating project. Code written against it can change flag provider with less rework, which lowers the cost of a first choice. Check each vendor's documentation for a current provider before relying on it.

## Four ways vendors charge

Feature flag pricing is less uniform than most categories. Vendors pick different meters, and the same team can pay very different amounts depending on which meter matches how it works.

Per seat pricing charges for the people who manage flags. The Pay-As-You-Go plan from Unleash costs $75 per seat per month on a monthly card with no contract, and a self-hosted install needs at least 5 seats. GrowthBook Pro costs $40 per seat per month for up to 30 users and 3 projects. ConfigCat and DevCycle say seats are unlimited, and LaunchDarkly Foundation charges no seat fee.

Request based pricing charges for the volume of flag evaluations or configuration downloads. [Flagsmith](/products/flagsmith) includes 50,000 requests a month free, 1,000,000 on Start-Up at $40 a month on yearly billing, and 5,000,000 or more on Scale-Up at $250. Extra calls start at $50 per million. [ConfigCat](/products/configcat) counts config JSON downloads, with 5 million on Forever Free and 25 million on Pro.

User based pricing charges for monthly active users. LaunchDarkly Foundation bills $8.33 per 1K client-side monthly active users per month in its plan card and $10 in its comparison table, plus $10 per service connection. DevCycle Business includes 100,000 monthly active users and charges $2.50 per 1,000 beyond that.

Event based pricing charges for analytics and experiment data. Statsig Pro costs $150 a month with 5 million events, then $0.05 per additional 1K events. Flag and config checks themselves are unlimited on its plans.

## A worked comparison

Take a small team of five engineers who want hosted flags for a backend service and a web app. On Unleash Pay-As-You-Go, five seats cost $375 a month before any request overage beyond 53M. On GrowthBook Pro, five seats cost $200 a month. On ConfigCat the team pays $110 a month for Pro with up to 100 flags, whatever the seat count. On Statsig the team pays $150 a month for Pro, or nothing on Developer while it stays under 2 million events.

The free tiers are narrower than they look. ConfigCat Forever Free allows 10 flags and 4 targeting rules per flag. Flagsmith Free allows one team member. GrowthBook Starter allows three users. DevCycle Free allows 1,000 client-side monthly active users, and LaunchDarkly Developer allows 1K client-side monthly active users and 5 service connections. A real product with more than a few thousand users will leave these quickly.

These figures use the dollar prices shown on each page. None of the eight pages names a currency code beside its dollar signs, and ConfigCat does not say whether its displayed monthly prices follow the monthly or annual billing toggle. We recorded the amounts as shown and noted the gaps on each product page.

## Plan limits that matter before price does

Several plans gate the features that teams adopt later. ConfigCat limits targeting rules per flag to 4 on Forever Free and 8 on Pro. A flag with a rule for each of five customer tiers will not fit on the free plan. Its audit log is kept for 7 days on Forever Free, 35 days on Pro and 2 years on Enterprise.

Approvals and governance also sit higher up. LaunchDarkly lists workflows, approvals, custom roles and SCIM provisioning under Enterprise. Flagsmith lists SAML single sign-on on Scale-Up, and marks LDAP and SCIM as coming soon on Enterprise. If a regulator or customer asks who changed a production flag, the audit and approval features are what answer.

Release monitoring is a separate purchase at some vendors. LaunchDarkly sells Guardian, for guardrail metrics and automatic rollback, as a separately priced add-on. Statsig bundles experiment analysis into its event meter instead, and stops Metric Lift computations on Developer above 2 million events while leaving gate targeting running.

## One product is hard to price

DevCycle shows its Business plan as $500 a month billed annually on the plan card, and $625 a month in the pricing breakdown. The page does not explain the gap. Our product page leaves the price blank for that reason, and a buyer should ask for a written quote before budgeting.

LaunchDarkly has a smaller inconsistency of the same kind in its client-side price. Flagsmith's page lists Scale-Up extra team members at $50 each per month, shown beside a struck-through $60. Prices in this category move often, so treat every figure as a snapshot dated on the product page.

## Experimentation alongside flags

Four of the eight products pair flags with experiments. GrowthBook says its plans include unlimited experiments. Statsig's pricing is built around events used for gates, experiments and analytics. LaunchDarkly counts experimentation monthly active users, with 100K on Developer. Flagsmith lists A/B and multivariate testing from Start-Up and counts users in experiments.

If you only need to turn features on and off by rule, ConfigCat, Flipt and Unleash are the narrowest fit. If product teams want to measure the effect of a release, the experiment meter becomes part of the price, and you should model it from your own traffic.

## Why Harness is not listed

The Harness pricing page names feature management and experimentation (FME) as a module. We left it out because that pricing page lists no price, limits or plan for FME, and names it only as a module you can pick on the quoted Enterprise plan. The existing Harness page covers its CI and CD products in [CI/CD](/software/ci-cd). PostHog also offers flags, but its pricing page did not return feature flag figures when we fetched it, so we did not include it.

## What to test during a trial

- Write a rule that targets one test user by attribute, then change the attribute and confirm the value changes.
- Roll a flag from 10% to 50% and check that the same test users stay in the exposed group.
- Switch a flag off during load and time how long your SDK takes to see the change.
- Disconnect the SDK from the flag service and confirm which default value the code serves.
- Export or read the audit log for a flag change, and check how long it is retained on your plan.
- Add your expected monthly users, requests and events to the vendor's meter and compare the result with the displayed price.

Related tools sit in neighbouring categories. Teams that run flags as part of a delivery pipeline often compare [CI/CD](/software/ci-cd) products too, and those watching releases in production look at [error tracking](/software/error-tracking) and [APM](/software/apm).
