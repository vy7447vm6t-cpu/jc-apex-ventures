import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { SITE_NAME } from '@/content/seo';

export const metadata: Metadata = {
  title: { absolute: 'JC Apex Ventures | Electrical, solar, utility, interiors and print, Mumbai' },
  alternates: { canonical: '/' },
  openGraph: { url: '/', siteName: SITE_NAME, locale: 'en_IN', type: 'website' },
};

export default function Page() {
  return <HomePage />;
}
