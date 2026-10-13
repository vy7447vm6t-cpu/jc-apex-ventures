"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeBadge?: string;
  afterBadge?: string;
  beforeDescription?: string;
  afterDescription?: string;
  initialPosition?: number;
  height?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Traditional Cluttered Roof",
  afterLabel = "Solis Walkable Pergola Canopy",
  beforeBadge = "Floor Obstructed",
  afterBadge = "100% Usable Terrace",
  beforeDescription = "Standard low metal frames mount panels directly on the floor, blocking residents from walking, gatherings, or using terrace amenities.",
  afterDescription = "Custom elevated pergola frames lift solar panels 8 to 10 feet overhead, leaving the entire roof floor open for walking, morning yoga, and society events.",
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  }, [updatePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div style={{ width: '100%', maxWidth: '1120px', margin: '0 auto' }}>
      {/* Top Segmented Controller */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div
          style={{
            display: 'inline-flex',
            padding: '4px',
            borderRadius: '9999px',
            gap: '4px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: sliderPosition > 70 ? '#111111' : 'transparent',
              color: sliderPosition > 70 ? '#FFFFFF' : '#666666',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            [01 / Traditional Array]
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: sliderPosition >= 30 && sliderPosition <= 70 ? '#111111' : 'transparent',
              color: sliderPosition >= 30 && sliderPosition <= 70 ? '#FFFFFF' : '#666666',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            [50 / 50 Comparison]
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: sliderPosition < 30 ? '#111111' : 'transparent',
              color: sliderPosition < 30 ? '#FFFFFF' : '#666666',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            [02 / Solis Pergola]
          </button>
        </div>
      </div>

      {/* Side-by-side indicator bar above viewport */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          padding: '0 8px',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono, monospace)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666666' }}>
          <AlertCircle size={14} color="#888888" />
          <span>[01] {beforeLabel} ({beforeBadge})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#111111', fontWeight: 600 }}>
          <CheckCircle2 size={14} color="#C29F53" />
          <span>[02] {afterLabel} ({afterBadge})</span>
        </div>
      </div>

      {/* Main Interactive Comparison Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          maxHeight: '560px',
          minHeight: '300px',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#FAF8F5',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.06)',
          cursor: isDragging ? 'grabbing' : 'ew-resize',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        {/* Layer 1: After Image (Full width background: Solis Walkable Pergola) */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <img
            src={afterImage}
            alt={afterLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            draggable={false}
          />
        </div>

        {/* Layer 2: Before Image (Clipped overlay: Traditional Cluttered Roof) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            pointerEvents: 'none',
          }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            draggable={false}
          />
        </div>

        {/* Layer 3: Minimalist Divider Line & Architectural Thumb */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
            zIndex: 10,
          }}
        >
          {/* Architectural Drag Pill Handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'ew-resize',
              transition: isDragging ? 'transform 0.1s ease' : 'transform 0.2s ease',
              scale: isDragging ? '1.06' : '1',
            }}
          >
            <ChevronsLeftRight size={17} color="#111111" />
          </div>
        </div>

        {/* Ambient bottom caption */}
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(17, 17, 17, 0.72)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Drag divider left or right to compare terrace usability
          </span>
        </div>
      </div>

      {/* Side-by-Side Architectural Engineering Ledger */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            padding: '22px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.72rem',
              color: '#888888',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            [01 / traditional approach]
          </div>
          <h4
            style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: '#111111',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            {beforeLabel}
          </h4>
          <p
            style={{
              margin: '0 0 14px 0',
              fontSize: '0.9rem',
              color: '#666666',
              lineHeight: 1.6,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            {beforeDescription}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#777777', fontFamily: 'var(--font-mono, monospace)' }}>
            <div>• Usable Floor: 0% (Floor Obstructed)</div>
            <div>• Clearance: 0.5m Low Frames (Trip Hazard)</div>
            <div>• Society Recreation: None Permitted</div>
          </div>
        </div>

        <div
          style={{
            padding: '22px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.72rem',
              color: '#C29F53',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            [02 / solis architecture]
          </div>
          <h4
            style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: '#111111',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            {afterLabel}
          </h4>
          <p
            style={{
              margin: '0 0 14px 0',
              fontSize: '0.9rem',
              color: '#666666',
              lineHeight: 1.6,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            {afterDescription}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#111111', fontFamily: 'var(--font-mono, monospace)', fontWeight: 500 }}>
            <div>• Usable Floor: 100% Retained Open Ground</div>
            <div>• Clearance: 3.2m (10.5 ft) Elevated Canopy</div>
            <div>• Society Recreation: Morning Walks, Yoga & Events</div>
          </div>
        </div>
      </div>
    </div>
  );
}
