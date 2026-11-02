/** Intrinsic pixel sizes of the division logos, so every <img> reserves its space (no layout shift). */
const LOGO_SIZES: Record<string, [number, number]> = {
  'grid-apex-white.png': [466, 157],
  'grid-apex-official.png': [466, 157],
  'solis-logo-white.png': [589, 213],
  'solis-official.png': [589, 213],
  'sanyog-white.png': [194, 233],
  'sanyog-official.png': [194, 233],
  'tvasta-official.png': [564, 100],
  'tvasta-dark.png': [564, 100],
  'emudran-white.png': [293, 78],
  'emudran-official.png': [293, 78],
  'agrim-official.png': [341, 209],
  'agrim-dark.png': [341, 209],
};

/** width and height attributes for a logo path; empty when the file is not listed. */
export function logoSize(src: string): { width?: number; height?: number } {
  const size = LOGO_SIZES[src.split('/').pop() ?? ''];
  return size ? { width: size[0], height: size[1] } : {};
}
