import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';
import { PackagingVolumeTierCurve } from '@/components/bklit';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Sparkles, Printer, Layers } from 'lucide-react';

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
            gap: '16px',
          }}
        >
          <img
            src="/images/logos/00003033-eMudran_Business_Card_p1_img_0_X5.png"
            alt="eMudran Official CMYK Emblem"
            style={{ height: '60px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.04em', color: '#111111' }}>
              eMudran
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Luxury Packaging &amp; Print
            </span>
          </div>
        </div>
      }
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#C29F53]/15 text-[#C29F53] text-[11px] font-mono uppercase tracking-wider font-semibold border border-[#C29F53]/30 mb-3">
            Art Direction &amp; Press Engineering
          </div>
          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              lineHeight: 1.2,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            Tactile Packaging Specimens &amp; Production Benchmarks
          </h3>
          <p className="text-sm text-[#AAAAAA] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Led by veteran FMCG Art Director Manish Ajgaonkar. Explore structural greyboard rigidity, precision thermal stamping, and high-volume offset economics.
          </p>
        </div>

        {/* 3-Column Luxury Packaging Specimen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGING_SPECIMENS.map((specimen, idx) => (
            <div
              key={specimen.id}
              className="ios-glass-card rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex flex-col justify-between"
              style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={specimen.image}
                    alt={specimen.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-[#C29F53] text-[#111111]">
                    {specimen.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h4
                    style={{
                      fontSize: '1.35rem',
                      lineHeight: 1.25,
                      fontWeight: 400,
                      color: '#FFFFFF',
                      marginBottom: '10px',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    }}
                  >
                    {specimen.title}
                  </h4>
                  <p className="text-xs text-[#CCCCCC] leading-relaxed mb-6 font-sans">
                    {specimen.description}
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888] mb-2.5">
                      Technical Substrates
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {specimen.specs.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-[11px] text-[#E8E4DA] font-sans">
                          <CheckCircle2 size={13} color="#C29F53" className="flex-shrink-0" />
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
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono hover:bg-white/10 transition-colors"
                >
                  <span>Calculate Volume Tier</span>
                  <ArrowUpRight size={13} color="#C29F53" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Volume Tier Curve Visual Module */}
        <div className="ios-glass-card rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
              Economy of Scale Physics
            </span>
            <h4
              style={{
                fontSize: '1.4rem',
                color: '#FFFFFF',
                marginTop: '4px',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              Volume Tier Unit Cost Optimization Curve
            </h4>
            <p className="text-xs text-[#888888] mt-1 font-sans">
              Unit prices drop sharply beyond 1,000 units as cylinder setup, die-tooling, and plate amortization reach steady-state.
            </p>
          </div>
          <PackagingVolumeTierCurve />
        </div>
      </div>
    </DivisionPage>
  );
}
