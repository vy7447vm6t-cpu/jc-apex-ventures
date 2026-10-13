"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SolarCalculator, { CalculationResult } from '@/components/SolarCalculator';
import SpotlightCard from '@/components/SpotlightCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import DivisionLogo from '@/components/DivisionLogos';
import {
  Sun,
  CheckCircle2,
  Layers,
  Sparkles,
  Car,
  FileCheck2,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Send,
  Eye,
  Sliders,
  Copy,
} from 'lucide-react';

export default function SolisPage() {
  const [calculatorData, setCalculatorData] = useState<CalculationResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittedBody, setSubmittedBody] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

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
          to: 'Solis@jcapexv.com',
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

    const mailtoUrl = `mailto:Solis@jcapexv.com?cc=admin@jcapexv.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmittedBody(body);
    setFormSubmitted(true);

    window.location.href = mailtoUrl;
  };

  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <Clippy />

      {/* Page Hero */}
      <PageHero
        title="Solis by JC Apex"
        tagline="Turnkey Solar EPC, Elevated Terrace Pergolas, BIPV Architectural Glass and EV Charging Hubs in Mumbai."
        breadcrumb="Solis Solar & Clean Energy"
        badge="Walkable Terrace Solar Architecture"
        statPill="Save up to 90% Power Bills"
        heroImage="/images/solar-pergola-rooftop.jpg"
        heroImageTag="Representative Pergola Array"
        logo={<DivisionLogo division="solis" size={48} />}
      />

      {/* Overview Intro */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div className="grid-split" style={{ alignItems: 'center' }}>
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="label">
                  <span className="label-dot" />
                  Clean Energy & Mobility Hub
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
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
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--color-text-primary)', fontWeight: 700 }}>
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
                        Up to Rs 10.8 Lakhs for housing societies (Rs 18,000/kW) and up to Rs 78,000 for individual residences.
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

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)' }}>
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
                    Representative Pergola Array
                  </div>
                  <img
                    src="/images/solar-pergola-rooftop.jpg"
                    alt="Elevated Pergola Solar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                      color: 'var(--color-accent)', textTransform: 'uppercase'
                    }}>
                      Walkable Terrace
                    </span>
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
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
                      padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                      color: 'var(--color-accent)', textTransform: 'uppercase'
                    }}>
                      Aesthetic Glazing
                    </span>
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
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
                      padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                      color: 'var(--color-accent)', textTransform: 'uppercase'
                    }}>
                      Clean Mobility
                    </span>
                  </div>
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
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
                afterImage="/images/solar-pergola-rooftop.jpg"
                beforeLabel="Traditional Low Mount"
                afterLabel="Solis Elevated Pergola"
                beforeBadge="Zero Walkability"
                afterBadge="100% Usable Floor"
              />
            </ScrollReveal>
          </div>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              {
                title: 'Corporate Headquarters, Navi Mumbai',
                tag: 'Commercial & BIPV Reference',
                stats: '82 kW Rooftop Solar + 29 kW BIPV Glass',
                desc: 'Full design and execution combining conventional rooftop modules with architectural semi-transparent solar glass over central atriums, reducing lighting and cooling expenses.',
              },
              {
                title: 'Residential Housing Society, Mumbai',
                tag: 'Residential CHS Pergola Reference',
                stats: '101-Panel Elevated Pergola Array (55 kWp)',
                desc: 'Engineered an elevated structure 10 feet above the terrace floor. Preserved 2,800 sq ft of recreation area for residents while powering society lifts, pumps, and common lighting.',
              },
              {
                title: 'Industrial Manufacturing Unit, Maharashtra',
                tag: 'Industrial High-Tension Reference',
                stats: '690 kWp High-Voltage Rooftop Installation',
                desc: 'End-to-end electrical HT grid synchronization, transformer integration, and industrial net metering approvals.',
              },
            ].map((proj, idx) => (
              <ScrollReveal key={idx} delay={idx + 1}>
                <div className="glass-panel" style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '100px', background: 'var(--color-accent-pale)', color: 'var(--color-accent)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
                      {proj.tag}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                      {proj.title}
                    </h3>
                    <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '12px' }}>
                      {proj.stats}
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      {proj.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

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
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
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
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
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
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-accent)', marginBottom: '8px' }}>
                    Direct Solar Contact Desk
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={15} color="var(--color-accent)" />
                      <span>Email: <strong style={{ color: 'var(--color-text-primary)' }}>Solis@jcapexv.com</strong> (CC: admin@jcapexv.com)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={15} color="var(--color-accent)" />
                      <span>Direct: <strong style={{ color: 'var(--color-text-primary)' }}>+91 70211 12664</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={15} color="var(--color-accent)" />
                      <span>Office: One International Centre, Tower 1, Elphinstone, Mumbai 400013</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Pre-fillable Interactive Enquiry Form */}
            <ScrollReveal delay={2}>
              <form onSubmit={handleSubmitEnquiry} className="glass-panel" style={{ padding: '36px', background: 'var(--color-surface)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
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
                    fontWeight: 700,
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
                  This will open an email to Solis@jcapexv.com (CC: admin@jcapexv.com) with your pre-filled inquiry details.
                </p>

                {formSubmitted && (
                  <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'var(--color-accent-pale)',
                    border: '1px solid var(--color-border-accent-light)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.92rem' }}>
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
