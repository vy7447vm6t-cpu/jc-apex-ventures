import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';

export const metadata: Metadata = pageMetadata({
  title: 'eMudran | Brand, packaging, signage and print',
  description: emudran.description,
  path: '/emudran',
});

export default function EmudranPage() {
  return <DivisionPage data={emudran} />;
}
