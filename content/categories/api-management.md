---
title: API management software compared
definition: Eight API management tools compared on gateway, rate limits, authentication, developer portal and analytics, with the prices each vendor publishes.
primaryKeyword: API management software
criteriaApproved: true
writer: Claude (AI draft)
editor: Ram C
signedOffAt: 2026-11-05
updateLog:
  - date: 2026-11-05
    note: First draft. Seven products checked against vendor pricing and feature pages and their documentation. Several vendors show no prices, and the draft says so for each. Criteria not yet approved.
  - date: 2026-11-05
    note: Second pass. Azure API Management added, with its tiers shown as quote only because the vendor publishes no amounts. All eight products now meet the three must-have features on the vendor's own pages. Body rewritten for the final set.
---

API management software sits in front of the APIs a company publishes or consumes. A gateway receives each call, checks who is calling, limits how often they can call, and records what happened. A developer portal lets developers find the APIs and request access. Analytics show who is calling and how the calls perform.

This page compares eight tools. Each one meets three must-have features on its vendor's own pages: a gateway or proxy, authentication with rate limiting, and a developer portal or analytics. The page does not test latency, failover or behavior under a traffic spike, because this draft read vendor pages and product documentation only.

## What a buyer has to decide

Three choices shape the cost more than any feature list. The first is whether the gateway runs in the vendor's cloud, in your own cloud account, or on your own servers. The second is whether the price follows the number of APIs, the number of requests, or the size of the platform. The third is whether the developer portal and analytics come with the plan or cost extra.

Pricing models differ in this group. Some vendors publish a per-million-request rate. Others sell a platform by quote. Some publish a monthly price for one tier and leave the rest to sales. Read the unit of each price before comparing numbers across tools.

## The eight products

The eight tools are Azure API Management, Zuplo, Gravitee, Traefik Hub, Kong API Management, Tyk, Amazon API Gateway and IBM API Connect. Each has a product page in this directory.

Azure API Management's key concepts page describes an API gateway that verifies API keys, JWTs and certificates, and enforces usage quotas and rate limits. It also describes an open-source developer portal where consumers subscribe to get API keys and see their own usage. Zuplo's homepage calls it a gateway for APIs and AI, with API key, JWT and OAuth authentication and per-key rate limits. Gravitee's platform page describes a gateway with rate limiting and authentication policies, and analytics for REST, GraphQL, gRPC and event traffic.

Traefik Hub adds an API gateway and API management on top of the open source Traefik Proxy. Its Hub API Gateway tier lists distributed rate limiting and access control through LDAP, JWT, API keys, OAuth and OIDC. Its Hub API Management tier adds a developer portal and API monitoring.

Kong API Management has a gateway, a developer portal and usage analytics. Its rate limiting plugin caps how many HTTP requests can be made in a set period. Tyk is an API gateway with an open source core under the MPL 2.0 license, and its documentation sets rate limits per key, per API and per endpoint.

Amazon API Gateway handles REST, HTTP and WebSocket APIs. Its throttling documentation covers limits tied to usage plans and API keys, and its metrics go to CloudWatch. IBM API Connect has a DataPower gateway, self-service developer portals and built-in analytics. Its documentation describes rate, burst and count limits that can be applied within an API flow.

## Rate limiting and authentication in practice

Most of the group handles rate limiting in one of two ways. Some tools attach limits to a key or consumer, so each client gets its own allowance. Others apply limits to an API as a whole or to a single endpoint. Tyk's documentation describes all three scopes and says requests over the limit receive HTTP 429. Amazon's throttling documentation says the same status code applies when requests exceed the limits.

Authentication varies more. Gravitee's page names OAuth 2.0, JWT, mTLS, API key and OIDC. Azure API Management's key concepts page names API keys, JWTs and certificates. IBM's product page describes strong authentication and authorization without naming the methods. Check which methods your clients need, and confirm them against the documentation before you sign.

## What the prices look like

Vendors fall into three groups on price. The first group publishes figures, the second publishes only some, and the third publishes none.

Some publish figures. Zuplo lists a free plan at $0 with 100,000 requests a month, Builder at $25 a month billed monthly, and Enterprise from $1,000 a month on an annual contract. Kong's Plus plan starts at $25 a month plus usage, includes one million requests, and charges $20 for each extra million. Gravitee's Planet plan is listed at $2,500 a month. The pricing pages for Zuplo, Kong and Gravitee do not name a currency, so their figures are recorded as shown. Amazon's pricing page shows per-million request rates only in worked examples, and it lists API Gateway Portals at $125 a portal a month.

Some publish a partial price. Gravitee's Galaxy and Universe plans have no listed price. Kong's Enterprise plan is priced on request.

Some publish no price. Azure API Management's pricing page lists a billing unit for each tier, from Consumption to Premium v2, and no amount for any of them. The page says prices are calculated in US dollars. Traefik Hub publishes no price for either Hub tier, although its Traefik Proxy is open source and free to download. Tyk publishes no prices for its Core, Professional or Enterprise plans and says plans are quoted on request. IBM API Connect lists Pay-as-you-Go, Standard, Premium, Reserved Instance and Software options with no figures.

Azure API Management and Tyk are marked quote only in their profiles. The Traefik Hub and IBM API Connect profiles use other pricing models, even though their pages show no figures for the tiers named here, so their pricing fields need review. No profile on this page records an estimated figure.

## Limits and overage charges

Overage terms decide the bill for a busy month. Kong states its overage charge and its portal charge. Amazon bills data transfer and caching separately, and its page gives only partial rates for them. Azure API Management's Consumption tier bills per 10,000 operations above the included amount, but the page shows no amount for that charge.

Traefik Hub's page does not say whether its AI Gateway and MCP Gateway add-ons are priced apart from the Hub tiers. Read the add-on terms before you assume the tier price is the full cost.

## Products left out

Google Apigee, MuleSoft and WSO2 were not checked in this pass, so this page says nothing about their features or prices. Azure API Management was left out of earlier drafts because its prices were unreadable. Its pages now confirm the three must-have features, and it publishes no amounts, so it is included as a quote-only profile.

## Testing before you pay

Start by counting the APIs you will publish and the calls you expect each month, including a busy month. Then ask each vendor to price that load in writing, with the currency named. Ask whether the developer portal and analytics come with the plan or cost extra. Ask how rate limits are set, per key, per API or per endpoint, and test one limit in a trial before you rely on it.

Ask about data retention for analytics, and about export terms if you leave. Kong's pricing page says its Plus plan keeps analytics data for 14 months. Other tools state retention differently or not at all, so get each figure in writing before you sign.
