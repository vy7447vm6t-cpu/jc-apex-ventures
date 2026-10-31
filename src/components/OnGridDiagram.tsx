'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface Box {
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  /** The utility side is drawn in Ash: it is not ours. */
  muted?: boolean;
  /** The one Sun Yellow element (Solis guidelines 2.3). */
  sun?: boolean;
  step: number;
}

interface Layout {
  viewBox: string;
  boxHeight: number;
  labelSize: number;
  subSize: number;
  boxes: Box[];
  lines: { d: string; step: number }[];
}

const STEP_MS = 180;

// Same arrangement as the Solis profile (PDF), page 7.
const WIDE: Layout = {
  viewBox: '0 0 1640 450',
  boxHeight: 128,
  labelSize: 34,
  subSize: 27,
  boxes: [
    { x: 2, y: 20, w: 250, label: 'Solar array', sub: 'DC', sun: true, step: 0 },
    { x: 322, y: 20, w: 252, label: 'Inverter', sub: 'DC to AC', step: 2 },
    { x: 644, y: 20, w: 312, label: 'AC distribution', sub: 'board', step: 4 },
    { x: 644, y: 318, w: 312, label: 'Building loads', sub: 'lifts, pumps, lighting', step: 6 },
    { x: 1026, y: 20, w: 252, label: 'Net meter', sub: 'two-way', step: 6 },
    { x: 1348, y: 20, w: 290, label: 'Utility grid', sub: 'distribution utility', muted: true, step: 8 },
  ],
  lines: [
    { d: 'M252 84 H322', step: 1 },
    { d: 'M574 84 H644', step: 3 },
    { d: 'M800 148 V318', step: 5 },
    { d: 'M956 84 H1026', step: 5 },
    { d: 'M1278 84 H1348', step: 7 },
  ],
};

// Phones: the chain runs down the screen and the building loads branch off to the right.
const TALL: Layout = {
  viewBox: '0 0 400 616',
  boxHeight: 76,
  labelSize: 22,
  subSize: 17,
  boxes: [
    { x: 10, y: 10, w: 180, label: 'Solar array', sub: 'DC', sun: true, step: 0 },
    { x: 10, y: 140, w: 180, label: 'Inverter', sub: 'DC to AC', step: 2 },
    { x: 10, y: 270, w: 180, label: 'AC distribution', sub: 'board', step: 4 },
    { x: 210, y: 270, w: 180, label: 'Building loads', sub: 'lifts, pumps, lighting', step: 6 },
    { x: 10, y: 400, w: 180, label: 'Net meter', sub: 'two-way', step: 6 },
    { x: 10, y: 530, w: 180, label: 'Utility grid', sub: 'distribution utility', muted: true, step: 8 },
  ],
  lines: [
    { d: 'M100 86 V140', step: 1 },
    { d: 'M100 216 V270', step: 3 },
    { d: 'M190 308 H210', step: 5 },
    { d: 'M100 346 V400', step: 5 },
    { d: 'M100 476 V530', step: 7 },
  ],
};

function Diagram({ layout, className }: { layout: Layout; className: string }) {
  const h = layout.boxHeight;
  return (
    <svg viewBox={layout.viewBox} className={`sld ${className}`} role="img" aria-label="Typical on-grid solar connection: solar array, inverter, AC distribution board feeding the building loads, net meter, utility grid">
      {layout.lines.map((line) => (
        <path key={line.d} d={line.d} pathLength={1} className="sld-line" style={{ transitionDelay: `${line.step * STEP_MS}ms` }} />
      ))}
      {layout.boxes.map((box) => (
        <g key={box.label} className="sld-box" style={{ transitionDelay: `${box.step * STEP_MS}ms` }}>
          <rect
            x={box.x}
            y={box.y}
            width={box.w}
            height={h}
            rx={8}
            fill={box.sun ? '#FFC85A' : '#FFFFFF'}
            stroke={box.muted ? '#A6A6A6' : '#111111'}
            strokeWidth={layout.labelSize > 30 ? 3 : 2}
          />
          <text x={box.x + box.w / 2} y={box.y + h * 0.45} textAnchor="middle" className="sld-label" style={{ fontSize: layout.labelSize }}>
            {box.label}
          </text>
          <text x={box.x + box.w / 2} y={box.y + h * 0.75} textAnchor="middle" className="sld-sub" style={{ fontSize: layout.subSize }}>
            {box.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Single-line diagram of a typical on-grid plant that draws itself, box by box, as it scrolls into view. */
export default function OnGridDiagram() {
  return (
    <ScrollReveal>
      <figure style={{ margin: 0 }}>
        <Diagram layout={WIDE} className="sld-wide" />
        <Diagram layout={TALL} className="sld-tall" />
        <figcaption className="photo-caption">
          Typical arrangement. Power is used on site first; surplus is exported through the net meter. The exact layout depends on the site
          and the utility.
        </figcaption>
      </figure>
    </ScrollReveal>
  );
}
