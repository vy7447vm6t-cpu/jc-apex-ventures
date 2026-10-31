"use client";

import React from 'react';
import SectionEyebrow from './SectionEyebrow';

// Text only, no logos: their logos would suggest an endorsement we do not have (brand guidelines 2.8.1, 2.8.3).
const AUTHORITIES = [
  'BEST Undertaking',
  'Adani Electricity',
  'Tata Power',
  'MSEDCL',
  'MERC and CGRF',
  'PWD Electrical Inspectorate',
  'MPCB',
  'MNRE (PM Surya Ghar)',
];

export default function GroundedAffiliations() {
  return (
    <section
      id="affiliations"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        padding: 'clamp(72px, 10vh, 112px) 24px',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '100px',
      }}
    >
      <div className="authorities-grid" style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <div>
          <SectionEyebrow number={4}>Approvals</SectionEyebrow>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Utilities and authorities we work with
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#4A4A46', margin: 0, maxWidth: '460px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
            We deal with these bodies on our clients&apos; behalf for connections, load changes, inspections, approvals and
            grievances. We are not affiliated with or endorsed by any of them.
          </p>
        </div>
        <ul className="authorities-list">
          {AUTHORITIES.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
