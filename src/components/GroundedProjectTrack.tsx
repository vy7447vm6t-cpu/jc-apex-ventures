"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';
import ScrollReveal from './ScrollReveal';
import WorkMap from './WorkMap';
import { RevealWords } from './effects';
import HotelGallery from './HotelGallery';
import { ScrollStack, type ScrollStackCard } from '@/components/react-bits';
import {
  ATTRIBUTION_LINES,
  PROJECTS,
  clientGroups,
  formatCapacity,
  formatProjectDate,
  keyFacts,
  trackRecord,
  type Project,
} from '@/content/track-record';

const SERIF = 'var(--font-serif-display), "Instrument Serif", Georgia, serif';

/** One stacked card per plant, with the figures from its certificate; a proposal says so in its badge. */
function plantCard(p: Project): ScrollStackCard {
  return {
    id: p.id,
    title: p.title,
    subtitle: `${p.client}, ${p.location}`,
    description: `${p.scope}.`,
    badge: p.kind === 'completed' ? `Completed ${formatProjectDate(p.date)}` : p.statusNote,
    specs: [
      ...(p.capacity ? [`Capacity: ${formatCapacity(p.capacity)}`] : []),
      ...(p.valueBracket ? [`Value: ${p.valueBracket}`] : []),
      ...(p.equipment ? [`Modules: ${p.equipment}`] : []),
      // Never the certificate's issuer: who held which contract stays private (brand guidelines 5.2).
      p.kind === 'completed' ? 'Source: Completion certificate on file' : `Source: ${p.proof.note}`,
    ],
  };
}

/**
 * Clients and projects (company profile, pages 3 and 4): the map of where we have worked with
 * every hotel and plant named, the client hotels photographed, and the brands our Creative
 * Director has worked for. Everything comes from src/content/track-record.ts.
 */
export default function GroundedProjectTrack() {
  const solar = keyFacts().find((f) => f.id === 'solar-capacity');
  const sites = keyFacts().find((f) => f.id === 'hospitality-sites');
  const creative = clientGroups().find((g) => g.id === 'creative');
  const proposal = PROJECTS.find((p) => p.id === 'solis-charkop-pergola-proposal-2026');
  const plants = [...trackRecord('solis'), ...(proposal ? [proposal] : [])].map(plantCard);

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
        <SectionEyebrow>Clients and projects</SectionEyebrow>
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
            <RevealWords text={`${solar?.value} of solar, and HT electrical work at ${sites?.value} hotels.`} />
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#4A4A46', margin: '0 0 20px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
            Every client below is named as they are today. The solar figures come from completion certificates we hold; the hotel
            work is from our company records.
          </p>
          <p className="margin-note">
            {ATTRIBUTION_LINES.director}
          </p>
        </div>

        <WorkMap />

        <div className="clients-block">
          <h3 className="clients-block-title">The solar plants, newest first.</h3>
          <p className="margin-note">
            The last card is a proposal for a housing society in Charkop, not completed work.
          </p>
          <ScrollStack cards={plants} />
          <Link href="/solis" className="work-key-link" style={{ display: 'inline-flex' }}>
            Solis <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

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
