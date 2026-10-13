"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import type { DivisionContent, IconKey } from '@/content/divisions';
import DivisionLogo from '@/components/DivisionLogos';
import { ImageWithLightbox } from '@/components/ImageLightbox';
import PrintCalculator from '@/components/PrintCalculator';
import InteriorCalculator from '@/components/InteriorCalculator';
import { Plug, Sun, Layout, Printer, Landmark, Zap, ArrowRight, AlertTriangle, CheckCircle2, User, Sparkles } from 'lucide-react';

export const divisionIcons: Record<IconKey, React.ComponentType<{ size?: number; color?: string }>> = {
  plug: Plug,
  sun: Sun,
  layout: Layout,
  printer: Printer,
  landmark: Landmark,
  zap: Zap,
};

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <ScrollReveal>
      <div className="section-divider" />
      <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)', marginBottom: intro ? '12px' : '32px', color: 'var(--color-text-primary)' }}>{title}</h2>
      {intro && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '720px', marginBottom: '32px' }}>{intro}</p>
      )}
    </ScrollReveal>
  );
}

export default function DivisionPage({
  data,
  customHeroLogo,
}: {
  data: DivisionContent;
  customHeroLogo?: React.ReactNode;
}) {
  const Icon = divisionIcons[data.icon];

  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Clippy />

      <PageHero
        title={data.name}
        tagline={data.tagline}
        breadcrumb={data.name}
        badge={data.laypersonBadge}
        statPill={data.statPill}
        heroImage={data.heroImage}
        heroImageTag={data.heroImageTag}
        logo={customHeroLogo || <DivisionLogo division={data.slug} size={64} />}
      />

      {/* 15-Second Skim Takeaway Banner */}
      <section style={{ padding: '28px 0', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '100px',
              background: 'var(--color-accent-pale)', color: 'var(--color-accent)',
              fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px'
            }}>
              <Sparkles size={13} /> 15-Second Takeaway
            </span>
            <p style={{ margin: 0, fontSize: '0.96rem', fontWeight: 600, color: 'var(--color-text-primary)', flex: 1, minWidth: '280px' }}>
              {data.plainTakeaway}
            </p>
          </div>
        </div>
      </section>

      {/* Visual Photo Cards Showcase */}
      {data.visualCards && data.visualCards.length > 0 && (
        <section className="section" style={{ paddingBottom: '30px' }}>
          <div className="container">
            <SectionHeading
              title="Visual Offerings & Real Specimens"
              intro="Authentic real-world specimens and process deliverables so you can clearly see what we execute."
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: data.visualCards.length === 3 ? 'repeat(auto-fit, minmax(320px, 1fr))' : 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '28px'
            }}>
              {data.visualCards.map((vc, i) => (
                <ScrollReveal key={vc.title} delay={i + 1}>
                  <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                      <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                        {vc.imageTag}
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
                          <div style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: '100px',
                            background: 'var(--color-accent-pale)',
                            color: 'var(--color-accent)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            marginBottom: '10px'
                          }}>
                            {vc.badge}
                          </div>
                        )}
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                          {vc.title}
                        </h3>
                        <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px', lineHeight: 1.5 }}>
                          {vc.takeaway}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                          {vc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strategic Why Us, Why This Discipline, Why Now */}
      {data.strategicWhy && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <SectionHeading
              title={data.strategicWhy.heading}
              intro={data.strategicWhy.subheading}
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {[data.strategicWhy.whyUs, data.strategicWhy.whyDiscipline, data.strategicWhy.whyNow].map((pillar, idx) => (
                <ScrollReveal key={pillar.title} delay={idx + 1}>
                  <div
                    className="ios-glass-card"
                    style={{
                      padding: '32px 28px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '24px',
                    }}
                  >
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      background: 'var(--color-accent-pale)',
                      color: 'var(--color-accent)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      width: 'fit-content',
                    }}>
                      {idx === 0 ? 'Pillar 01 : Authority' : idx === 1 ? 'Pillar 02 : Engineering' : 'Pillar 03 : Urgency'}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '20px' }}>
                      {pillar.subtitle}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                      {pillar.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                          <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
                <p key={i} style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>{p}</p>
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
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--color-text-primary)' }}>{data.notice.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{data.notice.text}</p>
                  </div>
                </div>
              )}
            </ScrollReveal>

            {data.glossary && (
              <ScrollReveal delay={1}>
                <div className="glass-panel" style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '20px', color: 'var(--color-text-primary)' }}>Words you may see</h3>
                  <dl style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {data.glossary.map((g) => (
                      <div key={g.term}>
                        <dt style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.95rem', marginBottom: '4px' }}>{g.term}</dt>
                        <dd style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{g.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading title={data.servicesTitle} />
          <div className="grid-3-col">
            {data.services.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 3) + 1}>
                <div className="glass-panel" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--color-text-primary)' }}>{s.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>{s.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Process Steps (How it works) */}
      <section className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <SectionHeading
            title="How the process works"
            intro="A structured four-step journey designed for clarity, fixed timelines, and zero surprises."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {data.steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i + 1}>
                <div className="glass-panel" style={{ padding: '32px 24px', height: '100%', position: 'relative' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'var(--color-accent-pale)', border: '1px solid var(--color-border-accent-light)',
                    color: 'var(--color-accent)', fontWeight: 800, fontSize: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--color-text-primary)' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.65, margin: 0 }}>
                    {s.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
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
                <div className="glass-panel" style={{ padding: '32px', height: '100%' }}>
                  <span
                    style={{
                      display: 'inline-block', padding: '4px 12px', borderRadius: '100px', marginBottom: '16px',
                      background: 'var(--color-accent-pale)', color: 'var(--color-accent)', fontSize: '0.74rem', fontWeight: 700,
                      letterSpacing: '1px', textTransform: 'uppercase'
                    }}
                  >
                    {item.tag}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--color-text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>{item.text}</p>
                  {item.levels && (
                    <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {item.levels.map((l) => (
                        <li key={l.label} style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                          <strong style={{ color: 'var(--color-text-primary)' }}>{l.label}: </strong>
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
              <h3 style={{ fontSize: '1.5rem', margin: '56px 0 20px 0', color: 'var(--color-text-primary)' }}>Standard, Premium or Luxury</h3>
              <div className="glass-panel" style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                      {['', 'Standard', 'Premium', 'Luxury'].map((h) => (
                        <th key={h} style={{ padding: '16px 20px', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--color-text-muted)', fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.tiers.rows.map((r) => (
                      <tr key={r.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--color-accent)' }}>{r.label}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>{r.standard}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>{r.premium}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>{r.luxury}</td>
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
              {data.people.length > 0 && (
                <>
                  <SectionHeading title={data.peopleTitle} intro={data.peopleIntro} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.people.map((group) => (
                      <ScrollReveal key={group.heading}>
                        <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '12px', fontWeight: 700 }}>
                          {group.heading}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {group.members.map((m) => (
                            <div key={m.name} className="glass-panel" style={{ padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                              <User size={18} color="var(--color-accent)" style={{ marginTop: '2px' }} />
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{m.name}</div>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', fontWeight: 500 }}>{m.role}</div>
                                {m.note && <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px', lineHeight: 1.5 }}>{m.note}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </>
              )}
              {data.people.length === 0 && <SectionHeading title={data.whoDoesTheWork.title} />}
              {data.people.length === 0 && (
                <ScrollReveal>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.75 }}>{data.whoDoesTheWork.text}</p>
                </ScrollReveal>
              )}
            </div>

            <div>
              <SectionHeading title={data.whoDoesTheWork.title} />
              <ScrollReveal>
                <div className="glass-panel" style={{ padding: '28px' }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>
                    {data.whoDoesTheWork.text}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="section" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
        <div className="container">
          <ScrollReveal>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(22, 27, 34, 0.85) 0%, rgba(10, 13, 16, 0.95) 100%)',
                border: '1px solid var(--color-border-accent-light)',
                borderRadius: '24px',
                padding: '60px 36px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <CheckCircle2 size={32} color="var(--color-accent)" style={{ marginBottom: '16px' }} />
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', marginBottom: '12px', color: 'var(--color-text-primary)' }}>Ready to discuss your project?</h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '560px', margin: '0 auto 28px auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
                Reach out with your requirements. We will review what is needed and provide honest, transparent next steps.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {data.actions.map((a, i) => (
                  <Link key={a.href} href={a.href} className={i === 0 ? 'btn-primary' : 'btn-outline'}>
                    {i === 0 ? (
                      <span>{a.label} <ArrowRight size={18} /></span>
                    ) : (
                      a.label
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
