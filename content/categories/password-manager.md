---
title: Business password managers
definition: Ten business password managers compared on prices checked at the source, the plan that adds single sign-on, security reports and contract terms.
primaryKeyword: business password manager
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-03
    note: First draft. Ten products checked against vendor pages.
---

A team that keeps shared logins in a spreadsheet, a chat thread or one person's browser has no record of who can see which account. The ten products on this page each store logins in an encrypted vault, let people share them by team or group, and give an admin a set of policies and an activity report. We checked every price on the vendor's own website on November 3, 2026, and each product page links to the pages we used.

## What security guidance says

The [2025 revision of NIST's authentication guidelines](https://pages.nist.gov/800-63-4/sp800-63b.html) requires online services to allow password managers and autofill, and it tells them not to force people to change passwords on a schedule. [CISA advises](https://www.cisa.gov/secure-our-world/use-strong-passwords) using a password manager to create passwords of at least 16 characters that are random and different for every account. Verizon's [2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/executivebriefs/dbir-2026-executive-summary.pdf) found that credential abuse, meaning the use of stolen or guessed logins, was the way in for 13% of breaches, second to software vulnerabilities at 31%.

## What the cheapest plans leave out

Entry prices for small teams sit between $0.90 and $2 per user a month. [Zoho Vault](/products/zoho-vault) Standard costs $0.90 on annual billing, [Keeper](/products/keeper) Business Starter costs $2 for teams of 5 to 10 people, and [NordPass](/products/nordpass) Teams costs $1.99 on a one-year term but is sold only in packs of 10 users. [Proton Pass](/products/proton-pass) Essentials costs $1.99 for teams of 3 to 30 people, with a discount label on the yearly price that does not say what renewal will cost.

These plans cover sharing and basic admin control. None of them supports single sign-on through Microsoft Entra ID or Okta, NordPass Teams signs people in through Google Workspace only, and SCIM provisioning, where a vendor offers it, sits on a higher plan. A business that already manages staff accounts in an identity provider usually needs the next plan up.

## The plan where single sign-on starts

Four products include single sign-on in their main business plan. [Dashlane](/products/dashlane) Omnix Password Management costs $8 per user a month with single sign-on and SCIM. [1Password](/products/1password) Business costs $8.99 and [RoboForm](/products/roboform) Business costs $39.95 per user a year, and both include single sign-on and SCIM provisioning. [LastPass](/products/lastpass) Business costs $7 but limits single sign-on to three apps, and unlimited apps require Business Max at $11.

The other six keep single sign-on for a higher tier or a paid edition. [Bitwarden](/products/bitwarden) and Keeper add it on Enterprise at $6 per user a month, Zoho Vault on Enterprise at $7.20, and NordPass on Enterprise at $5.99, where Teams and Business plans sign in through Google Workspace only. Proton Pass adds it on Professional at $4.99, and [Passbolt](/products/passbolt) on its self-hosted Pro edition or on Cloud Business, both at $4.90 with a 10-user minimum.

The gap adds up for a growing team. A 20-person team on Keeper pays $4 per user a month on Business and $6 on Enterprise, a difference of $480 a year for the same number of seats.

## Costs outside the plan price

Keeper sells several features as yearly add-ons on every plan. Sending events to a security monitoring tool needs Advanced Reporting and Alerts at $12 per user, BreachWatch dark web monitoring costs $24 per user, and Compliance Reports cost $12 per user. Dashlane renews business plans at the full seat count, empty seats included, unless an admin asks to remove seats at least 30 days before renewal.

Minimum team sizes vary as well. NordPass Business and Enterprise need 5 users, Zoho Vault Professional and Enterprise need 5, Proton Pass needs 3 on every plan, and Passbolt needs 10 on Pro, Cloud Business and Cloud Sovereign. Dashlane, Keeper, LastPass and RoboForm sell business plans on annual billing only. 1Password, Bitwarden, NordPass, Proton Pass, Zoho Vault and Passbolt Cloud Business offer monthly billing, which costs more wherever the vendor publishes the monthly price.

## Security claims you can check

Nine of the ten vendors state that they hold a SOC 2 report, and eight state ISO 27001 certification. We found neither statement on RoboForm's site, which publishes summaries of security audits by Secfault Security from 2023 and 2025 instead. Bitwarden and Passbolt publish their full source code, Proton publishes the code of its Pass apps, and Dashlane publishes its client code for review.

Several vendors keep public incident notices. LastPass disclosed in 2022 that an attacker copied a backup of customer vault data. Dashlane reported that a brute-force attack starting May 31, 2026 let attackers download the encrypted vaults of fewer than 20 personal plan users. Bitwarden reported a malicious version of its command-line tool on npm in April 2026, and Passbolt published fixes for a high-severity server issue on October 29, 2026. Each product page links to the vendor's own notice. The [UK National Cyber Security Centre](https://www.ncsc.gov.uk/blog-post/trust-the-tech-using-password-managers-passkeys-to-help-you-stay-secure-online) advises choosing a vendor with a strong security track record, and these notices are part of that record.

Healthcare buyers should read the HIPAA wording closely. NordPass signs a business associate agreement on annual Business and Enterprise plans, and Zoho lists Vault under a SOC 2 and HIPAA report in which it acts as a Business Associate. 1Password and Keeper describe themselves as HIPAA compliant and say they do not sign business associate agreements.

## When someone leaves the team

Two moments put the admin tools to work: an employee leaving, and a person forgetting the master password. Removing a user ends their access to shared vaults, while any password that person saw stays known to them, which means the shared logins that matter most need new passwords after a departure. Work logins kept in a departing employee's personal vault are a separate gap, and a team rule that work accounts go only into shared vaults closes it.

Account recovery works differently from vendor to vendor. Bitwarden lists admin account recovery as an [Enterprise plan feature](https://bitwarden.com/help/password-manager-plans/), and each product's help center describes its own steps for a locked-out user and for an organization whose only admin has left.

## Running your own server

Three products let a business host the password server itself. Bitwarden offers self-hosting on its Enterprise plan, and Passbolt offers a free self-hosted Community Edition for any number of users along with its paid Pro edition. RoboForm offers self-hosting on Enterprise for environments of 1,000 users or more. A self-hosted server puts updates, backups and uptime on the customer's own IT staff.

## Leaving a product later

Export formats decide how easily a team can move to another vendor. 1Password exports to its own 1PUX format or to a CSV file that covers logins and passwords only. Bitwarden exports to plain JSON, plain CSV or encrypted JSON, and Keeper exports to CSV, JSON, PDF or an encrypted KeePass file, which is the only Keeper format that carries attachments. RoboForm exports to its own extended CSV format, which includes passkeys and one-time password keys.

Some vendors lock export down by default. Dashlane members on business plans cannot export until an admin turns on the Allow Export policy, and Passbolt has turned off plain CSV export by default since version 5.10, leaving the encrypted KeePass file as the standard route out. Proton Pass exports only from its browser extension, web app and Windows app, not from its phone apps.

## What to test during a trial

- Remove a test user and confirm that the items they created in shared folders stay with the team.
- Sign in through your identity provider, then find out how an admin gets into the vault if that provider is down.
- Store a shared account's one-time code setup key in a shared item and check that a second user sees the current code.
- Export a test vault in the format your next tool would import, then count the items that came across, attachments and passkeys included.
