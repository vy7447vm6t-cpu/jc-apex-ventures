import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { agrim } from '@/content/divisions';

export const metadata: Metadata = {
  title: 'Agrim | Project loan coordination | JC Apex Ventures',
  description: agrim.description,
};

export default function AgrimPage() {
  return <DivisionPage data={agrim} />;
}
