"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { OptionWheel, TargetCursor, TechText, SpecularButton } from '@/components/react-bits';

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

const SLIDER_PRESETS = [
  { label: '01 / Traditional Array', value: 92 },
  { label: '50 / 50 Split View', value: 50 },
  { label: '02 / Solis Walkable Pergola', value: 8, logoSrc: '/images/logos/solis-official.png' },
];

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Traditional Cluttered Roof',
  afterLabel = 'Solis Walkable Pergola Canopy',
  beforeBadge = 'Floor Obstructed',
  afterBadge = '100% Usable Terrace',
  beforeDescription = 'Standard low metal frames mount panels 0.5m above the waterproofed slab, blocking residents from walking, gatherings, or using terrace amenities.',
  afterDescription = 'Hot-dip galvanized structural portal frames lift solar modules 10.5 ft overhead, leaving the entire terrace deck open for walking, recreation, and society gatherings.',
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePreset =
    sliderPosition > 70 ? 92 : sliderPosition < 30 ? 8 : 50;

  const usableFloorPct = Math.round(100 - sliderPosition);
  const telemetryString = `[TERRACE USABILITY: ${usableFloorPct}% OPEN DECK · HEADROOM: ${
    sliderPosition <= 55 ? '10.5 FT (3.2M) ELEVATED CANOPY' : '0.5M LOW BALLAST OBSTRUCTION'
  } · WIND RATING: 150 KM/H]`;

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      if (e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    },
    [updatePosition]
  );

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
    <div style={{ width: '100%', maxWidth: '1160px', margin: '0 auto' }}>
      {/* Top OptionWheel Preset Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '18px',
        }}
      >
        <OptionWheel
          options={SLIDER_PRESETS}
          selectedValue={activePreset}
          onChange={(val) => setSliderPosition(Number(val))}
        />

        {/* Live Spatial Telemetry Readout Pill */}
        <div
          style={{
            padding: '8px 14px',
            borderRadius: '9999px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(194, 159, 83, 0.35)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
            fontFamily: 'var(--font-sans, Inter, sans-serif)',
            fontSize: '0.72rem',
            fontWeight: 650,
            letterSpacing: '0.04em',
            color: '#8C733E',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <TechText text={telemetryString} scrambleSpeed={14} maxScrambles={3} />
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
          fontFamily: 'var(--font-sans, Inter, sans-serif)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666666', fontWeight: 500 }}>
          <AlertCircle size={14} color="#888888" />
          <span>
            [01] {beforeLabel} ({beforeBadge})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#111111', fontWeight: 600 }}>
          <CheckCircle2 size={14} color="#C29F53" />
          <span>
            [02] {afterLabel} ({afterBadge})
          </span>
        </div>
      </div>

      {/* Main Interactive Comparison Viewport with TargetCursor */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9.5',
          maxHeight: '560px',
          minHeight: '300px',
          borderRadius: '22px',
          overflow: 'hidden',
          backgroundColor: '#FAF8F5',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 22px 52px rgba(0, 0, 0, 0.08)',
          cursor: isDragging ? 'grabbing' : 'ew-resize',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        <TargetCursor containerRef={containerRef} color="#C29F53" />

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
            backgroundColor: '#C29F53',
            boxShadow: '0 0 12px rgba(194, 159, 83, 0.65)',
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
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid #C29F53',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDragging ? 'grabbing' : 'ew-resize',
              transition: isDragging ? 'transform 0.1s ease' : 'transform 0.2s ease',
              scale: isDragging ? '1.08' : '1',
            }}
          >
            <ChevronsLeftRight size={18} color="#111111" />
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
              backgroundColor: 'rgba(17, 17, 17, 0.78)',
              backdropFilter: 'blur(12px)',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255, 255, 255, 0.14)',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '20px',
          marginTop: '24px',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderRadius: '18px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.72rem',
              fontWeight: 650,
              color: '#777777',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            [01 / CONVENTIONAL LOW-MOUNT ARRAY]
          </div>
          <h4
            style={{
              fontSize: '1.45rem',
              fontWeight: 400,
              color: '#111111',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
            }}
          >
            {beforeLabel}
          </h4>
          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '0.9rem',
              color: '#555555',
              lineHeight: 1.6,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
            }}
          >
            {beforeDescription}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#666666',
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontWeight: 500,
            }}
          >
            <div>• Usable Terrace Deck: 0% (Floor Obstructed)</div>
            <div>• Vertical Clearance: 0.5m Low Frames (Trip Hazard)</div>
            <div>• Resident Access: Restricted to Maintenance Only</div>
          </div>
        </div>

        <div
          style={{
            padding: '24px',
            borderRadius: '18px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(194, 159, 83, 0.35)',
            boxShadow: '0 8px 24px rgba(194, 159, 83, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 650,
                  color: '#8C733E',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                [02 / SOLIS ELEVATED ARCHITECTURE]
              </span>
              <img
                src="/images/logos/solis-official.png"
                alt="Solis Official Logo"
                style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <h4
              style={{
                fontSize: '1.45rem',
                fontWeight: 400,
                color: '#111111',
                margin: '0 0 8px 0',
                fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
              }}
            >
              {afterLabel}
            </h4>
            <p
              style={{
                margin: '0 0 16px 0',
                fontSize: '0.9rem',
                color: '#555555',
                lineHeight: 1.6,
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
              }}
            >
              {afterDescription}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.8rem',
                color: '#111111',
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontWeight: 600,
                marginBottom: '18px',
              }}
            >
              <div>• Usable Terrace Deck: 100% Retained Open Floor</div>
              <div>• Vertical Clearance: 3.2m (10.5 ft) Walkable Canopy</div>
              <div>• Wind Load Rating: 150 km/h Coastal Cyclone Certified</div>
            </div>
          </div>

          <SpecularButton
            href="/solis"
            variant="dark"
            icon={<ArrowUpRight size={14} />}
            className="w-full justify-between !py-2.5 !px-4 !text-[0.76rem]"
          >
            Inspect Solis Pergola Engineering
          </SpecularButton>
        </div>
      </div>
    </div>
  );
}
