"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import StudioCADViewer from '@/components/StudioCADViewer';
import { ArrowUpRight, MapPin, Phone, Mail, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';
import {
  MagicBento,
  FlexCarousel,
  InfiniteSpiral,
  LineSidebar,
  TechText,
  ElectricBorder,
} from '@/components/react-bits';
import type { LineSidebarItem } from '@/components/react-bits';

const CAPABILITIES_CARDS = [
  {
    id: 'bento-solis',
    title: 'SOLIS Clean Energy',
    subtitle: 'Walkable Pergola & Rooftop Solar EPC',
    badge: 'Solar Architecture',
    colSpan: 2 as const,
    content: (
      <div className="flex flex-col gap-2 text-xs text-[#C9D1D9]">
        <p>10.5 ft elevated hot-dip galvanized pergolas that preserve 100% usable terrace space while harvesting peak Mumbai sunlight.</p>
        <span className="font-semibold text-[#F5D78E]">101 Bi-Facial PERC Modules | PM Surya Ghar Subsidy Liaisoning</span>
      </div>
    ),
  },
  {
    id: 'bento-sanyog',
    title: 'SANYOG Regulatory',
    subtitle: 'Utility Liaisoning & CGRF Legal Advocacy',
    badge: '36-Yr Utility Practice',
    colSpan: 1 as const,
    content: (
      <div className="flex flex-col gap-2 text-xs text-[#C9D1D9]">
        <p>High-friction MERC billing audits, sanctioned load releases, and consumer grievance representation across BEST, AEML, Tata Power, and MSEDCL.</p>
      </div>
    ),
  },
  {
    id: 'bento-grid',
    title: 'GRID APEX Engineering',
    subtitle: '33kV Substations & SF6 Switchgear',
    badge: 'Heavy Industrial',
    colSpan: 1 as const,
    content: (
      <div className="flex flex-col gap-2 text-xs text-[#C9D1D9]">
        <p>1600 kVA transformer bays, vacuum circuit breakers, busbar trunking, and PWD electrical inspectorate compliance clearances.</p>
      </div>
    ),
  },
  {
    id: 'bento-tvasta',
    title: 'TVASTA Architecture',
    subtitle: 'Turnkey Space Planning & Fit-Outs',
    badge: 'Three-Tier Delivery',
    colSpan: 2 as const,
    content: (
      <div className="flex flex-col gap-2 text-xs text-[#C9D1D9]">
        <p>Comprehensive turnkey civil, electrical, plumbing, and carpentry execution under one desk across Standard, Premium, and Luxury tiers.</p>
        <span className="font-semibold text-[#F5D78E]">Acoustic STC 52 Boardrooms | Book-Matched Marble & Veneers</span>
      </div>
    ),
  },
  {
    id: 'bento-emudran',
    title: 'eMudran Packaging',
    subtitle: 'Tactile Rigid Boxes & Offset Press',
    badge: 'Brand Identity',
    colSpan: 2 as const,
    content: (
      <div className="flex flex-col gap-2 text-xs text-[#C9D1D9]">
        <p>Led by veteran FMCG Art Director Manish Ajgaonkar. Thermal micro-embossed foil packaging, custom rigid presentation boxes, and outdoor corporate signage.</p>
      </div>
    ),
  },
  {
    id: 'bento-agrim',
    title: 'AGRIM Financial Advisory',
    subtitle: 'Project Finance & Bank Loan DPRs',
    badge: 'Non-Lender Advisory',
    colSpan: 1 as const,
    content: (
      <div className="flex flex-col gap-2 text-xs text-[#C9D1D9]">
        <p>Statutory project finance file assembly, bank credit syndication DPRs, and patented zero-energy solid waste tech feasibility dossiers.</p>
      </div>
    ),
  },
];

const FEASIBILITY_ITEMS = [
  {
    id: 'f1',
    content: (
      <div className="ios-glass-card rounded-2xl flex flex-col justify-between h-[360px] w-[340px] p-7">
        <div>
          <span
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#C29F53',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            [SOLIS SOLAR EPC DOSSIER]
          </span>
          <h4
            style={{
              fontSize: '1.4rem',
              lineHeight: 1.25,
              fontWeight: 400,
              color: '#FFFFFF',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Suburban CHS Walkable Rooftop Pergola
          </h4>
          <p
            style={{
              fontSize: '0.92rem',
              color: '#C9D1D9',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            55.55 kWp technical proposal framework. 10.5 ft elevated canopy preserving 100% usable terrace space with net metering modeling with AEML.
          </p>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              color: '#8B949E',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Status: Feasibility Study
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#F5D78E',
              fontWeight: 600,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            55.55 kWp
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'f2',
    content: (
      <div className="ios-glass-card rounded-2xl flex flex-col justify-between h-[360px] w-[340px] p-7">
        <div>
          <span
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#C29F53',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            [GRID APEX HT SCHEMATIC]
          </span>
          <h4
            style={{
              fontSize: '1.4rem',
              lineHeight: 1.25,
              fontWeight: 400,
              color: '#FFFFFF',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            33kV Substation &amp; Switchgear Bay
          </h4>
          <p
            style={{
              fontSize: '0.92rem',
              color: '#C9D1D9',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            1600 kVA step-down transformer technical schematics, vacuum circuit breakers, and statutory PWD inspection compliance drawings.
          </p>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              color: '#8B949E',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Status: In-Design Schematic
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#F5D78E',
              fontWeight: 600,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            1600 kVA
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'f3',
    content: (
      <div className="ios-glass-card rounded-2xl flex flex-col justify-between h-[360px] w-[340px] p-7">
        <div>
          <span
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#C29F53',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            [eMUDRAN LUXURY PROTOTYPE]
          </span>
          <h4
            style={{
              fontSize: '1.4rem',
              lineHeight: 1.25,
              fontWeight: 400,
              color: '#FFFFFF',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Thermal Foil Rigid Presentation Box
          </h4>
          <p
            style={{
              fontSize: '0.92rem',
              color: '#C9D1D9',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Registered micro-embossed gold thermal foil with structural greyboard die-cuts and magnetic closures for luxury corporate editions.
          </p>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              color: '#8B949E',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Status: Structural Specimen
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#F5D78E',
              fontWeight: 600,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            1200 GSM
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'f4',
    content: (
      <div className="ios-glass-card rounded-2xl flex flex-col justify-between h-[360px] w-[340px] p-7">
        <div>
          <span
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#C29F53',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            [AGRIM CLEANTECH MODEL]
          </span>
          <h4
            style={{
              fontSize: '1.4rem',
              lineHeight: 1.25,
              fontWeight: 400,
              color: '#FFFFFF',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Zero-Energy Solid Waste Feasibility Model
          </h4>
          <p
            style={{
              fontSize: '0.92rem',
              color: '#C9D1D9',
              lineHeight: 1.65,
              margin: 0,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Comprehensive 25-year CAPEX, NPV, and Payback mathematical models for MPCB-certified patented waste decomposition units.
          </p>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              color: '#8B949E',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Status: Project Economics
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#F5D78E',
              fontWeight: 600,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            25-Yr CAPEX
          </span>
        </div>
      </div>
    ),
  },
];

const SIDEBAR_ITEMS: LineSidebarItem[] = [
  { id: 'coordinates', label: 'Headquarters Coordinates', tag: '01' },
  { id: 'capabilities', label: 'Consortium Capabilities', tag: '02' },
  { id: 'leadership', label: 'Executive Leadership', tag: '03' },
  { id: 'feasibility', label: 'Feasibility Dockets', tag: '04' },
];

export default function StudioPage() {
  const [activeSection, setActiveSection] = useState('coordinates');

  useEffect(() => {
    const sectionIds = ['coordinates', 'capabilities', 'leadership', 'feasibility'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (top <= scrollPos) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -105;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="studio-canvas relative min-h-screen">
      <Navbar />
      <Clippy />

      {/* Mobile / Tablet Horizontal Sticky Quick Switcher */}
      <div
        className="xl:hidden sticky top-20 z-30 px-4 py-2.5 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar"
        style={{
          background: 'rgba(11, 14, 20, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeSection === item.id
                ? 'bg-[#C29F53] text-[#0B0E14] font-semibold shadow-xs'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="font-mono text-[10px] opacity-75 mr-1.5">{item.tag}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(194, 159, 83, 0.08) 0%, transparent 60%), #0B0E14',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* InfiniteSpiral Canvas with Contrast Scrims */}
        <div
          aria-hidden="true"
          className="absolute right-[-80px] top-[-40px] md:right-8 md:top-8 pointer-events-none opacity-45 md:opacity-65 z-0"
          style={{
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
          }}
        >
          <InfiniteSpiral color="#C29F53" size={460} speed={0.005} />
        </div>

        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="metric-pill">
              <span className="w-2 h-2 rounded-full bg-[#C29F53] animate-pulse" />
              <span className="font-mono tracking-wider text-[11px] uppercase">One International Centre // Mumbai</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#C9D1D9] font-mono">
              <Compass size={13} className="text-[#C29F53]" />
              <span>19.0069° N, 72.8311° E</span>
            </div>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              color: '#FFFFFF',
            }}
          >
            The Studio &amp; <span style={{ fontStyle: 'italic', color: '#F5D78E' }}>Engineering Practice.</span>
          </h1>

          <div className="mb-6 max-w-[820px]">
            <TechText
              text="ONE INTERNATIONAL CENTRE // TOWER 2 // UNITS 801-802 // 2,280 SQ FT PRACTICE"
              className="font-mono text-xs tracking-wider text-[#C29F53]"
              style={{ letterSpacing: '0.12em' }}
            />
          </div>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
              color: '#C9D1D9',
              maxWidth: '820px',
              lineHeight: 1.65,
              margin: '0 0 32px 0',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 300,
            }}
          >
            JC Apex Ventures operates from One International Centre, Mumbai. We unite three decades of utility network engineering with world-class creative brand direction to deliver turnkey field execution.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginTop: '24px' }}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MapPin size={16} />
              <span>Open Studio in Google Maps</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="tel:+917021112664"
              className="btn-outline"
            >
              <Phone size={15} />
              <span>Call +91 70211 12664</span>
            </a>
          </div>
        </div>
      </section>

      {/* Studio Workspace Container: Stationary Sticky LineSidebar Rail + 4 Main Sections */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-10 py-16">
        <div className="xl:flex xl:gap-12 xl:items-start">
          {/* Desktop Sticky LineSidebar Rail */}
          <aside
            aria-label="Studio Navigation"
            className="hidden xl:block w-64 shrink-0 sticky top-28 z-30"
          >
            <div
              className="p-3.5 rounded-2xl obsidian-card"
              style={{
                background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.90) 0%, rgba(13, 17, 26, 0.95) 100%)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.65), inset 0 1.5px 1px rgba(255, 255, 255, 0.14)',
              }}
            >
              <div className="px-3 pt-2 pb-1.5 text-[10px] font-mono tracking-widest text-[#C29F53] uppercase border-b border-white/10 mb-2">
                Studio Navigation
              </div>
              <LineSidebar
                items={SIDEBAR_ITEMS}
                activeId={activeSection}
                onSelect={scrollToSection}
                variant="dark"
              />
            </div>
          </aside>

          {/* Right Column: 4 Main Studio Sections */}
          <div className="flex-1 min-w-0 flex flex-col gap-28">
            {/* 1. Studio Location & Interactive CAD Blueprint */}
            <section
              id="coordinates"
              className="relative scroll-mt-28"
            >
              <div>
                <div className="mb-10">
                  <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C29F53]">
                      [01 / headquarters coordinates &amp; architectural cad]
                    </span>
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                      lineHeight: 1.15,
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      margin: '0 0 16px 0',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    }}
                  >
                    Headquarters at One International Centre.
                  </h2>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      color: '#C9D1D9',
                      lineHeight: 1.6,
                      maxWidth: '840px',
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    Located along Senapati Bapat Marg in Elphinstone / Prabhadevi, our studio places engineering consultants, architectural draftsmen, and account executives in the heart of Mumbai commercial infrastructure.
                  </p>
                </div>

                {/* Interactive CAD Floor Plan Blueprint Component */}
                <div className="mb-14">
                  <StudioCADViewer />
                </div>

                {/* Location Info Card & Building Photograph */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px',
                    alignItems: 'center',
                  }}
                >
                  <div className="ios-glass-card rounded-2xl p-7 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-[#C29F53]/15 border border-[#C29F53]/30 text-[#C29F53] shrink-0">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-[#C29F53] mb-1">
                          PHYSICAL PRACTICE FACILITY
                        </div>
                        <h3
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: 400,
                            color: '#FFFFFF',
                            margin: '0 0 8px 0',
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                          }}
                        >
                          One International Centre, Tower 2
                        </h3>
                        <p className="text-sm text-[#C9D1D9] leading-relaxed m-0">
                          Units 801-802, 8th Floor, Senapati Bapat Marg,<br />
                          Elphinstone / Prabhadevi, Mumbai 400013, Maharashtra, India.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 mb-6 text-xs font-mono text-[#8B949E]">
                      <div>
                        <span className="block text-[#C29F53] font-semibold mb-0.5">LATITUDE / LONGITUDE</span>
                        <span>19.0069° N, 72.8311° E</span>
                      </div>
                      <div>
                        <span className="block text-[#C29F53] font-semibold mb-0.5">SURFACE FOOTPRINT</span>
                        <span>2,280 sq ft (Dual Units)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span>Navigate via Google Maps</span>
                        <ArrowUpRight size={14} />
                      </a>
                      <a
                        href="tel:+917021112664"
                        className="btn-outline"
                      >
                        <Phone size={14} />
                        <span>Direct Desk</span>
                      </a>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative h-[420px]"
                  >
                    <img
                      src="/images/one-international-centre.jpg"
                      alt="One International Centre Mumbai Studio"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-80"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(11, 14, 20, 0.85)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: '#C29F53', letterSpacing: '0.08em' }}>
                          [CONSULTATIVE DESK]
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 500, color: '#F0F3F6' }}>
                          Consultation by Prior Appointment
                        </div>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#8B949E', fontFamily: 'monospace' }}>
                        Mon - Sat 10:00 - 18:30 IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. MagicBento: Consortium Capabilities */}
            <section
              id="capabilities"
              className="relative scroll-mt-28"
            >
              <div>
                <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C29F53]">
                    [02 / consortium capabilities &amp; bento]
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                    lineHeight: 1.15,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    margin: '0 0 16px 0',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  Consortium Engineering Capabilities
                </h2>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#C9D1D9',
                    lineHeight: 1.6,
                    maxWidth: '820px',
                    margin: '0 0 40px 0',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  Interactive capabilities architecture spanning clean power, high-voltage distribution, commercial interiors, and packaging engineering.
                </p>

                <MagicBento cards={CAPABILITIES_CARDS} />
              </div>
            </section>

            {/* 3. Leadership Dossiers */}
            <section
              id="leadership"
              className="relative scroll-mt-28"
            >
              <div>
                <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C29F53]">
                    [03 / executive leadership &amp; directorship]
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                    lineHeight: 1.15,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    margin: '0 0 16px 0',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  Executive Leadership &amp; Practice Directors
                </h2>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#C9D1D9',
                    lineHeight: 1.6,
                    maxWidth: '820px',
                    margin: '0 0 50px 0',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  Every division is led by field practitioners with verified operational histories, not theoretical managers.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '28px',
                  }}
                >
                  {/* Director 1: Jitendra Chavan */}
                  <ElectricBorder
                    color="#C29F53"
                    glowColor="rgba(194, 159, 83, 0.35)"
                    borderRadius={18}
                    duration={5.0}
                  >
                    <div className="ios-glass-card rounded-2xl p-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-mono text-[11px] uppercase text-[#C29F53] tracking-widest font-semibold">
                            [FOUNDER &amp; TECHNICAL DIRECTOR]
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            Active Field Practice
                          </span>
                        </div>
                        <h3
                          style={{
                            fontSize: '1.65rem',
                            fontWeight: 400,
                            color: '#FFFFFF',
                            margin: '0 0 8px 0',
                            fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                          }}
                        >
                          Jitendra Chavan
                        </h3>
                        <div className="mb-3">
                          <TechText
                            text="MERC TARIFF REGULARIZATION // 36+ YRS DIRECT UTILITY DESK"
                            className="font-mono text-[10.5px] text-[#F5D78E]"
                          />
                        </div>
                        <p className="text-sm text-[#C9D1D9] leading-relaxed mb-6">
                          Over three decades of service inside Mumbai electrical distribution grids. Specializes in statutory MERC tariff compliance, CGRF consumer grievance advocacy, high-tension substation commissioning, and elevated solar pergola structures. Direct working background across BEST, Adani Electricity (AEML), Tata Power (TPCL), and MSEDCL.
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap pt-4 border-t border-white/10">
                        <span className="badge-tag">MERC Tariff Regularization</span>
                        <span className="badge-tag">CGRF Advocacy</span>
                        <span className="badge-tag">HT/LT Engineering</span>
                      </div>
                    </div>
                  </ElectricBorder>

                  {/* Director 2: Manish Ajgaonkar */}
                  <div className="ios-glass-card rounded-2xl p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono text-[11px] uppercase text-[#C29F53] tracking-widest font-semibold">
                          [CREATIVE DIRECTOR &amp; BRAND VISIONARY]
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-[#C9D1D9]">
                          FMCG Art Direction
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.65rem',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          margin: '0 0 8px 0',
                          fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        }}
                      >
                        Mr. Manish Ajgaonkar
                      </h3>
                      <div className="mb-3">
                        <TechText
                          text="FMCG ART DIRECTION // SAMSONITE / GO CHEESE / CITROEN / VADILAL"
                          className="font-mono text-[10.5px] text-[#F5D78E]"
                        />
                      </div>
                      <p className="text-sm text-[#C9D1D9] leading-relaxed mb-6">
                        Celebrated Creative Director behind iconic Indian and global brands, including Go Cheese, Gowardhan Pure Cow Ghee, Vadilal Ice-creams, Citroën India, Kaya Skin Clinic, Samsonite Luggage, Complan, and Club Mahindra campaigns. Leads eMudran visual identity desk and structural packaging engineering.
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap pt-4 border-t border-white/10">
                      <span className="badge-tag">FMCG Packaging</span>
                      <span className="badge-tag">Identity Systems</span>
                      <span className="badge-tag">Art Direction</span>
                    </div>
                  </div>

                  {/* Director 3: Dr. Manoj Chavan & Mahendra Kabnurkar */}
                  <div className="ios-glass-card rounded-2xl p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono text-[11px] uppercase text-[#C29F53] tracking-widest font-semibold">
                          [PATENTED ENVIRONMENTAL TECH]
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0284C7]/15 border border-[#0284C7]/30 text-[#38BDF8]">
                          Central Govt Patent
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.65rem',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          margin: '0 0 8px 0',
                          fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        }}
                      >
                        Dr. Manoj Chavan &amp; Mahendra Kabnurkar
                      </h3>
                      <div className="mb-3">
                        <TechText
                          text="MPCB CERTIFIED // 25-YEAR ZERO EXTERNAL ENERGY SOLID WASTE PATENT"
                          className="font-mono text-[10.5px] text-[#F5D78E]"
                        />
                      </div>
                      <p className="text-sm text-[#C9D1D9] leading-relaxed mb-6">
                        Inventors and co-developers of the patented zero-power thermal degradation technology certified by the Maharashtra Pollution Control Board (MPCB). Processes unsegregated municipal and industrial solid waste with zero petrol, diesel, or external electricity, converting mass to 4% ash for paver blocks and 350°C green coal.
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap pt-4 border-t border-white/10">
                      <span className="badge-tag">Central Govt Patent</span>
                      <span className="badge-tag">MPCB Certified</span>
                      <span className="badge-tag">Zero External Energy</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. FlexCarousel: Feasibility Proposals & Technical Schematics */}
            <section
              id="feasibility"
              className="relative scroll-mt-28"
            >
              <div>
                <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C29F53]">
                    [04 / technical schematics &amp; feasibility dockets]
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                    lineHeight: 1.15,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    margin: '0 0 16px 0',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  Engineering Feasibility Studies &amp; Dockets
                </h2>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#C9D1D9',
                    lineHeight: 1.6,
                    maxWidth: '820px',
                    margin: '0 0 40px 0',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  All non-commissioned projects are transparently documented as engineering feasibility studies and technical proposal frameworks.
                </p>

                <FlexCarousel items={FEASIBILITY_ITEMS} gap={24} />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Engineering Manifesto */}
      <section className="relative py-24 px-6" style={{ background: '#0B0E14' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div className="eye-brow-container" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C29F53]">
              [the engineering manifesto]
            </span>
          </div>

          <blockquote
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)',
              lineHeight: 1.35,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#FFFFFF',
              margin: '0 0 28px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            &quot;In Mumbai, physics meets policy. A rooftop is not just square footage: it is a high-wind structural envelope governed by municipal setbacks and DISCOM tariff classes. Our practice exists to turn intricate statutory boundaries into executed, lasting reality.&quot;
          </blockquote>

          <div
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.88rem',
              color: '#C29F53',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            JC Apex Ventures (OPC) Private Limited
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
