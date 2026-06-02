"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  Shield,
  Users,
  Globe,
  Printer,
  FileCheck,
  Layout,
  Zap,
  ArrowRight,
  TrendingUp,
  Landmark,
  Building2,
  Handshake,
  CheckCircle2
} from 'lucide-react';

// D3 is client-only, disable SSR
const NetworkGraph = dynamic(() => import('@/components/NetworkGraph'), { ssr: false });

const activeDivisions = [
  { name: "Electricity Grievances", icon: Zap, href: "/electricity-grievances" },
  { name: "Space Planning & Design", icon: Layout, href: "/space-planning" },
  { name: "Licences & Liaisoning", icon: FileCheck, href: "/licenses" },
  { name: "eMudran (Print Management)", icon: Printer, href: "/print-management" },
];

const upcomingDivisions = [
  { name: "Financial Advisory", icon: Landmark },
  { name: "Renewable Energy", icon: TrendingUp },
  { name: "Civil Works", icon: Building2 },
  { name: "Electrical Contracts", icon: Handshake },
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <Clippy />

      {/* ===== HERO ===== */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <NetworkGraph />

        {/* Ambient gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to top, var(--color-bg), transparent)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '850px' }}>
            <div className="animate-fade-in-up label" style={{ marginBottom: '28px' }}>
              <span className="label-dot" />
              CIN: U70200MH2023OPC411326
            </div>

            <h1
              className="animate-fade-in-up delay-100"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '28px',
                fontWeight: 800,
              }}
            >
              When Values Drive the Journey,<br />
              <span className="text-gradient-accent">Destinations Become Divine.</span>
            </h1>

            <p
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'var(--color-text-secondary)',
                marginBottom: '44px',
                maxWidth: '600px',
                lineHeight: 1.7,
              }}
            >
              A premier multi-sector consultancy group headquartered in Mumbai. Bridging engineering complexity with strategic business growth.
            </p>

            <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#services" className="btn-primary">
                <span>Explore Our Strategic Divisions <ArrowRight size={18} /></span>
              </a>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STEPS ACHIEVED ===== */}
      <section className="section" style={{ padding: '40px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              Live Divisions:
            </span>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {activeDivisions.map((div, i) => (
                <Link key={i} href={div.href} className="animate-fade-in-up" style={{ 
                  animationDelay: `${(i+1)*100}ms`,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '100px',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid var(--color-border-accent)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.9rem', fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}>
                  <div.icon size={16} color="var(--color-accent)" />
                  {div.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div className="grid-split" style={{ alignItems: 'center' }}>
            
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '32px' }}>
                  Institutional Expertise.<br/>
                  <span className="text-gradient">Operational Precision.</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={1}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
                  Welcome to <strong style={{ color: 'var(--color-text-primary)' }}>JC Apex Ventures (OPC) Private Limited</strong>, a premier multi-sector consultancy group headquartered in Mumbai. Established on a foundation of deep technical mastery and extensive regulatory expertise, we operate as an institutional "umbrella" entity designed to seamlessly bridge engineering complexity with strategic business growth.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={2}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px' }}>
                  We deliver specialized end-to-end solutions across infrastructure management, high-impact branding layouts, and public-private enterprise coordination. At JC Apex Ventures, we simplify the complex—transforming technical challenges into highly scalable, compliant, and operational success stories.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={3}>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number"><AnimatedCounter end={36} />+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number"><AnimatedCounter end={6} /></div>
                    <div className="stat-label">Core Divisions</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number"><AnimatedCounter end={5} />+</div>
                    <div className="stat-label">Active Partnerships</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number"><AnimatedCounter end={-1} /></div>
                    <div className="stat-label">Sectors Covered</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={4}>
              <div style={{
                position: 'relative',
                height: '600px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
              }}>
                <img 
                  src="/images/about_building_bg.png" 
                  alt="One International Centre Mumbai"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback gradient if image hasn't loaded yet
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #0A1322 0%, #1A2639 100%)';
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,10,18,0.8), transparent)' }} />
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </section>

      {/* ===== WHY PARTNER WITH US ===== */}
      <section id="expertise" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <div className="section-divider" style={{ margin: '0 auto 24px auto' }} />
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
                Why Partner With Us?
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { 
                icon: Shield, 
                title: "Decades of Sector Leadership", 
                desc: "Led by engineering veterans with over 36 years of deep-rooted expertise in urban power systems, structural compliance, and large-scale utility operations." 
              },
              { 
                icon: Globe, 
                title: "Airtight Regulatory Navigation", 
                desc: "Exceptional mastery in managing institutional compliance and accelerating liaisoning procedures across the MCGM, BEST, PWD, and various municipal frameworks." 
              },
              { 
                icon: TrendingUp, 
                title: "Dynamic Operational Reach", 
                desc: "A versatile, asset-light business model capable of simultaneously engineering massive infrastructure joint ventures and delivering boutique, high-end creative assets." 
              },
              { 
                icon: CheckCircle2, 
                title: "Uncompromising Precision", 
                desc: "Every blueprint we review, campaign we estimate, and project we execute is handled with strict institutional discipline, budget transparency, and compliance readiness." 
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <div className="glass-panel" style={{ padding: '40px 32px', height: '100%' }}>
                  <item.icon size={28} color="var(--color-accent)" style={{ marginBottom: '24px' }} />
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES HUB (CURTAIN REVEAL) ===== */}
      <section id="services" className="section">
        <div className="container curtain-container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <div className="section-divider" style={{ margin: '0 auto 24px auto' }} />
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
                Our Strategic Divisions
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '550px', margin: '0 auto', fontSize: '1.05rem' }}>
                The Umbrella Management Layer — designed to solve complex bottlenecks across sectors.
              </p>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {/* Active Divisions */}
            {activeDivisions.map((svc, i) => (
              <ScrollReveal key={`active-${i}`} delay={i} className="curtain-item">
                <Link href={svc.href} style={{ display: 'block', height: '100%' }}>
                  <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--color-border-accent)' }}>
                    <div>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '20px',
                      }}>
                        <svc.icon size={24} color="var(--color-accent)" />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>{svc.name}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '0.9rem', fontWeight: 600, marginTop: '24px' }}>
                      Explore <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}

            {/* Upcoming Divisions */}
            {upcomingDivisions.map((svc, i) => (
              <ScrollReveal key={`upcoming-${i}`} delay={i + 4} className="curtain-item">
                <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.6 }}>
                  <div>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '20px',
                    }}>
                      <svc.icon size={24} color="var(--color-text-muted)" />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>{svc.name}</h3>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600, marginTop: '24px', width: 'fit-content' }}>
                    COMING SOON
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STEPPING UP TOGETHER ===== */}
      <section className="section" style={{ padding: '80px 24px' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{
              background: 'linear-gradient(135deg, rgba(10, 19, 34, 1) 0%, rgba(20, 30, 48, 1) 100%)',
              border: '1px solid var(--color-border-accent)',
              borderRadius: '24px',
              padding: '80px 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
            }}>
              {/* Decorative glow */}
              <div style={{
                position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)',
                pointerEvents: 'none',
              }} />
              
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px', position: 'relative' }}>
                Stepping Up Together.
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto 40px auto', fontSize: '1.1rem', position: 'relative' }}>
                We believe true progress is collaborative. Whether you need immediate regulatory clearance or long-term infrastructure partnership, we are ready to step up.
              </p>
              <div style={{ position: 'relative', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="#contact" className="btn-primary">
                  <span>Start the Journey <ArrowRight size={18} /></span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
