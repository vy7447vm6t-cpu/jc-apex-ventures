import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { gridApex } from '@/content/divisions';
import { Zap, ShieldCheck, Flame, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `${gridApex.name} | Electrical, Solar & Waste Systems | JC Apex Ventures`,
  description: gridApex.description,
};

export default function GridApexPage() {
  return (
    <DivisionPage
      data={gridApex}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src="/images/logos/grid_apex_brand_mark.png"
            alt="GRID APEX Engineering Infrastructure Brand Mark"
            style={{ height: '54px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ width: '1px', height: '42px', background: 'rgba(194, 159, 83, 0.45)' }} />
          <DivisionLogo division="grid-apex" size={54} />
        </div>
      }
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#C29F53]/15 text-[#C29F53] text-[11px] font-mono uppercase tracking-wider font-semibold border border-[#C29F53]/30 mb-3">
            Substation Infrastructure &amp; Patented Cleantech
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
            Engineered High-Tension Systems &amp; Thermal Cleantech
          </h3>
          <p className="text-sm text-[#AAAAAA] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Comprehensive HT power distribution alongside Central Government patented, MPCB-certified thermal waste decomposition technology.
          </p>
        </div>

        {/* 2-Column Technical Dossier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: 33kV Substation & Switchgear */}
          <div
            className="ios-glass-card rounded-2xl p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col justify-between"
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29F53] font-semibold bg-[#C29F53]/10 px-2.5 py-1 rounded-md border border-[#C29F53]/20">
                  Substation Bay Engineering
                </span>
                <Zap size={18} color="#C29F53" />
              </div>

              <h4
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                33kV / 22kV / 11kV Substation Systems
              </h4>

              <p className="text-xs text-[#CCCCCC] leading-relaxed mb-6 font-sans">
                Turnkey civil and electrical engineering for oil-cooled and dry-type step-down transformers (500 kVA to 2500 kVA), Vacuum Circuit Breakers (VCB), SF6 Ring Main Units (RMU), busbar trunking, and statutory PWD Electrical Inspectorate compliance.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-4 border-t border-white/10 mb-6">
                <div>
                  <span className="text-[#888888] block text-[10px]">VOLTAGE RATINGS</span>
                  <span className="font-bold text-white">11kV / 22kV / 33kV</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[10px]">CLEARANCE DOCKET</span>
                  <span className="font-bold text-[#C29F53]">PWD CEI Certified</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#AAAAAA] font-sans pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} color="#C29F53" />
                <span>Express HT feeder load sanction filings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} color="#C29F53" />
                <span>Automatic Power Factor Correction (APFC) panels</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Patented Zero-Energy Waste Tech */}
          <div
            className="ios-glass-card rounded-2xl p-8 border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col justify-between"
            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29F53] font-semibold bg-[#C29F53]/10 px-2.5 py-1 rounded-md border border-[#C29F53]/20">
                  Patented Environmental Cleantech
                </span>
                <Flame size={18} color="#C29F53" />
              </div>

              <h4
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Patented Zero-Energy Solid Waste Tech
              </h4>

              <p className="text-xs text-[#CCCCCC] leading-relaxed mb-6 font-sans">
                Developed by Dr. Manoj Chavan and Mahendra Kabnurkar, this Central Government patented system operates at 350°C via magnetic thermal decomposition with zero external electricity or fuel post-ignition, certified by Maharashtra Pollution Control Board (MPCB).
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-4 border-t border-white/10 mb-6">
                <div>
                  <span className="text-[#888888] block text-[10px]">EXTERNAL ENERGY</span>
                  <span className="font-bold text-[#27C93F]">0 kW (Zero Power)</span>
                </div>
                <div>
                  <span className="text-[#888888] block text-[10px]">MASS REDUCTION</span>
                  <span className="font-bold text-white">96% Volume Cut</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#AAAAAA] font-sans pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} color="#C29F53" />
                <span>Converts unsegregated municipal waste to 4% mineral ash</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} color="#C29F53" />
                <span>Mineral ash formulated for commercial paver block casting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DivisionPage>
  );
}
