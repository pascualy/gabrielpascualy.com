import type { APIRoute } from 'astro';
import { publishedPosts, pathFor, escapeXml } from '../lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const routes = ['', 'about/', ...(await publishedPosts()).map((post) => `writing/${post.id}/`)];
  const urls = routes.map((path) => `<url><loc>${escapeXml(new URL(pathFor(path), site).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
