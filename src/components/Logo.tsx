import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className = '', width = 100, height = 100 }: LogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gold Dot on Top */}
      <circle cx="50" cy="18" r="7" fill="#D4AF37" />
      
      {/* Umbrella Canopy - using currentColor so it adapts to dark/light theme */}
      <path 
        d="M20 50 Q 50 20 80 50" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
        fill="none" 
      />
      
      {/* Handle (J shape) */}
      <path 
        d="M50 45 L 50 80 Q 50 92 40 92 Q 35 92 35 88" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none" 
      />
    </svg>
  );
}
