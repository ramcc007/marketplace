---
title: Multi-factor authentication software compared
definition: Eight MFA products compared on price, second-factor methods, risk-based rules and enrollment controls, with every figure checked at the vendor.
primaryKeyword: multi-factor authentication software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages, with CISA and NIST guidance for context.
---

Multi-factor authentication software asks a user for a second proof of identity after the password, and it lets an administrator decide who must use which method and when. The eight products on this page each support second-factor methods such as app push or hardware keys, apply risk-based rules to decide when to ask, and give administrators control over enrollment. We read every price and capability on the vendor's own website on November 4, 2026, and each product page links to the pages we used. Figures are in US dollars as shown to US visitors, and prices can differ by country.

## What a product must do to be listed

Our draft criteria have three requirements. The first is a choice of second factors that includes at least one of app push approval or a hardware security key. The second is rules that change what a login must prove depending on context, such as network, device, location or detected risk. The third is administrator control over enrollment, meaning the admin can require, prompt for, restrict or approve how users register their factors.

We left out vendors when we could not confirm all three from their own pages, or when we could not confirm a current price from the vendor. A product missing from this list has not been judged weak. It has only not met the written test yet. The criteria are still a draft and have not been approved, so treat the list as provisional.

## Why the method matters more than the checkbox

The government guidance is blunt about which factors hold up. The US Cybersecurity and Infrastructure Security Agency says [any MFA is better than none](https://www.cisa.gov/MFA), but it calls phishing-resistant MFA the standard industry leaders should aim for. CISA names FIDO and WebAuthn as the widely available phishing-resistant option and tells organizations to plan a move to it. Where that move is not yet possible, CISA says number matching can help against attacks on text-message codes.

[NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html), the federal digital identity guideline, is more specific. At authenticator assurance level 2, a verifier must offer at least one phishing-resistant option. Phishing resistance comes from channel binding or verifier name binding, and NIST says manual entry of an authenticator output does not qualify. That rules out one-time codes typed from an app or a text message. Out-of-band methods are not phishing-resistant either.

The same document restricts the telephone network for out-of-band codes. It asks verifiers to consider signals such as a recent SIM change or number port before sending a secret by text, and to offer alternatives to every user. It also says approval-only methods, where the user taps to accept a request, are no longer acceptable because of authentication fatigue. NIST wants the user to transfer a secret between channels, and it advises limiting how many pushes can be sent after the last successful login.

At the highest level, assurance level 3, NIST requires a cryptographic authenticator with a non-exportable private key and bars syncable authenticators. In practice that points toward hardware security keys for the most sensitive accounts. These rules bind federal systems directly, but private buyers often borrow them for audits and cyber insurance questionnaires.

## What this means when comparing products

Look past the headline method list. Every product here supports push or a hardware key, but they differ in whether the push is a bare approval or a number-matched prompt, and in whether an admin can switch off the weaker fallbacks. [Duo](/products/duo) lists approval in the Duo Mobile app and FIDO2 security keys. [Okta](/products/okta) lists WebAuthn and YubiKey among its factors, and [Microsoft Entra ID](/products/microsoft-entra-id) manages FIDO2 and Microsoft Authenticator through one policy that can target groups.

[JumpCloud](/products/jumpcloud) supports push through its Protect app, authenticator codes, and WebAuthn security keys such as YubiKey and Titan. [Rublon](/products/rublon) lists Mobile Push and FIDO on every plan, including its free one. [Auth0](/products/auth0) offers push through its Guardian app and WebAuthn keys. [Ping Identity](/products/ping-identity) lists mobile push and FIDO2 biometrics or security keys, and [WatchGuard AuthPoint](/products/watchguard-authpoint) lists push, FIDO2 passkeys and hardware tokens on both tiers.

## Risk-based rules and where they cost extra

Risk-based rules are the feature most often held back for a higher plan. The pattern is the same across the paid products: basic MFA is cheap, and the rules that skip the prompt for a known device or demand a stronger factor for a strange login cost more.

- Duo lists Risk-Based Authentication for its Advantage and Premier editions, at $6 and $9 per user per month. Essentials at $3 does not list it.
- Okta sells Adaptive MFA as an add-on on the $6 Starter suite with no published price, and shows it as included from Core Essentials at $14.
- Microsoft Entra ID needs the P2 plan at $10 per user per month for risk-based Conditional Access through ID Protection. P1 costs $7 and lists only basic risk detection.
- JumpCloud sells Conditional Access as a separate $3 product, so MFA plus Conditional Access is $6 per user per month billed annually.
- Auth0 requires an Enterprise plan with a paid Adaptive MFA add-on. Neither has a published price.
- Rublon includes Authorized Networks, Remembered Devices and Geolocation policies on Business at $2 per user per month, and leaves them out of its free plan.

Ping Identity describes a cloud risk service that uses time since last sign-in, IP reputation and geo-velocity anomalies. WatchGuard documents geofence conditions that enforce different MFA requirements by location, and a Geokinetics policy that blocks logins that do not fit the distance and time limits an operator sets. Both sell by quote, so we cannot say what those features cost.

## Enrollment is where deployments stall

A second factor protects nothing until the user has registered one. The enrollment controls decide how long that takes and how many people are left unprotected in the meantime.

Duo gives administrators the most routes in what we read. They can add users manually, run bulk enrollment from a list of usernames and emails, send enrollment emails, or generate one-time codes that expire after 24 hours by default. Duo also lets admins set separate enrollment and account management policies. Okta's enrollment policies attach to user groups and mark each authenticator as optional, required or disabled, with grace periods for required ones.

JumpCloud lets admins set a global grace period and require one primary MFA factor, after which enrollment is mandatory before access is granted. Microsoft Entra ID runs registration campaigns that nudge targeted users to set up a passkey or Microsoft Authenticator, with snooze periods from 0 to 14 days and an optional cap on snoozes. Rublon lets admins pick Automatic, Manual or Approval enrollment on every plan.

Ping's MFA policy has an Allow Pairing checkbox for each method and a configurable pairing key lifetime. WatchGuard lets admins add users and resend activation emails. Auth0 handles enrollment through post-login Actions, which gives the most control and also asks for code. Its enrollWith commands choose the factors a user is prompted to enroll, and a single flow can run only four enroll and challenge commands.

## How the prices compare

Prices below are list prices per user per month for 100 users, and none include taxes or phone credits. Seat blocks, minimums and billing terms change the real figure, so read the product page before budgeting.

- Rublon Business is $2, or about $2,400 a year, with a 15-license minimum.
- JumpCloud MFA is $3 billed annually, or about $3,600 a year. Adding Conditional Access doubles that to about $7,200.
- Duo Essentials is $3, Advantage is $6 and Premier is $9. The same 100 users cost about $3,600, $7,200 and $10,800 a year.
- Microsoft Entra ID P1 is $7 and P2 is $10, or about $8,400 and $12,000 a year, billed yearly.
- Okta Starter is $6 and Essentials is $17, or about $7,200 and $20,400 a year, with a $1,500 annual minimum.

Auth0 is priced by monthly active users rather than seats. The B2C Essentials plan starts at $35 a month for 500 users, and B2C Professional starts at $240. Its free plan covers up to 25,000 users. Ping Identity and WatchGuard publish no prices on the pages we checked.

The free options differ in scope. Duo Free covers up to 10 users. Rublon Free protects one user. Microsoft Entra ID Free includes MFA but needs an Azure subscription.

## Cost traps in the fine print

Several charges sit outside the headline price. Rublon bills phone credits for SMS passcodes, SMS links and phone calls on every plan. JumpCloud keeps suspended users billable at the normal rate. Duo sells paid licenses in blocks of 10 below 100 users and blocks of 25 above, so a team of 101 pays for 125.

Okta applies a $1,500 annual minimum to Workforce Identity. Microsoft's P1 and P2 are annual subscriptions that renew automatically. Auth0 gates Adaptive MFA behind an Enterprise plan and an add-on.

Check the reverse trap too. A cheap plan can force weaker fallbacks. If text messages remain enabled as a backup, an attacker only has to attack the weakest method, and NIST treats the telephone network as a restricted channel for that reason.

## Who each product suits

Teams already on Microsoft 365 will find Entra ID the shortest path, since MFA is listed on its free tier and risk-based rules arrive at P2. Small teams with no identity provider can start with Duo Free or Rublon Business and add paid features as needed. IT departments that also manage devices and directories may prefer JumpCloud, where MFA is one line item among several.

Larger organizations with many applications and a dedicated identity team tend to look at Okta or Ping Identity, both of which sell broader platforms. Businesses that sell software to customers rather than securing staff should look at Auth0, whose pricing follows monthly active users. WatchGuard fits shops that already run its firewalls and want one console, and its product page links to resellers.

## Security statements to confirm

We recorded compliance statements only where we found them on a vendor's own page. Okta's security site lists SOC 2, ISO/IEC 27001, GDPR and HIPAA for Okta and Auth0 together, and it does not say which certification covers which product. JumpCloud states a SOC 2 Type 2 examination and ISO 27001 certification. Rublon states an ISO/IEC 27001:2023 certified management system and EU GDPR alignment. We did not find a compliance statement we could cite for the other four, so their pages leave those fields blank.

## What to test during a trial

- Enroll five users by every route the product offers, and time how long each takes.
- Turn off text message and voice fallbacks, then check which users can no longer sign in.
- Trigger a risk rule from a new country or an unknown device, and read the log entry it produces.
- Send repeated push requests to a test account and see whether the product rate-limits them.
- Ask the vendor in writing which features sit behind each plan and what the add-ons cost.
