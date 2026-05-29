"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import EnquiryForm, { FormField } from '@/components/EnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';
import { ShieldAlert, Zap } from 'lucide-react';

const formFields: FormField[] = [
  { name: 'complaintType', label: 'Type of Complaint / Query', type: 'select', options: [
    'Bill not received / Need hard copy',
    'Need arrangement to make bill payment',
    'Need to disconnect the meter',
    'Query raised with Electric Co. — need response',
    'Single phase to Three phase connection',
    'High bill complaint',
    'Tariff category change',
    'Extension of load (Sanction load)',
    'Change of address on bill',
    'Change of name on bill',
    'New Connection',
    'Sanction load enhancement (Increase)',
    'HT Consumer complaint',
    'Filing Grievance in CGRF',
    'Complaint against staff'
  ], required: true },
  { name: 'name', label: 'Your Name', type: 'text', required: true },
  { name: 'relation', label: 'Relation with Consumer', type: 'select', options: ['Self', 'Spouse', 'Parent', 'Tenant', 'Agent', 'Other'], required: true },
  { name: 'docsAvailable', label: 'Are necessary documents available?', type: 'radio', options: ['Available', 'Not Available'], required: true },
  { name: 'contact', label: 'Contact Number', type: 'tel', placeholder: '+91', required: true },
  { name: 'email', label: 'Email ID', type: 'email', placeholder: 'your@email.com', required: true },
  { name: 'billUpload', label: 'Electricity Bill', type: 'file-info', placeholder: 'Please attach a copy of the electricity bill (PDF/JPG/JPEG) directly in the email that opens.' },
];

const supports = [
  "Wiring Test Report",
  "Online Requisition Support",
  "Residential Wiring",
  "Electric Meter Room Wiring",
  "Service Cut-out Replacement",
  "Service Cable Enhancement",
  "New Service Cable",
  "HT Installation, Transformers etc.",
  "Overhauling (Transformer, Breaker) & Maintenance"
];

export default function ElectricityGrievancesPage() {
  return (
    <main>
      <Navbar />
      
      <PageHero 
        title="Electricity Grievances & Support" 
        tagline="Led by engineering veterans with over 36 years of expertise in urban power systems. We resolve billing disputes and handle complex HT installations."
        breadcrumb="Electricity Grievances"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } } as any}>
            
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '24px' }}>
                  Consumer Advocacy &<br/>Technical Resolutions.
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                  Dealing with electrical boards (BEST, MSEDCL, Adani) can be complex and time-consuming. From unjustified high bills to CGRF grievance filings, we represent your interests with deep institutional knowledge.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div style={{ 
                  display: 'flex', alignItems: 'flex-start', gap: '16px', 
                  padding: '24px', background: 'rgba(212,175,55,0.1)', 
                  border: '1px solid var(--color-border-accent)', borderRadius: '16px',
                  marginBottom: '48px'
                }}>
                  <ShieldAlert color="var(--color-accent)" size={24} style={{ flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>Initial Consultation Fee</h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      A nominal fee of <strong style={{ color: 'var(--color-accent)' }}>₹50</strong> applies for the initial query analysis. This ensures dedicated attention to your specific case from our senior engineers.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Technical Support & Execution</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Beyond grievance resolution, we provide end-to-end execution for electrical infrastructure:
                </p>
                <div style={{ 
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' 
                }}>
                  {supports.map((support, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Zap size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{support}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={3}>
              <EnquiryForm 
                mailto="Consumercmpl@jcapexv.com"
                subject="Electricity Grievance / Query"
                fields={formFields}
                submitText="Submit Complaint / Query"
              />
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
