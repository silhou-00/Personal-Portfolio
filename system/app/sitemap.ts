import type { MetadataRoute } from 'next';

const SITE = 'https://matportfolio.vercel.app';

/* One page, so this is small - but robots.txt points at it, and a sitemap
   reference that 404s is worse than no reference at all. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
