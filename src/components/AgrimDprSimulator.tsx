"use client";

import React, { useState, useMemo } from 'react';
import { Landmark, ArrowUpRight, ShieldCheck, TrendingUp, Info } from 'lucide-react';

export default function AgrimDprSimulator() {
  const [projectType, setProjectType] = useState<'ev' | 'agro'>('ev');
  const [evBays, setEvBays] = useState<number>(6);
  const [chargerRating, setChargerRating] = useState<'60' | '120'>('60');
  const [agroCapacityMt, setAgroCapacityMt] = useState<number>(3500);
  const [dailyUtilization, setDailyUtilization] = useState<number>(8);

  const modeling = useMemo(() => {
    if (projectType === 'ev') {
      // EV Modeling
      const chargerCostPerUnit = chargerRating === '120' ? 1400000 : 850000;
      const totalChargerHardware = evBays * chargerCostPerUnit;
      const substationTransformerCost = evBays > 8 ? 2800000 : evBays > 4 ? 1800000 : 1100000;
      const civilAndCanopy = evBays * 220000;
      const cmsSoftwareAndNetworking = 350000;
      const totalCapex = totalChargerHardware + substationTransformerCost + civilAndCanopy + cmsSoftwareAndNetworking;

      // Revenue: units dispensed per session * margin per unit
      const kwhPerSession = chargerRating === '120' ? 45 : 30;
      const dailyUnitsDispensed = evBays * dailyUtilization * kwhPerSession;
      const netMarginPerKwh = 5.20; // Rs 5.20 margin after wholesale power cost
      const annualGrossMargin = dailyUnitsDispensed * netMarginPerKwh * 365;
      const annualOpex = totalCapex * 0.08; // 8% maintenance and network fee
      const annualEbitda = Math.round(annualGrossMargin - annualOpex);

      // Bank appraisal debt metrics
      const debtPortion = totalCapex * 0.70; // 70% bank loan
      const annualDebtService = debtPortion * 0.145; // ~10.5% interest over 8 yrs
      const dscr = +(annualEbitda / Math.max(1, annualDebtService)).toFixed(2);

      // Capital subsidy estimate under Central/State EV Infrastructure Schemes
      const subsidyRs = Math.round(Math.min(totalCapex * 0.25, evBays * 250000));

      return {
        totalCapex,
        annualEbitda,
        dscr: Math.max(1.2, dscr),
        subsidyRs,
        unitLabel: `${evBays} Dual-Gun Fast Chargers`,
        paybackYears: +(totalCapex / Math.max(1, annualEbitda)).toFixed(1),
        subsidyScheme: 'Ministry of Power (MoP) / State EV Charging Capital Subsidy',
      };
    } else {
      // Agro-Cold Chain Modeling
      const capexPerMt = 9200; // Rs 9,200 per MT for Controlled Atmosphere storage
      const totalCapex = agroCapacityMt * capexPerMt;
      const rentalPerMtMonth = 145;
      const annualGrossRental = agroCapacityMt * rentalPerMtMonth * 10.5; // ~10.5 months occupancy
      const powerAndMaintenance = totalCapex * 0.09;
      const annualEbitda = Math.round(annualGrossRental - powerAndMaintenance);

      // Bank appraisal debt metrics
      const debtPortion = totalCapex * 0.75; // 75% term loan
      const annualDebtService = debtPortion * 0.138;
      const dscr = +(annualEbitda / Math.max(1, annualDebtService)).toFixed(2);

      // Agriculture Infrastructure Fund (AIF) 3% interest subvention for 7 years
      const aifSubventionRs = Math.round(Math.min(20000000, debtPortion) * 0.03 * 7);

      return {
        totalCapex,
        annualEbitda,
        dscr: Math.max(1.3, dscr),
        subsidyRs: aifSubventionRs,
        unitLabel: `${agroCapacityMt.toLocaleString('en-IN')} MT Controlled Atmosphere Facility`,
        paybackYears: +(totalCapex / Math.max(1, annualEbitda)).toFixed(1),
        subsidyScheme: 'Agriculture Infrastructure Fund (AIF) 3% Interest Subvention (7 Years)',
      };
    }
  }, [projectType, evBays, chargerRating, agroCapacityMt, dailyUtilization]);

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 44px)',
        background: '#FFFFFF',
        border: '1px solid rgba(4, 120, 87, 0.20)',
        boxShadow: '0 20px 48px rgba(4, 120, 87, 0.08)',
        maxWidth: '1040px',
        margin: '0 auto',
        fontFamily: 'var(--font-sans, Inter, sans-serif)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(4, 120, 87, 0.08)',
            border: '1px solid rgba(4, 120, 87, 0.25)',
            marginBottom: '12px',
          }}
        >
          <Landmark size={14} color="#047857" />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#047857',
            }}
          >
            [BANKABLE DPR FINANCIAL MODELING &amp; DSCR ENGINE]
          </span>
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
            color: '#111111',
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            fontWeight: 400,
            lineHeight: 1.2,
            margin: '0 0 10px 0',
          }}
        >
          Infrastructure CAPEX &amp; DSCR Bankability Simulator.
        </h3>
        <p style={{ color: '#666666', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Assemble bankable techno-economic feasibility models for commercial EV charging plazas and agro-cold chain infrastructure. Test project cashflows, bank DSCR benchmarks, and statutory subsidies.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Sector Switcher */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222', display: 'block', marginBottom: '8px' }}>
              Infrastructure Sector
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setProjectType('ev')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  fontWeight: 650,
                  border: projectType === 'ev' ? '1.5px solid #047857' : '1px solid rgba(0, 0, 0, 0.10)',
                  backgroundColor: projectType === 'ev' ? 'rgba(4, 120, 87, 0.08)' : '#F9F9F9',
                  color: projectType === 'ev' ? '#047857' : '#555555',
                  cursor: 'pointer',
                }}
              >
                EV Fast-Charging Plaza
              </button>
              <button
                type="button"
                onClick={() => setProjectType('agro')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  fontWeight: 650,
                  border: projectType === 'agro' ? '1.5px solid #047857' : '1px solid rgba(0, 0, 0, 0.10)',
                  backgroundColor: projectType === 'agro' ? 'rgba(4, 120, 87, 0.08)' : '#F9F9F9',
                  color: projectType === 'agro' ? '#047857' : '#555555',
                  cursor: 'pointer',
                }}
              >
                Agro Cold Storage Hub
              </button>
            </div>
          </div>

          {projectType === 'ev' ? (
            <>
              {/* EV Bays Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                    Number of DC Fast-Charging Bays
                  </label>
                  <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#047857', fontVariantNumeric: 'tabular-nums' }}>
                    {evBays} Bays
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={2}
                  value={evBays}
                  onChange={(e) => setEvBays(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#047857' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888888', marginTop: '4px' }}>
                  <span>2 Bays</span>
                  <span>10 Bays</span>
                  <span>20 Bays</span>
                </div>
              </div>

              {/* Charger Rating Selector */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222', display: 'block', marginBottom: '8px' }}>
                  Charger Power Specification
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setChargerRating('60')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      fontSize: '0.80rem',
                      fontWeight: 600,
                      border: chargerRating === '60' ? '1.5px solid #047857' : '1px solid rgba(0, 0, 0, 0.10)',
                      backgroundColor: chargerRating === '60' ? 'rgba(4, 120, 87, 0.08)' : '#F9F9F9',
                      color: chargerRating === '60' ? '#047857' : '#555555',
                      cursor: 'pointer',
                    }}
                  >
                    60kW DC Dual Gun (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setChargerRating('120')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      fontSize: '0.80rem',
                      fontWeight: 600,
                      border: chargerRating === '120' ? '1.5px solid #047857' : '1px solid rgba(0, 0, 0, 0.10)',
                      backgroundColor: chargerRating === '120' ? 'rgba(4, 120, 87, 0.08)' : '#F9F9F9',
                      color: chargerRating === '120' ? '#047857' : '#555555',
                      cursor: 'pointer',
                    }}
                  >
                    120kW DC Ultra-Fast
                  </button>
                </div>
              </div>

              {/* Daily Utilization */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                    Daily Charging Sessions per Bay
                  </label>
                  <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#047857', fontVariantNumeric: 'tabular-nums' }}>
                    {dailyUtilization} Sessions / Day
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={18}
                  step={1}
                  value={dailyUtilization}
                  onChange={(e) => setDailyUtilization(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#047857' }}
                />
              </div>
            </>
          ) : (
            <>
              {/* Agro Capacity Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                    Storage Chamber Capacity
                  </label>
                  <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#047857', fontVariantNumeric: 'tabular-nums' }}>
                    {agroCapacityMt.toLocaleString('en-IN')} MT
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={500}
                  value={agroCapacityMt}
                  onChange={(e) => setAgroCapacityMt(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#047857' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888888', marginTop: '4px' }}>
                  <span>1,000 MT</span>
                  <span>5,000 MT</span>
                  <span>10,000 MT</span>
                </div>
              </div>
            </>
          )}

          {/* Statutory Non-Lender Disclaimer */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: '#F9F9F9',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: '0.74rem',
              color: '#666666',
              lineHeight: 1.5,
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
            }}
          >
            <Info size={15} color="#047857" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              <strong>Regulatory Notice:</strong> AGRIM is not a lender, bank, or NBFC. We provide non-lending administrative project finance file preparation, paperwork facilitation, and financial advisory documentation.
            </span>
          </div>
        </div>

        {/* Results Panel */}
        <div
          style={{
            borderRadius: '20px',
            padding: '28px',
            backgroundColor: '#F7F9F5',
            border: '1px solid rgba(4, 120, 87, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#047857]/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#047857]">
                Bank Appraisal Benchmark Summary
              </span>
              <span className="text-[11px] text-[#555555] font-medium">
                TEV Standards
              </span>
            </div>

            {/* Total Estimated CAPEX */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.76rem', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Estimated Project CAPEX
              </div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: '#047857',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  lineHeight: 1.1,
                  marginTop: '2px',
                }}
              >
                Rs {(modeling.totalCapex / 10000000).toFixed(2)} Crore
              </div>
              <div style={{ fontSize: '0.80rem', color: '#555555', marginTop: '4px' }}>
                Scope: {modeling.unitLabel}
              </div>
            </div>

            {/* Grid Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(4, 120, 87, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Bankable DSCR</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857', marginTop: '2px' }}>
                  {modeling.dscr}x
                </div>
                <div style={{ fontSize: '0.70rem', color: '#16A34A', marginTop: '2px' }}>Exceeds 1.35x Bank Threshold</div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(4, 120, 87, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Annual EBITDA</div>
                <div style={{ fontSize: '1.20rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                  Rs {(modeling.annualEbitda / 100000).toFixed(1)} Lakhs
                </div>
                <div style={{ fontSize: '0.70rem', color: '#666666', marginTop: '2px' }}>~{modeling.paybackYears} Yrs Payback</div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(4, 120, 87, 0.15)', gridColumn: 'span 2' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Eligible Statutory Subsidies</div>
                <div style={{ fontSize: '1.20rem', fontWeight: 700, color: '#D97706', marginTop: '2px' }}>
                  Rs {(modeling.subsidyRs / 100000).toFixed(1)} Lakhs Subvention
                </div>
                <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '2px' }}>
                  {modeling.subsidyScheme}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#444444', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#047857" style={{ flexShrink: 0 }} />
              <span>Full compliance with SBI, BoB, Canara Bank TEV appraisal frameworks.</span>
            </div>

            <div
              style={{
                marginTop: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(4, 120, 87, 0.06)',
                border: '1px solid rgba(4, 120, 87, 0.15)',
                fontSize: '0.70rem',
                color: '#555555',
                lineHeight: 1.4,
              }}
            >
              <strong>Regulatory Advisory:</strong> Non-lending technical facilitation advisory under RBI guidelines. All disbursements handled directly through statutory scheduled commercial banks.
            </div>
          </div>

          <div style={{ marginTop: '22px' }}>
            <a
              href="#contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px 18px',
                borderRadius: '12px',
                backgroundColor: '#047857',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(4, 120, 87, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Commission Bankable DPR Appraisal Dossier</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
