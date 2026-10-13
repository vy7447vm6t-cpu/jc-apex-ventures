import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';

export const metadata: Metadata = {
  title: `${tvasta.name} | Interior Design & Space Planning | JC Apex Ventures`,
  description: tvasta.description,
};

export default function TvastaPage() {
  return (
    <DivisionPage
      data={tvasta}
      customHeroLogo={
        <div
          className="ios-glass-light"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 24px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(194, 159, 83, 0.35)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <img
            src="/images/logos/tvasta_brand_mark.png"
            alt="TVASTA Luxury Emblem"
            style={{ height: '68px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>
      }
    />
  );
}
