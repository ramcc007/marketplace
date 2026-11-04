---
title: CI/CD software compared
definition: Nine CI/CD tools compared on prices checked at the source, minute and credit allowances, approvals, logs and supply chain exposure.
primaryKeyword: CI/CD software
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

CI/CD software runs a team's automated builds and tests on every change, then moves the result through deployment pipelines to staging and production. The nine products on this page each run automated builds and tests, support deployment pipelines, and keep pipeline logs a developer can read. We checked every price on the vendor's own website, and each product page links to the pages we used.

## What a buyer is really choosing

Most teams do not pick a CI/CD tool from a blank page. A team already has its code in GitHub, GitLab, Bitbucket or Azure DevOps, and the pipeline tool that ships with that host is the default. [GitHub Actions](/products/github-actions), [GitLab CI/CD](/products/gitlab-ci-cd), [Bitbucket Pipelines](/products/bitbucket-pipelines) and [Azure Pipelines](/products/azure-pipelines) all work this way, and the first question is whether the bundled minutes cover the team's real workload.

The alternatives split in two. [CircleCI](/products/circleci), [Semaphore](/products/semaphore) and [Buildkite](/products/buildkite) are separate services that connect to a code host. [Jenkins](/products/jenkins) is software the team installs and runs itself, and the Harness platform sells CI and CD together with quote-based pricing for its paid plans.

## Three ways vendors charge

Vendors count usage in three different units, and a quick comparison of headline prices hides this. Some sell per user, some sell machine minutes, and some sell parallel jobs.

GitLab and Bitbucket price per user. GitLab Premium costs $29 per user a month billed annually, so ten developers cost $290 a month, or $3,480 a year, before extra compute minutes. Bitbucket's Standard plan costs $3.65 per user a month and Premium costs $8, so the same ten developers cost $36.50 or $80 a month. Bitbucket's Free plan covers up to 5 users.

Semaphore and GitHub Actions charge for machine time. Semaphore lists $0.0075 per minute for an Ubuntu x64 2-vCPU machine, $0.003 for the ARM equivalent and $0.09 for macOS. GitHub lists $0.006 per minute for a Linux 2-core runner. Both give a monthly credit first: $15 at Semaphore, and $12 to $300 at GitHub depending on the plan.

CircleCI sells credits, Azure Pipelines sells parallel jobs, and Buildkite mixes a per-user fee with hosted minutes. A parallel job is the number of pipelines that can run at the same moment, so a team that waits in a queue pays to widen it. Azure lists $40 a month for each extra Microsoft-hosted parallel job and $15 for each self-hosted one.

## Free allowances and what they cover

A free plan is useful for a side project or a small team, and a poor guide to the cost of a growing one. The allowances differ in size and in what they count.

GitHub's allowance is a dollar amount, not a number of minutes. The Free plan includes $12 of hosted runner usage each month, which covers 2,000 Linux 2-core minutes at $0.006. Windows, macOS and larger runners use the same dollars faster. Standard hosted runners are free in public repositories, but larger runners are billed even there.

GitLab Free includes 400 compute minutes a month, Premium includes 10,000 and Ultimate includes 50,000. Extra minutes cost $10 per 1,000 as a one-time payment. CircleCI's Free and Performance plans both include 30,000 credits a month that expire and do not roll over. Buildkite Free includes up to 2,000 Linux vCPU minutes, and Pro includes 4,000.

Bitbucket's Free plan includes 50 build minutes shared across the workspace, which is a small number for a team that tests every commit. The pricing page states no minute allowance for Standard or Premium. Another 1,000 minutes cost $10 a month, so a team should ask what its monthly total will be before choosing a plan.

Azure Pipelines has one catch that its pricing page does not mention. Microsoft's documentation says the free parallel job for private projects applies only after the organization links a valid Azure subscription for billing. Public projects are retired, and existing ones keep their free grants until they convert to private in 2027.

## Self-hosted runners and a postponed charge

Many teams run builds on their own machines to reach private networks, use special hardware or cut hosted costs. The price of that choice differs by vendor.

Jenkins is the full version of the idea. It is released under the MIT License, and the [license page](https://www.jenkins.io/license/) grants use free of charge. The software costs nothing, but the team pays for servers, agents, upgrades and plugin security work. The project lists more than 2,300 community plugins, which is both its range and its maintenance burden.

Semaphore charges $0.0025 a minute for a self-hosted agent on any machine. CircleCI does not charge per build minute on self-hosted runners but bills network use beyond the included amount at 420 credits per GB. Azure charges $15 a month per extra self-hosted parallel job.

GitHub's history here is a useful warning. In December 2025 it [announced](https://github.blog/changelog/2025-12-16-coming-soon-simpler-pricing-and-a-better-experience-for-github-actions/) a $0.002 per minute platform charge for self-hosted runners starting March 1, 2026, then postponed it to re-evaluate. The current billing page lists self-hosted use as free, and the postponement gave no new date. A team that builds a large self-hosted fleet on GitHub should treat that price as open.

## Approvals before production

A deployment pipeline is only as safe as the step that stops it. Each product handles this differently, and the difference matters for teams with change control rules.

GitHub environments can require reviewers to approve a job before it runs. Azure Pipelines supports manual approval checks on environments and a trigger: manual setting that holds a production stage until a person starts it. Buildkite uses a block step that pauses a build until a team member unblocks it in the web UI or API, and allowed_teams limits who may approve.

Semaphore chains pipelines with promotions that can be manual, automatic or parameterized, with deployment targets for access control. GitLab tracks deployments in environments, and a deployment appears only after a deployment job in the pipeline has created it. Bitbucket starts with Test, Staging and Production environments and a Deployments dashboard that shows history, statuses and logs.

## Pipeline logs hold secrets

Pipeline logs are where a developer finds why a build failed. They are also where a leaked secret ends up, and two incidents show why a buyer should look at the log tools and the secret handling together.

In March 2025 the GitHub Action tj-actions/changed-files was compromised. [CISA's alert](https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction) says the exposed data included secrets in workflow logs, such as access keys, personal access tokens, npm tokens and private RSA keys. The affected window ran from March 12 to March 15, 2025. CISA told users to audit workflows and rotate every identified secret.

The CircleCI breach worked differently. According to its [incident report](https://circleci.com/blog/jan-4-2023-incident-report/), malware on an engineer's laptop on December 16, 2022 stole a session cookie, and the attacker took customer environment variables, tokens and keys. CircleCI disclosed the incident on January 4, 2023 and told customers to rotate all secrets stored in the service.

The lesson is practical. A third-party action or the CI vendor itself can expose what a pipeline holds, so a buyer should keep secrets short-lived, pin third-party actions to a commit, and know how to rotate every credential the pipeline can read.

Log tooling varies. GitHub lets a user view, search, download or delete workflow run logs from the Actions tab, the CLI or the API. Azure lets a user download all logs for a run. The Harness platform lets a user download execution logs from the UI or its Log Service API. Buildkite supports log archives in the customer's own S3 bucket on the Enterprise plan, and CircleCI offers a rerun with SSH to inspect a failed job's files and processes.

## Compliance evidence

Security reviews usually ask for audit reports. GitLab's trust page lists SOC 2 and ISO/IEC 27001, among other certifications. CircleCI's security page says it is SOC 2 Type II compliant and does not name ISO 27001, GDPR or HIPAA. The other product pages we checked did not give us a certification list we could cite, so those fields are blank on the product pages rather than guessed.

## How to compare quotes

Three vendors here do not publish a full price. GitLab Ultimate, CircleCI Scale and Buildkite Enterprise are quote only, and Harness publishes only a $0 Free plan, with Essentials and Enterprise sold by quotation. On the Harness pricing page the Essentials plan is limited to 500 users, 60 concurrent CI executions and 6 months of pipeline execution history, which is worth testing against a team's real numbers. That page lists no build minute limits and no limits for the Free plan, so a buyer should ask sales what the Free plan actually covers.

Before asking for a quote, a team should count its monthly build minutes, the longest pipeline in minutes, the number of jobs that run at once, and the share of builds on macOS or Windows. Those four numbers decide whether a per-user plan, a minute plan or a parallel job plan costs less.

## Prices and location

Every figure on this page is in US dollars and comes from the vendor's US-facing page. Microsoft says its Azure DevOps prices are estimates that may vary with the agreement a customer signs, and CircleCI says its prices exclude applicable taxes. A buyer outside the United States should expect tax, and possibly a different currency, at checkout.

Check one thing before signing: confirm on the vendor's pricing page whether unused allowance expires, since CircleCI says its monthly credits expire and do not roll over, while GitLab sells extra minutes as a one-time payment.
