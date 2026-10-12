"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import SpotlightCard from '@/components/SpotlightCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import {
  Plug,
  Sun,
  Layout,
  Printer,
  Landmark,
  Zap,
  ArrowRight,
  Shield,
  FileCheck2,
  Users2,
  CheckCircle2,
  Phone,
  Mail,
  Sparkles,
  Building2,
  Layers,
  Award
} from 'lucide-react';
import { divisions } from '@/content/divisions';

// D3 canvas is client-only
const NetworkGraph = dynamic(() => import('@/components/NetworkGraph'), { ssr: false });

const divisionIcons = {
  plug: Plug,
  sun: Sun,
  layout: Layout,
  printer: Printer,
  landmark: Landmark,
  zap: Zap,
};

export default function Home() {
  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Clippy />

      {/* ===== CINEMATIC FULL-WIDTH EDITORIAL HERO ===== */}
      <section
        style={{
          minHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FBFBFA 0%, #F6F4EE 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <NetworkGraph />

        {/* Ambient warm gradient & architectural image watermark */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '48%', zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'url(/images/hero-architectural-facade.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          maskImage: 'linear-gradient(to right, transparent, black 60%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 60%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 65% 55% at 25% 45%, rgba(194,159,83,0.08) 0%, transparent 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '130px', paddingBottom: '70px' }}>
          <div style={{ maxWidth: '860px' }}>
            <div className="animate-fade-in-up label" style={{ marginBottom: '22px' }}>
              <span className="label-dot" />
              CIN: U70200MH2023OPC411326 | MCA Registered, Government of India
            </div>

            <h1
              className="animate-fade-in-up delay-100"
              style={{
                fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                lineHeight: 1.12,
                marginBottom: '22px',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Engineering, utility paperwork, design and business support in Mumbai.
            </h1>

            <p
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: 'clamp(1.08rem, 1.8vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                marginBottom: '32px',
                maxWidth: '720px',
                lineHeight: 1.7,
              }}
            >
              JC Apex Ventures brings together six focused divisions to help housing societies, businesses and homeowners get things done without running between separate middlemen.
            </p>

            {/* Interactive metric pills */}
            <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <div className="metric-pill">
                <Award size={15} color="var(--color-accent)" />
                36+ Years Utility Experience
              </div>
              <div className="metric-pill">
                <Layers size={15} color="var(--color-accent)" />
                6 Focused Divisions
              </div>
              <div className="metric-pill">
                <CheckCircle2 size={15} color="var(--color-accent)" />
                100% Document Transparency
              </div>
              <div className="metric-pill">
                <Building2 size={15} color="var(--color-accent)" />
                One Accountable Desk
              </div>
            </div>

            <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#divisions" className="btn-primary">
                <span>Explore the six divisions <ArrowRight size={18} /></span>
              </a>
              <a href="tel:+917021112664" className="btn-outline">
                <Phone size={16} color="var(--color-accent)" /> Call +91 70211 12664
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVISION QUICK STRIP ===== */}
      <section style={{ padding: '24px 0', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1.8px', fontWeight: 700 }}>
              Quick Navigation:
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {divisions.map((div, i) => {
                const IconComponent = divisionIcons[div.icon];
                return (
                  <Link key={i} href={div.href} style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '100px',
                    background: div.slug === 'solis' ? 'var(--color-accent-pale)' : '#FFFFFF',
                    border: div.slug === 'solis' ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                    color: div.slug === 'solis' ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    fontSize: '0.86rem', fontWeight: 600,
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}>
                    <IconComponent size={14} color="var(--color-accent)" />
                    {div.name === 'SOLIS' ? 'Solis (Solar & EV)' : div.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOMEPAGE DIVISIONS BENTO GRID ===== */}
      <section id="divisions" className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Curated Division Showcase
              </div>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                Our six specialized divisions
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Designed for direct skimmability. Every division pairs authentic photography with a one-sentence plain English breakdown, key stat metrics, and vetted associates.
              </p>
            </div>
          </ScrollReveal>

          {/* BENTO GRID */}
          <div className="bento-grid" style={{ marginBottom: '40px' }}>
            
            {/* 1. SOLIS - HERO BENTO CARD (Span 8) */}
            <div className="bento-col-8">
              <ScrollReveal delay={1}>
                <Link href="/solis" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <SpotlightCard style={{ height: '100%' }}>
                    <div style={{ position: 'relative', height: '300px', width: '100%', overflow: 'hidden' }}>
                      <div className="editorial-pill">
                        Representative Pergola Array
                      </div>
                      <img
                        src="/images/solar-pergola-rooftop.jpg"
                        alt="Solis Rooftop Pergola Solar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', bottom: 16, left: 16, right: 16,
                        display: 'flex', gap: '8px', flexWrap: 'wrap'
                      }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                          padding: '5px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                          color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                          Walkable Terrace Architecture
                        </span>
                        <span style={{
                          background: 'rgba(20, 23, 26, 0.85)', backdropFilter: 'blur(8px)',
                          padding: '5px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600,
                          color: '#FFFFFF'
                        }}>
                          Save up to 90% Power Bills
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            Division 01 • Clean Energy EPC
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            SOLIS
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '10px', color: 'var(--color-text-primary)' }}>
                          Solis: Solar Rooftop Pergolas, BIPV Glass & EV Charging
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '20px' }}>
                          Get clean rooftop solar without losing your terrace: our elevated pergolas generate power overhead while keeping walking and gathering space completely open for residents.
                        </p>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                          {['Elevated Pergolas', 'Zero Terrace Loss', 'BIPV Glass', 'EV Charging', 'Net-Metering'].map((t) => (
                            <span key={t} style={{
                              padding: '4px 10px', borderRadius: '6px', background: 'var(--color-bg-alt)',
                              fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.92rem' }}>
                        Open Solis Hub, System Specs & Solar Calculator <ArrowRight size={16} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            </div>

            {/* 2. SANYOG - UTILITY LIAISON (Span 4) */}
            <div className="bento-col-4">
              <ScrollReveal delay={2}>
                <Link href="/sanyog" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <SpotlightCard style={{ height: '100%' }}>
                    <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                      <div className="editorial-pill">
                        Mumbai Utility Distribution Network
                      </div>
                      <img
                        src="/images/utility-power-grid.jpg"
                        alt="Sanyog Utility Liaison"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                          padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                          color: 'var(--color-accent)', textTransform: 'uppercase'
                        }}>
                          36+ Yrs Experience
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            Division 02 • Liaisoning
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>SANYOG</span>
                        </div>
                        <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                          SANYOG: Utility Paperwork & Licences
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                          We handle the electricity companies (BEST, Adani, Tata Power, MSEDCL) and government paperwork so you never have to stand in queues or chase officers.
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {['BEST / AEML / Tata', 'Bill Dispute', 'CGRF Filing', 'PWD Licences'].map((t) => (
                            <span key={t} style={{
                              padding: '3px 8px', borderRadius: '6px', background: 'var(--color-bg-alt)',
                              fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.88rem' }}>
                        View utility liaisoning services <ArrowRight size={14} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            </div>

            {/* 3. GRID APEX - ELECTRICAL & WASTE TECH (Span 4) */}
            <div className="bento-col-4">
              <ScrollReveal delay={3}>
                <Link href="/grid-apex" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <SpotlightCard style={{ height: '100%' }}>
                    <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                      <div className="editorial-pill">
                        HT Substation & Transformer Setup
                      </div>
                      <img
                        src="/images/electrical-substation.jpg"
                        alt="Grid Apex Electrical Engineering"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                          padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                          color: 'var(--color-accent)', textTransform: 'uppercase'
                        }}>
                          HT/LT Licenced
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            Division 03 • Engineering
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>GRID APEX</span>
                        </div>
                        <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                          GRID APEX: HT/LT Electrical & Waste Tech
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                          Turnkey electrical installations from high-voltage transformers and power distribution boards to innovative zero-energy solid waste disposal machines.
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {['HT Substations', 'Transformers', 'Switchgear', 'Waste Tech'].map((t) => (
                            <span key={t} style={{
                              padding: '3px 8px', borderRadius: '6px', background: 'var(--color-bg-alt)',
                              fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.88rem' }}>
                        View electrical & waste tech <ArrowRight size={14} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            </div>

            {/* 4. TVASTA - INTERIORS & FIT-OUT (Span 4) */}
            <div className="bento-col-4">
              <ScrollReveal delay={4}>
                <Link href="/tvasta" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <SpotlightCard style={{ height: '100%' }}>
                    <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                      <div className="editorial-pill">
                        Architectural Fit-out Specimen
                      </div>
                      <img
                        src="/images/architectural-interior.jpg"
                        alt="Tvasta Architectural Interiors"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                          padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                          color: 'var(--color-accent)', textTransform: 'uppercase'
                        }}>
                          Architect-Led
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            Division 04 • Interiors
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TVASTA</span>
                        </div>
                        <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                          TVASTA: Architectural Interiors & Fit-outs
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                          Thoughtful space planning, 3D layouts, and luxury turnkey interior contracting for corporate offices and upscale residences with fixed timelines.
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {['Space Planning', 'Turnkey Fit-out', 'Modular Woodwork', '3D Layouts'].map((t) => (
                            <span key={t} style={{
                              padding: '3px 8px', borderRadius: '6px', background: 'var(--color-bg-alt)',
                              fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.88rem' }}>
                        View interior design tiers <ArrowRight size={14} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            </div>

            {/* 5. eMUDRAN - BRANDING & LUXURY PRINT (Span 4) */}
            <div className="bento-col-4">
              <ScrollReveal delay={5}>
                <Link href="/emudran" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <SpotlightCard style={{ height: '100%' }}>
                    <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                      <div className="editorial-pill">
                        Embossed Corporate Stationery Specimen
                      </div>
                      <img
                        src="/images/luxury-print-packaging.jpg"
                        alt="eMudran Luxury Print and Packaging"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                          padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                          color: 'var(--color-accent)', textTransform: 'uppercase'
                        }}>
                          Direct Press Supervision
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            Division 05 • Print & Brand
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>eMUDRAN</span>
                        </div>
                        <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                          eMUDRAN: Branding, Packaging & 3D Signage
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                          High-end embossed stationery, luxury packaging, illuminated 3D signage, and corporate print materials crafted under hands-on production supervision.
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {['Luxury Embossing', 'Stationery', 'Packaging', '3D Signage'].map((t) => (
                            <span key={t} style={{
                              padding: '3px 8px', borderRadius: '6px', background: 'var(--color-bg-alt)',
                              fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.88rem' }}>
                        View print specs & estimate rates <ArrowRight size={14} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            </div>

            {/* 6. AGRIM - PROJECT FINANCE DOSSIERS (Span 12) */}
            <div className="bento-col-12">
              <ScrollReveal delay={6}>
                <Link href="/agrim" style={{ display: 'block', textDecoration: 'none' }}>
                  <SpotlightCard contentStyle={{
                    display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) 1fr',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'relative', minHeight: '260px' }}>
                      <div className="editorial-pill">
                        Project Finance Feasibility Binder
                      </div>
                      <img
                        src="/images/project-finance-binder.jpg"
                        alt="Agrim Project Finance Paperwork"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                          padding: '4px 12px', borderRadius: '100px', fontSize: '0.74rem', fontWeight: 700,
                          color: 'var(--color-accent)', textTransform: 'uppercase'
                        }}>
                          Institutional Grade Files
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            Division 06 • Project Finance Paperwork (Not a Lender)
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>AGRIM</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--color-text-primary)' }}>
                          AGRIM: Bank-Ready Project Reports & Loan File Preparation
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '16px' }}>
                          We compile institutional-grade project reports, cash-flow models, and regulatory clearance binders so banks and investors can evaluate your solar, electrical or fit-out project without delays. Every decision is made by your chosen lender.
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                          {['DPR Preparation', 'CMA Data & Cash Flow', 'Statutory Permissions Order', 'Technical Feasibility'].map((t) => (
                            <span key={t} style={{
                              padding: '4px 10px', borderRadius: '6px', background: 'var(--color-bg-alt)',
                              fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.92rem' }}>
                        Learn how AGRIM prepares bank dossiers <ArrowRight size={16} />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE BEFORE/AFTER SHOWCASE ===== */}
      <section className="section" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Interactive Terrace Comparison
              </div>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', marginBottom: '14px', color: 'var(--color-text-primary)' }}>
                Traditional Rooftop Solar vs Solis Walkable Pergola
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                See why housing societies and homeowners choose elevated pergolas: generate clean electricity overhead without sacrificing walking or recreation space on your terrace.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <BeforeAfterSlider
              beforeImage="/images/solar-rooftop-array.jpg"
              afterImage="/images/solar-pergola-rooftop.jpg"
              beforeLabel="Traditional Cluttered Roof"
              afterLabel="Solis Walkable Pergola"
              beforeBadge="Floor Obstructed"
              afterBadge="100% Usable Terrace"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ABOUT / HOW WE WORK ===== */}
      <section id="about" className="section" style={{ background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-split" style={{ alignItems: 'center' }}>
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <div className="label" style={{ marginBottom: '14px' }}>
                  <span className="label-dot" />
                  Leadership & Experience
                </div>
                <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', marginBottom: '22px', color: 'var(--color-text-primary)' }}>
                  How JC Apex Ventures works.
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={1}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '18px' }}>
                  JC Apex Ventures (OPC) Private Limited is a registered consultancy company headquartered at One International Centre in Elphinstone, Mumbai.
                </p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '18px' }}>
                  Our Director, Jitendra Chavan, brings over 36 years of direct utility engineering experience from working inside Mumbai power networks. When a project involves government permissions, electrical board procedures or technical site inspections, that experience means paperwork is prepared correctly the first time.
                </p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '28px' }}>
                  For hands-on civil work, solar installation, signage fabrication or electrical contracts, the physical work is executed by vetted, licensed contractors. We plan the job, handle the approvals and supervise delivery so you deal with one accountable team.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number"><AnimatedCounter end={36} />+</div>
                    <div className="stat-label">Years Utility Background</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number"><AnimatedCounter end={6} /></div>
                    <div className="stat-label">Focused Divisions</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1</div>
                    <div className="stat-label">Accountable Contact</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Document Transparency</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={3}>
              <div style={{
                position: 'relative',
                height: '520px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xl)',
              }}>
                <div className="editorial-pill">
                  One International Centre, Mumbai
                </div>
                <img 
                  src="/images/one-international-centre.jpg" 
                  alt="One International Centre, Mumbai"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px',
                  background: 'linear-gradient(to top, rgba(20,23,26,0.92), transparent)'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '4px', color: '#FFFFFF' }}>One International Centre</div>
                  <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.88rem' }}>Tower 1, Senapati Bapat Marg, Elphinstone, Mumbai 400013</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== WHY WORK WITH US ===== */}
      <section id="expertise" className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Engineering Assurance
              </div>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', marginBottom: '14px', color: 'var(--color-text-primary)' }}>
                Why work with us
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Direct utility insight, transparent documentation and no unnecessary technical jargon.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { 
                icon: Shield, 
                title: "36 years utility background", 
                desc: "Direct practical knowledge of BEST, Adani Electricity (AEML), Tata Power and MSEDCL procedures, tariff categories and complaint rules." 
              },
              { 
                icon: FileCheck2, 
                title: "Paperwork done right", 
                desc: "We verify bills, calculate sanctioned loads and assemble regulatory files in the exact order required by government departments." 
              },
              { 
                icon: Users2, 
                title: "Vetted associates", 
                desc: "Turnkey interiors by experienced architects, electrical works by licensed contractors, and print execution by veteran production specialists." 
              },
              { 
                icon: CheckCircle2, 
                title: "One point of contact", 
                desc: "You deal with JC Apex Ventures directly. We coordinate the different specialists and keep you updated on progress." 
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <div className="glass-panel" style={{ padding: '36px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '12px',
                      background: 'var(--color-accent-pale)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <item.icon size={24} color="var(--color-accent)" />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="section" style={{ padding: '40px 0 90px 0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-bg-alt) 0%, #FFFFFF 100%)',
              border: '1px solid var(--color-border-accent-light)',
              borderRadius: '28px',
              padding: '68px 36px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }} className="frosted-cream-card">
              <div className="label" style={{ marginBottom: '16px' }}>
                <span className="label-dot" />
                Let us discuss your project
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', marginBottom: '14px', color: 'var(--color-text-primary)' }}>
                Have a project or question?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '620px', margin: '0 auto 36px auto', fontSize: '1.08rem', lineHeight: 1.7 }}>
                Call our office or send us an email with your requirement. We will review it, explain what is needed and provide clear next steps.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:+917021112664" className="btn-primary">
                  <span><Phone size={16} /> Call +91 70211 12664</span>
                </a>
                <a href="mailto:admin@jcapexv.com" className="btn-outline">
                  <Mail size={16} color="var(--color-accent)" /> Email admin@jcapexv.com
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
