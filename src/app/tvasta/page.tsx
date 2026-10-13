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
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <img
            src="/images/logos/tvasta-logo.png"
            alt="Tvasta Architecture & Space Planning Official Wordmark"
            style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
          />
        </div>
      }
    />
  );
}
