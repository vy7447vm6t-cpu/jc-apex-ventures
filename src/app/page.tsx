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
import InteractiveTabbedMonograph from '@/components/InteractiveTabbedMonograph';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="grounded-canvas text-center items-center">
      {/* ✦ Multi-Disciplinary Engineering & Design Consortium | One International Centre, Mumbai */}
      <div className="sr-only">
        ✦ Multi-Disciplinary Engineering & Design Consortium | One International Centre, Mumbai
      </div>

      {/* 1. Grounded Fixed Minimalist Island Navigation with Live Mumbai Clock */}
      <Navbar />

      {/* 2. Grounded Full-Bleed Multi-Zone Interactive Hero */}
      <GroundedHero />

      {/* 3. "Our Why" Section (section_layout60) with Engineering Manifesto & Stat Counters */}
      <GroundedWhy />

      {/* 4. Interactive Services & Divisions Directory with Photo Crossfade Viewport */}
      <GroundedServices />

      {/* 5. Horizontal Project Track with Progressive Blur Edge Masks */}
      <GroundedProjectTrack />

      {/* 6. Institutional Accreditations 9-Box Hairline Grid */}
      <GroundedAffiliations />

      {/* 7. Numbered 3-Step Process Protocol Cards */}
      <GroundedProcess />

      {/* 8. Statutory Recognition & Regulatory Parameters 4-Column Ledger Table */}
      <GroundedRecognition />

      {/* 9. Strategic Division Monograph & Associate Leadership Dossiers */}
      <section
        id="monograph"
        className="section"
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '120px 24px',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'left' }}>
          <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
            <span className="text-eye-brow">[consortium dossiers]</span>
          </div>

          <div style={{ maxWidth: '960px', marginBottom: '40px' }}>
            <h3
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: '0 0 16px 0',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              Curated Strategic Division Monograph
            </h3>
            <p
              style={{
                fontSize: '1.05rem',
                color: '#666666',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Select any discipline below to review authentic field photography, engineering pillars, and verified associate credentials.
            </p>
          </div>

          <InteractiveTabbedMonograph />
        </div>
      </section>

      {/* 10. Interactive Terrace Comparison: Standard Solar vs Solis Walkable Pergola */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-grounded-stone)',
          padding: '120px 24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'left' }}>
          <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
            <span className="text-eye-brow">[spatial comparison]</span>
          </div>

          <div style={{ maxWidth: '960px', marginBottom: '40px' }}>
            <h3
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#111111',
                margin: '0 0 16px 0',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              Traditional Cluttered Roof vs Solis Walkable Pergola
            </h3>
            <p
              style={{
                fontSize: '1.05rem',
                color: '#666666',
                lineHeight: 1.6,
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

      {/* 11. Restyled Estimators in Grounded Physical Paper Format */}
      <GroundedCalculators />

      {/* 12. Grounded Architectural Consultation CTA Section */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-grounded-bg)',
          padding: '100px 24px',
          borderTop: '1px solid var(--color-grounded-border)',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#111111',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: 'clamp(44px, 6vw, 72px) clamp(24px, 5vw, 48px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '18px',
                fontWeight: 500,
              }}
            >
              [engineering consultation desk]
            </div>

            <h3
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: '0 auto 18px auto',
                maxWidth: '720px',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              Have a utility sanction, solar EPC, or interior fit-out requirement?
            </h3>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '640px',
                margin: '0 auto 36px auto',
                lineHeight: 1.6,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 300,
              }}
            >
              Call our engineering desk directly or send us an enquiry. We review your site parameters, verify statutory feasibility, and provide verified next steps.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <a
                href="tel:+917021112664"
                className="button is-icon"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#111111',
                  padding: '0.85rem 1.6rem',
                }}
              >
                <Phone size={16} />
                <span>Call +91 70211 12664</span>
              </a>
              <a
                href="mailto:admin@jcapexv.com"
                className="button is-icon is-alternate"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  padding: '0.85rem 1.6rem',
                }}
              >
                <Mail size={16} color="#FFFFFF" />
                <span>Email admin@jcapexv.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Grounded Architectural Footer */}
      <Footer />
    </main>
  );
}
