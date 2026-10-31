import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { sanyog } from '@/content/divisions';

export const metadata: Metadata = {
  title: 'Sanyog | Power connections and bill disputes | JC Apex Ventures',
  description: sanyog.description,
};

export default function SanyogPage() {
  return <DivisionPage data={sanyog} />;
}
