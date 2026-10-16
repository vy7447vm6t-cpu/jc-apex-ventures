import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { sanyog } from '@/content/divisions';
import { Scale, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ElectricBorder from '@/components/react-bits/ElectricBorder';

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
        <img
          src="/images/logos/sanyog-official.png"
          alt="SANYOG Official Brand Mark"
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
              color: '#111111',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            DISCOM Protocol &amp; Regulatory Representation Framework.
          </h3>
          <p className="text-sm text-[#4A4A46] mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Supervised under 36 years of direct utility distribution experience inside BEST Undertaking, Adani Electricity (AEML), Tata Power (TPCL), and MSEDCL.
          </p>
        </div>

        {/* 4-Box Editorial Ledger with ElectricBorder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROTOCOLS.map((proto, idx) => (
            <ElectricBorder
              key={idx}
              active={idx < 2}
              color="#C29F53"
              borderRadius="20px"
              innerBg="#FFFFFF"
              className="shadow-sm"
            >
              <div className="p-6 flex flex-col justify-between h-full bg-white rounded-[18px]">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#8C6D23] font-bold bg-[#C29F53]/15 px-2.5 py-1 rounded-md border border-[#C29F53]/25">
                      {proto.status}
                    </span>
                    <span className="text-xs font-bold text-[#777777] tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: '#111111',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    }}
                  >
                    {proto.authority}
                  </h4>

                  <div className="text-xs font-semibold text-[#8C6D23] mb-3">
                    {proto.section}
                  </div>

                  <p className="text-xs text-[#4A4A46] leading-relaxed mb-4 font-sans">
                    {proto.action}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/8 flex items-center justify-between text-xs font-semibold text-[#666666]">
                  <span>Statutory Horizon:</span>
                  <span className="text-[#111111]">{proto.leadTime}</span>
                </div>
              </div>
            </ElectricBorder>
          ))}
        </div>

        {/* Direct Statutory Consultation Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-black/8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-[#C29F53]/15 text-[#8C6D23]">
              <Scale size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-[#111111]">
                Contested Billing or Sanction Rejection?
              </div>
              <div className="text-xs text-[#555555]">
                We review DISCOM notices, verify statutory merits, and draft formal representations.
              </div>
            </div>
          </div>
          <Link
            href="/electricity-grievances"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-[#222222] transition-colors whitespace-nowrap"
          >
            <span>Electricity Grievance Dossier</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </DivisionPage>
  );
}
