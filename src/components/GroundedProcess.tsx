"use client";

import React from 'react';
import Link from 'next/link';
import SectionEyebrow from './SectionEyebrow';
import ScrollReveal from './ScrollReveal';

// How we work with clients, as on page 2 of the company profile.
const PRINCIPLES = [
  { label: 'One point of contact', value: 'You deal with one person, whichever divisions the project needs.' },
  { label: 'Specialists', value: 'Each division is led by people who do that work every day.' },
  { label: 'Facts we can show', value: 'Capacities, dates and sites come from documents on file.' },
  { label: 'Clear scope', value: 'Every quote says what is included and what is not.' },
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
 * One desk (company profile, pages 2 and 8): how we work with clients, then an illustrative
 * project that needs five divisions and still has one point of contact.
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
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        <SectionEyebrow number={5}>One desk</SectionEyebrow>
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
          When a project needs several divisions, you still have one point of contact.
        </h2>

        <dl className="fact-rows desk-principles">
          {PRINCIPLES.map((p) => (
            <div key={p.label}>
              <dt>{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>

        <p className="desk-example-lead">An illustrative example: a housing society that wants rooftop solar and EV charging for its residents.</p>
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
