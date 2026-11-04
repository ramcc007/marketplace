---
title: API testing tools for building, organizing and running requests
definition: Eight API clients compared on the prices and free plan limits published on their vendor pages, with notes on where collections are stored.
primaryKeyword: api testing tools
criteriaApproved: true
writer: Claude (AI draft)
editor: Ram C
signedOffAt: 2026-11-05
updateLog:
  - date: 2026-11-04
    note: First draft. Seven products checked against vendor pages and documentation.
  - date: 2026-11-05
    note: Second pass. Prices and free plan limits re-read from vendor pricing pages. Hoppscotch prices could not be read and were removed. Feature claims that were not re-read were removed.
  - date: 2026-11-05
    note: Eighth product added. Yaak's free use terms, yearly prices and yearly-only billing taken from its home and pricing pages.
---

An API testing tool lets a developer or tester save an HTTP request, send it again later to a chosen server, and check the response. This page covers eight clients. For each one we read the vendor's pricing page and recorded the per-user price, the billing period and the limits on the free plan. Feature claims beyond those figures are not covered in this draft, so the comparison leans on price and plan limits.

## Where collections are stored

Storage is the first decision. A collection is a saved set of requests, and some tools keep it on the developer's machine while others keep it in a hosted workspace. The choice changes how a team reviews a change to a request.

Insomnia's pricing page offers Git Sync on its Essentials plan for up to 3 users, and says every user on Pro gets Git Sync access with no stated cap. A team that already reviews code in Git can keep collections in the same repository, so a change to a test appears in the same review as the code it covers.

Bruno's pricing page lists an Open Source tier at $0 per user. On that tier its Git provider access is described as public, which means private repositories are not covered. A company with private code would need a paid tier to use Git in this way.

Testfully's Developer plan lets up to 5 users join one workspace without a charge. That fits a small team that keeps collections in a hosted space and does not use Git. Thunder Client's Free plan caps a user at 10 collections, with up to 50 requests in each.

Yaak calls itself local-first. The facts we recorded for it do not say where its collections are kept or whether it offers Git sync, so this page makes no storage claim for it.

## Free plans and their limits

A free plan answers a narrower question than the headline price. Thunder Client's Free plan allows 10 collections, 50 requests per collection and 50 local collection runner runs per user each month. Its pricing page says CI/CD runs have no limit. Postman's Free plan covers one user and 1,000 monitoring requests per team each month. That is enough for one person to test, and it stops working as soon as a second tester needs access.

Testfully's Developer plan has a 5-user workspace limit, and its runner has no monthly request cap on any plan. Those two numbers matter more to a team than the price.

Yaak's free use is for personal work only. Using it at work requires a commercial license after a 30-day trial.

## Prices as published

The figures below are per user per month and billed annually, as each vendor page states, except Yaak, which bills per year.

Postman charges $9 for Solo and $19 for Team. A five-person Team plan therefore costs $1,140 a year. Bruno's Pro plan is $6 per user and Ultimate is $11, which comes to $360 and $660 a year for five users. Thunder Client lists Starter at $3, Business at $7 and Enterprise at $16. Testfully lists Team at $14 and Enterprise at $29. Requestly lists Team at $10 and Team Pro at $15, with Enterprise on contact-sales terms. Insomnia lists Pro at $12 and Enterprise at $45, and its Enterprise page says self-serve covers up to 50 users.

Yaak lists Individual at $79 a year and Business at $149 per user a year, both billed yearly. A five-person Business plan therefore costs $745 a year. Its one-time Individual lifetime price is $349, and its pricing page offers no monthly billing.

Requestly's page shows a dollar sign and no currency code, so its figures are recorded as shown. Yaak's pricing page does the same. Insomnia's page has a monthly and annual toggle that states a 17% saving for annual billing. It shows one price per plan and does not say which period that price reflects, so confirm the figure at checkout before budgeting.

Hoppscotch's pricing page did not return any plan names or prices when we read it. Its home page calls the product an open source API development ecosystem, which is the only statement we record for it on this page.

## What the survey says about teams

Postman's 2025 State of the API report surveyed over 5,700 developers, architects and executives. It reports that 84% of teams work in small groups of 1 to 9 people, that 93% of API teams still face collaboration blockers, and that 55% struggle with inconsistent documentation. The survey comes from one vendor and its own respondent pool, so read it as a signal about the market rather than an exact count.

For a small team, per-user pricing and the storage choice matter more than role controls. A five-person team rarely needs single sign-on, but it does need one shared place to keep collections that everyone can open.

## Environments and automated runs

Environments hold named sets of variables, such as a base address for staging or production. Every product here is built around this idea, but this draft did not re-read the variable scope rules on each product page, so this page does not rank them.

Automated runs are what move an API test into a build. Thunder Client's pricing page says CI/CD runs are not limited by plan. For the other seven products, this draft did not check how a command line runner is installed or what report formats it writes. Before choosing, look up the runner documentation for the tool you are considering and confirm it writes a report format your build server can read.

Build pipelines themselves are covered on the [CI/CD page](/software/ci-cd).

## Products on this page

The eight clients are Bruno, Hoppscotch, Insomnia, Postman, Requestly, Testfully, Thunder Client and Yaak. Each has a product page with the figures above.

## How to run a short trial

A week is enough to settle the choice for a small team. Import an existing Postman or OpenAPI collection, then check that environments and scripts survive the move. Build one login request that stores a token, add three requests that use it, and write checks on the status code and a field in the response body.

Run that collection from the command line on a build server, and change a variable in one environment to confirm the run picks up the new value. Then ask the vendor how collections leave the product if the subscription ends. File-based tools leave the files in the repository, and hosted tools should be able to export collections in a format another client can read.
