---
title: Background check software compared
definition: Eight employment background check providers compared on published prices, candidate consent, ATS links and US rules, all checked at the source.
primaryKeyword: background check software
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-04
    note: First draft. Eight products checked against vendor pages and primary legal sources.
---

Employment background check software orders criminal and employment history reports on job candidates, collects the candidate's permission, and returns results to the hiring team. The eight products on this page each run criminal and employment checks, have a way for candidates to give consent, and connect to at least one applicant tracking system. We read every price and claim on the vendor's own website, and each product page links to the pages we used.

Only three of the eight publish a full price list in US dollars. The other five sell by quote or, in one case, list prices in Canadian dollars. That gap is the first thing to know when you build a shortlist.

## Who runs the check

Almost every vendor here is a consumer reporting agency. Under the US Fair Credit Reporting Act, a company that assembles background reports for employers takes on legal duties, and the employer who orders the report takes on others. Software in this category is mostly a workflow around those duties: ordering, consent, delivery of results and adverse action notices.

The practical split is between self-serve vendors and sales-led vendors. [Checkr](/products/checkr), [GoodHire](/products/goodhire) and [Verified First](/products/verified-first) let a small employer see prices and start without a call. [First Advantage](/products/first-advantage), [Accurate Background](/products/accurate-background), [HireRight](/products/hireright) and [ClearStar](/products/clearstar) publish no per-report prices, so the real cost depends on volume and negotiation. [Certn](/products/certn) sits between the two, with a public per-check list in Canadian dollars and a quoted enterprise tier.

Two of these companies are related. GoodHire's pricing page describes it as a Checkr company and lists the same three package prices as Checkr. Sterling, a well-known name in screening, now directs visitors to First Advantage, so we list only First Advantage.

## What the law requires of the employer

The Federal Trade Commission's [guidance for employers](https://www.ftc.gov/business-guidance/resources/background-checks-what-employers-need-know) sets out the steps. Before obtaining a report, the employer must tell the applicant in writing, in a stand-alone document, that the report may be used for employment decisions. The employer must also get the applicant's written permission, which can sit in the same document as the disclosure, and then certify to the reporting company that it has done both.

Before an adverse action, the employer must give the person a copy of the report and a summary of their rights under the FCRA. After the action, the employer must say that the decision was based on the report, name the reporting company, and explain that the person can dispute the report and request a free additional copy within 60 days. The FTC page does not set a fixed waiting period between the first notice and the final decision, so employers often check state and local rules for one.

This matters when you compare software, because the product handles part of this work and leaves the rest to you. Checkr's [API documentation](https://docs.checkr.com/) says it will not provide a report unless the employer certifies that it obtained proper authorization. First Advantage's [FCRA page for clients](https://fadv.com/customers/fcra/) says the disclosure must be a separate document and that the employer must obtain written authorization. In both cases the legal duty stays with the employer, and the vendor supplies the mechanism.

## How candidate consent works in each product

The consent flow is the feature that differs most between products, and the public evidence is uneven.

GoodHire has the most detailed public description. Its [consent article](https://www.goodhire.com/blog/3-steps-to-easy-background-check-consent/) lists three options: e-consent, where the employer supplies a name and email and the candidate signs electronically; a GoodHire consent form for onsite candidates; and a custom employer form that GoodHire reviews against its acceptance criteria.

Checkr's API documentation says it emails the candidate to invite them to provide their information and consent. Verified First sends a text invitation, and the candidate completes digital disclosure and authorization forms on a phone, with automatic reminders. Accurate Background's candidate portal page says automated pop-ups make sure candidates see required disclosures and notices before they proceed.

Three vendors give us less. HireRight's Connect API page lists gathering candidates' permission as a capability without describing it. ClearStar's evidence is a customer testimonial about applicant authorizations by text or email. Certn's criminal check page mentions built-in consent forms but not their wording. We include all three because each page names consent as part of the product, and we say so on the product pages. Ask each of them for a demo of the candidate screens before you rely on them.

## ATS integrations

An integration lets a recruiter order a check from inside the applicant tracking system and see status there. The counts below come from each vendor's own pages and are not directly comparable, because vendors count partners differently.

Checkr's pricing page lists 200+ ATS integrations on its Enterprise tier. First Advantage cites 100+ integration options, though its page names only 18. Verified First lists 49 entries tagged as applicant tracking systems. Accurate Background's integrations list shows 37 partners on its first page, with more on a second page we did not read. ClearStar names seven partners on its homepage.

GoodHire says it comes pre-integrated with leading ATS and HRIS platforms and can reach others through its API, without giving a total. Certn names Greenhouse, Lever and Workday. HireRight's page says it links with applicant tracking platforms but names none.

None of the pages we read confirm that consent status syncs back into every listed system. If your ATS matters, ask the vendor to show that exact connection working.

## What the checks cost

The published prices show how steep the add-on costs are. Checkr charges $29.99 per report for Basic, $59.99 for Essential and $94.99 for Complete. Essential adds identity verification and unlimited county criminal search, and Complete adds state and federal criminal searches. GoodHire lists the same three prices as starting-from figures.

Verified First lists $29.99 for Basic, $54.99 for Essential and $79.99 for Premium, and Premium is the one that includes employment and education verification. Its pricing page does not say whether those prices apply per check, which is worth a question before you sign up. Verified First also says it has no long-term contracts, annual commitments or minimum screening requirements.

| Product | Published price | Basis | Quote needed |
|---|---|---|---|
| Checkr | $29.99, $59.99, $94.99 | Per report | Enterprise |
| GoodHire | $29.99, $59.99, $94.99 | Per check, starting from | Volume packages |
| Verified First | $29.99, $54.99, $79.99 | Unit not stated | Enterprise |
| Certn | 24.99 to 29.99 CAD | Per check | Enterprise |
| First Advantage | None | Quote | Yes |
| Accurate Background | None | Quote | Yes |
| HireRight | None | Quote | Yes |
| ClearStar | None | Quote | Yes |

Package prices are only the start. Checkr lists a county criminal search at $25 and a motor vehicle record at $9.50 as add-ons, and its employment verification add-on runs from $12.50 for the current employer to $50 for ten years. Court and agency fees pass through at cost on top of that. ClearStar's Basic plan includes only the first three county court checks before pass-through fees apply.

Prices also depend on location. County courts and state repositories charge their own fees, and some jurisdictions restrict what a report can contain. Certn's public prices are in Canadian dollars and mostly cover Canadian records, and its page says its Public Records Check is not available for US candidates. Treat any total as an estimate until the vendor quotes your hiring locations.

## Rules that limit what a report can show

The FCRA limits how far back some information can go. Under [15 U.S.C. 1681c](https://www.law.cornell.edu/uscode/text/15/1681c), a reporting agency generally cannot report arrest records or civil suits older than seven years. Records of convictions are not subject to that limit, and the time limits do not apply to reports for jobs with an annual salary of $75,000 or more.

Federal discrimination guidance has also shifted recently. In 2012 the Equal Employment Opportunity Commission issued enforcement guidance on arrest and conviction records under Title VII. On [October 29, 2026](https://www.eeoc.gov/newsroom/eeoc-votes-rescind-enforcement-guidance-arrest-and-conviction-records), the EEOC announced that it had rescinded that guidance. The announcement says the move does not require employers to abandon lawful practices they adopted because of it. Employers should ask counsel how it affects their screening policy, since Title VII itself still applies.

State and local fair chance laws, often called ban-the-box laws, delay or restrict criminal history questions. The National Employment Law Project's [guide](https://www.nelp.org/insights-research/ban-the-box-fair-chance-hiring-state-and-local-guide/) reports that 37 states, the District of Columbia and more than 150 cities and counties have such policies, and that 15 states extend them to private employers. That guide is dated October 1, 2021, so the current numbers may be higher.

Software can help here, but only some of it does. Verified First says it has built-in pre-adverse action tools. Checkr lists automated adjudication on its Enterprise tier. We found no vendor page that promises to apply a given city's fair chance timing rules for you, so check that before relying on any workflow.

## How we chose the products

A product is listed only if its own public pages show three things: criminal and employment checks, a candidate consent flow and an ATS integration. The criteria are a draft and an editor has not yet approved them, which the page header shows. We left out vendors whose pages we could not read or that did not show all three. For example, we did not list Asurint because its criminal check page did not address consent or ATS links.

We have not run these products. Everything here comes from vendor pages and primary legal sources, and no vendor paid for placement or reviewed this page.

## What to check before you buy

Ask for a written list of every fee for your hiring locations, including county and state pass-through fees. Ask to see the candidate consent screens for your own state, because some states add disclosure rules on top of the federal ones. Ask whether your ATS connection sends status and consent back, and who keeps the signed forms. Then have counsel review your adverse action letters and your timing for local fair chance rules.
