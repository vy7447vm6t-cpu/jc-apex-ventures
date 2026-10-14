import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';
import { AccordionGallery } from '@/components/react-bits';

export const metadata: Metadata = {
  title: `${tvasta.name} | Interior Design & Space Planning | JC Apex Ventures`,
  description: tvasta.description,
};

const TVASTA_TIERS = [
  {
    id: 'tier-standard',
    title: 'Standard Tier : Durable Essentials',
    subtitle: 'Functional Commercial Grade',
    badge: 'Tier 01',
    description: 'Vitrified high-traffic tile flooring, commercial grade modular laminate workstations, acoustic drywall partitions, and energy-efficient LED task lighting.',
    image: '/images/architectural-interior.jpg',
    specs: ['Commercial Laminates', 'Gypsum Acoustic Partitions', 'Concealed Wiring', '2-Year Warranty'],
  },
  {
    id: 'tier-premium',
    title: 'Premium Tier : Curated Architectural Finishes',
    subtitle: 'Contemporary Executive Suite',
    badge: 'Tier 02',
    description: 'Natural veneer paneling, fluted acoustic baffle ceilings, frameless double-glazed glass partitions, integrated smart HVAC controls, and engineered quartz counters.',
    image: '/images/architectural-fitout-materials.jpg',
    specs: ['Natural Wood Veneers', 'Acoustic Ceiling Baffles', 'Smart Automation', '5-Year Warranty'],
  },
  {
    id: 'tier-luxury',
    title: 'Luxury Tier : Bespoke Spatial Craftsmanship',
    subtitle: 'High-Net-Worth Headquarters',
    badge: 'Tier 03',
    description: 'Book-matched imported Italian marble, custom architectural bronze and brass metalwork, boardroom acoustic isolation rated to STC 52, and museum-grade dimmable lighting scenes.',
    image: '/images/tvasta_luxury_interior.jpg',
    specs: ['Italian Marble', 'Bespoke Architectural Metals', 'STC 52 Isolation', 'Lifetime Heritage Support'],
  },
];

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
    >
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
            Architectural Fit-Out Horizons
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#111111] mt-1">
            Interactive Three-Tier Material & Execution Palette
          </h3>
          <p className="text-xs text-[#666666] mt-1">
            Click any tier to expand finishes, acoustic ratings, and material specifications.
          </p>
        </div>
        <AccordionGallery items={TVASTA_TIERS} />
      </div>
    </DivisionPage>
  );
}
