import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_ORIGIN || 'https://pascualy.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  markdown: { syntaxHighlight: 'shiki' },
});
