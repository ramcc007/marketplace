---
title: Infrastructure as code tools compared
definition: Eight infrastructure as code platforms compared on plan and apply steps, state handling and published prices, with vendors that publish no price marked.
primaryKeyword: infrastructure as code tools
criteriaApproved: false
writer: Claude (AI draft)
updateLog:
  - date: 2026-11-05
    note: First draft. Seven products checked against vendor pricing and documentation pages. Products whose plan, state or price could not be confirmed on a readable vendor page are listed without a price.
  - date: 2026-11-05
    note: Second pass. Azure Bicep, Google Cloud Infrastructure Manager, Oracle Cloud Infrastructure Resource Manager and IBM Cloud Schematics added, each checked on its own vendor pages. Page now covers the eight products that meet all three checks. Terrateam, Digger, Massdriver, Firefly, ControlMonkey and Terramate are described as left out with reasons.
---

Infrastructure as code (IaC) tools describe servers, networks and cloud services in files, then show the changes before they apply them. The tool keeps a record of what it has built, called state, so the next plan can compare the files with the real resources. A team that edits cloud resources by hand has no such record, and cannot easily say what a change will do.

This page compares eight products that meet three checks on their own vendor pages: a declarative description of the infrastructure, a plan step followed by an apply step, and a documented way of handling state. The eight are HCP Terraform, Pulumi, Spacelift, AWS CloudFormation, Azure Bicep, Google Cloud Infrastructure Manager, Oracle Cloud Infrastructure Resource Manager and IBM Cloud Schematics. Each has a profile in this directory. Prices are shown as published, and the page says where a vendor publishes no price.

## What the three checks mean

The plan and apply check asks whether the tool shows the change before it happens. HCP Terraform asks for confirmation before it applies a run's plan by default, and it runs a speculative plan when a pull request is opened. Pulumi's preview shows the updates to a stack's resources and makes no changes while it runs. CloudFormation change sets show how proposed changes would affect running resources, and CloudFormation changes the stack only when a change set is executed.

The newer entries follow the same pattern. Oracle Resource Manager runs a plan job that produces an execution plan, and an apply job provisions resources only after that. Google Cloud Infrastructure Manager offers preview deployments that show how changes affect the infrastructure before they are applied. IBM Cloud Schematics runs a plan job whose logs can be checked before a template is applied.

The state check asks where the record lives and how it is protected. Terraform needs state to map configuration to real resources, and remote locking stops two users from running it at the same time. Spacelift stores state only when the team chooses Spacelift-managed state at stack creation, and its backend follows Terraform's standard HTTP protocol. Oracle Resource Manager stores the state files for its stacks and locks the stack state, so one job runs at a time. Google keeps the state file created for each deployment and revision. IBM Schematics centralizes Terraform state with access control and locking.

Azure Bicep takes a different route. Azure stores all states for a Bicep deployment, so the user has no state file to manage. The check still passes on that basis, but a team that wants to hold its own state file cannot do so with Bicep.

The declarative check asks whether the team describes the end state rather than a list of steps. Pulumi compares its recorded state with the configuration declared in its program, and CloudFormation works from templates. Azure's Bicep page calls the language declarative. Google's overview says Terraform is defined declaratively in a configuration that describes the end state. Oracle's overview says a Terraform configuration codifies infrastructure in declarative configuration files. IBM's product page says Schematics uses Terraform to automate provisioning and lifecycle management, and it does not use the word declarative. That is the weakest of the eight declarative checks, and a buyer should read the Terraform templates page before relying on it.

## The eight products

HCP Terraform runs Terraform in workspaces, and Spacelift runs Terraform stacks with plan and apply runs. AWS CloudFormation deploys AWS resources from templates. Azure Bicep is a language from Microsoft, and Google Cloud Infrastructure Manager, Oracle Cloud Infrastructure Resource Manager and IBM Cloud Schematics are provider services. The provider services deploy into the cloud account a team already pays for. A team that works across several clouds needs to check whether the service covers each cloud it uses.

## What the prices look like

HCP Terraform bills per resource a month. Essentials costs $0.10, Standard $0.47 and Premium $0.99 per resource. Pulumi's Essentials plan costs $40 a month for up to 500 managed resources, and Pro costs $400 a month for up to 2,000. Its free tier covers one user and 500 workflow minutes.

Spacelift's Starter plan starts at $399 a month. Its Business and Enterprise plans are by quote, so no figure is published for them. AWS CloudFormation charges no separate fee for stacks, because the bill is for the AWS resources a stack creates. Registry extension types are billed per handler operation, and the page does not state the rate.

Azure Bicep is free and open source, according to Microsoft's overview. The Azure resources a template creates are a separate charge. Google's pricing page says Infrastructure Manager has no fee of its own, and that Cloud Build and Cloud Storage bill for the runs and the artifacts they produce. Oracle's Resource Manager page says the service has no dedicated charge, and that customers pay for the resources a stack provisions. IBM's product page says Schematics can be started at no charge, and it shows no paid prices.

Which vendors publish no price is the point that matters most for a budget. For the tool itself, Spacelift's Business and Enterprise plans are quote only. CloudFormation publishes no rate for registry extension operations. IBM publishes a free start and no paid price. Google and Oracle publish a no-fee statement for their services, but the cost of the resources they deploy is billed separately, so the total still needs a quote from the cloud account. Where a page shows a dollar sign without naming a currency, the profile records the figure as shown.

## Run limits and what counts

Runs and resources are the usual meters. HCP Terraform bills for each resource under management, so the count of managed resources sets the bill. Pulumi counts managed resources, and its free tier allows one concurrent stack update. Oracle Resource Manager locks each stack, so only one job can run on a stack at a time. A team with many stacks will need to plan for jobs running in parallel across stacks, not within one.

Google's plan and apply runs use Cloud Build, which charges for build minutes above the amount included. A team that deploys often should check the build minute use in the first month, because that charge grows with the number of runs.

## Products left out

Several tools come up in this category and did not make the list. Terrateam's domain now redirects to StateGraph's site, so it is not treated as a separate product. Digger's name now points to OpenTaco, and the OpenTaco pages read for this draft show no plan, apply, state or price details. Massdriver's pricing page lists a managed tier at $999 a month, but its page does not describe a plan step or state storage, so it is left out.

Firefly lists Terraform and OpenTofu among the tools it manages, and it describes a complete history of resource states. Its pages do not describe a plan step before deployment. ControlMonkey describes customer use of Terraform, drift detection and pipeline controls, but its pages do not describe plan preview, approval or state. Terramate splits Terraform, OpenTofu and Terragrunt state into smaller stacks, but its page shows no price and does not describe a plan step on its own pages.

## Testing before you pay

Count the state files, workspaces or stacks you need, then ask each vendor for the price at that count in writing. Include run fees, build minutes and any per-resource charge on top of the base plan. For the cloud services, ask for the estimate of the resources a stack will create, because that estimate is the real cost.

Ask where state is stored, whether it can be exported, and what happens to it when you cancel. Spacelift offers Spacelift-managed state only when a stack is created, so that choice cannot be made later. Azure Bicep keeps state inside Azure, so a team that needs its own copy has to export it through another route.

Run one real change through a plan and an apply in each tool you shortlist, and time how long the review takes. Check whether a plan from a pull request can be approved by someone other than its author. That check is often the one that decides which tool a team keeps.
