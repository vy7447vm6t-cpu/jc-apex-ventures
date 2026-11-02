import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { licencesPage } from '@/content/service-pages';

export const metadata: Metadata = pageMetadata({
  title: 'Connections and licences | Sanyog',
  description: licencesPage.description,
  path: '/licenses',
});

export default function LicencesPage() {
  return <DivisionPage data={licencesPage} />;
}
