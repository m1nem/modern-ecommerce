import { cn } from '@/lib/utils';

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'sale' | 'new' | 'muted';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]',
        variant === 'default' && 'bg-ink-900 text-white',
        variant === 'sale' && 'bg-[var(--color-sale)] text-white',
        variant === 'new' && 'bg-white text-ink-900 ring-1 ring-ink-900/10',
        variant === 'muted' && 'bg-ink-100 text-ink-700',
        className
      )}
    >
      {children}
    </span>
  );
}
