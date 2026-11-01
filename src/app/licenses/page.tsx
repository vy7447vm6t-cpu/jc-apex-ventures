import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { licencesPage } from '@/content/service-pages';

export const metadata: Metadata = {
  title: 'Connections and licences | Sanyog | JC Apex Ventures',
  description: licencesPage.description,
};

export default function LicencesPage() {
  return <DivisionPage data={licencesPage} />;
}
