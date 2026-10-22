"use client";

import React, { useState } from 'react';
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
import ConsultationModal from '@/components/ConsultationModal';
import Clippy from '@/components/Clippy';
import GroundedCTA from '@/components/GroundedCTA';
import { ScrollExpand } from '@/components/react-bits';

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationDivision, setConsultationDivision] = useState<string>('solis');

  const handleOpenConsultation = (division?: string) => {
    if (division) setConsultationDivision(division);
    setIsConsultationOpen(true);
  };

  return (
    <main className="grounded-canvas">
      {/* ✦ Multi-Disciplinary Engineering & Design Consortium | One International Centre, Mumbai */}
      <div className="sr-only">
        ✦ Multi-Disciplinary Engineering &amp; Design Consortium | One International Centre, Mumbai
      </div>

      {/* 1. Grounded Fixed Minimalist Island Navigation with Live Mumbai Clock */}
      <Navbar />
      <Clippy />

      {/* 2. Grounded Full-Bleed Multi-Zone Interactive Hero */}
      <div className="text-center">
        <GroundedHero onOpenConsultation={handleOpenConsultation} />
      </div>

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
          id="comparison"
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
      <GroundedCTA onOpenConsultation={handleOpenConsultation} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialDivision={consultationDivision}
      />

      {/* 12. Grounded Architectural Footer */}
      <Footer />
    </main>
  );
}
