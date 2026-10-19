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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="font-body text-[#111111] bg-[#F4F1EA]">
        <GroundedSmoothScroll>{children}</GroundedSmoothScroll>
      </body>
    </html>
  );
}
