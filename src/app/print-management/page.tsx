"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import EnquiryForm, { FormField } from '@/components/EnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';

const formFields: FormField[] = [
  { name: 'requestType', label: 'Request Type', type: 'radio', options: ['Job (One-off)', 'Contract (Ongoing)', 'General Enquiry'], required: true },
  { name: 'category', label: 'Category', type: 'radio', options: ['Corporate', 'Personal / Individual'], required: true },
  { name: 'jobType', label: 'Job Type', type: 'select', options: ['Business Cards', 'Letterheads & Stationery', 'Brochures & Catalogues', 'Banners & Flex', 'Wedding / Event Cards', 'Custom Requirement'], required: true },
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
        title="Print Management & Design" 
        tagline="Quality is the Best Kind of Advertising. From corporate branding to premium personal stationery, we handle the print lifecycle with precision."
        breadcrumb="Print Management"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } } as any}>
            
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '24px' }}>
                  Two Streams.<br/>One Standard of Excellence.
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                  Whether you are establishing a corporate identity or celebrating a personal milestone, our print management division ensures your physical assets reflect your core values.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="glass-panel" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--color-accent)' }}>Corporate</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      Business cards, letterheads, brochures, multi-page catalogues, and complete corporate branding kits designed for scale and consistency.
                    </p>
                  </div>
                  
                  <div className="glass-panel" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--color-accent)' }}>Personal & Individual</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      Premium wedding invitations, personal stationery, and bespoke event materials crafted with high-end finishes and attention to detail.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <div style={{ marginTop: '60px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Sample Catalogue & Rates</h3>
                  <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px dashed var(--color-border-accent)' }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Catalogue updates and standard rate cards are being digitized and will be available here soon.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={3}>
              <EnquiryForm 
                mailto="printmgmt@jcapexv.com"
                subject="New Print Management Enquiry"
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
