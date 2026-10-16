"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GroundedHero from '@/components/GroundedHero';
import GroundedWhy from '@/components/GroundedWhy';
import GroundedServices from '@/components/GroundedServices';
import GroundedProjectTrack from '@/components/GroundedProjectTrack';
import GroundedAffiliations from '@/components/GroundedAffiliations';
import GroundedProcess from '@/components/GroundedProcess';
import GroundedRecognition from '@/components/GroundedRecognition';
import GroundedCalculators from '@/components/GroundedCalculators';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Phone, Mail } from 'lucide-react';
import {
  ScrollExpand,
  MicroSlats,
  ShapeWaves,
  TechText,
  SpecularButton,
} from '@/components/react-bits';

export default function Home() {
  return (
    <main className="grounded-canvas">
      {/* ✦ Multi-Disciplinary Engineering & Design Consortium | One International Centre, Mumbai */}
      <div className="sr-only">
        ✦ Multi-Disciplinary Engineering &amp; Design Consortium | One International Centre, Mumbai
      </div>

      {/* 1. Grounded Fixed Minimalist Island Navigation with Live Mumbai Clock */}
      <Navbar />

      {/* 2. Grounded Full-Bleed Multi-Zone Interactive Hero */}
      <GroundedHero />

      {/* 3. Section 2: "Our Why" Section (section_layout60) with Engineering Manifesto & Stat Counters */}
      <GroundedWhy />

      {/* 4. Section 3: Interactive Services & Divisions Directory with Photo Crossfade Viewport */}
      <GroundedServices />

      {/* 5. Section 4: Horizontal Project Track with FlexCarousel & DepthCarousel Dossier Modal */}
      <GroundedProjectTrack />

      {/* 6. Section 5: Institutional Accreditations 9-Box MagicBento Grid */}
      <GroundedAffiliations />

      {/* 7. Section 6: Numbered 3-Step Process Protocol Cards with SvgPathAnimator */}
      <GroundedProcess />

      {/* 8. Section 7: Interactive Terrace Comparison wrapped in ScrollExpand */}
      <ScrollExpand initialScale={0.96} finalScale={1.0}>
        <section
          className="section"
          style={{
            backgroundColor: '#F4F1EA',
            padding: 'clamp(80px, 9vw, 128px) clamp(20px, 4vw, 48px)',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'left' }}>
            <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans), Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#666666',
                }}
              >
                [07 / SPATIAL AMENITY COMPARISON]
              </span>
            </div>

            <div style={{ maxWidth: '960px', marginBottom: '40px' }}>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  lineHeight: 1.12,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Traditional Cluttered Roof vs Solis Walkable Pergola.
              </h2>
              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#4A4A46',
                  lineHeight: 1.65,
                  margin: 0,
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                See why Mumbai housing societies and private bungalows choose elevated pergolas: generate clean electricity overhead without forfeiting recreation or walking space.
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage="/images/solar-rooftop-array.jpg"
              afterImage="/images/solis_terrace_lounge.jpg"
              beforeLabel="Traditional Cluttered Roof"
              afterLabel="Solis Walkable Pergola"
              beforeBadge="Floor Obstructed"
              afterBadge="100% Usable Terrace"
            />
          </div>
        </section>
      </ScrollExpand>

      {/* 9. Section 8: Restyled Estimators in Grounded Physical Paper Format with Live Bklit Charts */}
      <GroundedCalculators />

      {/* 10. Section 9: Statutory Recognition & Regulatory Parameters Ledger with LineSidebar */}
      <GroundedRecognition />

      {/* 11. Section 10: Grounded Architectural Consultation CTA Section */}
      <section
        className="section"
        style={{
          backgroundColor: '#F4F1EA',
          padding: 'clamp(72px, 8vw, 112px) clamp(20px, 4vw, 48px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="text-center" style={{ maxWidth: '1120px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#111111',
              color: '#FFFFFF',
              borderRadius: '28px',
              padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 56px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Architectural Louver Geometry & Topographic Waves */}
            <MicroSlats
              count={14}
              opacity={0.14}
              color="rgba(255, 255, 255, 0.45)"
              showTicks={true}
              zIndex={1}
            />
            <div className="pointer-events-none absolute inset-0 z-[1] opacity-30">
              <ShapeWaves color="rgba(194, 159, 83, 0.42)" lineCount={5} />
            </div>

            <div style={{ position: 'relative', zIndex: 5 }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#D4B56A',
                  marginBottom: '18px',
                  fontWeight: 700,
                }}
              >
                <TechText
                  text="[10 / ENGINEERING CONSULTATION DESK · MUMBAI HQ]"
                  trigger="mount"
                  speed={22}
                />
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                  lineHeight: 1.12,
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  margin: '0 auto 18px auto',
                  maxWidth: '760px',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Have a utility sanction, solar EPC, or interior fit-out requirement?
              </h2>

              <p
                style={{
                  fontSize: '1.04rem',
                  color: 'rgba(255, 255, 255, 0.82)',
                  maxWidth: '640px',
                  margin: '0 auto 36px auto',
                  lineHeight: 1.65,
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontWeight: 400,
                }}
              >
                Call our engineering desk directly at One International Centre or send us an enquiry. We review your site parameters, verify statutory feasibility across BEST, Adani, Tata Power, or MSEDCL, and provide verified next steps.
              </p>

              <div
                className="items-center"
                style={{
                  display: 'flex',
                  gap: '14px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <SpecularButton href="tel:+917021112664" variant="gold">
                  <Phone size={15} />
                  <span>Call +91 70211 12664</span>
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

      {/* 12. Grounded Architectural Footer */}
      <Footer />
    </main>
  );
}
