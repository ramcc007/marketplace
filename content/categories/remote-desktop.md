---
title: Remote desktop software compared
definition: Three remote desktop tools checked against vendor pages, with prices, session logging, self-hosting and the abuse risks of remote access.
primaryKeyword: remote desktop software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Three products checked against vendor pages. More vendors are waiting on prices we could read and confirm.
---

Remote desktop software lets one person see and control another computer over the internet. IT staff use it to fix a laptop in another city, small businesses use it to reach an office PC from home, and managed service providers use it to support hundreds of client machines. This page lists the products that meet our three entry tests: remote control of computers, unattended access and session security and logging. We read every price and claim on the vendor's own site, and each product page links to the pages we used.

## Only three products qualify so far

The count is small on purpose. A product is listed here only when we could read a clear price and find a vendor page for each of the three entry tests. [Splashtop](/products/splashtop), [ScreenConnect](/products/screenconnect) and [RustDesk](/products/rustdesk) met that bar. Several better-known names did not, for reasons that have nothing to do with their quality.

Some vendors load prices with scripts that our fetching could not read, and some block automated requests. A few show a price table that we could not match to plan names. We would rather leave a product out than guess at a number, so the omissions below say what was missing. They will be added as soon as a price can be read and confirmed twice. This page also falls short of the eight qualifying products that our own quality gate asks for, so it stays out of search indexes until more are verified.

## What the three entry tests mean

Remote control means the operator sees the other screen and uses the keyboard and mouse as if seated at the machine. That excludes tools that only share a screen for viewing.

Unattended access means a technician can connect to a computer when nobody is sitting at it. The computer runs a small background program, often called an agent, that stays signed in to the vendor's service or to the buyer's own server. Without it, every session needs a person at the far end to read out a code, which is useless for servers, kiosks or an office PC reached at night.

Session security and logging means the buyer can find out who connected to what and when. At a minimum that is a log of connections. Better products also record the session video and let an administrator limit what each technician can reach.

## Why logging matters more than it first seems

Remote access tools are a favorite of criminals because they are legitimate software that antivirus products rarely flag. In January 2023 CISA published [advisory AA23-025A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-025a) about a phishing campaign that used help desk themed emails. Victims were steered to a website that downloaded remote access software, and the advisory names AnyDesk and ScreenConnect. The tools ran as portable executables that needed no installation and no administrator rights.

Once connected, the attackers got victims to sign in to their bank accounts and then altered the balance shown on screen to fake an overpayment. They told the victim to refund the difference. CISA says legitimate remote tools can also give criminals persistence and a way to control the machine, and that help desks and managed service providers are attractive targets because one compromise can reach their customers.

The advisory's recommended steps are a useful buying checklist. CISA advises inventorying which remote tools are authorized, reviewing logs for portable copies, allowlisting approved programs and blocking unauthorized ones. A product with good logs makes the first two steps easier, and a business that standardizes on one tool can block the rest.

## Patching matters most when you host the server

Where the server runs changes who patches it. On February 19, 2024, ConnectWise [disclosed CVE-2024-1709](https://www.connectwise.com/company/trust/security-bulletins/connectwise-screenconnect-23.9.8), an authentication bypass rated 10 on the CVSS scale, in self-hosted ScreenConnect 23.9.7 and earlier. The bulletin says ConnectWise fixed its own cloud instances. Self-hosted customers had to upgrade to version 23.9.8 or later.

The original bulletin said there was no evidence of exploitation in the wild. A later update records that CISA added the flaw to its Known Exploited Vulnerabilities catalog on February 22, 2024. The lesson applies to every self-hosted product, including RustDesk, whose paid plans run on the buyer's server. A business that hosts its own server takes on the job of installing security updates quickly, and a missed update can expose every computer the server manages.

## How the three compare on price

The three products price in very different units, so a table of list prices is misleading without a team size.

Splashtop charges per user. Its Pro plan costs $99 per user per year, so a team of 10 pays $990 a year. Pro adds session recording and role-based access management over the $72 Solo plan. The Enterprise plan is quoted and adds single sign-on, SIEM logging and cloud recording.

ScreenConnect charges per concurrent technician, meaning the number of technicians who can be connected at the same moment. A help desk with 3 technicians on the Standard plan pays $1,692 a year when billed annually at $47 a month each. The same team billed monthly at $62 each pays $2,232, which is $540 more. Standard includes unlimited unattended access and session recording, while video auditing is listed for Premium only.

RustDesk is the cheapest and the only one with a free tier. The Individual plan costs $11.88 a month billed annually and covers 1 login user and 20 managed devices. The Basic plan costs $23.88 a month billed annually for 10 login users and 100 managed devices, which works out to $286.56 a year. Each extra device on the Customized plan adds $0.12 a month.

All prices here are in US dollars as listed on the vendors' US-facing pages. Vendors may show different prices, taxes or currencies in other countries, so confirm the figure for your location before you buy.

## Two models: per person or per technician

A per-user price suits a small business where each employee reaches their own desktop from home. Splashtop's Solo and Pro plans fit this pattern. The cost grows with headcount whether or not people connect often.

A per-concurrent-technician price suits a support team. A company with 12 agents who rarely work the same hour might need only 4 concurrent licenses, and ScreenConnect's pricing is built around that idea. The risk is the opposite one. A busy day with 5 people connecting at once needs a fifth license or someone waits.

RustDesk's price scales with managed devices and login users, and the Customized plan lets a buyer add either one separately. That suits a company with many machines and a few administrators.

## Self-hosted and cloud

RustDesk's paid plans are self-hosted. Its pricing page says they are not a SaaS subscription, and the free tier is open source with community support. The buyer needs a server, a person to maintain it and a plan for patches. In exchange, connection data stays on infrastructure the buyer controls.

Splashtop and ScreenConnect both sell cloud service. ScreenConnect also offers a version the buyer hosts, and its site says buyers can host it their way, on premises or in the cloud. A buyer choosing the cloud version hands the patching to the vendor, as the 2024 bulletin shows.

## Security claims we could and could not check

Splashtop's security page says the company is compliant with ISO/IEC 27001, SOC 2, GDPR and CCPA. It says remote sessions use TLS and 256-bit AES encryption, and that two-factor authentication on endpoint devices is optional. The page says Splashtop supports HIPAA needs, which is not the same as holding a HIPAA certification, so we record HIPAA as unknown.

For ScreenConnect we found a statement that ConnectWise is audited by independent third parties, but no named certification on the pages we read, so the certification fields are blank. Its features page does say SAML single sign-on is supported and that administrators can filter audit logs by session name. RustDesk's pricing page lists two-factor authentication, an audit log and OIDC single sign-on from the Basic plan, and names no compliance certifications.

A blank field is not a failing mark. It means we found no statement on a vendor page and did not want to assume one. Ask the vendor for its current report before a purchase that depends on it.

## Contract points worth checking

RustDesk sells annual plans only and says it does not auto-renew. It sends an email 14 days before a license expires. Bank transfers carry an extra fee and the license key arrives 3 to 5 working days after the payment.

ScreenConnect lets a buyer pay monthly on its Standard and Premium plans at a higher rate, and its One plan is annual only. The pricing page states no trial length, so ask before you rely on a trial period. Splashtop also offers free trials on every plan without stating a length.

None of the three pages we read gave us a clear renewal, cancellation or data export policy that we could cite, so those fields are blank on the product pages.

## Vendors we did not list and why

LogMeIn Resolve's page lists unattended access, session recording, single sign-on and multi-factor authentication on all three of its plans, with a 25 endpoint minimum. The page we read showed a currency selector and "per month, billed annually" but no dollar amounts, so we left it out.

ISL Online's page shows a 15 day free trial covering 1 user and 5 managed devices, and SSO on its higher plans. Its paid plans showed no readable dollar amount, with "contact us" on most.

Zoho Assist's page offers a 15 day trial and a free plan, and its unattended access tier is documented. Our fetch returned no dollar amounts. ManageEngine's Remote Access Plus page shows a free edition for 10 computers and 1 technician, but our two readings of its paid price table disagreed on which prices belong to which edition.

TeamViewer and AnyDesk blocked or failed our fetches of their pricing pages, so we could not check their prices. Chrome Remote Desktop, MeshCentral and Apache Guacamole are free, and Google's help page says Chrome Remote Desktop sessions are fully encrypted and that a shared support session must be reconfirmed every 30 minutes. We could not find a vendor page documenting session logging for them.

## What to test during a trial

- Install the agent on a spare computer, reboot it and connect without anyone present.
- Connect as a technician, then open the log and find your own session by user, device and time.
- Check whether the product can record the session video and whether that needs a higher plan.
- Turn on two-factor authentication for the account and confirm that every technician is forced to use it.
- If you self-host, write down who will install security updates and how fast they can do it.
