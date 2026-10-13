"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X, CheckCircle2, MapPin, Building2, Zap, FileText } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  location: string;
  category: string;
  metric: string;
  primaryImage: string;
  galleryImages: string[];
  client: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  specs: { label: string; value: string }[];
  actionHref: string;
  actionLabel: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'abhilasha-chs',
    title: 'Abhilasha CHS Walkable Rooftop Solar Pergola',
    location: 'Kandivali West, Mumbai',
    category: 'Renewable Infrastructure / Solis',
    metric: '55.55 kWp (101 Bi-Facial Panels) | 100% Usable Terrace Footprint',
    primaryImage: '/images/solis_canopy_page1.jpg',
    galleryImages: [
      '/images/solis_canopy_page1.jpg',
      '/images/solis_terrace_lounge.jpg',
      '/images/rooftop_amenity_sky_lounge.jpg',
    ],
    client: 'Abhilasha Cooperative Housing Society (Kautankar Sir / Managing Committee)',
    challenge:
      'The society terrace was actively utilized by residents for recreation, morning walks, and festival gatherings. Standard RCC ground-mounted solar structures would have created dangerous trip hazards, blocked movement, and made the terrace completely unusable.',
    solution:
      'Solis engineered a 10.5 ft elevated hot-dip galvanized structural pergola canopy carrying 101 high-wattage bi-facial solar modules. The structure features integrated rainwater channels, concealed cable raceways, and full net metering liaisoning with Adani Electricity Mumbai Limited (AEML).',
    outcomes: [
      '55.55 kWp plant producing ~80,000 clean units annually',
      '85% reduction in society common-area electricity billing',
      '100% usable terrace space preserved with shaded walkable headroom',
      'Certified wind-load tolerance up to 150 km/h with municipal compliance',
    ],
    specs: [
      { label: 'Plant Capacity', value: '55.55 kWp' },
      { label: 'Module Tech', value: '101 Bi-Facial PERC Panels' },
      { label: 'Structure Clearance', value: '10.5 ft Walkable Headroom' },
      { label: 'DISCOM Liaison', value: 'Adani Electricity (AEML)' },
    ],
    actionHref: '/solis#solis-enquiry',
    actionLabel: 'Inquire About Solar Pergola Installation',
  },
  {
    id: 'agrim-solid-waste',
    title: 'Patented Zero-Power Solid Waste Tech & Project Economics',
    location: 'Maharashtra Municipal & Industrial Zone',
    category: 'Clean Technology & Project Economics / Agrim',
    metric: '350°C Zero-Electricity Combustion | Central Govt Patent | MPCB Certified',
    primaryImage: '/images/waste-management-tech.jpg',
    galleryImages: [
      '/images/waste-management-tech.jpg',
      '/images/site_capex_npv_v2.png',
      '/images/site_payback_irr_v2.png',
    ],
    client: 'Industrial Campuses & Municipal Waste Authorities',
    challenge:
      'Decentralized solid waste management is crippled by high fuel and electricity costs in conventional incinerators, high hauling charges, and strict pollution norms that cause compliance failures.',
    solution:
      'Agrim and Grid Apex deploy a Central Government patented, MPCB-certified thermal magnetic decomposition system (developed by Dr. Manoj Chavan & Mahendra Kabnurkar). The machine operates at 350°C with zero external electricity or fuel after ignition, reducing waste volume by 96% into mineral ash for paver blocks and green coal. Agrim models complete project CAPEX, NPV, and Payback schedules for bank sanctions.',
    outcomes: [
      'Zero ongoing electricity or fuel consumption during operation',
      '96% volume reduction yielding sterile mineral ash and green coal',
      'Central Government Patent granted and MPCB pollution compliance certified',
      'Detailed financial modeling with IRR analysis and bank loan dossiers (non-lender)',
    ],
    specs: [
      { label: 'Operating Temp', value: '350°C Controlled Decomposition' },
      { label: 'External Power', value: 'Zero Electricity / Zero Fuel' },
      { label: 'Certification', value: 'Central Govt Patent & MPCB Certified' },
      { label: 'Volume Reduction', value: '96% (Produces 4% Inert Ash)' },
    ],
    actionHref: '/agrim',
    actionLabel: 'Review Agrim Feasibility & Banking Dossiers',
  },
  {
    id: 'substation-switchgear',
    title: '33kV Substation Switchgear & HT Sanction',
    location: 'Thane Industrial Zone, MMR',
    category: 'Industrial Electrical / Grid Apex',
    metric: '1600 kVA Transformer | PWD Electrical Inspectorate Sanctions',
    primaryImage: '/images/electrical-substation.jpg',
    galleryImages: [
      '/images/electrical-substation.jpg',
      '/images/field_switchgear_panel.jpg',
      '/images/ht_cable_termination.jpg',
    ],
    client: 'Precision Engineering Manufacturing Complex',
    challenge:
      'Factory capacity expansion required an immediate 1600 kVA high-tension load sanction, high-voltage transformer installation, and strict electrical inspectorate approvals without interrupting ongoing plant operations.',
    solution:
      'Grid Apex completed turnkey engineering for an oil-cooled 1600 kVA step-down transformer bay, SF6 vacuum circuit breaker (VCB) panels, high-voltage cable trenching, neutral earth pit grid, and direct liaisoning with the Maharashtra PWD Electrical Inspectorate.',
    outcomes: [
      '1600 kVA energized 2 weeks ahead of scheduled production run',
      'Zero safety observations during statutory electrical inspection',
      'Fault-current protection coordination verified with parent DISCOM',
      'Turnkey single-point execution from drawing approvals to charging',
    ],
    specs: [
      { label: 'Voltage Class', value: '33kV / 433V HT Step-Down' },
      { label: 'Rating', value: '1600 kVA Transformer Bay' },
      { label: 'Switchgear', value: 'Vacuum Circuit Breaker (VCB) HT Panel' },
      { label: 'Sanctions', value: 'PWD Electrical Inspectorate Approved' },
    ],
    actionHref: '/grid-apex',
    actionLabel: 'Consult on HT/LT Substation Engineering',
  },
  {
    id: 'one-international-centre',
    title: 'One International Centre Corporate Fit-out',
    location: 'Elphinstone, Lower Parel, Mumbai',
    category: 'Turnkey Commercial Interior / Tvasta',
    metric: 'Corporate Headquarters | Acoustic Zoning & Integrated MEP',
    primaryImage: '/images/architectural-interior.jpg',
    galleryImages: [
      '/images/architectural-interior.jpg',
      '/images/architectural-fitout-materials.jpg',
      '/images/tvasta_luxury_interior.jpg',
    ],
    client: 'Financial Advisory & Wealth Management Headquarters',
    challenge:
      'A fast-track 58-day completion window requiring luxury executive finishes, specialized acoustic isolation for boardrooms, and complex low-voltage data and MEP routing without visible surface conduits.',
    solution:
      'Tvasta provided turnkey space planning, 3D architectural CAD modeling, custom walnut veneer paneling, acoustic baffle ceilings, and concealed MEP distribution under continuous on-site project management.',
    outcomes: [
      'Turnkey delivery achieved in 58 calendar days',
      'Boardroom acoustic isolation rated to STC 48 standard',
      'Integrated intelligent lighting controls and thermal comfort zones',
      'Single-source accountability from bare shell to finished handover',
    ],
    specs: [
      { label: 'Floor Space', value: '4,800 sq.ft. Executive Floor' },
      { label: 'Acoustics', value: 'STC 48 Rated Isolation' },
      { label: 'Turnaround', value: '58 Calendar Days Turnkey' },
      { label: 'Finishes', value: 'Natural Walnut Veneer & Imported Stone' },
    ],
    actionHref: '/tvasta',
    actionLabel: 'Explore Tvasta Turnkey Space Planning',
  },
  {
    id: 'rigid-box-packaging',
    title: 'Luxury Rigid Packaging & Corporate Identity',
    location: 'Mumbai Corporate Portfolio',
    category: 'Packaging & Identity / eMudran',
    metric: 'Thermal Micro-Foil Embossing | Precision Paperboard Engineering',
    primaryImage: '/images/luxury-print-packaging.jpg',
    galleryImages: [
      '/images/luxury-print-packaging.jpg',
      '/images/catalogues_mockup.png',
      '/images/brochures-catalogues-print.jpg',
    ],
    client: 'High-Jewelry & Luxury Hospitality Brand',
    challenge:
      'High-end retail packaging demanding exact Pantone color matching, registered micro-foil metallic stamping, and structural rigidity across large print volumes without corner cracking.',
    solution:
      'eMudran conducted direct press-pass calibration, rigorous substrate humidity testing, precision custom dies, and automated post-press rigid box assembly overseen by Creative Director Manish Ajgaonkar.',
    outcomes: [
      '50,000 unit production run completed with zero batch variance',
      'Signature tactile unboxing experience with crisp magnetic closures',
      'FSC-certified sustainable paperboard substrates utilized',
      'Direct press-pass color accuracy verified against master standards',
    ],
    specs: [
      { label: 'Production Run', value: '50,000 Rigid Presentation Boxes' },
      { label: 'Specialty Finish', value: 'Registered Gold Thermal Micro-Foil' },
      { label: 'Substrate', value: 'FSC-Certified Premium Greyboard' },
      { label: 'Direction', value: 'Curated by Manish Ajgaonkar' },
    ],
    actionHref: '/emudran',
    actionLabel: 'Request eMudran Print & Packaging Proof',
  },
];

export default function GroundedProjectTrack() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const openDossier = (study: CaseStudy) => {
    setSelectedStudy(study);
    setActiveImageIdx(0);
  };

  const closeDossier = () => {
    setSelectedStudy(null);
  };

  // Keyboard Escape listener & Body scroll locking
  useEffect(() => {
    if (selectedStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedStudy) {
        closeDossier();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStudy]);

  return (
    <section id="projects" className="project-section-track" style={{ position: 'relative' }}>
      {/* Edge Progressive Blurs */}
      <div className="progressive-blur_wrap-2 blur-edge-left" />
      <div className="progressive-blur_wrap-2 blur-edge-right" />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px 40px 32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div className="eye-brow-container" style={{ marginBottom: '16px' }}>
              <span className="text-eye-brow" style={{ color: '#888888', fontFamily: 'var(--font-mono, monospace)' }}>
                [selected builds &amp; sanctions]
              </span>
            </div>
            <h3
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                color: '#FFFFFF',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                margin: 0,
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                lineHeight: 1.15,
              }}
            >
              Documented Field Execution.
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.96rem',
                marginTop: '8px',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              Click any project to inspect engineering specifications, site photos, and field outcomes.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll left through projects"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll right through projects"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Reel */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '28px',
          overflowX: 'auto',
          padding: '20px 32px 40px 32px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            onClick={() => openDossier(study)}
            style={{
              flex: '0 0 clamp(320px, 42vw, 540px)',
              scrollSnapAlign: 'start',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '560px',
              backgroundColor: '#1E2124',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
            }}
            className="project-card-interactive"
          >
            <img
              src={study.primaryImage}
              alt={study.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.05)',
                transition: 'transform 0.5s ease',
              }}
            />

            {/* Gradient Mask Over Card */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(17,17,17,0.96) 0%, rgba(17,17,17,0.5) 45%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Content Container */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    color: '#C29F53',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {study.category}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.76rem',
                    color: '#999999',
                  }}
                >
                  {study.location}
                </span>
              </div>

              <h4
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                }}
              >
                {study.title}
              </h4>

              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                {study.metric}
              </p>

              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDossier(study);
                  }}
                  className="button is-icon is-alternate"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    borderRadius: '100px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Interactive Case Study Dossier</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Case Study Dossier Modal */}
      {selectedStudy && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeDossier}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              backgroundColor: '#FAF8F5',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6)',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 32px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    color: '#C29F53',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  [{selectedStudy.category}]
                </span>
                <h3
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    color: '#111111',
                    lineHeight: 1.2,
                  }}
                >
                  {selectedStudy.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeDossier}
                aria-label="Close dossier modal"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#F4F1EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#111111',
                  transition: 'background-color 0.2s ease',
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div
              style={{
                padding: '32px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
              }}
            >
              {/* Photo Gallery with Selector */}
              <div>
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: '380px',
                    backgroundColor: '#111111',
                    marginBottom: '12px',
                  }}
                >
                  <img
                    src={selectedStudy.galleryImages[activeImageIdx]}
                    alt={`${selectedStudy.title} photo ${activeImageIdx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {selectedStudy.galleryImages.length > 1 && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {selectedStudy.galleryImages.map((img, idx) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        style={{
                          width: '80px',
                          height: '56px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: activeImageIdx === idx ? '2px solid #C29F53' : '1px solid rgba(0,0,0,0.15)',
                          padding: 0,
                          cursor: 'pointer',
                          opacity: activeImageIdx === idx ? 1 : 0.6,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Specifications Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: '12px',
                  backgroundColor: '#FFFFFF',
                  padding: '18px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                {selectedStudy.specs.map((spec) => (
                  <div key={spec.label}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: '#777777',
                        fontFamily: 'var(--font-mono, monospace)',
                        textTransform: 'uppercase',
                        display: 'block',
                      }}
                    >
                      {spec.label}
                    </span>
                    <strong
                      style={{
                        fontSize: '0.94rem',
                        color: '#111111',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                        marginTop: '2px',
                        display: 'block',
                      }}
                    >
                      {spec.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="dossier-split">
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.76rem',
                      color: '#C29F53',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    [the field challenge]
                  </span>
                  <p
                    style={{
                      marginTop: '8px',
                      color: '#444444',
                      fontSize: '0.94rem',
                      lineHeight: 1.6,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {selectedStudy.challenge}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.76rem',
                      color: '#C29F53',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    [the engineering execution]
                  </span>
                  <p
                    style={{
                      marginTop: '8px',
                      color: '#444444',
                      fontSize: '0.94rem',
                      lineHeight: 1.6,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {selectedStudy.solution}
                  </p>
                </div>
              </div>

              {/* Measurable Field Outcomes */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.76rem',
                    color: '#C29F53',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '14px',
                  }}
                >
                  [verified field outcomes]
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedStudy.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.92rem',
                        color: '#333333',
                        fontFamily: 'var(--font-sans, Inter, sans-serif)',
                      }}
                    >
                      <CheckCircle2 size={16} color="#C29F53" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div
              style={{
                padding: '20px 32px',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666666', fontSize: '0.84rem' }}>
                <MapPin size={15} color="#C29F53" />
                <span>{selectedStudy.location}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closeDossier}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '100px',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    backgroundColor: 'transparent',
                    color: '#444444',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Close Dossier
                </button>
                <a
                  href={selectedStudy.actionHref}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '100px',
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <span>{selectedStudy.actionLabel}</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .project-card-interactive:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(194, 159, 83, 0.5) !important;
        }
        @media (max-width: 768px) {
          .dossier-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
