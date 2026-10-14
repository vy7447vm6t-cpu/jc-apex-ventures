"use client";

import React, { useState } from 'react';

interface SolarGenerationCurveProps {
  capacityKw?: number;
  className?: string;
}

export default function SolarGenerationCurve({
  capacityKw = 55.55,
  className = '',
}: SolarGenerationCurveProps) {
  const [activeSeason, setActiveSeason] = useState<'summer' | 'winter' | 'monsoon'>('summer');
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // Hourly irradiance profiles (6 AM to 7 PM)
  const hourlyData = {
    summer: [0, 0.15, 0.45, 0.75, 0.95, 1.0, 0.92, 0.78, 0.52, 0.22, 0.05, 0],
    winter: [0, 0.08, 0.32, 0.62, 0.82, 0.88, 0.80, 0.65, 0.38, 0.12, 0, 0],
    monsoon: [0, 0.05, 0.20, 0.35, 0.48, 0.52, 0.45, 0.38, 0.22, 0.08, 0, 0],
  };

  const hours = [
    '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
    '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
  ];

  const currentProfile = hourlyData[activeSeason];
  const peakMultiplier = capacityKw * 0.88; // effective AC conversion

  const chartWidth = 560;
  const chartHeight = 200;
  const paddingX = 40;
  const paddingY = 30;

  const points = currentProfile.map((val, idx) => {
    const x = paddingX + (idx / (currentProfile.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - val * (chartHeight - paddingY * 2);
    return { x, y, val: (val * peakMultiplier).toFixed(1), hour: hours[idx] };
  });

  const pathD = points.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    const prev = points[idx - 1];
    const cpX = (prev.x + p.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className={`rounded-3xl border border-black/8 bg-white/80 p-6 md:p-8 backdrop-blur-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
            Bklit DataViz : Solar Dynamics
          </span>
          <h4 className="text-xl font-serif font-bold text-[#111111] mt-0.5">
            Diurnal Irradiance & Generation Curve ({capacityKw} kWp)
          </h4>
        </div>

        {/* Season selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-black/10 bg-[#F4F1EA]">
          {(['summer', 'winter', 'monsoon'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSeason(s)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium capitalize transition-all cursor-pointer ${
                activeSeason === s
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto select-none"
        >
          <defs>
            <linearGradient id="solarAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C29F53" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C29F53" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={chartWidth - paddingX}
            y2={paddingY}
            stroke="rgba(0,0,0,0.06)"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={chartHeight / 2}
            x2={chartWidth - paddingX}
            y2={chartHeight / 2}
            stroke="rgba(0,0,0,0.06)"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY}
            stroke="rgba(0,0,0,0.15)"
          />

          {/* Fill Area */}
          <path d={areaD} fill="url(#solarAreaGradient)" />

          {/* Stroke Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#C29F53"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoveredHour(idx)}
              onMouseLeave={() => setHoveredHour(null)}
              className="cursor-pointer"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredHour === idx ? 5 : 3.5}
                fill={hoveredHour === idx ? '#111111' : '#C29F53'}
                stroke="#FFFFFF"
                strokeWidth="2"
                className="transition-all duration-200"
              />
              {idx % 2 === 0 && (
                <text
                  x={p.x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-[9px] fill-[#777777] font-mono"
                >
                  {p.hour}
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* Hover summary badge */}
        {hoveredHour !== null && (
          <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-[#F4F1EA] text-xs font-mono">
            <span className="text-[#666666]">{points[hoveredHour].hour}:</span>
            <span className="font-bold text-[#111111]">
              {points[hoveredHour].val} kW instantaneous output
            </span>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 pt-4 border-t border-black/8 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[10px] font-mono text-[#888888] block">PEAK OUTPUT</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            {(peakMultiplier * (activeSeason === 'summer' ? 1.0 : activeSeason === 'winter' ? 0.88 : 0.52)).toFixed(1)} kW
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#888888] block">DAILY HARVEST</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            {(capacityKw * (activeSeason === 'summer' ? 4.5 : activeSeason === 'winter' ? 3.8 : 2.4)).toFixed(0)} kWh
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#888888] block">ANNUAL PROJECTION</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            ~{(capacityKw * 1440).toLocaleString()} units
          </span>
        </div>
      </div>
    </div>
  );
}
