import type { MetadataRoute } from 'next';

const SITE = 'https://www.floxr.co';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private surfaces: the responses dashboard, the HR app, and the API.
        disallow: ['/admin', '/api/', '/dashboard', '/login', '/signup', '/onboarding', '/employees', '/payroll'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
