import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${tvasta.name} | Interior Design & Space Planning | JC Apex Ventures`,
  description: tvasta.description,
};

export default function TvastaPage() {
  return <DivisionPage data={tvasta} />;
}
