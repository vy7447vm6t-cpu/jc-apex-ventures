"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import EnquiryForm, { FormField } from '@/components/EnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';
import { FileText } from 'lucide-react';

const formFields: FormField[] = [
  { name: 'service', label: 'Service Needed', type: 'select', options: [
    'PWD Licences (Wireman, Supervisory, Contractor)',
    'Udyam Registration',
    'FSSAI',
    'Health Licence',
    'GST Registration',
    'PAN Card / Aadhar Card',
    'Marriage Certificate',
    'Affidavit',
    'Leave & Licence',
    'RTO',
    'Passport'
  ], required: true },
  { name: 'documentsReady', label: 'List of Documents Ready?', type: 'radio', options: ['Yes', 'No', 'Need to talk'], required: true },
  { name: 'urgency', label: 'Urgency', type: 'radio', options: ['Urgent', 'Very Urgent'], required: true },
  { name: 'contact', label: 'Contact Number', type: 'tel', placeholder: '+91', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
];

const servicesList = [
  { id: 1, name: "PWD Licences", docs: "Wireman, Supervisory, Contractor" },
  { id: 2, name: "Udyam Registration", docs: "Standard KYC & Business proofs" },
  { id: 3, name: "FSSAI", docs: "Premise & Entity documents" },
  { id: 4, name: "Health Licence", docs: "Municipal requirements" },
  { id: 5, name: "GST Registration", docs: "PAN, Aadhar, Address proof" },
  { id: 6, name: "PAN Card / Aadhar Card", docs: "Identity & Address proofs" },
  { id: 7, name: "Marriage Certificate", docs: "Joint photographs, Affidavits" },
  { id: 8, name: "Affidavit", docs: "Drafting subject to requirement" },
  { id: 9, name: "Leave & Licence", docs: "Property documents, KYC of parties" },
  { id: 10, name: "RTO", docs: "Vehicle & Identity documents" },
  { id: 11, name: "Passport", docs: "Standard Government portal docs" },
];

export default function LicensesPage() {
  return (
    <main>
      <Navbar />
      
      <PageHero 
        title="Licences & Liaisoning" 
        tagline="Airtight regulatory navigation. We manage institutional compliance and accelerate liaisoning procedures across municipal and state frameworks."
        breadcrumb="Licences"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } } as any}>
            
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '24px' }}>
                  Statutory Clearances,<br/>Simplified.
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                  Bureaucracy should never be a bottleneck for growth. From complex PWD contractor licensing to standard GST registrations, we ensure every application is filed with uncompromising precision.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Sr No.</th>
                        <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Job / Service</th>
                        <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Document List</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesList.map((svc) => (
                        <tr key={svc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '16px 24px', color: 'var(--color-accent)', fontWeight: 600 }}>{svc.id.toString().padStart(2, '0')}</td>
                          <td style={{ padding: '16px 24px', fontWeight: 500 }}>{svc.name}</td>
                          <td style={{ padding: '16px 24px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{svc.docs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={2}>
                <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', background: 'rgba(212,175,55,0.05)', borderRadius: '12px', border: '1px solid var(--color-border-accent)' }}>
                  <FileText color="var(--color-accent)" size={20} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>Standard processing rates apply. Final estimates provided upon document review.</span>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={3}>
              <EnquiryForm 
                mailto="licenses@jcapexv.com"
                subject="New Licence / Liaisoning Request"
                fields={formFields}
                submitText="Submit Request"
              />
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
