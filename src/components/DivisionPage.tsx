"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionEyebrow from '@/components/SectionEyebrow';
import FaqList from '@/components/FaqList';
import type { DivisionContent, FeatureSection, ProofBlock } from '@/content/divisions';
import { DIVISION_ONE_LINERS, PROOF_LINE } from '@/content/messaging';
import { ATTRIBUTION_LINES, PROJECTS, clientGroups, isShowable } from '@/content/track-record';
import { PHOTOS, photoCaption, photoCredit, type PhotoKey } from '@/content/photos';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import GridApexSubstationCalculator from '@/components/GridApexSubstationCalculator';
import SanyogTariffAuditCalculator from '@/components/SanyogTariffAuditCalculator';
import AgrimDprSimulator from '@/components/AgrimDprSimulator';
import SolarCalculator, { type CalculationResult } from '@/components/SolarCalculator';
import SolarPlants from '@/components/SolarPlants';
import OnGridDiagram from '@/components/OnGridDiagram';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import SiteEnquiryForm from '@/components/SiteEnquiryForm';
import { SpecularButton } from '@/components/react-bits';
import { ArrowRight, ArrowUpRight, ChevronRight, Mail, Phone } from 'lucide-react';

const SERIF = 'var(--font-serif-display), "Instrument Serif", Georgia, serif';
const SANS = 'var(--font-sans, Inter, sans-serif)';

/** Section head: eyebrow with its faint number, headline, optional intro (brand guidelines 2.8.3). */
function SectionHeading({ number, eyebrow, title, intro }: { number?: number; eyebrow: string; title: string; intro?: string }) {
  return (
    <ScrollReveal>
      <div style={{ maxWidth: '760px', marginBottom: '32px' }}>
        <SectionEyebrow number={number}>{eyebrow}</SectionEyebrow>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
            margin: intro ? '0 0 12px' : 0,
            color: 'var(--color-text-primary)',
            fontFamily: SERIF,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>
        {intro && <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontFamily: SANS }}>{intro}</p>}
      </div>
    </ScrollReveal>
  );
}

const blockTitle: React.CSSProperties = { margin: '0 0 12px', fontFamily: SANS, fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' };

/**
 * A photograph with its caption below. Above the fold it unmasks once on load (CSS only, so it
 * never waits for script); further down it unmasks as it scrolls into view.
 */
function RevealPhoto({ photo, caption, height, hero = false }: { photo: PhotoKey; caption: string; height: string; hero?: boolean }) {
  const p = PHOTOS[photo];
  const figure = (
    <figure style={{ margin: 0 }}>
      <div className={hero ? 'unmask-on-load' : 'unmask'} style={{ position: 'relative', height, borderRadius: '16px', overflow: 'hidden', background: '#E8E4DA' }}>
        <Image src={p.src} alt={p.subject} fill priority={hero} sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
      </div>
      <figcaption className="photo-caption">{caption}</figcaption>
    </figure>
  );
  return hero ? figure : <ScrollReveal>{figure}</ScrollReveal>;
}

/** Hairline table. `list` sets the first column in Ink, for lists of names rather than labels. */
function SpecTable({ headers, rows, list = false }: { headers: string[]; rows: string[][]; list?: boolean }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={`spec-table${list ? ' is-list' : ''}`} style={{ minWidth: headers.length > 2 ? '560px' : undefined }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h || 'row'} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, i) => (
                <td key={`${i}-${cell}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProofBlockView({ block }: { block: ProofBlock }) {
  switch (block.kind) {
    case 'table':
      return (
        <div>
          {block.title && <h3 style={blockTitle}>{block.title}</h3>}
          <SpecTable headers={block.headers} rows={block.rows} />
          {block.caption && <p className="photo-caption">{block.caption}</p>}
        </div>
      );
    case 'facts':
      return (
        <div>
          {block.title && <h3 style={blockTitle}>{block.title}</h3>}
          <dl className="fact-rows">
            {block.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          {block.caption && <p className="photo-caption">{block.caption}</p>}
        </div>
      );
    case 'note':
      return <p className="margin-note">{block.text}</p>;
    case 'hotels': {
      const hotels = clientGroups().find((g) => g.id === 'hospitality');
      return (
        <div style={{ display: 'grid', gap: '32px' }}>
          <p className="margin-note">{ATTRIBUTION_LINES.director}</p>
          <div className="photo-row">
            {block.photos.map((key) => (
              <figure key={key} style={{ margin: 0 }}>
                <div className="photo-frame">
                  <Image src={PHOTOS[key].src} alt={PHOTOS[key].subject} fill sizes="(max-width: 760px) 82vw, 30vw" style={{ objectFit: 'cover' }} />
                </div>
                <figcaption className="photo-caption">
                  {PHOTOS[key].subject}. {photoCredit(key)}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="photo-caption" style={{ marginTop: '-20px' }}>
            Photographs show the properties, not our installations.
          </p>
          {hotels && (
            <div>
              <SpecTable list headers={['Property', 'Place']} rows={hotels.clients.map((c) => [c.name, c.place ?? ''])} />
              <p className="photo-caption">Scope at each property: HT electrical work. Hotel names are given as they are today.</p>
            </div>
          )}
        </div>
      );
    }
    case 'creative-credits': {
      const creative = clientGroups().find((g) => g.id === 'creative');
      if (!creative) return null;
      return (
        <div>
          <p className="margin-note" style={{ marginBottom: '20px' }}>
            {creative.attributionLine}
          </p>
          <SpecTable list headers={['Brand', 'Work']} rows={creative.clients.map((c) => [c.name, c.work])} />
          <p className="photo-caption">
            Credits from Manish Ajgaonkar&apos;s career in brand and packaging design. Brand names are shown for reference only.
          </p>
        </div>
      );
    }
    case 'plants':
      return <SolarPlants />;
  }
}

/** "A 19-floor housing society" reads "a 19-floor housing society" mid-sentence. */
const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Panels on low frames against the same terrace with a pergola, drawn rather than photographed. */
function TerraceComparison() {
  const proposals = PROJECTS.filter((p) => p.division === 'solis' && p.kind === 'proposal' && isShowable(p.proof.status));
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <ScrollReveal>
        <BeforeAfterSlider
          beforeImage="/images/solis/terrace-low-frames.svg"
          afterImage="/images/solis/terrace-pergola.svg"
          beforeCaption="Left: panels on low frames across the terrace floor."
          afterCaption="Right: the same terrace with the panels on an elevated pergola. Drawings for illustration, not to scale."
        />
      </ScrollReveal>
      {proposals.map((p) => (
        <p key={p.id} className="margin-note">
          {p.title} for {lower(p.client)} in {p.location}. {p.statusNote}.
        </p>
      ))}
    </div>
  );
}

function FeatureView({ feature }: { feature: FeatureSection }) {
  if (feature.kind === 'terrace-comparison') return <TerraceComparison />;
  return (
    <div>
      <OnGridDiagram />
      <div className="connection-cols">
        {feature.columns.map(([title, text]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <dl className="fact-rows">
        {feature.facts.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const DIVISION_LOGOS: Record<string, { src: string; height: number }> = {
  'grid-apex': { src: '/images/logos/grid-apex-official.png', height: 52 },
  sanyog: { src: '/images/logos/sanyog-official.png', height: 56 },
  tvasta: { src: '/images/logos/tvasta-dark.png', height: 48 },
  emudran: { src: '/images/logos/emudran-official.png', height: 48 },
  agrim: { src: '/images/logos/agrim-dark.png', height: 52 },
  solis: { src: '/images/logos/solis-official.png', height: 52 },
};

// Canvas class and the second accent for the short rule beside the logo (guidelines 2.3).
// Solis keeps its own guidelines: black, Sun Yellow and greys on Paper, set in Instrument Sans.
const DIVISION_THEMES: Record<string, { canvasClass: string; heroBg: string; ruleColor: string; typeClass?: string }> = {
  solis: { canvasClass: 'solis-canvas', heroBg: '#F7F6F2', ruleColor: '#FFC85A', typeClass: 'solis-type' },
  tvasta: { canvasClass: 'tvasta-canvas', heroBg: '#F8F9FA', ruleColor: '#D72A1B' },
  'grid-apex': { canvasClass: 'grid-apex-canvas', heroBg: '#F0F7FF', ruleColor: '#F59E0B' },
  agrim: { canvasClass: 'agrim-canvas', heroBg: '#F7F9F5', ruleColor: '#D97706' },
  sanyog: { canvasClass: 'sanyog-canvas', heroBg: '#F4F6FC', ruleColor: '#2C5ED4' },
  emudran: { canvasClass: 'emudran-canvas', heroBg: '#F5F6FA', ruleColor: '#4338CA' },
};
const DEFAULT_THEME = { canvasClass: 'grounded-canvas', heroBg: '#F4F1EA', ruleColor: '#C29F53' };

const DIVISION_HREFS: Record<string, string> = {
  'Grid Apex': '/grid-apex',
  Solis: '/solis',
  Sanyog: '/sanyog',
  Tvasta: '/tvasta',
  eMudran: '/emudran',
  Agrim: '/agrim',
};

const rupees = (n: number) => (n >= 100000 ? `Rs ${(n / 100000).toFixed(2)} lakh` : `Rs ${n.toLocaleString('en-IN')}`);

/** The solar estimate in one sentence, as it goes into the enquiry. */
function describeSolarEstimate(c: CalculationResult): string {
  const parts = [
    `${c.recommendedKwp} kWp on ${c.structureType === 'pergola' ? 'an elevated pergola' : 'standard frames'}, about ${c.panelCount} panels`,
    `about ${c.monthlyGenerationUnits.toLocaleString('en-IN')} units a month`,
    `savings of about ${rupees(c.monthlySavingsRs)} a month`,
    `net cost about ${rupees(c.netInvestmentRs)}${c.subsidyRs > 0 ? ' after subsidy' : ''}`,
    `payback in about ${c.paybackYears} years`,
  ];
  if (c.evOption !== 'none') parts.push('with EV charging');
  if (c.bipvOption !== 'none') parts.push('with BIPV glass');
  const text = parts.join('; ');
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}.`;
}

// Estimator section per division. Every figure an estimator shows is indicative.
const ESTIMATORS: Record<string, { title: string; intro: string; render: (ctx: { onUse: (summary: string) => void }) => React.ReactNode }> = {
  solis: {
    title: 'Plant size, cost and savings',
    intro: 'Enter your monthly bill or terrace area to see an indicative plant size, cost and payback. You can add the result to your enquiry.',
    render: ({ onUse }) => <SolarCalculator onApplyCalculation={(c) => onUse(describeSolarEstimate(c))} />,
  },
  emudran: {
    title: 'Print and signage estimate',
    intro: 'Choose the format, quantity and finish to see an indicative rate. The final price follows a written quote.',
    render: () => <PrintCalculator />,
  },
  tvasta: {
    title: 'Fit-out cost estimate',
    intro: 'Choose your layout or floor area to see indicative costs for the Standard, Premium and Luxury tiers.',
    render: () => <InteriorCalculator />,
  },
  'grid-apex': {
    title: 'Transformer and capacitor sizing',
    intro: 'Enter your connected load, supply voltage and power factor to see an indicative transformer rating and capacitor bank size.',
    render: () => <GridApexSubstationCalculator />,
  },
  sanyog: {
    title: 'Electricity bill check',
    intro: 'Enter your bill details to see what a wrong tariff or a power factor charge may be costing you. Any refund depends on the utility’s own records.',
    render: () => <SanyogTariffAuditCalculator />,
  },
  agrim: {
    title: 'Project cost and loan readiness',
    intro: 'Test a project’s cost, cash flow and debt cover before it goes to a bank. The bank or lender makes every loan decision.',
    render: () => <AgrimDprSimulator />,
  },
};

/**
 * Division page (website redesign, stage 6): hero, what we handle, proof, any sections only that
 * division needs (Solis: the terrace comparison and the connection diagram), process, estimate,
 * questions, who else joins, enquire. Copy comes from src/content/divisions.ts.
 */
export default function DivisionPage({ data, canvasClassName }: { data: DivisionContent; canvasClassName?: string }) {
  const logo = DIVISION_LOGOS[data.slug];
  const theme = DIVISION_THEMES[data.slug] || DEFAULT_THEME;
  const oneLiner = DIVISION_ONE_LINERS[data.slug];
  const estimator = ESTIMATORS[data.slug];
  const [estimate, setEstimate] = useState<string | undefined>();

  const contactRows = (
    <dl className="fact-rows">
      <div>
        <dt>Email</dt>
        <dd>
          {data.contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="contact-link">
              <Mail size={14} aria-hidden="true" />
              {email}
            </a>
          ))}
          {data.contact.note && <small>{data.contact.note}</small>}
        </dd>
      </div>
      <div>
        <dt>Phone and WhatsApp</dt>
        <dd>
          <a href="tel:+917021112664" className="contact-link">
            <Phone size={14} aria-hidden="true" />
            +91 70211 12664
          </a>
        </dd>
      </div>
      <div>
        <dt>Office</dt>
        <dd>Units 801–802, 8th Floor, Tower 1, One International Centre, Elphinstone, Mumbai 400013</dd>
      </div>
    </dl>
  );

  // Sections are numbered in the order they appear on the page.
  let sectionCount = 0;
  const nextNumber = () => ++sectionCount;

  return (
    <main className={canvasClassName || theme.canvasClass} style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      <div className={theme.typeClass}>
      <section style={{ paddingTop: '136px', paddingBottom: '56px', backgroundColor: theme.heroBg, borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <nav
            aria-label="Breadcrumb"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.82rem', color: 'var(--color-text-muted)', fontFamily: SANS }}
          >
            <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/#divisions" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Divisions
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{data.name}</span>
          </nav>

          <div className="page-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'start' }}>
            <div className="flat-card sheet-frame animate-fade-in-up" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
              <i className="corner-mark tl" />
              <i className="corner-mark tr" />
              <i className="corner-mark bl" />
              <i className="corner-mark br" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                {logo && <img src={logo.src} alt={data.name} style={{ height: `${logo.height}px`, width: 'auto', display: 'block', borderRadius: 0 }} />}
                <span aria-hidden="true" style={{ width: '2px', height: '40px', backgroundColor: theme.ruleColor }} />
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 3.2rem)',
                  margin: '0 0 18px',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  fontFamily: SERIF,
                }}
              >
                {data.title}
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.68, margin: '0 0 22px', fontFamily: SANS }}>
                {data.intro}
              </p>
              {oneLiner && <p className="margin-note">{oneLiner}</p>}
              {data.showProofLine && <p className="hero-proof">{PROOF_LINE}</p>}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
                <SpecularButton href="#contact" variant="dark" icon={<ArrowRight size={16} />}>
                  Enquire
                </SpecularButton>
                <SpecularButton href="#services" variant="light">
                  What we handle
                </SpecularButton>
              </div>
            </div>

            <RevealPhoto photo={data.heroPhoto} caption={photoCaption(data.heroPhoto)} height="clamp(280px, 38vw, 460px)" hero />
          </div>

          {data.facts && (
            <dl className="hero-facts">
              {data.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="title-block-line" aria-label="Page reference">
            <li>JC Apex Ventures</li>
            <li>{data.name}</li>
            <li>Division of six</li>
            <li>jcapexv.com{data.href}</li>
          </ul>
        </div>
      </section>

      <section id="services" className="section" style={{ paddingBottom: '40px', scrollMarginTop: '100px' }}>
        <div className="container">
          <SectionHeading number={nextNumber()} eyebrow="What we handle" title={`What ${data.name} does for you.`} />
          <ul className="service-rows">
            {data.services.map(([line, covers]) => (
              <li key={line} className="service-row">
                <h3>{line}</h3>
                <ul>
                  {covers.split('; ').map((item) => (
                    <li key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading number={nextNumber()} eyebrow={data.proof.eyebrow} title={data.proof.title} intro={data.proof.text} />
          <div style={{ display: 'grid', gap: '48px' }}>
            {data.proof.blocks.map((block, i) => (
              <ScrollReveal key={`${block.kind}-${i}`}>
                <ProofBlockView block={block} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {data.features?.map((feature, i) => (
        <section
          key={feature.kind}
          className="section"
          style={{
            paddingTop: '60px',
            paddingBottom: '60px',
            ...(i % 2 === 1 ? { background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' } : {}),
          }}
        >
          <div className="container">
            <SectionHeading
              number={nextNumber()}
              eyebrow={feature.eyebrow}
              title={feature.title}
              intro={feature.kind === 'terrace-comparison' ? feature.text : undefined}
            />
            <FeatureView feature={feature} />
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        <div className="container">
          <SectionHeading number={nextNumber()} eyebrow="How we work" title={data.stepsTitle} />
          <div className={data.stepsPhoto ? 'steps-with-photo' : undefined}>
            <ol className="division-steps">
              {data.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="step-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            {data.stepsPhoto && (
              <ScrollReveal>
                <figure style={{ margin: 0 }}>
                  <div className="unmask steps-photo">
                    <Image src={data.stepsPhoto.src} alt={data.stepsPhoto.alt} fill sizes="(max-width: 900px) 100vw, 35vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <figcaption className="photo-caption">{data.stepsPhoto.caption}</figcaption>
                </figure>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {estimator && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading number={nextNumber()} eyebrow="Estimate" title={estimator.title} intro={estimator.intro} />
            {estimator.render({ onUse: setEstimate })}
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="faq-grid">
            <SectionHeading number={nextNumber()} eyebrow="Questions" title="What clients ask us." />
            <FaqList items={data.faq} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading number={nextNumber()} eyebrow="One desk" title="Who else joins the project." intro="A project that needs more than one division is run by a single desk." />
          <ul className="joins-list">
            {data.joins.map(([name, text]) => (
              <li key={name}>
                <Link href={DIVISION_HREFS[name] ?? '/'} className="joins-link">
                  <span className="joins-name">
                    {name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                  <span className="joins-text">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="section" style={{ paddingTop: '40px', paddingBottom: '80px', scrollMarginTop: '100px' }}>
        <div className="container">
          <ScrollReveal>
            <div className={`flat-card division-contact${data.enquiryForm ? ' has-form' : ''}`} style={{ padding: 'clamp(24px, 5vw, 56px)' }}>
              <div>
                <SectionEyebrow>Enquire</SectionEyebrow>
                <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', margin: '0 0 14px', color: 'var(--color-text-primary)', fontFamily: SERIF, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  Talk to us about your site.
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontSize: '1.02rem', lineHeight: 1.7, fontFamily: SANS, maxWidth: '520px' }}>
                  Tell us what you need. We reply with the next steps and the person who will handle them.
                </p>
                {data.enquiryForm ? (
                  contactRows
                ) : (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {data.actions.map((a, i) => (
                      <SpecularButton key={a.href} href={a.href} variant={i === 0 ? 'dark' : 'light'} icon={i === 0 ? <ArrowRight size={16} /> : undefined}>
                        {a.label}
                      </SpecularButton>
                    ))}
                  </div>
                )}
              </div>
              {data.enquiryForm ? (
                <SiteEnquiryForm
                  to={data.enquiryForm.to}
                  cc={data.enquiryForm.cc}
                  subject={data.enquiryForm.subject}
                  needs={data.services.map(([line]) => line)}
                  estimate={estimate}
                  onClearEstimate={() => setEstimate(undefined)}
                />
              ) : (
                contactRows
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}
