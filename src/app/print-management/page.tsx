import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { printPage } from '@/content/service-pages';

export const metadata: Metadata = pageMetadata({
  title: 'Print and signage orders | eMudran',
  description: printPage.description,
  path: '/print-management',
});

export default function PrintManagementPage() {
  return <DivisionPage data={printPage} />;
}
