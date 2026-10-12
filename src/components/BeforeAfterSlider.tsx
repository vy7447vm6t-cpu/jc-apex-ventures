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
  height = "480px",
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
    <div style={{ width: '100%', maxWidth: '1080px', margin: '0 auto' }}>
      {/* iOS Liquid Glass Segmented Controls (1-Tap Mode Switcher) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div
          className="ios-glass"
          style={{
            display: 'inline-flex',
            padding: '5px',
            borderRadius: '100px',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
          }}
        >
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            style={{
              padding: '8px 18px',
              borderRadius: '100px',
              border: 'none',
              background: sliderPosition > 70 ? 'var(--color-text-primary)' : 'transparent',
              color: sliderPosition > 70 ? '#FFFFFF' : 'var(--color-text-secondary)',
              fontSize: '0.84rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-out-expo)',
            }}
          >
            {beforeLabel}
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            style={{
              padding: '8px 18px',
              borderRadius: '100px',
              border: 'none',
              background: sliderPosition >= 30 && sliderPosition <= 70 ? 'var(--color-accent)' : 'transparent',
              color: sliderPosition >= 30 && sliderPosition <= 70 ? '#FFFFFF' : 'var(--color-text-secondary)',
              fontSize: '0.84rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-out-expo)',
            }}
          >
            50/50 Split View
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            style={{
              padding: '8px 18px',
              borderRadius: '100px',
              border: 'none',
              background: sliderPosition < 30 ? 'var(--color-text-primary)' : 'transparent',
              color: sliderPosition < 30 ? '#FFFFFF' : 'var(--color-text-secondary)',
              fontSize: '0.84rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-out-expo)',
            }}
          >
            {afterLabel}
          </button>
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
          height,
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          cursor: isDragging ? 'grabbing' : 'ew-resize',
          userSelect: 'none',
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
          {/* Floating After Badge */}
          <div style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <span
              className="ios-glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--color-accent)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid rgba(194, 159, 83, 0.4)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              <CheckCircle2 size={14} color="var(--color-accent)" />
              {afterBadge}
            </span>
          </div>
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
          {/* Floating Before Badge */}
          <div style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <span
              className="ios-glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#C94A29',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid rgba(201, 74, 41, 0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              <AlertCircle size={14} color="#C94A29" />
              {beforeBadge}
            </span>
          </div>
        </div>

        {/* Layer 3: Draggable Divider Line & iOS Liquid Glass Thumb */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            transform: 'translateX(-50%)',
            background: '#FFFFFF',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.4)',
            zIndex: 10,
          }}
        >
          {/* iOS Liquid Glass Drag Pill Handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 8px 28px rgba(20, 23, 26, 0.28), inset 0 1px 1px rgba(255, 255, 255, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'ew-resize',
              transition: isDragging ? 'scale 0.1s ease' : 'scale 0.25s ease',
              scale: isDragging ? '1.1' : '1',
            }}
          >
            <ChevronsLeftRight size={20} color="var(--color-text-primary)" />
          </div>
        </div>

        {/* Ambient bottom hint caption */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 8,
          pointerEvents: 'none',
        }}>
          <span style={{
            background: 'rgba(20, 23, 26, 0.78)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            fontSize: '0.74rem',
            padding: '5px 14px',
            borderRadius: '100px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}>
            Drag divider left or right to compare terrace usability
          </span>
        </div>
      </div>

      {/* Contextual Technical Comparison Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginTop: '24px',
      }}>
        <div style={{
          padding: '20px 24px',
          borderRadius: '18px',
          background: 'rgba(201, 74, 41, 0.04)',
          border: '1px solid rgba(201, 74, 41, 0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#C94A29', fontWeight: 700, fontSize: '0.88rem' }}>
            <AlertCircle size={16} />
            <span>{beforeLabel}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {beforeDescription}
          </p>
        </div>

        <div style={{
          padding: '20px 24px',
          borderRadius: '18px',
          background: 'var(--color-accent-pale)',
          border: '1px solid var(--color-border-accent-light)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.88rem' }}>
            <CheckCircle2 size={16} />
            <span>{afterLabel}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {afterDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
