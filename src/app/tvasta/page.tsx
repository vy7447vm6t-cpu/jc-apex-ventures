import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';

export const metadata: Metadata = pageMetadata({
  title: 'Tvasta | Interior design and fit-out',
  description: tvasta.description,
  path: '/tvasta',
});

export default function TvastaPage() {
  return <DivisionPage data={tvasta} />;
}
