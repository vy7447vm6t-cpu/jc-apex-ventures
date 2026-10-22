import React from 'react';
import type { Metadata } from 'next';
import DivisionPage from '@/components/DivisionPage';
import { emudran } from '@/content/divisions';
import { PackagingVolumeTierCurve } from '@/components/bklit';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Printer, Sparkles, Layers, Box, Cpu } from 'lucide-react';
import { ImageWithLightbox } from '@/components/ImageLightbox';

export const metadata: Metadata = {
  title: `${emudran.name} | Luxury Branding, Offset Print & Signage Engineering | JC Apex Ventures`,
  description: emudran.description,
};

const PACKAGING_SPECIMENS = [
  {
    id: 'specimen-01',
    title: 'Thermal Micro-Foil Rigid Presentation Box',
    tag: 'Luxury Corporate Box',
    image: '/images/luxury-print-packaging.jpg',
    description: 'Precision 1200 GSM Kappa greyboard wrapped in imported art paper, featuring registered gold thermal micro-foil stamping, debossed logo contours, and concealed neodymium magnetic closures.',
    specs: ['1200 GSM Kappa Greyboard', 'Gold Micro-Foil Stamping', 'Magnetic Closure', 'Custom EVA Velvet Insert'],
  },
  {
    id: 'specimen-02',
    title: 'FMCG Rigid Gift Carton & Retail Packaging',
    tag: 'Structural Engineering',
    image: '/images/catalogues_mockup.png',
    description: 'Structural die-cut folding cartons engineered for automated packing lines. High-fidelity Pantone reproduction, food-grade barrier coatings, and scratch-resistant matte thermal lamination.',
    specs: ['350 GSM Cyber XLC Board', 'Spot UV & Embossing', 'Pantone Hexachrome Matching', 'Auto-Lock Bottom Die-Cut'],
  },
  {
    id: 'specimen-03',
    title: 'Corporate Catalogues & Annual Reports',
    tag: 'Heidelberg Offset Press',
    image: '/images/brochures-catalogues-print.jpg',
    description: 'High-bulk FSC-certified velvet-finish paper stock with micro-perforations, metallic ink accents, section-sewn binding, and square back spine perfection for luxury brand statements.',
    specs: ['170 GSM Magno Satin Inner', '300 GSM Textured Cover', 'Section Sewn Perfect Bound', 'Selective Drip-Off Varnish'],
  },
  {
    id: 'specimen-04',
    title: 'Architectural Wayfinding & Brass Signage',
    tag: 'Signage & Large Format',
    image: '/images/craft-signage-print.jpg',
    description: 'Precision waterjet-cut brushed architectural bronze and acrylic corporate wayfinding signage with edge-lit 3000K LED modules for commercial headquarters.',
    specs: ['Architectural Brushed Brass', 'Precision Waterjet Cut', '3000K LED Modules', 'Weather-Resistant PVDF'],
  },
];

const PRINT_BENCHMARKS = [
  {
    code: 'ISO 12647-2 Process Control',
    title: 'Heidelberg 6-Color Offset Tolerances',
    desc: 'Automated spectrophotometric press calibration on Heidelberg Speedmaster XL 106 guaranteeing consistent ink densities and dot gain stabilization.',
    icon: Printer,
  },
  {
    code: 'Pantone Matching System (PMS)',
    title: 'Delta-E < 1.5 Color Fidelity',
    desc: 'Tight colour variation threshold under Delta-E 1.5 across production runs up to 500,000 sheets, maintaining exact corporate brand identity standards.',
    icon: Sparkles,
  },
  {
    code: 'FSC-STD-40-004 Chain of Custody',
    title: 'Certified Sustainable Paperboards',
    desc: '100% sustainably managed forestry sources across 1200 GSM Kappa greyboards, Sappi Magno papers, and ITC Cyber XLC virgin fiber boards.',
    icon: Layers,
  },
  {
    code: 'DIN EN ISO 2813',
    title: 'Thermal Micro-Foil Registration (+/- 0.15mm)',
    desc: 'Precision laser-machined magnesium and brass foiling dies delivering razor-sharp foil definition on deep textured, uncoated, and laminated boards.',
    icon: Box,
  },
  {
    code: 'ASTM D2578 / 48 Dyne/cm',
    title: 'Scuff-Proof Thermal Matte Lamination',
    desc: 'Corona-treated high-adhesion film preventing scuffing, cracking along die-crease scores, or delamination during high-speed mechanized packing.',
    icon: ShieldCheck,
  },
  {
    code: 'CAD Structural Die-Lines',
    title: 'Automated Line Compatibility',
    desc: 'ArtiosCAD parametric structural design ensuring drop-in compatibility with high-speed automated carton erection and bottle sleeve filling lines.',
    icon: Cpu,
  },
];

const EMUPRAN_PROJECT_DOSSIERS = [
  {
    title: 'Luxury Real Estate Launch Presentation Coffret',
    clientType: 'Ultra-Luxury Residential Tower, Worli',
    runVolume: '2,500 Bespoke Rigid Boxes',
    finishing: '1200 GSM Kappa + Thermal Gold Micro-Foil',
    image: '/images/luxury-print-packaging.jpg',
    takeaway: 'Custom magnetic presentation box with French-fold monograph and velvet brochure tray.',
    metrics: [
      { label: 'Board Spec', value: '1200 GSM Kappa' },
      { label: 'Closure', value: 'Neodymium Mag' },
      { label: 'Foil Accuracy', value: '+/- 0.15 mm' },
      { label: 'Turnaround', value: '18 Days' },
    ],
    specs: [
      '1200 GSM imported Kappa greyboard with zero corner warp guarantee',
      'Registered gold thermal micro-foil stamping with multilevel embossed crest',
      'Dual concealed neodymium magnetic catch mechanism embedded in spine flap',
      'High-density CNC-routed velvet-flocked EVA foam interior nesting tray',
    ],
  },
  {
    title: 'Multinational Pharma Packaging Line',
    clientType: 'Tier-1 Pharmaceutical Manufacturer, Thane',
    runVolume: '500,000 Monocartons',
    finishing: '350 GSM Cyber XLC + Braille Embossing',
    image: '/images/catalogues_mockup.png',
    takeaway: 'High-speed automated packaging line compliance with tamper-evident security coatings.',
    metrics: [
      { label: 'Board Grade', value: '350 GSM Cyber' },
      { label: 'Color Control', value: 'Delta-E < 1.2' },
      { label: 'Run Volume', value: '500,000 Units' },
      { label: 'Line Speed', value: '350 Cartons/min' },
    ],
    specs: [
      'Virgin fiber FSC-certified food and pharma grade folding boxboard (FBB)',
      'Marburg Medium compliant Braille dot height strictly verified at 0.20 mm',
      'Fast-curing low-migration UV varnish with anti-rub protection',
      'Crash-lock auto-bottom die-cut geometry for high-speed cartoning machines',
    ],
  },
  {
    title: 'Corporate Heritage Monograph & Annual Report',
    clientType: 'Listed Financial Conglomerate, BKC',
    runVolume: '10,000 Case-Bound Volumes',
    finishing: 'Section-Sewn Hardcover + Spot UV',
    image: '/images/brochures-catalogues-print.jpg',
    takeaway: 'Archival quality case-bound hardcover book with selective drip-off varnish on 170 GSM Magno Satin.',
    metrics: [
      { label: 'Binding', value: 'Section Sewn' },
      { label: 'Text Paper', value: '170 GSM Magno' },
      { label: 'Cover Board', value: '3.0mm Greyboard' },
      { label: 'Foil Details', value: 'Spine & Cover' },
    ],
    specs: [
      'High-bulk FSC-certified velvet-finish paper stock with micro-perforations',
      'Pantone metallic gold spot ink accents throughout text pages',
      'Precision section-sewn book blocks with reinforced head and tail bands',
      'French-fold jacket with selective drip-off matte and gloss spot varnish',
    ],
  },
  {
    title: 'Commercial Wayfinding & Architectural Signage',
    clientType: 'Grade-A Commercial Tower, Lower Parel',
    runVolume: '450 Interior & Exterior Sign Units',
    finishing: 'Brushed Architectural Bronze + LED',
    image: '/images/craft-signage-print.jpg',
    takeaway: 'Precision waterjet-cut architectural signage with PWD electrical safety certification.',
    metrics: [
      { label: 'Substrate', value: 'Brushed Bronze' },
      { label: 'Illumination', value: '3000K LED' },
      { label: 'Total Units', value: '450 Signs' },
      { label: 'Installation', value: 'Turnkey Fixed' },
    ],
    specs: [
      'Marine-grade architectural bronze and 15mm optical-grade cast acrylic letters',
      'Precision waterjet contour cutting with 0.1mm dimensional tolerance',
      'Concealed IP67 rated MeanWell power supplies and low-voltage electrical feeds',
      'Comprehensive wayfinding directional directory layouts with tactile braille',
    ],
  },
];

const EMUPRAN_EXECUTION_ROADMAP = [
  {
    phase: '01',
    title: 'Structural Design & CAD Prototyping',
    timeline: 'Days 1 to 5',
    scope: 'ArtiosCAD structural die-line generation, material GSM selection, and physical machine-cut prototype dummy verification with client merchandise.',
    deliverable: 'Approved physical prototype dummy and approved die-line digital drawing.',
  },
  {
    phase: '02',
    title: 'CTP Laser Imaging & Color Proofing',
    timeline: 'Days 6 to 8',
    scope: 'Thermal CTP (Computer-to-Plate) 2400 DPI plate imaging, GMG digital contract proofing, and calibrated Pantone ink recipe matching.',
    deliverable: 'Signed GMG contract color proof with spectrophotometric validation sheet.',
  },
  {
    phase: '03',
    title: 'High-Speed Offset Run & Foiling',
    timeline: 'Days 9 to 16',
    scope: 'Heidelberg Speedmaster 6-color offset impression run, registered hot-stamp thermal micro-foiling, and inline protective coating.',
    deliverable: 'Printed press sheets with automated optical density inspection certificates.',
  },
  {
    phase: '04',
    title: 'Die-Cutting, Folding-Gluing & QA',
    timeline: 'Days 17 to 21',
    scope: 'High-speed Bobst automatic die-cutting, window patching, multi-point folder-gluer assembly, drop testing, and shrink-wrapped palletization.',
    deliverable: 'Final QA certificate, lot inspection report, and logistics dispatch.',
  },
];

export default function EmudranPage() {
  return (
    <DivisionPage
      data={emudran}
      customHeroLogo={
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 4px' }}>
          <img
            src="/images/logos/emudran-official.png"
            alt="eMudran Official Brand Mark"
            style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>
      }
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 font-sans">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#4338CA] font-bold bg-[#4338CA]/10 px-3 py-1 rounded-md border border-[#4338CA]/20">
            [HEIDELBERG OFFSET &amp; LUXURY PACKAGING ENGINEERING]
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              marginTop: '10px',
            }}
          >
            Bespoke Rigid Boxes, Precision Offset &amp; Architectural Signage.
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto leading-relaxed">
            From 1,200 GSM thermal micro-foil luxury presentation boxes to 500,000 unit pharmaceutical folding cartons: precision print engineering crafted on Heidelberg offset presses.
          </p>
        </div>

        {/* 2-Column Grid: Volume Curve + Prototype Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Packaging Volume Curve Column */}
          <div className="lg:col-span-7 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#4338CA] font-bold">
                  Packaging Production Economics
                </span>
                <span className="text-[11px] font-semibold text-[var(--color-text-muted)]">
                  Volume Scaling
                </span>
              </div>
              <h4
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#111111',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  marginBottom: '8px',
                }}
              >
                Unit Production Rate vs Volume Run
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                Noticeable economies of scale achieved beyond 5,000 units on Heidelberg 6-color presses, minimizing plate amortizations and die setup costs.
              </p>
              <div className="h-64 w-full">
                <PackagingVolumeTierCurve />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#666666] font-sans">
              <span>ISO 12647-2 Colour Management Certified</span>
              <span className="font-bold text-[#4338CA]">Delta-E &lt; 1.5</span>
            </div>
          </div>

          {/* Luxury Finishing Highlights */}
          <div className="lg:col-span-5 rounded-3xl border border-[var(--color-border)] bg-[#F5F6FA] p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#4338CA] font-bold">
                  Bespoke Craftsmanship
                </span>
                <Sparkles size={18} color="#4338CA" />
              </div>
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: '#111111',
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                  marginBottom: '10px',
                }}
              >
                Thermal Micro-Foil &amp; Rigid Craftsmanship
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6 font-sans">
                Each rigid presentation box is structural board wrapped with imported textures, register-embossed with thermal gold foil, and fitted with custom velvet inserts.
              </p>
              <div className="space-y-3">
                {[
                  '1200 GSM Kappa high-density greyboard framework',
                  'Registered gold & copper thermal micro-foil stamping',
                  'Concealed neodymium magnetic closing flaps',
                  'Precision waterjet-cut brushed bronze signage',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#333333] font-sans">
                    <CheckCircle2 size={15} color="#4338CA" className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#4338CA] text-white text-xs font-semibold shadow-sm hover:bg-[#3730a3] transition-colors no-underline"
              >
                <span>Request Custom Packaging Prototype</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Print Standards & Engineering Benchmarks Grid */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#4338CA] font-bold bg-[#4338CA]/10 px-3 py-1 rounded-md border border-[#4338CA]/20">
              [PRINT ENGINEERING BENCHMARKS]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              ISO 12647-2 Process Control &amp; FSC Certification.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Manufactured under strict process control: automated densitometer color monitoring, FSC chain of custody, and high-speed automated die-cutting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINT_BENCHMARKS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm hover:border-[#4338CA]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#4338CA] tracking-wider uppercase bg-[#4338CA]/10 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <Icon size={18} color="#4338CA" />
                    </div>
                    <h4 className="text-base font-bold text-[#111111] mb-2">{b.title}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-[#047857] font-semibold">
                    <CheckCircle2 size={13} color="#047857" />
                    <span>ISO Quality Assured</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commissioned Packaging & Signage Project Dossiers */}
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#4338CA] font-bold bg-[#4338CA]/10 px-3 py-1 rounded-md border border-[#4338CA]/20">
              [COMMISSIONED PACKAGING DOSSIERS]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              Completed Packaging, Print &amp; Signage References.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              Real commercial packaging runs delivered across Mumbai luxury towers, pharmaceutical companies, and listed corporate headquarters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EMUPRAN_PROJECT_DOSSIERS.map((dossier) => (
              <div
                key={dossier.title}
                className="rounded-3xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <ImageWithLightbox
                      src={dossier.image}
                      alt={dossier.title}
                      title={`${dossier.title} (${dossier.clientType})`}
                      category={dossier.finishing}
                      scope={dossier.takeaway}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#4338CA] shadow-sm border border-black/5">
                      {dossier.runVolume}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                      <span>{dossier.clientType}</span>
                      <span className="font-semibold text-[#4338CA]">{dossier.runVolume}</span>
                    </div>

                    <h4
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 400,
                        color: '#111111',
                        fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                        marginBottom: '8px',
                      }}
                    >
                      {dossier.title}
                    </h4>

                    <p className="text-xs text-[#555555] leading-relaxed mb-6">{dossier.takeaway}</p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-3 rounded-xl bg-slate-50 border border-black/5">
                      {dossier.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-[10px] text-[#777777] uppercase">{m.label}</div>
                          <div className="text-xs font-bold text-[#111111] mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Specs Bullet List */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#4338CA]">
                        Executed Print &amp; Finishing Specs:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#666666]">
                        {dossier.specs.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#4338CA] font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-[#4338CA] text-[#111111] hover:text-white text-xs font-semibold transition-colors no-underline"
                  >
                    <span>Request Quotation for Similar Volume</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Stage Execution Roadmap */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[#F5F6FA] p-6 md:p-10">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-[#4338CA] font-bold bg-[#4338CA]/10 px-3 py-1 rounded-md border border-[#4338CA]/20">
              [PRINT PRODUCTION TIMELINE]
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                marginTop: '10px',
              }}
            >
              Packaging Engineering &amp; Offset Press Sequence.
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
              From CAD structural die-line prototyping to multi-point QA inspection: our 21-day production framework guarantees razor-sharp finishing and on-time dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EMUPRAN_EXECUTION_ROADMAP.map((step) => (
              <div
                key={step.phase}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-[#4338CA] font-serif">
                      ({step.phase})
                    </span>
                    <span className="text-[10px] font-semibold text-[#666666] bg-slate-100 px-2 py-0.5 rounded">
                      {step.timeline}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed mb-4">{step.scope}</p>
                </div>
                <div className="pt-3 border-t border-black/5 text-[11px] text-[#047857] font-medium leading-normal">
                  <strong>Milestone:</strong> {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DivisionPage>
  );
}
