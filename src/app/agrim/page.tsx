import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { agrim } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${agrim.name} | Project Finance Paperwork | JC Apex Ventures`,
  description: agrim.description,
};

/**
 * Regulatory Disclaimer:
 * AGRIM by JC Apex Ventures is not a lender, bank, or NBFC.
 * We provide non-lending administrative project finance file preparation, paperwork facilitation, and financial advisory documentation.
 */

export default function AgrimPage() {
  return <DivisionPage data={agrim} />;
}
