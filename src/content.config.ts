import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const isoDate = z.iso.date();

/** YAML frontmatter turns an unquoted 2026-11-03 into a Date; accept both forms and keep a string. */
const frontmatterDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

/** Every fact we publish carries the page it came from and the day we checked it. */
const sourced = { sourceUrl: z.url(), checkedAt: isoDate };

// One JSON file per product in content/products, named by the product slug.
// Moves to Postgres (Neon) when vendor editing and reviews arrive; see src/lib/catalog.ts.
const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './content/products' }),
  schema: z.object({
    name: z.string().min(1),
    status: z.enum(['draft', 'published']),
    vendor: z.object({ name: z.string().min(1), website: z.url() }),
    primaryCategory: z.string(),
    /** Written by us, never copied from the vendor. */
    summary: z.string().min(1),
    /** Our own hands-on notes, labeled as editorial on the page. */
    handsOnNote: z.string().optional(),
    /** Must-have capabilities the product meets, per category, each with the page that proves it. */
    qualifies: z
      .array(
        z.object({
          category: z.string(),
          checkedAt: isoDate,
          evidence: z.array(z.object({ capability: z.string(), sourceUrl: z.url() })).min(1),
        }),
      )
      .min(1),
    /** Short factual statements a buyer would want, written by us, each with its source. */
    facts: z.array(z.object({ text: z.string().min(1), ...sourced })).default([]),
    pricing: z.object({
      model: z.enum(['free', 'freemium', 'paid', 'quote_only']),
      freePlan: z.boolean(),
      freeTrialDays: z.number().int().nonnegative().nullable().default(null),
      plans: z
        .array(
          z.object({
            name: z.string(),
            priceUsd: z.number().nonnegative().nullable(),
            /** Only when the vendor publishes no USD price. Shown as listed, never converted. */
            listedPrice: z.object({ amount: z.number().nonnegative(), currency: z.string().length(3) }).optional(),
            billing: z.enum(['month', 'year', 'one_time', 'quote']),
            unit: z.string(),
            /** Flat monthly fee charged on top of the per-unit price, at list price. */
            baseFeeUsd: z.number().positive().optional(),
            /** Share of revenue or per-transaction fee, for billing and payment platforms. */
            volumeFee: z
              .object({ percent: z.number().nonnegative(), fixedUsd: z.number().nonnegative().optional(), basis: z.string() })
              .optional(),
            notes: z.string().optional(),
            /** Only when this plan is listed on a different page from pricing.sourceUrl. */
            sourceUrl: z.url().optional(),
          }),
        )
        .default([]),
      hiddenCosts: z.array(z.string()).default([]),
      sourceUrl: z.url(),
      verifiedAt: isoDate,
    }),
    security: z
      .object({
        soc2: z.boolean().nullable(),
        iso27001: z.boolean().nullable(),
        gdpr: z.boolean().nullable(),
        hipaa: z.boolean().nullable(),
        ssoPlan: z.string().nullable(),
        ...sourced,
      })
      .optional(),
    contract: z
      .object({
        annualOnly: z.boolean().nullable(),
        minSeats: z.number().int().nullable(),
        autoRenew: z.boolean().nullable(),
        cancellation: z.string().nullable(),
        dataExport: z.string().nullable(),
        /** Export details usually live in help docs, not in the terms. */
        exportSourceUrl: z.url().optional(),
        ...sourced,
      })
      .optional(),
    integrations: z.array(z.string()).default([]),
    screenshots: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    /** Any money between the vendor and us. Shown on every page that lists the product. */
    paidRelationship: z
      .object({ type: z.enum(['subscription', 'sponsored', 'affiliate']), since: isoDate })
      .nullable()
      .default(null),
    updatedAt: isoDate,
  }),
});

// One markdown file per category in content/categories, named by the category slug.
const categoryEditorial = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './content/categories' }),
  schema: z.object({
    title: z.string().optional(),
    definition: z.string().max(155),
    primaryKeyword: z.string(),
    criteriaApproved: z.boolean().default(false),
    writer: z.string(),
    editor: z.string().optional(),
    signedOffAt: frontmatterDate.optional(),
    updateLog: z.array(z.object({ date: frontmatterDate, note: z.string() })).default([]),
  }),
});

export const collections = { products, categoryEditorial };
