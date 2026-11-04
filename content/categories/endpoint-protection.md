---
title: Endpoint protection software compared
definition: Eight endpoint protection products compared on published prices, malware detection, threat response and management consoles, checked at the vendor.
primaryKeyword: endpoint protection software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages. Prices read twice on November 4, 2026.
---

A company with 50 laptops needs three things from endpoint protection: a way to catch malware, a way to act when something gets through, and one place where an admin can see every device. Those are the three must-haves for this page. The eight products here each state all three on their own websites, and we read each vendor's pages on November 4, 2026. Prices are in US dollars and can differ by region, reseller and contract.

## What endpoint protection covers

Endpoint protection software runs an agent on each laptop, desktop and server. The agent blocks known and suspected malware, records what programs do, and reports to a central service. Business antivirus is the older name for the first job. Endpoint detection and response, usually shortened to EDR, adds the second: a trail of activity that an analyst can search, and actions such as isolating a device or reversing changes after an attack.

The two terms overlap more than they used to. Microsoft's Defender for Business page lists antivirus and EDR as part of one $3.00 per user monthly license. CrowdStrike's Falcon Go bundle lists both antivirus and EDR at its lowest price. A buyer can no longer assume that "antivirus" means a product without response tools.

## How we decided who qualifies

The taxonomy for this category sets three must-have capabilities: malware detection, threat response on endpoints, and a central management console. A product qualifies only when the vendor's own pages support all three. Marketing language that implies a capability without naming it did not count.

Several well-known names are missing for that reason. Bitdefender's GravityZone business page described a single management console and malware defenses, but we could not find an EDR description on a page that loaded, and its price field showed no dollar amount. Palo Alto Networks' Cortex XDR page did not mention endpoint isolation or a cloud console in the text we could read. Trend Micro's page returned an error. Kaspersky's cloud page described malware protection, response and a console, but we left it out because we could not confirm its status for US buyers from a source we could read. These are gaps in our evidence, not verdicts on the products. The inclusion criteria on this page are a draft and have not been approved by an editor.

## Which prices are public

Four of the eight vendors publish a dollar price that we could read, and we read each of those pages twice.

| Product | Listed price | Unit |
|---|---|---|
| Microsoft Defender for Business | $3.00 | per user per month, paid yearly |
| CrowdStrike Falcon Go | $59.99 | per device per year |
| CrowdStrike Falcon Pro | $99.99 | per device per year |
| CrowdStrike Falcon Enterprise | $184.99 | per device per year |
| SentinelOne Singularity Complete | $179.99 | per endpoint per year |
| SentinelOne Singularity Commercial | $229.99 | per endpoint per year |
| Huntress Managed EDR | $8.99 | per endpoint per month (MSRP) |

Sophos and Cisco publish no prices on the product pages we read. ThreatDown bills per year and offers 20% off a three-year term, but its pricing page showed no dollar amounts when we read it. ESET showed a $216.00 figure next to its Premium plan without naming the unit, so we did not turn it into a price.

## What 50 devices cost at list price

A simple calculation shows how the units differ. These figures are our arithmetic from the list prices above, before tax, discounts, partner markup and any add-ons.

For a business with 50 users and 50 devices, Defender for Business comes to $1,800 a year at $3.00 per user per month. CrowdStrike Falcon Go comes to $2,999.50 a year at $59.99 per device, and Falcon Go is capped at 100 devices per purchase. Huntress Managed EDR comes to $5,394 a year at $8.99 per endpoint per month. SentinelOne Singularity Complete comes to $8,999.50 a year at $179.99 per endpoint, and its listed prices apply to 5 to 100 workstations.

Those totals are not like for like. Defender for Business covers up to five devices per user, so a 50-user company with 250 devices pays the same $1,800. The other products price per device. Huntress also includes a security operations center that watches alerts, which the others sell as a separate managed service or a higher bundle.

## Software or a service watching the software

The biggest split in this category is between tools an admin operates and services where the vendor's analysts operate them. Defender for Business, CrowdStrike Falcon Go, Sophos Endpoint and ESET PROTECT Core give a small IT team the agent and the console. Someone inside the company still has to read alerts and decide what to do.

Huntress sells its managed EDR with a 24/7 security operations center, and says it contains the threat and removes the attacker's foothold. ESET's Premium plan includes 24/7 managed detection and response. CrowdStrike's Falcon Complete is the fully managed tier and has no public price. SentinelOne lists managed threat hunting and managed detection and response as add-ons. ThreatDown's Elite MDR and Ultimate MDR Plus bundles are its managed tiers.

A company without a security employee should price the managed option first. A product that raises an alert at 2 a.m. is only useful if somebody is awake to read it.

## What threat response actually means

Every product here claims some form of response, but the actions differ. SentinelOne says its platform can isolate devices, kill malicious processes and roll back changes, with one-click rollback and remediation. Cisco describes one-click isolation of an infected host in its Essentials tier. ThreatDown lists threat monitoring and isolation plus automated endpoint remediation in its Core bundle, and says Ransomware Rollback can restore encrypted files for up to 7 days after an attack.

Sophos describes CryptoGuard, which reverts encrypted files, and Adaptive Attack Protection, which switches to more aggressive protection to contain an attack. Its page did not mention isolating an endpoint, so ask the Sophos reseller how isolation works at the level you plan to buy. ESET's documentation says an administrator can quickly respond to detected threats on remote systems, but the page we read did not name isolation either.

Microsoft says Defender for Business includes automated investigation and remediation and automatic attack disruption. It lists both as features that Defender for Endpoint Plan 1 does not have. For a company on Microsoft 365, that matters because Business Premium also includes Defender for Business.

## Consoles and who can use them

A central console is where a small IT team will spend its time. Microsoft's Defender for Business offers wizard-driven setup and default security policies, and a monthly summary report. Microsoft 365 Lighthouse lets a cloud solution provider view incidents across customer organizations. For a managed service provider, that multi-tenant view often matters more than any single detection feature.

ThreatDown manages endpoints from its Nebula console, which it describes as a single-tenant console. ESET offers a cloud console and an on-premises console, and recommends the cloud one. Sophos manages Endpoint, EDR and XDR from Sophos Fusion, which it also uses for the rest of its portfolio. CrowdStrike describes one agent and one console. Cisco ties Secure Endpoint to Cisco XDR for a unified view of incidents.

Buyers with strict data residency needs or no internet access should check the on-premises option. Among the eight, only ESET stated one on the pages we read.

## The CrowdStrike outage and kernel access

Endpoint agents sit deep in the operating system. Microsoft wrote in July 2024 that many security vendors, including CrowdStrike and Microsoft itself, use a kernel driver architecture. It said kernel drivers give visibility and tamper resistance "at the cost of resilience," and it listed reducing the need for kernel drivers as a goal. The post is part of Microsoft's response to the July 2024 CrowdStrike incident, which crashed Windows devices.

The lesson for a buyer is practical. Ask each vendor how it tests content updates, whether customers can delay them, and what recovery steps exist if a device will not boot. Those answers are rarely on a pricing page, so ask for them in writing before signing.

## Terms to read before signing

Contract terms vary and several vendors do not publish them. Microsoft states that Defender for Business is an annual subscription that renews automatically, with a one-month free trial that converts to a paid subscription. Huntress states a standard 12-month term, no multi-year price protection, and a 50-seat minimum per product for resellers and direct customers. Managed service providers face no Huntress-required seat minimum. CrowdStrike offers a 15-day free trial with no credit card.

SentinelOne's page says purchases go through an authorized partner and that the partner's price controls if it differs from the page. Treat every list price in this category as a starting point for a reseller conversation. We did not find published statements on data export or cancellation fees for most of these vendors, and we leave those fields empty rather than guess.

## What to test during a trial

- Install the agent on a spare laptop, then run the EICAR test file from eicar.org and note what the console records and how fast.
- Isolate that laptop from the console and time how long it takes to lose and regain network access.
- Ask who answers an alert at night, and get the response commitment in the contract.
- Ask the reseller for the price of the same bundle for 12 months and for 36 months.
- Remove the agent from a test device and check whether the console shows the removal or lets a user turn protection off.
