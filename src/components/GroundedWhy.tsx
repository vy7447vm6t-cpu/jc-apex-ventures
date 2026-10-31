"use client";

import React from 'react';
import SectionEyebrow from './SectionEyebrow';
import { keyFacts, type ProofStatus } from '@/content/track-record';
import { PROOF_LINE } from '@/content/messaging';

// Where each fact comes from, shown under it (brand guidelines 2.8.3, fact row).
const SOURCE_LINE: Partial<Record<ProofStatus, string>> = {
  verified: 'Source: completion certificates on file',
  'company-record': 'Source: company records',
};

/**
 * "Our why": the argument for one accountable desk, then the facts behind it as fact rows.
 * The stat tiles and counters are retired, and unconfirmed figures stay off the page (guidelines 2.8.2, 6).
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
        scrollMarginTop: '100px',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
      }}
    >
      {/* Anchor destination for header studio navigation */}
      <div id="studio" style={{ position: 'absolute', top: '-100px', left: 0, visibility: 'hidden' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <SectionEyebrow number={1}>Our why</SectionEyebrow>

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
              In Mumbai, engineering without approvals means delay. Approvals without sound engineering fail inspection.{' '}
              <span style={{ fontStyle: 'italic' }}>We handle both as one job.</span>
            </h2>
            <div style={{ maxWidth: '640px', fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '1.05rem', lineHeight: 1.65, color: '#4A4A46' }}>
              <p style={{ margin: '0 0 12px' }}>
                Mumbai has four electricity distribution companies: BEST in the island city, Adani Electricity and Tata Power in the
                suburbs, and MSEDCL in the wider region. Each has its own process for connections, load changes and approvals.
              </p>
              <p style={{ margin: '0 0 24px' }}>
                When design, electrical work and approvals sit with different firms, work gets redone and approvals stall. We plan all
                three together from the first site visit.
              </p>
              <p className="margin-note">{PROOF_LINE}</p>
            </div>
          </div>

          <dl className="fact-rows why-facts">
            {facts.map((fact) => (
              <div key={fact.id}>
                <dt>{fact.label}</dt>
                <dd>
                  <span className="why-fact-value">{fact.value}</span>
                  {SOURCE_LINE[fact.proof] && <small>{SOURCE_LINE[fact.proof]}</small>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
