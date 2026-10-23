"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import EnquiryForm, { FormField } from '@/components/EnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';
import { FileText } from 'lucide-react';

const formFields: FormField[] = [
  { name: 'service', label: 'Statutory Approval Needed', type: 'select', options: [
    'Maharashtra PWD Electrical Contractor License (Class-A)',
    'PWD Electrical Supervisory & Wireman Competency Certificates',
    'Chief Electrical Inspector (CEI) Substation Clearance',
    'MPCB Consent to Establish (CTE) / Consent to Operate (CTO)',
    'Factory Act Directorate (CIF) Industrial Licensing',
    'Municipal Corporation Fire NOC & Trade License',
    'Udyam & MSME Regulatory Classification',
    'FSSAI Central / State Manufacturing License',
    'GST Registration & Commercial Tax Structuring'
  ], required: true },
  { name: 'documentsReady', label: 'List of Documents Ready?', type: 'radio', options: ['Yes', 'No', 'Need to talk'], required: true },
  { name: 'urgency', label: 'Urgency', type: 'radio', options: ['Urgent', 'Very Urgent'], required: true },
  { name: 'contact', label: 'Contact Number', type: 'tel', placeholder: '+91', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
];

const servicesList = [
  { id: 1, name: "Maharashtra PWD Class-A Electrical License", docs: "Chartered Electrical Engineer supervision, solvency certificate, equipment inventory" },
  { id: 2, name: "Supervisory & Wireman Competency", docs: "ITI / Diploma credentials, apprentice logbooks, state examination docket" },
  { id: 3, name: "Chief Electrical Inspector (CEI) Clearances", docs: "Single-line diagrams (SLD), transformer earthing tests, relay calibration reports" },
  { id: 4, name: "MPCB Consents (CTE & CTO)", docs: "Effluent / emission calculations, solid waste plan, environmental audit dockets" },
  { id: 5, name: "Factory Act & Industrial Registrations", docs: "Architectural floor plans, machinery layouts, stability certificates" },
  { id: 6, name: "Municipal Fire NOC & Trade Compliance", docs: "Hydrant schematics, smoke extraction specs, emergency egress audits" },
  { id: 7, name: "Udyam & MSME Classification", docs: "Statutory audited balance sheets, plant & machinery investment certifications" },
  { id: 8, name: "FSSAI Food Manufacturing Licensing", docs: "Water testing reports, food safety management plan (FSMS), facility blueprints" },
  { id: 9, name: "GST & Commercial Tax Structuring", docs: "Corporate PAN, entity registration documents, registered office lease deed" },
];

export default function LicensesPage() {
  return (
    <main className="grounded-canvas">
      <Navbar />
      
      <PageHero 
        title="Licences & Government Registrations" 
        tagline="Part of our SANYOG division. PWD contractor licences, business registrations and official documentation handled cleanly."
        breadcrumb="Licences"
        parent={{ label: 'SANYOG', href: '/sanyog' }}
      />

      <section className="section">
        <div className="container">
          <div className="grid-split">
            
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
