import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { solis } from '@/content/divisions';

export const metadata: Metadata = pageMetadata({
  title: 'Solis | Solar, pergolas and EV charging',
  description: solis.description,
  path: '/solis',
});

export default function SolisPage() {
  return <DivisionPage data={solis} />;
}
