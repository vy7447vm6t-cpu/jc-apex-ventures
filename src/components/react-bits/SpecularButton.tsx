"use client";

import React, { useRef } from 'react';
import Link from 'next/link';

interface SpecularButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function SpecularButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'dark',
  icon,
  type = 'button',
  disabled = false,
}: SpecularButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer overflow-hidden group disabled:opacity-50 disabled:pointer-events-none select-none';

  let variantStyles = '';
  if (variant === 'dark') {
    variantStyles =
      'bg-[#111111] text-[#FFFFFF] border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-[#000000] hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1.5px_1.5px_rgba(255,255,255,0.6)]';
  } else if (variant === 'gold') {
    variantStyles =
      'bg-[#C29F53] text-[#111111] border border-white/30 shadow-[0_8px_24px_rgba(194,159,83,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:bg-[#D4AF37] hover:scale-[1.02]';
  } else {
    // light / liquid glass
    variantStyles =
      'bg-white/85 text-[#111111] border border-black/10 backdrop-blur-2xl shadow-[0_6px_20px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:bg-white hover:scale-[1.02] hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)]';
  }

  const textColor = variant === 'dark' ? '#FFFFFF' : '#111111';

  const content = (
    <>
      {/* Specular sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span
        className="relative z-10 flex items-center gap-2"
        style={{ color: textColor }}
      >
        <span style={{ color: textColor }}>{children}</span>
        {icon && (
          <span
            className="transition-transform duration-300 group-hover:translate-x-0.5 flex items-center"
            style={{ color: textColor }}
          >
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        style={{ color: textColor }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={{ color: textColor }}
    >
      {content}
    </button>
  );
}
