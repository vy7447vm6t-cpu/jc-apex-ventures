"use client";

import React from 'react';
import SectionEyebrow from './SectionEyebrow';
import AnimatedCounter from './AnimatedCounter';
import SpotlightCard from './SpotlightCard';
import { Ambient, MicroSlats, RevealWords } from './effects';
import { keyFacts, type KeyFact, type ProofStatus } from '@/content/track-record';
import { PROOF_LINE } from '@/content/messaging';

// Where each fact comes from, shown under it.
const SOURCE_LINE: Partial<Record<ProofStatus, string>> = {
  verified: 'Source: completion certificates on file',
  'company-record': 'Source: company records',
};

/** "36+ years" counts up to 36 and keeps " years" and the plus; "1 MW+" is too small to count and stays as it is. */
function FactValue({ value }: { value: KeyFact['value'] }) {
  const match = value.match(/^(\d+)(.*)$/);
  const end = match ? Number(match[1]) : 0;
  if (!match || end < 10) return <>{value}</>;
  return <AnimatedCounter end={end} suffix={match[2]} duration={1600} />;
}

/**
 * Why one office: Mumbai's four utilities and what goes wrong when design, wiring and filing sit
 * with different firms, then the confirmed facts counting up beside it. Only facts marked verified
 * or company record reach the page (src/content/track-record.ts).
 */
export default function GroundedWhy() {
  const facts = keyFacts();

  return (
    <section
      id="about"
      style={{
        backgroundColor: '#F4F1EA',
        color: '#111111',
        padding: 'clamp(64px, 8vh, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '100px',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
      }}
    >
      {/* Anchor destination for header studio navigation */}
      <div id="studio" style={{ position: 'absolute', top: '-100px', left: 0, visibility: 'hidden' }} />

      {/* The hero's louvre slats carry on faintly behind this section, in Deep Gold. */}
      <Ambient desktopOnly>
        <MicroSlats count={24} color="#8C6D23" opacity={0.1} zIndex={0} showTicks />
      </Ambient>

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <SectionEyebrow>Why one office</SectionEyebrow>

        <div className="why-grid">
          <div>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 20px',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              <RevealWords text="Mumbai has four power utilities, and each one handles a load change its own way." />
            </h2>
            <div style={{ maxWidth: '640px', fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '1.05rem', lineHeight: 1.65, color: '#4A4A46' }}>
              <p style={{ margin: '0 0 12px' }}>
                BEST supplies the island city, Adani Electricity the suburbs, Tata Power customers across the city, and MSEDCL the wider
                region. A rooftop plant, a new lift or an office fit-out usually means filing a change with one of them.
              </p>
              <p style={{ margin: '0 0 24px' }}>
                When the design, the wiring and the filing sit with different firms, drawings get redone and the application waits.
                Here one person follows your job from the first site visit to the new meter.
              </p>
              <p className="margin-note">{PROOF_LINE}</p>
            </div>
          </div>

          <SpotlightCard theme="light" enableTilt={false} className="why-facts-card">
            <dl className="fact-rows why-facts">
              {facts.map((fact) => (
                <div key={fact.id}>
                  <dt>{fact.label}</dt>
                  <dd>
                    <span className="why-fact-value">
                      <FactValue value={fact.value} />
                    </span>
                    {SOURCE_LINE[fact.proof] && <small>{SOURCE_LINE[fact.proof]}</small>}
                  </dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
