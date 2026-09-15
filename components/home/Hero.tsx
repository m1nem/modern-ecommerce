'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-5 pb-16 pt-6 sm:px-8 sm:pt-10 lg:px-12 lg:pb-24 lg:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                New Season 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[15ch] text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-ink-900 sm:text-[56px] lg:text-[68px]"
            >
              Discover amazing products.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-500"
            >
              Shop the latest trends with unbeatable prices and fast shipping —
              curated for people who care about the details.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 text-[14px] font-medium text-white transition hover:bg-ink-800 active:scale-[0.98]"
              >
                Shop now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink-200 bg-white px-6 text-[14px] font-medium text-ink-900 transition hover:border-ink-300 hover:bg-ink-50"
              >
                Browse categories
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex items-center gap-6 text-[12.5px] text-ink-500"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-cream"
                      style={{
                        background: `hsl(${i * 47 + 20} 30% ${65 - i * 6}%)`,
                      }}
                    />
                  ))}
                </div>
                <span>Trusted by 12,000+ shoppers</span>
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                <Star className="h-3.5 w-3.5 fill-ink-900 text-ink-900" />
                <span className="text-ink-900">4.9</span>
                <span>avg. rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right — layered editorial composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-6 top-8 hidden select-none text-[180px] font-medium leading-none tracking-tighter text-ink-100 lg:block"
            >
              2026
            </span>

            <div className="relative grid grid-cols-[1fr_0.55fr] gap-3 sm:gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink-100">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=1000&fit=crop"
                  alt="Modern lifestyle storefront"
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative aspect-square overflow-hidden rounded-[22px] bg-ink-100">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"
                    alt="Wireless Headphones Pro"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-[22px] bg-ink-900 p-4 text-cream">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                    Featured
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug">
                    Wireless Headphones Pro
                  </p>
                  <p className="mt-1 text-[12px] text-white/60">From $299</p>
                </div>
              </div>
            </div>

            {/* floating mini info card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-4 left-4 hidden rounded-2xl border border-ink-200/70 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur sm:flex sm:items-center sm:gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div>
                <p className="text-[12.5px] font-medium text-ink-900">Handpicked picks</p>
                <p className="text-[11px] text-ink-500">Free shipping over $75</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
