// Shared building blocks for the division profiles (A4 PDF).
// Rules: Antigravity/JC_Apex_Brand/JC_Apex_Brand_Guidelines.md, sections 2.8, 2.9 and 3.2.

import fs from 'node:fs';
import path from 'node:path';

export const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const COMPANY = {
  legalName: 'JC Apex Ventures (OPC) Pvt. Ltd.',
  cin: 'U70200MH2023OPC411326',
  address:
    'Unit 801–802, 8th Floor, Tower 1, One International Centre, Senapati Bapat Marg, Elphinstone, Mumbai 400013',
  phone: '+91 70211 12664',
  director: 'Jitendra Chavan, Director',
  web: 'www.jcapexv.com',
};

// Messaging framework (JC Apex Ventures/01 Brand/2026-10-30_Messaging_Framework.md), word for word.
// Mention budget per document (section 9): core line at most 3 times (cover, opening page, closing
// call to action); the proof line, and so the Director's full name and "36+ years", once.
export const CORE_LINE =
  "One accountable desk for your building's power, energy and fit-out: engineering, approvals and execution together.";
export const PROOF_LINE = "Led by Jitendra Chavan, 36+ years inside Mumbai's power utility.";

export const ONE_LINERS = {
  'Grid Apex': 'HT and LT electrical work, installed, tested and maintained.',
  Solis: 'Solar and EV charging, from site survey to net meter.',
  Sanyog: 'Power connections, load changes and bill disputes, handled for you.',
  Tvasta: 'Interiors designed and built by one team, in three clear tiers.',
  eMudran: 'Brand, packaging, signage and print, from concept to installation.',
  Agrim: "We prepare and coordinate your project loan needs. We don't lend.",
};

export const GROUP_DIVISIONS = Object.entries(ONE_LINERS);

// One accent shape per division, taken from its logo (guidelines 2.9).
export const SHAPES = {
  apexDot: (size, color) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="4.2" fill="${color}"/></svg>`,
  sunDot: (size, color) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true"><rect x="0.6" y="0.6" width="8.8" height="8.8" rx="2.4" fill="${color}"/></svg>`,
  latticeSquare: (size, color, stroke = 1.1) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="${color}" stroke-width="${stroke}"><rect x="0.8" y="0.8" width="8.4" height="8.4"/><path d="M5 0.8V9.2M0.8 5H9.2"/></svg>`,
  speechBubble: (size, color, stroke = 1.1) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round"><path d="M1 1.4H9V6.8H4.4L2 9V6.8H1Z"/></svg>`,
  roofGable: (size, color, stroke = 1.3) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"><path d="M0.9 7.4L5 2.8L9.1 7.4"/></svg>`,
  swoosh: (size, color) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true"><path d="M0.8 8.4C2.6 3 7 1.2 9.4 2C6.8 2.4 3.8 4.4 0.8 8.4Z" fill="${color}"/></svg>`,
  foldedCorner: (size, color, stroke = 1.1) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round"><path d="M1 1H6.4L9 3.6V9H1Z M6.4 1V3.6H9"/></svg>`,
};

// The master emblem, drawn from src/components/Logo.tsx.
export const emblem = (size, canopy) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" aria-label="JC Apex Ventures">` +
  `<circle cx="50" cy="18" r="7" fill="#D4AF37"/>` +
  `<path d="M20 50 Q 50 20 80 50" stroke="${canopy}" stroke-width="8" stroke-linecap="round"/>` +
  `<path d="M28 50 Q 50 28 72 50" stroke="#C29F53" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>` +
  `<path d="M50 45 L 50 80 Q 50 92 40 92 Q 35 92 35 88" stroke="${canopy}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` +
  `</svg>`;

export const eyebrow = (text) => `<p class="eyebrow">${esc(text)}</p>`;

export const cornerMarks = () =>
  ['tl', 'tr', 'bl', 'br'].map((corner) => `<i class="mark mark-${corner}"></i>`).join('');

/** The drawing-sheet title block that runs along the foot of every page. */
export function titleBlock({ shape, division, document, web, sheet, total, rev, date }) {
  // The footer carries the web address, never the contact block (framework section 9).
  const cells = [
    'JC Apex Ventures',
    division,
    web ?? document,
    `Sheet ${String(sheet).padStart(2, '0')} of ${String(total).padStart(2, '0')}`,
    `Rev ${rev}`,
    date,
  ];
  return `<footer class="title-block"><span class="tb-shape">${shape}</span>${cells
    .map((cell) => `<span>${esc(cell)}</span>`)
    .join('')}</footer>`;
}

export const runningHeader = ({ logo, logoAlt, right, mark }) =>
  `<header class="running-header">${mark ?? `<img src="${logo}" alt="${esc(logoAlt)}">`}<span>${esc(right)}</span></header>`;

/** Label and value on one line between hairlines, with an optional source line. */
export const factRows = (rows) =>
  `<dl class="fact-rows">${rows
    .map(
      ({ label, value, note }) =>
        `<div class="fact-row"><dt>${esc(label)}</dt><dd>${esc(value)}${
          note ? `<small>${esc(note)}</small>` : ''
        }</dd></div>`,
    )
    .join('')}</dl>`;

/** Hairline spec table. Cells are escaped unless passed as { html }. */
export function specTable(headers, rows, className = '') {
  const cell = (value) => (value && typeof value === 'object' && 'html' in value ? value.html : esc(value));
  return `<table class="spec ${className}"><thead><tr>${headers
    .map((h) => `<th>${esc(h)}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((value) => `<td>${cell(value)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;
}

export const steps = (items) =>
  `<ol class="steps">${items
    .map(
      ({ title, text }, i) =>
        `<li><span class="step-n">${i + 1}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></li>`,
    )
    .join('')}</ol>`;

/** One A4 page. Content pages get the running header and a faint section number. */
export function sheet({ number, total, body, className = '', header, block, sectionNumber = true, background = '' }) {
  return `<section class="sheet ${className}">${background}${cornerMarks()}${header ?? ''}${
    sectionNumber ? `<span class="section-number">${String(number).padStart(2, '0')}</span>` : ''
  }<div class="content">${body}</div>${titleBlock({ ...block, sheet: number, total })}</section>`;
}

/**
 * Night cover shared by every profile except Solis (guidelines 3.2): group lock-up,
 * reversed division logo, the accent shape as the motif, then one headline fact or statement.
 */
export function darkCover({ logo, logoAlt, logoHeight, motif, title, subtitle, lead, details }) {
  return `
    <div class="group-lockup">${emblem('7mm', '#F0F3F6')}<span>JC Apex Ventures</span></div>
    <img class="cover-logo" src="${logo}" alt="${esc(logoAlt)}" style="height: ${logoHeight}">
    <div class="cover-motif">${motif}</div>
    <div style="height: 32mm"></div>
    ${eyebrow('Division profile')}
    <h1>${title}</h1>
    <p class="subtitle">${esc(subtitle)}</p>
    ${lead}
    <div class="cover-details">${factRows(details)}</div>`;
}

/** Back page shared by every profile: contact, the group, registered details. */
/** The "Part of JC Apex Ventures" table: once per document (framework section 9). */
export const groupTable = (division) => `
    <h2>Part of JC Apex Ventures</h2>
    <p class="lead-small">${esc(division)} is one of six divisions. A project that needs more than one is handled by a single desk.</p>
    ${specTable(['Division', 'What it does'], GROUP_DIVISIONS, 'group-table')}`;

/**
 * Contact page: the only full contact block in a document, closing with the core line.
 * Profiles with their own "people and group" page pass groupPage: false.
 */
export function contactPage({ email, webPath, qr, division, credits = '' }) {
  return `
    ${eyebrow('Contact')}
    <h1>Talk to us about your site.</h1>
    <p class="lead">${esc(CORE_LINE)}</p>
    <div class="back-grid" style="margin-top: 5mm">
      <div>
        ${factRows([
          { label: 'Director', value: COMPANY.director },
          { label: 'Email', value: email },
          { label: 'Phone and WhatsApp', value: COMPANY.phone },
          { label: 'Office', value: COMPANY.address },
          { label: 'Web', value: `${COMPANY.web}${webPath}` },
        ])}
      </div>
      <figure class="qr">${qr}<figcaption>${esc(division)} on the web</figcaption></figure>
    </div>
    ${credits}
    <p class="legal">${esc(COMPANY.legalName)} · CIN ${esc(COMPANY.cin)} · Registered office: ${esc(COMPANY.address)}</p>
  `;
}

/** @font-face rules with the font files inlined, so the PDF never falls back. */
export function fontFaceCss(fontsDir) {
  const face = (family, file, weight, style = 'normal', range = '') => {
    const data = fs.readFileSync(path.join(fontsDir, file)).toString('base64');
    return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${data}) format('woff2');font-weight:${weight};font-style:${style};${
      range ? `unicode-range:${range};` : ''
    }}`;
  };
  const latinExt = 'U+0100-02AF,U+20A0-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
  return [
    ...[400, 500, 600, 700].flatMap((w) => [
      face('Inter', `inter-latin-${w}-normal.woff2`, w),
      face('Inter', `inter-latin-ext-${w}-normal.woff2`, w, 'normal', latinExt),
    ]),
    // Photo credits quote Commons file titles, some of them in Cyrillic.
    face('Inter', 'inter-cyrillic-400-normal.woff2', 400, 'normal', 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116'),
    ...[400, 500, 600].map((w) => face('Instrument Sans', `instrument-sans-latin-${w}-normal.woff2`, w)),
    face('Instrument Serif', 'instrument-serif-latin-400-normal.woff2', 400),
    face('Instrument Serif', 'instrument-serif-latin-400-italic.woff2', 400, 'italic'),
  ].join('\n');
}

export const renderDocument = ({ title, theme, css, pages }) => `<!doctype html>
<html lang="en-IN"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>${css}</style></head>
<body class="${theme}">${pages.join('\n')}</body></html>`;
