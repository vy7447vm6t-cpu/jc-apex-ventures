import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';
import { PackagingVolumeTierCurve } from '@/components/bklit';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: `${emudran.name} | Branding, Print & Signboards | JC Apex Ventures`,
  description: emudran.description,
};

const PACKAGING_SPECIMENS = [
  {
    id: 'specimen-01',
    title: 'Thermal Micro-Foil Rigid Presentation Box',
    tag: 'Luxury Corporate Box',
    image: '/images/luxury-print-packaging.jpg',
    description: 'Precision 1200 GSM Kappa greyboard wrapped in imported art paper, featuring registered gold thermal micro-foil stamping, debossed logo contours, and concealed neodymium magnetic closures.',
    specs: ['1200 GSM Kappa Greyboard', 'Gold Micro-Foil Stamping', 'Magnetic Closure', 'Custom EVA Velvet Insert'],
  },
  {
    id: 'specimen-02',
    title: 'FMCG Rigid Gift Carton & Retail Packaging',
    tag: 'Structural Engineering',
    image: '/images/catalogues_mockup.png',
    description: 'Structural die-cut folding cartons engineered for automated packing lines. High-fidelity Pantone reproduction, food-grade barrier coatings, and scratch-resistant matte thermal lamination.',
    specs: ['350 GSM Cyber XLC Board', 'Spot UV & Embossing', 'Pantone Hexachrome Matching', 'Auto-Lock Bottom Die-Cut'],
  },
  {
    id: 'specimen-03',
    title: 'Corporate Catalogues & Annual Reports',
    tag: 'Heidelberg Offset Press',
    image: '/images/brochures-catalogues-print.jpg',
    description: 'High-bulk FSC-certified velvet-finish paper stock with micro-perforations, metallic ink accents, section-sewn binding, and square back spine perfection for luxury brand statements.',
    specs: ['170 GSM Magno Satin Inner', '300 GSM Textured Cover', 'Section Sewn Perfect Bound', 'Selective Drip-Off Varnish'],
  },
];

export default function EmudranPage() {
  return (
    <DivisionPage
      data={emudran}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 4px',
          }}
        >
          <img
            src="/images/logos/emudran-official.png"
            alt="eMudran Official Brand Mark"
            style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>
      }
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-12 font-sans">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[var(--color-accent-pale)] text-[var(--color-accent)] text-[11px] uppercase tracking-[0.12em] font-bold border border-[var(--color-border)] mb-3">
            [ART DIRECTION &amp; PRESS ENGINEERING]
          </div>
          <h3
            style={{
              fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Tactile Packaging Specimens &amp; Production Benchmarks.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Led by veteran FMCG Art Director Manish Ajgaonkar. Explore structural greyboard rigidity, precision thermal stamping, and high-volume offset economics.
          </p>
        </div>

        {/* 3-Column Luxury Packaging Specimen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGING_SPECIMENS.map((specimen) => (
            <div
              key={specimen.id}
              className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={specimen.image}
                    alt={specimen.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--color-accent)] text-white">
                    {specimen.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h4
                    style={{
                      fontSize: '1.45rem',
                      lineHeight: 1.2,
                      fontWeight: 400,
                      color: 'var(--color-text-primary)',
                      marginBottom: '10px',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    }}
                  >
                    {specimen.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                    {specimen.description}
                  </p>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-2.5">
                      Technical Substrates
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {specimen.specs.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-[11px] text-[var(--color-text-primary)] font-medium font-sans">
                          <CheckCircle2 size={13} color="var(--color-accent-light)" className="flex-shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/print-management"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs font-semibold hover:bg-[var(--color-accent-pale)] transition-colors"
                >
                  <span>Calculate Volume Tier</span>
                  <ArrowUpRight size={13} color="var(--color-accent)" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Volume Tier Curve Visual Module */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-md">
          <div className="mb-6">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-accent)]">
              [ECONOMY OF SCALE PHYSICS]
            </span>
            <h4
              style={{
                fontSize: '1.5rem',
                color: 'var(--color-text-primary)',
                marginTop: '4px',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              Volume Tier Unit Cost Optimization Curve
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-sans">
              Unit prices drop sharply beyond 1,000 units as cylinder setup, die-tooling, and plate amortization reach steady-state.
            </p>
          </div>
          <PackagingVolumeTierCurve />
        </div>
      </div>
    </DivisionPage>
  );
}
