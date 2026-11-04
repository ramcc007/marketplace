export interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  /** False renders "noindex, follow". Page templates pass the quality gate result here. */
  index?: boolean;
  jsonLd?: Record<string, unknown>[];
  /** Path of the share image. Defaults to the site-wide one. */
  image?: string;
}
