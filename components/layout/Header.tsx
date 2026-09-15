'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useMounted } from '@/lib/use-mounted';
import { cn } from '@/lib/utils';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mounted = useMounted();

  const cartCount = useCartStore((s) => (mounted ? s.items.reduce((n, i) => n + i.quantity, 0) : 0));
  const wishCount = useWishlistStore((s) => (mounted ? s.ids.length : 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-[padding,background,border-color] duration-300',
          scrolled
            ? 'border-b border-ink-200/70 bg-cream/85 py-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-cream/70'
            : 'border-b border-transparent bg-cream py-4'
        )}
      >
        <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition hover:bg-ink-100 md:hidden"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>

          <Link href="/" className="flex items-center gap-2 py-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900">
              <span className="h-2.5 w-2.5 rounded-full bg-cream" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink-900">
              ModernShop
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition',
                    active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-ink-900"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="flex h-10 items-center gap-2 rounded-full px-3 text-ink-700 transition hover:bg-ink-100"
            >
              <Search className="h-[17px] w-[17px]" />
              <span className="hidden text-[12.5px] text-ink-500 lg:inline">Search</span>
              <kbd className="ml-1 hidden rounded-md border border-ink-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-ink-500 lg:inline">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100"
            >
              <Heart className="h-[17px] w-[17px]" />
              <AnimatePresence>
                {mounted && wishCount > 0 && (
                  <motion.span
                    key={wishCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink-900 px-1 text-[10px] font-medium text-white"
                  >
                    {wishCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100"
            >
              <ShoppingBag className="h-[17px] w-[17px]" />
              <AnimatePresence>
                {mounted && cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink-900 px-1 text-[10px] font-medium text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link
              href="/profile"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100 sm:flex"
            >
              <User className="h-[17px] w-[17px]" />
            </Link>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
