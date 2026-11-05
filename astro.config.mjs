// @ts-check
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Tables written in markdown arrive with bare <th> cells. After the build, give each one scope="col"
// so screen readers announce the header with its column. Cells that already carry a scope are left alone.
function tableHeaderScope() {
  return {
    name: 'table-header-scope',
    hooks: {
      /** @param {{ dir: URL }} options */
      'astro:build:done': async ({ dir }) => {
        /** @param {string} folder */
        const walk = async (folder) => {
          for (const entry of await readdir(folder, { withFileTypes: true })) {
            const path = join(folder, entry.name);
            if (entry.isDirectory()) await walk(path);
            else if (entry.name.endsWith('.html')) {
              const html = await readFile(path, 'utf8');
              const fixed = html.replace(/<th(?=[\s>])([^>]*)>/g, (match, attrs) =>
                /\sscope=/.test(attrs) ? match : `<th${attrs} scope="col">`,
              );
              if (fixed !== html) await writeFile(path, fixed);
            }
          }
        };
        await walk(fileURLToPath(dir));
      },
    },
  };
}

// Static output works on Vercel, Cloudflare and any VPS without an adapter.
// PUBLIC_SITE_URL is set to https://b2brated.com on Vercel; canonical URLs and sitemaps use it.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  trailingSlash: 'never',
  redirects: { '/transparency': '/advertising-disclosure' },
  // The whole stylesheet is about 8 KiB, so it is inlined: no request blocks the first paint.
  build: { format: 'file', inlineStylesheets: 'always' },
  // The writing rules use straight quotes; stop markdown from curling them.
  markdown: { smartypants: false },
  integrations: [tableHeaderScope()],
  vite: { plugins: [tailwindcss()] },
});
