'use client';
import { useEffect } from 'react';
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-center justify-center px-5 text-center sm:px-8">
      <h1 className="text-3xl font-medium tracking-tight text-ink-900">Something went wrong</h1>
      <p className="mt-3 text-[15px] text-ink-500">An unexpected error occurred. You can try again, or return home.</p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="inline-flex h-12 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-medium text-white transition hover:bg-ink-800">Try again</button>
        <a href="/" className="inline-flex h-12 items-center justify-center rounded-full border border-ink-200 bg-white px-6 text-sm font-medium text-ink-900 transition hover:border-ink-300">Back to home</a>
      </div>
    </div>
  );
}
