import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { grievancesPage } from '@/content/service-pages';

export const metadata: Metadata = {
  title: 'Bill disputes and grievances | Sanyog | JC Apex Ventures',
  description: grievancesPage.description,
};

export default function GrievancesPage() {
  return <DivisionPage data={grievancesPage} />;
}
