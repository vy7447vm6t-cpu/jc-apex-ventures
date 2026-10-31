import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';

export const metadata: Metadata = {
  title: 'Tvasta | Interior design and fit-out | JC Apex Ventures',
  description: tvasta.description,
};

export default function TvastaPage() {
  return <DivisionPage data={tvasta} />;
}
