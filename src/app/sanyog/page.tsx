import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { sanyog } from '@/content/divisions';

export const metadata: Metadata = pageMetadata({
  title: 'Sanyog | Power connections and bill disputes',
  description: sanyog.description,
  path: '/sanyog',
});

export default function SanyogPage() {
  return <DivisionPage data={sanyog} />;
}
