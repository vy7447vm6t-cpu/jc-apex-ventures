"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Caption under the comparison: what each image is, and whether it is a representative image or a design visual. */
  beforeCaption?: string;
  afterCaption?: string;
  beforeDescription?: string;
  afterDescription?: string;
  initialPosition?: number;
}

/**
 * Two images compared with a draggable divider (brand guidelines 2.8.2, reworked): handle only,
 * no overlay labels or custom cursor; captions and descriptions sit below the images.
 */
export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Panels on low frames',
  afterLabel = 'Panels on a walkable pergola',
  beforeCaption = 'Left: solar panels on low frames across a terrace. Representative image.',
  afterCaption = 'Right: solar pergola over a terrace lounge. Design visual.',
  beforeDescription = 'Panels on low frames cover the terrace floor, so residents can no longer use it.',
  afterDescription = 'A steel pergola lifts the panels overhead, so the terrace floor stays open for residents.',
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => updatePosition(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [isDragging, updatePosition]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const steps: Record<string, (prev: number) => number> = {
      ArrowLeft: (prev) => Math.max(0, prev - 2),
      ArrowRight: (prev) => Math.min(100, prev + 2),
      Home: () => 0,
      End: () => 100,
    };
    if (steps[e.key]) {
      e.preventDefault();
      setSliderPosition(steps[e.key]);
    }
  };

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={containerRef}
        onPointerDown={(e) => {
          setIsDragging(true);
          updatePosition(e.clientX);
        }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9.5',
          maxHeight: '560px',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#E8E4DA',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          cursor: 'ew-resize',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        <img src={afterImage} alt={afterLabel} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <img
          src={beforeImage}
          alt={beforeLabel}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${Math.round(sliderPosition)}% ${beforeLabel.toLowerCase()}`}
            aria-label={`Compare: ${beforeLabel} and ${afterLabel}`}
            onKeyDown={onKeyDown}
            className="focus-visible:outline-2 focus-visible:outline-[#C29F53] focus-visible:outline-offset-2"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'ew-resize',
              touchAction: 'none',
            }}
          >
            <ChevronsLeftRight size={18} color="#111111" aria-hidden="true" />
          </div>
        </div>
      </div>

      <figcaption className="photo-caption">
        {beforeCaption} {afterCaption}
      </figcaption>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '20px', marginTop: '24px' }}>
        {[
          { label: beforeLabel, text: beforeDescription },
          { label: afterLabel, text: afterDescription },
        ].map((side) => (
          <div key={side.label} className="flat-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 400, color: '#111111', margin: '0 0 8px', fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif' }}>
              {side.label}
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#4A4A46', lineHeight: 1.6, fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>{side.text}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
