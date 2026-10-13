"use client";

import React, { useState, useId } from 'react';
import {
  Building2,
  Home,
  Factory,
  ShieldCheck,
  Layers,
  Calculator,
  ArrowRight,
  CheckCircle2,
  IndianRupee,
} from 'lucide-react';

export type PropertyType = 'chs' | 'residential' | 'commercial';
export type StructureType = 'standard' | 'pergola';
export type EvOption = 'none' | 'single7kw' | 'dual7kw' | 'fast22kw';
export type BipvOption = 'none' | '150sqft' | '350sqft' | '750sqft';

export interface CalculationResult {
  propertyType: PropertyType;
  structureType: StructureType;
  evOption: EvOption;
  bipvOption: BipvOption;
  inputMode: 'bill' | 'area';
  inputValue: number;
  recommendedKwp: number;
  panelCount: number;
  requiredAreaSqFt: number;
  monthlyGenerationUnits: number;
  annualGenerationUnits: number;
  monthlySavingsRs: number;
  annualSavingsRs: number;
  baseCostRs: number;
  pergolaExtraRs: number;
  evCostRs: number;
  bipvCostRs: number;
  subtotalRs: number;
  gstRs: number;
  grossCostRs: number;
  subsidyRs: number;
  netInvestmentRs: number;
  paybackYears: number;
  lifetimeSavings25YrsRs: number;
  co2OffsetTonsPerYear: number;
}

interface SolarCalculatorProps {
  onApplyCalculation?: (result: CalculationResult) => void;
}

export default function SolarCalculator({ onApplyCalculation }: SolarCalculatorProps) {
  const [inputMode, setInputMode] = useState<'bill' | 'area'>('bill');
  const [billAmount, setBillAmount] = useState<number>(18000);
  const [areaAmount, setAreaAmount] = useState<number>(1500);
  const [propertyType, setPropertyType] = useState<PropertyType>('chs');
  const [structureType, setStructureType] = useState<StructureType>('pergola');
  const [evOption, setEvOption] = useState<EvOption>('single7kw');
  const [bipvOption, setBipvOption] = useState<BipvOption>('none');
  const [activeTab, setActiveTab] = useState<'summary' | 'financials' | 'technical'>('summary');
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  const billSliderId = useId();
  const billNumberId = useId();
  const areaSliderId = useId();
  const areaNumberId = useId();

  // Tariff assumptions for Mumbai / MMR
  const tariffPerUnit = propertyType === 'commercial' ? 12.5 : 9.5;
  // Average solar generation in Mumbai: ~120 units per kWp per month (4 units/day/kWp)
  const monthlyUnitsPerKwp = 120;

  // Calculate recommended kWp
  const effectiveBill = Math.max(1000, billAmount || 1000);
  const effectiveArea = Math.max(100, areaAmount || 100);

  let recommendedKwp = 0;
  if (inputMode === 'bill') {
    const monthlyUnitsNeeded = effectiveBill / tariffPerUnit;
    const rawKwp = monthlyUnitsNeeded / monthlyUnitsPerKwp;
    recommendedKwp = Math.max(1, Math.round(rawKwp * 10) / 10);
  } else {
    // 550W panels need approx 90-100 sq ft shadow-free per kWp
    const rawKwp = effectiveArea / 95;
    recommendedKwp = Math.max(1, Math.round(rawKwp * 10) / 10);
  }

  // Cap for calculator UI sanity (500 kWp is maximum LT/HT net metering range for societies)
  if (recommendedKwp > 500) recommendedKwp = 500;

  // Modern high-efficiency 550W mono PERC / bifacial module count
  const panelWattage = 550;
  const panelCount = Math.ceil((recommendedKwp * 1000) / panelWattage);
  const actualKwp = Number(((panelCount * panelWattage) / 1000).toFixed(2));
  const requiredAreaSqFt = Math.round(actualKwp * 90);

  // Generation & Savings
  const monthlyGenerationUnits = Math.round(actualKwp * monthlyUnitsPerKwp);
  const annualGenerationUnits = monthlyGenerationUnits * 12;
  const monthlySavingsRs = Math.round(monthlyGenerationUnits * tariffPerUnit);
  const annualSavingsRs = monthlySavingsRs * 12;

  // Cost Engineering Benchmarks in Mumbai
  let baseRatePerWatt = 52;
  if (actualKwp > 10) baseRatePerWatt = 48;
  if (actualKwp > 50) baseRatePerWatt = 44;
  if (actualKwp > 100) baseRatePerWatt = 40;

  const baseCostRs = Math.round(actualKwp * 1000 * baseRatePerWatt);

  // Pergola premium (raising array 10 to 12 ft with structural wind certification)
  const pergolaExtraPerWatt = structureType === 'pergola' ? 12 : 0;
  const pergolaExtraRs = Math.round(actualKwp * 1000 * pergolaExtraPerWatt);

  // EV Add-on
  let evCostRs = 0;
  if (evOption === 'single7kw') evCostRs = 58000;
  else if (evOption === 'dual7kw') evCostRs = 110000;
  else if (evOption === 'fast22kw') evCostRs = 145000;

  // BIPV Glass Add-on
  let bipvCostRs = 0;
  if (bipvOption === '150sqft') bipvCostRs = 85000;
  else if (bipvOption === '350sqft') bipvCostRs = 195000;
  else if (bipvOption === '750sqft') bipvCostRs = 420000;

  const subtotalRs = baseCostRs + pergolaExtraRs + evCostRs + bipvCostRs;
  const gstRs = Math.round(subtotalRs * 0.138); // 13.8% composite solar EPC rate
  const grossCostRs = subtotalRs + gstRs;

  // PM Surya Ghar Subsidy calculation
  let subsidyRs = 0;
  if (propertyType === 'residential') {
    if (actualKwp <= 1) subsidyRs = 30000;
    else if (actualKwp <= 2) subsidyRs = 60000;
    else subsidyRs = 78000;
  } else if (propertyType === 'chs') {
    // Housing society common meters: Rs 18,000 per kW up to 500 kWp / max Rs 10.8 Lakh
    subsidyRs = Math.min(1080000, Math.round(actualKwp * 18000));
  } else {
    // Commercial gets 40% Accelerated Depreciation tax benefit instead of direct central capital subsidy
    subsidyRs = 0;
  }

  const netInvestmentRs = Math.max(0, grossCostRs - subsidyRs);
  const paybackYears = Number((netInvestmentRs / (annualSavingsRs || 1)).toFixed(1));
  const lifetimeSavings25YrsRs = Math.round(annualSavingsRs * 25 - netInvestmentRs);
  const co2OffsetTonsPerYear = Number(((annualGenerationUnits * 0.82) / 1000).toFixed(1));

  const handleApplyToForm = () => {
    if (onApplyCalculation) {
      onApplyCalculation({
        propertyType,
        structureType,
        evOption,
        bipvOption,
        inputMode,
        inputValue: inputMode === 'bill' ? effectiveBill : effectiveArea,
        recommendedKwp: actualKwp,
        panelCount,
        requiredAreaSqFt,
        monthlyGenerationUnits,
        annualGenerationUnits,
        monthlySavingsRs,
        annualSavingsRs,
        baseCostRs,
        pergolaExtraRs,
        evCostRs,
        bipvCostRs,
        subtotalRs,
        gstRs,
        grossCostRs,
        subsidyRs,
        netInvestmentRs,
        paybackYears,
        lifetimeSavings25YrsRs,
        co2OffsetTonsPerYear,
      });
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 4000);
      const el = document.getElementById('solis-enquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `Rs ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `Rs ${(val / 100000).toFixed(2)} Lakh`;
    return `Rs ${val.toLocaleString('en-IN')}`;
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: 'clamp(20px, 4vw, 44px)',
        border: '1px solid var(--color-border-accent-light)',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-xl)',
        background: 'var(--color-surface)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
              <Calculator size={22} color="var(--color-accent)" />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
              Solis Solar & Clean Energy Estimator
            </span>
          </div>
          <h3 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Estimate your solar plant, structure, and savings
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', marginTop: '6px' }}>
            Tailored for Mumbai conditions with BEST, Adani, Tata Power, and MSEDCL net metering rates.
          </p>
        </div>

        {/* Input Mode Toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--color-bg-alt)',
          padding: '4px',
          borderRadius: '100px',
          border: '1px solid var(--color-border)',
        }}>
          <button
            type="button"
            onClick={() => setInputMode('bill')}
            style={{
              padding: '8px 18px',
              borderRadius: '100px',
              border: 'none',
              background: inputMode === 'bill' ? 'var(--color-accent)' : 'transparent',
              color: inputMode === 'bill' ? '#FFFFFF' : 'var(--color-text-secondary)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            By Monthly Bill (Rs)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('area')}
            style={{
              padding: '8px 18px',
              borderRadius: '100px',
              border: 'none',
              background: inputMode === 'area' ? 'var(--color-accent)' : 'transparent',
              color: inputMode === 'area' ? '#FFFFFF' : 'var(--color-text-secondary)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            By Rooftop Area (sq ft)
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Result Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '36px' }} className="calculator-grid">
        {/* Left Column: Interactive Controls */}
        <div>
          {/* 1. Property Type */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
              1. Select Property Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'chs', label: 'Housing Society', desc: 'CHS Common Meter', icon: Building2 },
                { id: 'residential', label: 'Bungalow / Home', desc: 'Individual Meter', icon: Home },
                { id: 'commercial', label: 'Commercial Unit', desc: 'Offices & Facilities', icon: Factory },
              ].map((item) => {
                const isSelected = propertyType === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id as PropertyType)}
                    style={{
                      padding: '14px 12px',
                      borderRadius: '14px',
                      textAlign: 'left',
                      border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      background: isSelected ? 'var(--color-accent-pale)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <div>
                      <IconComponent size={20} color={isSelected ? 'var(--color-accent)' : 'var(--color-text-muted)'} style={{ marginBottom: '8px' }} />
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', marginBottom: '4px' }}>
                        {item.label}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Bill or Area Slider */}
          <div style={{ marginBottom: '28px', padding: '20px', borderRadius: '16px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
            {inputMode === 'bill' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label htmlFor={billSliderId} style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    2. Average Monthly Electricity Bill
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-bg)', padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <IndianRupee size={14} color="var(--color-accent)" />
                    <input
                      id={billNumberId}
                      type="number"
                      value={billAmount === 0 ? '' : billAmount}
                      min={1000}
                      max={1000000}
                      step={1000}
                      placeholder="18000"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setBillAmount(0);
                        } else {
                          const num = parseInt(val, 10);
                          if (!isNaN(num)) setBillAmount(Math.min(1000000, Math.max(0, num)));
                        }
                      }}
                      onBlur={() => {
                        if (billAmount < 1000) setBillAmount(3000);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        width: '95px',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>
                <input
                  id={billSliderId}
                  type="range"
                  min={3000}
                  max={250000}
                  step={1000}
                  value={Math.min(250000, Math.max(3000, billAmount || 3000))}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                  <span>Rs 3,000 / month</span>
                  <span>Rs 1,00,000 / month</span>
                  <span>Rs 2,50,000+ / month</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label htmlFor={areaSliderId} style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    2. Available Shadow-Free Rooftop Area
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg)', padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <input
                      id={areaNumberId}
                      type="number"
                      value={areaAmount === 0 ? '' : areaAmount}
                      min={100}
                      max={50000}
                      step={50}
                      placeholder="1500"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setAreaAmount(0);
                        } else {
                          const num = parseInt(val, 10);
                          if (!isNaN(num)) setAreaAmount(Math.min(50000, Math.max(0, num)));
                        }
                      }}
                      onBlur={() => {
                        if (areaAmount < 100) setAreaAmount(500);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        width: '85px',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 700 }}>sq ft</span>
                  </div>
                </div>
                <input
                  id={areaSliderId}
                  type="range"
                  min={200}
                  max={20000}
                  step={100}
                  value={Math.min(20000, Math.max(200, areaAmount || 200))}
                  onChange={(e) => setAreaAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                  <span>200 sq ft</span>
                  <span>5,000 sq ft</span>
                  <span>20,000+ sq ft</span>
                </div>
              </>
            )}
          </div>

          {/* 3. Structure Selection (Pergola vs Standard) */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
              3. Structural Mounting System
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setStructureType('pergola')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  textAlign: 'left',
                  border: `1px solid ${structureType === 'pergola' ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  background: structureType === 'pergola' ? 'var(--color-accent-pale)' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: structureType === 'pergola' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                    Elevated Pergola
                  </div>
                  <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', background: 'var(--color-accent)', color: '#FFFFFF', fontWeight: 700 }}>
                    Recommended
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  Elevated 10 to 12 ft on galvanized columns. 100% usable terrace, walking space, and rain gutters.
                </p>
                <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.72rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                  +Rs 12/watt premium
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStructureType('standard')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  textAlign: 'left',
                  border: `1px solid ${structureType === 'standard' ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  background: structureType === 'standard' ? 'var(--color-accent-pale)' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: structureType === 'standard' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                    Standard Ground Mount
                  </div>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  Hot-dip galvanized structure elevated 1 to 2 metres above roof floor. Lowest initial cost, ideal for closed roofs.
                </p>
                <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Standard EPC Base
                </span>
              </button>
            </div>
          </div>

          {/* 4. Optional Add-ons: EV Charging & BIPV Glass */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                4. Add EV Charging
              </label>
              <select
                className="form-select"
                value={evOption}
                onChange={(e) => setEvOption(e.target.value as EvOption)}
                style={{ fontSize: '0.85rem', padding: '10px 12px' }}
              >
                <option value="none">No EV Charger</option>
                <option value="single7kw">1 x 7.4 kW AC Smart Point (+Rs 58k)</option>
                <option value="dual7kw">2 x 7.4 kW AC Dual Points (+Rs 1.10L)</option>
                <option value="fast22kw">1 x 22 kW Fast AC Point (+Rs 1.45L)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                5. Add BIPV Solar Glass
              </label>
              <select
                className="form-select"
                value={bipvOption}
                onChange={(e) => setBipvOption(e.target.value as BipvOption)}
                style={{ fontSize: '0.85rem', padding: '10px 12px' }}
              >
                <option value="none">No BIPV Glass</option>
                <option value="150sqft">150 sq ft Canopy (+Rs 85k)</option>
                <option value="350sqft">350 sq ft Skylight (+Rs 1.95L)</option>
                <option value="750sqft">750 sq ft Atrium (+Rs 4.20L)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Outputs & Financial Summary */}
        <div style={{
          background: 'var(--color-bg-alt)',
          borderRadius: '20px',
          border: '1px solid var(--color-border-accent-light)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div>
            {/* Top Stat Ribbon */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              paddingBottom: '20px',
              marginBottom: '20px',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Recommended Size
                </span>
                <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--color-accent)', marginTop: '2px' }}>
                  {actualKwp} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kWp</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Panels (550W)
                </span>
                <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {panelCount} <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>modules</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Shadow-Free Area
                </span>
                <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {requiredAreaSqFt} <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>sq ft</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              {[
                { id: 'summary', label: 'Generation & Savings' },
                { id: 'financials', label: 'Cost & Subsidy' },
                { id: 'technical', label: 'BOS Inclusions' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as 'summary' | 'financials' | 'technical')}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                    padding: '6px 12px',
                    color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Generation & Savings */}
            {activeTab === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>Estimated Monthly Solar Units</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>~{monthlyGenerationUnits.toLocaleString('en-IN')} units (kWh)</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>Estimated Annual Solar Units</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>~{annualGenerationUnits.toLocaleString('en-IN')} units/year</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-accent-pale)', border: '1px solid var(--color-border-accent-light)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', fontWeight: 700 }}>Expected Monthly Savings</span>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--color-accent)' }}>{formatCurrency(monthlySavingsRs)} / month</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>Expected Annual Savings</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>{formatCurrency(annualSavingsRs)} / year</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>Estimated Simple Payback</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-accent)' }}>~{paybackYears} Years</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>25-Year Estimated Net Savings</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-accent)' }}>~{formatCurrency(lifetimeSavings25YrsRs)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>Carbon Emissions Offset</span>
                  <strong style={{ fontSize: '0.95rem', color: '#059669' }}>~{co2OffsetTonsPerYear} Metric Tons CO2/yr</strong>
                </div>
              </div>
            )}

            {/* Tab 2: Cost & Subsidy */}
            {activeTab === 'financials' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
                  <span>Base Solar Plant EPC ({actualKwp} kWp)</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(baseCostRs)}</span>
                </div>

                {structureType === 'pergola' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
                    <span>Elevated Pergola Structure (10-12 ft)</span>
                    <span style={{ fontWeight: 600 }}>+{formatCurrency(pergolaExtraRs)}</span>
                  </div>
                )}

                {evCostRs > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
                    <span>EV Charging Infrastructure</span>
                    <span style={{ fontWeight: 600 }}>+{formatCurrency(evCostRs)}</span>
                  </div>
                )}

                {bipvCostRs > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
                    <span>BIPV Architectural Solar Glass</span>
                    <span style={{ fontWeight: 600 }}>+{formatCurrency(bipvCostRs)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
                  <span>Composite GST (13.8% on EPC works)</span>
                  <span style={{ fontWeight: 600 }}>+{formatCurrency(gstRs)}</span>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '4px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  <span>Estimated Total Project Cost</span>
                  <span>{formatCurrency(grossCostRs)}</span>
                </div>

                {subsidyRs > 0 ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#059669', fontWeight: 700 }}>
                    <span>PM Surya Ghar Government Subsidy</span>
                    <span>-{formatCurrency(subsidyRs)}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    Note: Commercial setups receive 40% Accelerated Depreciation tax benefits instead of direct central capital subsidy.
                  </div>
                )}

                <div style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--color-accent-pale)',
                  border: '1px solid var(--color-border-accent-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '6px',
                }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Estimated Net Outflow
                  </span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>
                    {formatCurrency(netInvestmentRs)}
                  </strong>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {propertyType === 'chs'
                    ? 'PM Surya Ghar provides Rs 18,000/kW up to Rs 10.8 Lakhs for housing societies for common meters and EV charging.'
                    : propertyType === 'residential'
                    ? 'PM Surya Ghar subsidy of up to Rs 78,000 is credited directly to consumer bank account post DISCOM meter commissioning.'
                    : 'Commercial enterprises benefit from accelerated depreciation and heavy peak-tariff reductions.'}
                </div>
              </div>
            )}

            {/* Tab 3: Technical Inclusions */}
            {activeTab === 'technical' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Tier-1 540W to 590W Solar Modules:</strong> High-efficiency mono PERC or bifacial half-cut panels with 25-year performance warranty.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)' }}>On-Grid String Inverter:</strong> IP65 rated, multi-MPPT tracking, integrated Wi-Fi mobile monitoring.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Mounting Structure:</strong> Hot-dip galvanized steel (minimum 80 microns) certified for wind speeds up to 150 km/h.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Safety & Protection:</strong> Class II SPD lightning protection, dual chemical earthing pits for AC and DC circuits.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-primary)' }}>DISCOM Liaisoning:</strong> Complete net-metering paperwork, inspection clearance with BEST, Adani, Tata Power, or MSEDCL.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA Button */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
            <button
              type="button"
              onClick={handleApplyToForm}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '0.95rem' }}
            >
              <span>
                Book Site Feasibility with These Numbers <ArrowRight size={18} />
              </span>
            </button>

            {appliedNotice && (
              <div style={{
                textAlign: 'center',
                color: 'var(--color-accent)',
                fontSize: '0.85rem',
                marginTop: '10px',
                fontWeight: 700,
              }}>
                Calculated details copied to inspection form below!
              </div>
            )}

            <p style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '10px' }}>
              Estimates are indicative based on standard Mumbai tariffs and shadow-free orientation. Exact engineering proposal provided after physical site audit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
