// Photographs, maps, fact strips and cards for the profiles (guidelines 2.7 and 2.8.3).
// Licensed photos carry "Representative image" and a short credit in the caption;
// the full credit list goes on the back page of every profile that uses them.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, eyebrow, factRows, groupTable } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const PHOTO_DIR = path.join(here, 'assets', 'photos');
const CREDITS = JSON.parse(fs.readFileSync(path.join(PHOTO_DIR, 'credits.json'), 'utf8'));
const MAPS = Object.fromEntries(
  ['mumbai-region', 'maharashtra'].map((name) => [
    name,
    JSON.parse(fs.readFileSync(path.join(here, 'assets', 'maps', `${name}.json`), 'utf8')),
  ]),
);

export const MAP_CREDIT =
  'Boundaries: geoBoundaries (DataMeet India, CC BY 2.5 IN; Pathways Data and lgdirectory.gov.in, ODbL). Locations approximate.';

/** Approximate coordinates for map pins. Public locations only; precise addresses are not needed. */
export const PLACES = {
  'solis-tolia-bhiwandi-2025': [19.33, 73.15],
  'solis-devharsh-bhiwandi-2016': [19.26, 73.09],
  'solis-pristo-taloja-2022': [19.08, 73.12],
  'solis-cgst-kharghar-2022': [19.03, 73.07],
  'Colaba to Nariman Point': [18.92, 72.825],
  'Bandra and BKC': [19.055, 72.84],
  'Santacruz and Andheri': [19.095, 72.86],
  Vikhroli: [19.106, 72.929],
  Turbhe: [19.077, 73.017],
  Aurangabad: [19.88, 75.34],
  'One International Centre': [19.005, 72.828],
};

/**
 * Photo helper for one document. Records every photo used so the back page can credit them.
 * Returns { photo(name, opts), credits() }.
 */
export function photoSet(relDir) {
  const used = new Set();
  const caption = (name) => {
    const c = CREDITS[name];
    if (!c) throw new Error(`Unknown photo: ${name}`);
    return c.own ? c.subject : 'Representative image';
  };
  return {
    photo(name, { height = '60mm', className = '', captionText, noCaption = false } = {}) {
      used.add(name);
      const text = captionText ?? caption(name);
      return `<figure class="photo ${className}"><div class="photo-frame" style="height:${height}"><img src="${relDir}/${name}.jpg" alt="${esc(
        CREDITS[name].subject,
      )}"></div>${noCaption ? '' : `<figcaption>${esc(text)}</figcaption>`}</figure>`;
    },
    caption,
    used: () => [...used],
    credits() {
      const rows = [...used]
        .map((name) => CREDITS[name])
        .filter((c) => !c.own)
        .map((c) => `${c.subject}: ${c.author}, ${c.license}, via Wikimedia Commons (${c.title.replace(/^File:/, '')})`);
      return rows.length
        ? `<div class="credits"><h3>Photo credits</h3><p>Images marked "Representative image" show the kind of work described, not our projects. ${rows
            .map(esc)
            .join(' · ')}</p></div>`
        : '';
    },
  };
}

/** The key to a numbered map: number, title, one line underneath. */
export const pinList = (items) =>
  `<ol class="pin-list">${items
    .map(({ n, title, sub }) => `<li><span class="pin-key">${n}</span><div><strong>${esc(title)}</strong><span>${esc(sub)}</span></div></li>`)
    .join('')}</ol>`;

/** Big numbers in a row, each with a short label. */
export const factStrip = (items) =>
  `<div class="fact-strip" style="grid-template-columns: repeat(${items.length}, 1fr)">${items
    .map(({ value, label }) => `<div><span class="fs-value">${esc(value)}</span><span class="fs-label">${esc(label)}</span></div>`)
    .join('')}</div>`;

/** Project card: a large figure, the client, place and year, and the scope in fact rows. */
export const projectCard = ({ figure, title, meta, rows = [], tag }) => `
  <article class="project-card">
    ${tag ? `<p class="card-tag">${esc(tag)}</p>` : ''}
    <p class="card-figure">${esc(figure)}</p>
    <h3>${esc(title)}</h3>
    <p class="card-meta">${esc(meta)}</p>
    ${rows.length ? `<dl>${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
  </article>`;

/**
 * A map with labelled pins. Land is drawn flat in the division's panel colour, water left white.
 * pins: [{ label, sub, lat, lon, highlight }]
 */
export function mapSvg(name, pins, { accent, ink = '#111111', land = '#F1F1EE', border = '#C9C9C2', labelSide = {} } = {}) {
  const { proj, paths } = MAPS[name];
  const xy = (lat, lon) => [(lon - proj.lon0) * proj.cos * proj.k, (proj.lat1 - lat) * proj.k];
  const shapes = paths
    .map((p) => `<path d="${p.d}" fill="${land}" stroke="${border}" stroke-width="1.6" stroke-linejoin="round"/>`)
    .join('');
  // Label placement per pin: right (default), left, above or below.
  const place = (side, x, y) =>
    ({
      left: [x - 18, y + 2, 'end'],
      above: [x - 12, y - 46, 'start'],
      below: [x - 12, y + 42, 'start'],
    })[side] ?? [x + 18, y + 2, 'start'];
  const marks = pins
    .map(({ label, sub, lat, lon, n }) => {
      const [x, y] = xy(lat, lon);
      // Numbered pins carry no label on the map; the list beside it is the key.
      if (n) {
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="24" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
          <text x="${x.toFixed(1)}" y="${(y + 10).toFixed(1)}" text-anchor="middle" class="m-n">${n}</text>`;
      }
      const [tx, ty, anchor] = place(labelSide[label], x, y);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anchor}" class="m-label">${esc(label)}</text>
        ${sub ? `<text x="${tx.toFixed(1)}" y="${(ty + 28).toFixed(1)}" text-anchor="${anchor}" class="m-sub">${esc(sub)}</text>` : ''}`;
    })
    .join('');
  return `<svg viewBox="0 0 ${proj.width} ${proj.height}" role="img" aria-label="Map of project locations">
    <style>.m-label{font:600 30px var(--sans);fill:${ink}}.m-sub{font:400 25px var(--sans);fill:#555}.m-n{font:700 28px var(--sans);fill:${ink}}</style>
    <defs><clipPath id="clip-${name}"><rect width="${proj.width}" height="${proj.height}"/></clipPath></defs>
    <g clip-path="url(#clip-${name})">${shapes}</g>${marks}
  </svg>`;
}

/** "Our people" page: the team photo, the divisions that join this kind of project, and the one group table. */
export const peopleAndGroup = ({ photo, division, joinsTitle, joins }) => `
    <h2>${esc(joinsTitle)}</h2>
    ${factRows(joins.map(([label, value]) => ({ label, value })))}
    ${groupTable(division)}`;

/** Three client hotels, photographed by others (credited on the back page). */
export const hotelPhotos = (photo, height = '44mm') => `
    <div class="hotel-row">
      ${photo('hotel-taj-palace', { height, captionText: 'The Taj Mahal Palace, Colaba' })}
      ${photo('hotel-taj-lands-end', { height, captionText: 'Taj Lands End, Bandra' })}
      ${photo('hotel-trident-bkc', { height, captionText: 'Trident, Bandra Kurla' })}
    </div>`;
