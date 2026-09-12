import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'InkweCham — Move Without Limits',
  description: 'InkweCham AI business platform with KHESH at its execution boundary.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang='en'><body>{children}</body></html>;
}