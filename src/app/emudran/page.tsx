import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${emudran.name} | Branding, Print & Signboards | JC Apex Ventures`,
  description: emudran.description,
};

export default function EmudranPage() {
  return (
    <DivisionPage
      data={emudran}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src="/images/logos/00003033-eMudran_Business_Card_p1_img_0_X5.png"
            alt="eMudran Official CMYK Emblem"
            style={{ height: '60px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.04em', color: '#111111' }}>
              eMudran
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Luxury Packaging & Print
            </span>
          </div>
        </div>
      }
    />
  );
}
