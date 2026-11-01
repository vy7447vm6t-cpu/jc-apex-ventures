/**
 * Where the work is, for the map on the home page. Coordinates are approximate and public
 * (an area, not an address), and match PLACES in profiles/visuals.mjs so the website map and
 * the company profile map agree; tests/tier1-features/r14-clients-projects.test.mjs checks that.
 */

import mumbaiRegion from './maps/mumbai-region.json';

export const MUMBAI_REGION = mumbaiRegion as {
  proj: { lon0: number; lat1: number; k: number; cos: number; width: number; height: number };
  paths: { name: string; d: string }[];
};

export const MAP_CREDIT =
  'Boundaries: geoBoundaries (DataMeet India, CC BY 2.5 IN; Pathways Data and lgdirectory.gov.in, ODbL). Locations approximate.';

export const PLACES: Record<string, [number, number]> = {
  'solis-tolia-bhiwandi-2025': [19.33, 73.15],
  'solis-devharsh-bhiwandi-2016': [19.26, 73.09],
  'solis-pristo-taloja-2022': [19.08, 73.12],
  'solis-cgst-kharghar-2022': [19.03, 73.07],
  'Colaba to Nariman Point': [18.92, 72.825],
  'Bandra and BKC': [19.055, 72.84],
  'Santacruz and Andheri': [19.095, 72.86],
  Vikhroli: [19.106, 72.929],
  Turbhe: [19.077, 73.017],
};

/** Hotel areas on the map, and the place names that fall in each (company profile, page 3). */
export const HOTEL_AREAS: [string, string[]][] = [
  ['Colaba to Nariman Point', ['Colaba', 'Cuffe Parade', 'Nariman Point']],
  ['Bandra and BKC', ['Bandra']],
  ['Santacruz and Andheri', ['Santacruz', 'Andheri']],
  ['Vikhroli', ['Vikhroli']],
  ['Turbhe', ['Turbhe']],
];

/** Map position of a place, in the units of MUMBAI_REGION's viewBox. */
export function project([lat, lon]: [number, number]): [number, number] {
  const { proj } = MUMBAI_REGION;
  return [(lon - proj.lon0) * proj.cos * proj.k, (proj.lat1 - lat) * proj.k];
}
