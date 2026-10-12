import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { sanyog } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${sanyog.name} | Electricity Connections & Grievances | JC Apex Ventures`,
  description: sanyog.description,
};

export default function SanyogPage() {
  return <DivisionPage data={sanyog} />;
}
