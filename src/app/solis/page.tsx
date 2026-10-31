import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { solis } from '@/content/divisions';

export const metadata: Metadata = {
  title: 'Solis | Solar, pergolas and EV charging | JC Apex Ventures',
  description: solis.description,
};

export default function SolisPage() {
  return <DivisionPage data={solis} />;
}
