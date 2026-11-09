"use client";

import React, { useState } from 'react';
import { logoSize } from '@/content/logos';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionEyebrow from '@/components/SectionEyebrow';
import FaqList from '@/components/FaqList';
import { divisions, type DivisionContent, type FeatureSection, type ProofBlock } from '@/content/divisions';
import { DIVISION_ONE_LINERS, PROOF_LINE } from '@/content/messaging';
import { ATTRIBUTION_LINES, PROJECTS, clientGroups, isShowable } from '@/content/track-record';
import { PHOTOS, photoCaption, photoCredit, type PhotoKey } from '@/content/photos';
import dynamic from 'next/dynamic';
import type { CalculationResult } from '@/components/SolarCalculator';

// The estimators are the heaviest scripts on a division page: split out and mounted near the screen.
const PrintCalculator = dynamic(() => import('@/components/PrintCalculator'), { ssr: false });
const InteriorCalculator = dynamic(() => import('@/components/InteriorCalculator'), { ssr: false });
const GridApexSubstationCalculator = dynamic(() => import('@/components/GridApexSubstationCalculator'), { ssr: false });
const SanyogTariffAuditCalculator = dynamic(() => import('@/components/SanyogTariffAuditCalculator'), { ssr: false });
const AgrimDprSimulator = dynamic(() => import('@/components/AgrimDprSimulator'), { ssr: false });
const SolarCalculator = dynamic(() => import('@/components/SolarCalculator'), { ssr: false });
import SolarPlants from '@/components/SolarPlants';
import OnGridDiagram from '@/components/OnGridDiagram';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import SiteEnquiryForm from '@/components/SiteEnquiryForm';
import HotelGallery from '@/components/HotelGallery';
import WorkMap from '@/components/WorkMap';
import FlowDiagram from '@/components/FlowDiagram';
import { ElectricBorder, LineSidebar, SpecularButton } from '@/components/react-bits';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Ambient, GradientASCII, GridScan, LazyMount, MicroSlats, NetworkGraph, ParallaxLayer, PatternWaves, RevealWords, ShapeWaves, useDesktopPointer } from '@/components/effects';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { formatCount } from '@/content/track-record';
import { ArrowRight, ArrowUpRight, ChevronRight, Mail, Phone } from 'lucide-react';

const SERIF = 'var(--font-serif-display), "Instrument Serif", Georgia, serif';
const SANS = 'var(--font-sans, Inter, sans-serif)';

/** Section head: a sentence-case label, the headline and an optional intro. */
function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <ScrollReveal>
      <div style={{ maxWidth: '760px', marginBottom: '32px' }}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
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
          <RevealWords text={title} />
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
        {hero ? (
          <ParallaxLayer strength={60} zoom={0.1}>
            <Image src={p.src} alt={p.subject} fill priority sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
          </ParallaxLayer>
        ) : (
          <Image src={p.src} alt={p.subject} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
        )}
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
    case 'hotels':
      // The map's key names every property; the gallery shows the ones we have licensed photos of.
      return (
        <div style={{ display: 'grid', gap: '48px' }}>
          <p className="margin-note">{ATTRIBUTION_LINES.director}</p>
          <WorkMap show="hotels" />
          <HotelGallery photos={block.photos} />
          <p className="photo-caption" style={{ marginTop: '-32px' }}>
            Scope at each property: HT electrical work. Hotel names are given as they are today.
          </p>
        </div>
      );
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
  if (feature.kind === 'flow') {
    return (
      <div>
        <FlowDiagram steps={feature.steps} numbered={feature.numbered} caption={feature.caption} />
        {feature.note && (
          <p className="margin-note" style={{ marginTop: '28px' }}>
            {feature.note}
          </p>
        )}
        {feature.facts && (
          <div style={{ marginTop: '48px' }}>
            <h3 style={blockTitle}>{feature.facts.title}</h3>
            <dl className="fact-rows">
              {feature.facts.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    );
  }
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
const DIVISION_THEMES: Record<string, { canvasClass: string; heroBg: string; ruleColor: string; accent: string; typeClass?: string }> = {
  solis: { canvasClass: 'solis-canvas', heroBg: '#F7F6F2', ruleColor: '#FFC85A', accent: '#111111', typeClass: 'solis-type' },
  tvasta: { canvasClass: 'tvasta-canvas', heroBg: '#F8F9FA', ruleColor: '#D72A1B', accent: '#D72A1B' },
  'grid-apex': { canvasClass: 'grid-apex-canvas', heroBg: '#F0F7FF', ruleColor: '#F59E0B', accent: '#0284C7' },
  agrim: { canvasClass: 'agrim-canvas', heroBg: '#F7F9F5', ruleColor: '#D97706', accent: '#047857' },
  sanyog: { canvasClass: 'sanyog-canvas', heroBg: '#F4F6FC', ruleColor: '#2C5ED4', accent: '#2C5ED4' },
  emudran: { canvasClass: 'emudran-canvas', heroBg: '#F5F6FA', ruleColor: '#4338CA', accent: '#4338CA' },
};
const DEFAULT_THEME = { canvasClass: 'grounded-canvas', heroBg: '#F4F1EA', ruleColor: '#C29F53', accent: '#C29F53' };

/**
 * One background effect per division, behind the hero, each taken from the work itself: an AC
 * waveform for Grid Apex, pergola louvres for Solis, a network of connections for Sanyog (the name
 * means connection), a room in perspective for Tvasta, a print halftone for eMudran and a field of
 * figures for Agrim. Off for reduced motion; the WebGL ones stay off phones.
 */
function HeroEffect({ division, accent }: { division: string; accent: string }) {
  switch (division) {
    case 'grid-apex':
      return (
        <Ambient opacity={0.5}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: '72px' }}>
            <ShapeWaves color={accent} height={220} waveCount={3} />
          </div>
        </Ambient>
      );
    case 'solis':
      return <SolisSlats />;
    case 'sanyog':
      return (
        <Ambient desktopOnly>
          <NetworkGraph color={accent} />
        </Ambient>
      );
    case 'tvasta':
      return (
        <Ambient desktopOnly opacity={0.55}>
          <GridScan dpr={1} lightMode linesColor="#C9CDD2" scanColor={accent} cells={8} depth={3} scanDuration={3.2} scanDelay={2.4} clickEffect="none" className="w-full h-full" />
        </Ambient>
      );
    case 'emudran':
      return (
        <Ambient desktopOnly opacity={0.18} blend="multiply">
          <PatternWaves preset="mesh" color={accent} backgroundColor="#FFFFFF" fade="edges" interactive cursorSize={40} cursorStrength={0.5} />
        </Ambient>
      );
    case 'agrim':
      return (
        <Ambient desktopOnly opacity={0.4}>
          <GradientASCII dpr={1} lightMode characters="0123456789%" colors={[accent, '#06281E', accent]} shape="waves" cellSize={14} gradientOpacity={0} glyphOpacity={0.9} grain={0} mouseInteraction />
        </Ambient>
      );
    default:
      return null;
  }
}

/** "36+ years" counts up to 36; short or non-numeric values stay as they are. */
function FactValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(\D.*)?$/);
  const end = match ? Number(match[1]) : 0;
  if (!match || end < 10) return <>{value}</>;
  return <AnimatedCounter end={end} suffix={match[2] ?? ''} duration={1400} />;
}

type StepVisual = { src: string; alt: string; caption: string };

const OWN = {
  survey: { src: '/images/own/terrace-survey.jpg', alt: 'An open terrace with water tanks, a lift room and pipework along the parapet', caption: 'A terrace survey by our team, Mumbai, October 2026.' },
  pergola: { src: '/images/solis/terrace-pergola.svg', alt: 'Section drawing of a terrace with the panels raised on an elevated pergola', caption: 'Section drawing: panels on an elevated pergola, with the terrace usable underneath. JC Apex Ventures.' },
  frames: { src: '/images/solis/terrace-low-frames.svg', alt: 'Section drawing of a terrace with panels on low frames', caption: 'Section drawing: the same terrace with panels on low frames, as a proposal compares both. JC Apex Ventures.' },
} satisfies Record<string, StepVisual>;

const licensed = (key: PhotoKey): StepVisual => ({ src: PHOTOS[key].src, alt: PHOTOS[key].subject, caption: photoCaption(key) });

/** One image per step, so the picture changes with the step. Steps without one show text only. */
const STEP_VISUALS: Record<string, Record<string, StepVisual>> = {
  solis: { 'Site survey': OWN.survey, Design: OWN.pergola, Proposal: OWN.frames, 'Build and commission': licensed('solis-install') },
  'grid-apex': {
    'Survey and load study': licensed('grid-electrician'),
    'Design and drawings': licensed('agrim-plans'),
    Approvals: licensed('grid-transformer'),
    'Installation and commissioning': licensed('grid-substation'),
    Maintenance: licensed('grid-distribution'),
  },
  sanyog: {
    'Document check': licensed('agrim-plans'),
    Application: licensed('sanyog-meter-analog'),
    'Utility inspection': licensed('grid-electrician'),
    Sanction: licensed('grid-distribution'),
    'Meter installation': licensed('sanyog-meters'),
  },
  tvasta: { Understand: licensed('tvasta-living-2'), Plan: licensed('agrim-plans'), Execute: licensed('tvasta-kitchen'), Refine: licensed('tvasta-office') },
  emudran: { Concept: licensed('emudran-packaging'), 'Pre-press': licensed('agrim-plans'), Production: licensed('emudran-print') },
  agrim: { 'Understand the requirement': licensed('agrim-plans'), 'Match it to the project': licensed('solis-rooftop') },
};

/**
 * The steps as an index: pick a step on the left and it opens on the right with its own image,
 * crossfading as it changes. Until someone picks one, the steps advance by themselves every few
 * seconds while the section is on screen (never for reduced motion).
 */
function StepsExplorer({ steps, division }: { steps: DivisionContent['steps']; division: string }) {
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const current = steps[index] ?? steps[0];
  const visual = current ? STEP_VISUALS[division]?.[current.title] : undefined;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (touched || reduce || !onScreen || steps.length < 2) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % steps.length), 4200);
    return () => window.clearTimeout(timer);
  }, [index, touched, reduce, onScreen, steps.length]);

  return (
    <div ref={ref} className="steps-explorer" onPointerEnter={() => setTouched(true)} onFocus={() => setTouched(true)}>
      <LineSidebar
        items={steps.map((s) => ({ id: s.title, label: s.title }))}
        activeId={current?.title ?? ''}
        onSelect={(id) => {
          setTouched(true);
          setIndex(Math.max(0, steps.findIndex((s) => s.title === id)));
        }}
      />
      <div className="steps-explorer-panel" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current?.title}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {current && (
              <>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
              </>
            )}
            {visual && (
              <figure style={{ margin: '24px 0 0' }}>
                <div className="steps-photo">
                  <motion.div
                    style={{ position: 'absolute', inset: 0 }}
                    initial={reduce ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: visual.src.endsWith('.svg') ? 'contain' : 'cover' }} />
                  </motion.div>
                </div>
                <figcaption className="photo-caption">{visual.caption}</figcaption>
              </figure>
            )}
          </motion.div>
        </AnimatePresence>
        {!touched && !reduce && steps.length > 1 && (
          <div className="steps-progress" aria-hidden="true">
            <span key={index} style={{ animationPlayState: onScreen ? 'running' : 'paused' }} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Solis: pergola louvres. On desktops they are live WebGL slats that ripple, catch a Sun Yellow
 * glint and part around the pointer; phones get the still drawing-sheet slats.
 */
function SolisSlats() {
  const desktop = useDesktopPointer();
  return desktop ? (
    <Ambient opacity={0.9}>
      <MicroSlats preset="tide" color="#C9C5BA" glintColor="#FFC85A" backgroundColor="#F7F6F2" slatWidth={9} slatHeight={26} gap={4} glint={1.6} contrast={1.3} interactive cursorSize={70} />
    </Ambient>
  ) : (
    <Ambient>
      <MicroSlats count={28} color="#111111" opacity={0.06} zIndex={0} showTicks />
    </Ambient>
  );
}

// What to send with an enquiry, per division: the one thing that gets a useful first answer.
const ENQUIRY_ASK: Record<string, string> = {
  'grid-apex': 'Send us the site address and the single-line diagram, or a recent HT bill.',
  solis: 'Send us the site address and a recent electricity bill.',
  sanyog: 'Send us the account number and the bill or notice you are dealing with.',
  tvasta: 'Send us the floor plan, or the address and the carpet area.',
  emudran: 'Send us the artwork, the quantity and the date you need it by.',
  agrim: 'Send us the project cost and what the bank has asked for.',
};

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
  // A detail page (for example /licenses) wears its parent division's theme, logo and estimator.
  const key = data.parent ?? data.slug;
  const parent = data.parent ? divisions.find((d) => d.slug === data.parent) : undefined;
  const logo = DIVISION_LOGOS[key];
  const theme = DIVISION_THEMES[key] || DEFAULT_THEME;
  const oneLiner = DIVISION_ONE_LINERS[key];
  const estimator = data.noEstimator ? undefined : ESTIMATORS[key];
  const [estimate, setEstimate] = useState<string | undefined>();
  const tilePhotos = (data.tiles?.items ?? []).flatMap((tile) => (tile.photo ? [tile.photo] : []));

  // Links to this division's own detail pages; email actions are covered by the form.
  const pageLinks = data.actions.filter((a) => a.href.startsWith('/'));

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

  return (
    <main id="main-content" className={canvasClassName || theme.canvasClass} style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      <div className={theme.typeClass}>
      <section style={{ paddingTop: '136px', paddingBottom: '56px', backgroundColor: theme.heroBg, borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        <HeroEffect division={key} accent={theme.accent} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
            {parent && (
              <>
                <Link href={parent.href} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                  {parent.name}
                </Link>
                <ChevronRight size={13} aria-hidden="true" />
              </>
            )}
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{data.name}</span>
          </nav>

          <div className="page-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'start' }}>
            <div className="flat-card sheet-frame animate-fade-in-up" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
              <i className="corner-mark tl" />
              <i className="corner-mark tr" />
              <i className="corner-mark bl" />
              <i className="corner-mark br" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                {logo && <img src={logo.src} alt={parent?.name ?? data.name} {...logoSize(logo.src)} style={{ height: `${logo.height}px`, width: 'auto', display: 'block', borderRadius: 0 }} />}
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
                <RevealWords text={data.title} delay={0.15} />
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.68, margin: '0 0 22px', fontFamily: SANS }}>
                {data.intro}
              </p>
              {oneLiner && <p className="margin-note">{oneLiner}</p>}
              {data.showProofLine && <p className="hero-proof">{PROOF_LINE}</p>}
              {data.facts && (
                <dl className="fact-rows hero-card-facts">
                  {data.facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>
                        <FactValue value={f.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
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

          <ul className="title-block-line" aria-label="Page reference">
            <li>JC Apex Ventures</li>
            <li>{parent ? parent.name : data.name}</li>
            <li>{parent ? data.name : 'Division of six'}</li>
            <li>jcapexv.com{data.href}</li>
          </ul>
        </div>
      </section>

      <section id="services" className="section" style={{ paddingBottom: '40px', scrollMarginTop: '100px' }}>
        <div className="container">
          <SectionHeading eyebrow="What we handle" title={parent ? `What ${data.name.toLowerCase()} covers.` : `What ${data.name} handles.`} />
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

      {data.tiles && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '64px' }}>
          <div className="container">
            <SectionHeading eyebrow={data.tiles.eyebrow} title={data.tiles.title} />
            <ScrollReveal>
              <ul className="tile-grid">
                {data.tiles.items.map((tile, i) => (
                  <li key={tile.title} className="tile">
                    <div className="tile-frame unmask" style={{ transitionDelay: `${i * 120}ms` }}>
                      {tile.photo ? (
                        <Image src={PHOTOS[tile.photo].src} alt={PHOTOS[tile.photo].subject} fill sizes="(max-width: 760px) 80vw, 25vw" style={{ objectFit: 'cover' }} />
                      ) : (
                        logo && <img src={logo.src} alt="" {...logoSize(logo.src)} loading="lazy" className="tile-logo" />
                      )}
                    </div>
                    <h3>{tile.title}</h3>
                    <p>{tile.text}</p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            {data.tiles.caption && <p className="photo-caption">{data.tiles.caption}</p>}
            {tilePhotos.length > 0 && (
              <p className="photo-caption">
                Photographs are representative images. {[...new Set(tilePhotos.map((key) => photoCredit(key)))].join(' ')}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading eyebrow={data.proof.eyebrow} title={data.proof.title} intro={data.proof.text} />
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
             
              eyebrow={feature.eyebrow}
              title={feature.title}
              intro={feature.kind === 'terrace-comparison' ? feature.text : feature.kind === 'flow' ? feature.intro : undefined}
            />
            <FeatureView feature={feature} />
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        <div className="container">
          <SectionHeading eyebrow="How we work" title={data.stepsTitle} />
          <StepsExplorer steps={data.steps} division={key} />
        </div>
      </section>

      {estimator && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading eyebrow="Estimate" title={estimator.title} intro={estimator.intro} />
            <LazyMount minHeight={720}>{estimator.render({ onUse: setEstimate })}</LazyMount>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="faq-grid">
            <SectionHeading eyebrow="Questions" title={`${formatCount(data.faq.length).replace(/^./, (c) => c.toUpperCase())} questions we get about ${parent?.name ?? data.name}.`} />
            <FaqList items={data.faq} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading eyebrow="Other divisions" title="Who joins when the job grows." intro="Another division joins through the same contact, so you never start again with someone new." />
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
            {/* A current runs round the card on the electrical divisions' pages (ElectricBorder skips the others). */}
            <ElectricBorder division={key} color={theme.accent} borderRadius={16} duration={6}>
            <div className={`flat-card division-contact${data.enquiryForm ? ' has-form' : ''}`} style={{ padding: 'clamp(24px, 5vw, 56px)' }}>
              <div>
                <SectionEyebrow>Enquire</SectionEyebrow>
                <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', margin: '0 0 14px', color: 'var(--color-text-primary)', fontFamily: SERIF, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {ENQUIRY_ASK[key] ?? 'Tell us about the job.'}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontSize: '1.02rem', lineHeight: 1.7, fontFamily: SANS, maxWidth: '520px' }}>
                  We reply with the next steps and the name of the person who will handle them.
                </p>
                {data.enquiryForm ? (
                  <>
                    {pageLinks.length > 0 && (
                      <p className="contact-more">
                        <span>More detail:</span>
                        {pageLinks.map((a) => (
                          <Link key={a.href} href={a.href} className="contact-link">
                            {a.label}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        ))}
                      </p>
                    )}
                    {contactRows}
                  </>
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
                  askUtility={data.enquiryForm.askUtility}
                  submitLabel={data.enquiryForm.submitLabel}
                  needs={data.services.map(([line]) => line)}
                  estimate={estimate}
                  onClearEstimate={() => setEstimate(undefined)}
                />
              ) : (
                contactRows
              )}
            </div>
            </ElectricBorder>
          </ScrollReveal>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}
