import type { APIRoute } from 'astro';
import { programs } from '../data/programs';

const site = 'https://dety74.ru';
const staticPaths = ['/', '/programs/', '/schedule/', '/events/', '/about/', '/contacts/'];
const programPaths = programs
  .filter((program) => program.status === 'active' || program.status === 'planned')
  .map((program) => `/programs/${program.slug}/`);

export const GET: APIRoute = () => {
  const urls = [...staticPaths, ...programPaths]
    .map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`)
    .join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
