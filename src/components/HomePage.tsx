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
import dynamic from 'next/dynamic';
import { LazyMount } from '@/components/effects';

// The estimators load as you scroll towards them; they are the heaviest script on the page.
const GroundedCalculators = dynamic(() => import('@/components/GroundedCalculators'), { ssr: false });
import ConsultationModal from '@/components/ConsultationModal';
import GroundedCTA from '@/components/GroundedCTA';

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationDivision, setConsultationDivision] = useState<string>('solis');

  const handleOpenConsultation = (division?: string) => {
    if (division) setConsultationDivision(division);
    setIsConsultationOpen(true);
  };

  return (
    <main id="main-content" className="grounded-canvas">
      <Navbar />

      {/* Hero, then sections numbered 01 to 07 in their eyebrows. The terrace comparison is on /solis. */}
      <GroundedHero onOpenConsultation={handleOpenConsultation} />

      <GroundedWhy />

      <GroundedProjectTrack />

      <GroundedServices />

      <GroundedAffiliations />

      <GroundedProcess />

      <div id="calculators" style={{ scrollMarginTop: "104px" }}>
        <LazyMount minHeight={900}>
          <GroundedCalculators />
        </LazyMount>
      </div>

      <GroundedCTA onOpenConsultation={handleOpenConsultation} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialDivision={consultationDivision}
      />

      <Footer />
    </main>
  );
}
