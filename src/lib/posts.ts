import { getCollection } from 'astro:content';

export async function publishedPosts() {
  return (await getCollection('posts', ({ data }) =>
    !data.draft && data.date.getTime() <= Date.now(),
  )).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function pathFor(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

export function readingMinutes(body = '') {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
}

export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  }[character]!));
}
