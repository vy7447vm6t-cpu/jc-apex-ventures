import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
