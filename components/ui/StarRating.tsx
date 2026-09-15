import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StarRating({
  rating,
  size = 12,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rating >= n - 0.25;
        return (
          <Star
            key={n}
            width={size}
            height={size}
            className={cn(
              filled ? 'fill-ink-900 text-ink-900' : 'fill-transparent text-ink-300'
            )}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}
