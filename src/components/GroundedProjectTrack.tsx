"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';
import ScrollReveal from './ScrollReveal';
import WorkMap from './WorkMap';
import HotelGallery from './HotelGallery';
import { ATTRIBUTION_LINES, clientGroups, keyFacts } from '@/content/track-record';

const SERIF = 'var(--font-serif-display), "Instrument Serif", Georgia, serif';

/**
 * Clients and projects (company profile, pages 3 and 4): the map of where we have worked with
 * every hotel and plant named, the client hotels photographed, and the brands our Creative
 * Director has worked for. Everything comes from src/content/track-record.ts.
 */
export default function GroundedProjectTrack() {
  const solar = keyFacts().find((f) => f.id === 'solar-capacity');
  const sites = keyFacts().find((f) => f.id === 'hospitality-sites');
  const creative = clientGroups().find((g) => g.id === 'creative');

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#F4F1EA',
        color: '#111111',
        padding: 'clamp(88px, 12vh, 128px) 24px',
        position: 'relative',
        scrollMarginTop: '100px',
      }}
    >
      <div id="builds" className="absolute top-0 pointer-events-none" style={{ scrollMarginTop: '104px' }} aria-hidden="true" />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <SectionEyebrow number={2}>Clients and projects</SectionEyebrow>
        <div style={{ maxWidth: '820px', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
              fontFamily: SERIF,
            }}
          >
            {solar?.value} of solar, and HT work at {sites?.value} hotels.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#4A4A46', margin: '0 0 20px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
            Every client below is named as they are today. Solar capacities come from completion certificates on file; the hotel work is
            from our company records.
          </p>
          <p className="margin-note" style={{ fontSize: '18px' }}>
            {ATTRIBUTION_LINES.director}
          </p>
        </div>

        <WorkMap />

        <div className="clients-block">
          <h3 className="clients-block-title">Client hotels.</h3>
          <ScrollReveal>
            <HotelGallery />
          </ScrollReveal>
        </div>

        {creative && (
          <div className="clients-block">
            <h3 className="clients-block-title">Brands our Creative Director has worked for.</h3>
            <p className="margin-note" style={{ marginBottom: '24px' }}>
              {creative.attributionLine}
            </p>
            <ScrollReveal>
              <ul className="brand-wall">
                {creative.clients.map((c) => (
                  <li key={c.id} title={c.work}>
                    {c.name}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <p className="photo-caption">
              Credits from his career in brand and packaging design, shown for reference. These brands are not clients of JC Apex Ventures.{' '}
              <Link href="/emudran" className="work-key-link" style={{ display: 'inline-flex', marginLeft: '4px' }}>
                eMudran <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
