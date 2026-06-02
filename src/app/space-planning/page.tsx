"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import EnquiryForm, { FormField } from '@/components/EnquiryForm';
import ScrollReveal from '@/components/ScrollReveal';

const formFields: FormField[] = [
  { name: 'propertyType', label: 'Property Type', type: 'select', options: ['Flat 1 BHK', 'Flat 2 BHK', 'Flat 3 BHK', 'Flat 4 BHK', 'Bungalow', 'Office / Commercial'], required: true },
  { name: 'status', label: 'Current Status', type: 'radio', options: ['Ready', 'Under Construction', 'Planning Stage'], required: true },
  { name: 'vastu', label: 'Vastu Suggestions', type: 'radio', options: ['Required', 'Not Required'], required: true },
  { name: 'scope', label: 'Scope of Work', type: 'checkbox', options: ['Design & Planning', 'Civil Work', 'Electrical', 'Paint', 'Furniture & Furnishings'], required: false },
  { name: 'budget', label: 'Budget Expectation', type: 'radio', options: ['Basic', 'Standard', 'Premium', 'Luxury'], required: true },
  { name: 'urgency', label: 'Urgency', type: 'radio', options: ['Leisure', 'Urgent', 'Very Urgent'], required: true },
  { name: 'details', label: 'Requirement Details', type: 'textarea', placeholder: 'Tell us a bit more about your vision...', required: false },
  { name: 'contact', label: 'Contact Number', type: 'tel', placeholder: '+91', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
  { name: 'ideas', label: 'Ideas / References', type: 'file-info', placeholder: 'Have reference images? Email your PDF, JPG, or JPEG files directly to spacemgmt@jcapexv.com along with this enquiry.' },
];

export default function SpacePlanningPage() {
  return (
    <main>
      <Navbar />
      
      <PageHero 
        title="Space Planning & Design" 
        tagline="Built with precision, designed with taste. Turnkey interior decoration and space management for residential and commercial environments."
        breadcrumb="Space Planning"
      />

      <section className="section">
        <div className="container">
          <div className="grid-2-col">
            
            <div>
              <ScrollReveal>
                <div className="section-divider" />
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '24px' }}>
                  Environments that inspire.
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                  Our space planning division bridges the gap between civil engineering and high-end aesthetic design. We don't just decorate rooms; we optimize spatial utility while ensuring structural integrity and electrical compliance.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div style={{
                  background: 'rgba(212,175,55,0.03)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '24px',
                  padding: '40px',
                  marginBottom: '40px'
                }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--color-text-primary)' }}>Our Approach</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      "Comprehensive space audits before planning",
                      "Vastu-compliant layouts (upon request)",
                      "Seamless integration of civil and electrical works",
                      "Material selection matching your exact budget tier",
                      "Strict adherence to municipal structural guidelines"
                    ].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                        <span style={{ color: 'var(--color-accent)' }}>✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={2}>
                <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--color-accent)' }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    "From a basic functional office setup to a luxury 4BHK overhaul, every square foot is engineered for maximum utility and taste."
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={3}>
              <EnquiryForm 
                mailto="spacemgmt@jcapexv.com"
                subject="New Space Planning & Design Enquiry"
                fields={formFields}
                submitText="Submit Details"
              />
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
