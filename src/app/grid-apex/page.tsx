import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { gridApex } from '@/content/divisions';

export const metadata: Metadata = {
  title: 'Grid Apex | HT and LT electrical work | JC Apex Ventures',
  description: gridApex.description,
};

export default function GridApexPage() {
  return <DivisionPage data={gridApex} />;
}
