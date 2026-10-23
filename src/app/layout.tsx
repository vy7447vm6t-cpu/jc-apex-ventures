import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import GroundedSmoothScroll from '@/components/GroundedSmoothScroll';
import './globals.css';

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
  title: 'JC APEX VENTURES (OPC) PVT. LTD.',
  description: 'Consultancy, design, engineering, and execution of Electrical, Civil, and Renewable Energy projects. Multi-sector management, liaisoning, and strategic business development.',
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
    streetAddress: 'One International Centre, Tower 2, Units 801-802, Senapati Bapat Marg, Prabhadevi / Elphinstone Road',
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
        <GroundedSmoothScroll>{children}</GroundedSmoothScroll>
      </body>
    </html>
  );
}
