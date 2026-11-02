import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import GroundedSmoothScroll from '@/components/GroundedSmoothScroll';
import Clippy from '@/components/Clippy';
import './globals.css';
import { SITE_NAME, SITE_URL } from '@/content/seo';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'JC Apex Ventures | Electrical, solar, utility, interiors and print, Mumbai', template: '%s | JC Apex Ventures' },
  description:
    'Six divisions in one Elphinstone office: HT and LT electrical work, solar, utility filings, interiors, print and project loan files. 1 MW+ of solar, 14 hotels.',
  applicationName: SITE_NAME,
  openGraph: { siteName: SITE_NAME, locale: 'en_IN', type: 'website' },
  twitter: { card: 'summary_large_image' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'JC Apex Ventures (OPC) Private Limited',
  alternateName: 'JC Apex Ventures',
  url: 'https://jcapexv.com',
  logo: 'https://jcapexv.com/images/logos/high-resolution-color-logo-2.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Units 801–802, 8th Floor, Tower 1, One International Centre, Senapati Bapat Marg, Elphinstone',
    addressLocality: 'Mumbai',
    postalCode: '400013',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-70211-12664',
    contactType: 'corporate consultation',
    email: 'admin@jcapexv.com',
  },
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CIN',
    value: 'U70200MH2023OPC411326',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body text-[#111111] bg-[#F4F1EA]">
        <a href="#main-content" className="skip-link">
          Skip to the content
        </a>
        <GroundedSmoothScroll>{children}</GroundedSmoothScroll>
        {/* The question dock, on every page; its answers come from the division profiles. */}
        <Clippy />
      </body>
    </html>
  );
}
