---
title: CMDB software compared
definition: Eight configuration management database tools compared on CI records, relationship mapping and change impact views, with the prices each vendor publishes.
primaryKeyword: CMDB software
criteriaApproved: true
writer: Claude (AI draft)
editor: Ram C
signedOffAt: 2026-11-05
updateLog:
  - date: 2026-11-05
    note: First draft. Eight products with a CMDB qualification, seven from existing profiles and Xurrent added as a new profile. Each claim traces to a vendor page named on the product profile. Criteria not yet approved.
---

A configuration management database, or CMDB, records the things an IT team runs and the links between them. Each record is a configuration item, or CI. The links show what depends on what, so a change manager can see what a planned change could affect before anyone approves it.

This page compares eight tools on what their vendor pages say about three things: CI records, relationship mapping and a view of change impact. It does not rank them. It also does not test discovery, data quality or how each impact view behaves during a live change, because this draft read vendor pages and help articles only.

## What a CMDB has to do

A CMDB is more than an asset list. It needs a record for each CI, a way to link one CI to another, and a view that shows what a change would touch. Without the links, the view has nothing to work from, and the change record ends up as a guess.

Vendors describe these parts in different ways. Some explain how CIs get into the database, through discovery scans or imports. Others explain how the links are made, by hand or from a file. A few explain how a change record pulls in the affected items. Those details matter more than general claims about visibility, so the sections below stick to what each page says.

## The eight products

The eight tools are Freshservice, ServiceDesk Plus from ManageEngine, SolarWinds Service Desk, Ivanti Neurons for ITSM, Device42, InvGate Asset Management, SysAid and Xurrent. Each has a product page in this directory.

Freshservice's help articles describe an Asset Management module that holds its CMDB. A new CI takes a display name, asset tag, impact and description, and the record can also hold cost and assignment details. ServiceDesk Plus keeps a CI inventory and can fill the database through discovery scans.

## How each vendor handles relationships and change impact

Freshservice is the most specific of the group about change impact. Its article says the impacted services field fills in once CMDB relationships are set up and assets are added to the change. Upstream links count as non-impacting, and downstream links count as impacting. Admins have to map those links first, because the field depends on them.

ServiceDesk Plus has a relationship map. The help page says users can analyze the impact a CI has on a business service, and that the map shows the number of pending requests, problems and changes. Its enhancements page says the complete set of CIs in a change helps change advisory boards account for the potential service impact.

SolarWinds Service Desk has a CMDB Visual Map that shows dependent CIs as a tree. Its administrator guide says the CMDB helps IT teams assess the risks and impacts of changes, and that impact and risk can be analyzed before a change is decided. The visual map is included in the Premier package.

Ivanti describes its CMDB as a repository of CIs and the relationships between them. Its FAQ says relationship data shows what will be affected before a change is approved. The page gives no detail on how that impact is worked out.

Device42 says its CMDB captures applications, services and infrastructure along with their dependencies. It offers upstream and downstream views to assess change risk, and it says impact analysis can help prevent change-related outages.

InvGate lets users set relationships on each CI, and each link carries a criticality level of Low, Medium or High. The product tour says the map shows where a change might have the most impact. Linking changes to CIs requires the integration with InvGate Service Management.

SysAid lets users create relations on the CI Relations tab or import them from a CSV file. Its CMDB page says the product can predict how a change, such as a server replacement, will affect the environment, users and services. That is a vendor claim, and the page does not explain the method.

Xurrent describes visual maps that link CIs to services, and says they help change managers judge the impact of planned changes. Its pages do not say how the maps are built.

## What the prices look like

Prices are uneven across this group. Freshservice lists Starter at $19, Growth at $49 and Pro at $99 per agent a month on annual billing, with Enterprise on quote. SolarWinds Service Desk lists Essentials at $39, Advanced at $99 and Premier at $124 per technician a month, billed annually. Essentials includes the CMDB. ServiceDesk Plus lists a free Standard edition for up to five technicians, and Standard from $13 per technician a month. SysAid lists ITSM Professional at $59 per agent a month on annual billing, with Enterprise on quote.

InvGate Asset Management lists Starter at $1,499 a year for up to 500 IP devices. Pro costs $5 per IP device a year with a $2,500 annual minimum, and it is the plan that adds licensing contract management. Enterprise starts at $12,000 a year.

Device42, Ivanti and Xurrent publish no prices. Device42's pricing is an annual subscription based on device count, but the page gives no rates. Xurrent says it does not publish specific license pricing, and its plan pages list user counts only.

## Limits and gaps

Several gaps matter before you buy. Xurrent's pages do not say which plans include CMDB features. The Freshservice impacted services list stays empty until relationships exist. The SolarWinds visual map sits in the top tier, and Essentials gets the CMDB without it. InvGate needs its Service Management integration before changes can link to CIs.

Discovery is the other gap. Several pages describe discovery in general terms without listing the systems it supports, so a buyer should check the supported list against their own estate.

## Testing before you pay

Start with the services that matter most, then ask each vendor to load a sample of those services and their dependencies. Ask for a change record that pulls in impacted CIs, and ask which plan includes that view. Ask how relationships enter the database, whether by discovery, import or manual entry, and how stale links are removed.

Get the export terms and the currency for any quote in writing. The SolarWinds pricing page does not name its currency, so its figures are recorded as shown.
