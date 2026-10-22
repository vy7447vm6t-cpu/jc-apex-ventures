import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { gridApex } from '@/content/divisions';
import { Zap, Flame, CheckCircle2 } from 'lucide-react';
import ElectricBorder from '@/components/react-bits/ElectricBorder';

export const metadata: Metadata = {
  title: `${gridApex.name} | Electrical, Solar & Waste Systems | JC Apex Ventures`,
  description: gridApex.description,
};

export default function GridApexPage() {
  return (
    <DivisionPage
      data={gridApex}
      customHeroLogo={
        <img
          src="/images/logos/grid-apex-official.png"
          alt="GRID APEX Engineering Infrastructure Brand Mark"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <div className="max-w-5xl mx-auto w-full font-sans">
        {/* Section Header */}
        <div className="text-center mb-10">
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
            Engineered High-Tension Systems &amp; Thermal Cleantech.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Comprehensive HT power distribution alongside Central Government patented, MPCB-certified thermal waste decomposition technology.
          </p>
        </div>

        {/* 2-Column Technical Dossier with ElectricBorder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: 33kV Substation & Switchgear */}
          <ElectricBorder
            active={true}
            color="#0284C7"
            borderRadius="22px"
            innerBg="#FFFFFF"
            className="shadow-sm"
          >
            <div className="p-8 flex flex-col justify-between h-full bg-white rounded-[20px]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#0284C7] font-bold bg-[#0284C7]/10 px-2.5 py-1 rounded-md border border-[#0284C7]/20">
                    Substation Bay Engineering
                  </span>
                  <Zap size={18} color="#0284C7" />
                </div>

                <h4
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: 'var(--color-text-primary)',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  33kV / 22kV / 11kV Substation Systems
                </h4>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                  Turnkey civil and electrical engineering for oil-cooled and dry-type step-down transformers (500 kVA to 2500 kVA), Vacuum Circuit Breakers (VCB), SF6 Ring Main Units (RMU), busbar trunking, and statutory PWD Electrical Inspectorate compliance.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-4 border-t border-[var(--color-border)] mb-6">
                  <div>
                    <span className="text-[var(--color-text-muted)] font-semibold block text-[10px] tracking-wider">VOLTAGE RATINGS</span>
                    <span className="font-bold text-[var(--color-text-primary)] tabular-nums">11kV / 22kV / 33kV</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] font-semibold block text-[10px] tracking-wider">CLEARANCE DOCKET</span>
                    <span className="font-bold text-[#0284C7]">PWD CEI Certified</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-sans pt-4 border-t border-[var(--color-border)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} color="#0284C7" />
                  <span>Express HT feeder load sanction filings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} color="#0284C7" />
                  <span>Automatic Power Factor Correction (APFC) panels</span>
                </li>
              </ul>
            </div>
          </ElectricBorder>

          {/* Card 2: Patented Zero-Energy Waste Tech */}
          <ElectricBorder
            active={true}
            color="#F59E0B"
            borderRadius="22px"
            innerBg="#FFFFFF"
            className="shadow-sm"
          >
            <div className="p-8 flex flex-col justify-between h-full bg-white rounded-[20px]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#D97706] font-bold bg-[#F59E0B]/10 px-2.5 py-1 rounded-md border border-[#F59E0B]/20">
                    Patented Environmental Cleantech
                  </span>
                  <Flame size={18} color="#F59E0B" />
                </div>

                <h4
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: 'var(--color-text-primary)',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  Patented Zero-Energy Solid Waste Tech
                </h4>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                  Developed by Dr. Manoj Chavan and Mahendra Kabnurkar, this Central Government patented system operates at 350°C via magnetic thermal decomposition with zero external electricity or fuel post-ignition, certified by Maharashtra Pollution Control Board (MPCB).
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-4 border-t border-[var(--color-border)] mb-6">
                  <div>
                    <span className="text-[var(--color-text-muted)] font-semibold block text-[10px] tracking-wider">EXTERNAL ENERGY</span>
                    <span className="font-bold text-[#1D8A34]">0 kW (Zero Power)</span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] font-semibold block text-[10px] tracking-wider">MASS REDUCTION</span>
                    <span className="font-bold text-[var(--color-text-primary)] tabular-nums">96% Volume Cut</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-sans pt-4 border-t border-[var(--color-border)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} color="#0284C7" />
                  <span>Converts unsegregated municipal waste to 4% mineral ash</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} color="#0284C7" />
                  <span>Mineral ash formulated for commercial paver block casting</span>
                </li>
              </ul>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </DivisionPage>
  );
}
