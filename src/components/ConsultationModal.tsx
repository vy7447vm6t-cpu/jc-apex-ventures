"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import SiteEnquiryForm from './SiteEnquiryForm';
import { divisions } from '@/content/divisions';
import { DIVISION_ONE_LINERS } from '@/content/messaging';

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDivision?: string; // 'grid-apex' | 'solis' | 'sanyog' | 'tvasta' | 'emudran' | 'agrim'
}

/**
 * The enquiry dialog opened from the home page: choose a division, then the same form as that
 * division's page, sent to its own inbox (src/content/divisions.ts). A flat Night overlay, no blur.
 * Escape or the close button shuts it and returns focus to the button that opened it.
 */
export default function ConsultationModal({ isOpen, onClose, initialDivision = 'solis' }: ConsultationModalProps) {
  const [chosen, setChosen] = useState(initialDivision);
  const [openedWith, setOpenedWith] = useState(initialDivision);
  const dialogRef = useRef<HTMLDivElement>(null);

  // A new division from the opener wins over the last one picked inside the dialog.
  if (openedWith !== initialDivision) {
    setOpenedWith(initialDivision);
    setChosen(initialDivision);
  }

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const division = divisions.find((d) => d.slug === chosen) ?? divisions[0];
  const form = division.enquiryForm ?? { to: division.contact.emails[0], subject: `${division.name} enquiry` };

  return (
    <div className="enquiry-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" tabIndex={-1}>
        <div className="enquiry-dialog-head">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2 id="enquiry-title">Which division is it for?</h2>
          </div>
          <button type="button" className="enquiry-close" onClick={onClose} aria-label="Close the enquiry form">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="enquiry-divisions" role="radiogroup" aria-label="Division">
          {divisions.map((d) => (
            <button
              key={d.slug}
              type="button"
              role="radio"
              aria-checked={d.slug === division.slug}
              className={d.slug === division.slug ? 'is-chosen' : undefined}
              onClick={() => setChosen(d.slug)}
            >
              <strong>{d.name}</strong>
              <span>{DIVISION_ONE_LINERS[d.slug]}</span>
            </button>
          ))}
        </div>

        <SiteEnquiryForm
          key={division.slug}
          to={form.to}
          cc={form.cc}
          subject={form.subject}
          askUtility={form.askUtility}
          submitLabel={form.submitLabel}
          needs={division.services.map(([line]) => line)}
        />
      </div>
    </div>
  );
}
