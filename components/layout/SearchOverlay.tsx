'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? products.filter((p) =>
          [p.name, p.category, p.description].some((v) => v.toLowerCase().includes(q))
        )
      : products;
    return list.slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      }
      if (e.key === 'Enter') {
        const target = results[activeIdx];
        if (target) {
          router.push(`/product/${target.id}`);
          onClose();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, activeIdx, router, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/25 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[10vh] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-3 border-b border-ink-200/70 px-5 py-4">
              <Search className="h-4 w-4 text-ink-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                placeholder="Search products, categories…"
                className="flex-1 bg-transparent text-[15px] placeholder:text-ink-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm font-medium text-ink-900">No matches found</p>
                  <p className="mt-1 text-xs text-ink-500">Try a different word or category.</p>
                </div>
              ) : (
                <ul>
                  {results.map((p, i) => (
                    <li key={p.id}>
                      <button
                        onMouseEnter={() => setActiveIdx(i)}
                        onClick={() => {
                          router.push(`/product/${p.id}`);
                          onClose();
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                          activeIdx === i ? 'bg-ink-100' : ''
                        }`}
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                          <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-ink-900">{p.name}</p>
                          <p className="text-xs text-ink-500">{p.category}</p>
                        </div>
                        <span className="shrink-0 text-sm font-medium tabular-nums text-ink-900">
                          {formatPrice(p.price)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-ink-200/70 bg-ink-50/50 px-5 py-2.5 text-[11px] text-ink-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-ink-200 bg-white px-1 py-0.5 font-mono">↑</kbd>
                  <kbd className="rounded border border-ink-200 bg-white px-1 py-0.5 font-mono">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" /> open
                </span>
              </div>
              <span className="hidden items-center gap-1 sm:flex">
                esc <ArrowRight className="h-3 w-3" /> close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
