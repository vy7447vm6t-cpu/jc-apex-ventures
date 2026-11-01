'use client';

import React, { useId, useState } from 'react';
import { ArrowRight, Mail, MessageCircle, X } from 'lucide-react';

const UTILITIES = ['BEST', 'Adani Electricity', 'Tata Power', 'MSEDCL', 'Not sure'];
const PHONE = '+91 70211 12664';
const WHATSAPP = '917021112664';

interface SiteEnquiryFormProps {
  /** One of our own inboxes; /api/contact refuses any other. */
  to: string;
  cc?: string;
  subject: string;
  /** What the client can ask for: the division's lines of work. */
  needs: string[];
  /** Ask which utility supplies the site (power and solar enquiries). */
  askUtility?: boolean;
  submitLabel?: string;
  /** Summary from the estimator, once the client chooses to use it. */
  estimate?: string;
  onClearEstimate?: () => void;
}

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/**
 * Enquiry form. It sends through /api/contact and says "sent" only when the server has sent it.
 * If sending fails (or email is not set up yet), it offers the same message by email or WhatsApp,
 * already written out, so the visitor never has to type it twice and nothing is sent twice.
 */
export default function SiteEnquiryForm({
  to,
  cc,
  subject,
  needs,
  askUtility = false,
  submitLabel = 'Send enquiry',
  estimate,
  onClearEstimate,
}: SiteEnquiryFormProps) {
  const id = useId();
  const [fields, setFields] = useState({ name: '', phone: '', email: '', site: '', area: '', utility: '', notes: '', website: '' });
  const [chosen, setChosen] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  // The estimate the message was built with; a new estimate means a new message.
  const [statusFor, setStatusFor] = useState<string | undefined>(estimate);
  const current: Status = statusFor === estimate ? status : 'idle';

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const toggle = (need: string) => setChosen((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));

  const message = () => {
    const lines = [
      `Name: ${fields.name}`,
      `Phone or WhatsApp: ${fields.phone}`,
      `Email: ${fields.email || 'Not given'}`,
      `Building, society or company: ${fields.site || 'Not given'}`,
      `Area: ${fields.area || 'Not given'}`,
      ...(askUtility ? [`Utility: ${fields.utility || 'Not given'}`] : []),
      `Interested in: ${chosen.join(', ') || 'Not given'}`,
      ...(estimate ? ['', 'Illustrative estimate from the website:', estimate] : []),
      ...(fields.notes ? ['', fields.notes] : []),
      '',
      'Sent from jcapexv.com',
    ];
    return { subject: `${subject}: ${fields.site || fields.name}`, body: lines.join('\n') };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { subject: fullSubject, body } = message();
    setStatusFor(estimate);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, cc, subject: fullSubject, body, name: fields.name, email: fields.email, phone: fields.phone, website: fields.website }),
      });
      setStatus(res.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  const { subject: fullSubject, body } = message();
  const mailto = `mailto:${to}?${cc ? `cc=${cc}&` : ''}subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`${fullSubject}\n\n${body}`)}`;

  return (
    <form className="site-form" onSubmit={handleSubmit}>
      <div className="site-form-grid">
        <label htmlFor={`${id}-name`}>
          Name
          <input id={`${id}-name`} required maxLength={120} autoComplete="name" value={fields.name} onChange={set('name')} />
        </label>
        <label htmlFor={`${id}-phone`}>
          Phone or WhatsApp
          <input id={`${id}-phone`} type="tel" required maxLength={40} autoComplete="tel" value={fields.phone} onChange={set('phone')} />
        </label>
        <label htmlFor={`${id}-email`}>
          <span>
            Email <span className="site-form-optional">optional</span>
          </span>
          <input id={`${id}-email`} type="email" maxLength={160} autoComplete="email" value={fields.email} onChange={set('email')} />
        </label>
        {askUtility && (
          <label htmlFor={`${id}-utility`}>
            Utility
            <select id={`${id}-utility`} value={fields.utility} onChange={set('utility')}>
              <option value="">Choose one</option>
              {UTILITIES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
        )}
        <label htmlFor={`${id}-site`}>
          Building, society or company
          <input id={`${id}-site`} maxLength={160} value={fields.site} onChange={set('site')} />
        </label>
        <label htmlFor={`${id}-area`}>
          Area
          <input id={`${id}-area`} maxLength={120} placeholder="For example, Kandivali West" value={fields.area} onChange={set('area')} />
        </label>
      </div>

      {/* Left empty by people; bots that fill every field are dropped by /api/contact. */}
      <div className="site-form-trap" aria-hidden="true">
        <label htmlFor={`${id}-website`}>
          Website
          <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
        </label>
      </div>

      <fieldset className="site-form-needs">
        <legend>What do you need?</legend>
        {needs.map((need) => (
          <label key={need} className={chosen.includes(need) ? 'is-chosen' : undefined}>
            <input type="checkbox" checked={chosen.includes(need)} onChange={() => toggle(need)} />
            {need}
          </label>
        ))}
      </fieldset>

      {estimate && (
        <div className="site-form-estimate">
          <div>
            <p className="site-form-estimate-title">Your illustrative estimate</p>
            <p>{estimate}</p>
          </div>
          {onClearEstimate && (
            <button type="button" onClick={onClearEstimate} aria-label="Remove the estimate from this enquiry">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <label htmlFor={`${id}-notes`} className="site-form-notes">
        <span>
          Anything else <span className="site-form-optional">optional</span>
        </span>
        <textarea id={`${id}-notes`} rows={3} maxLength={4000} value={fields.notes} onChange={set('notes')} />
      </label>

      <button type="submit" className="site-form-submit" disabled={current === 'sending'}>
        {current === 'sending' ? 'Sending' : submitLabel} <ArrowRight size={16} aria-hidden="true" />
      </button>

      <div className="site-form-status" role="status">
        {current === 'sent' && <p>Sent to {to}. We reply with the next steps and the person who will handle them.</p>}
        {current === 'failed' && (
          <>
            <p>We could not send this from the website just now. Send the same message yourself, already written out:</p>
            <p className="site-form-fallback">
              <a href={mailto} className="contact-link">
                <Mail size={14} aria-hidden="true" />
                Email it
              </a>
              <a href={whatsapp} className="contact-link" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={14} aria-hidden="true" />
                WhatsApp it
              </a>
              <span>or call {PHONE}</span>
            </p>
          </>
        )}
        {(current === 'idle' || current === 'sending') && <p>Your enquiry goes straight to {to}.</p>}
      </div>
    </form>
  );
}
