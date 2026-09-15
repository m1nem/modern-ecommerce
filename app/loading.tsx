export default function Loading() {
  return (
    <div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12">
      <div className="h-8 w-48 animate-pulse rounded bg-ink-100" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square animate-pulse rounded-2xl bg-ink-100" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-ink-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-ink-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
