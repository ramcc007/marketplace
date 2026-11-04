// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output works on Vercel, Cloudflare and any VPS without an adapter.
// Set PUBLIC_SITE_URL once the domain is bought; canonical URLs and sitemaps use it.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  trailingSlash: 'never',
  build: { format: 'file' },
  // The writing rules use straight quotes; stop markdown from curling them.
  markdown: { smartypants: false },
  vite: { plugins: [tailwindcss()] },
});
