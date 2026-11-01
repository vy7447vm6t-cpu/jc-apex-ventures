"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { divisions } from '@/content/divisions';
import { DIVISION_ONE_LINERS, PROOF_LINE } from '@/content/messaging';

const OFFICE_ADDRESS = 'Units 801–802, 8th Floor, Tower 1, One International Centre, Senapati Bapat Marg, Elphinstone, Mumbai 400013';
import {
  X,
  ArrowUpRight,
  Phone,
  MessageSquare,
  Sun,
  FileText,
  Wrench,
  Palette,
  Sparkles,
  MapPin,
  Send,
  HelpCircle,
  Layers,
  Flame,
  Zap,
} from 'lucide-react';

interface KnowledgeItem {
  q: string;
  shortQ: string;
  keywords: string[];
  a: string;
  actionHref: string;
  actionLabel: string;
  isExternal?: boolean;
}

// Company questions first, then every division's FAQ from src/content/divisions.ts, so the answers
// here are the same words as the division pages and the PDF profiles. Nothing else is said.
const COMPANY_QA: KnowledgeItem[] = [
  {
    shortQ: 'Office address',
    keywords: ['office', 'address', 'where', 'location', 'visit', 'elphinstone', 'lower', 'parel', 'tower'],
    q: 'Where is your office?',
    a: `${OFFICE_ADDRESS}. Phone or WhatsApp +91 70211 12664.`,
    actionHref: 'https://maps.google.com/?q=One+International+Centre+Tower+1+Elphinstone+Mumbai',
    actionLabel: 'Open in Maps',
    isExternal: true,
  },
  {
    shortQ: 'Who leads the work',
    keywords: ['director', 'who', 'lead', 'leads', 'jitendra', 'chavan', 'experience', 'years', 'best'],
    q: 'Who leads the work?',
    a: `${PROOF_LINE} Each division is run by people who do that work every day.`,
    actionHref: '/studio',
    actionLabel: 'Meet the team',
  },
  {
    shortQ: 'Which inbox',
    keywords: ['email', 'inbox', 'mail', 'contact', 'enquiry', 'send'],
    q: 'Which email address should I write to?',
    a: divisions.map((d) => `${d.name}: ${d.contact.emails.join(' or ')}`).join('. ') + '. Anything else goes to admin@jcapexv.com.',
    actionHref: 'mailto:admin@jcapexv.com',
    actionLabel: 'Email admin@jcapexv.com',
    isExternal: true,
  },
];

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  ...COMPANY_QA,
  ...divisions.flatMap((d) =>
    d.faq.map((f) => ({
      shortQ: f.q,
      keywords: [d.name, d.slug, ...f.q.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3)],
      q: f.q,
      a: f.a,
      actionHref: d.href,
      actionLabel: `More on ${d.name}`,
    })),
  ),
];

// The quick questions shown first: one per kind of enquiry we get most.
const QUICK = ['Office address', 'Can we still use the terrace after the panels go up?', 'My bill looks wrong. What can you do?', 'Which tier is right for us?', 'Does Agrim lend money?', 'Who leads the work'];

const DIVISION_ICONS: Record<string, typeof Sun> = { 'grid-apex': Wrench, solis: Sun, sanyog: FileText, tvasta: Palette, emudran: Sparkles, agrim: Flame };

const divisionShortcuts = divisions.map((d) => ({
  label: d.name,
  href: d.href,
  icon: DIVISION_ICONS[d.slug] ?? Layers,
  desc: DIVISION_ONE_LINERS[d.slug] ?? d.description,
}));

function scoreMatch(query: string, item: KnowledgeItem): number {
  const stopWords = new Set(['what', 'is', 'the', 'a', 'an', 'in', 'to', 'for', 'of', 'and', 'how', 'does', 'can', 'i', 'you', 'your', 'we', 'our', 'are', 'tell', 'me', 'about']);
  const tokens = query.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 1 && !stopWords.has(t));
  if (tokens.length === 0) return 0;

  let score = 0;
  for (const token of tokens) {
    if (item.keywords.some(k => k.toLowerCase() === token)) score += 6;
    else if (item.keywords.some(k => k.toLowerCase().includes(token))) score += 4;

    if (item.shortQ.toLowerCase().includes(token)) score += 5;
    if (item.q.toLowerCase().includes(token)) score += 3;
    if (item.a.toLowerCase().includes(token)) score += 1;
  }
  return score;
}

export default function Clippy() {
  const [isOpen, setIsOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'divisions'>('chat');
  const [selectedQA, setSelectedQA] = useState<KnowledgeItem | null>(KNOWLEDGE_BASE[0]);
  const [userQuery, setUserQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    let bestItem: KnowledgeItem | null = null;
    let bestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      const score = scoreMatch(userQuery, item);
      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }

    if (bestItem && bestScore >= 3) {
      setSelectedQA(bestItem);
    } else {
      setSelectedQA({
        shortQ: 'Your question',
        keywords: [],
        q: userQuery,
        a: 'That is not one of the questions answered here. Send it to us on WhatsApp and we reply with the person who handles it.',
        actionHref: `https://wa.me/917021112664?text=${encodeURIComponent('Hello JC Apex, regarding: ' + userQuery)}`,
        actionLabel: 'Ask on WhatsApp',
        isExternal: true,
      });
    }
    setUserQuery('');
  };

  return (
    <div
      className="clippy-dock fixed bottom-6 right-6 z-50"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Concierge Interactive Dialog */}
      {isOpen && (
        <div
          style={{
            width: '410px',
            maxWidth: 'calc(100vw - 32px)',
            borderRadius: '24px',
            background: '#FAF8F5',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.22), 0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '22px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '84vh',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '14px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Logo width={22} height={22} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display), "Instrument Serif", Georgia, serif',
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    color: '#111111',
                    display: 'block',
                    lineHeight: 1.1,
                  }}
                >
                  Ask JC Apex
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#C29F53',
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  Answers from our division profiles
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(prev => !prev)}
              style={{
                background: '#F0ECE1',
                border: 'none',
                color: '#111111',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Close assistant"
            >
              <X size={15} />
            </button>
          </div>

          {/* Mode Switcher */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              backgroundColor: '#EDE8DF',
              padding: '3px',
              borderRadius: '100px',
              marginBottom: '14px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              style={{
                flex: 1,
                padding: '6px 12px',
                borderRadius: '100px',
                border: 'none',
                backgroundColor: activeTab === 'chat' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'chat' ? '#111111' : '#666666',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Questions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('divisions')}
              style={{
                flex: 1,
                padding: '6px 12px',
                borderRadius: '100px',
                border: 'none',
                backgroundColor: activeTab === 'divisions' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'divisions' ? '#111111' : '#666666',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Divisions
            </button>
          </div>

          {/* Tab 1: Interactive Chat Concierge */}
          {activeTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1 }}>
              {/* Quick Prompt Pills */}
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#777777',
                    fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    fontVariantNumeric: 'tabular-nums',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Common questions
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {QUICK.map((key) => KNOWLEDGE_BASE.find((k) => k.shortQ === key)).filter((item): item is KnowledgeItem => Boolean(item)).map((item) => {
                    const isSel = selectedQA?.shortQ === item.shortQ;
                    return (
                      <button
                        key={item.shortQ}
                        type="button"
                        onClick={() => setSelectedQA(item)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '100px',
                          border: isSel ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                          backgroundColor: isSel ? '#111111' : '#FFFFFF',
                          color: isSel ? '#FFFFFF' : '#444444',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {item.shortQ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Answer Card */}
              {selectedQA && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>
                    {selectedQA.q}
                  </div>
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: '#444444',
                      lineHeight: 1.55,
                      margin: 0,
                      fontFamily: 'var(--font-sans, Inter, sans-serif)',
                    }}
                  >
                    {selectedQA.a}
                  </p>

                  <div style={{ marginTop: '12px' }}>
                    {selectedQA.isExternal ? (
                      <a
                        href={selectedQA.actionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#111111',
                          color: '#FFFFFF',
                          padding: '7px 14px',
                          borderRadius: '100px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <span>{selectedQA.actionLabel}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <Link
                        href={selectedQA.actionHref}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#111111',
                          color: '#FFFFFF',
                          padding: '7px 14px',
                          borderRadius: '100px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <span>{selectedQA.actionLabel}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Chat Input Field */}
              <form onSubmit={handleQuerySubmit} style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  aria-label="Your question"
                  placeholder="For example: net metering, CGRF, proofs"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.82rem',
                    color: '#111111',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Send question"
                >
                  <Send size={15} />
                </button>
              </form>

              {/* Direct Communication Bar */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <a
                  href="https://wa.me/917021112664?text=Hello%20JC%20Apex%2C%20I%20would%20like%20to%20consult%20an%20engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: '#E8F5E9',
                    color: '#2E7D32',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp (+91 70211 12664)</span>
                </a>
                <a
                  href="tel:+917021112664"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#F0ECE1',
                    color: '#111111',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={13} />
                  <span>Call us</span>
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: Practice Divisions Routing Shortcuts */}
          {activeTab === 'divisions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1 }}>
              {divisionShortcuts.map((d) => {
                const IconComponent = d.icon;
                return (
                  <Link
                    key={d.label}
                    href={d.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '14px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      textDecoration: 'none',
                      color: '#111111',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#FAF8F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={16} color="#C29F53" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.2 }}>
                        {d.label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: '#777777',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginTop: '2px',
                        }}
                      >
                        {d.desc}
                      </div>
                    </div>
                    <ArrowUpRight size={14} color="#888888" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 18px',
          borderRadius: '9999px',
          backgroundColor: '#111111',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-label={isOpen ? 'Close questions' : 'Ask JC Apex a question'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Logo width={20} height={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            {isOpen ? 'Close' : 'Ask a question'}
          </span>
        </div>
      </button>
    </div>
  );
}
