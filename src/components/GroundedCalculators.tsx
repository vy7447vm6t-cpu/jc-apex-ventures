"use client";

import React, { useState, useCallback } from 'react';
import SolarCalculator from '@/components/SolarCalculator';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import {
  SolarGenerationCurve,
  CashflowPaybackSchedule,
  PackagingVolumeTierCurve,
} from '@/components/bklit';
import { OptionWheel } from '@/components/react-bits';

const CALCULATOR_OPTIONS = [
  {
    label: '(01) Solar & Walkable Pergola',
    value: 'solar',
    subtext: 'Solis',
    logoSrc: '/images/logos/solis-official.png',
    logoDark: '/images/logos/solis-logo-white.png',
  },
  {
    label: '(02) Print & Packaging Run',
    value: 'print',
    subtext: 'eMudran',
    logoSrc: '/images/logos/emudran-official.png',
    logoDark: '/images/logos/emudran-white.png',
  },
  {
    label: '(03) Commercial Interior Fit-Out',
    value: 'interior',
    subtext: 'Tvasta',
    logoSrc: '/images/logos/tvasta-dark.png',
    logoDark: '/images/logos/tvasta-official.png',
  },
];

export default function GroundedCalculators() {
  const [activeTab, setActiveTab] = useState<'solar' | 'print' | 'interior'>('solar');
  const [solarMetrics, setSolarMetrics] = useState({
    actualKwp: 15.95,
    netInvestmentLakhs: 8.68,
    annualSavingsLakhs: 2.18,
  });
  const [printMetrics, setPrintMetrics] = useState({
    quantity: 1000,
    jobType: 'brochure',
  });

  const handleSolarChange = useCallback(
    (data: { actualKwp: number; netInvestmentLakhs: number; annualSavingsLakhs: number }) => {
      setSolarMetrics(data);
    },
    []
  );

  const handlePrintChange = useCallback((data: { quantity: number; jobType: string }) => {
    setPrintMetrics(data);
  }, []);

  return (
    <section
      id="calculators"
      className="section"
      style={{
        backgroundColor: '#F4F1EA',
        padding: 'clamp(80px, 9vw, 128px) clamp(20px, 4vw, 48px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '104px',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
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
            [08 / FIELD ENGINEERING ESTIMATORS]
          </span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '36px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Interactive Project Estimators &amp; Live Schedules.
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
            Compute rooftop solar pergola sizing, packaging production volumes, or commercial space planning budgets using our verified mathematical schedules. Adjusting slider parameters dynamically updates the Bklit engineering curves below.
          </p>
        </div>

        {/* OptionWheel iOS Frosted Glass Switcher with Official Division Marks */}
        <div className="mb-8 flex justify-start">
          <OptionWheel
            options={CALCULATOR_OPTIONS}
            selectedValue={activeTab}
            onChange={(val) => setActiveTab(val)}
          />
        </div>

        {/* Calculator Mounting Surface */}
        <div className="grounded-calculator-wrapper">
          {activeTab === 'solar' && <SolarCalculator onLiveChange={handleSolarChange} />}
          {activeTab === 'print' && <PrintCalculator onLiveChange={handlePrintChange} />}
          {activeTab === 'interior' && <InteriorCalculator />}
        </div>

        {/* Dynamic Bklit Engineering Data Visualizations */}
        <div style={{ marginTop: '40px' }}>
          {activeTab === 'solar' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <SolarGenerationCurve capacityKw={solarMetrics.actualKwp} />
              <CashflowPaybackSchedule
                initialCapex={solarMetrics.netInvestmentLakhs}
                annualSavings={solarMetrics.annualSavingsLakhs}
              />
            </div>
          )}

          {activeTab === 'print' && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PackagingVolumeTierCurve activeQuantity={printMetrics.quantity} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
