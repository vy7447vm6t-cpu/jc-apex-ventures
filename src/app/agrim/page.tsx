import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { agrim } from '@/content/divisions';

export const metadata: Metadata = pageMetadata({
  title: 'Agrim | Project loan coordination',
  description: agrim.description,
  path: '/agrim',
});

export default function AgrimPage() {
  return <DivisionPage data={agrim} />;
}
