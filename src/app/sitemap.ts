import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/seo';

const ROUTES = ['', '/grid-apex', '/solis', '/sanyog', '/tvasta', '/emudran', '/agrim', '/licenses', '/electricity-grievances', '/space-planning', '/print-management', '/studio'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route || '/'}`, changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7 }));
}
