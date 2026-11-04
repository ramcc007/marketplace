---
title: Backup software for business computers and servers
definition: Eight backup products compared on prices checked at the source, schedules, restore points, encryption, storage terms and how each one is bought.
primaryKeyword: backup software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages and help documentation.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

A small office with twenty laptops and one file server loses a drive on a Monday morning. The person who set up the backups needs to know when the last good copy ran and whether a file can come back as it looked last Thursday. The eight products on this page each run backups on a schedule, keep restore points, and encrypt the data. We read the vendor's own pricing, help and product pages, and each product page links to the pages we used.

## What backup software has to do

A backup product copies data somewhere else on a plan, keeps more than one copy in time, and lets an administrator pull back a chosen file or system. Our inclusion test has three parts: scheduled backups, point-in-time restore and encryption. A vendor had to document all three on a page we could read. Several better-known names did not make the page because we could not read a price or a capability source for them, and the exclusions are listed further down.

Microsoft's services agreement shows why this matters even for people who already pay for cloud software. The version effective September 30, 2026 [tells customers](https://www.microsoft.com/en-us/servicesagreement) to regularly back up their content and data, says Microsoft cannot retrieve content after an account is closed, and says its services may be unavailable from time to time. A cloud suite is not a backup, and the agreement says so in plain terms.

CISA's [ransomware guide](https://www.cisa.gov/stopransomware/ransomware-guide) gives the working checklist. It tells organizations to maintain offline, encrypted backups of critical data, explains that many ransomware variants try to find and delete or encrypt accessible backups, and says to test backups regularly. Two of those points shape the comparison below. Encryption is part of the entry test, and restore testing is the last item in the buyer checks at the end.

## Three ways these products are sold

The eight products fall into three groups, and the group tells you more about the bill than the feature list does.

The first group sells a cloud service with storage included. [Backblaze Business Backup](/products/backblaze) costs $99 a year per computer with no stated cap on data. [CrashPlan](/products/crashplan) charges per user, per server or per Microsoft 365 or Google Workspace user. [Carbonite](/products/carbonite-safe) sells three tiered plans with a set amount of storage. [IDrive 360](/products/idrive-360) prices by device count and gives each device a 10 TB quota.

The second group sells software and leaves the storage to the buyer. [Arq Backup](/products/arq-backup) is a $59.99 license per computer with no storage included, so the buyer pays a cloud provider, a NAS or an SFTP server separately. [Duplicati](/products/duplicati) is open-source software that writes to Amazon S3, Azure, SFTP, a NAS and many other destinations, and its paid plans cover monitoring and some storage.

The third group sells to infrastructure teams through quotes and resellers. [NAKIVO Backup & Replication](/products/nakivo-backup) and [Veeam Data Platform](/products/veeam-data-platform) show no dollar amounts on the pages we read. Both are licensed per workload and aimed at virtual machines, servers and larger environments.

## Entry prices

Prices below are the ones shown to a visitor from the United States, in dollars. We could not test whether the figures change by country, and several vendors say little about regional pricing, so check the checkout page for the country where the invoice will go.

The cheapest ways in are Arq at $59.99 once per computer and Backblaze at $99 a year per computer. Arq leaves out storage, so the real yearly cost depends on the provider chosen. Backblaze's page also offers monthly and two-year billing, with the two-year option labeled as a saving of 8%, but it shows no price for either, so we list only the yearly figure.

CrashPlan's small-business prices are $88 a year per user for endpoints, $189 a year per server, and $30 a year per user for Microsoft 365 or Google Workspace. Its two-year prices are $158 for endpoints and $284 for servers. The pricing page contradicts itself on endpoint storage: the plan card says unlimited cloud storage, while an FAQ entry says endpoint subscriptions include 50 GB. Ask the vendor which applies before signing up. Organizations with 250 or more employees get custom pricing.

Carbonite shows $230.39 a year for Core, $639.99 for Power and $1,039.99 for Ultimate, each marked 20% off. The list prices are $287.99, $799.99 and $1,299.99, and the page states no end date for the discount. Core covers up to 25 computers with 250 GB of storage, Power adds one server and 500 GB, and Ultimate allows unlimited servers.

IDrive 360 starts at $14.95 a month for 5 devices, or $112.12 for the first year of a yearly plan with a 25% discount. After the first year the normal yearly rate applies. Duplicati's Free plan monitors 2 machines at no cost, and Enterprise is listed from $3 per machine a month for at least 10 machines. The Pro card shows both $2 and $2.50, so we do not publish a Pro price.

## Storage and overage charges

Included storage is where bills drift. Carbonite charges $99 for each extra 100 GB. CrashPlan charges $90 a year for each extra 250 GB on servers and on Microsoft 365 and Google Workspace plans. IDrive 360 charges $6 per TB a month above 10 TB per device and $2.95 a month for each device over the plan limit. Duplicati lists $0.60 per 100 GB a month, billed yearly, with Pro including 100 GB per machine.

Backblaze is the unusual case because longer history is the paid extra. The default keeps old and deleted versions for 30 days, a one-year setting is free, and Forever retention costs $0.006 per GB a month for files older than one year. A longer setting applies only to files changed after it is turned on, so a team that wants a year of history should switch it on before the first incident.

## Schedules and restore points

All eight products back up on a plan, though they differ in how much of the plan the buyer controls. Carbonite and Backblaze default to continuous backup, with Carbonite also allowing a scheduled mode. CrashPlan's Essential page says automated backups run every 15 minutes, and its server product lists customizable intervals and no-backup windows. Arq says it can back up hourly or daily. IDrive 360 offers a start time, daily or weekday runs, an optional cut-off time, and a catch-up run when a missed computer starts again.

Restore points show up in three forms. Carbonite keeps up to 12 versions of a changed file: a daily version for the past week, one weekly version for three weeks and one monthly version for two months. IDrive 360 stores up to 30 versions per file and takes a daily immutable snapshot, with date-based restore available to accounts created or devices added on or after March 5, 2024. Veeam and NAKIVO work with restore points or recovery points, kept under a retention policy. Veeam's quick start guide counts them in days. NAKIVO supports grandfather-father-son retention and a method that sets a separate keep-for period on each schedule, and can make recovery points immutable for a chosen number of days.

Arq uses an APFS snapshot on macOS or a VSS snapshot on Windows as the source of each backup, so every backup reflects one moment instead of files changing mid-copy. It can also thin backup records as they age. Duplicati restores the newest version by default and offers a dropdown to pick an older one.

## Encryption and who holds the key

Every product here encrypts data, but the key arrangement differs, and that decides who can read a backup after a breach and who can recover it after a lost password. Backblaze protects a symmetric AES-128 key with 2048-bit public and private keys and lets an account use its own private key. CrashPlan lists AES-256 at rest and TLS 1.2 or later in transit, with customer-controlled keys on its server product. Carbonite uses AES-256 and TLS 1.2 and lets Windows customers manage their own key, but not Mac customers. Carbonite warns that if the key file or password is lost, it cannot restore the data.

IDrive 360 says it does not store the private encryption key it offers at installation, so data cannot be retrieved without it. Duplicati encrypts with AES-256 locally before data reaches the network, Arq encrypts before sending when a password is set, and NAKIVO lists AES-256 at source, in transit and at rest. Veeam documents job encryption with a password or a key management server, and its documentation index covers password loss protection.

A customer-held key protects against the vendor's staff and against a breach at the vendor, and it moves the recovery risk to the customer. A team that picks it should store the key and password somewhere outside the machines being backed up.

## Certifications are mostly unstated

We looked for SOC 2, ISO 27001, GDPR and HIPAA statements on the pages we read for each product. We found none on those pages for any of the eight, and the product files record those fields as not stated rather than as negative. A buyer with a compliance requirement should ask each vendor for its report and its data processing agreement. CrashPlan's server page lists audit trails, data residency choices, policy-based retention and legal-hold support, which are governance features and not certifications.

## Trials and contract terms

Trial length ranges from 7 to 30 days. IDrive 360 gives 7 days, CrashPlan 14 days and NAKIVO 15 days, while Carbonite, Veeam and Arq each give 30 days. Backblaze links to a free trial without stating its length, and Duplicati's pricing page does not mention one. CrashPlan asks for a card at signup and starts the subscription on day 15 unless the customer cancels first.

Contract and cancellation terms were thin on the pages we read. We recorded cancellation and auto-renewal as not stated for most products rather than guess, and a buyer should read the order form for renewal and refund terms before a yearly purchase.

## Products we left out

Several well-known names are not on this page because we could not verify a price or a capability from the vendor's own pages on the day we checked. Acronis and Druva did not give us a readable price on the pages we reached. MSP360's pricing page returned a block error when we requested it. IDrive's classic business plan is not listed either, because two of its pages showed different starting prices for what looked like the same plan. Leaving a product out here says nothing about its quality.

## What to test during a trial

- Back up a folder, delete a file from it, and restore the file as it existed the day before to confirm the restore point works.
- Restore from a second computer or a clean machine using only the key or password you stored, to confirm that the key arrangement works the way you think it does.
- Check the plan's storage line against the real data size and growth, and work out the bill at 150% of today's usage.
- Ask the vendor in writing for its SOC 2 report or data processing agreement, and for the renewal price after any first-year discount.
- Time a full restore of a folder the size of your largest user's data, since the vendor's speed claims are not a substitute for your own connection.
