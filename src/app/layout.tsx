import type { Metadata } from 'next';
import { Instrument_Sans, Newsreader } from 'next/font/google';
import './globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'JC APEX VENTURES (OPC) PVT. LTD.',
  description: 'Consultancy, design, engineering, and execution of Electrical, Civil, and Renewable Energy projects. Multi-sector management, liaisoning, and strategic business development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${newsreader.variable}`}>
      <body className={`${newsreader.className} font-serif`}>{children}</body>
    </html>
  );
}

