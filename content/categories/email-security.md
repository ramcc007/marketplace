---
title: Email security software compared
definition: Eight email security products compared on phishing and malware filtering, impersonation protection, quarantine controls and published pricing.
primaryKeyword: email security software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Seven products checked against vendor pages and documentation.
  - date: 2026-11-05
    note: Eighth product added. Mimecast Email Security's own pages confirm phishing filtering, impersonation protection and quarantine for review, and it publishes no price. Proofpoint, Hornetsecurity, Abnormal and Cloudflare Email Security were checked and left out, with reasons given on the page.
---

Email security software sits between the internet and a mailbox. It scans inbound messages for phishing links, malicious attachments and forged senders, then delivers, tags or holds each message. The eight products on this page each filter phishing and malware, protect named people or domains from impersonation, and give administrators a quarantine to review. We read each vendor's own product pages and documentation, and every product page links to the sources we used.

Two limits shape this page. Most vendors in this category publish no prices, so we can compare how each one sells but not what each one costs. We also did not test detection rates. The catch-rate percentages that vendors quote are their own claims, and we repeat one only when we label it that way.

## What the three required capabilities mean

A product earns a place here only if its own pages show all three of the following.

Phishing and malware filtering means the product inspects links and attachments and blocks or holds the dangerous ones. Impersonation protection means it checks whether a sender is pretending to be a specific person, brand or domain, which is a different test from checking whether the message was authenticated. Quarantine management means an administrator can look at held messages and release or delete them, rather than only seeing a log of blocked mail.

The impersonation point deserves a closer look because it is where products differ most. Microsoft's documentation draws the line clearly. Spoofing is an attacker forging the sender address or domain, and basic checks based on SPF, DKIM and DMARC can catch it. Impersonation is an attacker mimicking a trusted user, domain or brand, often with a lookalike domain that has valid DNS records. Such a message can pass authentication and still be fraudulent.

## Why the rules for bulk senders changed the conversation

Email security used to be mostly about what arrives. Two rule changes have made what you send part of the same job.

Google's sender guidelines cover senders of more than 5,000 messages a day to Gmail accounts. They must set up SPF, DKIM and DMARC for the domain and keep the spam rate in Postmaster Tools below 0.30%. Marketing mail must support one-click unsubscribe. Google recommends staying below 0.10%. The DMARC policy for these senders may be set to none, so the rule requires a record to exist, not enforcement. These requirements started on February 1, 2024.

Yahoo's sender requirements are close. All senders must authenticate with SPF or DKIM at a minimum and keep the spam rate below 0.3%. Bulk senders must implement both SPF and DKIM, publish a DMARC policy of at least p=none that passes with an aligned From domain, and honor unsubscribe requests within 2 days. Yahoo says enforcement began in February 2024 and was rolled out gradually.

For a buyer, the practical effect is that a company needs a working DMARC record whether or not it buys any filtering product. Inbound filtering does not publish your records. A DMARC record is a DNS entry you control, and the filtering products below only read other people's records when they judge incoming mail.

## How DMARC relates to filtering

DMARC lets a domain owner say what receivers should do with mail that claims to come from the domain but fails authentication. A policy of none asks receivers to take no action, quarantine asks them to hold the message, and reject asks them to refuse it.

Filtering products act on the sender's policy in different ways. Microsoft's anti-phishing policies include a setting to honor the sender's DMARC policy. When the setting is on, a spoofed message from a domain that publishes p=quarantine can be quarantined, and one from a domain that publishes p=reject can be quarantined or rejected. When the sender publishes p=none, Microsoft 365 takes no action based on DMARC, although other filters can still act on the message.

The same Microsoft page adds a detail worth knowing before you point a third-party filter at Microsoft 365. If the MX record sends mail to a non-Microsoft service first, the honor-DMARC setting applies only when Enhanced Filtering for Connectors is turned on. Check this with whoever sets up the connector, because mail that skips the setting gets less protection than the policy screen suggests.

DMARC and the products on this page cover different problems. DMARC protects your own domain from being forged against outsiders. Impersonation protection in a filter protects your staff from lookalike senders and display-name tricks aimed at them, and a lookalike domain is not your domain, so DMARC cannot stop it.

## Two ways to deploy

The products split into two deployment styles, and the choice affects price, risk and what quarantine means.

Gateway products take over delivery. You change the MX record so mail reaches the vendor first, and the vendor passes clean mail on. Barracuda's Email Gateway Defense works this way, and the Barracuda documentation lists it as included in the three Email Protection plans. The advantage is that a threat never reaches the mailbox. The cost is a change to mail routing that has to be right the first time.

Mailbox-integrated products connect to Microsoft 365 or Google Workspace. [Sophos Email](/products/sophos-email) shows a quarantine tab for Microsoft 365 in its admin console, and [Check Point Harmony Email and Collaboration](/products/check-point-harmony-email) is sold for Microsoft 365 and Gmail. Cisco's data sheet lists enforcement actions for [Cisco Secure Email Threat Defense](/products/cisco-secure-email-threat-defense) that include moving mail to Quarantine. Products that work on mail the platform already accepted avoid the MX change, so ask each vendor how quickly it pulls back a message that has reached the mailbox.

[Microsoft Defender for Office 365](/products/microsoft-defender-for-office-365) is part of the Microsoft 365 platform itself, so its policies sit in the Microsoft Defender portal and need no routing change. We have not checked how the other vendors deploy beyond what their pages state, so confirm the method with each one. [SpamTitan](/products/spamtitan), [TrendAI Email Security](/products/trendai-email-security) and [Cisco Secure Email Threat Defense](/products/cisco-secure-email-threat-defense) fall into that last group.

## The eight products

[Microsoft Defender for Office 365](/products/microsoft-defender-for-office-365) is the only product here with a published price. Plan 1 is $2 per user per month and Plan 2 is $5, both paid yearly on an annual subscription that auto-renews. Microsoft's basic anti-phishing protection comes with every cloud mailbox, but impersonation settings, phishing thresholds and the rest are exclusive to Defender for Office 365. Each anti-phishing policy can protect up to 350 users and 50 custom domains from impersonation, and by default none are configured, so the protection does nothing until an administrator lists the people and domains to watch. Microsoft also offers a 90-day trial of Plan 2.

Microsoft's quarantine documentation shows how much control administrators get. Malware and high-confidence phishing are always quarantined and users cannot release their own malware messages. Spam and phishing quarantine is kept for 15 days in the default anti-spam policy and 30 days in the Standard and Strict presets, and messages are permanently deleted when the period ends.

[Sophos Email](/products/sophos-email) is managed from Sophos Central. Its impersonation protection has three checks, for VIPs, brands and general impersonation, with a banner or quarantine as the action. Its anti-malware policy uses heuristic checks and sandbox analysis, and an M365 quarantine tab lets administrators search messages that Microsoft quarantined and release or delete them. Sophos publishes no price and directs buyers to a Get pricing option.

[Barracuda Email Protection](/products/barracuda-email-protection) is sold in six plans, three of which add the gateway filter. Its pricing page leaves the per-user figure blank in the text we could read, shows a Get Custom Quote option, and says minimums apply without stating them. Treat Barracuda as a quote-based purchase until a written quote says otherwise.

[Cisco Secure Email Threat Defense](/products/cisco-secure-email-threat-defense) detects both user and brand impersonation and draws on sandboxing and retrospection for malware. It is sold as a subscription with 1-, 3- or 5-year terms, so the contract length is a decision in its own right.

[SpamTitan](/products/spamtitan) from TitanHQ documents its impersonation tests in detail. A test named ANTISPOOF_NAME catches mail sent with the From name of a high profile person, and each triggered test adds 5 points to the spam score. TitanHQ shows no prices and offers Contact Sales and a quote form.

[Check Point Harmony Email and Collaboration](/products/check-point-harmony-email) comes as Advanced Protect or Complete Protect, each in an Email Only or an Email and Collaboration form, with a 14-day trial and a custom quote. Its anti-phishing engine includes nickname impersonation detection for senders who mimic executives. A February 2023 Check Point post says administrators can let end users release Suspected Phishing emails without approval, which is a setting to think through before you enable it.

[TrendAI Email Security](/products/trendai-email-security) filters phishing, spam, virus and business email compromise mail. Its high profile users list is the impersonation control, checking mail that forges the display names of the people on it. Administrators use the Query screen to review quarantined messages, delete them or release them for further scanning.

[Mimecast Email Security](/products/mimecast-email-security) scans every email, attachment and URL for phishing and spear-phishing attacks. Its product page says the FAQ covers impersonation fraud detection, and its advanced scanning checks branding and login page impersonation. Its targeted attack protection page says suspicious emails can be blocked, quarantined for review or tagged with a warning. That page does not say who can release a held message. Mimecast publishes no price, and its product page offers only quote and sales links.

Four well-known products did not make the list. Proofpoint, Hornetsecurity, Abnormal Security and Cloudflare Email Security were checked against their own pages. Proofpoint's pages describe phishing detection and impostor protection but do not confirm admin or user release from quarantine on a page we could read. Hornetsecurity's spam and malware page describes a quarantine that users can release from the spam report, but we did not find an impersonation feature on a page we could read. Abnormal's page does not describe a quarantine for review. Cloudflare's page describes no filtering feature in the three areas we checked.

## What the price pages tell you

Seven of the eight products publish no price. That is common in this category, and it changes how to shop.

Ask each vendor for a written quote that states the unit being counted. Mailboxes, users and domains are all plausible units, and shared mailboxes and service accounts may or may not count. Ask for the contract length, because Cisco lists terms of one, three and five years and Microsoft's plans renew automatically each year. Ask what is excluded from the plan you are quoted. Barracuda splits its offer into six plans, and Check Point has two packages across two forms, so the cheapest line on a quote may omit the feature you wanted.

Microsoft's $2 and $5 figures give a floor for comparison, but they are list prices for add-on protection. We did not verify what a Microsoft 365 licence itself costs, so those figures are not a total.

## How to choose

Start with where your mail lives. A company on Microsoft 365 already has basic anti-phishing in every cloud mailbox and can add Defender for Office 365 for $2 or $5 a user. The other seven products then have to justify their cost against that baseline, which means testing them against your own mail.

Run a trial with real traffic before you sign. Check Point lists 14 days and Microsoft lists 90 days for Plan 2. Put the vendor in monitor mode first if it offers one, log what it would have blocked for two weeks, and compare the list with what your current filter caught.

Test impersonation on purpose. List five executives and the finance team's approvers, then send test messages from a lookalike domain and from a personal address using an executive's display name. Check whether each product tags, holds or ignores them, and whether the quarantine lets the right person release a false positive.

Check who can release held mail. Microsoft stops users releasing their own malware messages from quarantine, and Check Point lets administrators allow users to release suspected phishing. Mimecast's page says suspicious mail can be quarantined for review but does not name the person who releases it. Decide whether your help desk or your users will review held messages, and confirm the product allows that split.

Finally, fix your own domain's DMARC record. If you send more than 5,000 messages a day to Gmail accounts, Google requires it, and Yahoo requires a passing record from bulk senders. A filter on your inbound mail will not cover that gap.
