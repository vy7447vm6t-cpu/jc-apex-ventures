import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { agrim } from '@/content/divisions';
import { EvNetworkCapexRevenueChart } from '@/components/bklit';
import { Landmark, ArrowUpRight } from 'lucide-react';
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
        <img
          src="/images/logos/agrim-dark.png"
          alt="AGRIM Official Brand Mark"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      }
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-10 font-sans">
        {/* Section Header */}
        <div className="text-center">
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
            Bankable DPR Assembly &amp; EV Infrastructure Cashflow Modeling.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Airtight project finance modeling ensures complete alignment during nationalized and private banking appraisal rounds.
          </p>
        </div>

        {/* 2-Column Grid: Chart + DPR Appraisal Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Chart Column */}
          <div className="lg:col-span-7 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#047857] font-bold">
                  EV Network 10-Year Economics
                </span>
                <span className="text-[11px] font-semibold text-[var(--color-text-muted)]">
                  NPV &amp; Payback Curve
                </span>
              </div>
              <EvNetworkCapexRevenueChart siteCapex={40} />
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-sans">
              Dynamic sensitivity curve modeling power tariffs, charger utilization rates, and debt amortization.
            </div>
          </div>

          {/* Appraisal Ledger Column */}
          <div className="lg:col-span-5 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-[#047857] font-bold bg-[#047857]/10 px-2.5 py-1 rounded-md border border-[#047857]/20">
                  Banking Appraisal Specs
                </span>
                <Landmark size={18} color="#047857" />
              </div>

              <h4
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                Detailed Project Report (DPR) Benchmarks
              </h4>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                We structure administrative project finance dossiers for infrastructure lenders, private equity, and nationalized banks with validated engineering cost foundations.
              </p>

              <div className="space-y-3 pt-4 border-t border-[var(--color-border)] mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)] font-medium">Target DSCR:</span>
                  <span className="text-[var(--color-text-primary)] font-bold tabular-nums">1.40x to 1.75x</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)] font-medium">Interest Sensitivity:</span>
                  <span className="text-[var(--color-text-primary)] font-bold tabular-nums">+/- 150 bps Stress Test</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)] font-medium">Capex Verification:</span>
                  <span className="text-[#047857] font-bold">Engineered Quotations</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <div className="p-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)] leading-relaxed font-sans mb-4">
                <strong className="text-[var(--color-text-primary)] block mb-1">Non-Lender Advisory Notice</strong>
                Agrim operates strictly as a consulting paperwork and file assembly desk, not as a lender, NBFC, or banking institution.
              </div>
              <Link
                href="/#contact"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
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
