import type { MetadataRoute } from 'next';
import { LAB_SLUGS } from '@/lib/site-content';

const SITE = 'https://www.floxr.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  const pages: Array<{ path: string; priority: number; frequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1.0, frequency: 'monthly' },
    { path: '/work', priority: 0.9, frequency: 'monthly' },
    { path: '/capabilities', priority: 0.9, frequency: 'monthly' },
    { path: '/contact', priority: 0.8, frequency: 'yearly' },
    { path: '/about', priority: 0.7, frequency: 'yearly' },
    { path: '/lab', priority: 0.6, frequency: 'weekly' },
    { path: '/careers', priority: 0.4, frequency: 'monthly' },
    { path: '/privacy', priority: 0.2, frequency: 'yearly' },
  ];

  return [
    ...pages.map(({ path, priority, frequency }) => ({
      url: `${SITE}${path}`,
      lastModified: updated,
      changeFrequency: frequency,
      priority,
    })),
    ...LAB_SLUGS.map((slug) => ({
      url: `${SITE}/lab/${slug}`,
      lastModified: updated,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
