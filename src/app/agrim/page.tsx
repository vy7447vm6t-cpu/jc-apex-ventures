import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
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
  return (
    <DivisionPage
      data={agrim}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <DivisionLogo division="agrim" size={56} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.06em', color: '#111111' }}>
              AGRIM
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Financial Dossier Advisory
            </span>
          </div>
        </div>
      }
    />
  );
}
