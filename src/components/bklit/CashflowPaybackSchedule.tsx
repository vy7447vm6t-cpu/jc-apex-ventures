"use client";

import React, { useState } from 'react';

interface CashflowPaybackScheduleProps {
  initialCapex?: number; // in Lakhs
  annualSavings?: number; // in Lakhs
  className?: string;
}

export default function CashflowPaybackSchedule({
  initialCapex = 28.5,
  annualSavings = 7.4,
  className = '',
}: CashflowPaybackScheduleProps) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Generate 25-year NPV progression
  const years = Array.from({ length: 26 }, (_, i) => i);
  const data = years.map((year) => {
    // 4% tariff escalation per year, 0.5% module degradation
    let cumulative = -initialCapex;
    for (let y = 1; y <= year; y++) {
      const escalatedSavings = annualSavings * Math.pow(1.04, y - 1) * Math.pow(0.995, y - 1);
      cumulative += escalatedSavings;
    }
    return {
      year,
      cumulative: parseFloat(cumulative.toFixed(2)),
    };
  });

  const breakevenYear = (initialCapex / annualSavings).toFixed(1);
  const finalSavings = data[25].cumulative;

  const width = 560;
  const height = 220;
  const paddingX = 45;
  const paddingY = 30;

  const minVal = -initialCapex;
  const maxVal = finalSavings;
  const range = maxVal - minVal;

  const points = data.map((d) => {
    const x = paddingX + (d.year / 25) * (width - paddingX * 2);
    const y = height - paddingY - ((d.cumulative - minVal) / range) * (height - paddingY * 2);
    return { x, y, year: d.year, cumulative: d.cumulative };
  });

  // Zero-line position
  const zeroY = height - paddingY - ((0 - minVal) / range) * (height - paddingY * 2);

  const pathD = points.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    return `${acc} L ${p.x} ${p.y}`;
  }, '');

  return (
    <div className={`rounded-3xl border border-black/8 bg-white/80 p-6 md:p-8 backdrop-blur-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
            Bklit DataViz : Financial Engineering
          </span>
          <h4 className="text-xl font-serif font-bold text-[#111111] mt-0.5">
            25-Year Cumulative Cashflow & Payback Schedule
          </h4>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-[#C29F53]/15 border border-[#C29F53]/30 text-xs font-mono font-bold text-[#111111] w-fit">
          Breakeven: Year {breakevenYear}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Zero baseline */}
          <line
            x1={paddingX}
            y1={zeroY}
            x2={width - paddingX}
            y2={zeroY}
            stroke="#111111"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <text
            x={paddingX - 6}
            y={zeroY + 3}
            textAnchor="end"
            className="text-[9px] fill-[#666666] font-mono"
          >
            Rs 0
          </text>

          {/* Breakeven marker vertical */}
          <line
            x1={paddingX + (parseFloat(breakevenYear) / 25) * (width - paddingX * 2)}
            y1={paddingY}
            x2={paddingX + (parseFloat(breakevenYear) / 25) * (width - paddingX * 2)}
            y2={height - paddingY}
            stroke="#27C93F"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Stroke Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Year markers & circles */}
          {points.map((p, idx) => {
            if (idx % 5 !== 0 && idx !== 25) return null;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredYear(idx)}
                onMouseLeave={() => setHoveredYear(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredYear === idx ? 6 : 4}
                  fill={p.cumulative >= 0 ? '#C29F53' : '#FF5F56'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
                <text
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-[9px] fill-[#777777] font-mono"
                >
                  Yr {p.year}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Selected year badge */}
        <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-[#F4F1EA] text-xs font-mono">
          <span className="text-[#666666]">
            {hoveredYear !== null ? `Year ${hoveredYear} Net Cashflow:` : '25-Year Cumulative Lifetime Return:'}
          </span>
          <span className="font-bold text-[#111111]">
            {hoveredYear !== null
              ? `Rs ${points[hoveredYear].cumulative > 0 ? '+' : ''}${points[hoveredYear].cumulative} Lakhs`
              : `+Rs ${finalSavings} Lakhs Net Savings`}
          </span>
        </div>
      </div>

      {/* Financial Summary KPIs */}
      <div className="mt-4 pt-4 border-t border-black/8 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[10px] font-mono text-[#888888] block">INITIAL OUTLAY</span>
          <span className="text-sm font-mono font-bold text-[#FF5F56]">
            -Rs {initialCapex}L
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#888888] block">PAYBACK PERIOD</span>
          <span className="text-sm font-mono font-bold text-[#27C93F]">
            {breakevenYear} Years
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#888888] block">25-YR NET RETURN</span>
          <span className="text-sm font-mono font-bold text-[#C29F53]">
            +Rs {finalSavings}L
          </span>
        </div>
      </div>
    </div>
  );
}
