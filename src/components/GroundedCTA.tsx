'use client';

import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { SpecularButton } from '@/components/react-bits';
import { divisions } from '@/content/divisions';
import SectionEyebrow from './SectionEyebrow';

// Enquiry routing, in the messaging framework's order of divisions.
const DIVISIONS = [
  { id: 'grid-apex', name: 'Grid Apex' },
  { id: 'solis', name: 'Solis' },
  { id: 'sanyog', name: 'Sanyog' },
  { id: 'tvasta', name: 'Tvasta' },
  { id: 'emudran', name: 'eMudran' },
  { id: 'agrim', name: 'Agrim' },
];

interface GroundedCTAProps {
  onOpenConsultation?: (divisionId?: string) => void;
}

/** Closing enquiry panel: plain Night panel, no scanning grid or animated headline (brand guidelines 2.8.2). */
export default function GroundedCTA({ onOpenConsultation }: GroundedCTAProps) {
  return (
    <section
      id="contact"
      className="section"
      style={{
        backgroundColor: '#F4F1EA',
        padding: 'clamp(72px, 8vw, 112px) clamp(20px, 4vw, 48px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '108px',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          backgroundColor: '#0B0E14',
          color: '#F0F3F6',
          borderRadius: '16px',
          padding: 'clamp(40px, 5.5vw, 72px) clamp(24px, 4.5vw, 56px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <SectionEyebrow number={7} tone="dark" inset>
          Enquire
        </SectionEyebrow>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)',
            lineHeight: 1.1,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: '0 0 16px',
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
          }}
        >
          Talk to us about your site.
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'rgba(240, 243, 246, 0.85)', maxWidth: '620px', margin: '0 0 32px', lineHeight: 1.65, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
          Call us, or send an enquiry and choose the division it is for. We reply with the next steps and the person who will handle
          them.
        </p>

        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#8B949E', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
          Send an enquiry to
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {DIVISIONS.map((div) => (
            <button key={div.id} type="button" onClick={() => onOpenConsultation?.(div.id)} className="cta-division-button">
              {div.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <SpecularButton onClick={() => onOpenConsultation?.()} variant="light">
            Send an enquiry
          </SpecularButton>
          <a href="tel:+917021112664" className="cta-contact-link">
            <Phone size={15} aria-hidden="true" />
            +91 70211 12664
          </a>
          <a href="mailto:admin@jcapexv.com" className="cta-contact-link">
            <Mail size={15} aria-hidden="true" />
            admin@jcapexv.com
          </a>
        </div>

        <div className="cta-details">
          <div>
            <p className="cta-details-title">Division inboxes</p>
            <dl className="cta-inboxes">
              {divisions.map((d) => (
                <div key={d.slug}>
                  <dt>{d.name}</dt>
                  <dd>
                    {d.contact.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`}>
                        {email}
                      </a>
                    ))}
                    {d.contact.note && <small>{d.contact.note}</small>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="cta-details-title">Office</p>
            <p className="cta-office">Units 801–802, 8th Floor, Tower 1, One International Centre, Senapati Bapat Marg, Elphinstone, Mumbai 400013</p>
          </div>
        </div>
      </div>
    </section>
  );
}
