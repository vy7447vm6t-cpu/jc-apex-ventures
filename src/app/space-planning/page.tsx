import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { spacePlanningPage } from '@/content/service-pages';

export const metadata: Metadata = {
  title: 'Space planning and fit-out | Tvasta | JC Apex Ventures',
  description: spacePlanningPage.description,
};

export default function SpacePlanningPage() {
  return <DivisionPage data={spacePlanningPage} />;
}
