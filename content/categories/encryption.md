---
title: Encryption software compared
definition: Eight encryption and key management products compared on encryption at rest, key management and access controls, with the prices each vendor publishes.
primaryKeyword: encryption software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-05
    note: First draft. Six products checked against vendor pages and documentation, two of them existing profiles that gained an encryption qualification. Several vendors show no prices, and the draft says so for each. Criteria not yet approved.
  - date: 2026-11-05
    note: Second pass. Azure Key Vault and HashiCorp Vault added as quote-only profiles, because their vendors publish no amounts. All eight products now meet the three must-have features on the vendor's own pages. Body rewritten for the final set.
---

Encryption at rest protects stored data. If a disk, file or backup is copied without authorization, the bytes are unreadable without the key. That protection only works if the keys are held safely, rotated when needed, and released only to people or systems that should have them. Products in this category handle one or more of three jobs: encrypting data at rest, managing the keys, and controlling who can use or recover them.

This page compares eight products. Each one meets the three must-have features on its vendor's own pages. The page does not test performance, recovery under pressure or the strength of any cipher, because this draft read vendor pages and product documentation only.

## Three kinds of product

The group is not uniform, and the right comparison depends on what you are protecting. Key services such as AWS KMS, Azure Key Vault and HashiCorp Vault hold keys that other systems use to encrypt data. A file or volume product such as Cryptomator or Thales CipherTrust Transparent Encryption encrypts the data itself. An endpoint product such as Sophos Device Encryption, Microsoft Intune or ManageEngine Endpoint Central turns on full disk encryption across laptops and desktops, then manages the recovery keys.

Mixing these up leads to poor buying decisions. A key service does nothing for a stolen laptop, and a laptop tool does not protect a database in a cloud account. Decide which of the three jobs you need first.

## The eight products

The eight tools are AWS Key Management Service, Azure Key Vault, HashiCorp Vault, Cryptomator, CipherTrust Transparent Encryption from Thales, Sophos Device Encryption, Microsoft Intune and ManageEngine Endpoint Central. Each has a product page in this directory.

AWS KMS's features page says the service integrates with AWS services to encrypt data at rest. Its overview says key policies control who can use the keys. Azure Key Vault's overview says all key vaults are encrypted at rest with keys held in hardware security modules, and that the service can be used as a key management solution. Access is set through Azure role-based access control or a vault access policy. HashiCorp Vault's pages say it encrypts data at rest. Its Transit engine offers encryption as a service with named keys that can be rotated, and its policies grant or forbid access to resource paths.

Cryptomator encrypts files on the user's device before they reach cloud storage. Its Hub product adds zero-knowledge key management and user and group management. Thales CipherTrust Transparent Encryption applies policies by user, group, application and process, and keys and policies are managed centrally in CipherTrust Manager.

Sophos Device Encryption manages full disk encryption on Windows with BitLocker and on Mac with FileVault. Its page describes secure storage and recovery of keys, and self-service key recovery for users. Microsoft Intune configures BitLocker through endpoint security policies, and administrators can view and rotate recovery keys. ManageEngine Endpoint Central's BitLocker overview says it configures BitLocker on eligible Windows computers, and stores recovery keys in Active Directory or on the Endpoint Central server.

## Where each product stops

Endpoint Central's BitLocker management covers Windows only. Its overview says it does not deploy BitLocker policies to macOS or Linux, so a mixed fleet needs another tool for those systems. This draft did not confirm which Endpoint Central edition includes BitLocker management.

Sophos's page names the two operating systems it covers, and it does not say which roles can view recovery keys. Ask for that detail in a demonstration.

Intune's encryption sits inside a wider device management product, so the buying decision covers more than encryption. Its Plan 1 is listed at $8 per user a month on its own, and the profile records no billing term for that plan.

HashiCorp's Transit page does not describe how to delete a key, so this draft does not confirm key deletion for Vault. Azure Key Vault's overview describes two tiers, and HSM-protected keys are available only in the Premium tier. Check which tier your keys need before you compare prices.

## What the prices look like

Prices here use different units, so compare them with care.

AWS KMS charges $1 a month for each customer managed key, prorated hourly, and its first and second rotations add $1 a month each. The free tier covers 20,000 requests a month. The pricing page does not name its currency. Cryptomator's individual plan is free for personal use. Hub Community is free and self-hosted with five seats. Hub Standard is billed per seat per month with a minimum of three seats, and its page shows no numeric price. Hub Enterprise is listed from EUR 10,000 a year, excluding VAT, starting at 50 seats.

Endpoint Central lists Professional at $795 a year for 50 endpoints, which is $1.32 per endpoint a month. A free edition covers up to 25 endpoints. Intune Plan 1 is listed at $8 per user a month.

Some vendors publish no price. Thales publishes none and directs buyers to a sales contact. Azure Key Vault's pricing page lists billing units for its Standard and Premium tiers, such as per 10,000 transactions and per HSM-protected key per month, but shows no amount. HashiCorp's pricing page shows no Vault figures and points buyers to sales for Flex and Enterprise Self Managed. Thales, Azure Key Vault and HashiCorp Vault are marked quote only in their profiles, and no profile records an estimated figure for them.

Sophos's page shows no prices either. It offers a Free Trial and a Get started button, but no trial length. Its profile records the pricing model as paid, although the page shows no figures, so that field needs review.

## Products left out

Google Cloud KMS's key and encryption documentation confirms the features, but its pricing page returned only a title in this pass. This page cannot say whether that vendor publishes a price, so it is not counted. ESET Full Disk Encryption, Virtru, Fortanix and Kiteworks were not checked in this pass, and this page makes no statement about them.

## Testing before you pay

Start by listing what you protect: laptops, servers, cloud storage, databases or shared files. Then decide who holds the keys. A vendor-hosted key service and a key store you run yourself carry different risks, and the answer changes the contract you sign.

Test recovery before you rely on it. Lock a test device, retrieve its recovery key through the console, and confirm that the person who should get the key can get it and no one else can. Check who can view keys, and whether that access is logged.

Ask each vendor to price your count in writing, with the currency named. The units differ: per key for AWS KMS, per seat for Cryptomator, per user for Intune, per endpoint for Endpoint Central, and per transaction or per HSM-protected key for Azure Key Vault. Ask what happens to your keys and data if you leave.
