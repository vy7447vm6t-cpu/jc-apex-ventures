"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import ScrollReveal from '@/components/ScrollReveal';
import SolarCalculator, { CalculationResult } from '@/components/SolarCalculator';
import SpotlightCard from '@/components/SpotlightCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { ImageWithLightbox } from '@/components/ImageLightbox';
import { SolarGenerationCurve, CashflowPaybackSchedule } from '@/components/bklit';
import { SvgPathAnimator, GradientASCII } from '@/components/react-bits';
import {
  Sun,
  CheckCircle2,
  Layers,
  Sparkles,
  Car,
  FileCheck2,
  Shield,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Send,
  Eye,
  Sliders,
  Copy,
  X,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Clock,
  Building2,
} from 'lucide-react';

interface DossierProject {
  tag: string;
  title: string;
  galleryImages: string[];
  specs: { label: string; value: string }[];
  challenge: string;
  solution: string;
  outcomes: string[];
  [key: string]: unknown;
}

export default function SolisPage() {
  const [calculatorData, setCalculatorData] = useState<CalculationResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittedBody, setSubmittedBody] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedDossier, setSelectedDossier] = useState<DossierProject | null>(null);
  const [dossierPhotoIdx, setDossierPhotoIdx] = useState<number>(0);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDossier(null);
    };
    if (selectedDossier) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedDossier]);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyName: '',
    location: '',
    utility: 'BEST',
    propertyType: 'Housing Society (CHS Common Meter)',
    monthlyBill: 'Rs 18,000 / month',
    roofType: 'Flat RCC Terrace (Usable with Pergola)',
    solutions: ['Elevated Pergola Solar', 'Net Metering Liaisoning', 'PM Surya Ghar Subsidy Assistance'],
    calculatorSummary: '',
    preferredDate: '',
    notes: '',
  });

  const handleApplyCalculation = (calc: CalculationResult) => {
    setCalculatorData(calc);

    const typeLabel =
      calc.propertyType === 'chs'
        ? 'Housing Society (CHS Common Meter)'
        : calc.propertyType === 'residential'
        ? 'Individual Bungalow / Home'
        : 'Commercial / Office Complex';

    const roofTypeLabel =
      calc.structureType === 'pergola'
        ? 'Flat RCC Terrace (Usable with Pergola)'
        : 'Flat RCC Terrace (Standard Solar)';

    const selectedSolutions: string[] = [];
    if (calc.structureType === 'pergola') selectedSolutions.push('Elevated Pergola Solar');
    else selectedSolutions.push('Standard Rooftop Solar');

    if (calc.evOption !== 'none') selectedSolutions.push('EV Charging Hub');
    if (calc.bipvOption !== 'none') selectedSolutions.push('BIPV Solar Glass');
    selectedSolutions.push('Net Metering Liaisoning');
    if (calc.subsidyRs > 0) selectedSolutions.push('PM Surya Ghar Subsidy Assistance');

    const summaryText =
      `Recommended System: ${calc.recommendedKwp} kWp (${calc.panelCount} panels of 550W) | ` +
      `Estimated Generation: ~${calc.monthlyGenerationUnits} units/mo | ` +
      `Est. Monthly Savings: Rs ${calc.monthlySavingsRs.toLocaleString('en-IN')} | ` +
      `Gross Cost: Rs ${calc.grossCostRs.toLocaleString('en-IN')} | ` +
      `Est. Subsidy: Rs ${calc.subsidyRs.toLocaleString('en-IN')} | ` +
      `Net Investment: Rs ${calc.netInvestmentRs.toLocaleString('en-IN')}`;

    setFormData((prev) => ({
      ...prev,
      propertyType: typeLabel,
      roofType: roofTypeLabel,
      monthlyBill:
        calc.inputMode === 'bill'
          ? `Rs ${calc.inputValue.toLocaleString('en-IN')} / month`
          : `Area: ${calc.inputValue.toLocaleString('en-IN')} sq ft`,
      solutions: selectedSolutions,
      calculatorSummary: summaryText,
      notes: prev.notes || 'Please arrange a site inspection and shadow audit at the earliest.',
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSolutionToggle = (solution: string) => {
    setFormData((prev) => {
      const current = prev.solutions;
      if (current.includes(solution)) {
        return { ...prev, solutions: current.filter((s) => s !== solution) };
      } else {
        return { ...prev, solutions: [...current, solution] };
      }
    });
  };

  const handleCopyEnquiry = async () => {
    if (!submittedBody) return;
    try {
      await navigator.clipboard.writeText(submittedBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    let body = `Solis Solar Feasibility & Site Inspection Request\n\n`;
    body += `Client Name: ${formData.name}\n`;
    body += `Phone / WhatsApp: ${formData.phone}\n`;
    body += `Email: ${formData.email}\n`;
    body += `Society / Property: ${formData.propertyName || 'Not specified'}\n`;
    body += `Location in Mumbai / MMR: ${formData.location || 'Not specified'}\n`;
    body += `Power Utility / DISCOM: ${formData.utility}\n`;
    body += `Property Type: ${formData.propertyType}\n`;
    body += `Monthly Bill / Load: ${formData.monthlyBill}\n`;
    body += `Roof Type: ${formData.roofType}\n`;
    body += `Selected Solutions: ${formData.solutions.join(', ') || 'General Solar'}\n`;

    if (formData.calculatorSummary) {
      body += `\n--- Calculator Estimates ---\n${formData.calculatorSummary}\n`;
    }

    if (formData.preferredDate) {
      body += `Preferred Site Inspection Date: ${formData.preferredDate}\n`;
    }

    if (formData.notes) {
      body += `Additional Notes / Request: ${formData.notes}\n`;
    }

    body += `\n---\nSent from Solis by JC Apex Ventures (jcapexv.com/solis)`;

    const subject = `Solis Solar Site Feasibility: ${formData.propertyName || formData.name} (${formData.location || 'Mumbai'})`;

    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'solis@jcapexv.com',
          cc: 'admin@jcapexv.com',
          subject,
          body,
          details: formData,
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
        }),
      }).catch((err) => console.warn('[SolisPage] Background API dispatch notice:', err));
    } catch {
      // Non-blocking
    }

    const mailtoUrl = `mailto:solis@jcapexv.com?cc=admin@jcapexv.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmittedBody(body);
    setFormSubmitted(true);

    window.location.href = mailtoUrl;
  };

  return (
    <main className="solis-canvas" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Clippy />

      {/* Solis High-Tech Clean Energy Hero with WebGL GradientASCII Background */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '136px',
          paddingBottom: '70px',
          backgroundColor: '#F6F8FF',
          borderBottom: '1px solid rgba(30, 63, 216, 0.14)',
          position: 'relative',
        }}
      >
        {/* WebGL GradientASCII Background Layer */}
        <div
          className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: 1 }}
          aria-hidden="true"
        >
          <GradientASCII
            colors={['#1e3fd8', '#2563eb', '#0284c7', '#38bdf8', '#f59e0b', '#fbbf24']}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={13}
            density={1.0}
          />
          {/* Subtle Crystalline Glass Mask for Perfect Readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 95% 85% at 50% 30%, rgba(246, 248, 255, 0.0) 0%, rgba(246, 248, 255, 0.12) 55%, rgba(246, 248, 255, 0.36) 100%)',
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
              color: '#64748B',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} color="#94A3B8" />
            <Link href="/#divisions" style={{ color: '#64748B', textDecoration: 'none' }}>
              Divisions
            </Link>
            <ChevronRight size={13} color="#94A3B8" />
            <span style={{ color: '#1E3FD8', fontWeight: 700 }}>Solis Solar &amp; Clean Energy</span>
          </div>

          <div
            className="page-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              {/* Header row with Solis official logo and discipline title */}
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
                  <img
                    src="/images/logos/solis-official.png"
                    alt="Official Solis Brand Logo"
                    style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    width: '2px',
                    height: '44px',
                    backgroundColor: '#F59E0B',
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
                    color: '#0A1128',
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  Solar EPC &amp; Elevated Terrace Pergolas
                </h1>
              </div>

              <p
                className="animate-fade-in-up delay-200"
                style={{
                  fontSize: 'clamp(1.02rem, 1.6vw, 1.18rem)',
                  color: '#334155',
                  maxWidth: '680px',
                  lineHeight: 1.68,
                  marginBottom: '24px',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                Turnkey Solar EPC, Elevated Terrace Pergolas, BIPV Architectural Glass and EV Charging Hubs in Mumbai.
              </p>

              <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(30, 63, 216, 0.25)',
                    color: '#1E3FD8',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(30, 63, 216, 0.08)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      backgroundColor: '#F59E0B',
                      boxShadow: '0 0 8px #F59E0B',
                    }}
                  />
                  Save up to 90% Power Bills
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(30, 63, 216, 0.08)',
                    border: '1px solid rgba(30, 63, 216, 0.2)',
                    color: '#0A1128',
                    fontSize: '0.82rem',
                    fontWeight: 650,
                  }}
                >
                  MNRE / PM Surya Ghar Approved
                </span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="animate-fade-in-up delay-400">
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px -12px rgba(30, 63, 216, 0.2), 0 0 0 1px rgba(30, 63, 216, 0.2)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div style={{ position: 'relative', height: '360px', width: '100%' }}>
                  <ImageWithLightbox
                    src="/images/solis_canopy_page1.jpg"
                    alt="Elevated Solar Pergola Canopy"
                    title="Elevated Solar Pergola Canopy : Walkable Terrace Rooftop"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
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
                    color: '#0A1128',
                    border: '1px solid rgba(30, 63, 216, 0.2)',
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
                      backgroundColor: '#F59E0B',
                    }}
                  />
                  ELEVATED SOLAR PERGOLA CANOPY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Intro */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div className="grid-split" style={{ alignItems: 'center' }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '20px', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
                High-efficiency rooftop solar built for Mumbai housing societies and businesses.
              </h2>

              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '20px' }}>
                Solis is the dedicated solar and clean energy hub of JC Apex Ventures. We handle the entire journey: from physical rooftop shadow audits and structural load design, to tiered procurement of 540W to 590W modules, elevated pergola arrays, net metering approvals with Mumbai power utilities, and PM Surya Ghar subsidies.
              </p>

              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '28px' }}>
                With over 36 years of direct utility engineering experience on our leadership team, we know exactly what BEST, Adani Electricity, Tata Power, and MSEDCL require. You get honest engineering, zero jargon, and a single point of accountability.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="#calculator" className="btn-primary">
                  <span>Calculate Solar & Subsidy <Sliders size={18} /></span>
                </a>
                <a href="#solis-enquiry" className="btn-outline">
                  <span>Book Site Audit <ArrowRight size={18} /></span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: 'var(--shadow-xl)',
              }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--color-text-primary)', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em' }}>
                  Key Highlights at a Glance
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <Layers size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        100% Usable Terraces (Pergola Arrays)
                      </strong>
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        Elevated 8 to 10 feet so residents can walk, gather, and use the terrace freely without tripping over panels.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <Sparkles size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        BIPV Architectural Solar Glass
                      </strong>
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        Semi-transparent glass with 30% light transmittance for skylights and atriums that produces green power while lowering heat ingress.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <Car size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        Integrated EV Charging Hubs
                      </strong>
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        Smart AC Type 2 wallboxes and DC fast chargers connected to solar distribution boards with RFID resident billing.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <Shield size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                        PM Surya Ghar Subsidy Support
                      </strong>
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        Up to Rs 18,000/kW (statutory cap up to Rs 90 Lakhs) for housing societies and up to Rs 78,000 for individual residences.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4-Step Operational Workflow Section */}
      <section className="section" style={{ background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Execution Roadmap
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                How we propose and execute solar projects
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                We follow a rigorous four-stage engineering and commercial method so there are no surprise costs, no structural hazards, and no delays in net-metering synchronization.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            {[
              {
                step: '01',
                title: 'Site Inspection & Shadow Audit',
                icon: Eye,
                points: [
                  'Physical inspection of roof slab, waterproofing, parapets, and column anchor points.',
                  '365-day shadow pattern study for water tanks, lift machine rooms, and neighbouring towers.',
                  'Usable shadow-free footprint calculation to verify realistic plant capacity.',
                ],
              },
              {
                step: '02',
                title: 'Engineering Sizing & Panel Selection',
                icon: Sun,
                points: [
                  'Accurate load analysis matching annual power bills and sanction capacity.',
                  'Tier-1 high-efficiency modules (540W to 590W mono PERC or bifacial half-cut).',
                  'Multi-MPPT on-grid string inverters optimized for partial shade resilience.',
                ],
              },
              {
                step: '03',
                title: 'Costing, BOS, Taxes & Subsidies',
                icon: FileCheck2,
                points: [
                  'Transparent Bill of Systems (hot-dip galvanized structures, copper DC cables, SPD arrestors).',
                  'Blended 13.8% composite GST breakdown and PM Surya Ghar subsidy application.',
                  'Net-metering liaisoning across BEST, Adani, Tata Power, and MSEDCL.',
                ],
              },
              {
                step: '04',
                title: 'Specialized Solutions Execution',
                icon: Layers,
                points: [
                  'Elevated Pergola structures raising solar arrays 8 to 10 feet to keep terraces usable.',
                  'BIPV semi-transparent architectural solar glass for skylights, atriums, and facades.',
                  'Smart EV charging hubs connected to solar distribution with resident RFID billing.',
                ],
              },
            ].map((item, idx) => {
              const StepIcon = item.icon;
              return (
                <ScrollReveal key={item.step} delay={idx + 1}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '32px 24px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'var(--color-accent-pale)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <StepIcon size={20} color="var(--color-accent)" />
                        </div>
                        <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-accent)' }}>
                          {item.step}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                        {item.title}
                      </h3>

                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                            <CheckCircle2 size={15} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialized Solutions Showcase with Authentic Photography Cards */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Real-World Clean Energy Solutions
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                Specialized clean energy solutions
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}>
                Modern Mumbai buildings have high terrace utility and distinct aesthetic demands. We engineer custom solutions that fit dense urban requirements.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
            
            {/* 1. Pergola */}
            <ScrollReveal delay={1}>
              <SpotlightCard style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                  <div className="editorial-pill">
                    Walkable Sky Lounge Pergola
                  </div>
                  <img
                    src="/images/solis_terrace_lounge.jpg"
                    alt="Elevated Pergola Solar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--color-accent)', textTransform: 'uppercase'
                    }}>
                      Walkable Terrace
                    </span>
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
                      Elevated Pergola Solar Structures
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.65, marginBottom: '20px' }}>
                      Traditional solar arrays occupy the floor and make terraces unusable for residents. Our elevated pergola structures lift the panels 8 to 10 feet above the roof floor on heavy structural steel or hot-dip galvanized columns.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>100% Usable Terrace:</strong> Walking, morning yoga, resident meetings, and recreational use remain uninterrupted.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Integrated Rainwater Gutters:</strong> Drainage channels prevent dirty rainwater dripping through panel gaps.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>150 km/h Wind Load Certified:</strong> Chemical grouting and structural bracing engineered for coastal Mumbai gusts.</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Typical installation: 101-panel pergola solar array generating 55 kWp while retaining full resident terrace recreation space.
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* 2. BIPV */}
            <ScrollReveal delay={2}>
              <SpotlightCard style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                  <div className="editorial-pill">
                    Architectural BIPV Specimen
                  </div>
                  <img
                    src="/images/solar-bipv-glass.jpg"
                    alt="Building Integrated Photovoltaics"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--color-accent)', textTransform: 'uppercase'
                    }}>
                      Aesthetic Glazing
                    </span>
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
                      Building Integrated Photovoltaics (BIPV)
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.65, marginBottom: '20px' }}>
                      Replace conventional roof sheets or glazing with power-generating solar glass. Ideal for skylights, atriums, entrance canopies, and contemporary building facades where standard black solar panels look industrial.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>30% Natural Light Transmittance:</strong> Brings in soft daylight while blocking harsh glare and thermal infrared radiation.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Thermal Comfort & AC Savings:</strong> Double-glazed safety glass cuts internal heat build-up and lowers cooling bills.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Architectural Integration:</strong> Clean frameless or semi-frameless mounting without exposed wiring conduits.</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Typical installation: 82 kW rooftop solar paired with 29 kW architectural BIPV skylight glass on a commercial headquarters.
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* 3. EV Charging Hub */}
            <ScrollReveal delay={3}>
              <SpotlightCard style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                  <div className="editorial-pill">
                    EV Charging Hub Array
                  </div>
                  <img
                    src="/images/solar-ev-charging.jpg"
                    alt="Integrated EV Charging Hub"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
                      color: 'var(--color-accent)', textTransform: 'uppercase'
                    }}>
                      Clean Mobility
                    </span>
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
                      Integrated EV Charging Hubs
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.65, marginBottom: '20px' }}>
                      Turn rooftop solar generation into free vehicle fuel. We set up dedicated AC Type 2 smart chargers (7.4 kW to 22 kW) and DC fast charging points wired directly to the solar main distribution board.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Automated Society Resident Billing:</strong> RFID tap-cards or mobile app authentication bill power consumption directly.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Dynamic Load Management:</strong> Prevents electrical overload by throttling charger speed when lifts and pumps run.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Subsidy Eligible:</strong> Society EV charging points linked with rooftop solar qualify under PM Surya Ghar GHS benefits.</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Complete turnkey supply, cabling, sub-metering, earthing, and software setup for residential societies and commercial facilities.
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

          </div>

          {/* Interactive Walkable Pergola Slider Comparison */}
          <div style={{ marginTop: '70px', paddingTop: '50px', borderTop: '1px solid var(--color-border)' }}>
            <ScrollReveal delay={4}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <span className="label" style={{ marginBottom: '12px' }}>
                  <span className="label-dot" />
                  Visual Usability Comparison
                </span>
                <h3 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  Floor-Mounted Cluttered Roof vs Elevated Pergola Canopy
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto' }}>
                  Drag the interactive divider to see how Solis elevated steel structures lift solar panels overhead to preserve 100% of your terrace floor for walking and society recreation.
                </p>
              </div>
              <BeforeAfterSlider
                beforeImage="/images/solar-rooftop-array.jpg"
                afterImage="/images/solis_terrace_lounge.jpg"
                beforeLabel="Traditional Low Mount"
                afterLabel="Solis Elevated Pergola"
                beforeBadge="Zero Walkability"
                afterBadge="100% Usable Floor"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Strategic Engineering Manifesto: Why Us? Why Solar? Why Now? */}
      <section className="section" style={{ paddingTop: '80px', paddingBottom: '70px', background: 'var(--color-bg)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Strategic Clean Energy Manifesto
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', marginBottom: '18px', color: 'var(--color-text-primary)', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em' }}>
                Why Solis? Why Solar & Clean Energy? Why Now?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '740px', margin: '0 auto', fontSize: '1.08rem', lineHeight: 1.75 }}>
                A mathematical, regulatory, and spatial breakdown of why urban rooftop solar is Mumbai&apos;s highest-yielding infrastructure investment, and how our elevated pergola engineering eliminates the historic compromise between clean electricity and terrace lifestyle.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Core Strategic Pillars */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}>
            {/* Pillar 1: Why Solis */}
            <ScrollReveal delay={1}>
              <div
                className="ios-glass-card"
                style={{
                  padding: '36px 30px',
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
                  fontWeight: 600,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  width: 'fit-content',
                }}>
                  Pillar 01 : Authority & Architecture
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  Why Solis & JC Apex
                </h3>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.94rem', marginBottom: '22px' }}>
                  Zero Terrace Loss & 36+ Years Utility Authority
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Multi-Surface Spatial Multiplier:</strong> We lift solar arrays 8 to 10 feet overhead on heavy hot-dip galvanised structural frames, keeping 100% of the terrace floor completely open for walking, morning yoga, and community gatherings.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Direct Utility Engineering Authority:</strong> Under Director Jitendra Chavan (36+ years inside Mumbai utilities), we handle all liaisoning with BEST, Adani Electricity (AEML), Tata Power, and MSEDCL with zero bureaucratic delay.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Coastal Storm Wind Rating:</strong> Engineered for 150 km/h gusts with chemical epoxy base anchors, diagonal truss bracing, and integrated rainwater perimeter gutters that prevent terrace leaks.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Statutory FSI & Fire Clearance:</strong> Fully compliant with BMC DCPR 2034 Regulation 37 solar rooftop FSI exemptions and Chief Fire Officer (CFO) mandatory 1.5m perimeter fire-escape walkways.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Pillar 2: Why Solar & Clean Energy */}
            <ScrollReveal delay={2}>
              <div
                className="ios-glass-card"
                style={{
                  padding: '36px 30px',
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
                  fontWeight: 600,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  width: 'fit-content',
                }}>
                  Pillar 02 : Financial & Physical Returns
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  Why Solar & Clean Energy
                </h3>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.94rem', marginBottom: '22px' }}>
                  Hedge 6% to 8% Tariff Inflation & Harvest Albedo Gain
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Permanent Power Tariff Hedge:</strong> Common-meter electricity for elevators, water pumping, and corridor illumination inflates at 6% to 8% every year. Rooftop solar caps energy costs under Rs 2.10/unit for 25+ years.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Bifacial Albedo Multiplier:</strong> Elevated pergola arrays allow reflected sunlight from cool-roof white terrace floor membranes to hit the rear side of bifacial glass panels, capturing 12% to 22% additional daily generation.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Urban Micro-Utility Synergy:</strong> Direct coupling with EV chargers and architectural BIPV solar glass converts a dead concrete roof into a self-sustaining asset that adds tangible resale valuation to building flats.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Measurable Environmental Impact:</strong> A standard 55 kWp residential array mitigates over 68 tons of CO2 annually, offsetting the carbon emissions of approximately 1,100 mature urban trees.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Pillar 3: Why Now */}
            <ScrollReveal delay={3}>
              <div
                className="ios-glass-card"
                style={{
                  padding: '36px 30px',
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
                  fontWeight: 600,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  width: 'fit-content',
                }}>
                  Pillar 03 : Subsidies & Capacity Caps
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  Why Act Now
                </h3>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.94rem', marginBottom: '22px' }}>
                  PM Surya Ghar Subsidies & Local Grid Transformer Quotas
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>PM Surya Ghar Central Grants:</strong> Unprecedented direct subsidies: up to Rs 78,000 for individual homes and Rs 18,000/kW (statutory ceiling up to Rs 90 Lakhs for 500 kW) for Group Housing Society common meters.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Rapid 3.2 to 3.8 Year Payback:</strong> Net project capital outlay is fully recovered in under 4 years via direct monthly bill credits, yielding over 21 years of pure dividend generation.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Distribution Transformer Caps:</strong> Under MERC regulations, local distribution transformers have a 70% to 80% maximum solar injection ceiling. Once neighborhood transformer quotas fill up, new net metering applications are refused.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>Rising Raw Material Costs:</strong> Structural steel, hot-dip galvanizing, and copper cable costs trend higher annually; executing today locks in current turnkey EPC pricing.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Embedded Engineering & Financial Figures Matrix */}
          <ScrollReveal delay={2}>
            <div
              style={{
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-alt)',
                padding: '40px 32px',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <span className="label" style={{ marginBottom: '10px' }}>
                  <span className="label-dot" />
                  Technical Evidence & Quantitative Models
                </span>
                <h3 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', color: 'var(--color-text-primary)', marginBottom: '8px', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em' }}>
                  Engineering Proof: Spatial, Payback & Tariff Models
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.96rem', maxWidth: '640px', margin: '0 auto' }}>
                  Extracted from verified site feasibility studies and audited techno-commercial DPR models. Click any diagram to inspect full-resolution metrics.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
              }}>
                {/* Figure 1: Spatial Generation Profile */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '220px', width: '100%', backgroundColor: '#0a0d10' }}>
                    <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                      Figure 01 : Spatial Model
                    </div>
                    <ImageWithLightbox
                      src="/images/solis_fig1_spatial_generation_profile.png"
                      alt="Spatial Generation Profile: Elevated Pergola Canopy dual-zone architecture"
                      title="Spatial Generation Profile & Dual-Zone Architecture"
                      category="Spatial Engineering Analysis"
                      scope="Multi-Surface Spatial Multiplier showing how elevated pergola framing preserves 100% terrace amenity space while capturing rear bifacial albedo gain from white cool-roof flooring."
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: 'var(--color-accent-pale)',
                        color: 'var(--color-accent)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}>
                        Spatial Analysis
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                        Dual-Zone Terrace Spatial Optimization
                      </h4>
                      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '10px' }}>
                        100% Amenity Floor Preserved Overhead
                      </p>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                        Elevated pergola engineering separates the power generation layer from the living layer. Residents enjoy unimpeded walking and gathering space underneath, while bifacial panels above capture direct sun and reflected floor albedo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Figure 2: Cumulative Cashflow Payback */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '220px', width: '100%', backgroundColor: '#0a0d10' }}>
                    <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                      Figure 02 : Cashflow Model
                    </div>
                    <ImageWithLightbox
                      src="/images/solis_fig2_cumulative_cashflow_payback.png"
                      alt="Cumulative Cashflow and Payback Schedule: 3.8 Year Breakeven"
                      title="Cumulative Cashflow & 3.8-Year Payback Schedule"
                      category="Financial Breakeven Model"
                      scope="Comprehensive cashflow trajectory illustrating initial capex offset by PM Surya Ghar subsidy (e.g. Rs 10.8L on typical 60 kWp CHS arrays), 3.8-year breakeven, and 25-year compounding multi-lakh net savings."
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: 'var(--color-accent-pale)',
                        color: 'var(--color-accent)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}>
                        Financial Model
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                        Cumulative Cashflow & Payback Schedule
                      </h4>
                      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '10px' }}>
                        3.8-Year Breakeven with PM Surya Ghar Subsidy
                      </p>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                        Audit-grade cashflow model proving that after recovering initial capital outlay in under 4 years via utility credits and central grants, housing societies generate pure financial dividends for the remaining 21+ years of module lifespan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Figure 3: Tariff Comparison */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '220px', width: '100%', backgroundColor: '#0a0d10' }}>
                    <div className="editorial-pill" style={{ zIndex: 10, pointerEvents: 'none' }}>
                      Figure 03 : Tariff Model
                    </div>
                    <ImageWithLightbox
                      src="/images/solis_fig4_tariff_comparison.png"
                      alt="Utility Tariff Escalation vs Levelized Solar Cost"
                      title="DISCOM Grid Tariff Escalation vs Fixed Solar Cost"
                      category="Tariff Comparison Model"
                      scope="Comparative analysis between compounding 6-8% annual Mumbai utility tariff inflation and levelized zero-marginal-cost clean rooftop generation."
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: 'var(--color-accent-pale)',
                        color: 'var(--color-accent)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}>
                        Tariff Comparison
                      </div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                        Escalating Grid Tariffs vs Fixed Solar Cost
                      </h4>
                      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '10px' }}>
                        Protection Against 6% to 8% Annual Inflation
                      </p>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                        Utility electricity tariffs across BEST, Adani, Tata Power, and MSEDCL escalate steadily. Installing on-site rooftop solar locks in zero-marginal-cost electricity, shielding societies from compounding multi-decade tariff revisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="section" style={{ scrollMarginTop: '100px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SolarCalculator onApplyCalculation={handleApplyCalculation} />
        </div>
      </section>

      {/* Reference Projects & Ground Track Record */}
      <section className="section" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="section-divider" style={{ margin: '0 auto 20px auto' }} />
              <div className="label" style={{ marginBottom: '14px' }}>
                <span className="label-dot" />
                Technical Benchmarks
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                Track record & execution network
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}>
                Solis combines internal utility engineering leadership with proven solar partners and vetted certified EPC contractors.
              </p>
            </div>
          </ScrollReveal>

          {/* Architectural SVG Path Animation Flourish */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <SvgPathAnimator
              d="M10 70 L50 20 L90 70 M30 45 L70 45 M50 20 L50 70 M20 70 L80 70"
              width={64}
              height={64}
              viewBox="0 0 100 80"
              strokeColor="#1E3FD8"
              strokeWidth={2.5}
            />
          </div>

          {/* Bklit UI Data Visualizations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <SolarGenerationCurve capacityKw={55.55} />
            <CashflowPaybackSchedule initialCapex={28.5} annualSavings={7.4} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              {
                id: 'suburban-chs',
                title: 'Suburban CHS, Kandivali West, Mumbai',
                tag: 'Engineering Feasibility Study & Proposal Framework',
                stats: '55.55 kWp (101 Bi-Facial Panels) | 100% Usable Terrace',
                desc: '10.5 ft elevated hot-dip galvanized structural pergola engineering feasibility study and proposal framework for a premier Kandivali West Cooperative Housing Society (Managing Committee). Designed to preserve 100% usable terrace space for resident walks and gatherings while powering society common meters via net metering with Adani Electricity Mumbai Limited (AEML).',
                image: '/images/solis_canopy_page1.jpg',
                galleryImages: [
                  '/images/solis_canopy_page1.jpg',
                  '/images/solis_terrace_lounge.jpg',
                  '/images/rooftop_amenity_sky_lounge.jpg',
                ],
                client: 'Suburban Cooperative Housing Society (Managing Committee)',
                challenge: 'The society terrace was actively utilized by residents for morning walks, recreation, and community events. Ground-mounted low RCC frames would have created dangerous trip hazards and made the terrace completely unusable.',
                solution: 'Solis designed a 10.5 ft elevated hot-dip galvanized structural steel pergola canopy carrying 101 bi-facial solar modules overhead with integrated rainwater gutters and bidirectional net metering with Adani Electricity (AEML).',
                outcomes: [
                  'Modeled for 55.55 kWp plant producing ~80,000 projected clean units annually',
                  '85% projected drop in society common-meter electricity expenses',
                  '100% usable open terrace preserved for resident recreation in design',
                  '150 km/h wind-load rated structure engineered for coastal Mumbai gusts',
                ],
                specs: [
                  { label: 'Plant Size', value: '55.55 kWp (Feasibility Study)' },
                  { label: 'Solar Tech', value: '101 Bi-Facial Modules' },
                  { label: 'Headroom', value: '10.5 ft Walkable Frame' },
                  { label: 'DISCOM', value: 'Adani Electricity (AEML)' },
                ],
              },
              {
                id: 'corporate-hq',
                title: 'Corporate Headquarters, Navi Mumbai',
                tag: 'In-Design Technical Schematic & Feasibility Model',
                stats: '82 kW Rooftop Solar + 29 kW BIPV Glass',
                desc: 'Engineering feasibility study combining conventional rooftop modules with architectural semi-transparent solar glass over central atriums, reducing lighting and cooling expenses.',
                image: '/images/solis_facade_solar.jpg',
                galleryImages: [
                  '/images/solis_facade_solar.jpg',
                  '/images/solar-bipv-glass.jpg',
                  '/images/solis_terrace_lounge.jpg',
                ],
                client: 'Commercial Corporate Headquarters',
                challenge: 'Standard black rooftop panels would look industrial on an architectural glass building atrium, while heavy solar heat gain drove up internal HVAC chiller loads.',
                solution: 'Engineered architectural semi-transparent BIPV solar glass with 30% daylight transmittance across the atrium, generating 29 kW while cooling internal temperatures.',
                outcomes: [
                  '111 kW total combined clean energy generation model',
                  '22% lower HVAC cooling load through heat-absorbing PV glass',
                  'Architectural facade integration without exposed conduits',
                ],
                specs: [
                  { label: 'Rooftop Array', value: '82 kW Mono PERC' },
                  { label: 'BIPV Glazing', value: '29 kW Solar Glass' },
                  { label: 'Transmittance', value: '30% Natural Light' },
                  { label: 'Grid Feed', value: 'MSEDCL Net Metering' },
                ],
              },
              {
                id: 'industrial-plant',
                title: 'Industrial Manufacturing Unit, Maharashtra',
                tag: 'Engineering Feasibility Study & HT Grid Framework',
                stats: '690 kWp High-Voltage Rooftop Installation',
                desc: 'Technical schematic for electrical HT grid synchronization, transformer integration, and industrial net metering approvals.',
                image: '/images/solis_canopy_page1.jpg',
                galleryImages: [
                  '/images/solis_canopy_page1.jpg',
                  '/images/field_switchgear_panel.jpg',
                  '/images/solis_ev_canopy_page2.jpg',
                ],
                client: 'Industrial Precision Component Manufacturer',
                challenge: 'Factory operated high peak LT loads with steep monthly maximum demand charges and complex PWD electrical inspectorate compliance requirements.',
                solution: 'Installed a 690 kWp industrial solar carport and rooftop array linked to on-site 33kV transformers with automated reverse-power relay protection.',
                outcomes: [
                  '~1.05 Million clean kWh units generated annually',
                  'Rapid 3.2 year industrial capital payback',
                  'PWD Electrical Inspectorate formal charging certificate cleared',
                ],
                specs: [
                  { label: 'Capacity', value: '690 kWp Industrial' },
                  { label: 'Grid Voltage', value: '33kV HT Interconnection' },
                  { label: 'Protection', value: 'Reverse Power Relay' },
                  { label: 'Approvals', value: 'PWD Electrical Clearance' },
                ],
              },
            ].map((proj, idx) => (
              <ScrollReveal key={proj.id} delay={idx + 1}>
                <div
                  className="glass-panel"
                  onClick={() => {
                    setSelectedDossier(proj);
                    setDossierPhotoIdx(0);
                  }}
                  style={{
                    padding: '30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div>
                    {proj.image && (
                      <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                        <img
                          src={proj.image}
                          alt={proj.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', background: 'var(--color-accent-pale)', color: 'var(--color-accent)', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
                      {proj.tag}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                      {proj.title}
                    </h3>
                    <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--color-accent)', marginBottom: '12px' }}>
                      {proj.stats}
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '20px' }}>
                      {proj.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>View Case Study Dossier</span>
                    <ArrowUpRight size={15} color="var(--color-accent)" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive Case Study Dossier Modal */}
          {selectedDossier && (
            <div
              role="dialog"
              aria-modal="true"
              onClick={() => setSelectedDossier(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                overflowY: 'auto',
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '880px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6)',
                  maxHeight: '90vh',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(30, 63, 216, 0.16)',
                }}
              >
                {/* Modal Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 32px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        fontSize: '0.78rem',
                        color: '#1E3FD8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                      }}
                    >
                      [{selectedDossier.tag}]
                    </span>
                    <h3
                      style={{
                        margin: '4px 0 0 0',
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                        fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        color: '#111111',
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedDossier.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDossier(null)}
                    aria-label="Close case study modal"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid rgba(30, 63, 216, 0.16)',
                      backgroundColor: '#EEF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#0A1128',
                      transition: 'background-color 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div
                  style={{
                    padding: '30px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  {/* Photo Gallery with Selector */}
                  <div>
                    <div
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        height: '340px',
                        backgroundColor: '#111111',
                        marginBottom: '10px',
                      }}
                    >
                      <img
                        src={selectedDossier.galleryImages[dossierPhotoIdx]}
                        alt={`${selectedDossier.title} photo ${dossierPhotoIdx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {selectedDossier.galleryImages.length > 1 && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {selectedDossier.galleryImages.map((img: string, idx: number) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setDossierPhotoIdx(idx)}
                            style={{
                              width: '76px',
                              height: '52px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: dossierPhotoIdx === idx ? '2px solid #1E3FD8' : '1px solid rgba(30, 63, 216, 0.16)',
                              padding: 0,
                              cursor: 'pointer',
                              opacity: dossierPhotoIdx === idx ? 1 : 0.6,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Technical Specifications Matrix */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '12px',
                      backgroundColor: '#FFFFFF',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {selectedDossier.specs.map((spec: { label: string; value: string }) => (
                      <div key={spec.label}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#777777',
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            textTransform: 'uppercase',
                            display: 'block',
                          }}
                        >
                          {spec.label}
                        </span>
                        <strong
                          style={{
                            fontSize: '0.98rem',
                            color: '#111111',
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          }}
                        >
                          {spec.value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div
                      style={{
                        padding: '18px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          color: '#888888',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        [01 / Site Challenge]
                      </span>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#444444', lineHeight: 1.6 }}>
                        {selectedDossier.challenge}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '18px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-sans, Inter, sans-serif)',
                          color: '#1E3FD8',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        [02 / Solis Engineering Solution]
                      </span>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#444444', lineHeight: 1.6 }}>
                        {selectedDossier.solution}
                      </p>
                    </div>
                  </div>

                  {/* Verified Outcomes */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        color: '#111111',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '10px',
                      }}
                    >
                      [Verified Field Outcomes]
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedDossier.outcomes.map((outcome: string, i: number) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#333333' }}>
                          <CheckCircle2 size={16} color="#1E3FD8" style={{ flexShrink: 0 }} />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Action CTA */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '10px' }}>
                    <a
                      href="#calculator"
                      onClick={() => setSelectedDossier(null)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '14px', textAlign: 'center', fontSize: '0.92rem' }}
                    >
                      <span>Calculate Solar Sizing for Your Rooftop <ArrowRight size={16} /></span>
                    </a>
                    <a
                      href="#solis-enquiry"
                      onClick={() => setSelectedDossier(null)}
                      style={{
                        padding: '14px 22px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111111',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}
                    >
                      Book Site Feasibility Audit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DISCOM Approvals Ribbon */}
          <ScrollReveal>
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.01em', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  DISCOM Net Metering Paperwork
                </h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                  We handle the full technical and legal liaisoning with all Mumbai power distributors:
                </p>
              </div>

              {[
                { name: 'BEST Undertaking', area: 'Mumbai Island City (Colaba to Sion/Mahim)' },
                { name: 'Adani Electricity (AEML)', area: 'Mumbai Suburbs (Bandra to Dahisar, Chembur)' },
                { name: 'Tata Power (TPCL)', area: 'Mumbai City & Suburbs' },
                { name: 'MSEDCL (Mahavitaran)', area: 'Thane, Navi Mumbai & Rest of Maharashtra' },
              ].map((disc) => (
                <div key={disc.name} style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                    {disc.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {disc.area}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="solis-enquiry" className="section" style={{ scrollMarginTop: '100px', paddingTop: '20px', paddingBottom: '100px', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-split">
            {/* Left Column: Form info & what to expect */}
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <div className="label" style={{ marginBottom: '14px' }}>
                  <span className="label-dot" />
                  Site Audit Booking
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '18px', color: 'var(--color-text-primary)' }}>
                  Request a site feasibility & shadow inspection
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
                  Our senior solar engineering team will visit your building, inspect the roof structural integrity, conduct a shadow audit, review your electricity bills, and submit a detailed technical proposal with subsidy estimates.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <CheckCircle2 size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Shadow-Free Layout Drawing:</strong>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: '2px 0 0 0' }}>
                        We mark usable roof area, panel layout, column footings, and maintenance walkways.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <CheckCircle2 size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Financial & Subsidy Filing:</strong>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: '2px 0 0 0' }}>
                        We confirm exact subsidy eligibility under PM Surya Ghar and prepare all utility forms.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '8px', background: 'var(--color-accent-pale)', borderRadius: '10px', display: 'flex' }}>
                      <CheckCircle2 size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Society Committee Presentation:</strong>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: '2px 0 0 0' }}>
                        We attend your Managing Committee or AGM meeting to answer resident questions in Marathi, Hindi, or English.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  marginBottom: '28px',
                }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-accent)', marginBottom: '8px' }}>
                    Direct Solar Contact Desk
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={15} color="var(--color-accent)" />
                      <span>Email: <strong style={{ color: 'var(--color-text-primary)' }}>solis@jcapexv.com</strong> (CC: admin@jcapexv.com)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={15} color="var(--color-accent)" />
                      <span>Direct: <strong style={{ color: 'var(--color-text-primary)' }}>+91 70211 12664</strong></span>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}
                    >
                      <MapPin size={15} color="var(--color-accent)" />
                      <span>Office: One International Centre, Tower 2, Units 801-802, Elphinstone, Mumbai 400013 <strong style={{ color: 'var(--color-accent)' }}>[Open Maps ↗]</strong></span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Pre-fillable Interactive Enquiry Form */}
            <ScrollReveal delay={2}>
              <form onSubmit={handleSubmitEnquiry} className="glass-panel" style={{ padding: '36px', background: 'var(--color-surface)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 400, fontFamily: 'var(--font-serif-display), Instrument Serif, Georgia, serif', letterSpacing: '-0.02em', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  Site Feasibility Enquiry
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginBottom: '24px' }}>
                  Fill in your building details. If you used the calculator above, estimates have been copied here automatically.
                </p>

                {calculatorData && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    background: 'var(--color-accent-pale)',
                    color: 'var(--color-accent)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}>
                    <CheckCircle2 size={14} />
                    <span>Configuration Selected: {calculatorData.recommendedKwp} kWp ({calculatorData.panelCount} panels)</span>
                  </div>
                )}

                {formData.calculatorSummary && (
                  <div style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'var(--color-bg-alt)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '20px',
                    fontSize: '0.84rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.5,
                  }}>
                    <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '2px' }}>
                      Pre-filled from Calculator:
                    </strong>
                    {formData.calculatorSummary}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Full Name <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name (e.g. Rahul Sharma, Hon. Secretary)"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      Phone / WhatsApp <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98200 XXXXX"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your.name@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">
                      Society / Property Name <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sagar Darshan CHS, Sunrise Towers"
                      required
                      value={formData.propertyName}
                      onChange={(e) => handleInputChange('propertyName', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Location in Mumbai / MMR <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Dadar, Andheri West, Thane"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Power Utility / DISCOM</label>
                    <select
                      className="form-select"
                      value={formData.utility}
                      onChange={(e) => handleInputChange('utility', e.target.value)}
                    >
                      <option value="BEST">BEST Undertaking (Island City)</option>
                      <option value="Adani Electricity (AEML)">Adani Electricity (Suburbs)</option>
                      <option value="Tata Power (TPCL)">Tata Power</option>
                      <option value="MSEDCL (Mahavitaran)">MSEDCL (Thane / MMR / Maha)</option>
                      <option value="Other">Other / Not sure</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Property Type</label>
                    <select
                      className="form-select"
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    >
                      <option value="Housing Society (CHS Common Meter)">Housing Society (CHS Common Meter)</option>
                      <option value="Individual Bungalow / Home">Individual Bungalow / Home</option>
                      <option value="Commercial / Office Complex">Commercial / Office Complex</option>
                      <option value="Industrial Shed / Factory">Industrial Shed / Factory</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Average Monthly Bill / Area</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Rs 25,000 / month or 1,800 sq ft"
                      value={formData.monthlyBill}
                      onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rooftop Type</label>
                    <select
                      className="form-select"
                      value={formData.roofType}
                      onChange={(e) => handleInputChange('roofType', e.target.value)}
                    >
                      <option value="Flat RCC Terrace (Usable with Pergola)">Flat RCC Terrace (Need Usable Pergola)</option>
                      <option value="Flat RCC Terrace (Standard Solar)">Flat RCC Terrace (Standard Solar)</option>
                      <option value="Metal Sheet / Industrial Roof">Metal Sheet / Industrial Roof</option>
                      <option value="Atrium / Skylight (BIPV Glass)">Atrium / Skylight (BIPV Glass)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Solutions Needed</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {[
                      'Elevated Pergola Solar',
                      'Standard Rooftop Solar',
                      'BIPV Solar Glass',
                      'EV Charging Hub',
                      'Net Metering Liaisoning',
                      'PM Surya Ghar Subsidy Assistance',
                    ].map((sol) => (
                      <label key={sol} className="form-checkbox-label" style={{ fontSize: '0.85rem' }}>
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={formData.solutions.includes(sol)}
                          onChange={() => handleSolutionToggle(sol)}
                        />
                        <span>{sol}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Date for Feasibility Visit (Optional)</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Questions / Notes</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us about your rooftop condition, number of floors, or specific requirements..."
                    style={{ minHeight: '90px' }}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }}>
                  <span>Send Feasibility Request to Solis <Send size={18} /></span>
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '12px' }}>
                  This will open an email to solis@jcapexv.com (CC: admin@jcapexv.com) with your pre-filled inquiry details.
                </p>

                {formSubmitted && (
                  <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'var(--color-accent-pale)',
                    border: '1px solid var(--color-border-accent-light)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.92rem' }}>
                      <CheckCircle2 size={18} />
                      <span>Request draft generated</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: '0 0 14px 0' }}>
                      Your email client has been called with the details. If your email app did not open automatically, you can copy the text below and email directly to Solis@jcapexv.com (CC: admin@jcapexv.com) or reach us on WhatsApp.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleCopyEnquiry}
                        className="btn-outline"
                        style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Copy size={14} />
                        <span>{copied ? 'Copied to Clipboard' : 'Copy Inquiry Text'}</span>
                      </button>
                      <a
                        href={`https://wa.me/917021112664?text=${encodeURIComponent(submittedBody)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '8px 16px', fontSize: '0.82rem', borderColor: '#25D366', color: '#15803D' }}
                      >
                        Send via WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
