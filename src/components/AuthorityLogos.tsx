"use client";

import React from 'react';

export interface AuthorityLogoProps {
  id: string;
  size?: number;
  className?: string;
  variant?: 'color' | 'monochrome' | 'gold';
}

export function BestLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BEST Undertaking Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#E11D48" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#E11D48" strokeOpacity="0.3" strokeWidth="1.5" />
      <path
        d="M24 8L34 13V25C34 32.5 29.5 38 24 40C18.5 38 14 32.5 14 25V13L24 8Z"
        fill="#E11D48"
      />
      <path
        d="M25 15L18 26H24L23 33L31 22H25L26 15Z"
        fill="#FFFFFF"
        stroke="#FCD34D"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdaniLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Adani Electricity Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#0284C7" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#0284C7" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Signature multi-facet triangle mark */}
      <path d="M24 10L36 34H28L24 24L20 34H12L24 10Z" fill="#0284C7" />
      <path d="M24 10L28 24H20L24 10Z" fill="#38BDF8" />
      <path d="M20 24L12 34H18L22 24H20Z" fill="#F43F5E" />
      <path d="M28 24L36 34H30L26 24H28Z" fill="#F59E0B" />
      <circle cx="24" cy="21" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function TataPowerLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tata Power Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#1E3A8A" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#1E3A8A" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="14" fill="#1E3A8A" />
      <circle cx="24" cy="24" r="12" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 2" />
      {/* Power nexus T bolt */}
      <path d="M17 19H31V22H26V31H22V22H17V19Z" fill="#FFFFFF" />
      <path d="M24 14L27 18H21L24 14Z" fill="#FBBF24" />
      <circle cx="24" cy="31" r="1.5" fill="#60A5FA" />
    </svg>
  );
}

export function MsedclLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MSEDCL Mahavitaran Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#D97706" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#D97706" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Mahavitaran golden sun & transmission tower */}
      <circle cx="24" cy="24" r="14" fill="#EA580C" />
      {/* Transmission pylon silhouette */}
      <path
        d="M24 14L28 32H25L24 27L23 32H20L24 14Z"
        fill="#FFFFFF"
      />
      <path
        d="M17 21H31M19 25H29"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M26 18L18 27H23L22 33L30 23H25L26 18Z"
        fill="#FDE047"
      />
    </svg>
  );
}

export function PwdLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PWD Electrical Inspectorate Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#8C733E" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#8C733E" strokeOpacity="0.35" strokeWidth="1.5" />
      {/* Maharashtra Government PWD CEI Crest */}
      <circle cx="24" cy="24" r="14" fill="#8C733E" />
      <circle cx="24" cy="24" r="12" stroke="#FDE68A" strokeWidth="1" />
      {/* Ashoka Pillar / Scales of Justice Motif */}
      <path d="M24 15V32M18 19H30M16 23L18 19L20 23ZM28 23L30 19L32 23Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="21" y="31" width="6" height="2" rx="1" fill="#FFFFFF" />
    </svg>
  );
}

export function MpcbLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MPCB Pollution Control Board Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#059669" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#059669" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Eco Circular Gear & Dual Leaf */}
      <circle cx="24" cy="24" r="14" fill="#059669" />
      <path
        d="M24 14C24 14 17 19 17 26C17 29.866 20.134 33 24 33C27.866 33 31 29.866 31 26C31 19 24 14 24 14Z"
        fill="#34D399"
      />
      <path
        d="M24 17C24 17 20 22 20 26C20 28.2 21.8 30 24 30C26.2 30 28 28.2 28 26C28 22 24 17 24 17Z"
        fill="#FFFFFF"
      />
      <circle cx="24" cy="25" r="2.5" fill="#059669" />
    </svg>
  );
}

export function PmSuryaGharLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PM Surya Ghar National Portal Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#D97706" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#D97706" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Radiant Sun rising above solar rooftop */}
      <circle cx="24" cy="20" r="8" fill="#F59E0B" />
      {/* Rays */}
      <path d="M24 9V11M33 13L31.5 14.5M35 20H33M31.5 25.5L33 27M15 13L16.5 14.5M13 20H15M16.5 25.5L15 27" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pitched Roof with PV panels */}
      <path d="M12 28L24 20L36 28H12Z" fill="#1E3A8A" />
      <path d="M15 29L24 23L33 29V36H15V29Z" fill="#0284C7" />
      <line x1="24" y1="23" x2="24" y2="36" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="17" y1="30" x2="31" y2="30" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  );
}

export function BeeLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bureau of Energy Efficiency Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#15803D" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#15803D" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="14" fill="#15803D" />
      {/* 5-Pointed Star embracing seedling */}
      <path
        d="M24 14L26.5 20.5H33.5L28 24.5L30 31L24 27L18 31L20 24.5L14.5 20.5H21.5L24 14Z"
        fill="#FEF08A"
      />
      {/* Seedling core */}
      <path
        d="M24 21C22 23 21 26 24 28C27 26 26 23 24 21Z"
        fill="#15803D"
      />
      <circle cx="24" cy="25" r="1" fill="#FFFFFF" />
    </svg>
  );
}

export function McaLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ministry of Corporate Affairs Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#1E293B" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#C29F53" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="14" fill="#0F172A" />
      <circle cx="24" cy="24" r="12" stroke="#C29F53" strokeWidth="1" />
      {/* Ashoka Emblem / National Seal Pillar */}
      <path d="M21 16H27V28H21V16Z" fill="#C29F53" />
      <path d="M19 16H29V18H19V16Z" fill="#E2E8F0" />
      <circle cx="24" cy="22" r="2.5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="0.8" />
      <path d="M18 29H30V31H18V29Z" fill="#C29F53" />
      <rect x="16" y="32" width="16" height="1.5" rx="0.75" fill="#E2E8F0" />
    </svg>
  );
}

export function MercLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MERC Regulatory Commission Official Authority Mark"
    >
      <rect width="48" height="48" rx="10" fill="#7C2D12" fillOpacity="0.12" />
      <rect x="1" y="1" width="46" height="46" rx="9" stroke="#7C2D12" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="14" fill="#7C2D12" />
      {/* Legal regulatory scales */}
      <path d="M24 15V32M17 20H31M15 25L17 20L19 25ZM29 25L31 20L33 25Z" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="20" y="31" width="8" height="2" rx="1" fill="#FDE68A" />
    </svg>
  );
}

export default function AuthorityLogo({ id, size = 32, className = '' }: AuthorityLogoProps) {
  const normalizedId = String(id).toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalizedId.includes('best')) {
    return <BestLogo size={size} className={className} />;
  }
  if (normalizedId.includes('adani')) {
    return <AdaniLogo size={size} className={className} />;
  }
  if (normalizedId.includes('tata')) {
    return <TataPowerLogo size={size} className={className} />;
  }
  if (normalizedId.includes('msedcl') || normalizedId.includes('mahavitaran')) {
    return <MsedclLogo size={size} className={className} />;
  }
  if (normalizedId.includes('pwd') || normalizedId.includes('cei')) {
    return <PwdLogo size={size} className={className} />;
  }
  if (normalizedId.includes('mpcb') || normalizedId.includes('pollution')) {
    return <MpcbLogo size={size} className={className} />;
  }
  if (normalizedId.includes('surya') || normalizedId.includes('pmsurya') || normalizedId.includes('mnre')) {
    return <PmSuryaGharLogo size={size} className={className} />;
  }
  if (normalizedId.includes('bee') || normalizedId.includes('energyefficiency')) {
    return <BeeLogo size={size} className={className} />;
  }
  if (normalizedId.includes('mca') || normalizedId.includes('corporateaffairs')) {
    return <McaLogo size={size} className={className} />;
  }
  if (normalizedId.includes('merc')) {
    return <MercLogo size={size} className={className} />;
  }

  // Default fallback
  return <PwdLogo size={size} className={className} />;
}
