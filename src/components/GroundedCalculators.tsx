"use client";

import React, { useState, useCallback } from 'react';
import SolarCalculator from '@/components/SolarCalculator';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import {
  SolarGenerationCurve,
  CashflowPaybackSchedule,
  PackagingVolumeTierCurve,
  EvNetworkCapexRevenueChart,
  InteriorSpecBreakdownChart,
} from '@/components/bklit';
import { OptionWheel, SpecularButton, TechText } from '@/components/react-bits';
import { ArrowUpRight, Zap, Building2, Sliders, ShieldCheck, Landmark } from 'lucide-react';

const CALCULATOR_OPTIONS = [
  {
    label: '(01) Solar & Walkable Pergola',
    value: 'solar',
    subtext: 'Solis',
    logoSrc: '/images/logos/solis-official.png',
    logoDark: '/images/logos/solis-logo-white.png',
  },
  {
    label: '(02) Utility Tariff & Load Audit',
    value: 'tariff',
    subtext: 'Sanyog',
    logoSrc: '/images/logos/sanyog-official.png',
    logoDark: '/images/logos/sanyog-official.png',
  },
  {
    label: '(03) EV Network CAPEX & DPR',
    value: 'ev',
    subtext: 'Agrim',
    logoSrc: '/images/logos/agrim-dark.png',
    logoDark: '/images/logos/agrim-official.png',
  },
  {
    label: '(04) Commercial Interior Fit-Out',
    value: 'interior',
    subtext: 'Tvasta',
    logoSrc: '/images/logos/tvasta-dark.png',
    logoDark: '/images/logos/tvasta-official.png',
  },
  {
    label: '(05) Packaging & Print Run',
    value: 'print',
    subtext: 'eMudran',
    logoSrc: '/images/logos/emudran-official.png',
    logoDark: '/images/logos/emudran-white.png',
  },
];

export default function GroundedCalculators() {
  const [activeTab, setActiveTab] = useState<'solar' | 'tariff' | 'ev' | 'interior' | 'print'>('solar');

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

  // Sanyog Tariff & Load Audit State
  const [tariffMonthlyUnits, setTariffMonthlyUnits] = useState<number>(8500);
  const [tariffCurrentLoadKva, setTariffCurrentLoadKva] = useState<number>(125);
  const [tariffPowerFactor, setTariffPowerFactor] = useState<number>(0.84);

  // Agrim EV Simulator State
  const [evSites, setEvSites] = useState<number>(4);
  const [evDcChargers, setEvDcChargers] = useState<number>(2);
  const [evAcChargers, setEvAcChargers] = useState<number>(6);
  const [evDailySessions, setEvDailySessions] = useState<number>(8);

  // Tvasta Fit-Out Chart Controls State
  const [tvastaTier, setTvastaTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [tvastaArea, setTvastaArea] = useState<number>(2400);

  const handleSolarChange = useCallback(
    (data: { actualKwp: number; netInvestmentLakhs: number; annualSavingsLakhs: number }) => {
      setSolarMetrics(data);
    },
    []
  );

  const handlePrintChange = useCallback((data: { quantity: number; jobType: string }) => {
    setPrintMetrics(data);
  }, []);

  // Sanyog calculations
  const commercialRate = 12.85;
  const residentialRate = 7.45;
  const monthlyTariffDiff = tariffMonthlyUnits * (commercialRate - residentialRate);
  const pfPenaltySteps = Math.max(0, Math.round((0.90 - tariffPowerFactor) * 100));
  const monthlyPfPenalty = tariffMonthlyUnits * commercialRate * (pfPenaltySteps * 0.005);
  const totalMonthlyDispute = monthlyTariffDiff + monthlyPfPenalty;
  const annualDisputeLakhs = (totalMonthlyDispute * 12) / 100000;

  // Agrim EV calculations
  const capexPerSiteLakhs = (evDcChargers * 11.5) + (evAcChargers * 1.2) + 8.5 + 3.5;
  const totalEvCapexLakhs = evSites * capexPerSiteLakhs;
  const totalChargeGuns = evSites * (evDcChargers * 2 + evAcChargers);
  const dailyKwhDispensed = evSites * (
    (evDcChargers * 2 * 30 * evDailySessions) +
    (evAcChargers * 15 * (evDailySessions * 0.5))
  );
  const annualMarginLakhs = (dailyKwhDispensed * 4.5 * 365) / 100000;
  const evPaybackYears = annualMarginLakhs > 0 ? (totalEvCapexLakhs / (annualMarginLakhs * 0.78)).toFixed(1) : '3.8';

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
            Interactive Practice Estimators &amp; Engineering Schedules.
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
            Explore live mathematical models across all five consortium disciplines: rooftop solar pergolas, MERC tariff dispute regularizations, EV hub bankable CAPEX DPRs, commercial interior acoustic fit-outs, and luxury print runs.
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
          {/* Tab 1: Solis Solar & Walkable Pergola */}
          {activeTab === 'solar' && <SolarCalculator onLiveChange={handleSolarChange} />}

          {/* Tab 2: Sanyog Utility Tariff & Load Audit */}
          {activeTab === 'tariff' && (
            <div
              style={{
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 44px)',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.06)',
                maxWidth: '1040px',
                margin: '0 auto',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/images/logos/sanyog-official.png"
                    alt="Sanyog Official Brand Mark"
                    style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block' }}
                  />
                  <span style={{ width: '1.5px', height: '22px', backgroundColor: 'rgba(194, 159, 83, 0.55)', display: 'inline-block' }} />
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#8C6D23',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    [SANYOG / MERC TARIFF &amp; LOAD SANCTION AUDIT]
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                    fontWeight: 400,
                    color: '#111111',
                    letterSpacing: '-0.02em',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15,
                  }}
                >
                  Utility Tariff Dispute &amp; Sanctioned Load Regularization
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.96rem',
                    color: '#555555',
                    maxWidth: '680px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                  }}
                >
                  Simulate commercial-to-residential tariff re-categorization, low power factor billing penalties, and 250 kVA sanctioned load enhancement economics under Maharashtra Electricity Regulatory Commission (MERC) rules.
                </p>
              </div>

              {/* Sliders Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '36px' }}>
                {/* Slider 1: Monthly Units */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Monthly Consumption
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {tariffMonthlyUnits.toLocaleString('en-IN')} kWh
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={500}
                    value={tariffMonthlyUnits}
                    onChange={(e) => setTariffMonthlyUnits(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>2,000 kWh</span>
                    <span>50,000 kWh</span>
                  </div>
                </div>

                {/* Slider 2: Sanctioned Load */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Sanctioned Load
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {tariffCurrentLoadKva} kVA
                    </span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={500}
                    step={25}
                    value={tariffCurrentLoadKva}
                    onChange={(e) => setTariffCurrentLoadKva(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>25 kVA</span>
                    <span>500 kVA (HT Threshold)</span>
                  </div>
                </div>

                {/* Slider 3: Power Factor */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Operating Power Factor
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: tariffPowerFactor < 0.90 ? '#B91C1C' : '#047857', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {tariffPowerFactor.toFixed(2)} {tariffPowerFactor < 0.90 ? '(Penalty Zone)' : '(Compliant)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.72}
                    max={0.98}
                    step={0.01}
                    value={tariffPowerFactor}
                    onChange={(e) => setTariffPowerFactor(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>0.72 (Severe Penalty)</span>
                    <span>0.98 (Optimal)</span>
                  </div>
                </div>
              </div>

              {/* Live Output KPI Tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Monthly Tariff Differential
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    ₹{Math.round(monthlyTariffDiff).toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Commercial LT-II (₹12.85) vs Residential (₹7.45)
                  </div>
                </div>

                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Power Factor Monthly Penalty
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, color: monthlyPfPenalty > 0 ? '#F87171' : '#34D399', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    ₹{Math.round(monthlyPfPenalty).toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    {pfPenaltySteps > 0 ? `${(pfPenaltySteps * 0.5).toFixed(1)}% penalty on billing` : 'Zero PF surcharge'}
                  </div>
                </div>

                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Annual Regularization Potential
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#C29F53', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    ₹{annualDisputeLakhs.toFixed(2)} Lakhs
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Annual recovery through MERC / CGRF order
                  </div>
                </div>

                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Statutory Forum
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    CGRF &amp; Ombudsman
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    ₹50 Statutory Evaluation · Electricity Act 2003
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SpecularButton href="/sanyog" variant="dark" icon={<ArrowUpRight size={15} />}>
                  Open Sanyog Regulatory Grievance Dossier
                </SpecularButton>
              </div>
            </div>
          )}

          {/* Tab 3: Agrim EV Network CAPEX & DPR */}
          {activeTab === 'ev' && (
            <div
              style={{
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 44px)',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.06)',
                maxWidth: '1040px',
                margin: '0 auto',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/images/logos/agrim-dark.png"
                    alt="Agrim Official Brand Mark"
                    style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block' }}
                  />
                  <span style={{ width: '1.5px', height: '22px', backgroundColor: 'rgba(194, 159, 83, 0.55)', display: 'inline-block' }} />
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#8C6D23',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    [AGRIM / EV NETWORK INFRASTRUCTURE DPR SIMULATOR]
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                    fontWeight: 400,
                    color: '#111111',
                    letterSpacing: '-0.02em',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15,
                  }}
                >
                  EV Charging Hub Network CAPEX &amp; 10-Year DPR Model
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontSize: '0.96rem',
                    color: '#555555',
                    maxWidth: '680px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                  }}
                >
                  Simulate commercial and cooperative housing society EV charging station networks: 60kW DC dual-gun fast chargers, 22kW AC destination chargers, and debt syndication metrics.
                </p>
              </div>

              {/* Sliders Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '36px' }}>
                {/* Slider 1: Hub Sites */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Hub Locations / Society Clusters
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {evSites} Sites
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={evSites}
                    onChange={(e) => setEvSites(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>1 Pilot Site</span>
                    <span>20 Cluster Hubs</span>
                  </div>
                </div>

                {/* Slider 2: 60kW DC Fast Chargers */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      60kW DC Dual-Gun Fast Chargers
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {evDcChargers} per Site ({evSites * evDcChargers * 2} Guns)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={evDcChargers}
                    onChange={(e) => setEvDcChargers(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>1 Unit (2 Guns)</span>
                    <span>8 Units (16 Guns)</span>
                  </div>
                </div>

                {/* Slider 3: 22kW AC Chargers */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      22kW AC Destination Chargers
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {evAcChargers} per Site ({evSites * evAcChargers} Points)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={16}
                    step={2}
                    value={evAcChargers}
                    onChange={(e) => setEvAcChargers(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>2 Chargers</span>
                    <span>16 Chargers</span>
                  </div>
                </div>

                {/* Slider 4: Daily Sessions */}
                <div style={{ background: '#F8F6F0', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#333333', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      Daily Utilization / Sessions
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                      {evDailySessions} Sessions / Day
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={18}
                    step={1}
                    value={evDailySessions}
                    onChange={(e) => setEvDailySessions(Number(e.target.value))}
                    className="w-full accent-[#C29F53] cursor-pointer"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.7rem', color: '#777777', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    <span>4 (Off-Peak)</span>
                    <span>18 (Highway / Depot)</span>
                  </div>
                </div>
              </div>

              {/* KPI Summary Tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Total Network CAPEX
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#C29F53', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    ₹{totalEvCapexLakhs >= 100 ? `${(totalEvCapexLakhs / 100).toFixed(2)} Cr` : `${totalEvCapexLakhs.toFixed(1)} Lakhs`}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Across {evSites} sites (₹{capexPerSiteLakhs.toFixed(1)}L/site)
                  </div>
                </div>

                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Connected Charge Bays
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    {totalChargeGuns} Active Ports
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    {evSites * evDcChargers * 2} DC Fast + {evSites * evAcChargers} AC Ports
                  </div>
                </div>

                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Projected Payback Horizon
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#34D399', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    {evPaybackYears} Years
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Target DSCR: 1.55x bank compliance
                  </div>
                </div>

                <div style={{ background: '#111111', color: '#FFFFFF', padding: '18px', borderRadius: '16px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C29F53', marginBottom: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Advisory Status
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Bankable DPR
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    Pure Advisory (Non-Lender / Non-NBFC)
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SpecularButton href="/agrim" variant="dark" icon={<ArrowUpRight size={15} />}>
                  Explore Agrim Project Finance Scope
                </SpecularButton>
              </div>
            </div>
          )}

          {/* Tab 4: Tvasta Commercial Interior Fit-Out */}
          {activeTab === 'interior' && <InteriorCalculator />}

          {/* Tab 5: eMudran Packaging & Print Run */}
          {activeTab === 'print' && <PrintCalculator onLiveChange={handlePrintChange} />}
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

          {/* Sanyog Regulatory Schedule Ledger */}
          {activeTab === 'tariff' && (
            <div
              style={{
                borderRadius: '20px',
                padding: '24px',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                maxWidth: '920px',
                margin: '0 auto',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#8C6D23', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    [SANYOG TELEMETRY / MERC TARIFF MATRIX]
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: '#111111', margin: '4px 0 0 0' }}>
                    Mumbai Utility Tariff Structure &amp; Recovery Horizons
                  </h4>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#666666', background: '#F4F1EA', padding: '4px 10px', borderRadius: '6px', fontFamily: 'var(--font-sans, Inter, sans-serif)', fontWeight: 500 }}>
                  Electricity Act 2003
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#F8F6F0', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#666666', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Commercial LT-II Schedule
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', fontVariantNumeric: 'tabular-nums' }}>
                    ₹12.85 / kWh
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '4px' }}>
                    Standard Mumbai licensee commercial rate with fixed TOD charges
                  </div>
                </div>

                <div style={{ background: '#F8F6F0', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#666666', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Residential / Common LT-I
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857', fontVariantNumeric: 'tabular-nums' }}>
                    ₹7.45 / kWh
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '4px' }}>
                    Regularized tariff rate for society amenities, pumps, and lifts
                  </div>
                </div>

                <div style={{ background: '#F8F6F0', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#666666', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                    CGRF Evidentiary Timeline
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#8C6D23', fontVariantNumeric: 'tabular-nums' }}>
                    30 to 60 Days
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '4px' }}>
                    Statutory hearing horizon before BEST, Adani, Tata, or MSEDCL forums
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Agrim EV Network CAPEX / Revenue Chart */}
          {activeTab === 'ev' && (
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
              <EvNetworkCapexRevenueChart siteCapex={Math.max(10, Math.round(totalEvCapexLakhs))} />
            </div>
          )}

          {/* Tvasta Fit-Out Spec Breakdown Chart with Interactive Tier Selector */}
          {activeTab === 'interior' && (
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                  marginBottom: '20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8C6D23', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    [TVASTA INTERIOR COST &amp; ACOUSTIC BREAKDOWN MATRIX]
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif', fontSize: '1.35rem', fontWeight: 400, color: '#111111', margin: '4px 0 0 0' }}>
                    Switch Fit-Out Specification Tier
                  </h4>
                </div>

                {/* Tier Switcher Pills */}
                <div style={{ display: 'flex', gap: '8px', background: '#F4F1EA', padding: '4px', borderRadius: '12px' }}>
                  {(['standard', 'premium', 'luxury'] as const).map((t) => {
                    const isActive = tvastaTier === t;
                    const labels = {
                      standard: 'Standard (STC 42)',
                      premium: 'Premium (STC 48)',
                      luxury: 'Luxury (STC 55)',
                    };
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTvastaTier(t)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: isActive ? '#111111' : 'transparent',
                          color: isActive ? '#C29F53' : '#555555',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {labels[t]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* The Interior Spec Breakdown Chart */}
              <InteriorSpecBreakdownChart tier={tvastaTier} areaSqFt={tvastaArea} />
            </div>
          )}

          {/* eMudran Run Tier Curve */}
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

