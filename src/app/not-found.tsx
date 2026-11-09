import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionEyebrow from '@/components/SectionEyebrow';
import { divisions } from '@/content/divisions';
import { DIVISION_ONE_LINERS } from '@/content/messaging';
import { ArrowUpRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

/** The 404 page: a drawing sheet with nothing on it, and a way to every division. */
export default function NotFound() {
  return (
    <main id="main-content" className="grounded-canvas" style={{ minHeight: '100vh' }}>
      <Navbar />
      <section style={{ padding: 'clamp(136px, 18vh, 176px) 24px clamp(64px, 9vh, 96px)' }}>
        <div className="flat-card sheet-frame not-found-sheet" style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(28px, 5vw, 64px)' }}>
          <i className="corner-mark tl" />
          <i className="corner-mark tr" />
          <i className="corner-mark bl" />
          <i className="corner-mark br" />
          <SectionEyebrow>Error 404</SectionEyebrow>
          <h1 className="not-found-title">This page is not on the drawings.</h1>
          <p className="not-found-text">
            The link may be old or mistyped. Pick a division below, or call us and we will point you to the right person.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '0 0 40px' }}>
            <Link href="/" className="not-found-button is-dark">
              Back to the home page
            </Link>
            <a href="tel:+917021112664" className="not-found-button">
              <Phone size={15} aria-hidden="true" />
              +91 70211 12664
            </a>
          </div>
          <ul className="joins-list">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link href={d.href} className="joins-link">
                  <span className="joins-name">
                    {d.name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                  <span className="joins-text">{DIVISION_ONE_LINERS[d.slug]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="title-block-line" aria-label="Page reference">
            <li>JC Apex Ventures</li>
            <li>Sheet not found</li>
            <li>Error 404</li>
            <li>jcapexv.com</li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
