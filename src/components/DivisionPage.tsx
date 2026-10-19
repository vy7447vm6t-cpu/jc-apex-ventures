"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import type { DivisionContent, IconKey } from '@/content/divisions';
import { ImageWithLightbox } from '@/components/ImageLightbox';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import {
  MicroSlats,
  TechText,
  MagicBento,
  AccordionGallery,
  OptionWheel,
  ElectricBorder,
  SvgPathAnimator,
  SpecularButton,
} from '@/components/react-bits';
import { Plug, Sun, Layout, Printer, Landmark, Zap, ArrowRight, AlertTriangle, CheckCircle2, User } from 'lucide-react';

export const divisionIcons: Record<IconKey, React.ComponentType<{ size?: number; color?: string }>> = {
  plug: Plug,
  sun: Sun,
  layout: Layout,
  printer: Printer,
  landmark: Landmark,
  zap: Zap,
};

function SectionHeading({ title, intro, rightSlot }: { title: string; intro?: string; rightSlot?: React.ReactNode }) {
  return (
    <ScrollReveal>
      <div className="section-divider" style={{ marginBottom: '24px' }} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: intro ? '36px' : '28px',
        }}
      >
        <div style={{ maxWidth: '760px' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
              marginBottom: intro ? '12px' : 0,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
          {intro && (
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                margin: 0,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              {intro}
            </p>
          )}
        </div>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
    </ScrollReveal>
  );
}

const OFFICIAL_DIVISION_LOGOS: Record<string, { src: string; darkSrc: string; alt: string; height?: number }> = {
  solis: { src: '/images/logos/solis-official.png', darkSrc: '/images/logos/solis-logo-white.png', alt: 'Solis Official Logo', height: 56 },
  sanyog: { src: '/images/logos/sanyog-official.png', darkSrc: '/images/logos/sanyog-official.png', alt: 'Sanyog Official Logo', height: 56 },
  'grid-apex': { src: '/images/logos/grid-apex-official.png', darkSrc: '/images/logos/grid-apex-white.png', alt: 'Grid Apex Official Logo', height: 54 },
  tvasta: { src: '/images/logos/tvasta-dark.png', darkSrc: '/images/logos/tvasta-official.png', alt: 'Tvasta Official Logo', height: 56 },
  emudran: { src: '/images/logos/emudran-official.png', darkSrc: '/images/logos/emudran-white.png', alt: 'eMudran Official Logo', height: 54 },
  agrim: { src: '/images/logos/agrim-dark.png', darkSrc: '/images/logos/agrim-official.png', alt: 'Agrim Official Logo', height: 56 },
};

export default function DivisionPage({
  data,
  customHeroLogo,
  children,
}: {
  data: DivisionContent;
  customHeroLogo?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const Icon = divisionIcons[data.icon];
  const defaultLogo = OFFICIAL_DIVISION_LOGOS[data.slug];
  const [specimenView, setSpecimenView] = useState<'grid' | 'panorama'>('grid');
  const [activeStep, setActiveStep] = useState<number>(0);
  const isElectricDivision = ['solis', 'sanyog', 'grid-apex'].includes(data.slug);

  const accordionSpecimens = (data.visualCards || []).map((vc, idx) => ({
    id: `${data.slug}-spec-${idx}`,
    title: vc.title,
    subtitle: vc.title,
    badge: vc.badge || vc.imageTag,
    description: vc.description,
    image: vc.image,
    specs: [vc.takeaway, vc.imageTag].filter(Boolean),
    logo: defaultLogo?.darkSrc || defaultLogo?.src,
    division: data.slug,
  }));

  return (
    <main className="grounded-canvas" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Clippy />

      <PageHero
        title={data.laypersonBadge || data.name}
        tagline={data.tagline}
        breadcrumb={data.name}
        statPill={data.statPill}
        heroImage={data.heroImage}
        heroImageTag={data.heroImageTag}
        logo={
          customHeroLogo || (
            <img
              src={defaultLogo?.src || '/images/logos/solis-official.png'}
              alt={defaultLogo?.alt || data.name}
              style={{
                height: `${defaultLogo?.height || 56}px`,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )
        }
      />

      {/* Grounded Operational Mandate Dossier Banner with MicroSlats */}
      <section
        style={{
          padding: '24px 0',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-alt)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <MicroSlats count={16} color="#8C733E" opacity={0.05} zIndex={1} showTicks={true} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '100px',
                background: 'var(--color-accent-pale)',
                color: 'var(--color-accent)',
                fontSize: '0.74rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                border: '1px solid var(--color-border-accent-light)',
              }}
            >
              [<TechText text="OPERATIONAL MANDATE" scrambleSpeed={20} maxScrambles={4} triggerOnHover={true} />]
            </span>
            <p
              style={{
                margin: 0,
                fontSize: '0.98rem',
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                flex: 1,
                minWidth: '280px',
                lineHeight: 1.6,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              {data.plainTakeaway}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Photo Cards Showcase with OptionWheel + AccordionGallery Switcher */}
      {data.visualCards && data.visualCards.length > 0 && (
        <section className="section" style={{ paddingBottom: '30px' }}>
          <div className="container">
            <SectionHeading
              title="Visual Offerings & Real Specimens"
              intro="Authentic real-world specimens and process deliverables so you can clearly see what we execute."
              rightSlot={
                <div className="hidden md:block">
                  <OptionWheel
                    options={[
                      { label: '01 / Specimen Cards', value: 'grid' },
                      { label: '02 / Panorama Accordion', value: 'panorama' },
                    ]}
                    selectedValue={specimenView}
                    onChange={(v) => setSpecimenView(v as 'grid' | 'panorama')}
                  />
                </div>
              }
            />

            {specimenView === 'panorama' ? (
              <div className="hidden md:block">
                <AccordionGallery items={accordionSpecimens} />
              </div>
            ) : null}

            <div
              className={specimenView === 'panorama' ? 'md:hidden' : ''}
              style={{
                display: 'grid',
                gridTemplateColumns:
                  data.visualCards.length === 3
                    ? 'repeat(auto-fit, minmax(320px, 1fr))'
                    : 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '28px',
              }}
            >
              {data.visualCards.map((vc, i) => (
                <ScrollReveal key={vc.title} delay={i + 1}>
                  <ElectricBorder
                    division={data.slug}
                    active={isElectricDivision && i === 0}
                    borderRadius={20}
                    glowColor="#C29F53"
                  >
                    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                        <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: '#C29F53',
                              display: 'inline-block',
                              flexShrink: 0,
                            }}
                          />
                          <span>{vc.imageTag}</span>
                        </div>
                        <ImageWithLightbox
                          src={vc.image}
                          alt={vc.title}
                          title={vc.title}
                          category={vc.badge || vc.imageTag}
                          scope={vc.description}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          {vc.badge && (
                            <div
                              style={{
                                display: 'inline-block',
                                padding: '3px 10px',
                                borderRadius: '100px',
                                background: 'var(--color-accent-pale)',
                                color: 'var(--color-accent)',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                marginBottom: '10px',
                                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                              }}
                            >
                              <TechText text={vc.badge} scrambleSpeed={18} maxScrambles={4} triggerOnHover={true} />
                            </div>
                          )}
                          <h3
                            style={{
                              fontSize: '1.3rem',
                              marginBottom: '8px',
                              color: 'var(--color-text-primary)',
                              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                              fontWeight: 400,
                            }}
                          >
                            {vc.title}
                          </h3>
                          <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px', lineHeight: 1.5, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                            {vc.takeaway}
                          </p>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                            {vc.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ElectricBorder>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strategic Why Us, Why This Discipline, Why Now wrapped in MagicBento */}
      {data.strategicWhy && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title={data.strategicWhy.heading}
              intro={data.strategicWhy.subheading}
            />
            <MagicBento
              cards={[
                data.strategicWhy.whyUs,
                data.strategicWhy.whyDiscipline,
                data.strategicWhy.whyNow,
              ].map((pillar, idx) => ({
                id: `${data.slug}-why-${idx}`,
                badge: `(${String(idx + 1).padStart(2, '0')}) PROTOCOL PILLAR`,
                title: pillar.title,
                subtitle: pillar.subtitle,
                content: (
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '14px 0 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {pillar.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          color: 'var(--color-text-secondary)',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color="var(--color-accent)"
                          style={{ flexShrink: 0, marginTop: '4px' }}
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>
        </section>
      )}

      {/* Plain Words Intro & Glossary */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="grid-split">
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', background: 'var(--color-accent-pale)', borderRadius: '12px', display: 'flex' }}>
                  <Icon size={24} color="var(--color-accent)" />
                </div>
                <span className="label" style={{ margin: 0 }}>In plain words</span>
              </div>
              {data.intro.map((p, i) => (
                <p key={i} style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{p}</p>
              ))}
              {data.notice && (
                <div
                  style={{
                    display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '24px', marginTop: '16px',
                    background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: '16px',
                  }}
                >
                  <AlertTriangle size={24} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '6px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif', fontWeight: 400 }}>{data.notice.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{data.notice.text}</p>
                  </div>
                </div>
              )}
            </ScrollReveal>

            {data.glossary && (
              <ScrollReveal delay={1}>
                <div className="ios-glass-card" style={{ padding: '36px', borderRadius: '24px' }}>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '22px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif', fontWeight: 400 }}>Words you may see</h3>
                  <dl style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {data.glossary.map((g) => (
                      <div key={g.term}>
                        <dt style={{ fontWeight: 600, color: 'var(--color-accent)', fontSize: '0.95rem', marginBottom: '4px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{g.term}</dt>
                        <dd style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{g.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Services List wrapped in MagicBento */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading title={data.servicesTitle} />
          <MagicBento
            cards={data.services.map((s, i) => ({
              id: `${data.slug}-svc-${i}`,
              badge: `(${String(i + 1).padStart(2, '0')}) SCOPE`,
              title: s.title,
              subtitle: s.text,
            }))}
          />
        </div>
      </section>

      {/* Visual Process Steps (How it works) with SvgPathAnimator CAD Flow */}
      <section className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <SectionHeading
            title="How the process works"
            intro="A structured four-step journey designed for clarity, fixed timelines, and zero surprises."
          />

          {/* Single-Line CAD Execution Flow Schematic */}
          <div
            className="hidden md:block mb-6 rounded-2xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(194, 159, 83, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8C733E',
                }}
              >
                [EXECUTION SEQUENCE SCHEMATIC · {data.name.toUpperCase()}]
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#555555',
                }}
              >
                Active Stage: (0{activeStep + 1}) {data.steps[activeStep]?.title}
              </span>
            </div>
            <SvgPathAnimator
              viewBox="0 0 1000 36"
              strokeColor="#C29F53"
              strokeWidth={2}
              duration={2000}
              className="w-full h-9"
              d="M 40 18 L 960 18 M 120 8 L 120 28 M 380 8 L 380 28 M 640 8 L 640 28 M 900 8 L 900 28"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {data.steps.map((s, i) => {
              const isSelected = activeStep === i;
              return (
                <ScrollReveal key={s.title} delay={i + 1}>
                  <ElectricBorder
                    division={data.slug}
                    active={isElectricDivision && isSelected}
                    borderRadius={20}
                    glowColor="#C29F53"
                  >
                    <div
                      onMouseEnter={() => setActiveStep(i)}
                      onClick={() => setActiveStep(i)}
                      className="ios-glass-card cursor-pointer"
                      style={{
                        padding: '32px 26px',
                        height: '100%',
                        position: 'relative',
                        borderRadius: '20px',
                        borderColor: isSelected ? 'rgba(194, 159, 83, 0.5)' : undefined,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: 'var(--color-accent)',
                          marginBottom: '16px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {`(${String(i + 1).padStart(2, '0')})`}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.35rem',
                          marginBottom: '12px',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                          fontWeight: 400,
                          letterSpacing: '-0.015em',
                          lineHeight: 1.25,
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          color: 'var(--color-text-secondary)',
                          fontSize: '0.94rem',
                          lineHeight: 1.65,
                          margin: 0,
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        }}
                      >
                        {s.text}
                      </p>
                    </div>
                  </ElectricBorder>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio & Typical requests */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading title={data.portfolioTitle} intro={data.portfolioIntro} />
          <div className="grid-2-col">
            {data.portfolio.map((item, i) => (
              <ScrollReveal key={item.title} delay={(i % 2) + 1}>
                <div
                  className="ios-glass-card"
                  style={{
                    padding: '36px 32px',
                    height: '100%',
                    borderRadius: '20px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      marginBottom: '16px',
                      background: 'var(--color-accent-pale)',
                      color: 'var(--color-accent)',
                      fontSize: '0.72rem',
                      fontWeight: 650,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      border: '1px solid var(--color-border-accent-light)',
                    }}
                  >
                    <TechText text={item.tag} scrambleSpeed={18} maxScrambles={4} triggerOnHover={true} />
                  </span>
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      marginBottom: '12px',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                      fontWeight: 400,
                      letterSpacing: '-0.015em',
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.96rem',
                      lineHeight: 1.65,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {item.text}
                  </p>
                  {item.levels && (
                    <ul style={{ listStyle: 'none', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {item.levels.map((l) => (
                        <li key={l.label} style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.55, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                          <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{l.label}: </strong>
                          {l.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {data.tiers && (
            <ScrollReveal>
              <h3 style={{ fontSize: '1.5rem', margin: '56px 0 20px 0', color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif', fontWeight: 400 }}>Standard, Premium or Luxury</h3>
              <div className="glass-panel" style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                      {['', 'Standard', 'Premium', 'Luxury'].map((h) => (
                        <th key={h} style={{ padding: '16px 20px', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--color-text-muted)', fontWeight: 700, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.tiers.rows.map((r) => (
                      <tr key={r.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--color-accent)', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{r.label}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{r.standard}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{r.premium}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{r.luxury}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Interactive Print & Packaging Estimator for eMudran */}
      {data.slug === 'emudran' && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title="Interactive Print & Signage Estimator"
              intro="Select your collateral format, quantity tier, and finishing spec to calculate corporate production rates in real time."
            />
            <PrintCalculator />
          </div>
        </section>
      )}

      {/* Interactive Turnkey Interior Cost Estimator for TVASTA */}
      {data.slug === 'tvasta' && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title="Interactive Turnkey Cost Estimator"
              intro="Select your apartment layout or commercial footprint to compute real-time cost benchmarks across Standard, Premium, and Luxury finishing tiers."
            />
            <InteriorCalculator />
          </div>
        </section>
      )}

      {/* People and Accountability */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div className="grid-2-col">
            <div>
              {data.people.length > 0 ? (
                <>
                  <SectionHeading title={data.peopleTitle} intro={data.peopleIntro} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.people.map((group) => (
                      <ScrollReveal key={group.heading}>
                        <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '14px', fontWeight: 600, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                          {group.heading}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {group.members.map((m) => (
                            <div key={m.name} className="ios-glass-card" style={{ padding: '22px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderRadius: '18px' }}>
                              <User size={18} color="var(--color-accent)" style={{ marginTop: '3px', flexShrink: 0 }} />
                              <div>
                                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '1.05rem', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{m.name}</div>
                                <div style={{ color: 'var(--color-accent)', fontSize: '0.88rem', fontWeight: 500, marginTop: '2px', fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{m.role}</div>
                                {m.note && <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', marginTop: '6px', lineHeight: 1.55, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{m.note}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <SectionHeading title={data.peopleTitle || 'Advisory Governance'} />
                  <ScrollReveal>
                    <div className="ios-glass-card" style={{ padding: '32px 28px', borderRadius: '20px' }}>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.75, margin: 0, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                        All advisory files, single line diagrams, and regulatory filings undergo verification by licensed practice directors at One International Centre, Mumbai.
                      </p>
                    </div>
                  </ScrollReveal>
                </>
              )}
            </div>

            <div>
              <SectionHeading title={data.whoDoesTheWork.title} />
              <ScrollReveal>
                <div className="ios-glass-card" style={{ padding: '32px 28px', borderRadius: '20px' }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.75, margin: 0, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
                    {data.whoDoesTheWork.text}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Division-Specific Interactive Module */}
      {children && (
        <section className="section" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="container">
            {children}
          </div>
        </section>
      )}

      {/* Call to Action Card with MicroSlats and SpecularButtons */}
      <section className="section" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
        <div className="container">
          <ScrollReveal>
            <div
              className="ios-glass-card relative overflow-hidden"
              style={{
                borderRadius: '24px',
                padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 48px)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
              }}
            >
              <MicroSlats count={16} color="#8C733E" opacity={0.05} zIndex={1} showTicks={true} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <CheckCircle2 size={32} color="var(--color-accent)" style={{ marginBottom: '18px', display: 'inline-block' }} />
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.6vw, 2.8rem)',
                    marginBottom: '14px',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}
                >
                  Ready to discuss your project?
                </h2>
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 32px auto',
                    lineHeight: 1.7,
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  Reach out with your requirements. We will review what is needed and provide honest, transparent next steps.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {data.actions.map((a, i) => (
                    <SpecularButton
                      key={a.href}
                      href={a.href}
                      variant={i === 0 ? 'dark' : 'light'}
                      icon={i === 0 ? <ArrowRight size={16} /> : undefined}
                    >
                      {a.label}
                    </SpecularButton>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
