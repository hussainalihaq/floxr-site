import type { MetadataRoute } from 'next';
import { COMPANY_META } from '@/lib/site-content';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Floxr — Full-Stack Software Company',
    short_name: 'Floxr',
    description: COMPANY_META,
    start_url: '/',
    display: 'standalone',
    background_color: '#08090B',
    theme_color: '#08090B',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
