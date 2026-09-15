import Link from 'next/link';
import type { ReactNode } from 'react';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-700">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h2 className="font-medium tracking-tight text-ink-900 text-xl">{title}</h2>
        <p className="text-sm leading-relaxed text-ink-500">{description}</p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
