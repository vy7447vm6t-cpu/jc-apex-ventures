"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AccordionGallery } from '@/components/react-bits';
import SectionEyebrow from './SectionEyebrow';
import { Ambient, ShapeWaves } from './effects';
import { DIVISION_ONE_LINERS } from '@/content/messaging';
import { PHOTOS, type PhotoKey } from '@/content/photos';

// The six divisions in the messaging framework's order, with the white logo for the dark panels.
const DIVISIONS = [
  { id: 'grid-apex', name: 'Grid Apex', href: '/grid-apex', photo: 'grid-switchgear' as PhotoKey, logo: '/images/logos/grid-apex-white.png' },
  { id: 'solis', name: 'Solis', href: '/solis', photo: 'solis-rooftop' as PhotoKey, logo: '/images/logos/solis-logo-white.png' },
  { id: 'sanyog', name: 'Sanyog', href: '/sanyog', photo: 'sanyog-meters' as PhotoKey, logo: '/images/logos/sanyog-white.png' },
  { id: 'tvasta', name: 'Tvasta', href: '/tvasta', photo: 'tvasta-living' as PhotoKey, logo: '/images/logos/tvasta-official.png' },
  { id: 'emudran', name: 'eMudran', href: '/emudran', photo: 'emudran-print' as PhotoKey, logo: '/images/logos/emudran-white.png' },
  { id: 'agrim', name: 'Agrim', href: '/agrim', photo: 'agrim-plans' as PhotoKey, logo: '/images/logos/agrim-official.png' },
];

/**
 * The six divisions: expanding photo panels on large screens, a list on smaller ones, under three
 * gold sine waves.
 */
export default function GroundedServices() {
  const items = DIVISIONS.map((d) => ({ ...d, image: PHOTOS[d.photo].src, title: d.name, description: DIVISION_ONE_LINERS[d.id] }));
  // CC BY licences need the author named; CC0 and public-domain photos are credited in public/images/CREDITS.md.
  const credits = DIVISIONS.filter((d) => PHOTOS[d.photo].license.startsWith('CC BY')).map(
    (d) => `${d.name}: ${PHOTOS[d.photo].author}, ${PHOTOS[d.photo].license}`,
  );

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        backgroundColor: '#0B0E14',
        color: '#F0F3F6',
        padding: 'clamp(88px, 12vh, 128px) 24px',
        scrollMarginTop: '104px',
      }}
    >
      {/* Three gold sine waves drifting along the top of the section, like an AC trace. */}
      <Ambient opacity={0.45}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 'clamp(24px, 4vh, 48px)' }}>
          <ShapeWaves color="#C29F53" height={200} waveCount={3} />
        </div>
      </Ambient>

      {/* Anchor for backward compatibility with #divisions */}
      <div id="divisions" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <SectionEyebrow tone="dark">The six divisions</SectionEyebrow>
        <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
              lineHeight: 1.14,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              margin: '0 0 20px',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Who does what.
          </h2>
          <p style={{ fontSize: 'clamp(1.02rem, 1.35vw, 1.15rem)', color: 'rgba(240, 243, 246, 0.85)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
            Grid Apex wires and maintains, Solis builds solar plants and EV chargers, Sanyog files with the utilities, Tvasta
            designs and fits out interiors, eMudran prints and makes signs, and Agrim prepares loan files for your bank.
          </p>
        </div>

        <div className="hidden lg:block">
          <AccordionGallery items={items} />
        </div>

        <ul className="services-list">
          {items.map((d) => (
            <li key={d.id}>
              <Link href={d.href} className="services-list-link">
                <img src={d.logo} alt="" style={{ height: '24px', width: 'auto', maxWidth: '120px', objectFit: 'contain' }} />
                <span className="services-list-name">
                  {d.name}
                  <ArrowUpRight size={16} color="#C29F53" aria-hidden="true" />
                </span>
                <span className="services-list-line">{d.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="photo-caption" style={{ color: '#8B949E', marginTop: '16px' }}>
          Photographs are representative images. {credits.length > 0 && `Credits: ${credits.join('; ')}.`}
        </p>
      </div>
    </section>
  );
}
