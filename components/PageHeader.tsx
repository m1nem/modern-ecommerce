export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-[1480px] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12">
      {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">{eyebrow}</p>}
      <h1 className="mt-3 text-[40px] font-medium leading-[1.05] tracking-tight text-ink-900 sm:text-[52px]">{title}</h1>
      {description && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500">{description}</p>}
    </div>
  );
}
