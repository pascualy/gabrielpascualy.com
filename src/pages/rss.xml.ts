import type { APIRoute } from 'astro';
import { publishedPosts, pathFor, escapeXml } from '../lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const home = new URL(pathFor(), site).href;
  const self = new URL(pathFor('rss.xml'), site).href;
  const items = (await publishedPosts()).map((post) => {
    const link = new URL(pathFor(`writing/${post.id}/`), site).href;
    return `<item><title>${escapeXml(post.data.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><description>${escapeXml(post.data.description)}</description><pubDate>${post.data.date.toUTCString()}</pubDate></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Gabriel Pascualy</title><link>${escapeXml(home)}</link><description>Notes on product, AI, and reliable software.</description><language>en-us</language><atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
