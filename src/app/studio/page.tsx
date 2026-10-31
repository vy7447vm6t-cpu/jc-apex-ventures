import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionEyebrow from '@/components/SectionEyebrow';
import { SpecularButton } from '@/components/react-bits';
import { CLIENT_ROSTER, isShowable } from '@/content/track-record';
import { DIVISION_ONE_LINERS } from '@/content/messaging';
import { ArrowUpRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Studio | JC Apex Ventures',
  description: 'Our office at One International Centre, Elphinstone, Mumbai, and the people who lead the work.',
};

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013';

// Office details as in the proof register (brand guidelines 6): Tower 1, Units 801–802, 8th Floor.
const OFFICE_ROWS = [
  { label: 'Office', value: 'Units 801–802, 8th Floor, Tower 1, One International Centre, Senapati Bapat Marg, Elphinstone, Mumbai 400013' },
  { label: 'Phone and WhatsApp', value: '+91 70211 12664' },
  { label: 'Email', value: 'admin@jcapexv.com' },
];

const DIVISIONS = [
  { slug: 'grid-apex', name: 'Grid Apex' },
  { slug: 'solis', name: 'Solis' },
  { slug: 'sanyog', name: 'Sanyog' },
  { slug: 'tvasta', name: 'Tvasta' },
  { slug: 'emudran', name: 'eMudran' },
  { slug: 'agrim', name: 'Agrim' },
];

const SERIF = 'var(--font-serif-display), "Instrument Serif", Georgia, serif';
const SANS = 'var(--font-sans, Inter, sans-serif)';

/**
 * Studio: address, map link and the people who lead the work. The drawn suite plan, the
 * feasibility carousel and other undocumented claims are retired (brand guidelines 2.8.2, 6).
 */
export default function StudioPage() {
  // A personal portfolio, credited to the person and never shown as group clients (guidelines 5.5).
  const creativeCredits = CLIENT_ROSTER.filter((c) => c.attribution === 'creative-director' && isShowable(c.proof)).map((c) => c.name);

  return (
    <main className="studio-canvas relative min-h-screen">
      <Navbar />

      <section style={{ padding: 'clamp(136px, 18vh, 176px) 24px clamp(64px, 9vh, 96px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="studio-hero-grid" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div>
            <SectionEyebrow tone="dark">Our studio</SectionEyebrow>
            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.025em', margin: '0 0 24px', fontFamily: SERIF, color: '#FFFFFF' }}>
              Where to find us.
            </h1>
            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', color: '#C9D1D9', maxWidth: '560px', lineHeight: 1.65, margin: '0 0 32px', fontFamily: SANS }}>
              Our office is at One International Centre in Elphinstone, Mumbai.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <SpecularButton href={MAPS_URL} variant="light" icon={<ArrowUpRight size={15} />}>
                Open in Google Maps
              </SpecularButton>
              <SpecularButton href="tel:+917021112664" variant="glass" icon={<Phone size={15} />}>
                Call us
              </SpecularButton>
            </div>
          </div>
          <dl className="fact-rows">
            {OFFICE_ROWS.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="leadership" style={{ padding: 'clamp(72px, 10vh, 112px) 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', scrollMarginTop: '100px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionEyebrow number={1} tone="dark">
            People
          </SectionEyebrow>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.15, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 36px', fontFamily: SERIF, color: '#FFFFFF' }}>
            Who leads the work.
          </h2>
          <div className="studio-people">
            <article className="studio-person">
              <p className="studio-person-role">Director</p>
              <h3>Jitendra Chavan</h3>
              <p>36+ years in Mumbai&apos;s power utility sector, including BEST. Leads the group&apos;s electrical, solar and utility work.</p>
            </article>
            <article className="studio-person">
              <p className="studio-person-role">Creative Director, eMudran</p>
              <h3>Manish Ajgaonkar</h3>
              <p>Creative work led by Manish Ajgaonkar includes {creativeCredits.slice(0, -1).join(', ')} and {creativeCredits.at(-1)}.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: 'clamp(72px, 10vh, 112px) 24px', scrollMarginTop: '100px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionEyebrow number={2} tone="dark">
            The six divisions
          </SectionEyebrow>
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.15, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 36px', fontFamily: SERIF, color: '#FFFFFF' }}>
            One desk for every division.
          </h2>
          <ul className="hero-division-list">
            {DIVISIONS.map((division) => (
              <li key={division.slug}>
                <a href={`/${division.slug}`} className="hero-division-link">
                  <span className="hero-division-name">
                    {division.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                  <span className="hero-division-line">{DIVISION_ONE_LINERS[division.slug]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
