"use client";

import React from 'react';
import SectionEyebrow from './SectionEyebrow';
import { LogoLoop } from '@/components/react-bits';
import { RevealWords } from './effects';

// Text only, no logos: their logos would suggest an endorsement we do not have.
const AUTHORITIES = [
  { id: 'best', name: 'BEST Undertaking', category: 'Island city supply' },
  { id: 'adani', name: 'Adani Electricity', category: 'Suburban supply' },
  { id: 'tata', name: 'Tata Power', category: 'Across Mumbai' },
  { id: 'msedcl', name: 'MSEDCL', category: 'Maharashtra' },
  { id: 'merc', name: 'MERC and CGRF', category: 'Grievances' },
  { id: 'pwd', name: 'PWD Electrical Inspectorate', category: 'Licences and inspection' },
  { id: 'mpcb', name: 'MPCB', category: 'Pollution control' },
  { id: 'mnre', name: 'MNRE (PM Surya Ghar)', category: 'Rooftop solar subsidy' },
];

/** The bodies we file with on clients' behalf, as one slow loop of names. */
export default function GroundedAffiliations() {
  return (
    <section
      id="affiliations"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        padding: 'clamp(72px, 10vh, 112px) 0',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '100px',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <SectionEyebrow>Who we file with</SectionEyebrow>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
            lineHeight: 1.15,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            maxWidth: '760px',
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
          }}
        >
          <RevealWords text="Utilities and authorities we work with" />
        </h2>
        <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#4A4A46', margin: '0 0 32px', maxWidth: '640px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
          Connections, load changes, inspections and complaints go to these bodies, and we deal with them for you. We are not
          affiliated with or endorsed by any of them.
        </p>
      </div>
      <LogoLoop items={AUTHORITIES} speed={48} label="Utilities and authorities we work with" />
    </section>
  );
}
