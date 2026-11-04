# Compliance gap review and draft policy texts

Prepared 4 November 2026 for B2BRated (b2brated.com). Research and drafting only. Nothing here is legal advice. Every draft text below is a "Draft for a lawyer to review, not legal advice".

Method: I read README.md, docs/PLAN.md, the methodology and transparency pages, BaseLayout.astro, the home page, the category and product page templates, and src/config/site.ts. I opened the official sources listed in each item with WebFetch. Where a source would not open or returned only headings, I say so in the Limits section and do not rely on it.

---

## 1. What the site is today

- Static Astro site on Vercel (per the brief). No forms, no accounts, no cookies set by the site, no analytics. I grepped src, astro.config and public for script tags, CDNs, font hosts and analytics packages. The only script is a local category filter in src/pages/categories/index.astro line 63. No third-party scripts were found.
- No reviews, no vendor claims, no affiliate links. All 458 product files have `"paidRelationship": null` (zero non-null), so "no vendor pays us" is true in the data.
- No contact address, company name, email address or legal page anywhere in src (grep for contact, mailto, "@" found nothing relevant). The footer links only to categories, methodology and transparency.
- The owner has not said where they or the business are based. PLAN.md section 0.1 says "Company: Not registered yet." Several items below depend on that.

Note on "no personal data": the host (Vercel) and any CDN in front of it process visitor IP addresses and request logs when pages are served. IP addresses are personal data under UK and EU GDPR. So a short privacy notice is still sensible now, even with no forms or cookies. The notice should say what the host logs. I could not verify Vercel's exact log retention (not opened this session).

---

## 2. What is missing, item by item

Legend for timing: NOW = needed or strongly advisable today. AT LAUNCH OF X = needed when that feature goes live.

### 2.1 Privacy notice
- Timing: NOW (short version). Full version AT LAUNCH of reviews, accounts, contact forms, analytics or newsletters.
- Why: Hosting logs include IP addresses. UK and EU GDPR require clear information to individuals whose data you process (Articles 13 and 14 for GDPR). California's CCPA requires a privacy policy and notice at collection only for businesses that meet its thresholds.
- Sources opened:
  - CCPA thresholds, rights, notice at collection, response deadlines (45 days, extendable by 45): https://oag.ca.gov/privacy/ccpa (opened). Thresholds: over $25 million annual revenue, or 100,000+ California residents or households' personal information bought, sold or shared, or 50% of revenue from selling personal information. The site likely does not meet these today.
  - UK ICO "what privacy information should we provide": https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/ (returned HTTP 403; not read).
  - GDPR text on EUR-Lex (https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng) returned no content. Article numbers cited in this file come from my background knowledge, not from a page I read. A lawyer must confirm.
- Must say: who is responsible (name, contact), what is collected and why, legal basis, who receives it (host, email provider, database), transfers outside the UK or EU, how long it is kept, the visitor's rights and how to use them, the right to complain to a regulator, and whether anything is sold or shared.
- Where: new page /privacy, linked in the footer.

### 2.2 Terms of use
- Timing: advisable NOW (short). Needed AT LAUNCH of reviews or vendor accounts (user content licence, acceptable use, vendor terms).
- Why: no law forces a public site to have terms, but without them you have no stated rules for use of content, no limit on reliance on prices that change, no licence for reviewers' text, and no basis for removing content. Price data goes stale; a reliance disclaimer is the main practical need.
- Sources: none official to cite for the content of terms. Consumer-law limits on what terms can say differ by country (UK Consumer Rights Act, EU Unfair Contract Terms Directive); I did not open either.
- Must say: what the site is, no advice or warranty on prices, how to report errors, rules on reviews and conduct once they exist, licence granted by reviewers, vendor terms for claimed profiles, governing law and courts [country], changes to the terms.
- Where: new page /terms.

### 2.3 Cookie notice and consent
- Timing: NOT needed today, because the site sets no cookies and uses no analytics or other tracking storage. Required BEFORE adding analytics (PLAN.md section 10 names PostHog), login sessions that are not strictly necessary, embedded video or ad pixels.
- Why: UK PECR regulation 6 and the EU ePrivacy Directive require consent before storing or reading information on a visitor's device unless it is strictly necessary for a service the visitor asked for. Login session cookies are usually strictly necessary. Analytics usually are not (the UK has proposed an analytics exemption; I could not confirm its current status).
- Sources:
  - PECR regulation 6: https://www.legislation.gov.uk/uksi/2003/2426/regulation/6/made (opened; page content was brief and confirmed only that consent is the rule and strictly necessary access is exempt).
  - ICO cookie guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-rules-on-cookies-and-similar-technologies/ (HTTP 403; not read).
- Must say: each cookie or similar technology, its purpose, duration, who sets it, and a way to refuse as easily as to accept. No pre-ticked boxes. Do not load the analytics script until the visitor agrees.
- Where: banner on all pages (new component in BaseLayout) plus new page /cookies. If analytics is cookieless and collects no personal data, check with a lawyer whether a banner is still needed.

### 2.4 Affiliate and sponsorship disclosure
- Timing: NOW the site must not imply anything it does not do. AT LAUNCH of affiliate links, sponsored slots or paid plans: a disclosure beside every affected link, plus a standing page.
- Why: US and UK rules say a commercial relationship that affects how readers weigh content must be disclosed clearly, next to the content.
- Sources opened:
  - FTC Disclosures 101: https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers (opened). It says to disclose financial, employment, personal or family ties, that free products count, to place the disclosure "with the endorsement message itself", and to use plain words such as "ad" or "sponsored", not vague tags. Its text does not address affiliate links directly. This page is written for influencers; it is the FTC page you named, and the principle carries over.
  - FTC Endorsement Guides, 16 CFR Part 255: https://www.law.cornell.edu/cfr/text/16/part-255 (opened; showed only section titles, 255.1 "General considerations" and 255.5 "Disclosure of material connections"). I could not read the rule text.
  - UK ASA/CAP affiliate marketing advice: https://www.asa.org.uk/advice-online/affiliate-marketing.html (opened). Affiliate content must be obviously identifiable as marketing. A disclaimer at the bottom is unlikely to be enough. Vague wording such as "may earn commission" is unlikely to be acceptable. "*affiliate" alone was not sufficient in the ASOS ruling. Both the brand and the affiliate are responsible.
  - UK CMA "Hidden ads" guidance: https://www.gov.uk/government/publications/hidden-ads-principles-and-guidance-for-social-media-influencers-and-brands (HTTP 404; not read).
- Must say: which links earn money, what the money does not change (only if true), the exact label used next to the link (for example "Affiliate link: we earn a commission if you buy"), and a list of paid relationships per category (the site already has the "Who pays us" block in src/pages/software/[slug].astro line 159).
- Where: existing /transparency page (expand), the "Who pays us" block on category pages (exists), a label component beside each outbound link (new), plus a short /affiliate-disclosure page or a section on /transparency.

### 2.5 Review policy and moderation
- Timing: AT LAUNCH of review collection. Not needed as a page today, but the claims already on the site about reviews (see section 3) need to be removed or softened now.
- Why: 16 CFR Part 465 (in force for sites like this) bans fake or false reviews including AI-generated ones, buying reviews conditioned on sentiment, undisclosed insider reviews, company-controlled sites posing as independent, review suppression, and fake social media indicators. Section 465.6 on company-controlled review sites is relevant: it targets a business that misrepresents a site it controls as independent when the reviewed category includes the business's own products. If the owner or any related company ever sells software in a category reviewed here, that matters. In the UK, the Digital Markets, Competition and Consumers Act 2024 also covers fake reviews and review information; I could not open that text (see Limits).
- Sources opened:
  - FTC press release on the final rule: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (opened). Lists the banned practices above and says the FTC can "seek civil penalties against knowing violators". It states no dollar figure. PLAN.md section 7.5 says "over $50,000 per violation". I could not confirm that figure from an official page; ask the lawyer.
  - Rule section list: https://www.law.cornell.edu/cfr/text/16/part-465 (opened: 465.2 fake reviews, 465.4 buying reviews, 465.5 insider reviews, 465.6 company-controlled review sites, 465.7 suppression, 465.8 fake social media indicators). Effective date not shown on that page; PLAN.md says 21 October 2024. The press release says 60 days after Federal Register publication (published 22 August 2024 per the citation 89 FR 68077), which is consistent with 21 October 2024.
  - 465.6 text: https://www.law.cornell.edu/cfr/text/16/465.6 (opened; the fetch tool's summary says consumer reviews are excluded from that section's scope; confirm the exact text with a lawyer).
- Must say: who may review, how reviewers are checked (only what is actually done), what is never accepted (reviews copied from elsewhere, paid-for sentiment, reviews from the vendor's staff unless labelled), how incentives are disclosed, why reviews are removed (reason codes), that vendors cannot delete reviews, how to report a review, how long moderation takes.
- Where: new page /review-guidelines (PLAN.md section 5.1 already plans this URL), linked from the methodology page and each review form.

### 2.6 Vendor corrections and right of reply
- Timing: NOW for corrections (the methodology page already promises that vendors can send corrections but gives no way to do so). Right of reply to reviews: AT LAUNCH of reviews.
- Why: no statute requires it for a site like this. It reduces defamation and misrepresentation risk and supports the claim of fairness. A correction route also serves GDPR accuracy duties if a named person appears in reviews.
- Sources: none official to cite. This is a policy choice; PLAN.md sections 2 and 13 already describe it ("vendor corrections queue, public corrections log").
- Must say: how to send a correction (email address), what evidence is needed (a vendor page URL with a date), who decides, the target response time [x], that payment has no effect, and that corrections are logged publicly. For reviews: vendors may reply publicly and flag a review with a reason; they cannot remove it.
- Where: new page /corrections (policy and public log), linked from every product page ("Report an error") and from /methodology.

### 2.7 Contact and company details
- Timing: NOW. A contact route is already implied by the methodology page's promise of corrections. Legal identity details are needed as soon as there is a business.
- What the law asks depends on where the owner is based. The owner has not said. Do not assume any of the following applies until the country and business form are known.
  - If a UK limited company: company name with "Limited" or "Ltd", registered number, registered office address, and country of registration must appear on websites. Source opened: https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material (opened). Also the Electronic Commerce (EC Directive) Regulations 2002, regulation 6 requires service providers to give name, geographic address, and email (and registration and VAT numbers where relevant). I could not open that page (the tool returned empty content), so this is from background knowledge: https://www.legislation.gov.uk/uksi/2002/2013/regulation/6
  - If in the EU: Article 5 of the E-Commerce Directive 2000/31/EC (implemented nationally; Germany's Impressum under the Digital Services Act, "DDG" section 5, is the strictest known example). Requires name, geographic address, email, and registration numbers. I did not open an official page for this.
  - If in the US: no general federal "imprint" law. A physical mailing address is required for commercial email under CAN-SPAM when email marketing starts (not opened). DMCA agent address is a separate requirement (item 2.9).
  - If in India: a registered company or LLP shows its name and registered office; I did not open an Indian source.
- Where: new page /about (who runs the site, how it is funded) and /contact, and a footer line with the legal entity once it exists.
- Open question for the owner: country, legal form (sole trader, company, not yet registered), public contact email.

### 2.8 Accessibility statement
- Timing: advisable NOW (PLAN.md lists WCAG 2.2 AA as MVP). Legally required in some places; depends on location and size.
- Sources opened:
  - WCAG 2.2: https://www.w3.org/TR/WCAG22/ (opened). W3C Recommendation, 12 December 2024. Three levels, A, AA, AAA. Adds 9 new success criteria to 2.1 and removes 4.1.1 Parsing.
  - US ADA: https://www.ada.gov/resources/web-guidance/ (opened). DOJ says the ADA applies to web content and has since 1996 (businesses open to the public under Title III). It names no single binding standard; it points to WCAG and Section 508 as helpful guidance.
  - EU European Accessibility Act, Directive (EU) 2019/882: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882 (opened; the tool returned only headings). It says the Directive applies from 28 June 2025 and refers to a microenterprise exemption for services in Article 4(5). I could not read the conditions. A review-and-comparison site is not obviously one of the listed service types (the listed ones include e-commerce services). A lawyer should say whether it is in scope for an EU-based or EU-targeting owner. The Commission page (https://commission.europa.eu/.../european-accessibility-act_en) did not give a date or scope.
- Must say: the standard aimed at (WCAG 2.2 AA), the current status (do not claim conformance without an audit), known gaps, a contact for accessibility problems, and the date of the last review.
- Where: new page /accessibility. The layout already has a skip link and a main landmark (BaseLayout.astro lines 26 to 29 and 57); that is a good start but is not an audit.

### 2.9 Copyright and takedown contact (DMCA)
- Timing: needed BEFORE the site hosts user-submitted content (reviews, screenshots, vendor uploads). Not needed for a site that only publishes its own text. Vendor logos or screenshots you embed are another matter; PLAN.md mentions screenshots.
- Why: the safe harbour for hosting user content in 17 USC 512(c) is kept only if the provider has designated an agent to receive notices, shows the agent's contact details on the service, and has filed the designation with the Copyright Office, and runs a repeat-infringer policy (512(i)). Source opened: https://www.law.cornell.edu/uscode/text/17/512 (opened). It lists the six elements of a valid notice (signature, identification of the work, identification and location of the material, complainant's contact details, good-faith statement, and a statement under penalty of perjury), and the counter-notice process, with restoration after 10 to 14 business days unless the owner files suit.
- Registration: https://www.copyright.gov/dmca-directory/ (opened). Registration is online only, paper is no longer accepted. The page gave no fee or renewal period. I recall a fee and a three-year renewal; not verified.
- Must say: how to send a notice, agent name and address (a registered agent can be a person or a service), counter-notice route, repeat-infringer policy.
- Where: new page /copyright (or a section of /terms), linked in the footer.

### 2.10 Data protection once personal data is collected
- Timing: AT LAUNCH of reviews, accounts, vendor portal, newsletters, contact forms or analytics. Planned here: reviewer identity and LinkedIn data (PLAN.md 7.2), proof-of-use screenshots (private storage), vendor staff accounts, lead details to vendors, email via Resend, PostHog analytics, Neon database. Each is a processor or recipient to list.
- UK and EU GDPR (not opened successfully; from background knowledge): lawful basis for each purpose; information notice; rights of access, correction, erasure, objection, portability; data processing agreements with each processor; international transfer safeguards (Neon, Resend, PostHog, Vercel and Cloudflare may process outside the UK/EU); breach notification to the regulator within 72 hours; a record of processing; if outside the UK or EU but targeting people there, a representative may be needed (GDPR Article 27). Proof-of-use screenshots and LinkedIn profile data need extra care for retention and minimisation.
- CCPA/CPRA: applies only above the thresholds in item 2.1. Opened source above. If it ever applies: notice at collection, rights to know, delete, correct, opt out of sale or sharing (including a global privacy control signal), 45-day response deadline, "Do Not Sell or Share" link if applicable.
- India DPDP Act 2023 and Rules 2025: relevant if the owner is in India or processes data of people in India. A web search (not an official page) reports the Rules were notified on 13 or 14 November 2025 with phased commencement: consent-manager provisions 13 November 2026 and most duties (notice, consent, security, breach reporting, retention and erasure, data principal rights) on 13 May 2027. The one conflicting source was dismissed. The official PIB release is https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf (listed in search; I did not open it). The MeitY Act PDF returned HTTP 403. Treat these dates as unconfirmed until read from the official text.
- Where: /privacy (full version), a records-of-processing document kept offline, a /data-requests contact (or the privacy page), and consent text on each form.

### 2.11 Other gaps worth a line
- Vendor terms (when profile claiming opens): who may claim, what vendors can and cannot do, no control over rank or reviews.
- Editorial policy page (PLAN.md 5.1 lists /editorial-policy): who writes and checks pages. The methodology page already says "approved and signed off by a named editor" (line 74), but no page shows an editor name.
- AI disclosure: PLAN.md section 6.6 says Claude drafts category and product copy and the owner signs off. Nothing on the site says so. This is a trust and consistency matter, not a law that I found. Decide whether to say it, and make sure the statement matches what happens.
- Hosting: PLAN.md section 10.1 says Vercel's Hobby plan is for non-commercial personal use only and that the site must move before any revenue starts (affiliate links count). I did not re-open Vercel's terms this session. Affiliate links or paid plans before the move would be a hosting terms problem, separate from the legal items above.
- A security.txt or security contact is optional and cheap.

---

## 3. Claims on existing pages that are not true yet

True today: no reviews exist, no reviewer has been verified, no score is computed, no category shows a ranking, no vendor pays, no sponsored slots exist, no affiliate links exist, there is no contact route, and the lists are alphabetical (src/lib/site-index.ts line 59 and src/pages/software/[slug].astro line 62). The score weights are a draft: PLAN.md section 2.1 says "draft, weights to be tuned and published".

| # | File and line | Sentence on the site | What is true today |
|---|---|---|---|
| 1 | src/pages/index.astro:23-24 | "Rankings that money cannot move" and "Scores come from a published formula based on verified reviews." | No scores and no rankings exist. No reviews exist to base them on. The formula page (methodology) lists draft weights that are labelled "will" on that same page. Reword to the future tense or to what exists: dated prices and written inclusion criteria. |
| 2 | src/pages/index.astro:42-43 | "no vendor can pay to change a ranking" | There are no rankings. The statement is true only because nothing exists to change. State it as a rule for the future: "When rankings appear, payment will not change them." |
| 3 | src/layouts/BaseLayout.astro:66 | "Rankings are never for sale. Any paid placement is labeled and kept apart from the ranked list." (sitewide footer) | No rankings and no paid placements exist. PLAN.md section 8.3 plans paid sponsored slots and 8.4 plans affiliate links, so "never for sale" is a promise about the future. It also sits on every page. Say what is true now: "No vendor pays us. If that changes, we will say so here and label every paid placement." |
| 4 | src/pages/methodology.astro:51-54 | "Vendors can send corrections" | There is no email, form or page to send one. Add a contact route before keeping this sentence. |
| 5 | src/pages/methodology.astro:52-53 | "A product appears in the category only after we check each capability against the vendor's own documentation and record the page we used." | Not verified by me. The product schema has a `qualifies` field and source URLs, but I did not check that every one of 458 product files records a page per capability. Spot-check before keeping the sentence in present tense. |
| 6 | src/pages/methodology.astro:80-81 | "Each score combines five parts with fixed weights, and every score on the site links back to this table." | No score exists. The weights are a draft in PLAN.md. "Fixed" is premature. |
| 7 | src/pages/methodology.astro:72 | "At least {g.minReviews} verified reviews across the category" (gate threshold) | Fine as a threshold, but zero reviews exist and no verification process exists. Keep it labelled as a future condition. |
| 8 | src/pages/methodology.astro:113-115 | "Prices are checked again every 90 days." | The first check was on 3 November 2026. No schedule or job exists. README "Not built yet" says the site needs a scheduled rebuild for staleness notices to appear at all (the staleness text is computed at build time). Say "We plan to recheck every 90 days" or build the job. |
| 9 | src/pages/methodology.astro:117-119 | "Costs outside the plan price are listed separately." | Partly true. Some product pages have such fields; I did not check all 458 products. Do not claim it for every product. |
| 10 | src/pages/methodology.astro:123-126 | "Every reviewer confirms their identity with a work email address or a LinkedIn account before a review is published. Each review shows how the reviewer was verified... When a reviewer received a gift or payment, the review says so" | No review form, no reviewers, no verification system. Present tense implies a working process. Reword: "When review collection opens, reviewers will..." |
| 11 | src/pages/methodology.astro:128-130 | "Vendors can reply to reviews and can flag a review with a reason. They cannot remove reviews, and every removal is counted on the product page." | No vendor accounts, no replies, no removals, and no removal count on product pages. The only count is the hard-coded 0 on /transparency (line 55). Reword to future. |
| 12 | src/pages/transparency.astro:21 | "Every score links to the inputs and weights behind it." | No scores exist. |
| 13 | src/pages/transparency.astro:22 | "Every review shows how the reviewer was verified and whether the vendor invited them." | No reviews exist. |
| 14 | src/pages/transparency.astro:23 | "Vendors can flag reviews and cannot delete them. Each removal is counted with its reason." | No vendor accounts or flagging exist. |
| 15 | src/pages/transparency.astro:25 | "No account is needed to read any page, and contact details go only to vendors the visitor picks." | First half is true. The second half describes a lead feature that does not exist and a flow that has no code yet. |
| 16 | src/pages/transparency.astro:19-27 as a list under the heading "Our rules" | Rules written in present tense. | Some are true now (prices show source and date; "who pays us" appears on category pages, see src/pages/software/[slug].astro:159). Others (items 12 to 15) are plans. Split into "True now" and "When these features open". |
| 17 | src/pages/products/[slug].astro:258 | "No verified reviews yet. Reviewers confirm their identity with a work email or LinkedIn before a review is published." | Accurate that there are none; the second sentence describes a process that does not exist. Reword to future. |
| 18 | src/pages/categories/[department].astro:39 | "...have enough verified products and reviews to show" | Zero categories have reviews. "Verified products" is a reasonable reading of "checked against criteria" but "reviews" is not true yet. |
| 19 | README.md:3 | "rankings that money cannot move" | README is in a public repo. Same issue as row 1. |
| 20 | src/pages/methodology.astro:74 | "approved and signed off by a named editor" | No editor name is shown anywhere on the site. The gate field exists (`editor`, `signedOffAt`), but I did not check that any category file has them filled. Check, and show the name on category pages. |
| 21 | src/pages/index.astro:14-15 | "Each price links to the vendor page it came from and shows the day we checked it." | Appears true from the product template (products/[slug].astro:108). Spot-check all 458 products before keeping the word "Each". |

Also: "hands-on notes" are mentioned on methodology.astro:72. The product template has a `handsOnNote` field (products/[slug].astro:97-100). I did not check whether any product has one. If none do, the gate condition is untested.

Safe to keep as is: transparency.astro:63 "No vendor pays us anything, and no category has sponsored placements" (matches the data; all `paidRelationship` fields are null), and transparency.astro:77 "Review collection has not opened yet".

---

## 4. Draft texts

Every draft below is a "Draft for a lawyer to review, not legal advice". Placeholders are in square brackets. I have not invented facts about the owner or company. Choose the sentences that match what the site actually does on the day you publish.

### 4.1 Privacy notice (version for today: no accounts, forms or analytics)

> Draft for a lawyer to review, not legal advice.
>
> **Privacy notice**
> Last updated: [date]
>
> **Who we are.** This site, b2brated.com, is run by [legal name or individual name] of [address], [country]. You can reach us at [contact email].
>
> **What we collect.** We do not ask you for any personal information on this site. There are no accounts, forms or comments. We do not use analytics, advertising or tracking cookies.
>
> **What our host logs.** Our site is served by [Vercel, Inc. / other host]. When you load a page, the host receives your IP address and details such as your browser type and the page you asked for. It uses these logs to deliver the site and keep it secure. We do not use these logs to identify you. [Retention period of host logs: confirm with the host.]
>
> **Why we handle this data.** To serve the site and keep it secure. [Lawful basis, for UK and EU visitors: legitimate interests.]
>
> **Who else sees it.** Our host. [Add any other provider, for example a CDN.] Your data may be handled outside [the UK / the EU] by our host. [Describe the safeguard the host uses.]
>
> **Your rights.** If you are in the UK or EU you can ask us what we hold about you, ask us to correct or delete it, and object to how we use it. Email [contact email]. You can also complain to your data protection authority. In the UK that is the Information Commissioner's Office. [Add EU authority for [country] if relevant.]
>
> **Changes.** If we add reviews, accounts, forms or analytics, we will update this notice before they start. We will show the date above.

### 4.2 Privacy notice additions for when reviews or accounts go live

> Draft for a lawyer to review, not legal advice.
>
> **If you write a review.** We collect your name, your work email address, your job title, your company, and the text and ratings you write. If you sign in with LinkedIn, we receive [the fields LinkedIn gives us: list them]. We use this to check you are a real user of the product you review, to publish your review, and to stop fake reviews.
>
> **What is public.** Your review is public. You choose whether it shows your full name, your initials, or "verified reviewer". We keep your email address private. We do not give it to the vendor you review.
>
> **Proof of use.** If you send a screenshot or invoice to prove you use a product, only our moderators see it. We delete it [number] days after we check it. Please hide other people's personal data in it.
>
> **Email.** We use [email provider] to send you confirmation messages. We do not send you marketing email unless you ask for it.
>
> **How long we keep it.** Published reviews stay as long as the site runs [or: for [number] years]. Account data stays until you delete your account, then we remove it within [number] days. Logs are kept [number] days. [Lawyer to confirm.]
>
> **Who processes your data for us.** [List: database provider, email provider, file storage provider, analytics provider if any, each with location.]
>
> **Your choices.** You can ask us to delete your review or your account at any time at [contact email]. We reply within [30 days / lawyer to confirm].
>
> **California residents.** [Include only if the thresholds in the California law are met.] We do not sell or share your personal information.
>
> **India.** [Include only if the owner or users are in India and the law applies.] Contact for complaints about your data: [grievance officer name and email].

### 4.3 Terms of use

> Draft for a lawyer to review, not legal advice.
>
> **Terms of use**
> Last updated: [date]
>
> **About these terms.** These terms apply when you use b2brated.com. The site is run by [legal name] of [address], [country]. If you do not agree with these terms, do not use the site.
>
> **What the site does.** We compare business software. We list prices, features and facts taken from vendors' public pages, and we show the date we checked each one. Prices change. Check the vendor's own page before you buy.
>
> **No advice.** The content is for information. It is not legal, tax, security or financial advice. We try to be accurate, and we correct mistakes when we find them or when we are told. We do not promise the site is free from error or always available.
>
> **Your use.** You may read the site and quote short parts with a link back to us. You may not copy large parts of it, scrape it in bulk, or use it to build a competing database without our written permission. [Lawyer to review this against the site's open licence choices.]
>
> **Reviews and other content you send.** [Add when reviews open.] You promise that what you send is true, that it is your own experience, and that you did not receive money or a gift for a particular rating. You give us a non-exclusive licence to publish it on the site and to keep a copy. Read the review guidelines at /review-guidelines. We may remove content that breaks them.
>
> **Vendors.** [Add when vendor accounts open.] If you claim a profile you must have the right to act for the company. You can correct facts and reply to reviews. You cannot remove reviews, and paying us does not change a ranking.
>
> **Links.** We link to other sites. We do not control them and are not responsible for what they say or do.
>
> **Our liability.** Nothing in these terms limits liability that the law does not allow to be limited. Otherwise, we are not liable for loss from relying on the site. [Lawyer to set this out for [country] and for consumers versus businesses.]
>
> **Changes.** We may change these terms. The date above shows the latest version.
>
> **Law.** These terms are governed by the law of [country or state]. Courts of [place] have jurisdiction. [Lawyer to check what applies to consumers in other countries.]
>
> **Contact.** [contact email]

### 4.4 Cookie notice (only publish if cookies or similar technologies are added)

> Draft for a lawyer to review, not legal advice.
>
> **Cookies**
>
> **Today.** This site does not set cookies and does not use analytics. We do not show a cookie banner because we have nothing to ask you about.
>
> **If this changes.** [Use only when something is added.] We use the following:
>
> | Name | Set by | What it does | How long it lasts | Needs your consent |
> |---|---|---|---|---|
> | [name] | [us / provider] | [purpose] | [duration] | [yes / no, strictly necessary] |
>
> We only load the ones marked "yes" after you press Accept. You can say No and the site works the same. You can change your choice any time at [link to settings].

### 4.5 Affiliate and sponsorship disclosure

> Draft for a lawyer to review, not legal advice.
>
> **Who pays us**
> Last updated: [date]
>
> **Today.** No vendor pays us. We have no affiliate links, sponsored placements or paid listings. Every product on this site is listed because it meets the written criteria for its category.
>
> **If this changes.** [Use only when true.] We may earn money in three ways: [subscription fees from vendors / affiliate commissions / sponsored placements]. When we do:
>
> - Every link that pays us a commission has the words "Affiliate link: we earn a commission if you buy" next to it, before you click.
> - Sponsored products appear in a separate row labelled "Sponsored", never inside the ranked list.
> - Each category page lists which of its products have a paid relationship with us.
> - [Only if true] Payment does not change a product's position, score or listing.
>
> We do not accept payment for reviews or for a particular rating.
>
> **Questions.** Email [contact email].

### 4.6 Review guidelines and moderation policy (publish when review collection opens)

> Draft for a lawyer to review, not legal advice.
>
> **Review guidelines**
> Last updated: [date]
>
> **Who can review.** Anyone who has used the product for work. We check this by [work email address / LinkedIn account / proof of use: list only what is actually done]. We show next to each review how it was checked.
>
> **What a review must be.** Your own honest experience of the product. Say what you used it for, for how long, and what you liked and did not like.
>
> **What we do not accept.**
> - Reviews you did not write from your own experience.
> - Reviews written by the vendor, its staff, or its agencies, unless the review clearly says so.
> - Reviews you were paid or rewarded to write with a required rating.
> - Reviews copied from other sites.
> - Reviews written by software or AI tools and presented as a person's own experience.
> - Personal attacks, threats, hate speech, and other people's private data.
>
> **Rewards.** Some vendors invite their customers to review. We mark those reviews "Invited by vendor". If a reviewer received a reward, the review says what it was. A reward never depends on the rating. We never pay for a specific rating.
>
> **How we check.** We use automatic checks for duplicates, bursts of reviews, and conflicts of interest. A person reviews anything flagged. [Describe only what is built.]
>
> **Removing reviews.** We remove a review if it breaks these rules. We record the reason and show the number of removals and the reasons on each product page. We do not remove reviews because they are negative, and a vendor cannot remove a review.
>
> **Vendor replies.** A vendor can reply publicly to a review and can flag one for us to check. We decide.
>
> **Report a review.** Use the "Report" link or email [contact email]. We reply within [number] working days.
>
> **If you disagree.** Email [contact email] with the review link and your reason. A different person [name or role] will look at it.

### 4.7 Vendor corrections and right of reply

> Draft for a lawyer to review, not legal advice.
>
> **Corrections**
>
> If something on this site about your product is wrong, tell us at [contact email]. Include:
> - the page address,
> - what is wrong,
> - a link to a public page that shows the correct fact (a pricing page, documentation, a terms page).
>
> **What we do.** We check the link. If it supports your correction, we change the page and note the change and date in our corrections log. We aim to reply within [number] working days. If we disagree, we tell you why.
>
> **What we do not do.** We do not change a fact because a vendor asks, without a public source. We do not take payment to change, add or remove a listing, and payment does not change a position.
>
> **Reviews.** [Add when reviews open.] You can reply to any review on your product and flag a review for us to check. You cannot remove a review.
>
> **Corrections log.** [Link to public log: date, page, what changed, who asked.]

### 4.8 Contact and company details (fill in from owner's facts)

> Draft for a lawyer to review, not legal advice. Which items are legally required depends on the country and business form, which the owner has not told us.
>
> **About B2BRated**
> B2BRated is run by [legal name or individual name] [, registered in [country] under number [number], if a company].
> [Registered office or business address, if required or chosen].
> Email: [contact email]. [VAT or tax number, if registered and required.]
> [Name of the person who is responsible for editorial content, if you choose to show it.]
> How we are funded: [Today: not funded by vendors. Update when that changes.]

### 4.9 Accessibility statement

> Draft for a lawyer to review, not legal advice. Do not claim conformance until a real audit has been done.
>
> **Accessibility**
> Last reviewed: [date]
>
> We aim for this site to meet WCAG 2.2 level AA. We have [not yet / partly / fully] tested it. [Describe tests: for example automated checks, keyboard-only test, screen reader test with [tool].]
>
> **Known problems.** [List real gaps, or "None known at this date".]
>
> **Tell us.** If you cannot use part of the site, email [contact email] and say which page and what you use. We aim to reply within [number] working days and to fix the problem or offer another way to get the information.
>
> [If required in your country: name of the enforcement body to contact if you are not satisfied.]

### 4.10 Copyright and takedown (publish when the site hosts others' content)

> Draft for a lawyer to review, not legal advice.
>
> **Copyright**
>
> Text and data on this site are © [year] [owner]. Product names and logos belong to their owners.
>
> **If you think something here infringes your copyright.** Send a notice to our designated agent:
> [Agent name], [address], [email], [phone].
> Your notice must include:
> 1. your signature, physical or electronic;
> 2. the work you say has been copied;
> 3. the page address where the material is, so we can find it;
> 4. your name, address, email and phone;
> 5. a statement that you believe in good faith that the use is not allowed;
> 6. a statement, under penalty of perjury, that your notice is accurate and that you are the owner or authorised to act for the owner.
>
> **If we removed your content by mistake.** Send a counter-notice with: your signature, the material and where it was before removal, a statement under penalty of perjury that you believe it was removed by mistake, your name, address and phone, and your consent to [court jurisdiction] [lawyer to confirm wording]. If the complainant does not file a court case, we may put the material back in 10 to 14 business days.
>
> **Repeat infringers.** We close the accounts of users who repeatedly post infringing material. [Lawyer to confirm policy.]

### 4.11 Corrected wording for the home page and footer (replacement text, for the owner to approve)

> Draft for a lawyer to review, not legal advice.
>
> Footer, BaseLayout.astro line 66: "No vendor pays us today. If that changes, we will say so on the Transparency page and label every paid placement."
>
> Home, index.astro lines 23-24, heading: "Written method, dated prices". Text: "Each price shows where it came from and the day we checked it. Reviews and scores are not live yet. When they are, this page will link to the method and to every input."
>
> Home, index.astro lines 42-43: "...and no vendor pays us to be listed."
>
> Methodology, line 54: "Vendors can send corrections to [contact email]."

---

## 5. Order of work

1. Now: add /contact (a real email), /privacy (short version, 4.1), /terms, and the footer links; fix the false claims in section 3 (rows 1 to 4, 6, 8, 10 to 17).
2. Before affiliate links or any revenue: /affiliate-disclosure (or a section on /transparency), link labels, move off Vercel Hobby if the plan's claim about its terms holds, confirm business entity and tax position.
3. Before review collection: /review-guidelines, /corrections, full privacy notice (4.2), DMCA agent registration, a data processing agreement list, a records-of-processing sheet, a breach-response routine.
4. Before analytics: cookie consent banner and /cookies, or a cookieless analytics choice reviewed by a lawyer.
5. Within a quarter: an accessibility audit and /accessibility.

---

## 6. Limits: what I could not verify

- The following pages returned an error or no usable text, so nothing here relies on them: UK ICO cookie and privacy-information guidance (HTTP 403); UK CMA hidden ads guidance (404); CMA fake reviews guidance (404 on the URLs I guessed); DMCC Act 2024 text (empty); legislation.gov.uk text of the Electronic Commerce (EC Directive) Regulations 2002 reg 6 (empty); GDPR text on EUR-Lex (empty); MeitY DPDP Act PDF (403); the EU Commission accessibility page (no date or scope); 16 CFR 255 text (headings only).
- GDPR article numbers, the 72-hour breach window, EU Article 27 representative duty, UK PECR consent detail, E-Commerce Directive Article 5 content, German Impressum rules, CAN-SPAM address rule, DMCA fee and renewal period, and the UK analytics-cookie exemption status come from my background knowledge and are marked as such. Confirm with a lawyer.
- I did not find an official page that states the 16 CFR Part 465 penalty amount. PLAN.md says "over $50,000 per violation"; I could not confirm it.
- India's DPDP Rules dates (notified 13 or 14 November 2025; consent managers 13 November 2026; main duties 13 May 2027) come from a web search summary, not from the official gazette text.
- I did not open Vercel's terms or privacy documents, so I do not know its log retention, its transfer mechanism, or whether Hobby terms forbid affiliate links as PLAN.md claims.
- I did not check each of the 458 product files for sources, hands-on notes, hidden-cost fields or editor sign-offs; claims about them are marked "spot-check".
- I did not run the site or read built pages; findings come from source files. Line numbers are from the files as of today.
- The owner's country, legal form, and whether the site targets the UK, EU, US or India specifically have not been stated, so the company-details and data-protection items are conditional.
- Nothing in this file is legal advice. The draft texts have not been reviewed by a lawyer.
