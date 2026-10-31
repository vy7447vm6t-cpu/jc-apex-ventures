"use client";

import React from 'react';
import SectionEyebrow from './SectionEyebrow';

// Three steps in plain words. Turnaround promises and code references are left out until
// they are documented (brand guidelines 4.1 and 6).
const STEPS = [
  {
    title: 'Survey the site',
    summary: 'We start on site. We measure, inspect the meter room and read past bills before we propose anything.',
    checklist: [
      'Bills and tariff category checked',
      'Meter room and wiring inspected',
      'Terrace or floor area measured, with shade and wind noted',
    ],
  },
  {
    title: 'Design and file',
    summary: 'We prepare the drawings and calculations, then file the applications with the utility and the Electrical Inspectorate.',
    checklist: [
      'Single-line diagrams and load calculations',
      'Applications to the utility, and grievance filings where needed',
      'Drawings for the Electrical Inspectorate’s approval',
    ],
  },
  {
    title: 'Build and hand over',
    summary: 'We stay accountable until the system is inspected, connected and handed over.',
    checklist: [
      'Inspection and charging permission',
      'Net meter installed and connected, for solar',
      'As-built drawings and warranty papers handed over',
    ],
  },
];

export default function GroundedProcess() {
  return (
    <section
      id="process"
      style={{
        backgroundColor: '#F4F1EA',
        padding: 'clamp(80px, 10vh, 116px) 24px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        textAlign: 'left',
        scrollMarginTop: '88px',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <SectionEyebrow number={5}>Process</SectionEyebrow>
        <h2
          style={{
            fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
            lineHeight: 1.15,
            fontWeight: 400,
            letterSpacing: '-0.025em',
            color: '#111111',
            margin: '0 0 40px',
            maxWidth: '760px',
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
          }}
        >
          One desk from the first site visit to handover.
        </h2>

        <ol className="process-steps">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flat-card">
              <span className="process-step-number" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
              <ul>
                {step.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
