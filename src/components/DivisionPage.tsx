"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import ScrollReveal from '@/components/ScrollReveal';
import type { DivisionContent, IconKey } from '@/content/divisions';
import { ImageWithLightbox } from '@/components/ImageLightbox';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import GridApexSubstationCalculator from '@/components/GridApexSubstationCalculator';
import SanyogTariffAuditCalculator from '@/components/SanyogTariffAuditCalculator';
import AgrimDprSimulator from '@/components/AgrimDprSimulator';
import {
  MicroSlats,
  TechText,
  MagicBento,
  AccordionGallery,
  OptionWheel,
  ElectricBorder,
  SvgPathAnimator,
  SpecularButton,
  PatternWaves,
  FluxLines,
  GradientASCII,
  CRTWarp,
} from '@/components/react-bits';
import {
  Plug,
  Sun,
  Layout,
  Printer,
  Landmark,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  User,
  ChevronRight,
} from 'lucide-react';

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
  sanyog: { src: '/images/logos/sanyog-official.png', darkSrc: '/images/logos/sanyog-white.png', alt: 'Sanyog Official Logo', height: 56 },
  'grid-apex': { src: '/images/logos/grid-apex-official.png', darkSrc: '/images/logos/grid-apex-white.png', alt: 'Grid Apex Official Logo', height: 54 },
  tvasta: { src: '/images/logos/tvasta-dark.png', darkSrc: '/images/logos/tvasta-official.png', alt: 'Tvasta Official Logo', height: 56 },
  emudran: { src: '/images/logos/emudran-official.png', darkSrc: '/images/logos/emudran-white.png', alt: 'eMudran Official Logo', height: 54 },
  agrim: { src: '/images/logos/agrim-dark.png', darkSrc: '/images/logos/agrim-official.png', alt: 'Agrim Official Logo', height: 56 },
};

interface DivisionThemeConfig {
  canvasClass: string;
  heroBg: string;
  heroBorder: string;
  dividerColor: string;
  badgeDotColor: string;
  accentColor: string;
  maskGradient: string;
  renderBackground: () => React.ReactNode;
}

const DIVISION_CONFIGS: Record<string, DivisionThemeConfig> = {
  tvasta: {
    canvasClass: 'tvasta-canvas',
    heroBg: '#F8F9FA',
    heroBorder: '1px solid rgba(215, 42, 27, 0.22)',
    dividerColor: '#D72A1B',
    badgeDotColor: '#FFCB72',
    accentColor: '#D72A1B',
    maskGradient:
      'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(248, 249, 250, 0.0) 0%, rgba(248, 249, 250, 0.12) 55%, rgba(248, 249, 250, 0.38) 100%)',
    renderBackground: () => (
      <MicroSlats
        preset="signal"
        color="#D72A1B"
        glintColor="#FFD166"
        backgroundColor="#FAF5F0"
        interactive={true}
        speed={0.85}
        glint={1.2}
        contrast={1.6}
        slatWidth={18}
        slatHeight={64}
        gap={4}
        swirl={0.8}
        trail={0.6}
      />
    ),
  },
  'grid-apex': {
    canvasClass: 'grid-apex-canvas',
    heroBg: '#F0F7FF',
    heroBorder: '1px solid rgba(2, 132, 199, 0.24)',
    dividerColor: '#F59E0B',
    badgeDotColor: '#F59E0B',
    accentColor: '#0284C7',
    maskGradient:
      'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(240, 247, 255, 0.0) 0%, rgba(240, 247, 255, 0.12) 55%, rgba(240, 247, 255, 0.38) 100%)',
    renderBackground: () => (
      <FluxLines
        colors={['#0284C7', '#0EA5E9', '#38BDF8', '#F59E0B', '#2563EB', '#60A5FA']}
        flowDirection="down"
        speed={1.05}
        scale={1.4}
        turbulence={1.15}
        opacity={1.0}
        lightMode={true}
        transparent={true}
        backgroundColor="#F0F7FF"
      />
    ),
  },
  agrim: {
    canvasClass: 'agrim-canvas',
    heroBg: '#F7F9F5',
    heroBorder: '1px solid rgba(4, 120, 87, 0.22)',
    dividerColor: '#D97706',
    badgeDotColor: '#D97706',
    accentColor: '#047857',
    maskGradient:
      'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(247, 249, 245, 0.0) 0%, rgba(247, 249, 245, 0.12) 55%, rgba(247, 249, 245, 0.38) 100%)',
    renderBackground: () => (
      <PatternWaves
        preset="pond"
        wave="ripple"
        color="#047857"
        backgroundColor="#F7F9F5"
        opacity={1.0}
        spacing={8}
        markSize={1.05}
        depth={1.15}
        shine={2.2}
        speed={0.85}
        interactive={true}
      />
    ),
  },
  sanyog: {
    canvasClass: 'sanyog-canvas',
    heroBg: '#F4F6FC',
    heroBorder: '1px solid rgba(44, 94, 212, 0.22)',
    dividerColor: '#F59E0B',
    badgeDotColor: '#2C5ED4',
    accentColor: '#2C5ED4',
    maskGradient:
      'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(244, 246, 252, 0.0) 0%, rgba(244, 246, 252, 0.12) 55%, rgba(244, 246, 252, 0.40) 100%)',
    renderBackground: () => (
      <PatternWaves
        preset="lines"
        color="#2563EB"
        backgroundColor="#F4F6FC"
        opacity={1.0}
        spacing={9}
        markSize={0.75}
        direction={30}
        speed={0.85}
        depth={1.2}
        shine={2.0}
        interactive={true}
      />
    ),
  },
  emudran: {
    canvasClass: 'emudran-canvas',
    heroBg: '#F5F6FA',
    heroBorder: '1px solid rgba(0, 22, 58, 0.22)',
    dividerColor: '#4338CA',
    badgeDotColor: '#4338CA',
    accentColor: '#00163A',
    maskGradient:
      'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(245, 246, 250, 0.0) 0%, rgba(245, 246, 250, 0.12) 55%, rgba(245, 246, 250, 0.38) 100%)',
    renderBackground: () => (
      <CRTWarp
        color="#3730A3"
        backgroundColor="#F5F6FA"
        lightMode={true}
        curvature={0.24}
        scanlineStrength={0.60}
        persistence={0.55}
        speed={0.85}
      />
    ),
  },
  solis: {
    canvasClass: 'solis-canvas',
    heroBg: '#F6F8FF',
    heroBorder: '1px solid rgba(30, 63, 216, 0.20)',
    dividerColor: '#F59E0B',
    badgeDotColor: '#F59E0B',
    accentColor: '#1E3FD8',
    maskGradient:
      'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(246, 248, 255, 0.0) 0%, rgba(246, 248, 255, 0.12) 55%, rgba(246, 248, 255, 0.36) 100%)',
    renderBackground: () => (
      <GradientASCII
        colors={['#1e3fd8', '#2563eb', '#0284c7', '#38bdf8', '#f59e0b', '#fbbf24']}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={13}
        density={1.0}
      />
    ),
  },
};

const DEFAULT_CONFIG: DivisionThemeConfig = {
  canvasClass: 'grounded-canvas',
  heroBg: '#F4F1EA',
  heroBorder: '1px solid rgba(0, 0, 0, 0.10)',
  dividerColor: '#C29F53',
  badgeDotColor: '#C29F53',
  accentColor: '#C29F53',
  maskGradient:
    'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(244, 241, 234, 0.0) 0%, rgba(244, 241, 234, 0.15) 55%, rgba(244, 241, 234, 0.42) 100%)',
  renderBackground: () => (
    <MicroSlats count={20} opacity={0.35} color="rgba(17, 17, 17, 0.65)" showTicks={true} zIndex={1} speed={0.8} />
  ),
};

export default function DivisionPage({
  data,
  customHeroLogo,
  canvasClassName,
  customHeroBackground,
  children,
}: {
  data: DivisionContent;
  customHeroLogo?: React.ReactNode;
  canvasClassName?: string;
  customHeroBackground?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const Icon = divisionIcons[data.icon];
  const defaultLogo = OFFICIAL_DIVISION_LOGOS[data.slug];
  const [specimenView, setSpecimenView] = useState<'grid' | 'panorama'>('grid');
  const [activeStep, setActiveStep] = useState<number>(0);
  const isElectricDivision = ['solis', 'sanyog', 'grid-apex'].includes(data.slug);

  const themeConfig = DIVISION_CONFIGS[data.slug] || DEFAULT_CONFIG;
  const canvasClass = canvasClassName || themeConfig.canvasClass;
  const divisionAccent = themeConfig.accentColor;

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
    <main className={canvasClass} style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Clippy />

      {/* Division High-Tech Hero with Dedicated React Bits WebGL Background */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '136px',
          paddingBottom: '70px',
          backgroundColor: themeConfig.heroBg,
          borderBottom: themeConfig.heroBorder,
          position: 'relative',
        }}
      >
        {/* WebGL Background Layer */}
        <div
          className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: 1 }}
          aria-hidden="true"
        >
          {customHeroBackground || themeConfig.renderBackground()}
          {/* Subtle Crystalline Glass Mask for Perfect Readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: themeConfig.maskGradient,
              pointerEvents: 'none',
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          {/* Breadcrumb */}
          <div
            className="animate-fade-in-up"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} color="var(--color-text-muted)" />
            <Link href="/#divisions" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Divisions
            </Link>
            <ChevronRight size={13} color="var(--color-text-muted)" />
            <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{data.name}</span>
          </div>

          <div
            className="page-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: data.heroImage ? '1.15fr 0.85fr' : '1fr',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                borderRadius: '28px',
                padding: '24px 28px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.45) 100%)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 20px 48px -12px rgba(0, 0, 0, 0.06), inset 0 1.5px 1px rgba(255, 255, 255, 0.95)',
              }}
            >
              {/* Header row with official division logo and discipline title */}
              <div
                className="animate-fade-in-up"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                  marginBottom: '22px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    flexShrink: 0,
                  }}
                >
                  {customHeroLogo || (
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
                  )}
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    width: '2px',
                    height: '44px',
                    backgroundColor: themeConfig.dividerColor,
                    display: 'inline-block',
                    flexShrink: 0,
                    borderRadius: '2px',
                  }}
                />

                <h1
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    fontSize: 'clamp(2rem, 3.4vw, 2.95rem)',
                    margin: 0,
                    fontWeight: 400,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  {data.laypersonBadge || data.name}
                </h1>
              </div>

              <p
                className="animate-fade-in-up delay-200"
                style={{
                  fontSize: 'clamp(1.02rem, 1.6vw, 1.18rem)',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '680px',
                  lineHeight: 1.68,
                  marginBottom: '24px',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                {data.tagline}
              </p>

              {/* Stat badges & pills */}
              <div
                className="animate-fade-in-up delay-300"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {data.statPill && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid var(--color-border-accent)',
                      color: 'var(--color-accent)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        backgroundColor: themeConfig.badgeDotColor,
                        boxShadow: `0 0 8px ${themeConfig.badgeDotColor}`,
                      }}
                    />
                    {data.statPill}
                  </span>
                )}
                {data.plainTakeaway && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--color-accent-pale)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.82rem',
                      fontWeight: 650,
                    }}
                  >
                    {data.plainTakeaway}
                  </span>
                )}
              </div>
            </div>

            {/* Right Hero Image Card */}
            {data.heroImage && (
              <div className="animate-fade-in-up delay-400">
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-xl), 0 0 0 1px var(--color-border)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div style={{ position: 'relative', height: '360px', width: '100%' }}>
                    <ImageWithLightbox
                      src={data.heroImage}
                      alt={data.name}
                      title={`${data.name} : ${data.heroImageTag || data.laypersonBadge}`}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  {data.heroImageTag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(12px)',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '9999px',
                          backgroundColor: themeConfig.badgeDotColor,
                        }}
                      />
                      {data.heroImageTag.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            )}
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
                    glowColor={divisionAccent}
                  >
                    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                        <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: divisionAccent,
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
              border: '1px solid var(--color-border)',
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
                  color: 'var(--color-accent)',
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
              strokeColor={divisionAccent}
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
                    glowColor={divisionAccent}
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
                        borderColor: isSelected ? 'var(--color-border-accent)' : undefined,
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

      {/* Interactive HT Substation & Sizing Calculator for Grid Apex */}
      {data.slug === 'grid-apex' && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title="Interactive HT Substation & APFC Sizing Engine"
              intro="Simulate connected industrial demand, incomer voltage level, and uncorrected power factor to compute recommended transformer ratings, APFC capacitor bank sizing, and demand penalty reversals."
            />
            <GridApexSubstationCalculator />
          </div>
        </section>
      )}

      {/* Interactive Utility Tariff Audit & CGRF Claim Calculator for Sanyog */}
      {data.slug === 'sanyog' && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title="Interactive Utility Tariff & Grievance Claim Estimator"
              intro="Calculate monthly power factor surcharges, wrong tariff slab financial exposure, and compute 24-month retroactive refund claims recoverable before the Consumer Grievance Redressal Forum (CGRF)."
            />
            <SanyogTariffAuditCalculator />
          </div>
        </section>
      )}

      {/* Interactive EV & Agro Infrastructure DPR Simulator for Agrim */}
      {data.slug === 'agrim' && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title="Interactive Infrastructure CAPEX & DSCR Bankability Simulator"
              intro="Assemble bankable techno-economic feasibility models for commercial EV charging plazas and agro-cold chain infrastructure. Test project cashflows, bank DSCR benchmarks, and statutory subsidies."
            />
            <AgrimDprSimulator />
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
              <MicroSlats count={16} color={divisionAccent} opacity={0.05} zIndex={1} showTicks={true} />
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
