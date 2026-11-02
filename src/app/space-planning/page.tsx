import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import DivisionPage from '@/components/DivisionPage';
import { spacePlanningPage } from '@/content/service-pages';

export const metadata: Metadata = pageMetadata({
  title: 'Space planning and fit-out | Tvasta',
  description: spacePlanningPage.description,
  path: '/space-planning',
});

export default function SpacePlanningPage() {
  return <DivisionPage data={spacePlanningPage} />;
}
