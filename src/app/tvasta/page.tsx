import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { tvasta } from '@/content/divisions';
import TvastaTierGallery, { TvastaTier } from '@/components/TvastaTierGallery';

export const metadata: Metadata = {
  title: `${tvasta.name} | Interior Design & Space Planning | JC Apex Ventures`,
  description: tvasta.description,
};

const TVASTA_TIERS: TvastaTier[] = [
  {
    id: 'tier-standard',
    title: 'Standard Tier : Durable Essentials',
    subtitle: 'Functional Commercial Grade',
    badge: 'Tier 01',
    description: 'Vitrified high-traffic tile flooring, commercial grade modular laminate workstations, acoustic drywall partitions, concealed electrical conduit wiring, and energy-efficient LED task lighting.',
    image: '/images/architectural-interior.jpg',
    specs: ['Commercial Laminates', 'Gypsum Acoustic Partitions', 'Concealed Conduit Wiring', '2-Year Turnkey Warranty'],
    rate: 'Rs 1,850 / sq.ft',
    turnaround: '45 to 60 days',
  },
  {
    id: 'tier-premium',
    title: 'Premium Tier : Curated Architectural Finishes',
    subtitle: 'Contemporary Executive Suite',
    badge: 'Tier 02',
    description: 'Natural veneer paneling, fluted acoustic baffle ceilings, frameless double-glazed glass partitions, integrated smart HVAC controls, and engineered quartz counters with acoustic isolation.',
    image: '/images/architectural-fitout-materials.jpg',
    specs: ['Natural Wood Veneers', 'Acoustic Ceiling Baffles', 'Smart Automation', '5-Year Turnkey Warranty'],
    rate: 'Rs 2,850 / sq.ft',
    turnaround: '60 to 75 days',
  },
  {
    id: 'tier-luxury',
    title: 'Luxury Tier : Bespoke Spatial Craftsmanship',
    subtitle: 'High-Net-Worth Headquarters',
    badge: 'Tier 03',
    description: 'Book-matched imported Italian marble, custom architectural bronze and brass metalwork, boardroom acoustic isolation rated to STC 52, and museum-grade dimmable lighting scenes.',
    image: '/images/tvasta_luxury_interior.jpg',
    specs: ['Italian Marble', 'Bespoke Architectural Metals', 'STC 52 Acoustic Isolation', 'Lifetime Heritage Support'],
    rate: 'Rs 4,600+ / sq.ft',
    turnaround: '90 to 120 days',
  },
];

export default function TvastaPage() {
  return (
    <DivisionPage
      data={tvasta}
      customHeroLogo={
        <img
          src="/images/logos/tvasta-dark.png"
          alt="TVASTA Official Luxury Emblem"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <TvastaTierGallery tiers={TVASTA_TIERS} />
    </DivisionPage>
  );
}
