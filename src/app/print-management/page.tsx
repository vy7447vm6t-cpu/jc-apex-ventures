"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import EnquiryForm, { FormField } from '@/components/EnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  Building2, 
  BookOpen, 
  Heart, 
  Tag, 
  Layers, 
  Image as ImageIcon, 
  Briefcase, 
  Printer,
  FileText,
  Sparkles
} from 'lucide-react';

const formFields: FormField[] = [
  { name: 'requestType', label: 'Request Type', type: 'radio', options: ['Job (One-off)', 'Contract (Ongoing)', 'General Enquiry'], required: true },
  { name: 'category', label: 'Category', type: 'radio', options: ['Corporate', 'Personal / Individual'], required: true },
  { name: 'jobType', label: 'Job Type', type: 'select', options: [
    'Corporate Printing', 
    'Brochures', 
    'Catalogues', 
    'Wedding Cards', 
    'Signage', 
    'Vinyl', 
    'Flex / Banners', 
    'Stickers / Labels', 
    'Branding Materials', 
    'Custom Requirement'
  ], required: true },
  { name: 'quantity', label: 'Quantity', type: 'number', placeholder: 'e.g., 500', required: true },
  { name: 'area', label: 'Delivery Area', type: 'select', options: ['Vasai', 'Virar', 'Nalasopara', 'Mumbai City', 'Other'], required: true },
  { name: 'quality', label: 'Quality Requirement', type: 'radio', options: ['Standard', 'Premium'], required: true },
  { name: 'budget', label: 'Estimated Budget Range (₹)', type: 'text', placeholder: 'e.g., 5000 - 10000', required: false },
  { name: 'contact', label: 'Contact Number', type: 'tel', placeholder: '+91', required: true },
  { name: 'email', label: 'Email for Estimate', type: 'email', placeholder: 'your@email.com', required: true },
  { name: 'files', label: 'Design Files', type: 'file-info', placeholder: 'Accepted formats: PDF, JPG, JPEG. Please attach these files directly in the email that opens when you submit.' },
];

export default function PrintManagementPage() {
  return (
    <main>
      <Navbar />
      
      <PageHero 
        title="eMudran" 
        tagline="The Print Management & Design Division of JC Apex Ventures. Quality is the best kind of advertising. From corporate branding to bespoke event stationery, we handle the print lifecycle with precision."
        breadcrumb="eMudran"
      />

      {/* Intro Section */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <ScrollReveal>
              <div className="label" style={{ marginBottom: '16px' }}>
                <span className="label-dot"></span>
                JC Apex Ventures Division
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', marginBottom: '24px', lineHeight: 1.2 }}>
                Two Streams.<br/><span className="text-gradient-accent">One Standard of Excellence.</span>
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                eMudran operates at the intersection of premium creative design and high-fidelity print production. We are structured to service institutional corporate needs and tailored personal commissions with equal quality.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid-2-col">
            <ScrollReveal delay={1}>
              <div className="glass-panel" style={{ padding: '36px', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px' }}>
                    <Building2 color="var(--color-accent)" size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Corporate & Commercial</h3>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Business cards, letterheads, brochures, multi-page catalogues, and complete corporate branding kits designed for scale, compliance, and consistency.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={2}>
              <div className="glass-panel" style={{ padding: '36px', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px' }}>
                    <Heart color="var(--color-accent)" size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Personal & Bespoke</h3>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Premium wedding invitations, event cards, custom stickers, and bespoke stationery crafted with high-end finishes, special textures, and precision details.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '16px' }}>
                Printing & Design Capabilities
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
                We provide a comprehensive range of print media and design formats. Explore our major capability categories below.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid-3-col">
            <ScrollReveal delay={1}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Building2 color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Corporate Printing</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Letterheads, envelopes, business cards, billing stationery, and office documentation packs designed for professional presence.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <BookOpen color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Brochures & Catalogues</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Bi-folds, tri-folds, leaflets, multi-page product catalogues, and booklets with high-end binding and coating options.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Heart color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Wedding Cards</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Premium wedding invitation sets, event cards, custom foil-stamped boxes, and metallic accent envelopes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Layers color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Signage & Vinyl</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Acrylic signage panels, backlit LED signs, promotional vinyl decals, glass frostings, and wall graphics.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={5}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ImageIcon color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Flex & Banners</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Large format banners, event backdrops, roll-up standees (pull-up banners), and heavy-duty outdoor hoarding prints.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={6}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Tag color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Stickers & Labels</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Custom die-cut stickers, product labels, packaging seals, barcode stickers, and high-tack industrial labels.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={7}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Briefcase color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Branding Materials</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Presentation folders, certificate boards, marketing kits, paper bags, and customized branding collateral.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={8}>
              <div className="glass-panel" style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Printer color="var(--color-accent)" size={28} />
                <h3 style={{ fontSize: '1.15rem' }}>Custom Finishes</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Spot UV, metallic hot foil stamping, embossing, debossing, matte/gloss lamination, and die-cutting.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Catalogue & Rates Section */}
      <section className="section" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Sample Catalogue & Rates</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  Standard rate structures and samples are digitalized for quick reference.
                </p>
              </div>
              
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px dashed var(--color-border-accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <FileText size={18} color="var(--color-accent)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Standard Rates.pdf</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                    <BookOpen size={18} color="var(--color-accent)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>eMudran Catalogue.pdf</span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  Catalogue downloads and standard rate cards are being updated for 2026. Submit an estimate request below to receive rates directly via email.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-section" className="section" style={{ paddingTop: '40px', background: 'radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 70%)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div className="label" style={{ marginBottom: '16px' }}>
                  <Sparkles size={14} style={{ marginRight: '6px' }} />
                  Estimate Request
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '16px' }}>
                  Get a Free Print Estimate
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  Provide your job specifications, quantity requirements, and finishing preferences. eMudran's desk will calculate pricing and reply directly via email.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <EnquiryForm 
                mailto="printmgmt@jcapexv.com"
                subject="New eMudran Print Project Estimate Request"
                fields={formFields}
                submitText="Get Estimate"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
