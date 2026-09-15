import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-center justify-center px-5 text-center sm:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">404</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-ink-900">Page not found</h1>
      <p className="mt-4 text-[15px] text-ink-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink-900 px-6 text-sm font-medium text-white transition hover:bg-ink-800">Back to home</Link>
    </div>
  );
}
