---
title: Mobile device management software compared
definition: Eight mobile device management products compared on enrollment, policy enforcement, remote lock and wipe, with prices checked at the source.
primaryKeyword: mobile device management software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages and documentation.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
---

Mobile device management software lets an IT team enroll phones, tablets and laptops, push settings to them and take the data back when a device is lost. Enterprise mobility management and EMM are older names for the same job. The eight products on this page each document device enrollment, policy enforcement, and remote lock and wipe. We checked every price on the vendor's own website, and each product page links to the documentation we used.

## What a product needs to be listed here

We list a product only when its own documentation covers three capabilities. Device enrollment means the admin can bring a device under management, either by touching it, through a user-led sign-in or automatically at first power-on. Policy enforcement means settings, restrictions or compliance rules are applied to groups of devices and users. Remote lock and wipe means the admin can lock a lost device or erase it from the console.

These criteria are a draft and have not been approved by an editor. Products that publish no documentation for one of the three were left out, even when their marketing pages mention the feature.

## Who is in the group

[Microsoft Intune](/products/microsoft-intune) and [Jamf](/products/jamf) are the two most established names, one built around Microsoft Entra ID and the other around Apple. [Hexnode UEM](/products/hexnode-uem), [Scalefusion](/products/scalefusion), [ManageEngine Mobile Device Manager Plus](/products/manageengine-mdm-plus) and [SureMDM](/products/suremdm) manage mixed fleets and publish per-device prices. [Iru](/products/iru) and [Addigy](/products/addigy) concentrate on Apple devices, and Iru covers Windows as well.

Some well-known products are missing. We could not verify a public price or enough documentation for Mosyle, Miradore and Samsung Knox Manage, so they are not listed yet. Their absence says nothing about quality.

## How enrollment really works

Enrollment decides how much work a new laptop or phone costs the IT team. Apple describes [Automated Device Enrollment](https://support.apple.com/en-ug/102300) as a way to automate MDM enrollment and simplify initial setup, with devices added through Apple Business Manager. A company must add its MDM server to Apple Business Manager before this works. Jamf, Iru, Addigy, Scalefusion, ManageEngine, Hexnode and Intune all document this route for Apple hardware.

Android has its own pair of paths. Intune's documentation recommends Android Enterprise enrollment for devices that use Google Mobile Services and separate AOSP methods for devices that do not. It also says Android device administrator management is deprecated and no longer available for devices with access to Google Mobile Services. ManageEngine lists Android Zero Touch and Samsung Knox among its automated routes, and Scalefusion points to Google's zero-touch enrollment.

On Windows, Intune enrolls devices automatically through Microsoft Entra join, Autopilot or Group Policy. Its Autopilot route needs a Microsoft Entra ID P1 or P2 license, which is a cost outside the Intune price. A device must also be registered in Entra ID before Intune can manage it.

Personal devices follow different rules. Jamf documents User Enrollment for personally owned Apple devices, and it requires Managed Apple IDs. Intune documents work profiles for personally owned Android devices and Apple User Enrollment for iPhones, and the work data stays apart from personal data.

Moving between vendors adds a step. Intune says that Apple devices enrolled through automated enrollment, and most corporate Android devices, must be factory reset before a new MDM can take them. A switch therefore means a wipe, a plan for user data and a window when the device is offline.

## Policy enforcement in practice

Every product here groups devices and applies settings to the group. Jamf uses configuration profiles, which are files that define settings and restrictions for devices, computers and users. Hexnode associates policies with device groups or user groups. Scalefusion publishes a policy to selected device profiles, and a profile-level policy overrides a global setting. Addigy's policies are hierarchical, so a child policy inherits what its parent holds.

Intune adds a compliance layer. A compliance policy checks a device against rules such as a minimum OS version and not being rooted or jailbroken. Blocking access to company resources from a noncompliant device needs Microsoft Entra Conditional Access, which is a separate license. By default, a device with no compliance policy assigned counts as compliant, so an admin has to change that setting to get the stricter behavior.

When you trial a product, ask how fast a change reaches a device. Iru says its MDM pushes changes almost instantly to Macs and within a couple of minutes to Windows devices, with daily check-ins correcting local drift.

## Remote lock and wipe have limits

Remote lock and wipe sound simple and depend heavily on the platform. Intune's remote lock works well only when a passcode or PIN is already set, because otherwise the screen may just turn off. Its documentation lists Android Enterprise corporate-owned modes, AOSP, iOS, iPadOS, macOS and visionOS 2.0 or later, and Windows is not on the list. ManageEngine states the same gap, with Remote Lock supported on Android, iOS and macOS but not Windows.

Wipe has its own cautions. Intune says a tenant can submit up to 500 Wipe actions per day, and on Zebra Android devices the Wipe action removes only corporate data. On fully managed Samsung devices, a Factory Reset setting set to Block makes the device lose contact with Intune and fail to finish the reset. ManageEngine's FAQ says a full wipe works only on fully managed devices, and a device with a work profile can only lose the work profile.

Android work profiles show why. SureMDM's documentation says a wipe in Work Profile mode removes the work container and keeps personal data. That is good for a personal phone and no help when a company-owned phone is stolen. Check which enrollment mode your devices will use before relying on a remote wipe.

Apple adds Activation Lock. Iru's documentation says a locked device cannot receive an Erase Device command, and on iOS and iPadOS Activation Lock has to be removed before an erase. Jamf's support guidance advises signing out of iCloud before a wipe. Test an erase on a spare device before the first real loss.

Several vendors add approval steps. Intune can require a second administrator to approve a wipe through Multiple Administrative Approval, and SureMDM has a Four Eyes setting that holds wipe requests until another admin approves them. Scalefusion's Enterprise plan lists maker-checker approval.

## How the prices compare

These products charge in four different ways, so a plain price comparison misleads. Here are the figures for 100 devices, using each vendor's own list price. Intune Plan 1 costs $8.00 per user a month, or $800 a month for 100 users, and an add-on needs Plan 1 underneath it. Jamf for Mac costs $12.50 per device a month, or $15,000 a year for 100 Macs, and Jamf for Mobile costs $5.75, or $6,900 a year for 100 devices.

Scalefusion's Business plan costs $5 per device a month billed annually, which makes $6,000 a year for 100 devices, and its minimum is 10 devices. ManageEngine's Standard cloud plan costs $1,195 a year for 100 devices, which is about $1.00 per device a month, and the Professional plan costs $2,245. It is free for up to 25 devices.

Addigy starts at $8.25 per Mac a month, so 100 Macs cost at least $825 a month. SureMDM's Standard plan lists at $3.99 per device a month, or $399 a month for 100 devices. Hexnode's Enterprise plan lists at $3.20, or $320 a month for 100 devices. Neither page says whether the listed figure is a monthly or an annual rate, and both describe a discount for annual billing. Iru publishes no price, and contracts are annual commitments.

Three details change these numbers. ManageEngine and SureMDM show dollar signs without naming a currency. Jamf says local-currency pricing comes through a representative or reseller and may differ from the USD list. Scalefusion bills annually only, and Jamf Mac and Mobile plans carry a 25-device minimum, so a small team may pay for more than it uses.

## Security and compliance statements

Four vendors state audit or certification claims on their own pages. Jamf lists SOC 2 and ISO 27001, Iru states a SOC 2 Type 2 examination and ISO 27001 certification, and Scalefusion states ISO/IEC 27001:2022 certification and SOC-2 Type-2 compliance. Addigy says it performs SOC 2 Type 2 audits, with report access under an NDA.

For the other four we recorded no claim. Microsoft publishes a large list of compliance offerings, but the page we checked does not name Intune, so we did not assume coverage. Ask each vendor for its audit report and for the scope of the system it covers before you sign.

## Naming changes to watch

Vendors in this category have been renaming themselves. Kandji's documentation tells customers to complete the move from Kandji to Iru by December 1, 2026 to keep uninterrupted access. Apple Business Manager is also being folded into a product called Apple Business, according to a Scalefusion blog post, so enrollment screens and token names may change.

Apple tokens for automated enrollment expire. Addigy's documentation says Automated Device Enrollment, like other Apple MDM items, needs a yearly renewal to stay active. Put the renewal date in a shared calendar, because a lapsed token stops new devices from enrolling automatically.

## What to test during a trial

- Enroll one company-owned device through automated enrollment and time it from power-on to a usable desktop.
- Enroll one personal device and confirm what the admin can and cannot see or erase.
- Apply a passcode policy, then send a remote lock to a device with and without a passcode.
- Send a wipe to a spare device in each enrollment mode you plan to use and record what is left behind.
- Ask the vendor in writing what happens to enrolled devices if you cancel, and which price applies at renewal.
