import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import DivisionLogo from '@/components/DivisionLogos';
import { gridApex } from '@/content/divisions';
import { ElectricBorder, ShapeWaves } from '@/components/react-bits';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <ElectricBorder glowColor="#C29F53" borderRadius={24}>
          <div className="p-8">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
              Heavy High-Voltage Infrastructure
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#111111] mt-1 mb-3">
              33kV Substation & SF6 Switchgear
            </h3>
            <p className="text-xs text-[#555555] leading-relaxed mb-4">
              Turnkey engineering for oil-cooled 1600 kVA step-down transformer bays, vacuum circuit breakers (VCB), and PWD electrical inspectorate compliance.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-4 border-t border-black/8">
              <div>
                <span className="text-[#888888] block text-[10px]">VOLTAGE CLASS</span>
                <span className="font-bold text-[#111111]">11kV / 22kV / 33kV</span>
              </div>
              <div>
                <span className="text-[#888888] block text-[10px]">FAULT CLEARANCE</span>
                <span className="font-bold text-[#27C93F]">&lt; 40ms High Speed</span>
              </div>
            </div>
          </div>
        </ElectricBorder>

        <div className="rounded-3xl border border-black/8 bg-white/80 p-8 backdrop-blur-xl shadow-lg flex flex-col justify-between h-full">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
              Harmonics & Telemetry
            </span>
            <h3 className="text-xl font-serif font-bold text-[#111111] mt-1 mb-2">
              Three-Phase Power Waveform Analysis
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed mb-4">
              Continuous harmonic distortion auditing and reactive power compensation for industrial facilities.
            </p>
          </div>
          <ShapeWaves height={120} color="#C29F53" waveCount={3} />
        </div>
      </div>
    </DivisionPage>
  );
}
