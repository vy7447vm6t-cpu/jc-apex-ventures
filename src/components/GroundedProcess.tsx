"use client";

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import {
  SvgPathAnimator,
  TechText,
  SpecularButton,
  SpotlightCard,
  MicroSlats,
  ElectricBorder,
  PatternWaves,
} from '@/components/react-bits';

interface ProcessStep {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  checklist: string[];
  actionLabel: string;
  actionHref: string;
  schematicNode: string;
  slaBadge: string;
  statutoryRef: string;
  divisions: { name: string; logo: string }[];
}

const STEPS: ProcessStep[] = [
  {
    id: 'step-01',
    num: '(01)',
    title: 'Audit & Inspect',
    subtitle: 'Statutory Feasibility',
    summary:
      'We begin on site. Every utility sanction, solar pergola footprint, or commercial fit-out starts with physical measurement, shadow mapping, and historical DISCOM ledger audits.',
    checklist: [
      'DISCOM historical billing and tariff category verification',
      'Meter room physical layout and electrical safety audit',
      'Structural terrace usable footprint and wind/shadow analysis',
    ],
    actionLabel: 'Schedule Site Audit',
    actionHref: '#calculators',
    schematicNode: 'NODE 01 · SITE & METER AUDIT',
    slaBadge: '48 to 72 Hours Turnaround',
    statutoryRef: 'IS 3043 / MERC Tariff Audit',
    divisions: [
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
      { name: 'Solis', logo: '/images/logos/solis-official.png' },
      { name: 'Tvasta', logo: '/images/logos/tvasta-dark.png' },
    ],
  },
  {
    id: 'step-02',
    num: '(02)',
    title: 'Sanction & File',
    subtitle: 'Engineering & Statutory Dossier',
    summary:
      'Engineered accuracy before government submission. Single-line diagrams, protection relay coordination, and DPR filings prepared strictly to MERC and PWD Electrical Inspectorate codes.',
    checklist: [
      'Single-Line Diagrams (SLD) and short-circuit load calculations',
      'DISCOM portal filing and CGRF / MERC statutory dossiers',
      'Chief Electrical Inspector (PWD) safety drawings and clearances',
    ],
    actionLabel: 'Explore Disciplines',
    actionHref: '#divisions',
    schematicNode: 'NODE 02 · SLD & STATUTORY FILING',
    slaBadge: '7 to 21 Business Days',
    statutoryRef: 'CEA Safety Regulations 2023',
    divisions: [
      { name: 'Sanyog', logo: '/images/logos/sanyog-official.png' },
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
      { name: 'Agrim', logo: '/images/logos/agrim-dark.png' },
    ],
  },
  {
    id: 'step-03',
    num: '(03)',
    title: 'Commission & Handover',
    subtitle: 'Physical Energization',
    summary:
      'We remain accountable through physical commissioning. Earth-resistance verification, bi-directional net-meter synchronization, and final charging permission with full as-built dossiers.',
    checklist: [
      'PWD Electrical Inspectorate site testing and charging clearance',
      'Bi-directional net-meter synchronization with parent utility grid',
      'As-built CAD drawings, warranty certificates, and compliance handover',
    ],
    actionLabel: 'Contact Engineering Desk',
    actionHref: '#contact',
    schematicNode: 'NODE 03 · GRID SYNCHRONIZATION',
    slaBadge: 'Zero-Defect Energization',
    statutoryRef: 'PWD CEI Charging Permission',
    divisions: [
      { name: 'Solis', logo: '/images/logos/solis-official.png' },
      { name: 'Grid Apex', logo: '/images/logos/grid-apex-official.png' },
      { name: 'Tvasta', logo: '/images/logos/tvasta-dark.png' },
    ],
  },
];

export default function GroundedProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  const currentStepData = STEPS[activeStep] || STEPS[0];

  return (
    <section
      id="process"
      className="process-section relative overflow-hidden"
      style={{
        backgroundColor: '#F8F6F0',
        padding: 'clamp(80px, 9.5vh, 116px) 24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
        scrollMarginTop: '88px',
        position: 'relative',
      }}
    >
      {/* Background WebGL PatternWaves Contour Layer (Architectural CAD Line Dynamics) */}
      <div
        className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
        style={{ opacity: 0.10 }}
        aria-hidden="true"
      >
        <PatternWaves
          preset="lines"
          color="#8C733E"
          backgroundColor="transparent"
          opacity={0.10}
          fade="edges"
          fadeSize={0.6}
          speed={0.2}
          depth={0.6}
          spacing={12}
          interactive
          cursorSize={60}
          cursorStrength={0.4}
          intro
        />
      </div>

      {/* Soft Vignette Scrim ensuring crystal-clear typographic contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 95% 85% at 50% 25%, rgba(248, 246, 240, 0.72) 0%, rgba(244, 241, 234, 0.86) 60%, rgba(238, 234, 224, 0.96) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Background Architectural MicroSlats CAD Louvers matching Hero 24-slat grid */}
      <MicroSlats count={24} color="#8C733E" opacity={0.06} zIndex={1} showTicks={true} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow Label with JetBrains Mono Badge Styling */}
        <div className="eye-brow-container" style={{ marginBottom: '14px' }}>
          <span
            className="text-eye-brow"
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
              fontSize: '0.74rem',
              fontWeight: 650,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#8C733E',
              display: 'inline-block',
            }}
          >
            [<TechText text="06 / ENGINEERING PROTOCOL" scrambleSpeed={24} maxScrambles={5} triggerOnHover={true} />]
          </span>
        </div>

        {/* Section Headline & Subtitle */}
        <div style={{ maxWidth: '980px', marginBottom: '26px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            We do not rely on shortcuts. Every sanction and installation follows a disciplined three-stage engineering protocol.
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.96rem, 1.15vw, 1.05rem)',
              color: '#555555',
              lineHeight: 1.62,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 350,
              maxWidth: '820px',
            }}
          >
            Clear milestones, direct utility accountability, and zero paperwork ambiguity from initial site audit to final grid energization.
          </p>
        </div>

        {/* Live Animated Single-Line CAD Busbar Schematic Console (Desktop & Tablet) */}
        <div
          className="hidden md:block"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(194, 159, 83, 0.35)',
            padding: '16px 20px 14px 20px',
            marginBottom: '22px',
            boxShadow: '0 12px 36px -10px rgba(194, 159, 83, 0.12), 0 4px 14px rgba(0, 0, 0, 0.03)',
            position: 'relative',
          }}
        >
          {/* Console Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  backgroundColor: '#111111',
                  border: '1px solid rgba(194, 159, 83, 0.55)',
                  color: '#C29F53',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '9999px',
                    backgroundColor: '#C29F53',
                    boxShadow: '0 0 8px #C29F53',
                  }}
                />
                SLD BUSBAR SYNCHRONIZATION
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.70rem',
                  color: '#666666',
                  fontWeight: 500,
                }}
              >
                MERC · CEA 2023 · PWD Electrical Inspectorate
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.66rem',
                  fontWeight: 650,
                  letterSpacing: '0.06em',
                  color: '#8C733E',
                  textTransform: 'uppercase',
                }}
              >
                Active Sequence:
              </span>
              <span
                style={{
                  backgroundColor: '#F4F1EA',
                  color: '#111111',
                  fontWeight: 700,
                  padding: '2px 9px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(194, 159, 83, 0.35)',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                }}
              >
                0{activeStep + 1} / 03
              </span>
              <span
                style={{
                  backgroundColor: '#F4F1EA',
                  color: '#8C733E',
                  fontWeight: 700,
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(194, 159, 83, 0.30)',
                  fontSize: '0.66rem',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                ⏱ {currentStepData.slaBadge}
              </span>
            </div>
          </div>

          {/* Symmetrical 3-Column Node Switcher Aligned Directly with Stage Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '8px',
            }}
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={`node-${step.id}`}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    background: isActive ? '#111111' : 'rgba(244, 241, 234, 0.85)',
                    border: isActive ? '1px solid rgba(194, 159, 83, 0.85)' : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '9999px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 6px 20px -2px rgba(194, 159, 83, 0.35)' : 'none',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  aria-pressed={isActive}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#C29F53' : '#999999',
                      boxShadow: isActive ? '0 0 10px rgba(194, 159, 83, 0.95)' : 'none',
                      flexShrink: 0,
                      transition: 'all 0.25s ease',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.72rem',
                      fontWeight: isActive ? 700 : 600,
                      letterSpacing: '0.06em',
                      color: isActive ? '#FFFFFF' : '#444444',
                      transition: 'color 0.25s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <TechText text={step.schematicNode} scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Symmetrical Single-Line Busbar CAD Waveform Aligned to Columns (Centers: 193, 600, 1007) */}
          <div style={{ width: '100%', height: '38px', position: 'relative', overflow: 'hidden' }}>
            <svg
              width="100%"
              height="38"
              viewBox="0 0 1200 38"
              preserveAspectRatio="none"
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            >
              {/* Main Transmission Busbar Line */}
              <line
                x1="40"
                y1="16"
                x2="1160"
                y2="16"
                stroke="rgba(194, 159, 83, 0.25)"
                strokeWidth={1.8}
                strokeDasharray="5 5"
              />

              {/* Node 1 Feeder Drop & Grounding (X=193) */}
              <circle cx="193" cy="16" r="4.5" fill="#FFFFFF" stroke="rgba(194, 159, 83, 0.7)" strokeWidth="1.5" />
              <line x1="193" y1="16" x2="193" y2="30" stroke="rgba(194, 159, 83, 0.45)" strokeWidth="1.5" />
              <line x1="187" y1="30" x2="199" y2="30" stroke="rgba(194, 159, 83, 0.55)" strokeWidth="1.5" />
              <line x1="189" y1="33" x2="197" y2="33" stroke="rgba(194, 159, 83, 0.4)" strokeWidth="1.2" />
              <line x1="191" y1="36" x2="195" y2="36" stroke="rgba(194, 159, 83, 0.25)" strokeWidth="1" />

              {/* Node 2 Feeder Drop & Grounding (X=600) */}
              <circle cx="600" cy="16" r="4.5" fill="#FFFFFF" stroke="rgba(194, 159, 83, 0.7)" strokeWidth="1.5" />
              <line x1="600" y1="16" x2="600" y2="30" stroke="rgba(194, 159, 83, 0.45)" strokeWidth="1.5" />
              <line x1="594" y1="30" x2="606" y2="30" stroke="rgba(194, 159, 83, 0.55)" strokeWidth="1.5" />
              <line x1="596" y1="33" x2="604" y2="33" stroke="rgba(194, 159, 83, 0.4)" strokeWidth="1.2" />
              <line x1="598" y1="36" x2="602" y2="36" stroke="rgba(194, 159, 83, 0.25)" strokeWidth="1" />

              {/* Node 3 Feeder Drop & Grounding (X=1007) */}
              <circle cx="1007" cy="16" r="4.5" fill="#FFFFFF" stroke="rgba(194, 159, 83, 0.7)" strokeWidth="1.5" />
              <line x1="1007" y1="16" x2="1007" y2="30" stroke="rgba(194, 159, 83, 0.45)" strokeWidth="1.5" />
              <line x1="1001" y1="30" x2="1013" y2="30" stroke="rgba(194, 159, 83, 0.55)" strokeWidth="1.5" />
              <line x1="1003" y1="33" x2="1011" y2="33" stroke="rgba(194, 159, 83, 0.4)" strokeWidth="1.2" />
              <line x1="1005" y1="36" x2="1009" y2="36" stroke="rgba(194, 159, 83, 0.25)" strokeWidth="1" />
            </svg>

            {/* Dynamic Active Energy Current Pulse via SvgPathAnimator */}
            <SvgPathAnimator
              key={`cad-path-${activeStep}`}
              d={
                activeStep === 0
                  ? "M 40 16 L 175 16 L 184 8 L 193 24 L 202 16 L 193 16 L 193 30"
                  : activeStep === 1
                  ? "M 40 16 L 193 16 L 582 16 L 591 8 L 600 24 L 609 16 L 600 16 L 600 30"
                  : "M 40 16 L 193 16 L 600 16 L 989 16 L 998 8 L 1007 24 L 1016 16 L 1007 16 L 1007 30 L 1016 16 L 1160 16"
              }
              width={1200}
              height={38}
              viewBox="0 0 1200 38"
              strokeColor="#C29F53"
              strokeWidth={2.4}
              duration={1400}
              className="w-full h-[38px] relative z-10 pointer-events-none"
            />
          </div>

          {/* Live Telemetry Readout Console */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '6px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.72rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  color: '#8C733E',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                  fontSize: '0.66rem',
                }}
              >
                Active Stage Telemetry:
              </span>
              <span style={{ color: '#111111', fontWeight: 650, fontSize: '0.78rem' }}>
                {currentStepData.num} {currentStepData.title}
              </span>
              <span style={{ color: '#999999' }}>·</span>
              <span
                style={{
                  color: '#555555',
                  fontWeight: 600,
                  backgroundColor: '#F4F1EA',
                  padding: '2px 8px',
                  borderRadius: '5px',
                  border: '1px solid rgba(194, 159, 83, 0.25)',
                  fontSize: '0.68rem',
                }}
              >
                {currentStepData.statutoryRef}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#111111',
                  color: '#FFFFFF',
                  fontWeight: 650,
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(194, 159, 83, 0.65)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '9999px',
                    backgroundColor: '#C29F53',
                    boxShadow: '0 0 8px rgba(194, 159, 83, 0.95)',
                  }}
                />
                Zero-Defect Energization
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Editorial Protocol Cards on Desktop with ElectricBorder & Official Division Logos */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                style={{
                  height: '100%',
                  transform: isActive ? 'translateY(-6px)' : 'none',
                  transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <ElectricBorder
                  active={isActive}
                  color="#C29F53"
                  borderRadius="20px"
                  innerBg="transparent"
                  className="h-full"
                >
                  <SpotlightCard
                    theme="light"
                    spotlightColor={isActive ? 'rgba(194, 159, 83, 0.20)' : 'rgba(194, 159, 83, 0.06)'}
                    borderColor={isActive ? 'rgba(194, 159, 83, 0.85)' : 'rgba(0, 0, 0, 0.08)'}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '18px',
                      border: isActive ? '1px solid rgba(194, 159, 83, 0.85)' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: isActive
                        ? '0 18px 44px -10px rgba(194, 159, 83, 0.22), 0 4px 14px rgba(0, 0, 0, 0.04)'
                        : '0 4px 16px rgba(0, 0, 0, 0.03)',
                      cursor: 'pointer',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    contentStyle={{
                      justifyContent: 'space-between',
                      height: '100%',
                      padding: '22px 20px 18px 20px',
                    }}
                  >
                    {/* Card Top Gold Hairline Accent */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2.5px',
                        background: isActive
                          ? 'linear-gradient(90deg, #C29F53 0%, rgba(194, 159, 83, 0.85) 50%, rgba(194, 159, 83, 0.2) 100%)'
                          : 'linear-gradient(90deg, rgba(194, 159, 83, 0.35) 0%, rgba(194, 159, 83, 0.08) 100%)',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />

                    <div>
                      {/* Header row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                          marginBottom: '14px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                            fontSize: '1.9rem',
                            fontWeight: 400,
                            color: '#8C733E',
                            lineHeight: 1,
                          }}
                        >
                          <TechText text={step.num} scrambleSpeed={24} maxScrambles={5} triggerOnHover={true} />
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {isActive && (
                            <span
                              style={{
                                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                                fontSize: '0.60rem',
                                fontWeight: 700,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                color: '#FFFFFF',
                                backgroundColor: '#111111',
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                border: '1px solid rgba(194, 159, 83, 0.65)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              <span
                                style={{
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '9999px',
                                  backgroundColor: '#C29F53',
                                  boxShadow: '0 0 6px #C29F53',
                                }}
                              />
                              ✦ ACTIVE STAGE
                            </span>
                          )}
                          <span
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.64rem',
                              fontWeight: 650,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              color: isActive ? '#8C733E' : '#666666',
                              backgroundColor: isActive ? '#F4F1EA' : '#F9F9F9',
                              padding: '3px 9px',
                              borderRadius: '9999px',
                              border: isActive ? '1px solid rgba(194, 159, 83, 0.35)' : '1px solid rgba(0, 0, 0, 0.08)',
                            }}
                          >
                            {step.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Title & Summary */}
                      <h3
                        style={{
                          fontSize: '1.58rem',
                          lineHeight: 1.2,
                          fontWeight: 400,
                          letterSpacing: '-0.015em',
                          color: '#111111',
                          margin: '0 0 8px 0',
                          fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.86rem',
                          color: '#555555',
                          lineHeight: 1.56,
                          margin: '0 0 14px 0',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        {step.summary}
                      </p>

                      {/* Coordinating Division Logos Strip */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '7px 11px',
                          borderRadius: '10px',
                          backgroundColor: '#F8F6F0',
                          border: '1px solid rgba(194, 159, 83, 0.22)',
                          marginBottom: '14px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: '#777777',
                            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                          }}
                        >
                          Practice Desks
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {step.divisions.map((div, dIdx) => (
                            <img
                              key={dIdx}
                              src={div.logo}
                              alt={div.name}
                              style={{
                                height: '17px',
                                width: 'auto',
                                maxWidth: '54px',
                                objectFit: 'contain',
                                display: 'block',
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Checklist */}
                      <div
                        style={{
                          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                          paddingTop: '12px',
                          marginBottom: '16px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '9px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.66rem',
                              fontWeight: 650,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              color: '#8C733E',
                            }}
                          >
                            Deliverable Checklist
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.64rem',
                              fontWeight: 600,
                              color: '#666666',
                            }}
                          >
                            {step.slaBadge}
                          </span>
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          {step.checklist.map((item, cIdx) => (
                            <li
                              key={cIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontSize: '0.82rem',
                                lineHeight: 1.45,
                                color: '#333333',
                                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              }}
                            >
                              <CheckCircle2
                                size={14}
                                color="#C29F53"
                                style={{ flexShrink: 0, marginTop: '2px' }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* SpecularButton Trigger */}
                    <SpecularButton
                      href={step.actionHref}
                      variant={isActive ? 'gold' : 'dark'}
                      icon={<ArrowUpRight size={14} />}
                      className="w-full justify-between !py-2.5 !px-4 !text-[0.76rem] font-semibold"
                    >
                      {step.actionLabel}
                    </SpecularButton>
                  </SpotlightCard>
                </ElectricBorder>
              </div>
            );
          })}
        </div>

        {/* Tablet & Mobile High-Fidelity Interactive Experience */}
        <div className="block lg:hidden">
          {/* Mobile Quick Node Switcher Strip */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '10px',
              marginBottom: '12px',
              scrollbarWidth: 'none',
            }}
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={`m-node-${step.id}`}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: isActive ? '#111111' : '#FFFFFF',
                    color: isActive ? '#C29F53' : '#444444',
                    border: isActive ? '1px solid rgba(194, 159, 83, 0.75)' : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '9999px',
                    padding: '6px 13px',
                    fontSize: '0.70rem',
                    fontWeight: 650,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 14px rgba(194, 159, 83, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#C29F53' : '#999999',
                    }}
                  />
                  <span>{step.num}</span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Telemetry Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(194, 159, 83, 0.28)',
              borderRadius: '12px',
              padding: '8px 12px',
              marginBottom: '14px',
              fontSize: '0.70rem',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                  color: '#8C733E',
                  fontWeight: 700,
                }}
              >
                STAGE 0{activeStep + 1}/03
              </span>
              <span style={{ color: '#999999' }}>·</span>
              <span style={{ color: '#444444', fontWeight: 600 }}>{currentStepData.statutoryRef}</span>
            </div>
            <span
              style={{
                color: '#8C733E',
                fontWeight: 650,
                fontSize: '0.66rem',
                backgroundColor: '#F4F1EA',
                padding: '2px 8px',
                borderRadius: '9999px',
              }}
            >
              ⏱ {currentStepData.slaBadge}
            </span>
          </div>

          {/* If showAllMobile is true, render all 3 cards stacked; otherwise show current active card */}
          {showAllMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {STEPS.map((step, idx) => (
                <div
                  key={`m-card-${step.id}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    border: activeStep === idx ? '1px solid rgba(194, 159, 83, 0.85)' : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: activeStep === idx ? '0 12px 32px -8px rgba(194, 159, 83, 0.22)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      background: activeStep === idx
                        ? 'linear-gradient(90deg, #C29F53 0%, rgba(194, 159, 83, 0.85) 50%, rgba(194, 159, 83, 0.2) 100%)'
                        : 'linear-gradient(90deg, rgba(194, 159, 83, 0.35) 0%, rgba(194, 159, 83, 0.08) 100%)',
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        fontSize: '1.8rem',
                        color: '#8C733E',
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 650,
                        textTransform: 'uppercase',
                        color: '#8C733E',
                        backgroundColor: '#F4F1EA',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(194, 159, 83, 0.3)',
                      }}
                    >
                      {step.subtitle}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      color: '#111111',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.84rem',
                      color: '#555555',
                      lineHeight: 1.55,
                      margin: '0 0 12px 0',
                    }}
                  >
                    {step.summary}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#F8F6F0',
                      border: '1px solid rgba(194, 159, 83, 0.2)',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ fontSize: '0.60rem', fontWeight: 700, textTransform: 'uppercase', color: '#777777' }}>
                      Practice Desks
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {step.divisions.map((div, dIdx) => (
                        <img
                          key={dIdx}
                          src={div.logo}
                          alt={div.name}
                          style={{ height: '16px', maxWidth: '50px', objectFit: 'contain' }}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '10px', marginBottom: '14px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {step.checklist.map((item, cIdx) => (
                        <li
                          key={cIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '0.80rem',
                            lineHeight: 1.4,
                            color: '#333333',
                          }}
                        >
                          <CheckCircle2 size={13} color="#C29F53" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <SpecularButton
                    href={step.actionHref}
                    variant={activeStep === idx ? 'gold' : 'dark'}
                    icon={<ArrowUpRight size={14} />}
                    className="w-full justify-between !py-2.5 !px-4 !text-[0.76rem] font-semibold"
                  >
                    {step.actionLabel}
                  </SpecularButton>
                </div>
              ))}
            </div>
          ) : (
            /* Single Active Card Carousel Mode */
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid rgba(194, 159, 83, 0.85)',
                boxShadow: '0 16px 36px -10px rgba(194, 159, 83, 0.22), 0 4px 14px rgba(0, 0, 0, 0.04)',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2.5px',
                  background: 'linear-gradient(90deg, #C29F53 0%, rgba(194, 159, 83, 0.85) 50%, rgba(194, 159, 83, 0.2) 100%)',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontSize: '1.85rem',
                    color: '#8C733E',
                  }}
                >
                  {currentStepData.num}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      backgroundColor: '#111111',
                      padding: '3px 7px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(194, 159, 83, 0.65)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '9999px',
                        backgroundColor: '#C29F53',
                      }}
                    />
                    ✦ ACTIVE
                  </span>
                  <span
                    style={{
                      fontSize: '0.64rem',
                      fontWeight: 650,
                      textTransform: 'uppercase',
                      color: '#8C733E',
                      backgroundColor: '#F4F1EA',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(194, 159, 83, 0.3)',
                    }}
                  >
                    {currentStepData.subtitle}
                  </span>
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  fontSize: '1.55rem',
                  fontWeight: 400,
                  color: '#111111',
                  margin: '0 0 6px 0',
                }}
              >
                {currentStepData.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.85rem',
                  color: '#555555',
                  lineHeight: 1.55,
                  margin: '0 0 12px 0',
                }}
              >
                {currentStepData.summary}
              </p>

              {/* Coordinating Division Logos Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 11px',
                  borderRadius: '9px',
                  backgroundColor: '#F8F6F0',
                  border: '1px solid rgba(194, 159, 83, 0.22)',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.60rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#777777',
                    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace, sans-serif)',
                  }}
                >
                  Practice Desks
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {currentStepData.divisions.map((div, dIdx) => (
                    <img
                      key={dIdx}
                      src={div.logo}
                      alt={div.name}
                      style={{ height: '16px', maxWidth: '52px', objectFit: 'contain' }}
                    />
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '10px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.64rem', fontWeight: 650, textTransform: 'uppercase', color: '#8C733E' }}>
                    Deliverable Checklist
                  </span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 600, color: '#666666' }}>
                    {currentStepData.slaBadge}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {currentStepData.checklist.map((item, cIdx) => (
                    <li
                      key={cIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.80rem',
                        lineHeight: 1.4,
                        color: '#333333',
                      }}
                    >
                      <CheckCircle2 size={13} color="#C29F53" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SpecularButton Trigger */}
              <SpecularButton
                href={currentStepData.actionHref}
                variant="gold"
                icon={<ArrowUpRight size={14} />}
                className="w-full justify-between !py-2.5 !px-4 !text-[0.76rem] font-semibold"
              >
                {currentStepData.actionLabel}
              </SpecularButton>
            </div>
          )}

          {/* Mobile Step Pagination & View All Toggle Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '12px',
              paddingTop: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  fontSize: '0.70rem',
                  fontWeight: 600,
                  color: activeStep === 0 ? '#BBBBBB' : '#333333',
                  cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
                disabled={activeStep === STEPS.length - 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  fontSize: '0.70rem',
                  fontWeight: 600,
                  color: activeStep === STEPS.length - 1 ? '#BBBBBB' : '#333333',
                  cursor: activeStep === STEPS.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Toggle Expand All */}
            <button
              type="button"
              onClick={() => setShowAllMobile((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: showAllMobile ? '#111111' : '#FFFFFF',
                color: showAllMobile ? '#C29F53' : '#666666',
                border: showAllMobile ? '1px solid rgba(194, 159, 83, 0.65)' : '1px solid rgba(0, 0, 0, 0.08)',
                fontSize: '0.68rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Layers size={13} />
              <span>{showAllMobile ? 'Show Carousel' : 'View All (03)'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
