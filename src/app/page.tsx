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
import GroundedCalculators from '@/components/GroundedCalculators';
import ConsultationModal from '@/components/ConsultationModal';
import GroundedCTA from '@/components/GroundedCTA';

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationDivision, setConsultationDivision] = useState<string>('solis');

  const handleOpenConsultation = (division?: string) => {
    if (division) setConsultationDivision(division);
    setIsConsultationOpen(true);
  };

  return (
    <main className="grounded-canvas">
      <Navbar />

      {/* Hero, then sections numbered 01 to 07 in their eyebrows. The terrace comparison is on /solis. */}
      <GroundedHero onOpenConsultation={handleOpenConsultation} />

      <GroundedWhy />

      <GroundedProjectTrack />

      <GroundedServices />

      <GroundedAffiliations />

      <GroundedProcess />

      <GroundedCalculators />

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
