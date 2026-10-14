import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { agrim } from '@/content/divisions';
import { EvNetworkCapexRevenueChart } from '@/components/bklit';
import { Landmark, CheckCircle2, ShieldCheck, FileCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `${agrim.name} | Project Finance Paperwork | JC Apex Ventures`,
  description: agrim.description,
};

/**
 * Regulatory Disclaimer:
 * AGRIM by JC Apex Ventures is not a lender, bank, or NBFC.
 * We provide non-lending administrative project finance file preparation, paperwork facilitation, and financial advisory documentation.
 */

export default function AgrimPage() {
  return (
    <DivisionPage
      data={agrim}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <DivisionLogo division="agrim" size={56} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.06em', color: '#111111' }}>
              AGRIM
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Financial Dossier Advisory
            </span>
          </div>
        </div>
      }
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-10">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#C29F53]/15 text-[#C29F53] text-[11px] font-mono uppercase tracking-wider font-semibold border border-[#C29F53]/30 mb-3">
            Statutory Project DPR Preparation
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
            Bankable DPR Assembly &amp; EV Infrastructure Cashflow Modeling
          </h3>
          <p className="text-sm text-[#AAAAAA] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Airtight project finance modeling ensures complete alignment during nationalized and private banking appraisal rounds.
          </p>
        </div>

        {/* 2-Column Grid: Chart + DPR Appraisal Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Chart Column */}
          <div className="lg:col-span-7 ios-glass-card rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C29F53] font-semibold">
                  EV Network 10-Year Economics
                </span>
                <span className="text-[11px] font-mono text-[#888888]">
                  NPV &amp; Payback Curve
                </span>
              </div>
              <EvNetworkCapexRevenueChart siteCapex={40} />
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#888888] font-sans">
              Dynamic sensitivity curve modeling power tariffs, charger utilization rates, and debt amortization.
            </div>
          </div>

          {/* Appraisal Ledger Column */}
          <div className="lg:col-span-5 ios-glass-card rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29F53] font-semibold bg-[#C29F53]/10 px-2.5 py-1 rounded-md border border-[#C29F53]/20">
                  Banking Appraisal Specs
                </span>
                <Landmark size={18} color="#C29F53" />
              </div>

              <h4
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Detailed Project Report (DPR) Benchmarks
              </h4>

              <p className="text-xs text-[#CCCCCC] leading-relaxed mb-6 font-sans">
                We structure administrative project finance dossiers for infrastructure lenders, private equity, and nationalized banks with validated engineering cost foundations.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#888888]">Target DSCR:</span>
                  <span className="text-white font-bold">1.40x to 1.75x</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#888888]">Interest Sensitivity:</span>
                  <span className="text-white font-bold">+/- 150 bps Stress Test</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#888888]">Capex Verification:</span>
                  <span className="text-[#C29F53] font-bold">Engineered Quotations</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-[#AAAAAA] leading-relaxed font-sans mb-4">
                <strong className="text-white block mb-1">Non-Lender Advisory Notice</strong>
                Agrim operates strictly as a consulting paperwork and file assembly desk, not as a lender, NBFC, or banking institution.
              </div>
              <Link
                href="/#contact"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#C29F53] text-[#111111] text-xs font-semibold hover:bg-[#D4AF37] transition-colors"
              >
                <span>Request Project DPR Consultation</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DivisionPage>
  );
}
