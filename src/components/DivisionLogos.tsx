import React from 'react';
import Image from 'next/image';
import Logo from './Logo';

export interface DivisionLogoProps {
  division: 'solis' | 'sanyog' | 'gridApex' | 'grid-apex' | 'tvasta' | 'emudran' | 'agrim' | string;
  size?: number;
  className?: string;
}

export interface SingleLogoProps {
  size?: number;
  className?: string;
}

/**
 * SOLIS Logo
 * Bespoke gold and champagne architectural vector SVG mark
 * representing solar ray and photovoltaic pergola geometry.
 */
export function SolisLogo({ size = 48, className = '' }: SingleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SOLIS Solar Mark"
    >
      <defs>
        <linearGradient id="solis-gold" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3E5AB" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#C29F53" />
        </linearGradient>
      </defs>
      {/* Central radiating solar core */}
      <circle cx="50" cy="50" r="14" fill="url(#solis-gold)" />
      <circle cx="50" cy="50" r="19" stroke="#C29F53" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      {/* Photovoltaic pergola structural ray facets */}
      <path d="M50 10 L50 26" stroke="url(#solis-gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 74 L50 90" stroke="url(#solis-gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 50 L26 50" stroke="url(#solis-gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M74 50 L90 50" stroke="url(#solis-gold)" strokeWidth="3" strokeLinecap="round" />
      {/* Diagonal photovoltaic array lattice */}
      <path d="M22 22 L33 33" stroke="#C29F53" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M78 22 L67 33" stroke="#C29F53" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 78 L33 67" stroke="#C29F53" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M78 78 L67 67" stroke="#C29F53" strokeWidth="2.5" strokeLinecap="round" />
      {/* Outer pergola geometric boundary */}
      <polygon points="50,6 94,50 50,94 6,50" stroke="#C29F53" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
    </svg>
  );
}

/**
 * SANYOG Logo
 * Bespoke gold and champagne architectural vector SVG mark
 * representing utility power liaison and continuous circuit flow.
 */
export function SanyogLogo({ size = 48, className = '' }: SingleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SANYOG Liaison Mark"
    >
      <defs>
        <linearGradient id="sanyog-gold" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3E5AB" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#C29F53" />
        </linearGradient>
      </defs>
      {/* Interlocking utility circuit liaison loop */}
      <path
        d="M32 50 C32 38 42 30 54 30 C66 30 76 40 76 52 C76 64 66 72 54 72 C42 72 32 64 32 50 Z"
        stroke="url(#sanyog-gold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Power liaison bridge lines */}
      <path
        d="M18 50 L32 50 M76 50 L90 50 M50 18 L50 30 M50 72 L50 84"
        stroke="#C29F53"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Terminal liaison contact nodes */}
      <circle cx="18" cy="50" r="4" fill="#D4AF37" />
      <circle cx="90" cy="50" r="4" fill="#D4AF37" />
      <circle cx="50" cy="18" r="4" fill="#D4AF37" />
      <circle cx="50" cy="84" r="4" fill="#D4AF37" />
      {/* Central power node */}
      <circle cx="54" cy="51" r="5" fill="#F3E5AB" />
    </svg>
  );
}

/**
 * GRID APEX Logo
 * Bespoke gold and champagne architectural vector SVG mark
 * representing HT/LT power grid nodes and clean waste tech.
 */
export function GridApexLogo({ size = 48, className = '' }: SingleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GRID APEX Power Grid Mark"
    >
      <defs>
        <linearGradient id="grid-apex-gold" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3E5AB" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#C29F53" />
        </linearGradient>
      </defs>
      {/* Grid Apex apex node */}
      <circle cx="50" cy="16" r="6" fill="url(#grid-apex-gold)" />
      {/* Upper cross-arm */}
      <path d="M22 36 L78 36" stroke="url(#grid-apex-gold)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Lower cross-arm */}
      <path d="M14 54 L86 54" stroke="url(#grid-apex-gold)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Main pylon legs converging to apex */}
      <path d="M28 88 L46 22 M72 88 L54 22" stroke="url(#grid-apex-gold)" strokeWidth="3" strokeLinecap="round" />
      {/* Internal structural cross-bracing */}
      <path d="M30 72 L70 72" stroke="#C29F53" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 54 L65 72 M65 54 L35 72" stroke="#C29F53" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M38 36 L62 54 M62 36 L38 54" stroke="#C29F53" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Substation grid terminal nodes */}
      <circle cx="22" cy="36" r="3.5" fill="#D4AF37" />
      <circle cx="78" cy="36" r="3.5" fill="#D4AF37" />
      <circle cx="14" cy="54" r="3.5" fill="#D4AF37" />
      <circle cx="86" cy="54" r="3.5" fill="#D4AF37" />
      <circle cx="28" cy="88" r="3" fill="#C29F53" />
      <circle cx="72" cy="88" r="3" fill="#C29F53" />
    </svg>
  );
}

/**
 * TVASTA Logo
 * Authentic luxury emblem pointing to high-resolution business card asset
 * with roof-window architectural motif.
 */
export function TvastaLogo({ size = 48, className = '' }: SingleLogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-md border border-[rgba(194,159,83,0.3)] bg-[#11151A]/80 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logos/00003034-TVASTA Business Card_p1_img_0_FormXob.73321509b2ffc0b3df216bb95ab2c419.jpg"
        alt="TVASTA Luxury Emblem"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        unoptimized
      />
    </div>
  );
}

/**
 * eMudran Logo
 * Authentic CMYK transparent flourish emblem using Next.js Image
 * pointing to business card asset with alpha channel.
 */
export function EmudranLogo({ size = 48, className = '' }: SingleLogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logos/00003033-eMudran_Business_Card_p1_img_0_X5.png"
        alt="eMudran CMYK Emblem"
        width={size}
        height={size}
        className="h-full w-full object-contain"
        unoptimized
      />
    </div>
  );
}

/**
 * AGRIM Logo
 * Bespoke gold and champagne architectural vector SVG mark
 * representing classical institutional pillars and financial dossier order.
 */
export function AgrimLogo({ size = 48, className = '' }: SingleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AGRIM Financial Pillars Mark"
    >
      <defs>
        <linearGradient id="agrim-gold" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3E5AB" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#C29F53" />
        </linearGradient>
      </defs>
      {/* Pediment triangular gable */}
      <polygon points="50,14 86,34 14,34" fill="url(#agrim-gold)" opacity="0.9" />
      {/* Architrave horizontal entablature */}
      <rect x="18" y="36" width="64" height="5" rx="1.5" fill="#D4AF37" />
      {/* Institutional colonnade: 4 pillars */}
      <rect x="23" y="44" width="7" height="34" rx="1.5" fill="url(#agrim-gold)" />
      <rect x="39" y="44" width="7" height="34" rx="1.5" fill="url(#agrim-gold)" />
      <rect x="54" y="44" width="7" height="34" rx="1.5" fill="url(#agrim-gold)" />
      <rect x="70" y="44" width="7" height="34" rx="1.5" fill="url(#agrim-gold)" />
      {/* Stylobate stepped foundation bases */}
      <rect x="18" y="80" width="64" height="4" rx="1" fill="#D4AF37" />
      <rect x="14" y="86" width="72" height="4" rx="1" fill="#C29F53" />
    </svg>
  );
}

/**
 * Master DivisionLogo router component
 * Supports all 6 division slugs: solis, sanyog, gridApex / grid-apex, tvasta, emudran, agrim
 * Safe fallback to master JC Apex umbrella emblem for unknown slugs.
 */
export function DivisionLogo({ division, size = 48, className = '' }: DivisionLogoProps) {
  const key = (division || '').toString().toLowerCase().trim();

  switch (key) {
    case 'solis':
      return <SolisLogo size={size} className={className} />;
    case 'sanyog':
      return <SanyogLogo size={size} className={className} />;
    case 'gridapex':
    case 'grid-apex':
      return <GridApexLogo size={size} className={className} />;
    case 'tvasta':
      return <TvastaLogo size={size} className={className} />;
    case 'emudran':
      return <EmudranLogo size={size} className={className} />;
    case 'agrim':
      return <AgrimLogo size={size} className={className} />;
    default:
      return <Logo width={size} height={size} className={className} />;
  }
}

export const OFFICIAL_LOGOS = {
  solis: {
    light: '/images/logos/solis-official.png',
    dark: '/images/logos/solis-logo-white.png',
  },
  sanyog: {
    light: '/images/logos/sanyog-official.png',
    dark: '/images/logos/sanyog-official.png',
  },
  'grid-apex': {
    light: '/images/logos/grid-apex-official.png',
    dark: '/images/logos/grid-apex-white.png',
  },
  gridapex: {
    light: '/images/logos/grid-apex-official.png',
    dark: '/images/logos/grid-apex-white.png',
  },
  tvasta: {
    light: '/images/logos/tvasta-dark.png',
    dark: '/images/logos/tvasta-official.png',
  },
  emudran: {
    light: '/images/logos/emudran-official.png',
    dark: '/images/logos/emudran-white.png',
  },
  agrim: {
    light: '/images/logos/agrim-dark.png',
    dark: '/images/logos/agrim-official.png',
  },
};

export interface OfficialBrandMarkProps {
  division: string;
  theme?: 'light' | 'dark';
  maxHeight?: number | string;
  maxWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function OfficialBrandMark({
  division,
  theme = 'light',
  maxHeight = 34,
  maxWidth = 140,
  className = '',
  style = {},
}: OfficialBrandMarkProps) {
  const key = (division || '').toString().toLowerCase().trim();
  const logoConfig = OFFICIAL_LOGOS[key as keyof typeof OFFICIAL_LOGOS];
  if (!logoConfig) {
    return <Logo width={32} height={32} className={className} />;
  }
  const src = theme === 'dark' ? logoConfig.dark : logoConfig.light;
  return (
    <img
      src={src}
      alt={`${division} Official Logo`}
      className={className}
      style={{
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        display: 'inline-block',
        ...style,
      }}
    />
  );
}

export default DivisionLogo;
