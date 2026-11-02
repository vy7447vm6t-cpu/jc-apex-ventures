"use client";

import React, { useState, useCallback } from 'react';
import SolarCalculator from '@/components/SolarCalculator';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import GridApexSubstationCalculator from '@/components/GridApexSubstationCalculator';
import SanyogTariffAuditCalculator from '@/components/SanyogTariffAuditCalculator';
import {
  SolarGenerationCurve,
  CashflowPaybackSchedule,
  PackagingVolumeTierCurve,
} from '@/components/bklit';
import { SpecularButton } from '@/components/react-bits';
import SectionEyebrow from './SectionEyebrow';
import UnderlineTabs from './UnderlineTabs';
import { ArrowUpRight } from 'lucide-react';

// One tab per division's estimator; every figure they show is indicative.
const CALCULATOR_TABS = [
  { value: 'solar', label: 'Solar savings', note: 'Solis' },
  { value: 'tariff', label: 'Bill check', note: 'Sanyog' },
  { value: 'interior', label: 'Fit-out cost', note: 'Tvasta' },
  { value: 'print', label: 'Print run', note: 'eMudran' },
  { value: 'substation', label: 'Transformer sizing', note: 'Grid Apex' },
];
type CalculatorTab = 'solar' | 'tariff' | 'interior' | 'print' | 'substation';

export default function GroundedCalculators() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('solar');

  // Solis metrics
  const [solarMetrics, setSolarMetrics] = useState({
    actualKwp: 15.95,
    netInvestmentLakhs: 8.68,
    annualSavingsLakhs: 2.18,
  });

  // eMudran metrics
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
      id="calculators-section"
      className="section"
      style={{
        backgroundColor: '#F4F1EA',
        padding: 'clamp(80px, 9vw, 128px) clamp(20px, 4vw, 48px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        scrollMarginTop: '104px',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <SectionEyebrow>Estimates</SectionEyebrow>
        <div style={{ maxWidth: '760px', marginBottom: '32px' }}>
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
            Rough numbers before anyone visits.
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#4A4A46', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
            One estimator for each division. Every figure is indicative; the real number comes after a site visit, in a written quote.
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <UnderlineTabs
            tabs={CALCULATOR_TABS}
            value={activeTab}
            onChange={(val) => setActiveTab(val as CalculatorTab)}
            label="Estimators"
            idPrefix="estimators"
          />
        </div>

        {/* Calculator Mounting Surface */}
        <div className="grounded-calculator-wrapper" role="tabpanel" id="estimators-panel" aria-labelledby={`estimators-tab-${activeTab}`}>
          {/* Tab 1: Solis Solar & Walkable Pergola */}
          {activeTab === 'solar' && <SolarCalculator onLiveChange={handleSolarChange} />}

          {/* Tab 2: Sanyog bill check, the same estimator as /sanyog */}
          {activeTab === 'tariff' && <SanyogTariffAuditCalculator />}

          {/* Tab 4: Tvasta Commercial Interior Fit-Out */}
          {activeTab === 'interior' && <InteriorCalculator />}

          {/* Tab 5: eMudran Packaging & Print Run */}
          {activeTab === 'print' && <PrintCalculator onLiveChange={handlePrintChange} />}

          {/* Tab 6: Grid Apex HT Substation & Sizing */}
          {activeTab === 'substation' && <GridApexSubstationCalculator />}
        </div>

        {/* Dynamic Bklit Engineering Data Visualizations */}
        <div style={{ marginTop: '40px' }}>
          {/* Solis Engineering Curves */}
          {activeTab === 'solar' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <SolarGenerationCurve capacityKw={solarMetrics.actualKwp} />
              <CashflowPaybackSchedule
                initialCapex={solarMetrics.netInvestmentLakhs}
                annualSavings={solarMetrics.annualSavingsLakhs}
              />
            </div>
          )}

          {/* eMudran Run Tier Curve */}
          {activeTab === 'print' && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PackagingVolumeTierCurve activeQuantity={printMetrics.quantity} />
            </div>
          )}

          {/* Grid Apex Technical Overview Strip */}
          {activeTab === 'substation' && (
            <div
              style={{
                maxWidth: '960px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '18px 24px',
                borderRadius: '16px',
                background: 'rgba(212, 175, 55, 0.06)',
                border: '1px solid rgba(194, 159, 83, 0.22)',
                fontSize: '0.84rem',
                color: '#444444',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              <span>Indicative transformer sizing for the load you entered.</span>
              <span style={{ fontWeight: 600, color: '#4A4A46' }}>The final design follows a site survey.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

