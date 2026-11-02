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
    // Example energy rates for the estimate, not the utilities' current tariff schedules
    const rates: Record<string, { comm: number; ind: number; chs: number }> = {
      BEST: { comm: 12.45, ind: 10.15, chs: 7.25 },
      AEML: { comm: 12.95, ind: 10.45, chs: 7.65 },
      TATA: { comm: 12.60, ind: 10.25, chs: 7.40 },
      MSEDCL: { comm: 13.20, ind: 10.80, chs: 7.90 },
    };

    const currentRate = category === 'commercial' ? rates[utility].comm : category === 'industrial' ? rates[utility].ind : rates[utility].chs;
    const monthlyEnergyBill = units * currentRate;

    // Power factor adjustment, in the usual MERC shape:
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

    // What the overcharge adds up to over 18 months, if the utility's records confirm it
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
              letterSpacing: '0',
              color: '#2C5ED4',
            }}
          >
            Sanyog · Electricity bill check
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
          What a wrong tariff or power factor charge may cost you.
        </h3>
        <p style={{ color: '#666666', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          An illustrative estimate from example rates. Any refund depends on the utility’s own records and, if it comes to that, the forum’s decision.
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#666666', marginTop: '4px' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#666666', marginTop: '4px' }}>
              <span style={{ color: '#DC2626' }}>0.72 (charge)</span>
              <span>0.90 (Threshold)</span>
              <span style={{ color: '#16A34A' }}>0.99 (rebate)</span>
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
              <span className="text-[11px] font-bold text-[#2C5ED4]">
                Illustrative estimate
              </span>
            </div>

            {/* Main figure */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.76rem', color: '#666666', letterSpacing: '0.04em' }}>
                Overcharge over 18 months, if confirmed
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
                Power factor charge and tariff difference, at the example rate
              </div>
            </div>

            {/* Grid Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(44, 94, 212, 0.15)' }}>
                <div style={{ fontSize: '0.70rem', color: '#666666' }}>
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
                <div style={{ fontSize: '0.70rem', color: '#666666' }}>Energy rate used</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                  Rs {audit.currentRate.toFixed(2)} / kWh
                </div>
                <div style={{ fontSize: '0.70rem', color: '#666666', marginTop: '2px' }}>Example rate, {utility}</div>
              </div>

              {category === 'commercial' && (
                <div style={{ backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(44, 94, 212, 0.15)', gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '0.70rem', color: '#666666' }}>Wrong tariff category</div>
                  <div style={{ fontSize: '1.20rem', fontWeight: 700, color: '#047857', marginTop: '2px' }}>
                    Rs {audit.annualMisclassificationExposure.toLocaleString('en-IN')} / year
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#555555', marginTop: '2px' }}>
                    If common areas are billed at the commercial rate instead of the residential one
                  </div>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#444444', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <CheckCircle2 size={15} color="#2C5ED4" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>We check your bills first and tell you at the start if a case is weak.</span>
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
              <span>Ask Sanyog to check your bills</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
