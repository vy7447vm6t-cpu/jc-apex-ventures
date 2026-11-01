"use client";

import React from 'react';
import Link from 'next/link';
import SectionEyebrow from './SectionEyebrow';
import ScrollReveal from './ScrollReveal';
import { Ambient, NetworkGraph } from './effects';

// How we work with clients (company profile, page 2), said the way a client would ask it.
const PRINCIPLES = [
  { label: 'Who do I call?', value: 'One person at our Elphinstone office, whichever divisions the job needs.' },
  { label: 'Who does the work?', value: 'The division that does it every day: Tvasta’s architects for a layout, Grid Apex for a substation.' },
  { label: 'What do you show me?', value: 'Capacities, dates and sites from documents we hold. No round-number claims.' },
  { label: 'What does the quote say?', value: 'What is included and what is not, line by line.' },
];

// The company profile's illustrative example (page 8): a housing society adding rooftop solar and EV charging.
const EXAMPLE = [
  { division: 'Sanyog', href: '/sanyog', accent: '#2C5ED4', title: 'Sanyog checks the supply', text: "It reviews the society's connection and files the load extension the chargers will need." },
  { division: 'Solis', href: '/solis', accent: '#C9A13B', title: 'Solis designs and builds', text: 'The plant and the chargers are installed, then the net-metering application is filed.' },
  { division: 'Grid Apex', href: '/grid-apex', accent: '#0284C7', title: 'Grid Apex upgrades if needed', text: 'If the survey shows the distribution board or earthing needs work, Grid Apex does it.' },
  { division: 'Agrim', href: '/agrim', accent: '#047857', title: 'Agrim prepares the loan file', text: 'If the society needs a loan, Agrim prepares the requirement for its bank.' },
  { division: 'eMudran', href: '/emudran', accent: '#4338CA', title: 'eMudran makes the signs', text: "EV parking signs and the plant's site board, in English, Marathi and Hindi." },
];

/**
 * How a job with several divisions runs (company profile, pages 2 and 8): the questions clients
 * ask, then an illustrative housing-society project that needs five divisions and one contact,
 * over a drifting network of gold nodes.
 */
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Ambient desktopOnly opacity={0.8}>
        <NetworkGraph />
      </Ambient>
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <SectionEyebrow>A job with several divisions</SectionEyebrow>
        <h2
          style={{
            fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
            lineHeight: 1.15,
            fontWeight: 400,
            letterSpacing: '-0.025em',
            color: '#111111',
            margin: '0 0 40px',
            maxWidth: '820px',
            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
          }}
        >
          A housing society wants solar on the roof and chargers in the car park. Five divisions work on it; the society calls one person.
        </h2>

        <dl className="fact-rows desk-principles">
          {PRINCIPLES.map((p) => (
            <div key={p.label}>
              <dt>{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>

        <p className="desk-example-lead">How that job runs, division by division.</p>
        <ScrollReveal>
          <div className="desk-example">
            <div className="desk-hub">
              <span className="desk-hub-dot" aria-hidden="true" />
              <strong>One point of contact</strong>
              <span>JC Apex Ventures, Mumbai</span>
            </div>
            <ol className="desk-steps">
              {EXAMPLE.map((step, i) => (
                <li key={step.division} style={{ transitionDelay: `${150 + i * 110}ms`, ['--desk-accent' as string]: step.accent } as React.CSSProperties}>
                  <Link href={step.href} className="desk-division">
                    {step.division}
                  </Link>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
        <p className="photo-caption">Illustrative example of how the divisions work together; not a description of a specific project.</p>
      </div>
    </section>
  );
}
