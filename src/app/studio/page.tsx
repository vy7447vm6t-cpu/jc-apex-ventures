import React from 'react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/content/seo';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionEyebrow from '@/components/SectionEyebrow';
import SpotlightCard from '@/components/SpotlightCard';
import SiteEnquiryForm from '@/components/SiteEnquiryForm';
import StudioSlats from './StudioSlats';
import { MagicBento, SpecularButton, type BentoCardData } from '@/components/react-bits';
import { CLIENT_ROSTER, isShowable } from '@/content/track-record';
import { DIVISION_ONE_LINERS, PROOF_LINE } from '@/content/messaging';
import { divisions } from '@/content/divisions';
import { ArrowUpRight, Download, Phone } from 'lucide-react';

export const metadata: Metadata = pageMetadata({
  title: 'Studio',
  description: 'Our office at Tower 1, One International Centre, Elphinstone, Mumbai, the people who lead the work, and the inbox for each division.',
  path: '/studio',
});

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=One+International+Centre+Tower+1+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013';

// Office details as in the proof register (brand guidelines 6): Tower 1, Units 801–802, 8th Floor.
const OFFICE_ROWS = [
  { label: 'Office', value: 'Units 801–802, 8th Floor, Tower 1, One International Centre, Senapati Bapat Marg, Elphinstone, Mumbai 400013' },
  { label: 'Phone and WhatsApp', value: '+91 70211 12664' },
  { label: 'Email', value: 'admin@jcapexv.com' },
];

const SERIF = 'var(--font-serif-display), "Instrument Serif", Georgia, serif';
const SANS = 'var(--font-sans, Inter, sans-serif)';
const H2: React.CSSProperties = { fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.15, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 36px', fontFamily: SERIF, color: '#FFFFFF' };

/**
 * Studio: where we are, who leads the work (with our own team photo), every division with its
 * inbox, and a general enquiry form. Team lines come from the division profiles (PDF); Tvasta's
 * designers are counted, not named, until each name is confirmed.
 */
export default function StudioPage() {
  // A personal portfolio, credited to the person and never shown as group clients (guidelines 5.5).
  const creativeCredits = CLIENT_ROSTER.filter((c) => c.attribution === 'creative-director' && isShowable(c.proof)).map((c) => c.name);

  const people = [
    {
      role: 'Director',
      name: 'Jitendra Chavan',
      text: `${PROOF_LINE} He leads the group’s electrical, solar and utility work.`,
    },
    {
      role: 'Creative Director, eMudran',
      name: 'Manish Ajgaonkar',
      text: `Creative work led by Manish Ajgaonkar includes ${creativeCredits.slice(0, -1).join(', ')} and ${creativeCredits.at(-1)}.`,
    },
    {
      role: 'Production, eMudran',
      name: 'Hemangi Patil',
      text: '22+ years in print, signage, large-format and field work. She turns approved artwork into print, signage and installed output.',
    },
    {
      role: 'Design team, Tvasta',
      name: 'Three architects and three interior designers',
      text: 'They plan, draw and supervise every Tvasta project, from the first layout to the snag list.',
    },
  ];

  const divisionCards: BentoCardData[] = divisions.map((d) => ({
    id: d.slug,
    title: d.name,
    subtitle: DIVISION_ONE_LINERS[d.slug] ?? d.description,
    content: (
      <a href={d.href} className="studio-bento-link">
        {d.name} page <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    ),
    footer: (
      <>
        {d.contact.emails.map((email) => (
          <a key={email} href={`mailto:${email}`} className="studio-bento-mail">
            {email}
          </a>
        ))}
        {d.contact.note && <span> · {d.contact.note}</span>}
      </>
    ),
  }));

  return (
    <main id="main-content" className="studio-canvas relative min-h-screen">
      <Navbar />

      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(136px, 18vh, 176px) 24px clamp(64px, 9vh, 96px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <StudioSlats />
        <div className="studio-hero-grid" style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div>
            <SectionEyebrow tone="dark">Our studio</SectionEyebrow>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.4vw, 4.8rem)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.025em', margin: '0 0 24px', fontFamily: SERIF, color: '#FFFFFF' }}>
              Tower 1, One International Centre, Elphinstone.
            </h1>
            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', color: '#C9D1D9', maxWidth: '560px', lineHeight: 1.65, margin: '0 0 32px', fontFamily: SANS }}>
              Units 801–802, on the 8th floor. Call or WhatsApp before you visit, so the person handling your work is in.
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
          <SectionEyebrow tone="dark">People</SectionEyebrow>
          <h2 style={H2}>Who leads the work.</h2>
          <div className="studio-team">
            <figure style={{ margin: 0 }}>
              <div className="studio-team-photo">
                <Image src="/images/own/team.jpg" alt="Jitendra Chavan, Director, with members of the team" fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
              </div>
              <figcaption className="photo-caption" style={{ color: '#8B949E' }}>
                Our Director (right) with members of the team, Mumbai, October 2026.
              </figcaption>
            </figure>
            <div className="studio-people">
              {people.map((p) => (
                <SpotlightCard key={p.name} theme="dark" enableTilt={false} className="studio-person">
                  <p className="studio-person-role">{p.role}</p>
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="divisions" style={{ padding: 'clamp(72px, 10vh, 112px) 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', scrollMarginTop: '100px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionEyebrow tone="dark">The six divisions</SectionEyebrow>
          <h2 style={H2}>Each division, and the inbox that reaches it.</h2>
          <MagicBento cards={divisionCards} tone="dark" />
        </div>
      </section>

      <section id="contact" style={{ padding: 'clamp(72px, 10vh, 112px) 24px', scrollMarginTop: '100px' }}>
        <div className="studio-contact" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div>
            <SectionEyebrow tone="dark">Enquire</SectionEyebrow>
            <h2 style={{ ...H2, margin: '0 0 16px' }}>Not sure which division? Write to us here.</h2>
            <p style={{ fontSize: '1.05rem', color: '#C9D1D9', lineHeight: 1.65, margin: '0 0 24px', fontFamily: SANS, maxWidth: '480px' }}>
              It goes to admin@jcapexv.com, and we pass it to the right division with your details, so you only explain it once.
            </p>
            <a href="/profiles/JC-Apex-Ventures-Company-Profile.pdf" className="studio-download" download>
              <Download size={16} aria-hidden="true" />
              Company profile (PDF)
            </a>
          </div>
          <div className="studio-form">
            <SiteEnquiryForm to="admin@jcapexv.com" subject="Website enquiry" needs={divisions.map((d) => d.name)} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
