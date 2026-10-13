import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { gridApex } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${gridApex.name} | Electrical, Solar & Waste Systems | JC Apex Ventures`,
  description: gridApex.description,
};

export default function GridApexPage() {
  return (
    <DivisionPage
      data={gridApex}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src="/images/logos/grid_apex_brand_mark.png"
            alt="GRID APEX Engineering Infrastructure Brand Mark"
            style={{ height: '54px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ width: '1px', height: '42px', background: 'rgba(194, 159, 83, 0.45)' }} />
          <DivisionLogo division="grid-apex" size={54} />
        </div>
      }
    />
  );
}
