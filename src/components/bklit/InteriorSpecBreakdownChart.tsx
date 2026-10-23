"use client";

import React, { useState } from 'react';

export interface InteriorSpecBreakdownChartProps {
  tier?: 'standard' | 'premium' | 'luxury';
  areaSqFt?: number;
  className?: string;
}

interface AllocationCategory {
  name: string;
  pct: number; // 0 to 1
  color: string;
  description: string;
}

interface TierSpec {
  name: string;
  label: string;
  ratePerSqFt: number;
  stcRating: number;
  leadTime: string;
  tagline: string;
  allocations: AllocationCategory[];
}

const TIER_SPECS: Record<'standard' | 'premium' | 'luxury', TierSpec> = {
  standard: {
    name: 'Standard',
    label: 'Standard (STC 42)',
    ratePerSqFt: 1800,
    stcRating: 42,
    leadTime: '45 Days Handover',
    tagline: 'High-durability commercial grade modular finishes',
    allocations: [
      { name: 'Modular Partitions', pct: 0.30, color: '#111111', description: 'Pre-finished drywall with mineral wool infill' },
      { name: 'VRF & Ducting', pct: 0.22, color: '#444444', description: 'Ducted ceiling cassettes and linear supply grills' },
      { name: 'Architectural Lighting', pct: 0.18, color: '#C29F53', description: 'Dimmable LED downlights and task lighting' },
      { name: 'Demountable Glazing', pct: 0.15, color: '#8C6D23', description: 'Single-glazed aluminum slimline framing' },
      { name: 'Acoustic Ceilings (STC 42)', pct: 0.15, color: '#888888', description: 'Micro-perforated acoustic ceiling tiles' },
    ],
  },
  premium: {
    name: 'Premium',
    label: 'Premium (STC 48)',
    ratePerSqFt: 2800,
    stcRating: 48,
    leadTime: '60 Days Handover',
    tagline: 'Curated architectural veneers with engineered baffles',
    allocations: [
      { name: 'Architectural Partitions', pct: 0.28, color: '#111111', description: 'Acoustic wall linings and natural wood veneers' },
      { name: 'Precision HVAC & Air Care', pct: 0.24, color: '#444444', description: 'Low-dB fan coil units with HEPA filtration' },
      { name: 'Tunable Lighting & Controls', pct: 0.20, color: '#C29F53', description: 'DALI circadian rhythm automated scene controls' },
      { name: 'Acoustic Baffles (STC 48)', pct: 0.16, color: '#8C6D23', description: 'Engineered suspended PET felt and wood baffles' },
      { name: 'Double Glazed Glass', pct: 0.12, color: '#888888', description: 'Acoustic laminated double glazing assemblies' },
    ],
  },
  luxury: {
    name: 'Luxury',
    label: 'Luxury (STC 55)',
    ratePerSqFt: 4500,
    stcRating: 55,
    leadTime: '90 Days Handover',
    tagline: 'Bespoke Italian stone, acoustic isolation, and custom millwork',
    allocations: [
      { name: 'Bespoke Millwork & Walls', pct: 0.32, color: '#111111', description: 'Fluted Italian marble, walnut panels, and brass trim' },
      { name: 'Acoustic Isolation (STC 55)', pct: 0.22, color: '#8C6D23', description: 'Decoupled floating wall assemblies and sound traps' },
      { name: 'Smart Circadian Lighting', pct: 0.18, color: '#C29F53', description: 'Architectural recessed linear profiles and fixtures' },
      { name: 'Concealed Silent HVAC', pct: 0.16, color: '#444444', description: 'Whisper-quiet multi-zone precision air management' },
      { name: 'Switchable Privacy Glazing', pct: 0.12, color: '#888888', description: 'Smart PDLC switchable privacy glass partitions' },
    ],
  },
};

export default function InteriorSpecBreakdownChart({
  tier = 'premium',
  areaSqFt = 2500,
  className = '',
}: InteriorSpecBreakdownChartProps) {
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium' | 'luxury' | null>(null);
  const [prevTier, setPrevTier] = useState(tier);
  if (prevTier !== tier) {
    setPrevTier(tier);
    setSelectedTier(null);
  }
  const activeTier = selectedTier ?? tier;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentSpec = TIER_SPECS[activeTier] || TIER_SPECS.premium;
  const safeArea = Math.max(100, areaSqFt);
  const totalBudget = safeArea * currentSpec.ratePerSqFt;

  const width = 560;
  const height = 180;
  const paddingX = 20;
  const barY = 40;
  const barHeight = 44;
  const usableWidth = width - paddingX * 2;

  // Compute segmented cumulative widths for stacked SVG bar purely
  const segments = currentSpec.allocations.reduce<
    Array<(typeof currentSpec.allocations)[number] & {
      startX: number;
      segWidth: number;
      perSqFtCost: number;
      categoryBudget: number;
    }>
  >((acc, alloc, idx) => {
    const prevCum = currentSpec.allocations.slice(0, idx).reduce((sum, a) => sum + a.pct, 0);
    const startX = paddingX + prevCum * usableWidth;
    const segWidth = alloc.pct * usableWidth;
    const perSqFtCost = Math.round(currentSpec.ratePerSqFt * alloc.pct);
    const categoryBudget = Math.round(totalBudget * alloc.pct);
    acc.push({
      ...alloc,
      startX,
      segWidth,
      perSqFtCost,
      categoryBudget,
    });
    return acc;
  }, []);

  return (
    <div className={`rounded-3xl border border-black/8 bg-white/90 p-6 md:p-8 backdrop-blur-xl shadow-lg font-sans ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D23]">
            [TVASTA TELEMETRY / SPATIAL SPEC &amp; ACOUSTIC ALLOCATION]
          </span>
          <h4
            className="text-2xl font-normal text-[#111111] mt-1 tracking-tight"
            style={{ fontFamily: "var(--font-serif-display), 'Instrument Serif', Georgia, serif" }}
          >
            Turnkey Space Planning &amp; Acoustic Fit-Out Breakdown
          </h4>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-black/10 bg-[#F4F1EA]">
          {(['standard', 'premium', 'luxury'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setSelectedTier(t);
                setHoveredIdx(null);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeTier === t
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Stacked Allocation Bar */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Stacked Bars */}
          {segments.map((seg, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g
                key={seg.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <rect
                  x={seg.startX}
                  y={barY}
                  width={seg.segWidth}
                  height={barHeight}
                  fill={seg.color}
                  rx={idx === 0 ? 8 : idx === segments.length - 1 ? 8 : 0}
                  opacity={hoveredIdx === null || isHovered ? 1 : 0.55}
                  stroke={isHovered ? '#C29F53' : '#FFFFFF'}
                  strokeWidth={isHovered ? 2.5 : 1}
                  className="transition-all duration-200"
                />
                {/* Segment label inside or below bar */}
                <text
                  x={seg.startX + seg.segWidth / 2}
                  y={barY + barHeight / 2 + 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  className="text-[10px] font-semibold tabular-nums pointer-events-none"
                >
                  {Math.round(seg.pct * 100)}%
                </text>
                <text
                  x={seg.startX + seg.segWidth / 2}
                  y={barY + barHeight + 22}
                  textAnchor="middle"
                  fill={isHovered ? '#111111' : '#777777'}
                  className="text-[9px] font-medium tracking-tight pointer-events-none"
                >
                  {seg.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Locked-height hover telemetry readout bar (prevents layout shift) */}
        <div className="mt-2 min-h-[44px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F4F1EA] text-xs font-sans tabular-nums border border-black/5">
          {hoveredIdx !== null ? (
            <>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: segments[hoveredIdx].color }}
                />
                <span className="font-semibold text-[#111111]">
                  {segments[hoveredIdx].name}:
                </span>
                <span className="text-[#666666] hidden sm:inline">
                  {segments[hoveredIdx].description}
                </span>
              </div>
              <span className="font-bold text-[#111111] shrink-0 ml-2">
                Rs {segments[hoveredIdx].perSqFtCost}/sqft (Rs {(segments[hoveredIdx].categoryBudget / 100000).toFixed(2)}L allocation)
              </span>
            </>
          ) : (
            <>
              <span className="text-[#595959] font-medium">Allocation Telemetry:</span>
              <span className="text-[#666666]">
                Hover category segments to inspect itemized per-sqft cost for {safeArea.toLocaleString('en-IN')} sq ft
              </span>
            </>
          )}
        </div>
      </div>

      {/* Footer Specification KPIs */}
      <div className="mt-4 pt-4 border-t border-black/8 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#595959] block">BASE RATE</span>
          <span className="text-sm font-bold text-[#111111] tabular-nums">
            Rs {currentSpec.ratePerSqFt.toLocaleString('en-IN')}/sqft
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#595959] block">ACOUSTIC RATING</span>
          <span className="text-sm font-bold text-[#8C6D23] tabular-nums">
            STC {currentSpec.stcRating} Certified
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#595959] block">TOTAL FOR {safeArea.toLocaleString('en-IN')} SQFT</span>
          <span className="text-sm font-bold text-[#27C93F] tabular-nums">
            Rs {(totalBudget / 100000).toFixed(2)} Lakhs
          </span>
        </div>
      </div>
    </div>
  );
}
