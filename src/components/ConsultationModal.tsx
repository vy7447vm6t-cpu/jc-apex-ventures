"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, Send, MessageSquare, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import Logo from './Logo';

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDivision?: string; // 'solis' | 'sanyog' | 'grid-apex' | 'tvasta' | 'emudran' | 'agrim'
}

interface DivisionOption {
  id: string;
  name: string;
  tag: string;
  email: string;
}

const DIVISIONS: DivisionOption[] = [
  { id: 'solis', name: 'Solis', tag: 'Solar & Walkable Pergolas', email: 'solis@jcapexv.com' },
  { id: 'sanyog', name: 'Sanyog', tag: 'Utility Liaison & CGRF', email: 'Consumercmpl@jcapexv.com' },
  { id: 'grid-apex', name: 'Grid Apex', tag: 'HT/LT Substations', email: 'admin@jcapexv.com' },
  { id: 'tvasta', name: 'Tvasta', tag: 'Turnkey Architectural Interiors', email: 'spacemgmt@jcapexv.com' },
  { id: 'emudran', name: 'eMudran', tag: 'Luxury Packaging & Press', email: 'printmgmt@jcapexv.com' },
  { id: 'agrim', name: 'Agrim', tag: 'Clean Tech & Project DPR', email: 'admin@jcapexv.com' },
];

const MUMBAI_ZONES = [
  'South Mumbai',
  'Western Suburbs',
  'Central Mumbai',
  'Navi Mumbai',
  'Thane',
  'MMR Industrial',
] as const;

export default function ConsultationModal({
  isOpen,
  onClose,
  initialDivision = 'solis',
}: ConsultationModalProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [selectedZone, setSelectedZone] = useState<string>(MUMBAI_ZONES[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scope, setScope] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Synchronize initialDivision prop on change
  useEffect(() => {
    if (initialDivision) {
      const match = DIVISIONS.find(
        (d) => d.id === initialDivision.toLowerCase() || d.name.toLowerCase() === initialDivision.toLowerCase()
      );
      if (match) setSelectedDivision(match.id);
    }
  }, [initialDivision]);

  // Handle ESC key listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setSubmitStatus('idle');
      setStatusMessage('');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const currentDiv = DIVISIONS.find((d) => d.id === selectedDivision) || DIVISIONS[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !email.trim() && !phone.trim() && !scope.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Please provide at least a contact phone or email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          to: currentDiv.email,
          subject: `Consultation Request: ${currentDiv.name} [${selectedZone}]`,
          body: `
JC Apex Ventures Direct Consultation Request:

Division: ${currentDiv.name} (${currentDiv.tag})
Target Email: ${currentDiv.email}
Mumbai Zone: ${selectedZone}
Client Name: ${name.trim() || 'Not specified'}
Client Email: ${email.trim() || 'Not specified'}
Client Phone: ${phone.trim() || 'Not specified'}

Scope of Work / Project Description:
${scope.trim() || 'Direct consultation requested via modal.'}
          `.trim(),
          details: {
            division: currentDiv.name,
            divisionEmail: currentDiv.email,
            zone: selectedZone,
            scopeOfWork: scope.trim(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send consultation request. Status: ' + response.status);
      }

      setSubmitStatus('success');
      setStatusMessage('Consultation dossier dispatched to ' + currentDiv.email + '. Our engineering desk will connect within 4 business hours.');
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Transmission error. Please use 1-tap WhatsApp consultation below for immediate engineering response.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello JC Apex Ventures,\n\nI would like to request an engineering consultation:\n` +
      `• Division: ${currentDiv.name} (${currentDiv.tag})\n` +
      `• Location: ${selectedZone}, Mumbai\n` +
      `• Name: ${name.trim() || 'Website Visitor'}\n` +
      `• Phone: ${phone.trim() || 'Not provided'}\n` +
      `• Scope: ${scope.trim() || 'Turnkey project evaluation'}`
    );
    return `https://wa.me/917021112664?text=${text}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="JC Apex Ventures Consultation Request"
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-scrollbar"
      style={{
        backgroundColor: 'rgba(10, 13, 16, 0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Modal Dialog Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[620px] rounded-3xl p-6 sm:p-8 overflow-hidden my-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(246, 244, 238, 0.92) 100%)',
          backdropFilter: 'blur(36px) saturate(210%)',
          WebkitBackdropFilter: 'blur(36px) saturate(210%)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 28px 64px -12px rgba(0, 0, 0, 0.38), inset 0 1.5px 1px 0 rgba(255, 255, 255, 1)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#111111] text-[#C29F53] shadow-sm">
              <Logo width={22} height={22} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  fontSize: '0.68rem',
                  fontWeight: 650,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#8C6D23',
                }}
                className="block"
              >
                [DIRECT DESK · ONE INTERNATIONAL CENTRE]
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif-display), 'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  fontSize: '1.65rem',
                  color: '#111111',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                Request Architectural Consultation
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close consultation modal"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-[#111111]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Division Selector Pills */}
        <div className="mt-5">
          <label
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#555555',
            }}
            className="block mb-2"
          >
            1. Select Discipline Division
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {DIVISIONS.map((d) => {
              const isSelected = selectedDivision === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDivision(d.id)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white shadow-sm border border-[#C29F53]/40'
                      : 'bg-white/80 text-[#555555] border border-black/8 hover:text-[#111111] hover:bg-white'
                  }`}
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  {d.name}
                </button>
              );
            })}
          </div>
          <div className="mt-1 text-[11px] text-[#777777] font-sans">
            Routes to: <span className="font-semibold text-[#111111]">{currentDiv.email}</span> ({currentDiv.tag})
          </div>
        </div>

        {/* Mumbai Zone Selector */}
        <div className="mt-4">
          <label
            style={{
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#555555',
            }}
            className="block mb-2"
          >
            2. Mumbai Project Location Zone
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {MUMBAI_ZONES.map((zone) => {
              const isSelected = selectedZone === zone;
              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`py-1.5 px-2.5 text-center rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C29F53]/20 text-[#111111] font-semibold border border-[#C29F53]/50'
                      : 'bg-white/60 text-[#666666] border border-black/6 hover:text-[#111111]'
                  }`}
                  style={{
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                  }}
                >
                  {zone}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleFormSubmit} className="mt-4 flex flex-col gap-3 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#555555] block mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white text-xs text-[#111111] focus:outline-none focus:border-[#C29F53]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#555555] block mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white text-xs text-[#111111] focus:outline-none focus:border-[#C29F53]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#555555] block mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white text-xs text-[#111111] focus:outline-none focus:border-[#C29F53]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#555555] block mb-1">
              Project Scope &amp; Brief
            </label>
            <textarea
              rows={3}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Detail rooftop dimensions, Sanctioned Load, packaging specifications, or space fit-out timeline..."
              className="w-full px-3 py-2 rounded-xl border border-black/10 bg-white text-xs text-[#111111] focus:outline-none focus:border-[#C29F53] resize-none"
            />
          </div>

          {/* Feedback Banner */}
          {submitStatus !== 'idle' && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                submitStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {submitStatus === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Dual Action Buttons */}
          <div className="mt-2 flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-black/8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#111111] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer shadow-md disabled:opacity-60"
            >
              <Send size={14} className={isSubmitting ? 'animate-spin' : ''} />
              <span>{isSubmitting ? 'Transmitting Dossier...' : 'Submit Official Dossier'}</span>
            </button>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#128C7E] text-xs font-semibold flex items-center justify-center gap-2 transition-all text-decoration-none"
            >
              <MessageSquare size={14} />
              <span>1-Tap WhatsApp Desk</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
