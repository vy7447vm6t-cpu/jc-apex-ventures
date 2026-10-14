import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { sanyog } from '@/content/divisions';
import { FaultyTerminal, CrtWarp } from '@/components/react-bits';

export const metadata: Metadata = {
  title: `${sanyog.name} | Electricity Connections & Grievances | JC Apex Ventures`,
  description: sanyog.description,
};

const MERC_TELEMETRY_LOGS = [
  { timestamp: '11:42:01 IST', source: 'MERC-GRID-CODE', message: 'Clause 8.4: Open access wheeling charges verified for industrial HT consumers', status: 'info' as const },
  { timestamp: '11:42:04 IST', source: 'AEML-SUBURBAN', message: 'Smart bi-directional solar net meter firmware sync: OK', status: 'success' as const },
  { timestamp: '11:42:09 IST', source: 'BEST-ISLAND', message: 'Tariff Schedule LT-1(b) common meter power factor audit complete (PF: 0.99)', status: 'success' as const },
  { timestamp: '11:42:15 IST', source: 'CGRF-FORUM', message: 'Section 42(5) Electricity Act grievance filing docket generated under Director Jitendra Chavan review', status: 'warn' as const },
  { timestamp: '11:42:22 IST', source: 'MSEDCL-HT', message: '33kV express feeder load sanction clearance submitted to PWD Electrical Inspectorate', status: 'info' as const },
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
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
            Statutory Grid Code Telemetry
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#111111] mt-1">
            Real-Time MERC & DISCOM Protocol Inspector
          </h3>
          <p className="text-xs text-[#666666] mt-2">
            Supervised under 36 years of Mumbai utility distribution authority (BEST, Adani, Tata Power, MSEDCL).
          </p>
        </div>
        <CrtWarp>
          <FaultyTerminal logs={MERC_TELEMETRY_LOGS} />
        </CrtWarp>
      </div>
    </DivisionPage>
  );
}
