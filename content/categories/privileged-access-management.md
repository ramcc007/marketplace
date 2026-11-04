---
title: Privileged access management software
definition: Seven privileged access management products checked for vaulting, session recording and just-in-time access, with the pricing models each vendor uses.
primaryKeyword: privileged access management software
criteriaApproved: true
writer: Claude (AI draft)
editor: Ram C
signedOffAt: 2026-11-05
updateLog:
  - date: 2026-11-04
    note: First draft. Seven products checked against vendor pages, two of them added to existing product files.
  - date: 2026-11-05
    note: Second pass. Removed claims the vendor pages did not support, dropped the unverified exclusion notes, and rewrote the body in our own words.
---

An IT lead who inherits a shared spreadsheet of domain admin passwords has a plain problem. Nobody can say who used an account last week, or whether its password changed after a contractor left. Privileged access management software is built to answer those questions. This page covers seven products that we checked against vendor pages in November 2026, and it says where the evidence is thin.

## What the category covers

A privileged account is any login that can change systems, not just use them. Domain administrator accounts, root on a Linux host, database owners and cloud console owners all qualify. Privileged access management, usually shortened to PAM, puts controls around those accounts.

We list a product only when its vendor pages show three capabilities. Admin credential vaulting means privileged passwords or keys sit in a store and are issued or rotated under policy. Session recording means the product records what an admin did on a target system. Just-in-time access means access is granted for a limited time and then removed. These criteria are still a draft, pending editor approval.

A [password manager](/software/password-manager) can store a shared admin login, but it usually does not record the session or expire the access. [Identity and access management](/software/identity-access-management) products decide who may sign in. A PAM product controls what happens after an admin signs in to a server.

## Why the stakes are high

Verizon's 2026 Data Breach Investigations Report page says 31% of breaches now start with software vulnerabilities, beating stolen passwords as the top way attackers get in. The page does not give a percentage for stolen passwords, so we do not quote one.

For a buyer, the account matters more than the entry point. A stolen password for an ordinary user is one problem. A stolen password for a domain administrator can reach far more systems, and PAM exists to limit that reach.

## How these products charge

Four of the seven publish a figure we could read, but only two of those prices are for PAM itself. Monofor's page lists a price for Monosign, its identity product, and Okta's figure covers a workforce suite that includes PAM.

[ManageEngine PAM360](/products/manageengine-pam360) publishes a full table. An annual subscription costs $7,995 for 10 administrators and 25 keys, and $49,995 for 200 administrators and 1,000 keys. Maintenance and support are included in the subscription. A perpetual license for the smallest tier costs $19,995, plus $3,999 a year for maintenance and support. The page offers a free edition for one administrator and up to 10 resources, with no expiry. Its FAQ says a perpetual license costs three times the annual subscription. The table shows about two and a half times, so ask which figure applies. The page uses a dollar sign without naming a currency.

[Devolutions PAM](/products/devolutions-pam) costs $650 per user per year, billed annually. Its lower tiers are $48 per user per year for workforce password management, $265 for remote access management and $400 for remote desktop management and IT operations. Teams of 100 or more are offered a custom solution. For a team of 20 administrators the list price works out to $13,000 a year, which is simple multiplication and not a quote.

[Okta](/products/okta) includes Privileged Access in its Essentials suite, which is listed at $17 per user per month. The page says all suites are billed annually, and it notes a $1,500 annual contract minimum for Okta Workforce Identity. Essentials covers two Privileged Access admins. This is a sign-in product that adds PAM, not a dedicated PAM contract.

The other four publish no PAM price. [Delinea Secret Server](/products/delinea-secret-server) asks you to contact the company for pricing. [Securden Unified PAM](/products/securden-unified-pam) is licensed by the users who access its PAM interface. [Monofor Monopam](/products/monofor-monopam) is licensed by concurrent privileged sessions, and its page says you pay for sessions rather than for each target, vault or feature. [KeeperPAM](/products/keeper), Keeper's PAM product, is charged per user and billed annually, but its page shows no price.

The unit of measure changes who pays more as a company grows. Per admin and per key pricing suits a small, stable team with a large server estate. Per concurrent session suits a team with many occasional users. Per user suits a team that knows exactly how many people need the console. Before asking for quotes, count three numbers: the people who request access, the people who approve it, and the most sessions open at one time.

## Vaulting, recording and expiry compared

Vaulting wording differs from one vendor to the next. ManageEngine says PAM360 encrypts stored credentials with AES-256 in two layers, and shares them under View, Modify and Manage permission levels. Delinea's page lists check-in and check-out, role-based access and approval workflows. Keeper says discovered accounts are imported into the Keeper Vault as managed resources. Okta vaults local server account passwords, Active Directory accounts, service accounts and database passwords, and rotates sensitive credentials such as API keys. Devolutions' 2026.3 release notes mention PAM credentials in shared vaults. Monofor lists an encrypted credential vault under Monopam.

Session recording is where the products diverge most. Monofor records video and keystrokes. Keeper says it can record screen and keyboard activity across SSH, RDP, VNC, database and browser sessions. Okta records SSH and RDP sessions and provides auditing for them. Securden says it can launch, proxy, monitor and record RDP, SSH and SQL sessions. ManageEngine records RDP, SQL, VNC and SSH or Telnet sessions, saves playback in its own recording formats, and allows session shadowing, where a supervisor joins a live session. Devolutions says a reviewer can watch a session as it happens or review the recording afterwards. Delinea says it records and monitors every privileged session and keeps audit trails.

Just-in-time access is the newest of the three and the one described most loosely. Devolutions says it grants access only for the moment it is needed and then revokes it, and its 2026.1 release notes list time-boxed access to PAM accounts. Okta grants temporary, time-bound access that expires automatically after a set window. Keeper describes zero standing privileges with just-in-time elevation on Windows, Linux and macOS, with optional approval and MFA. Securden describes time-limited access and just-in-time privilege elevation across workstations. ManageEngine says admins can revoke access to passwords for a set period, and that passwords are rotated when the requested window ends. Monofor lists just-in-time access with approvals. Delinea's Secret Server page links to a separate just-in-time page, which we did not read.

A practical test covers all three at once. Ask the vendor to show a ticket-linked request, an approval, a session on a Linux host, the recording of that session and the password reset after the window closes. A product that does all of that in one demo meets the intent of this category.

## Products added through other pages

Keeper is best known as a password manager. Its PAM product, KeeperPAM, has its own page, which says the company charges per user and bills annually. The page shows no price, and it says the trial length is not stated. We did not find a breakdown of which tier includes session recording and elevation, so ask for one in writing.

Okta sells Privileged Access inside its workforce identity suites. Essentials lists it at $17 per user per month, with two Privileged Access admins. Okta's Privileged Access page shows no price, but it offers a free trial and a sales contact. A company that already runs Okta for sign-in can test whether the add-on covers its servers before comparing it with dedicated products.

## Evidence we could not close

We did not judge vendors that are not on this page. Some product pages did not load in our checks, and some did not show all three capabilities together, so we left those vendors off until their own pages show them.

Three entries rest on weaker evidence than the rest. Delinea's just-in-time claim depends on a link to a separate page we could not read. Monofor's three capabilities all come from one pricing page. Devolutions' vault capability comes from release notes, not from a product page.

## Contract points to check

Vendors differ on what a buyer can learn before talking to sales. Ask each one for the licensing unit in writing, the tier that includes recording and just-in-time access, the term length and the renewal terms. Ask ManageEngine which perpetual license figure applies to your order. Ask Keeper which tier includes session recording and elevation. Ask Monofor whether the 30-day trial shown on its pricing page covers Monopam, since the only trial button on that page sits under Monosign.

Security attestations are patchy. Securden's page shows ISO/IEC 27001, SOC 2 Type II and GDPR badges, and says the product is independently certified and penetration tested. The pricing and product pages we read for the other vendors did not show comparable badges. Ask each vendor for its current SOC 2 report under a non-disclosure agreement before you put domain admin passwords into its service.

Finish with a measurable check. Run the vendor's free trial or free edition against five real accounts, and time how long it takes to onboard a Windows server, a Linux host and a database. The vendor with the shortest onboarding for your own systems is the one your team is most likely to keep using.
