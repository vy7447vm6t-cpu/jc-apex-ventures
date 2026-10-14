"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  checklist: string[];
  actionLabel: string;
  actionHref: string;
}

const STEPS: ProcessStep[] = [
  {
    num: '(01)',
    title: 'Audit & Inspect',
    subtitle: 'Statutory Feasibility',
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
    subtitle: 'Engineering Compliance',
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
    subtitle: 'Physical Energization',
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

export default function GroundedProcess() {
  return (
    <section className="process-section" style={{ backgroundColor: 'var(--color-grounded-bg)', padding: '100px 24px', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        {/* Eyebrow Label */}
        <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
          <span className="text-eye-brow">[our process]</span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '980px', marginBottom: '50px' }}>
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

        {/* 3-Column Editorial Protocol Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px 30px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#C29F53',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {step.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#777777',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                    }}
                  >
                    {step.subtitle}
                  </span>
                </div>

                {/* Title & Summary */}
                <h4
                  style={{
                    fontSize: '1.45rem',
                    lineHeight: 1.25,
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    color: '#111111',
                    margin: '0 0 14px 0',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: '#555555',
                    lineHeight: 1.65,
                    margin: '0 0 24px 0',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  {step.summary}
                </p>

                {/* Checklist */}
                <div
                  style={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    paddingTop: '20px',
                    marginBottom: '28px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#888888',
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
                    {step.checklist.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.86rem',
                          lineHeight: 1.5,
                          color: '#444444',
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

              {/* Action Button */}
              <Link
                href={step.actionHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-grounded-stone)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#111111',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <span>{step.actionLabel}</span>
                <ArrowUpRight size={15} color="#C29F53" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
