import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { gridApex } from '@/content/divisions';

export const metadata: Metadata = pageMetadata({
  title: 'Grid Apex | HT and LT electrical work',
  description: gridApex.description,
  path: '/grid-apex',
});

export default function GridApexPage() {
  return <DivisionPage data={gridApex} />;
}
