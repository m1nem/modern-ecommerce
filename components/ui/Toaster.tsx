'use client';
import { AnimatePresence, motion } from 'motion/react';
import { Check, X, AlertCircle } from 'lucide-react';
import { useToastStore } from '@/store/toast-store';
import { cn } from '@/lib/utils';

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-2xl border bg-white p-3.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)]',
              t.variant === 'error' ? 'border-red-200' : 'border-ink-200/70'
            )}
          >
            <div
              className={cn(
                'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                t.variant === 'success' && 'bg-emerald-50 text-emerald-700',
                t.variant === 'error' && 'bg-red-50 text-red-600',
                t.variant === 'default' && 'bg-ink-100 text-ink-800'
              )}
            >
              {t.variant === 'success' && <Check className="h-3.5 w-3.5" />}
              {t.variant === 'error' && <AlertCircle className="h-3.5 w-3.5" />}
              {t.variant === 'default' && <Check className="h-3.5 w-3.5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-900">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-xs text-ink-500">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="rounded-full p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
