import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/Toaster';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: { default: 'ModernShop - Premium products, curated', template: '%s - ModernShop' },
  description: 'Your premier destination for quality products. Shop the latest trends with unbeatable prices and fast shipping.',
  openGraph: { title: 'ModernShop - Premium products, curated', description: 'Curated products, unbeatable prices, fast shipping.', type: 'website', siteName: 'ModernShop' },
  twitter: { card: 'summary_large_image', title: 'ModernShop', description: 'Curated products, unbeatable prices, fast shipping.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-cream text-ink-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
