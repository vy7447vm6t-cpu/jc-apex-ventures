"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
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

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    shortQ: 'Walkable Pergola',
    keywords: ['pergola', 'solar', 'terrace', 'walkable', 'abhilasha', 'kandivali', 'roof', 'rooftop', 'elevation'],
    q: 'How does the rooftop solar pergola preserve terrace space?',
    a: 'Solis elevates high-wattage bi-facial solar panels 10.5 ft overhead on hot-dip galvanized steel framing. This creates cool, shaded shelter while leaving 100% of the terrace footprint completely open for morning walks, children, and society gatherings (as engineered in our feasibility study and proposal framework for Abhilasha CHS, Kandivali).',
    actionHref: '/solis#calculator',
    actionLabel: 'Calculate Solar Sizing & Savings',
  },
  {
    shortQ: 'Office Location',
    keywords: ['office', 'location', 'address', 'directions', 'maps', 'where', 'headquarters', 'elphinstone', 'lower parel', 'mumbai', 'find'],
    q: 'Where is your corporate office located in Mumbai?',
    a: 'Our corporate headquarters is located at One International Centre, Tower 1, Units 801-802, Senapati Bapat Marg, Elphinstone, Lower Parel, Mumbai 400013. Visitors can easily reach us via Western or Central Railway lines.',
    actionHref:
      'https://www.google.com/maps/search/?api=1&query=One+International+Centre+Senapati+Bapat+Marg+Elphinstone+Mumbai+400013',
    actionLabel: 'Open Office in Google Maps',
    isExternal: true,
  },
  {
    shortQ: '3,900 EV Network',
    keywords: ['ev', 'charger', 'chargers', '3900', 'charging', 'maharashtra', 'network', 'roi', 'npv', 'capex', 'payback'],
    q: 'What is the 3,900 EV Charging Network project?',
    a: 'Agrim developed the ROI assessment framework for deploying 3,900 EV chargers in Maharashtra housing societies. Standard sites feature a 60 kW DC fast charger and dual AC chargers under a 100 kW sanctioned load with Rs 40L site CAPEX, 10-year NPV modeling, and a 6 to 7 year payback schedule.',
    actionHref: '/agrim',
    actionLabel: 'Review EV Network Project Dossier',
  },
  {
    shortQ: 'PM Surya Ghar Subsidy',
    keywords: ['subsidy', 'pm surya ghar', 'surya ghar', 'central subsidy', 'grant', 'discount', 'rebate', 'cost'],
    q: 'How much subsidy is available under PM Surya Ghar Muft Bijli Yojana?',
    a: 'Individual residential homes receive up to Rs 78,000 credited directly to their bank account post DISCOM meter commissioning. Housing societies receive Rs 18,000 per kW up to Rs 10.8 Lakhs for common meters, lifts, pumps, and EV charging.',
    actionHref: '/solis#calculator',
    actionLabel: 'Estimate Your Society Subsidy',
  },
  {
    shortQ: 'Bill Grievances',
    keywords: ['bill', 'dispute', 'grievance', 'cgrf', 'tariff', 'sanyog', 'jitendra', 'chavan', 'best', 'adani', 'tata', 'msedcl', 'electricity'],
    q: 'How does Sanyog resolve power bill disputes and load sanctions?',
    a: 'Led by Jitendra Chavan with 36 years of direct utility engineering experience, Sanyog resolves erroneous commercial tariffs, delayed net metering, and sanctioned load upgrades before CGRF, the Electricity Ombudsman, and Mumbai DISCOMs (BEST, Adani Electricity, Tata Power, MSEDCL).',
    actionHref: '/sanyog',
    actionLabel: 'Explore Sanyog Utility Services',
  },
  {
    shortQ: 'Patented Waste Tech',
    keywords: ['waste', 'solid waste', 'patented', 'zero power', 'magnetic', 'mpcb', 'decomposition', 'ash', 'green coal', 'manoj chavan', 'kabnurkar'],
    q: 'What is the patented zero-power solid waste machine?',
    a: 'Developed by Dr. Manoj Chavan and Mahendra Kabnurkar, our system holds a Central Government patent and Maharashtra Pollution Control Board (MPCB) certification. It operates at 350°C using magnetic thermal decomposition with zero external electricity or fuel after ignition, reducing waste by 96% into mineral ash for paver blocks.',
    actionHref: '/agrim',
    actionLabel: 'Review Clean Tech Patent Dossier',
  },
  {
    shortQ: 'Turnkey Interiors',
    keywords: ['tvasta', 'interior', 'fit-out', 'fitout', 'architecture', 'space planning', 'commercial', 'office interior', 'design'],
    q: 'What interior design and space planning tiers does Tvasta provide?',
    a: 'Tvasta executes turnkey commercial and residential spaces across three transparent tiers: Standard (durable essentials), Premium (curated modular finishes), and Luxury (bespoke architectural craftsmanship), backed by CAD space planning and zero contractor abandonment.',
    actionHref: '/tvasta',
    actionLabel: 'Explore Tvasta Fit-Out Tiers',
  },
  {
    shortQ: 'Branding & Packaging',
    keywords: ['emudran', 'packaging', 'print', 'printing', 'boxes', 'rigid', 'brochure', 'signage', 'manish ajgaonkar', 'hemangi patil'],
    q: 'What packaging and printing capabilities does eMudran offer?',
    a: 'Headed by Manish Ajgaonkar and Hemangi Patil (22+ years experience), eMudran produces custom rigid luxury boxes, thermal foil-stamped cartons, annual reports, corporate brochures, and architectural outdoor signage with precise CMYK press pass quality.',
    actionHref: '/emudran',
    actionLabel: 'Explore Packaging & Print Services',
  },
  {
    shortQ: 'Industrial Substations',
    keywords: ['grid apex', 'substation', 'transformer', 'switchgear', 'ht', 'lt', 'panel', 'pwd', 'inspectorate', 'power'],
    q: 'What electrical engineering services does Grid Apex deliver?',
    a: 'Grid Apex executes turnkey 33kV and 11kV electrical substations, industrial LT switchboards, busbar trunking, and capacitor banks with full PWD Electrical Inspectorate testing and compliance clearances.',
    actionHref: '/grid-apex',
    actionLabel: 'Explore Substation EPC',
  },
  {
    shortQ: 'Direct Consultation',
    keywords: ['contact', 'phone', 'whatsapp', 'call', 'talk', 'enquiry', 'consult', 'chat', 'timing', 'hours', 'speak'],
    q: 'How can I speak directly with an engineer?',
    a: 'You can call our engineering desk at +91 70211 12664 or message us directly on WhatsApp. Our office hours are Monday to Saturday, 9:30 AM to 6:30 PM IST at One International Centre, Mumbai.',
    actionHref: 'https://wa.me/917021112664?text=Hello%20JC%20Apex%2C%20I%20would%20like%20to%20consult%20an%20engineer',
    actionLabel: 'Chat on WhatsApp Now',
    isExternal: true,
  },
];

const divisionShortcuts = [
  { label: 'Solis Rooftop Solar & Pergola', href: '/solis', icon: Sun, desc: 'Calculate solar savings, pergola feasibility & subsidy' },
  { label: 'Sanyog Utility & CGRF Liaison', href: '/sanyog', icon: FileText, desc: 'Resolve power tariff disputes & sanctioned load changes' },
  { label: 'Grid Apex HT/LT & Waste Tech', href: '/grid-apex', icon: Wrench, desc: 'Heavy industrial power setups & patented zero-energy waste' },
  { label: 'Tvasta Turnkey Interior Fit-out', href: '/tvasta', icon: Palette, desc: 'Space planning, CAD drawings & 3-tier finishing' },
  { label: 'eMudran Branding & Packaging', href: '/emudran', icon: Sparkles, desc: 'Corporate brochures, box cartons & architectural signage' },
  { label: 'Agrim Project Economics & DPR', href: '/agrim', icon: Flame, desc: 'Non-lender financial models, CAPEX vs NPV & bank dossiers' },
];

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
        shortQ: 'Engineering Consultation',
        keywords: [],
        q: userQuery,
        a: 'Our engineering partners at One International Centre are ready to assist with your specific query. Connect with our desk directly on WhatsApp or phone for immediate review.',
        actionHref: `https://wa.me/917021112664?text=${encodeURIComponent('Hello JC Apex, regarding: ' + userQuery)}`,
        actionLabel: 'Ask Engineering Desk on WhatsApp',
        isExternal: true,
      });
    }
    setUserQuery('');
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
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
                  JC Apex Concierge
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#C29F53',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  [direct visitor desk]
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
              Interactive Q&amp;A
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
              Practice Divisions
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
                    fontFamily: 'var(--font-mono, monospace)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Frequent Questions:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {KNOWLEDGE_BASE.slice(0, 6).map((item) => {
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
                  placeholder="Ask e.g. office address, subsidy, EV..."
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
                  <span>Call Desk</span>
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
        aria-label="Toggle JC Apex assistant concierge"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Logo width={20} height={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            {isOpen ? 'Close Concierge' : 'Ask Concierge'}
          </span>
        </div>
        <span
          className="rounded-full animate-pulse bg-amber-400"
          style={{ width: '7px', height: '7px', display: 'inline-block' }}
        />
      </button>
    </div>
  );
}
