"use client";

import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Layers, Zap, Volume2, ShieldCheck, Maximize2 } from 'lucide-react';
import { TechText, ElectricBorder } from '@/components/react-bits';

export interface CADZone {
  id: string;
  code: string;
  name: string;
  unit: string;
  area: string;
  lead: string;
  spec: string;
  status: string;
  description: string;
  rect: { x: number; y: number; w: number; h: number };
}

const CAD_ZONES: CADZone[] = [
  {
    id: 'exec-suite',
    code: 'U801-EX',
    name: 'Executive Partner Suite',
    unit: 'Unit 801 (West Wing)',
    area: '480 sq.ft',
    lead: 'Jitendra Chavan (Technical Director)',
    spec: 'Direct Utility Grid Reference Desk | MERC Law Library',
    status: 'Operational',
    description: 'Private consultative suite for high-friction utility disputes, MERC regulatory filings, and executive project sign-offs.',
    rect: { x: 40, y: 50, w: 220, h: 180 },
  },
  {
    id: 'regulatory-desk',
    code: 'U801-RG',
    name: 'Regulatory Advocacy & CGRF Desk',
    unit: 'Unit 801 (West Wing)',
    area: '340 sq.ft',
    lead: 'Sanyog Utility Practice Team',
    spec: 'Statutory Filing Depository | Tariff Recategorization Files',
    status: 'Operational',
    description: 'Dedicated workspace for petition preparation, consumer grievance documentation, and PWD electrical contractor filings.',
    rect: { x: 40, y: 250, w: 220, h: 190 },
  },
  {
    id: 'boardroom',
    code: 'CTR-BR',
    name: 'STC 52 Acoustic Boardroom',
    unit: 'Consolidated Central Hub',
    area: '420 sq.ft',
    lead: 'Executive Leadership Desk',
    spec: 'STC 52 Acoustic Isolation | Book-Matched Marble Conference Table',
    status: 'Commissioned',
    description: 'Turnkey acoustic sanctuary engineered by TVASTA with perimeter neoprene gaskets and sound-baffled ceiling for confidential consortium negotiations.',
    rect: { x: 280, y: 130, w: 240, h: 220 },
  },
  {
    id: 'cad-lab',
    code: 'U802-CD',
    name: 'Engineering Drafting & CAD Lab',
    unit: 'Unit 802 (East Wing)',
    area: '520 sq.ft',
    lead: 'Solar & Substation Engineering Fellows',
    spec: 'Triple-Screen CAD Workstations | 500 kWp PV Simulation Cluster',
    status: 'Active Simulation',
    description: 'Heavy engineering workspace running solar rooftop shadow-modeling, 33kV substation schematics, and PWD electrical compliance drawings.',
    rect: { x: 540, y: 50, w: 290, h: 180 },
  },
  {
    id: 'specimen-gallery',
    code: 'U802-SP',
    name: 'Creative Direction & Material Specimen Gallery',
    unit: 'Unit 802 (East Wing)',
    area: '380 sq.ft',
    lead: 'Manish Ajgaonkar (Creative Director)',
    spec: 'Heidelberg Offset Color Proofer | 1200 GSM Rigid Box Archive',
    status: 'Production Archive',
    description: 'Visual identity and tactile packaging prototyping studio with physical die-cuts, thermal micro-foils, and corporate brand assets.',
    rect: { x: 540, y: 250, w: 290, h: 190 },
  },
];

type LayerMode = 'architectural' | 'electrical' | 'acoustics';

export default function StudioCADViewer() {
  const [selectedZone, setSelectedZone] = useState<CADZone>(CAD_ZONES[2]);
  const [hoveredZone, setHoveredZone] = useState<CADZone | null>(null);
  const [layerMode, setLayerMode] = useState<LayerMode>('architectural');

  const activeZone = hoveredZone || selectedZone;

  return (
    <div className="w-full">
      {/* Top HUD Control Strip */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.88) 0%, rgba(13, 17, 26, 0.94) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div className="flex items-start md:items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(194, 159, 83, 0.15)',
              border: '1px solid rgba(194, 159, 83, 0.35)',
            }}
          >
            <Layers size={18} color="#C29F53" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  boxShadow: '0 0 6px #16A34A',
                  display: 'inline-block',
                }}
              />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#F5D78E]">
                CAD Architectural Blueprint // REV 4.2
              </span>
              <span className="text-[10px] text-[#8B949E] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 hidden sm:inline">
                SCALE 1:100
              </span>
            </div>
            <div className="text-xs text-[#C9D1D9] mt-0.5 font-medium">
              One International Centre, Tower 2, Units 801-802 | 8th Floor
            </div>
          </div>
        </div>

        {/* Layer Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setLayerMode('architectural')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              layerMode === 'architectural'
                ? 'bg-[#C29F53] text-[#0B0E14] shadow-xs'
                : 'text-[#8B949E] hover:text-[#FFFFFF]'
            }`}
          >
            <Maximize2 size={13} />
            <span>Layout</span>
          </button>
          <button
            type="button"
            onClick={() => setLayerMode('electrical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              layerMode === 'electrical'
                ? 'bg-[#0284C7] text-[#FFFFFF] shadow-xs'
                : 'text-[#8B949E] hover:text-[#FFFFFF]'
            }`}
          >
            <Zap size={13} />
            <span>Electrical &amp; Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setLayerMode('acoustics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              layerMode === 'acoustics'
                ? 'bg-[#D72A1B] text-[#FFFFFF] shadow-xs'
                : 'text-[#8B949E] hover:text-[#FFFFFF]'
            }`}
          >
            <Volume2 size={13} />
            <span>STC 52 Acoustics</span>
          </button>
        </div>
      </div>

      {/* Main CAD Blueprint Display wrapped in ElectricBorder */}
      <ElectricBorder
        color="#C29F53"
        glowColor="rgba(194, 159, 83, 0.35)"
        borderRadius={24}
        duration={5.2}
      >
        <div
          className="relative cad-grid p-4 md:p-8 rounded-[22px] overflow-hidden"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.12)',
            minHeight: '440px',
          }}
        >
          {/* Top Architectural Telemetry Coordinates Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 flex-wrap gap-2 text-[11px] font-mono text-[#8B949E]">
            <div className="flex items-center gap-3">
              <span className="text-[#C29F53] font-bold">COORDINATES:</span>
              <span>19.0069° N, 72.8311° E</span>
              <span className="text-white/20">|</span>
              <span>ELEV: +14.2M ASL</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#F5D78E]">MUNICIPAL JURISDICTION:</span>
              <span>MCGM G/South Ward</span>
              <span className="text-white/20">|</span>
              <span className="text-[#16A34A]">DUAL UTILITY FEEDER</span>
            </div>
          </div>

          {/* SVG CAD Drafting Canvas */}
          <div className="relative w-full aspect-[880/480] max-h-[500px]">
            <svg
              viewBox="0 0 880 480"
              className="w-full h-full select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* CAD drafting cross pattern */}
                <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(194, 159, 83, 0.08)" strokeWidth="0.8" />
                </pattern>
                {/* Acoustic hatch pattern */}
                <pattern id="acousticHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(215, 42, 27, 0.35)" strokeWidth="1.5" />
                </pattern>
                {/* Busbar dash pattern */}
                <pattern id="busbarHatch" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 0 8 L 16 8" stroke="rgba(2, 132, 199, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect x="0" y="0" width="880" height="480" fill="url(#cadGrid)" />

              {/* Outer Suite Boundary (Tower 2, Units 801-802) */}
              <rect
                x="25"
                y="35"
                width="830"
                height="420"
                rx="6"
                fill="rgba(16, 21, 32, 0.85)"
                stroke="#C29F53"
                strokeWidth="2"
                strokeDasharray="8 4"
              />

              {/* Dimension Annotations */}
              <g className="text-[10px] font-mono fill-[#8B949E]">
                <text x="440" y="24" textAnchor="middle">24.80 M [TOTAL FACADE WIDTH // SENAPATI BAPAT MARG]</text>
                <text x="12" y="245" textAnchor="middle" transform="rotate(-90 12 245)">14.50 M DEPTH</text>
                <text x="145" y="472" textAnchor="middle">UNIT 801 [WEST // 1,140 SQ.FT]</text>
                <text x="685" y="472" textAnchor="middle">UNIT 802 [EAST // 1,140 SQ.FT]</text>
              </g>

              {/* Unit Demising Division Center Line */}
              <line
                x1="400"
                y1="35"
                x2="400"
                y2="455"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Electrical Layer Overlays */}
              {layerMode === 'electrical' && (
                <g className="pointer-events-none">
                  {/* Primary 11kV Substation Busduct Feeder Path */}
                  <path
                    d="M 40 435 L 400 435 L 400 240 L 830 240"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeDasharray="6 3"
                  />
                  {/* Solar Net-Metering Telemetry Conduit */}
                  <path
                    d="M 685 50 L 685 130 L 400 130"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="400" cy="240" r="8" fill="#0284C7" />
                  <text x="415" y="244" fill="#0284C7" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    MDB-801/802 [415V 3-PHASE]
                  </text>
                  <circle cx="685" cy="50" r="6" fill="#F59E0B" />
                  <text x="700" y="54" fill="#F59E0B" fontSize="10" fontFamily="monospace">
                    ROOFTOP SOLAR FEEDER
                  </text>
                </g>
              )}

              {/* Acoustics Layer Overlays */}
              {layerMode === 'acoustics' && (
                <g className="pointer-events-none">
                  <rect
                    x="274"
                    y="124"
                    width="252"
                    height="232"
                    fill="url(#acousticHatch)"
                    rx="8"
                    stroke="#D72A1B"
                    strokeWidth="3"
                  />
                  <text x="400" y="116" fill="#D72A1B" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    [STC 52 DOUBLE-STUD ACOUSTIC ENVELOPE]
                  </text>
                </g>
              )}

              {/* Interactive Rooms / CAD Zones */}
              {CAD_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                const isHovered = hoveredZone?.id === zone.id;
                const active = isSelected || isHovered;

                return (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                    className="cursor-pointer transition-all duration-200"
                  >
                    {/* Room Floor Boundary */}
                    <rect
                      x={zone.rect.x}
                      y={zone.rect.y}
                      width={zone.rect.w}
                      height={zone.rect.h}
                      rx="6"
                      fill={
                        active
                          ? 'rgba(194, 159, 83, 0.22)'
                          : 'rgba(22, 28, 41, 0.70)'
                      }
                      stroke={
                        active
                          ? '#C29F53'
                          : 'rgba(255, 255, 255, 0.18)'
                      }
                      strokeWidth={active ? '2.5' : '1.2'}
                      filter={active ? 'drop-shadow(0 0 12px rgba(194, 159, 83, 0.45))' : 'none'}
                    />

                    {/* Room Code Badge */}
                    <rect
                      x={zone.rect.x + 10}
                      y={zone.rect.y + 10}
                      width="54"
                      height="18"
                      rx="3"
                      fill={active ? '#C29F53' : 'rgba(0, 0, 0, 0.5)'}
                    />
                    <text
                      x={zone.rect.x + 37}
                      y={zone.rect.y + 23}
                      fill={active ? '#0B0E14' : '#C29F53'}
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {zone.code}
                    </text>

                    {/* Room Name & Area */}
                    <text
                      x={zone.rect.x + 12}
                      y={zone.rect.y + 48}
                      fill={active ? '#FFFFFF' : '#E8E4DA'}
                      fontSize="12.5"
                      fontWeight="600"
                      fontFamily="var(--font-sans, Inter, sans-serif)"
                    >
                      {zone.name}
                    </text>
                    <text
                      x={zone.rect.x + 12}
                      y={zone.rect.y + 68}
                      fill={active ? '#F5D78E' : '#8B949E'}
                      fontSize="11"
                      fontFamily="monospace"
                    >
                      {zone.area}
                    </text>

                    {/* Architectural Door Swing Indicator */}
                    <path
                      d={`M ${zone.rect.x + zone.rect.w - 24} ${zone.rect.y + zone.rect.h} A 20 20 0 0 0 ${zone.rect.x + zone.rect.w} ${zone.rect.y + zone.rect.h - 24}`}
                      fill="none"
                      stroke={active ? '#C29F53' : 'rgba(255, 255, 255, 0.3)'}
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                    />

                    {/* Architectural Glazing / Windows Markings */}
                    {(zone.id === 'exec-suite' || zone.id === 'cad-lab') && (
                      <g stroke={active ? '#C29F53' : 'rgba(255, 255, 255, 0.25)'} strokeWidth="1">
                        <line x1={zone.rect.x + 20} y1={zone.rect.y + 4} x2={zone.rect.x + zone.rect.w - 20} y2={zone.rect.y + 4} />
                        <line x1={zone.rect.x + 20} y1={zone.rect.y + 7} x2={zone.rect.x + zone.rect.w - 20} y2={zone.rect.y + 7} />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Help Hint */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[11px] text-[#8B949E]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C29F53] animate-pulse" />
              <span>Click or hover any architectural zone to inspect technical specifications</span>
            </div>
            <div className="font-mono text-[#F5D78E] hidden sm:block">
              ACTIVE SELECTION: {activeZone.code} ({activeZone.name})
            </div>
          </div>
        </div>
      </ElectricBorder>

      {/* Selected Zone Inspector Panel */}
      <div
        className="mt-4 p-5 md:p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.88) 0%, rgba(13, 17, 26, 0.94) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(194, 159, 83, 0.3)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#C29F53]/20 border border-[#C29F53]/40 text-[#F5D78E] font-bold">
                {activeZone.code}
              </span>
              <span className="text-xs text-[#8B949E] font-medium">
                {activeZone.unit}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                {activeZone.status}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 400,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              {activeZone.name}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] font-mono text-[#8B949E] uppercase">Carpet Area</div>
              <div className="text-base font-bold font-mono text-[#F5D78E]">{activeZone.area}</div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all no-underline"
            >
              <MapPin size={13} color="#C29F53" />
              <span>Open in Google Maps</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#8B949E] font-mono block mb-1 uppercase tracking-wider text-[10.5px]">
              Practice Discipline &amp; Leadership
            </span>
            <div className="text-[#F0F3F6] font-semibold text-sm">
              {activeZone.lead}
            </div>
            <p className="text-[#8B949E] mt-1.5 leading-relaxed">
              {activeZone.description}
            </p>
          </div>

          <div>
            <span className="text-[#8B949E] font-mono block mb-1 uppercase tracking-wider text-[10.5px]">
              Technical Engineering Specifications
            </span>
            <div className="text-[#C9D1D9] font-mono bg-black/30 p-2.5 rounded-lg border border-white/5 leading-relaxed">
              {activeZone.spec}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
