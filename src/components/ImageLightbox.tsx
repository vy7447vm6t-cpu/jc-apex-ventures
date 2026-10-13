"use client";

import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ShieldCheck, Layers } from 'lucide-react';

export interface LightboxImageProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  category?: string;
  specs?: string[];
  scope?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ImageWithLightbox({
  src,
  alt,
  title,
  caption,
  category,
  specs = [],
  scope,
  className = '',
  style = {},
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`relative group cursor-zoom-in overflow-hidden ${className}`}
        style={{ ...style }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="group-hover:scale-105"
        />
        {/* Subtle hover overlay hint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10, 13, 16, 0.4)',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}
          className="group-hover:opacity-100"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#FFFFFF',
              background: 'rgba(17, 21, 26, 0.85)',
              border: '1px solid rgba(194, 159, 83, 0.4)',
            }}
          >
            <ZoomIn size={14} color="var(--color-accent)" /> Click to Inspect
          </span>
        </div>
      </div>

      {/* Modal Viewport */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10, 13, 16, 0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="ios-glass lightbox-grid"
            style={{
              position: 'relative',
              maxWidth: '1080px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(17, 21, 26, 0.96)',
              border: '1px solid rgba(194, 159, 83, 0.35)',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.8)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Image View */}
            <div style={{ position: 'relative', minHeight: '440px', background: '#000000' }}>
              <img
                src={src}
                alt={alt}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Right Information Panel */}
            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  {category && (
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                      }}
                    >
                      {category}
                    </span>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: '#FFFFFF',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    lineHeight: 1.2,
                  }}
                >
                  {title || alt}
                </h3>

                {caption && (
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      lineHeight: 1.65,
                      color: 'var(--color-text-secondary)',
                      marginBottom: '16px',
                    }}
                  >
                    {caption}
                  </p>
                )}

                {scope && (
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      lineHeight: 1.65,
                      color: 'var(--color-text-secondary)',
                      marginBottom: '24px',
                    }}
                  >
                    {scope}
                  </p>
                )}

                {specs && specs.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Layers size={14} /> Material & Technical Specifications
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {specs.map((spec, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.86rem',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                          }}
                        >
                          <ShieldCheck size={14} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                  JC Apex Ventures • Authentic Verified Reference Project
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 800px) {
          .lightbox-grid {
            grid-template-columns: 1fr !important;
            max-height: 90vh;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </>
  );
}

export default ImageWithLightbox;
