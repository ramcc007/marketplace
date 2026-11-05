---
title: SIEM software compared
definition: SIEM tools compared on published prices, log source coverage, correlation rules and alerting, with quote-only vendors marked as such.
primaryKeyword: SIEM software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-05
    note: First draft. Eight products checked against vendor pages, prices read from pricing pages. Logz.io reused from its log management profile with new Cloud SIEM evidence. Vendors whose feature or price pages could not be read are listed without figures.
---

A security information and event management (SIEM) tool collects logs from across a company's systems, runs rules over them, and raises alerts that an analyst can investigate. It sits between plain log storage and a full security operations center. A team that already stores logs may still need a SIEM to decide which events matter.

This page compares eight tools on the figures and features their vendor pages publish. Each tool had to show three things on its own site: log collection from more than one source, correlation rules, and alerts with a way to investigate them. Prices are shown as published. Where a vendor shows only a quote button, the page says so.

## What a SIEM has to show

Three checks decided which products made the list. The first is log collection from many sources. Microsoft says data connectors are installed from its Content hub and then configured before they start ingesting data. The second is correlation. Microsoft's scheduled analytics rules run a query on a set interval, with a lookback period from 5 minutes to 14 days. Graylog lets a team import Sigma rules from private GitHub, GitLab or Bitbucket repositories.

The third check is alerts and investigation. Microsoft groups up to 150 related alerts into one incident. Logz.io logs a security event each time a rule triggers, and its Investigate button pulls up the logs that caused the trigger.

A product that only stores logs does not pass these checks. Neither does a product whose pages describe rules without saying how an analyst reaches the alert.

## The eight products

The eight are Microsoft Sentinel, Graylog Security, Blumira, Splunk Enterprise Security, CrowdStrike Falcon Next-Gen SIEM, ManageEngine Log360, Elastic Security and Logz.io Cloud SIEM. Logz.io already had a profile for its log management product, and this draft adds Cloud SIEM evidence to it. The other seven have their own profile pages in this directory.

The vendor counts differ in kind. Blumira's pricing page describes unlimited data ingestion and one year of retention on every plan. ManageEngine's Log360 page lists more than 750 source types and more than 2,000 MITRE ATT&CK mapped detection rules. Elastic's page describes 400 or more prebuilt integrations, and up to 1,000 in total. These are the vendors' own figures, and this page does not test them.

## What the prices look like

Four of the eight show a price a buyer can read without asking. Blumira lists Detect at $12, Respond at $16 and Automate at $21 per employee a month, on annual terms. Graylog lists starting prices of $15,000 a year for Enterprise and $18,000 a year for Security, both for volumes from 10 GB a day. Graylog Open is free. ManageEngine lists annual licenses by count, so 10 log sources cost $795 a year and 2 domain controllers cost $945 a year. Logz.io's Log Management costs $0.92 per ingested GB per day with 7 days of retention, and its Cloud SIEM is priced the same way.

The other four show only quote buttons or no figures. Splunk Enterprise Security shows only a Get a quote button. CrowdStrike shows per endpoint labels with no amounts. Microsoft Sentinel lists pay-as-you-go and commitment tiers, but the text we read has no per-GB rate. Elastic's pricing page gives no amounts for its hosted, serverless or self-managed tiers.

Currency is a separate question. The Graylog pricing page does not name its currency, and Blumira also shows dollars without a code. Microsoft says its prices are calculated in US dollars, but its text shows no amounts.

## Ingestion, retention and what drives the bill

Ingestion cost drives the bill on several of these tools. Microsoft prices per GB into its analytics tier, and its commitment tiers reserve daily capacity from 100 GB to 50,000 GB, with savings of up to 52% against pay-as-you-go. Logz.io prices Cloud SIEM by GB ingested and by retention period.

Blumira prices per employee and lists unlimited ingestion, so its stated price does not depend on log volume. CrowdStrike says data from licensed Falcon modules comes in without additional ingestion charges. Retention matters for an investigation as well. Blumira keeps one year on every plan. Microsoft's data lake tier keeps data for up to 12 years, and the Azure portal version of Sentinel stops being supported after March 31, 2027.

## Products left out

Several SIEMs are not on the list. Wazuh's documentation describes log collection, rules and alerts, but we did not read a Wazuh pricing page that shows a price, so no price is stated here. Sumo Logic's pricing page shows only Contact Sales for its Enterprise Suite, which includes SIEM, and its SIEM feature page could not be read. Rapid7's pricing page did not list InsightIDR. Datadog's Cloud SIEM pricing text could not be read in the pages we fetched. These stay off the list until their pages can be checked.

## Testing before you pay

Start by counting the log sources you need on the first day, then count them again after a year. Ask each vendor for the price at that count in writing, including ingestion, retention and any onboarding fee. Blumira's onboarding fee is $250 on Detect and $500 on Respond.

Ask which correlation rules come with the product and whether you can write your own. ManageEngine's page does not say whether customers can author correlation rules, so that question needs a written answer. Ask Splunk, CrowdStrike and Elastic for the same detail on paper, because their pages do not show prices.

Finish with a test on your own logs. Run the same three alerts through two tools, and compare the time each one takes to reach a usable investigation.
