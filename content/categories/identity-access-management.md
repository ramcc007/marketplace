---
title: Identity and access management software compared
definition: Eight identity and access management products compared on checked prices, SSO, SCIM deprovisioning behavior, access policies and licensing traps.
primaryKeyword: identity and access management software
criteriaApproved: true
editor: B2BRated site owner
signedOffAt: 2026-11-04
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages and documentation.
  - date: 2026-11-04
    note: Criteria approved and page opened for indexing by the site owner.
  - date: 2026-11-05
    note: Top-up pass. No product added, because no candidate's vendor pages confirmed single sign-on, provisioning and access policies together. Page still lists the same eight products.
---

Identity and access management software decides who can sign in to which applications, creates and removes their accounts, and applies rules to each sign-in. The eight products on this page each offer single sign-on, user provisioning and deprovisioning, and access policies. We read the prices and capability claims on each vendor's own pages, and every product page links to the sources we used.

## What a product must do to be listed

We list a product only when the vendor's own documentation or product page shows all three capabilities. Single sign-on means one login that opens many applications through a standard such as SAML or OpenID Connect. User provisioning and deprovisioning means the product creates, updates and removes accounts in other applications, usually through the SCIM protocol. Access policies means rules that grant, deny or add a step to a sign-in based on conditions.

Several well-known products failed that test on the evidence we could find. Cisco Duo documents single sign-on and access policies, but its pricing page names no provisioning feature. Keycloak's own site documents single sign-on, and its guide lists SCIM only in a table of contents we could not read in full. We left both out of this edition rather than guess. Zoho Directory's pricing page showed no dollar amounts when we read it, so we could not list it with a verified price.

## Two different buyers

The products split into two groups, and the first decision is which group fits. Workforce identity products manage the employees of one company and the SaaS apps those employees use. [Okta](/products/okta), [Microsoft Entra ID](/products/microsoft-entra-id), [JumpCloud](/products/jumpcloud), [Ping Identity](/products/ping-identity) and [Google Cloud Identity](/products/google-cloud-identity) are built mainly for that job. [authentik](/products/authentik) covers it too, and can also serve customer sign-ins.

Customer identity products sit inside a software product and sign in that product's own users, including the staff of business customers who want to connect their own identity provider. [Auth0](/products/auth0) and [Descope](/products/descope) are built for that. A company that buys one of them mostly to run employee single sign-on is using it for a job it was not designed around, and the pricing, which counts monthly active users, shows the difference.

## How the prices work

Prices in this category are hard to compare because each vendor charges for a different unit. The figures below are US list prices in dollars. Taxes and local pricing can change them.

Okta charges per user per month, billed annually, with a $1,500 annual contract minimum. Its Starter suite costs $6 and includes single sign-on and multi-factor authentication. Lifecycle Management, the part that provisions and removes accounts, is a paid add-on on Starter and is included from Core Essentials at $14 and Essentials at $17. Professional and Enterprise are quote-only.

Microsoft Entra ID P1 costs $7 per user per month and P2 costs $10, both paid yearly. Entra ID Free exists, requires an Azure subscription, and lists unlimited single sign-on. Conditional Access policies need P1. Risk-based policies need P2, because they depend on Entra ID Protection. The Entra Suite costs $12 and requires P1 or a plan that includes it.

JumpCloud sells packages and add-ons. Its SSO package costs $11 per user per month billed annually or $13 billed monthly. User Lifecycle Management and Conditional Access are each listed à la carte at $3 annually or $4 monthly per user. A 30-day trial is available. Suspended users stay billable, and invoicing is offered only for accounts above $2,000 a month.

Google Cloud Identity Free has no per-user charge. Premium costs $7.20 per user per month on a flexible plan. A one-year commitment brings it to $6, and cancelling early does not reduce what is owed. authentik's open-source edition is free to self-host, and its Enterprise edition costs $5 per workforce user per month, billed annually. Customer accounts cost $0.02 per user per month.

Ping Identity publishes no price. Its pricing page says tiers depend on identity count and type, deployment model and chosen capabilities, and it directs buyers to a sales team for a quote.

## Customer identity pricing counts users differently

Auth0 and Descope charge by monthly active users, and both include a free tier. Auth0's Free plan covers up to 25,000 monthly active users with one enterprise connection. Descope's Free Forever plan covers 7,500 users and 3 SSO connections.

The business-to-business plans add connections as a cost. At 500 monthly active users, Auth0's B2B Essentials plan costs $150 a month and includes 3 enterprise connections, and B2B Professional costs $800 and includes 5. Extra connections cost $100 a month each, up to 30. Yearly billing costs 11 times the monthly price.

Descope Pro starts at $249 a month and Growth at $799, both billed annually. They include 5 and 10 SSO connections. Usage-based overages apply on both, and the pricing page does not publish the per-unit rates. A software company with many enterprise customers should model the connection count first, because each customer's identity provider usually needs its own connection.

Okta sells a separate Customer Identity line. Its Enterprise base platform costs $3,000 a month, billed annually, and the B2B Suite that adds Lifecycle Management is quote-only.

## Deprovisioning is where products differ

Every product here can create accounts in other apps. What happens when someone leaves differs, and the difference matters for licenses, data and security.

Microsoft Entra disables a user in the target app by default when the person goes out of scope or is disabled, and sends a delete request when the user is hard-deleted in Entra. Entra hard-deletes users 30 days after they are soft-deleted. [Entra's provisioning documentation](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/how-provisioning-works) also says the service cannot read users in nested groups, so access granted through a nested group does not provision.

JumpCloud's custom SCIM integration can provision, update and deprovision users and groups. Its guidance says that unassigning a user leaves the account in the app in an inactive state, and that app support for each action varies. Ping Identity's SCIM connection has an "Enable users deprovision" setting, and a remove action that chooses between deleting and disabling the account.

Auth0 takes the customer-identity route. When an identity provider sets the SCIM active attribute to false, Auth0 blocks the user, ends their sessions and revokes refresh tokens. A hard delete needs a separate SCIM DELETE call. authentik says a removed user is deprovisioned from the target SCIM endpoint. Descope's SCIM support covers provisioning, updating and deprovisioning of users and groups.

The practical check is to remove a test user and then look at the target app. A disabled account can still hold a paid seat. A deleted account can lose the data the business needs to keep.

## What access policies mean in each product

The three capabilities overlap, but policies vary most in depth. Okta documents sign-on policies and rules that control how users authenticate, with app-specific sign-on policies. Microsoft describes Conditional Access as if-then statements: if a user wants a resource, then they must complete an action such as multi-factor authentication or use a compliant device.

Microsoft's documentation adds a limit worth knowing. Conditional Access policies are enforced after first-factor authentication is completed, so they are not a front line against attacks such as denial of service. Ping's authentication policies take effect when assigned to an application, and multi-factor steps can be triggered by conditions such as IP range or population.

Google Cloud Identity lists context-aware access as a Premium feature, so the Free edition gives single sign-on to SAML apps without it. authentik policies are reusable checks that can decide whether someone reaches an application. Auth0's documentation describes role-based access control, and Descope describes role-based and fine-grained authorization with relationship-based and attribute-based models. Those are access rules inside an application the buyer builds, which is a different job from controlling employee access to third-party SaaS.

## Seat counts and minimums

Minimums change which product is cheapest for a small team. Okta's $1,500 annual contract minimum means a team of 20 on the $6 Starter suite, which comes to $1,440 a year, still pays $1,500. Google Cloud Identity Free and Entra ID Free carry no per-user charge, though Entra ID Free needs an Azure subscription.

Large teams face the opposite problem, because add-ons multiply with headcount. A JumpCloud customer who adds both Lifecycle Management and Conditional Access to the SSO package pays $17 per user per month on annual billing. That figure equals Okta Essentials at $17 and exceeds Core Essentials at $14, so the comparison depends on which capabilities the business needs on day one.

## Standards worth knowing

Most of these products rely on SAML 2.0 and OpenID Connect for single sign-on and on SCIM 2.0 for provisioning. A SaaS app that supports SCIM can usually be provisioned from any of these products, but support differs by app. Entra's documentation notes that SCIM endpoints are built by the application vendor, so a missing endpoint is a gap in the app and not in the identity product.

Google's own SCIM documentation says its Cloud Identity SCIM API [implements a subset](https://docs.cloud.google.com/identity/docs/scim/reference/rest) of the two SCIM specifications, RFC 7643 and RFC 7644. Treat any claim of full SCIM support as something to test with the actual apps in use.

## What to test during a trial

- Connect two real apps, one over SAML and one over OpenID Connect, and record how long each takes.
- Add a test user to a group, confirm the account appears in a SCIM-enabled app, then remove the user and check whether the account is disabled or deleted.
- Write one policy that requires a second step from an unmanaged device, and one that blocks sign-in from a country the business does not operate in.
- Ask in writing which features sit behind add-ons, and how the price changes at the next user or connection tier.
- Ask how a departing employee's accounts are removed during the notice period, and how fast the change reaches each app.

Pricing pages change often. Each product page links to the pages its prices came from, and plans above the published tiers are quoted by the vendor.
