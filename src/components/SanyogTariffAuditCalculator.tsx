"use client";

import React, { useState, useMemo } from 'react';
import { Scale, AlertCircle, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SanyogTariffAuditCalculator() {
  const [units, setUnits] = useState<number>(14500);
  const [loadKva, setLoadKva] = useState<number>(125);
  const [powerFactor, setPowerFactor] = useState<number>(0.84);
  const [utility, setUtility] = useState<'BEST' | 'AEML' | 'TATA' | 'MSEDCL'>('BEST');
  const [category, setCategory] = useState<'commercial' | 'industrial' | 'chs'>('commercial');

  const audit = useMemo(() => {
    // Utility energy rate benchmarks
    const rates: Record<string, { comm: number; ind: number; chs: number }> = {
      BEST: { comm: 12.45, ind: 10.15, chs: 7.25 },
      AEML: { comm: 12.95, ind: 10.45, chs: 7.65 },
      TATA: { comm: 12.60, ind: 10.25, chs: 7.40 },
      MSEDCL: { comm: 13.20, ind: 10.80, chs: 7.90 },
    };

    const currentRate = category === 'commercial' ? rates[utility].comm : category === 'industrial' ? rates[utility].ind : rates[utility].chs;
    const monthlyEnergyBill = units * currentRate;

    // Power Factor Adjustment under MERC Tariff Schedules:
    // If PF < 0.90: Penalty of 1% to 8% on total energy charges
    // If PF > 0.95: Incentive rebate of +0.5% to +7%
    let pfMultiplier = 0;
    let isPenalty = false;

    if (powerFactor < 0.80) {
      pfMultiplier = 0.08;
      isPenalty = true;
    } else if (powerFactor < 0.85) {
      pfMultiplier = 0.05;
      isPenalty = true;
    } else if (powerFactor < 0.90) {
      pfMultiplier = 0.025;
      isPenalty = true;
    } else if (powerFactor >= 0.98) {
      pfMultiplier = 0.07;
      isPenalty = false;
    } else if (powerFactor >= 0.95) {
      pfMultiplier = 0.035;
      isPenalty = false;
    }

    const pfAdjustmentMonthly = Math.round(monthlyEnergyBill * pfMultiplier);
    const pfAdjustmentAnnual = pfAdjustmentMonthly * 12;

    // Tariff misclassification exposure (e.g. temporary/commercial rate applied to CHS common pump/lighting)
    const tariffDiffPerUnit = category === 'commercial' ? currentRate - rates[utility].chs : 0;
    const monthlyMisclassificationExposure = Math.round(units * tariffDiffPerUnit);
    const annualMisclassificationExposure = monthlyMisclassificationExposure * 12;

    // Maximum Demand Overshoot Exposure (billed at 150% of demand charges if recorded demand > sanctioned kVA)
    const demandChargePerKva = 450;
    const maxDemandPenaltyRisk = Math.round(loadKva * demandChargePerKva * 0.5);

    // Statutory CGRF Financial Recovery Potential (capped at 24 months statutory limitation under Section 56(2))
    const statutoryRecoveryPotential = (pfAdjustmentMonthly + monthlyMisclassificationExposure) * 18;

    return {
      monthlyEnergyBill,
      currentRate,
      pfAdjustmentMonthly,
      pfAdjustmentAnnual,
      isPenalty,
      monthlyMisclassificationExposure,
      annualMisclassificationExposure,
      maxDemandPenaltyRisk,
      statutoryRecoveryPotential,
    };
  }, [units, loadKva, powerFactor, utility, category]);

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 44px)',
        background: '#FFFFFF',
        border: '1px solid rgba(44, 94, 212, 0.20)',
        boxShadow: '0 20px 48px rgba(44, 94, 212, 0.08)',
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
            background: 'rgba(44, 94, 212, 0.08)',
            border: '1px solid rgba(44, 94, 212, 0.25)',
            marginBottom: '12px',
          }}
        >
          <Scale size={14} color="#2C5ED4" />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#2C5ED4',
            }}
          >
            [MERC STATUTORY TARIFF AUDIT &amp; GRIEVANCE CALCULATOR]
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
          Tariff Forensic Audit &amp; CGRF Claim Estimator.
        </h3>
        <p style={{ color: '#666666', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Calculate monthly power factor surcharges, wrong tariff slab financial exposure, and compute 24-month retroactive refund claims recoverable before the Consumer Grievance Redressal Forum (CGRF).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Utility Selector */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222', display: 'block', marginBottom: '8px' }}>
              Mumbai Distribution Licensee (DISCOM)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {(['BEST', 'AEML', 'TATA', 'MSEDCL'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUtility(u)}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    border: utility === u ? '1.5px solid #2C5ED4' : '1px solid rgba(0, 0, 0, 0.10)',
                    backgroundColor: utility === u ? 'rgba(44, 94, 212, 0.08)' : '#F9F9F9',
                    color: utility === u ? '#2C5ED4' : '#555555',
                    cursor: 'pointer',
                  }}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222', display: 'block', marginBottom: '8px' }}>
              Connection Tariff Classification
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[
                { id: 'commercial', label: 'Commercial LT-II' },
                { id: 'industrial', label: 'Industrial LT-V' },
                { id: 'chs', label: 'Housing CHS LT-I' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as any)}
                  style={{
                    padding: '8px 8px',
                    borderRadius: '10px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    border: category === c.id ? '1.5px solid #2C5ED4' : '1px solid rgba(0, 0, 0, 0.10)',
                    backgroundColor: category === c.id ? 'rgba(44, 94, 212, 0.08)' : '#F9F9F9',
                    color: category === c.id ? '#2C5ED4' : '#555555',
                    cursor: 'pointer',
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Units Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                Monthly Energy Consumption
              </label>
              <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#2C5ED4', fontVariantNumeric: 'tabular-nums' }}>
                {units.toLocaleString('en-IN')} Units
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={80000}
              step={1000}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2C5ED4' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888888', marginTop: '4px' }}>
              <span>2,000 units</span>
              <span>40,000 units</span>
              <span>80,000 units</span>
            </div>
          </div>

          {/* Power Factor Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#222222' }}>
                Recorded Power Factor
              </label>
              <span
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: audit.isPenalty ? '#DC2626' : '#16A34A',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {powerFactor.toFixed(2)} PF {audit.isPenalty ? '(Penalty)' : '(Incentive)'}
              </span>
            </div>
            <input
              type="range"
              min={0.72}
              max={0.99}
              step={0.01}
              value={powerFactor}
              onChange={(e) => setPowerFactor(Number(e.target.value))}
              style={{ width: '100%', accentColor: audit.isPenalty ? '#DC2626' : '#16A34A' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888888', marginTop: '4px' }}>
              <span style={{ color: '#DC2626' }}>0.72 (MERC Penalty)</span>
              <span>0.90 (Threshold)</span>
              <span style={{ color: '#16A34A' }}>0.99 (7% Rebate)</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div
          style={{
            borderRadius: '20px',
            padding: '28px',
            backgroundColor: '#F4F6FC',
            border: '1px solid rgba(44, 94, 212, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C5ED4]/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C5ED4]">
                Statutory Financial Audit Summary
              </span>
              <span className="text-[11px] text-[#555555] font-medium">
                MERC Supply Code Reg 8.4
              </span>
            </div>

            {/* Main Metric: Statutory Recovery Claim */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.76rem', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Estimated 24-Month CGRF Refund Potential
              </div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: '#2C5ED4',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  lineHeight: 1.1,
                  marginTop: '2px',
                }}
              >
                Rs {audit.statutoryRecoveryPotential.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.80rem', color: '#555555', marginTop: '4px' }}>
                Calculated under Section 56(2) limitation bar &amp; statutory billing reconciliation
              </div>
            </div>

            {/* Grid Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(44, 94, 212, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>
                  {audit.isPenalty ? 'Annual PF Penalty' : 'Annual PF Incentive'}
                </div>
                <div
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: audit.isPenalty ? '#DC2626' : '#16A34A',
                    marginTop: '2px',
                  }}
                >
                  {audit.isPenalty ? '-' : '+'}Rs {audit.pfAdjustmentAnnual.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.70rem', color: '#666666', marginTop: '2px' }}>
                  {audit.isPenalty ? 'Lost to DISCOM' : 'Rebate on demand'}
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(44, 94, 212, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Current Base Tariff</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                  Rs {audit.currentRate.toFixed(2)} / kWh
                </div>
                <div style={{ fontSize: '0.70rem', color: '#666666', marginTop: '2px' }}>{utility} Scheduled Rate</div>
              </div>

              {category === 'commercial' && (
                <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(44, 94, 212, 0.15)', gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '0.70rem', color: '#777777', textTransform: 'uppercase' }}>Tariff Re-Classification Savings</div>
                  <div style={{ fontSize: '1.20rem', fontWeight: 700, color: '#047857', marginTop: '2px' }}>
                    Rs {audit.annualMisclassificationExposure.toLocaleString('en-IN')} / year
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '2px' }}>
                    Recoverable if common meters or ancillary areas are billed on commercial LT-II instead of LT-I
                  </div>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#444444', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <CheckCircle2 size={15} color="#2C5ED4" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>CGRF petitions require nominal statutory ₹50 token fee with 60-day mandatory disposal timeline.</span>
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
                backgroundColor: '#2C5ED4',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(44, 94, 212, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Initiate MERC Forensic Bill Audit</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
