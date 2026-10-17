"use client";

import React, { useState } from 'react';

interface EvNetworkCapexRevenueChartProps {
  siteCapex?: number; // in Lakhs, default 40L
  className?: string;
}

export default function EvNetworkCapexRevenueChart({
  siteCapex = 40,
  className = '',
}: EvNetworkCapexRevenueChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // 10-Year projection: CAPEX (Year 0) and recurring operational revenue
  const years = [
    { year: 'Yr 0', capex: siteCapex, revenue: 0, net: -siteCapex },
    { year: 'Yr 1', capex: 0, revenue: 9.6, net: 9.6 },
    { year: 'Yr 2', capex: 0, revenue: 13.8, net: 13.8 },
    { year: 'Yr 3', capex: 0, revenue: 18.2, net: 18.2 },
    { year: 'Yr 4', capex: 0, revenue: 22.4, net: 22.4 },
    { year: 'Yr 5', capex: 0, revenue: 26.5, net: 26.5 },
    { year: 'Yr 6', capex: 0, revenue: 29.8, net: 29.8 },
    { year: 'Yr 7', capex: 0, revenue: 32.5, net: 32.5 },
    { year: 'Yr 8', capex: 0, revenue: 35.0, net: 35.0 },
    { year: 'Yr 9', capex: 0, revenue: 37.2, net: 37.2 },
    { year: 'Yr 10', capex: 0, revenue: 39.5, net: 39.5 },
  ];

  const maxVal = 42;
  const width = 560;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const barWidth = 24;
  const chartAreaWidth = width - paddingX * 2;
  const spacing = chartAreaWidth / years.length;

  return (
    <div className={`rounded-3xl border border-black/8 bg-white/90 p-6 md:p-8 backdrop-blur-xl shadow-lg font-sans ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D23]">
            [AGRIM DPR / CHARGING HUB REVENUE]
          </span>
          <h4
            className="text-2xl font-normal text-[#111111] mt-1 tracking-tight"
            style={{ fontFamily: "var(--font-serif-display), 'Instrument Serif', Georgia, serif" }}
          >
            3,900 EV Network: Site CAPEX vs 10-Yr Revenue
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#FF5F56]" />
            <span className="text-[#666666]">CAPEX (Rs 40L)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#C29F53]" />
            <span className="text-[#666666]">Revenue (Annual)</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Baseline */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="rgba(0,0,0,0.15)"
          />

          {years.map((item, idx) => {
            const x = paddingX + idx * spacing + (spacing - barWidth) / 2;
            const val = item.year === 'Yr 0' ? item.capex : item.revenue;
            const barHeight = (val / maxVal) * (height - paddingY * 2);
            const y = height - paddingY - barHeight;
            const isCapex = item.year === 'Yr 0';

            return (
              <g
                key={item.year}
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
                className="cursor-pointer"
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={4}
                  fill={isCapex ? '#FF5F56' : '#C29F53'}
                  opacity={hoveredBar === null || hoveredBar === idx ? 1 : 0.45}
                  className="transition-all duration-200"
                />
                <text
                  x={x + barWidth / 2}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-[9px] fill-[#777777] font-sans"
                >
                  {item.year}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Locked-height Dynamic Detail Callout (prevents layout shift) */}
        <div className="mt-3 min-h-[44px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F4F1EA] text-xs font-sans tabular-nums border border-black/5">
          <span className="text-[#666666] font-medium">
            {hoveredBar !== null ? `${years[hoveredBar].year} Projection:` : '10-Year Cumulative Operational Cashflow:'}
          </span>
          <span className="font-bold text-[#111111]">
            {hoveredBar !== null
              ? years[hoveredBar].year === 'Yr 0'
                ? 'Rs 40.0 Lakhs Initial Turnkey Infrastructure Outlay'
                : `+Rs ${years[hoveredBar].revenue} Lakhs Annual Charging Network Revenue`
              : '+Rs 264.7 Lakhs 10-Yr Gross Recurring Inflow'}
          </span>
        </div>
      </div>

      {/* DPR Financial Validation */}
      <div className="mt-4 pt-4 border-t border-black/8 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#888888] block">PER-SITE CAPEX</span>
          <span className="text-sm font-bold text-[#FF5F56] tabular-nums">
            Rs 40.0L
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#888888] block">BREAKEVEN</span>
          <span className="text-sm font-bold text-[#27C93F] tabular-nums">
            Year 2.4
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#888888] block">10-YR PROJECT IRR</span>
          <span className="text-sm font-bold text-[#8C6D23] tabular-nums">
            34.8%
          </span>
        </div>
      </div>
    </div>
  );
}
