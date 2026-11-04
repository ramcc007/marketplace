---
title: Version control hosting compared
definition: Eight Git hosting services compared on prices checked at the source, free tier limits, review enforcement, access roles and self-hosting.
primaryKeyword: version control hosting
criteriaApproved: true
writer: Claude (AI draft)
editor: Ram C
signedOffAt: 2026-11-05
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages. AWS CodeCommit, Beanstalk and Backlog left out for reasons given on the page.
  - date: 2026-11-05
    note: Second pass. Removed the exclusion notes and the claims the vendor pages did not support, checked review and role rules against each vendor's documentation, and rewrote the body in our own words.
---

Version control hosting keeps a team's Git repositories on a server the team can reach, and adds the controls that let several people change the same code safely. The eight products on this page each host Git repositories and offer pull or merge requests, and each has access controls that decide who can read, write and merge. We checked prices on each vendor's pricing page, and checked review and role rules against the vendor's own documentation.

## What a product needs to be listed

We list a product when we can point to a vendor page for each of three things. The first is Git repository hosting, meaning a place to create repositories and push to them over standard Git. The second is pull or merge requests, where one branch is proposed for merging into another and reviewers can comment or approve. The third is access controls, meaning roles, teams or branch rules that limit who can write to a repository or merge into a branch.

These checks are deliberately plain. Most Git hosts pass them. The useful differences sit in the details. Buyers should ask which review rules block a merge, which plan they sit on, how many people the free tier allows, and whether the code runs on the vendor's servers or yours.

## Hosted services and self-hosted software

Six of the eight are hosted services you sign up for: [GitHub](/products/github), [GitLab](/products/gitlab), [Bitbucket](/products/bitbucket), [Azure Repos](/products/azure-repos), [Assembla](/products/assembla) and [Codeberg](/products/codeberg). GitLab also sells a self-managed edition, and its pricing page lists the Premium plan at $29 per user per month, billed annually.

[Gitea](/products/gitea) and [OneDev](/products/onedev) are software you can run yourself. Gitea also lists a Cloud Managed option, but its pricing page gives no price for it. A team that runs either one takes on servers, backups and upgrades.

Codeberg points commercial teams elsewhere. Its FAQ says Codeberg does not offer private hosting services, and it suggests Forgejo, the software Codeberg runs, for teams that need private repositories for commercial work. Forgejo can be self-hosted.

## What the free tiers allow

Free tiers differ more than the headline price suggests. GitHub's Free plan includes 2,000 CI/CD minutes a month and 500 MB of Packages storage. Bitbucket's Free plan is for up to 5 users and includes unlimited repositories, 1 GB of LFS storage and 50 build minutes. Bitbucket shares those build minutes and storage across the workspace.

GitLab's Free plan on GitLab.com allows 5 users in a private top-level group, with 400 compute minutes a month and 10 GiB of storage. The 5-user limit does not apply to public groups, paid tiers or self-managed Free. A private team that adds a sixth person on GitLab.com must move to Premium. Azure Repos includes the first 5 users in an organization for free.

Codeberg lets contributors to free and libre software keep up to 100 MB of private content. Gitea's open source edition lists unlimited users and repositories. OneDev's Community Edition is free, and its pricing page does not state a user cap.

## Per seat prices for a 20 person team

A rough comparison helps, with the caveat that it ignores CI usage, storage and add-ons. Using the listed per-user monthly prices, a team of 20 would pay about the following each month.

- GitHub Team: $4 per user, so $80. On Enterprise at $21 per user, the same team pays $420.
- Bitbucket Standard: $3.65 per user, so $73. On Premium at $8 per user, the team pays $160.
- GitLab Premium: $29 per user, so $580 a month, or $6,960 a year on annual billing.
- Azure Repos Basic: $6 per user after the first five, so $90 for 15 paid users.
- Assembla Starter: $12.50 per user, so $250. On Growth at $19 per user, the team pays $380.
- OneDev Enterprise: $6 per user, so $120. The price is subject to a 12 user-month minimum per order.

Gitea's Enterprise price is left out of that list on purpose. Its pricing page shows "$9.5$19*/user/month" with a footnote requiring a one-year commitment for online payment. The text does not show whether one figure is crossed out, so we record no single price. Ask the vendor which amount applies before you budget.

Currency is another gap. Assembla never names a currency code, and OneDev shows a dollar sign without naming one. GitHub's pricing table lists USD. Microsoft states that Azure DevOps prices are calculated in US dollars and converted at London closing spot rates, so prices outside the US will vary.

## Review rules that block a merge

A pull request is only a request until a rule makes review mandatory, and the vendors draw that line in different places.

On GitHub, the pricing page lists repository rules, code owners and required reviewers as Team and Enterprise features. On its Free plan, repository rules and code owners appear only for public repositories.

On GitLab, merge request approvals exist on Free, but they are optional. Its documentation says they "don't prevent merging without approval." Premium and Ultimate add required approvals, and without them merging is blocked. Create the rule on Premium if approvals must block a merge.

Bitbucket's pricing page lists enforced merge checks as a Premium feature. We did not confirm how Bitbucket treats merge checks on its free plan.

Azure Repos branch policies can require a minimum number of reviewers, resolved comments, linked work items, a passing build validation and external status checks. Microsoft's overview page does not tie those policies to a paid plan.

Gitea's protected branches can require a set number of approvals before a merge, and only repository owners and administrators can manage the rules. The documentation does not say whether any edition limits the feature. Codeberg's documentation says pull requests can be reviewed and that maintainers and owners can merge them, but it does not describe a required-approval setting. OneDev's documentation says code review policies can name required reviewers for changes to specific files.

## Roles, single sign-on and compliance

Access control covers two things: who can touch a repository, and how people sign in.

GitLab's default roles run from Minimal Access and Guest through Planner, Reporter, Security Manager, Developer and Maintainer to Owner. A user keeps the permissions of their highest role. OneDev's documentation says a role is a set of permissions, and that the role must be chosen whenever a project is granted to a user or group.

Sign-in controls follow the plan ladder. GitHub lists SAML single sign-on, SCIM provisioning and the audit log API on Enterprise only. Gitea's pricing page lists SAML SSO integration and audit logs among its features. Bitbucket's Premium plan adds IP allowlisting and required two-step verification. Assembla's pricing page says SSO, audit logs, SOC 2, GDPR and AES-256 encryption are included in every plan.

On compliance, GitHub lists SOC 1 and SOC 2 reports on Enterprise. Assembla's page says SOC 2 and GDPR are included in every plan, though it says "SOC 2" without the Type II label. We found no SOC or ISO statements on the pricing pages for Codeberg, Gitea or OneDev, so we record those fields as unknown rather than absent. Regulated buyers should request each vendor's current reports.

## CI minutes and add-ons

Most of these hosts bundle build capacity, and that is where bills grow. GitHub includes 2,000 CI/CD minutes a month on Free, 3,000 on Team and 50,000 on Enterprise. GitLab includes 400 compute minutes on Free, 10,000 on Premium and 50,000 on Ultimate, and extra minutes cost $10 per 1,000 as a one-time payment. Bitbucket sells extra build minutes and storage at $10 a month for 1,000 minutes or 100 GB.

GitLab's pricing page also lists GitLab Credits of $12 per user a month on Premium and $24 on Ultimate, and says they are a promotional offer for a limited time. Do not count on promotional credits when you compare a multi-year cost. For build tooling on its own, see the [CI/CD category](/software/ci-cd), and the separate products [GitHub Actions](/products/github-actions), [GitLab CI/CD](/products/gitlab-ci-cd), [Bitbucket Pipelines](/products/bitbucket-pipelines) and [Azure Pipelines](/products/azure-pipelines).

## Overlap with neighbouring categories

Version control hosting overlaps with other categories, and many buyers choose a host and a tracker together. Teams that also need work tracking should read our [issue tracking](/software/issue-tracking) and [project management](/software/project-management) categories before deciding.

## What to test during a trial

- Create a protected branch rule, open a pull request that breaks it, and confirm that the merge is blocked rather than warned.
- Add a user with the lowest role, then try to push, merge and read a private repository.
- Run your real build on the included minutes, and note how many are left.
- Export a repository with its issues and review comments, and check what leaves with the Git history.
- Ask in writing which price applies to your seat count, and whether it is billed monthly or annually.
