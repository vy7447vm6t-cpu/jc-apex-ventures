'use client';

import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { GridScan, TechText, SpecularButton } from '@/components/react-bits';

interface GroundedCTAProps {
  onOpenConsultation?: (divisionId?: string) => void;
  brandText?: string;
  headlineText?: string;
}

export default function GroundedCTA({
  onOpenConsultation,
  brandText,
  headlineText,
}: GroundedCTAProps) {
  const headline =
    headlineText ||
    (brandText && brandText !== 'JC APEX VENTURES' ? brandText : undefined) ||
    'Have a utility sanction, solar EPC,\nor interior fit-out requirement?';
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
      <div className="text-center" style={{ maxWidth: '1120px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            backgroundColor: '#0e0e12',
            color: '#FFFFFF',
            borderRadius: '28px',
            padding: 'clamp(44px, 5.5vw, 76px) clamp(20px, 4.5vw, 52px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* GridScan 3D Room Background with Interactive Sonar Ping and Cyan Laser Sweep */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
            <GridScan
              linesColor="#4d4757"
              scanColor="#7dd3fc"
              cells={8}
              depth={3}
              scanDuration={2.4}
              scanDelay={1.6}
              clickEffect="ping"
              className="w-full h-full"
            />
            {/* Soft radial vignette ensuring razor-sharp textual contrast and legibility */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(14, 14, 18, 0.68) 0%, rgba(14, 14, 18, 0.45) 60%, rgba(14, 14, 18, 0.85) 100%)',
              }}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 5, pointerEvents: 'none' }}>
            {/* Eyebrow Label with TechText Scramble */}
            <div
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#D4B56A',
                marginBottom: '10px',
                fontWeight: 700,
                pointerEvents: 'auto',
                lineHeight: 1.4,
              }}
            >
              <TechText
                text="[10 / ENGINEERING CONSULTATION DESK · MUMBAI HQ]"
                trigger="mount"
                speed={22}
              />
            </div>

            {/* Focal TechText Interactive Headline in Instrument Serif with Dashed Vector Reveal and Tactile Click Kick */}
            <h2
              className="pointer-events-auto"
              style={{
                width: '100%',
                maxWidth: '820px',
                height: 'clamp(120px, 15vw, 165px)',
                margin: '4px auto 20px auto',
                position: 'relative',
              }}
            >
              <TechText
                text={headline}
                fontFamily='var(--font-serif-display), "Instrument Serif", Georgia, serif'
                fontWeight={400}
                fontSize={56}
                lineHeight={1.22}
                letterSpacing={-0.02}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
                labels={false}
                color="#FFFFFF"
                accentColor="#7dd3fc"
                align="center"
              />
              <span className="sr-only">
                Have a utility sanction, solar EPC, or interior fit-out requirement?
              </span>
            </h2>

            <p
              style={{
                fontSize: '1.04rem',
                color: 'rgba(255, 255, 255, 0.84)',
                maxWidth: '640px',
                margin: '0 auto 30px auto',
                lineHeight: 1.65,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 400,
                pointerEvents: 'auto',
              }}
            >
              Call our engineering desk directly at One International Centre or send us an enquiry. We review your site parameters, verify statutory feasibility across BEST, Adani, Tata Power, or MSEDCL, and provide verified next steps.
            </p>

            {/* Six Division Pills with Official Transparent Brand Marks for immediate consultation routing */}
            <div
              className="pointer-events-auto"
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: '720px',
                margin: '0 auto 32px auto',
              }}
            >
              {[
                { id: 'solis', label: 'Solar & Pergolas', logo: '/images/logos/solis-logo-white.png' },
                { id: 'sanyog', label: 'Tariff & CGRF', logo: '/images/logos/sanyog-official.png' },
                { id: 'grid-apex', label: 'Substations', logo: '/images/logos/grid-apex-white.png' },
                { id: 'tvasta', label: 'Interiors', logo: '/images/logos/tvasta-official.png' },
                { id: 'emudran', label: 'Packaging', logo: '/images/logos/emudran-white.png' },
                { id: 'agrim', label: 'EV & DPR', logo: '/images/logos/agrim-official.png' },
              ].map((div) => (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => onOpenConsultation?.(div.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: 'rgba(255, 255, 255, 0.92)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:bg-white/20 hover:border-sky-300/40 hover:scale-[1.02]"
                >
                  <img
                    src={div.logo}
                    alt={div.id}
                    style={{
                      height: '15px',
                      maxWidth: '56px',
                      width: 'auto',
                      objectFit: 'contain',
                      filter: div.id === 'sanyog' ? 'brightness(0) invert(1)' : 'none',
                    }}
                  />
                  <span
                    aria-hidden="true"
                    style={{ width: '1px', height: '11px', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                  />
                  <span>{div.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Action Consultation Buttons */}
            <div
              className="pointer-events-auto items-center"
              style={{
                display: 'flex',
                gap: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <SpecularButton
                onClick={() => onOpenConsultation?.()}
                variant="gold"
              >
                <Phone size={15} />
                <span>Initiate Engineering Consultation</span>
              </SpecularButton>

              <SpecularButton href="tel:+917021112664" variant="glass">
                <Phone size={15} />
                <span>Direct Desk +91 70211 12664</span>
              </SpecularButton>

              <SpecularButton href="mailto:admin@jcapexv.com" variant="glass">
                <Mail size={15} />
                <span>Email admin@jcapexv.com</span>
              </SpecularButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
