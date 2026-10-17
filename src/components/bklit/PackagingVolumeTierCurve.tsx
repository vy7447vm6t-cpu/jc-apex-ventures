"use client";

import React, { useState, useEffect } from 'react';

interface PackagingVolumeTierCurveProps {
  activeQuantity?: number;
  className?: string;
}

export default function PackagingVolumeTierCurve({
  activeQuantity,
  className = '',
}: PackagingVolumeTierCurveProps) {
  const [selectedQty, setSelectedQty] = useState<number>(5000);

  // Volume tiers and unit costs in INR
  const tiers = [
    { qty: 500, digital: 145, offset: 220, label: '500' },
    { qty: 1000, digital: 110, offset: 135, label: '1k' },
    { qty: 2500, digital: 85, offset: 78, label: '2.5k' },
    { qty: 5000, digital: 72, offset: 48, label: '5k' },
    { qty: 10000, digital: 64, offset: 32, label: '10k' },
    { qty: 25000, digital: 58, offset: 22, label: '25k' },
    { qty: 50000, digital: 54, offset: 16, label: '50k' },
  ];

  useEffect(() => {
    if (typeof activeQuantity === 'number') {
      const closest = tiers.reduce((prev, curr) =>
        Math.abs(curr.qty - activeQuantity) < Math.abs(prev.qty - activeQuantity) ? curr : prev
      );
      setSelectedQty(closest.qty);
    }
  }, [activeQuantity]);

  const width = 560;
  const height = 220;
  const paddingX = 45;
  const paddingY = 30;
  const maxCost = 240;

  const getPoints = (key: 'digital' | 'offset') => {
    return tiers.map((t, idx) => {
      const x = paddingX + (idx / (tiers.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - (t[key] / maxCost) * (height - paddingY * 2);
      return { x, y, qty: t.qty, cost: t[key] };
    });
  };

  const digitalPoints = getPoints('digital');
  const offsetPoints = getPoints('offset');

  const makePath = (pts: typeof digitalPoints) => {
    return pts.reduce((acc, p, idx) => {
      if (idx === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[idx - 1];
      const cpX = (prev.x + p.x) / 2;
      return `${acc} C ${cpX} ${prev.y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
    }, '');
  };

  const currentTier = tiers.find((t) => t.qty === selectedQty) || tiers[3];

  return (
    <div className={`rounded-3xl border border-black/8 bg-white/90 p-6 md:p-8 backdrop-blur-xl shadow-lg font-sans ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D23]">
            [eMUDRAN / RUN TIER CURVE]
          </span>
          <h4
            className="text-2xl font-normal text-[#111111] mt-1 tracking-tight"
            style={{ fontFamily: "var(--font-serif-display), 'Instrument Serif', Georgia, serif" }}
          >
            Packaging Volume Tier &amp; Press Economics
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-5 rounded-full bg-[#111111]" />
            <span className="text-[#666666]">Offset Press</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-5 rounded-full bg-[#C29F53]" />
            <span className="text-[#666666]">Digital Indigo</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="rgba(0,0,0,0.15)"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="rgba(0,0,0,0.06)"
            strokeDasharray="4 4"
          />

          {/* Digital curve */}
          <path
            d={makePath(digitalPoints)}
            fill="none"
            stroke="#C29F53"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Offset curve */}
          <path
            d={makePath(offsetPoints)}
            fill="none"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Points */}
          {tiers.map((t, idx) => {
            const x = paddingX + (idx / (tiers.length - 1)) * (width - paddingX * 2);
            return (
              <g
                key={t.qty}
                onClick={() => setSelectedQty(t.qty)}
                className="cursor-pointer"
              >
                <circle
                  cx={offsetPoints[idx].x}
                  cy={offsetPoints[idx].y}
                  r={selectedQty === t.qty ? 6 : 4}
                  fill="#111111"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle
                  cx={digitalPoints[idx].x}
                  cy={digitalPoints[idx].y}
                  r={selectedQty === t.qty ? 6 : 4}
                  fill="#C29F53"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-[9px] fill-[#777777] font-sans"
                >
                  {t.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Locked-height Selected Tier Callout (prevents layout shift) */}
        <div className="mt-3 min-h-[44px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F4F1EA] text-xs font-sans tabular-nums border border-black/5">
          <span className="text-[#666666] font-medium">
            Selected Tier ({currentTier.qty.toLocaleString('en-IN')} boxes):
          </span>
          <span className="font-bold text-[#111111]">
            Offset: Rs {currentTier.offset}/unit vs Digital: Rs {currentTier.digital}/unit
          </span>
        </div>
      </div>

      {/* Recommended Process Guidance */}
      <div className="mt-4 pt-4 border-t border-black/8 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#888888] block">OPTIMAL THRESHOLD</span>
          <span className="text-sm font-bold text-[#111111] tabular-nums">
            &gt; 2,500 Units (Offset)
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#888888] block">MAX SCALE SAVING</span>
          <span className="text-sm font-bold text-[#27C93F] tabular-nums">
            92.7% per-unit drop
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-[#888888] block">PRESS DIRECTION</span>
          <span className="text-sm font-bold text-[#8C6D23]">
            Manish Ajgaonkar
          </span>
        </div>
      </div>
    </div>
  );
}
