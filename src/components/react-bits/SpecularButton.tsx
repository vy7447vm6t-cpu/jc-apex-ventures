"use client";

import React, { useRef } from 'react';
import Link from 'next/link';

interface SpecularButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'light' | 'dark' | 'gold' | 'glass';
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
    `specular-button is-${variant} relative isolate overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-full font-sans text-sm font-semibold transition-colors duration-150 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C29F53]`;

  // Flat buttons: Ink fill or outline. On hover a fill wipes in from the left and the arrow nudges
  // forward (globals.css, .specular-button).
  let variantStyles = '';
  if (variant === 'dark') {
    variantStyles = 'bg-[#111111] border border-[#111111] hover:bg-[#000000]';
  } else if (variant === 'gold') {
    variantStyles = 'bg-[#C29F53] border border-[#C29F53] hover:bg-[#B08D44]';
  } else if (variant === 'glass') {
    variantStyles = 'bg-transparent border border-white/40 hover:border-white';
  } else {
    variantStyles = 'bg-white border border-black/15 hover:border-[#111111]';
  }

  const textColor = variant === 'dark' || variant === 'glass' ? '#FFFFFF' : '#111111';

  const content = (
    <>
      <span
        className="relative z-10 flex items-center gap-2"
        style={{ color: textColor }}
      >
        <span className="inline-flex items-center gap-2" style={{ color: textColor }}>
          {children}
        </span>
        {icon && (
          <span
            className="specular-button-icon flex items-center"
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
