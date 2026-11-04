---
title: Bug and issue tracking software compared
definition: Eight bug and issue trackers compared on workflow states, assignment, priorities and Git links, with prices checked at the vendor.
primaryKeyword: bug and issue tracking software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pricing and documentation pages. Jira and YouTrack left out because their prices could not be read.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

An issue tracker keeps a list of problems and tasks, shows who owns each one, and records how far each has moved. The eight products on this page all do three things. They move issues through defined states, they let a team assign issues and rank them by priority, and they connect to version control so that commits and pull requests tie to issues. We read each vendor's own pricing and documentation pages, and each product page links to the pages we used.

## What a product had to show to be included

We set three tests, taken from the draft criteria for this category. Each product needed a page from its vendor that shows issue states and workflow, a page that shows assignment and priorities, and a page that shows a link to version control. A product that could not pass all three with a vendor source stayed out, however well known it is.

Two well-known trackers stayed out for a practical reason. The pricing pages for Atlassian's Jira and JetBrains' YouTrack returned only a page title or navigation text to our fetcher, with no dollar amounts. We do not copy prices from third-party sites, so neither product is listed. This is a limit of our checking, not a verdict on either tool, and both are candidates for the next update.

The inclusion criteria are still a draft that an editor has not approved. Treat the list as a first pass.

## Hosted tools and tools you run yourself

The first split is where the software lives. Linear, GitHub Issues, Shortcut and Azure Boards are hosted services. GitLab Issues and Plane offer a hosted version, and Plane's pricing page also lists self-hosted options. Redmine and OpenProject are open source and designed to run on your own server, though OpenProject also sells hosted plans.

Self-hosting changes the cost. [Redmine](/products/redmine) is released under the GNU General Public License v2, and its project site lists no price. The cost is the server, upgrades, backups and security patches that your own staff carry. OpenProject's Community edition is free in the same way, and its paid plans start at 5.95 euros per user per month with a 25-user minimum.

## How the prices compare

Prices below are per user per month in US dollars unless noted, and all were read from each vendor's pricing page and checked a second time. Several vendors list only an annual rate, so the monthly figure is not available for those plans.

| Product | Free plan | Lowest paid plan | Notes |
|---|---|---|---|
| [Linear](/products/linear) | 250 issues, 2 teams | $10, billed yearly | Business is $16, billed yearly |
| [GitHub Issues](/products/github-issues) | Yes | $4 (Team) | Enterprise is $21 |
| [GitLab Issues](/products/gitlab-issues) | 5 users per private group | $29, billed annually | Ultimate is by quote |
| [Plane](/products/plane) | Up to 12 users | $8 monthly or $6 annual | Business is $15 or $13 |
| [Shortcut](/products/shortcut) | Up to 10 users | $8.50, yearly plan | Business is $12 |
| [Azure Boards](/products/azure-boards) | First 5 users | $6 after 5 users | With Test Plans it is $52 |
| [Redmine](/products/redmine) | Open source | None listed | You host it |
| [OpenProject](/products/openproject) | Community edition | 5.95 euros | 25-user minimum |

A team of 20 shows how far apart these are. On Linear's Basic plan that is $200 a month, and on Business it is $320. GitHub Team costs $80. Plane Pro on annual billing costs $120, Shortcut Team costs $170, and GitLab Premium costs $580. Azure Boards costs $90, because the first five users are free and the other fifteen pay $6.

These totals are not equal purchases. GitHub and GitLab bundle code hosting with their issue tracking, so the price buys more than a tracker. Azure Boards sits inside Azure DevOps, which also holds repositories and pipelines.

## Issue states and workflow

Every product here moves an issue through states, but the model differs. GitHub issues themselves are open or closed, and richer states come from a project field. GitHub's single select fields let a team define options such as Status or Priority, up to 50 options per field, with a default value for new items.

GitLab works the same way at a basic level. Its documentation says statuses give more granular tracking than open and closed, with examples such as In progress, Done and Won't do, and it lists statuses as a Premium and Ultimate feature. A team on the Free plan has open and closed only.

Linear and Shortcut build states into the product. Shortcut starts every workspace with one workflow of four state types, Backlog, Unstarted, Started and Done, and lets a team add, reorder and delete states within each type. Only the Free plan is limited to one workflow. Linear adds a Triage status for issues that come from integrations or from people outside the team, and accepting an issue moves it to the team's default status.

Redmine and OpenProject give administrators the most control. In Redmine the workflow defines which status transitions a member can make, based on the member's role and the issue's tracker. OpenProject lets administrators add and rename statuses, and a new status has no effect until it is activated in the workflow. In Azure Boards, a user story in the Agile process moves from New to Active, Resolved and Closed.

## Assignment and priorities

Assignment is simple in most of these tools and strict in a few. Linear gives each issue one assignee at a time. Shortcut uses the word Owners and also lets a team add followers who are notified of progress. GitHub lets you assign yourself and teammates to an issue. Azure Boards has an Assigned To field naming the person responsible. Redmine adds a role-level switch that controls whether issues can be assigned to members with that role.

Priority is where the products differ most. Plane has five fixed options, Urgent, High, Medium, Low and None, and new work items start at None. Shortcut has a predefined Priority field with the values P1 to P4 on every plan. Azure Boards rates a user story from 1 to 3, where 1 means the product cannot ship without it. Redmine keeps a global list of priorities that administrators can add to and change freely.

GitHub and GitLab have no dedicated priority field on a plain issue. On GitHub a team builds one with a single select field in a project. On GitLab, labels can carry relative priorities, and issue lists sort by an issue's highest-priority label. Linear lets a team require that priority is set before an issue leaves Triage, and its triage rules can set priority automatically. We did not find a page that lists Linear's priority levels, so the product page does not name them.

## Version control integration

The strongest differences show up here. GitHub Issues and GitLab Issues live next to the repository, so the link is native. A keyword such as fixes in a GitHub pull request closes the linked issue when the pull request merges. GitLab does the same when a commit or merge request description says Closes or Fixes before an issue reference, and the issue closes when the commit reaches the default branch.

Linear, Shortcut, Plane and OpenProject connect to repositories hosted elsewhere. Linear links work through an issue ID in a branch name, pull request title or commit message, and by default a linked issue moves to In Progress when a pull request opens and to Done when it merges. Shortcut event handlers move a story on a branch, commit, pull request opening, approval or merge. Plane maps pull request events to states, and OpenProject shows linked pull requests and their GitHub Actions results on a GitHub tab inside the work package.

Redmine reads repositories directly. It supports Subversion, CVS, Mercurial, Bazaar and Git, but the binaries must be installed on the same host as Redmine. Git repositories do not update on their own, so an administrator sets up a cron job or post-receive hook. Referencing keywords link a commit to an issue, and fixing keywords can also set a status, though none is set by default.

Azure Boards links a work item to a commit when the commit message contains an ID such as #35. After a GitHub repository is connected, work items can link to a GitHub branch, commit, issue or pull request.

## Plan limits worth reading first

Free plans carry limits that matter for a real team. Linear's free plan allows unlimited members but only 250 issues and two teams, so check your current issue count before choosing it. Shortcut caps the free plan at 10 users and one workflow. Plane caps it at 12 users and lists no integrations on that plan, which rules out its GitHub link until a team pays. GitLab's limit of 5 users applies to private top-level groups on GitLab.com and not to public groups.

Single sign-on is usually held back for upper plans. Linear lists SAML only on Enterprise, and GitHub does the same. Plane lists SSO for the Business plan on its hosted service and for Pro on self-hosted installs only. GitHub also lists SOC 1 and SOC 2 Type 2 reports each year on its Enterprise plan. We recorded security statements only where the vendor's pricing page gave them, so blanks on a product page mean we found nothing, not that a certification is missing.

Currency matters for one product. OpenProject lists euros, and the dollar figures on its US toggle were not readable to us, so we show the euro prices as listed rather than converting them. Pricing may also differ by country for other vendors, and we checked the US pages.

## What to test during a trial

- Build your real workflow with its actual states and confirm the product allows every transition your team uses.
- Assign an issue to two people if your process needs it, and check whether the product allows it.
- Set priorities in bulk on 50 issues and sort by them to see whether the tool ranks as you expect.
- Link a test branch and pull request to an issue, merge it, and watch which state the issue lands in.
- Import a sample of your current issues and confirm that comments and attachments survive.
- Ask the vendor in writing what data you can export if you leave.
