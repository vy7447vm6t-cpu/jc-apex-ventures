import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { sanyog } from '@/content/divisions';
import { ShieldCheck, CheckCircle2, FileText, Scale, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `${sanyog.name} | Electricity Connections & Grievances | JC Apex Ventures`,
  description: sanyog.description,
};

const PROTOCOLS = [
  {
    authority: 'MERC Supply Code & Tariff Schedules',
    section: 'Regulation 8.4 & Schedules LT-1(b) / HT-I',
    action: 'Tariff classification review, billing dispute resolution, and power factor penalty audits across Mumbai utilities.',
    leadTime: '7 to 14 business days',
    status: 'Statutory Verification',
  },
  {
    authority: 'Consumer Grievance Redressal Forum (CGRF)',
    section: 'Section 42(5), Electricity Act 2003',
    action: 'Petition assembly, evidentiary record compilation, and direct forum representation for residential and commercial consumers.',
    leadTime: '30 to 60 day statutory timeline',
    status: 'CGRF Representation',
  },
  {
    authority: 'Electricity Ombudsman Maharashtra',
    section: 'Section 42(6), Electricity Act 2003',
    action: 'Appellate filings against contested CGRF orders, meter discrepancy proceedings, and excessive billing recovery appeals.',
    leadTime: 'State Appellate Horizon',
    status: 'Ombudsman Appeals',
  },
  {
    authority: 'PWD Electrical Inspectorate Licensing',
    section: 'Central Electricity Authority (CEA) Safety Rules',
    action: 'Express feeder sanctions, 11kV to 33kV substation clearances, and contractor electrical safety certification filings.',
    leadTime: 'Formal Sanction Docket',
    status: 'CEI Clearances',
  },
];

export default function SanyogPage() {
  return (
    <DivisionPage
      data={sanyog}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <DivisionLogo division="sanyog" size={56} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.06em', color: '#111111' }}>
              SANYOG
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Utility Liaisoning & CGRF
            </span>
          </div>
        </div>
      }
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#C29F53]/15 text-[#C29F53] text-[11px] font-mono uppercase tracking-wider font-semibold border border-[#C29F53]/30 mb-3">
            Statutory Grid Code & CGRF Advocacy
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
            DISCOM Protocol & Regulatory Representation Framework
          </h3>
          <p className="text-sm text-[#AAAAAA] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Supervised under 36 years of direct utility distribution experience inside BEST Undertaking, Adani Electricity (AEML), Tata Power (TPCL), and MSEDCL.
          </p>
        </div>

        {/* 4-Box Editorial Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROTOCOLS.map((proto, idx) => (
            <div
              key={idx}
              className="ios-glass-card rounded-2xl p-6 border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col justify-between"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29F53] font-semibold bg-[#C29F53]/10 px-2.5 py-1 rounded-md border border-[#C29F53]/20">
                    {proto.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#888888]">
                    0{idx + 1}
                  </span>
                </div>

                <h4
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 400,
                    lineHeight: 1.25,
                    color: '#FFFFFF',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  }}
                >
                  {proto.authority}
                </h4>

                <div className="text-xs font-mono text-[#C29F53] mb-3">
                  {proto.section}
                </div>

                <p className="text-xs text-[#CCCCCC] leading-relaxed mb-4 font-sans">
                  {proto.action}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span>Timeline:</span>
                <span className="text-white/80">{proto.leadTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Statutory Consultation Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C29F53]/15 text-[#C29F53]">
              <Scale size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Contested Billing or Sanction Rejection?
              </div>
              <div className="text-xs text-[#888888]">
                We review DISCOM notices, verify statutory merits, and draft formal representations.
              </div>
            </div>
          </div>
          <Link
            href="/electricity-grievances"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C29F53] text-[#111111] text-xs font-semibold hover:bg-[#D4AF37] transition-colors whitespace-nowrap"
          >
            <span>Electricity Grievance Dossier</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </DivisionPage>
  );
}
