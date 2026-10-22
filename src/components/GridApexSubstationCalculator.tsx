"use client";

import React, { useState, useMemo } from 'react';
import { Zap, ShieldCheck, Clock, Sliders, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function GridApexSubstationCalculator() {
  const [loadKw, setLoadKw] = useState<number>(750);
  const [voltageKv, setVoltageKv] = useState<'11' | '22' | '33'>('11');
  const [currentPf, setCurrentPf] = useState<number>(0.82);
  const [loadType, setLoadType] = useState<'industrial' | 'commercial' | 'datacenter'>('industrial');

  const calculation = useMemo(() => {
    // Transformer kVA sizing with ~25% headroom
    const rawKva = loadKw / currentPf;
    const withHeadroom = rawKva * 1.25;

    // Standard commercial transformer ratings
    const standardRatings = [250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 8000, 10000];
    const recommendedKva = standardRatings.find((r) => r >= withHeadroom) || standardRatings[standardRatings.length - 1];

    // Capacitor bank kVAR required to improve from currentPf to target 0.99
    // Q = P * (tan(acos(pf1)) - tan(acos(pf2)))
    const phi1 = Math.acos(currentPf);
    const phi2 = Math.acos(0.99);
    const kvarNeeded = Math.round(loadKw * (Math.tan(phi1) - Math.tan(phi2)));

    // Short circuit withstand in kA
    const faultKa = voltageKv === '33' ? 31.5 : voltageKv === '22' ? 25.0 : 18.4;

    // Recommended HT Cable cross-section (approx standard sizing)
    let cableSize = '3C x 95 sq.mm';
    if (recommendedKva > 3000) cableSize = '3C x 300 sq.mm XLPE Al Armoured';
    else if (recommendedKva > 1500) cableSize = '3C x 185 sq.mm XLPE Al Armoured';
    else if (recommendedKva > 800) cableSize = '3C x 120 sq.mm XLPE Al Armoured';

    // Monthly power factor penalty / loss under standard MSEDCL/utility HT tariffs
    // Low PF (<0.90) incurs 1% to 8% penalty on demand and energy charges
    const monthlyBillingBase = loadKw * 240 * 11.5; // ~240 operational hrs @ Rs 11.5/kWh
    const penaltyPct = currentPf < 0.85 ? 0.075 : currentPf < 0.90 ? 0.04 : 0.015;
    const monthlyPenaltySaved = Math.round(monthlyBillingBase * penaltyPct);
    const annualSavings = monthlyPenaltySaved * 12;

    // Estimated CEI sanction and statutory timeline
    const timelineWeeks = recommendedKva > 2500 ? '10 to 14 weeks' : '6 to 8 weeks';

    return {
      recommendedKva,
      kvarNeeded: Math.max(15, kvarNeeded),
      faultKa,
      cableSize,
      monthlyPenaltySaved,
      annualSavings,
      timelineWeeks,
    };
  }, [loadKw, voltageKv, currentPf, loadType]);

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 44px)',
        background: '#FFFFFF',
        border: '1px solid rgba(2, 132, 199, 0.20)',
        boxShadow: '0 20px 48px rgba(2, 132, 199, 0.08)',
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
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            marginBottom: '12px',
          }}
        >
          <Zap size={14} color="#0284C7" />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0284C7',
            }}
          >
            [HT SUBSTATION LOAD &amp; APFC SIZING ENGINE]
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
          Technical Substation Load &amp; Penalty Sizing.
        </h3>
        <p style={{ color: '#666666', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Simulate connected factory demand, input voltage level, and uncorrected power factor to compute recommended transformer ratings, APFC capacitor bank sizing, and demand penalty reversals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Connected Load Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                Connected Industrial Load
              </label>
              <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0284C7', fontVariantNumeric: 'tabular-nums' }}>
                {loadKw.toLocaleString('en-IN')} kW
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={50}
              value={loadKw}
              onChange={(e) => setLoadKw(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0284C7' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888888', marginTop: '4px' }}>
              <span>100 kW</span>
              <span>2,500 kW</span>
              <span>5,000 kW</span>
            </div>
          </div>

          {/* Voltage Selection */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222', display: 'block', marginBottom: '8px' }}>
              Substation Incomer Voltage Level
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {(['11', '22', '33'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVoltageKv(v)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    border: voltageKv === v ? '1.5px solid #0284C7' : '1px solid rgba(0, 0, 0, 0.10)',
                    backgroundColor: voltageKv === v ? 'rgba(2, 132, 199, 0.08)' : '#F9F9F9',
                    color: voltageKv === v ? '#0284C7' : '#555555',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {v} kV Bay
                </button>
              ))}
            </div>
          </div>

          {/* Current Power Factor Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                Uncorrected Operating Power Factor
              </label>
              <span
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: currentPf < 0.85 ? '#DC2626' : currentPf < 0.90 ? '#D97706' : '#16A34A',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {currentPf.toFixed(2)} PF
              </span>
            </div>
            <input
              type="range"
              min={0.70}
              max={0.98}
              step={0.01}
              value={currentPf}
              onChange={(e) => setCurrentPf(Number(e.target.value))}
              style={{ width: '100%', accentColor: currentPf < 0.85 ? '#DC2626' : '#0284C7' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888888', marginTop: '4px' }}>
              <span style={{ color: '#DC2626' }}>0.70 (Severe Penalty)</span>
              <span>0.85</span>
              <span style={{ color: '#16A34A' }}>0.98 (Optimal)</span>
            </div>
          </div>

          {/* Load Application Category */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222', display: 'block', marginBottom: '8px' }}>
              Operating Facility Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'industrial', label: 'Heavy MIDC' },
                { id: 'commercial', label: 'Commercial IT' },
                { id: 'datacenter', label: 'Data Center' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLoadType(t.id as any)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    border: loadType === t.id ? '1.5px solid #0284C7' : '1px solid rgba(0, 0, 0, 0.10)',
                    backgroundColor: loadType === t.id ? 'rgba(2, 132, 199, 0.08)' : '#F9F9F9',
                    color: loadType === t.id ? '#0284C7' : '#555555',
                    cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div
          style={{
            borderRadius: '20px',
            padding: '28px',
            backgroundColor: '#F0F7FF',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#0284C7]/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7]">
                Calculated Engineering Parameters
              </span>
              <span className="text-[11px] text-[#555555] font-medium flex items-center gap-1">
                <Clock size={12} />
                {calculation.timelineWeeks}
              </span>
            </div>

            {/* Main Metric: Recommended Transformer */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.76rem', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Recommended Transformer Capacity
              </div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: '#0284C7',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  lineHeight: 1.1,
                  marginTop: '2px',
                }}
              >
                {calculation.recommendedKva.toLocaleString('en-IN')} kVA
              </div>
              <div style={{ fontSize: '0.80rem', color: '#555555', marginTop: '4px' }}>
                Includes 25% continuous thermal headroom | 100% Copper Winding ONAN
              </div>
            </div>

            {/* Key Substation Outputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(2, 132, 199, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>APFC Bank Needed</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                  {calculation.kvarNeeded} kVAR
                </div>
                <div style={{ fontSize: '0.72rem', color: '#16A34A', marginTop: '2px' }}>Targets 0.99 Lag</div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(2, 132, 199, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Fault Rating</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                  {calculation.faultKa} kA (3s)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '2px' }}>IS 13947 Class</div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(2, 132, 199, 0.15)', gridColumn: 'span 2' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Estimated Penalty Avoidance</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857', marginTop: '2px' }}>
                  Rs {calculation.annualSavings.toLocaleString('en-IN')} / year
                </div>
                <div style={{ fontSize: '0.74rem', color: '#555555', marginTop: '2px' }}>
                  Under MSEDCL / BEST HT-I industrial power factor surcharge matrix
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#444444', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#0284C7" style={{ flexShrink: 0 }} />
              <span>Recommended HT Feeder: <strong>{calculation.cableSize}</strong></span>
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
                backgroundColor: '#0284C7',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Request CEI Sanction Docket &amp; Feasibility</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
