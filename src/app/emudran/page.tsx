import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';
import { PackagingVolumeTierCurve } from '@/components/bklit';
import { DepthCarousel } from '@/components/react-bits';

export const metadata: Metadata = {
  title: `${emudran.name} | Branding, Print & Signboards | JC Apex Ventures`,
  description: emudran.description,
};

const PACKAGING_SPECIMENS = [
  {
    id: 'specimen-01',
    title: 'Thermal Micro-Foil Rigid Presentation Box',
    tag: 'Luxury Packaging',
    image: '/images/luxury-print-packaging.jpg',
    description: 'Precision greyboard with registered gold thermal foil stamping and magnetic enclosure flap.',
  },
  {
    id: 'specimen-02',
    title: 'FMCG Rigid Gift Carton',
    tag: 'Carton Engineering',
    image: '/images/catalogues_mockup.png',
    description: 'Structural die-cut packaging engineered for high-speed automated assembly lines.',
  },
  {
    id: 'specimen-03',
    title: 'Corporate Catalogues & Annual Reports',
    tag: 'Offset Press',
    image: '/images/brochures-catalogues-print.jpg',
    description: 'High-bulk velvet-finish paper stock with spot UV and perfect binding.',
  },
];

export default function EmudranPage() {
  return (
    <DivisionPage
      data={emudran}
      customHeroLogo={
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src="/images/logos/00003033-eMudran_Business_Card_p1_img_0_X5.png"
            alt="eMudran Official CMYK Emblem"
            style={{ height: '60px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.04em', color: '#111111' }}>
              eMudran
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#888888', textTransform: 'uppercase' }}>
              Luxury Packaging & Print
            </span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-12">
        <div className="rounded-3xl border border-black/8 bg-white/80 p-8 backdrop-blur-xl shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#C29F53]">
              Tactile Studio Inspection
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#111111] mt-1">
              3D Rigid Box & Packaging Depth Specimen Gallery
            </h3>
            <p className="text-xs text-[#666666] mt-2">
              Explore structural cardboard rigidity, gold foil stamping, and Pantone color accuracy.
            </p>
          </div>
          <DepthCarousel items={PACKAGING_SPECIMENS} />
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <PackagingVolumeTierCurve />
        </div>
      </div>
    </DivisionPage>
  );
}
