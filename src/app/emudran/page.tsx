import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${emudran.name} | Branding, Print & Signboards | JC Apex Ventures`,
  description: emudran.description,
};

export default function EmudranPage() {
  return <DivisionPage data={emudran} />;
}
