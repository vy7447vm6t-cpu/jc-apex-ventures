import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { printPage } from '@/content/service-pages';

export const metadata: Metadata = {
  title: 'Print and signage orders | eMudran | JC Apex Ventures',
  description: printPage.description,
};

export default function PrintManagementPage() {
  return <DivisionPage data={printPage} />;
}
