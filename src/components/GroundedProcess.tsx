"use client";

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  SvgPathAnimator,
  ScrollStack,
  TechText,
  SpecularButton,
  SpotlightCard,
  MicroSlats,
} from '@/components/react-bits';
import type { ScrollStackCard } from '@/components/react-bits';

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
    actionHref: 'tel:+917021112664',
    schematicNode: 'NODE 03 · GRID SYNCHRONIZATION',
  },
];

export default function GroundedProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stackCards: ScrollStackCard[] = STEPS.map((step) => ({
    id: step.id,
    stepNumber: step.num,
    title: step.title,
    subtitle: step.subtitle,
    description: step.summary,
    badge: step.schematicNode,
    specs: step.checklist,
  }));

  return (
    <section
      id="process"
      className="process-section relative overflow-hidden"
      style={{
        backgroundColor: '#F4F1EA',
        padding: 'clamp(96px, 12vh, 136px) 24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
        scrollMarginTop: '104px',
      }}
    >
      <MicroSlats count={24} color="#8C733E" opacity={0.08} zIndex={1} showTicks={true} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '18px' }}>
          <span
            className="text-eye-brow"
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.74rem',
              fontWeight: 650,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8C733E',
              display: 'inline-block',
            }}
          >
            [<TechText text="06 / ENGINEERING PROTOCOL" scrambleSpeed={24} maxScrambles={5} triggerOnHover={true} />]
          </span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '980px', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 18px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            We do not rely on shortcuts. Every sanction and installation follows a disciplined three-stage engineering protocol.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
              color: '#555555',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 350,
            }}
          >
            Clear milestones, direct utility accountability, and zero paperwork ambiguity from initial site audit to final grid energization.
          </p>
        </div>

        {/* Live Animated Single-Line CAD Busbar Schematic Connector (Desktop & Tablet) */}
        <div
          className="hidden md:block"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            border: '1px solid rgba(194, 159, 83, 0.32)',
            padding: '20px 28px',
            marginBottom: '36px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
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
                    gap: '8px',
                    background: isActive ? 'rgba(194, 159, 83, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(194, 159, 83, 0.4)' : '1px solid transparent',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  aria-pressed={isActive}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#C29F53' : '#AAAAAA',
                      boxShadow: isActive ? '0 0 10px rgba(194, 159, 83, 0.9)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      fontSize: '0.72rem',
                      fontWeight: isActive ? 700 : 550,
                      letterSpacing: '0.06em',
                      color: isActive ? '#8C733E' : '#555555',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    <TechText text={step.schematicNode} scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <svg
              width="100%"
              height="40"
              viewBox="0 0 1200 40"
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            >
              <path
                d="M 10 20 L 380 20 L 395 8 L 410 32 L 425 20 L 770 20 L 785 8 L 800 32 L 815 20 L 1190 20"
                stroke="rgba(194, 159, 83, 0.2)"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 4"
              />
            </svg>
            <SvgPathAnimator
              key={`cad-path-${activeStep}`}
              d={
                activeStep === 0
                  ? "M 10 20 L 380 20 L 395 8 L 410 32 L 425 20"
                  : activeStep === 1
                  ? "M 10 20 L 380 20 L 395 8 L 410 32 L 425 20 L 770 20 L 785 8 L 800 32 L 815 20"
                  : "M 10 20 L 380 20 L 395 8 L 410 32 L 425 20 L 770 20 L 785 8 L 800 32 L 815 20 L 1190 20"
              }
              width={1200}
              height={40}
              viewBox="0 0 1200 40"
              strokeColor="#C29F53"
              strokeWidth={2.4}
              duration={1800}
              className="w-full h-10 relative z-10"
            />
          </div>
        </div>

        {/* 3-Column Editorial Protocol Cards on Desktop */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                style={{ height: '100%' }}
              >
                <SpotlightCard
                  theme="light"
                  spotlightColor={isActive ? 'rgba(194, 159, 83, 0.22)' : 'rgba(194, 159, 83, 0.08)'}
                  borderColor={isActive ? 'rgba(194, 159, 83, 0.65)' : 'rgba(0, 0, 0, 0.08)'}
                  style={{
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.98)' : '#FFFFFF',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    border: isActive ? '1.5px solid rgba(194, 159, 83, 0.65)' : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: isActive
                      ? '0 20px 48px -12px rgba(194, 159, 83, 0.22), 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95)'
                      : '0 4px 16px rgba(0, 0, 0, 0.03)',
                    transform: isActive ? 'translateY(-6px)' : 'none',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease',
                    cursor: 'pointer',
                  }}
                  contentStyle={{
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div>
                    {/* Header row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '18px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                        marginBottom: '18px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                          fontSize: '1.8rem',
                          fontWeight: 400,
                          color: '#8C733E',
                          lineHeight: 1,
                        }}
                      >
                        <TechText text={step.num} scrambleSpeed={24} maxScrambles={5} triggerOnHover={true} />
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isActive && (
                          <span
                            style={{
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              color: '#8C733E',
                              backgroundColor: 'rgba(194, 159, 83, 0.16)',
                              padding: '3px 8px',
                              borderRadius: '9999px',
                            }}
                          >
                            ✦ ACTIVE
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '0.68rem',
                            fontWeight: 650,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: isActive ? '#8C733E' : '#666666',
                            backgroundColor: isActive ? '#F4F1EA' : '#F9F9F9',
                            padding: '4px 10px',
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
                        fontSize: '1.65rem',
                        lineHeight: 1.2,
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        color: '#111111',
                        margin: '0 0 12px 0',
                        fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: '#555555',
                        lineHeight: 1.65,
                        margin: '0 0 22px 0',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      }}
                    >
                      {step.summary}
                    </p>

                    {/* Checklist */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                        paddingTop: '18px',
                        marginBottom: '24px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.7rem',
                          fontWeight: 650,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#8C733E',
                          marginBottom: '12px',
                        }}
                      >
                        Deliverable Checklist
                      </div>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        {step.checklist.map((item, cIdx) => (
                          <li
                            key={cIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              fontSize: '0.86rem',
                              lineHeight: 1.5,
                              color: '#333333',
                              fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            }}
                          >
                            <CheckCircle2
                              size={15}
                              color="#C29F53"
                              style={{ flexShrink: 0, marginTop: '3px' }}
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
                    className="w-full justify-between !py-2.5 !px-4 !text-[0.76rem]"
                  >
                    {step.actionLabel}
                  </SpecularButton>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Tablet & Mobile Sticky ScrollStack Progression */}
        <div className="block lg:hidden">
          <ScrollStack cards={stackCards} className="!py-4" />
        </div>
      </div>
    </section>
  );
}
