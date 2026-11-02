import type { Metadata } from 'next';

export const SITE_URL = 'https://jcapexv.com';
export const SITE_NAME = 'JC Apex Ventures';

/** The generated share card (src/app/opengraph-image.tsx). */
const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'JC Apex Ventures, Mumbai' };

/** Search engines show about 160 characters; cut at the last full sentence or word that fits. */
export function shortDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > 80) return cut.slice(0, sentence + 1);
  // No full sentence fits: end at the last clause break rather than mid-phrase.
  const clause = cut.lastIndexOf(', ');
  return `${cut.slice(0, clause > 80 ? clause : cut.lastIndexOf(' ')).replace(/[,:;]$/, '')}.`;
}

/** Title, description, canonical URL and share cards for one page. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const desc = shortDescription(description);
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    // A page's openGraph replaces the layout's, so the share image is named here too.
    openGraph: { title, description: desc, url: path, siteName: SITE_NAME, locale: 'en_IN', type: 'website', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description: desc, images: [OG_IMAGE.url] },
  };
}
