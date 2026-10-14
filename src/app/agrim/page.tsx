import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { agrim } from '@/content/divisions';
import { EvNetworkCapexRevenueChart } from '@/components/bklit';
import { InfiniteSpiral } from '@/components/react-bits';

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <EvNetworkCapexRevenueChart siteCapex={40} />
        </div>
        <div className="rounded-3xl border border-black/8 bg-white/80 p-8 backdrop-blur-xl shadow-lg flex flex-col items-center text-center">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53] mb-2">
            Mathematical DPR Modeling
          </span>
          <h4 className="text-lg font-serif font-bold text-[#111111] mb-2">
            Harmonic Cashflow Convergence
          </h4>
          <p className="text-xs text-[#666666] leading-relaxed mb-4">
            Airtight project finance modeling ensures zero discrepancies during nationalized and private banking appraisal rounds.
          </p>
          <InfiniteSpiral size={220} color="#C29F53" />
        </div>
      </div>
    </DivisionPage>
  );
}
