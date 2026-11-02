import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { grievancesPage } from '@/content/service-pages';

export const metadata: Metadata = pageMetadata({
  title: 'Bill disputes and grievances | Sanyog',
  description: grievancesPage.description,
  path: '/electricity-grievances',
});

export default function GrievancesPage() {
  return <DivisionPage data={grievancesPage} />;
}
