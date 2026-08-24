// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Slugs of editorial articles marked `draft: true`, excluded from the sitemap
// (they already carry a noindex meta tag — this avoids listing them at all).
const editorialDir = fileURLToPath(new URL('./src/content/editorial/', import.meta.url));
const draftSlugs = readdirSync(editorialDir)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => /^draft:\s*true/m.test(readFileSync(editorialDir + file, 'utf-8')))
  .map((file) => file.replace(/\.md$/, ''));

// https://astro.build/config
export default defineConfig({
  site: 'https://viia.pro',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/editorial/apercu') &&
        !draftSlugs.some((slug) => page.includes(`/editorial/${slug}`)),
    }),
  ],
});
