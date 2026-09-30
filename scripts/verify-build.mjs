import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = 'dist';
const origin = process.env.SITE_ORIGIN || 'https://pascualy.github.io';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const expected = ['index.html', 'about/index.html', '404.html', 'rss.xml', 'sitemap.xml', 'robots.txt', 'favicon.svg', 'images/gabriel-pascualy.png'];
for (const file of expected) assert.ok(existsSync(join(root, file)), `Missing ${file}`);

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const htmlFiles = filesIn(root).filter((path) => path.endsWith('.html'));
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `Missing canonical URL in ${file}`);
  assert.ok(canonical[1].startsWith(`${origin}${base}/`), `Incorrect canonical URL in ${file}`);
  assert.ok(html.includes('id="main"'), `Missing main content in ${file}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const url = decodeURIComponent(match[1]);
    assert.ok(url.startsWith(`${base}/`), `Link outside website base: ${url} in ${file}`);
    const relative = url.slice(base.length).replace(/^\//, '');
    const target = relative.endsWith('/') || !relative ? `${relative}index.html` : relative;
    assert.ok(existsSync(join(root, target)), `Broken local link: ${url} in ${file}`);
  }
}

const rss = readFileSync(join(root, 'rss.xml'), 'utf8');
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
assert.ok(rss.includes(`${origin}${base}/rss.xml`), 'RSS has the wrong address');
assert.ok(sitemap.includes(`${origin}${base}/about/`), 'Sitemap is missing About');
assert.ok(readFileSync(join(root, 'robots.txt'), 'utf8').includes(`${origin}${base}/sitemap.xml`));

for (const file of filesIn('src/content/posts').filter((path) => path.endsWith('.md'))) {
  const source = readFileSync(file, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
  const date = frontmatter.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
  const hidden = /^draft:\s*true\s*$/m.test(frontmatter) || !/^draft:\s*false\s*$/m.test(frontmatter) || (date && new Date(date).getTime() > Date.now());
  if (hidden) {
    const slug = basename(file, '.md');
    assert.ok(!existsSync(join(root, 'writing', slug)), `Hidden article was published: ${slug}`);
    assert.ok(!rss.includes(`/writing/${slug}/`) && !sitemap.includes(`/writing/${slug}/`), `Hidden article is in a feed: ${slug}`);
  }
}

console.log(`Verified ${htmlFiles.length} pages, local links, publishing addresses, RSS, sitemap, and hidden drafts.`);
