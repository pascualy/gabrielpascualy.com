# Gabriel Pascualy's website

A personal home for writing about product judgment, AI, and reliable software. Built with Astro and published by GitHub Pages. There is no tracking or client-side JavaScript.

## Publish a post

You can ask Codex to add an article to this repository, or add a Markdown file under `src/content/posts/` in GitHub. Use a short filename such as `reviewing-ai-output.md`; it becomes the article's address.

Start each article with:

```yaml
---
title: "Your article title"
description: "A one-sentence introduction for the writing index and link previews."
date: 2026-09-30
type: Essay
draft: true
---
```

Write the article below that block. `type` can be `Essay` or `Note`. Keep `draft: true` while working. Change it to `false` and commit to `main` to publish. GitHub automatically checks, builds, and deploys the site; the article also appears in the writing index, RSS feed, and sitemap.

Drafts are excluded from the website, but the source repository is public. Keep private material elsewhere. Articles dated in the future are excluded until a build runs on or after their date; changing the date alone does not schedule a build.

The `example-draft.md` file is a template and is hidden from the website. Rename it when creating your first essay. The welcome note can be edited or removed as your writing grows.

## Local preview

Use Node.js 22.12 or later:

```sh
npm ci
npm run dev
```

To check a production build:

```sh
npm run check
npm run build
npm run verify
npm run preview
```

## Publishing address

GitHub Pages is configured to deploy from `.github/workflows/publish.yml`. Every build reads the current Pages address from GitHub, so links, metadata, RSS, and sitemap adapt when the custom domain is connected.

The initial address is `https://pascualy.github.io/gabrielpascualy.com/`. The planned domain is `gabrielpascualy.com`, pending confirmation of ownership or registration and DNS setup.

For a local build that matches the initial address:

```sh
SITE_ORIGIN=https://pascualy.github.io BASE_PATH=/gabrielpascualy.com npm run build
SITE_ORIGIN=https://pascualy.github.io BASE_PATH=/gabrielpascualy.com npm run verify
```

## Editing the site

- Home: `src/pages/index.astro`
- About: `src/pages/about.astro`
- Name, portrait, navigation, and metadata: `src/layouts/Base.astro`
- Styling: `src/styles/global.css`
- Writing: `src/content/posts/`

Writing and photography remain Gabriel Pascualy's property.
