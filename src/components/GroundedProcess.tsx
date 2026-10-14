"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ProcessStep {
  num: string;
  title: string;
  summary: string;
  checklist: string[];
  actionLabel: string;
  actionHref: string;
}

const STEPS: ProcessStep[] = [
  {
    num: '(01)',
    title: 'Audit & Inspect',
    summary:
      'We begin on site. Every utility sanction, solar footprint, or commercial interior starts with physical measurement and statutory bill audits.',
    checklist: [
      'DISCOM historical billing and tariff category verification',
      'Meter room physical layout and electrical safety audit',
      'Structural terrace usable footprint and shadow analysis',
    ],
    actionLabel: 'Schedule Site Audit',
    actionHref: '#contact',
  },
  {
    num: '(02)',
    title: 'Technical Documentation & Sizing',
    summary:
      'Engineered accuracy before government submission. Load sizing, single-line diagrams, and DPR preparation tailored to statutory codes.',
    checklist: [
      'Single-Line Diagrams (SLD) and capacity calculations',
      'DISCOM portal filing and formal sanction dossiers',
      'Electrical Inspectorate statutory drawings and clearances',
    ],
    actionLabel: 'Explore Disciplines',
    actionHref: '#divisions',
  },
  {
    num: '(03)',
    title: 'Commissioning & Handover',
    summary:
      'We stay accountable through physical commissioning. Verification, meter testing, and final energization with full documentation.',
    checklist: [
      'PWD Electrical Inspectorate testing and inspection',
      'Bidirectional net-meter synchronization with utility grid',
      'As-built drawings, warranties, and compliance records handover',
    ],
    actionLabel: 'Contact Engineering Desk',
    actionHref: 'tel:+917021112664',
  },
];

import { ScrollStack } from '@/components/react-bits';

const STACK_CARDS = STEPS.map((s) => ({
  id: s.num,
  stepNumber: s.num,
  title: s.title,
  subtitle: 'Protocol Milestone',
  description: s.summary,
  badge: 'Statutory Protocol',
  specs: s.checklist,
}));

export default function GroundedProcess() {
  return (
    <section className="process-section">
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span className="text-eye-brow">[our process]</span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '980px', marginBottom: '40px' }}>
          <h3
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            We do not rely on shortcuts. Every sanction and installation follows a disciplined 3-step engineering protocol.
          </h3>
          <p
            style={{
              fontSize: '1.08rem',
              color: '#666666',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Clear milestones, direct utility accountability, and zero paperwork ambiguity from initial audit to final energization.
          </p>
        </div>

        {/* ScrollStack Sticky 3-Step Protocol Cards */}
        <ScrollStack cards={STACK_CARDS} />
      </div>
    </section>
  );
}
