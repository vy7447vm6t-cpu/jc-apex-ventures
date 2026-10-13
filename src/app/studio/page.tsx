"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Clippy from '@/components/Clippy';
import { ArrowUpRight, MapPin, Phone, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StudioPage() {
  return (
    <main className="grounded-canvas">
      <Navbar />
      <Clippy />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          paddingTop: '160px',
          paddingBottom: '80px',
          backgroundColor: '#111111',
          color: '#FFFFFF',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div className="eye-brow-container" style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C29F53',
              }}
            >
              [practice, leadership &amp; discipline]
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            The Studio &amp; <span style={{ fontStyle: 'italic', color: '#E8E4DA' }}>Engineering Practice.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: 'rgba(255, 255, 255, 0.78)',
              maxWidth: '820px',
              lineHeight: 1.65,
              margin: '0 0 36px 0',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 300,
            }}
          >
            JC Apex Ventures operates from One International Centre, Mumbai. We unite three decades of utility network engineering with world-class creative brand direction to deliver turnkey field execution.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
              target="_blank"
              rel="noopener noreferrer"
              className="button is-icon"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111111',
                padding: '0.85rem 1.6rem',
                textDecoration: 'none',
              }}
            >
              <MapPin size={16} />
              <span>Open Studio in Google Maps</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="tel:+917021112664"
              className="button is-icon is-alternate"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                padding: '0.85rem 1.6rem',
                textDecoration: 'none',
              }}
            >
              <Phone size={15} />
              <span>Call +91 70211 12664</span>
            </a>
          </div>
        </div>
      </section>

      {/* Studio Location & Access Card */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          padding: '80px 24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
                <span className="text-eye-brow">[studio coordinates]</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  lineHeight: 1.15,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Headquarters at One International Centre.
              </h2>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#555555',
                  lineHeight: 1.7,
                  margin: '0 0 28px 0',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                Located along Senapati Bapat Marg in Elphinstone / Prabhadevi, our studio places engineering consultants, architectural draftsmen, and account executives in the heart of Mumbai commercial infrastructure.
              </p>

              <div
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-grounded-stone)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  marginBottom: '28px',
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <MapPin size={22} color="#C29F53" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.05rem', color: '#111111', marginBottom: '4px' }}>
                      One International Centre, Tower 1
                    </strong>
                    <div style={{ color: '#555555', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      Units 801-802, 8th Floor, Senapati Bapat Marg,<br />
                      Elphinstone / Prabhadevi, Mumbai 400013, Maharashtra, India.
                    </div>
                    <div
                      style={{
                        marginTop: '12px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.8rem',
                        color: '#C29F53',
                      }}
                    >
                      Latitude: 19.0069° N | Longitude: 72.8311° E
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-icon"
                style={{
                  backgroundColor: '#111111',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.6rem',
                  textDecoration: 'none',
                }}
              >
                <span>Navigate via Google Maps</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                height: '460px',
              }}
            >
              <img
                src="/images/one-international-centre.jpg"
                alt="One International Centre Mumbai Studio"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(17, 17, 17, 0.85)',
                  backdropFilter: 'blur(16px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono, monospace)', color: '#C29F53' }}>
                    [STUDIO DESK]
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 500 }}>
                    Consultation by Appointment
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#CCCCCC', fontFamily: 'var(--font-mono, monospace)' }}>
                  Mon - Sat 10:00 - 18:30 IST
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Dossiers */}
      <section
        style={{
          backgroundColor: 'var(--color-grounded-stone)',
          padding: '100px 24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
            <span className="text-eye-brow">[practice leadership]</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 16px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Senior Practice Directors &amp; Engineering Fellows
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#666666',
              lineHeight: 1.6,
              maxWidth: '820px',
              margin: '0 0 50px 0',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            Every division is led by field practitioners with verified operational histories, not theoretical managers.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Director 1: Jitendra Chavan */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  color: '#C29F53',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                [FOUNDER &amp; TECHNICAL DIRECTOR]
              </div>
              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 500,
                  color: '#111111',
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Jitendra Chavan
              </h3>
              <div
                style={{
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: '#777777',
                  marginBottom: '16px',
                }}
              >
                36+ Years Direct Mumbai Utility Network Operations
              </div>
              <p
                style={{
                  fontSize: '0.94rem',
                  color: '#555555',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                Over three decades of service inside Mumbai electrical distribution grids. Specializes in statutory MERC tariff compliance, CGRF consumer grievance advocacy, high-tension substation commissioning, and elevated solar pergola structures. Direct working background across BEST, Adani Electricity (AEML), Tata Power (TPCL), and MSEDCL.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge-tag">MERC Tariff Regularization</span>
                <span className="badge-tag">CGRF Advocacy</span>
                <span className="badge-tag">HT/LT Engineering</span>
              </div>
            </div>

            {/* Director 2: Manish Ajgaonkar */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  color: '#C29F53',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                [CREATIVE DIRECTOR &amp; BRAND VISIONARY]
              </div>
              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 500,
                  color: '#111111',
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Mr. Manish Ajgaonkar
              </h3>
              <div
                style={{
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: '#777777',
                  marginBottom: '16px',
                }}
              >
                Art Direction, FMCG Packaging &amp; Brand Systems
              </div>
              <p
                style={{
                  fontSize: '0.94rem',
                  color: '#555555',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                Celebrated Creative Director behind iconic Indian and global brands, including Go Cheese, Gowardhan Pure Cow Ghee, Vadilal Ice-creams, Citroën India, Kaya Skin Clinic, Samsonite Luggage, Complan, and Club Mahindra campaigns. Leads eMudran visual identity desk and structural packaging engineering.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge-tag">FMCG Packaging</span>
                <span className="badge-tag">Identity Systems</span>
                <span className="badge-tag">Art Direction</span>
              </div>
            </div>

            {/* Director 3: Thermal & Solid Waste Tech */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  color: '#C29F53',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                [PATENTED ENVIRONMENTAL TECH]
              </div>
              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 500,
                  color: '#111111',
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Dr. Manoj Chavan &amp; Mahendra Kabnurkar
              </h3>
              <div
                style={{
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: '#777777',
                  marginBottom: '16px',
                }}
              >
                Patented Zero-Energy Solid Waste Processing &amp; Project Advisory
              </div>
              <p
                style={{
                  fontSize: '0.94rem',
                  color: '#555555',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                }}
              >
                Inventors and co-developers of the patented zero-power thermal degradation technology certified by the Maharashtra Pollution Control Board (MPCB). Processes unsegregated municipal and industrial solid waste with zero petrol, diesel, or external electricity, converting mass to 4% ash for paver blocks and 350°C green coal.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge-tag">Central Govt Patent</span>
                <span className="badge-tag">MPCB Certified</span>
                <span className="badge-tag">Zero External Energy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Manifesto */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '100px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div className="eye-brow-container" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            <span className="text-eye-brow">[the engineering manifesto]</span>
          </div>

          <blockquote
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)',
              lineHeight: 1.3,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#111111',
              margin: '0 0 28px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            &quot;In Mumbai, physics meets policy. A rooftop is not just square footage: it is a high-wind structural envelope governed by municipal setbacks and DISCOM tariff classes. Our practice exists to turn intricate statutory boundaries into executed, lasting reality.&quot;
          </blockquote>

          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.88rem',
              color: '#C29F53',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            JC Apex Ventures (OPC) Private Limited
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .badge-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 9999px;
          background-color: var(--color-grounded-stone);
          color: #444444;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </main>
  );
}
