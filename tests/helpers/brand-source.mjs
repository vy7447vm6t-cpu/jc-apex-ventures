// Shared readers for the brand tests: the approved copy and the home page sources.
import { PATHS, readFileSafe } from './project-paths.mjs';

/** A string constant from a TS or JS module, read as text (both files use one-line literals). */
export function stringConstant(code, name) {
  const match = new RegExp(`export const ${name}\\s*=\\s*\\n?\\s*(["'])(.*?)\\1;`).exec(code ?? '');
  return match ? match[2] : null;
}

/** The six one-liners as written in a module, keyed by the text before the colon. */
export function oneLiners(code) {
  const block = /ONE_LINERS[^=]*=\s*\{([\s\S]*?)\};/.exec(code ?? '');
  if (!block) return {};
  const entries = {};
  for (const m of block[1].matchAll(/^\s*'?([\w -]+?)'?\s*:\s*(["'])(.*?)\2,?\s*$/gm)) entries[m[1].trim()] = m[3];
  return entries;
}

export const HOME_SECTION_FILES = [
  PATHS.groundedWhy,
  PATHS.groundedServices,
  PATHS.groundedProjectTrack,
  PATHS.groundedAffiliations,
  PATHS.groundedProcess,
  PATHS.homePage,
  PATHS.groundedCalculators,
  PATHS.groundedCta,
];

export function readAll(files) {
  return files.map((f) => readFileSafe(f) ?? '').join('\n');
}
