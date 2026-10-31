'use client';

import React, { useId, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

const UTILITIES = ['BEST', 'Adani Electricity', 'Tata Power', 'MSEDCL', 'Not sure'];

interface SiteEnquiryFormProps {
  to: string;
  cc: string;
  subject: string;
  /** What the client can ask for: the division's lines of work. */
  needs: string[];
  /** Summary from the estimator, once the client chooses to use it. */
  estimate?: string;
  onClearEstimate?: () => void;
}

/**
 * Enquiry form for a site visit. It opens the client's email app with the message written out and
 * sends a copy to /api/contact, so nothing is lost if the email app does not open.
 */
export default function SiteEnquiryForm({ to, cc, subject, needs, estimate, onClearEstimate }: SiteEnquiryFormProps) {
  const id = useId();
  const [fields, setFields] = useState({ name: '', phone: '', email: '', site: '', area: '', utility: '', notes: '' });
  const [chosen, setChosen] = useState<string[]>([]);
  // The estimate the form was last sent with; null until it is sent. A new estimate means a new message.
  const [sentWith, setSentWith] = useState<string | undefined | null>(null);
  const sent = sentWith !== null && sentWith === estimate;

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const toggle = (need: string) => setChosen((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${fields.name}`,
      `Phone or WhatsApp: ${fields.phone}`,
      `Email: ${fields.email || 'Not given'}`,
      `Building or society: ${fields.site || 'Not given'}`,
      `Area: ${fields.area || 'Not given'}`,
      `Utility: ${fields.utility || 'Not given'}`,
      `Interested in: ${chosen.join(', ') || 'Not given'}`,
      ...(estimate ? ['', 'Illustrative estimate from the website:', estimate] : []),
      ...(fields.notes ? ['', fields.notes] : []),
      '',
      'Sent from jcapexv.com',
    ];
    const body = lines.join('\n');
    const fullSubject = `${subject}: ${fields.site || fields.name}`;

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, cc, subject: fullSubject, body, name: fields.name, email: fields.email, phone: fields.phone }),
    }).catch(() => {
      // The email app still opens with the full message.
    });

    setSentWith(estimate);
    window.location.href = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="site-form" onSubmit={handleSubmit}>
      <div className="site-form-grid">
        <label htmlFor={`${id}-name`}>
          Name
          <input id={`${id}-name`} required autoComplete="name" value={fields.name} onChange={set('name')} />
        </label>
        <label htmlFor={`${id}-phone`}>
          Phone or WhatsApp
          <input id={`${id}-phone`} type="tel" required autoComplete="tel" value={fields.phone} onChange={set('phone')} />
        </label>
        <label htmlFor={`${id}-email`}>
          <span>
            Email <span className="site-form-optional">optional</span>
          </span>
          <input id={`${id}-email`} type="email" autoComplete="email" value={fields.email} onChange={set('email')} />
        </label>
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
        <label htmlFor={`${id}-site`}>
          Building or society
          <input id={`${id}-site`} value={fields.site} onChange={set('site')} />
        </label>
        <label htmlFor={`${id}-area`}>
          Area
          <input id={`${id}-area`} placeholder="For example, Kandivali West" value={fields.area} onChange={set('area')} />
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
        <textarea id={`${id}-notes`} rows={3} value={fields.notes} onChange={set('notes')} />
      </label>

      <button type="submit" className="site-form-submit">
        Request a site survey <ArrowRight size={16} aria-hidden="true" />
      </button>
      <p className="site-form-status" role="status">
        {sent
          ? `Your email app should now open with the message written out. If it does not, write to ${to} or call +91 70211 12664.`
          : 'This opens your email app with the message written out, ready to send.'}
      </p>
    </form>
  );
}
