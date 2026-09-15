import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const cols = [
  {
    title: 'Shop',
    links: [
      { href: '/products', label: 'All Products' },
      { href: '/categories', label: 'Categories' },
      { href: '/deals', label: 'Deals' },
      { href: '/wishlist', label: 'Wishlist' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/blog', label: 'Journal' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns' },
      { href: '/faq', label: 'FAQ' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-cream">
      <div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900">
                <span className="h-2.5 w-2.5 rounded-full bg-cream" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">ModernShop</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              Your premier destination for quality products — thoughtfully selected, delivered fast.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-ink-600">
              <a href="mailto:support@modernshop.com" className="flex items-center gap-2.5 transition hover:text-ink-900">
                <Mail className="h-4 w-4 text-ink-400" /> support@modernshop.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2.5 transition hover:text-ink-900">
                <Phone className="h-4 w-4 text-ink-400" /> +1 (555) 123-4567
              </a>
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-ink-400" />
                123 Shop St, City, State 12345
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-ink-700 transition hover:text-ink-900"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-ink-200/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-500">© 2026 m1nem. All rights reserved.</p>
          <div className="flex items-center gap-1">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Youtube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="https://example.com"
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
