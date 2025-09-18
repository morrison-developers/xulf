// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://shavonlloyd.com';
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/bio`, lastModified: now },
    { url: `${base}/works`, lastModified: now },
    { url: `${base}/calendar`, lastModified: now },
    { url: `${base}/media`, lastModified: now },
  ];
}
