"use client";

import React, { useState } from 'react';
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
  { label: '(01) Solar & Walkable Pergola', value: 'solar', subtext: 'Solis' },
  { label: '(02) Print & Packaging Run', value: 'print', subtext: 'eMudran' },
  { label: '(03) Commercial Interior Fit-Out', value: 'interior', subtext: 'Tvasta' },
];

export default function GroundedCalculators() {
  const [activeTab, setActiveTab] = useState<'solar' | 'print' | 'interior'>('solar');

  return (
    <section id="calculators" className="section" style={{ backgroundColor: 'var(--color-grounded-stone)', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span className="text-eye-brow">[field engineering estimators]</span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '960px', marginBottom: '40px' }}>
          <h3
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Interactive Project Estimators
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
            Compute rooftop solar pergola sizing, packaging production volumes, or commercial space planning budgets using our verified mathematical schedules.
          </p>
        </div>

        {/* OptionWheel iOS Frosted Glass Switcher */}
        <div className="mb-8 flex justify-start">
          <OptionWheel
            options={CALCULATOR_OPTIONS}
            selectedValue={activeTab}
            onChange={(val) => setActiveTab(val)}
          />
        </div>

        {/* Calculator Mounting Surface */}
        <div className="grounded-calculator-wrapper">
          {activeTab === 'solar' && <SolarCalculator />}
          {activeTab === 'print' && <PrintCalculator />}
          {activeTab === 'interior' && <InteriorCalculator />}
        </div>

        {/* Dynamic Bklit Engineering Data Visualizations */}
        <div style={{ marginTop: '48px' }}>
          {activeTab === 'solar' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <SolarGenerationCurve capacityKw={55.55} />
              <CashflowPaybackSchedule initialCapex={28.5} annualSavings={7.4} />
            </div>
          )}

          {activeTab === 'print' && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PackagingVolumeTierCurve />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
