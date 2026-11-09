import { ImageResponse } from 'next/og';

export const alt = 'JC Apex Ventures: electrical, solar, utility, interiors, print and project loans, Mumbai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DIVISIONS = ['Grid Apex', 'Solis', 'Sanyog', 'Tvasta', 'eMudran', 'Agrim'];

/** The share card for every page: Night ground, the apex dot, the name and two confirmed facts. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#0B0E14', color: '#F0F3F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: '#C29F53' }} />
          <div style={{ fontSize: 30, letterSpacing: 2 }}>JC APEX VENTURES</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 1000 }}>From HT electrical work at the Taj Mahal Palace to a 691.20 kWp solar plant in Bhiwandi.</div>
          <div style={{ fontSize: 28, color: '#8B949E' }}>Six divisions, one office at Elphinstone, Mumbai</div>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 26, color: '#C9D1D9', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24 }}>
          {DIVISIONS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
