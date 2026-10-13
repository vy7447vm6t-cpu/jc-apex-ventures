import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { sanyog } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${sanyog.name} | Electricity Connections & Grievances | JC Apex Ventures`,
  description: sanyog.description,
};

export default function SanyogPage() {
  return (
    <DivisionPage
      data={sanyog}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <DivisionLogo division="sanyog" size={56} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.06em', color: '#111111' }}>
              SANYOG
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Utility Liaisoning & CGRF
            </span>
          </div>
        </div>
      }
    />
  );
}
