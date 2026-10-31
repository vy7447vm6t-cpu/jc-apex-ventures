import localFont from 'next/font/local';

// Solis sets body text in Instrument Sans (Solis brand guidelines 2.4). SIL Open Font License 1.1.
const instrumentSans = localFont({
  src: [
    { path: './fonts/instrument-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/instrument-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-solis-sans',
  display: 'swap',
});

export default function SolisLayout({ children }: { children: React.ReactNode }) {
  return <div className={instrumentSans.variable}>{children}</div>;
}
