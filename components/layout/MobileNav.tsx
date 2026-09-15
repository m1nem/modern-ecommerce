'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Heart, ShoppingBag, User, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/deals', label: 'Deals' },
  { href: '/about', label: 'About' },
];

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Main menu" className="fixed inset-0 z-[80] md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/25 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold tracking-tight">ModernShop</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    className="block border-b border-ink-200/60 py-4 text-2xl font-medium tracking-tight text-ink-900"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto grid grid-cols-4 gap-2 pt-6">
              {[
                { href: '/products', label: 'Search', Icon: Search },
                { href: '/wishlist', label: 'Wishlist', Icon: Heart },
                { href: '/cart', label: 'Cart', Icon: ShoppingBag },
                { href: '/profile', label: 'Account', Icon: User },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 ring-1 ring-ink-200/70"
                >
                  <Icon className="h-4 w-4 text-ink-700" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-ink-500">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
