import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = { title: 'About', description: 'Founded in 2024, ModernShop combines modern design with unbeatable prices to create the ultimate shopping experience.' };

export default function AboutPage() {
  return (
    <div className="pb-24">
      <section className="mx-auto max-w-[1480px] px-5 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">About ModernShop</p>
            <h1 className="mt-4 text-[44px] font-medium leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[56px] lg:text-[64px]">Design-led commerce, honestly priced.</h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-600">Your premier destination for quality products. We bring you the best selection of items with exceptional customer service and fast shipping.</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500">Founded in 2024, ModernShop combines modern design with unbeatable prices to create the ultimate shopping experience.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink-900 px-6 text-[14px] font-medium text-white transition hover:bg-ink-800">
                Browse the catalog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full border border-ink-200 bg-white px-6 text-[14px] font-medium text-ink-900 transition hover:border-ink-300">Get in touch</Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100">
              <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=1000&fit=crop" alt="ModernShop storefront" fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-28 max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { Icon: Sparkles, title: 'Curated quality', body: 'We stock fewer things - only the ones we would own ourselves.' },
            { Icon: Truck, title: 'Fast shipping', body: 'Dispatched within 24 hours. Free standard shipping over $75.' },
            { Icon: ShieldCheck, title: 'Secure checkout', body: 'Payments handled by Stripe. Cards never touch our servers.' },
            { Icon: Heart, title: 'Real support', body: 'Reach a human within one business day, every time.' },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-ink-200/70 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 ring-1 ring-ink-200/70"><Icon className="h-4 w-4 text-ink-800" strokeWidth={1.7} /></div>
              <p className="mt-5 text-[15px] font-medium text-ink-900">{title}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-24 max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-3xl bg-ink-900 p-10 text-cream sm:p-14 lg:p-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Our story</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">A quiet rebellion against noisy shopping.</h2>
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-white/70">
              <p>We started ModernShop because the storefronts we loved as shoppers had disappeared. Everything was either cheap and cluttered, or beautiful and full of dark patterns.</p>
              <p>So we built something in between: a light, considered space where products get real photography, real descriptions, and real prices.</p>
              <p>The catalog grows slowly. We think that&apos;s a feature.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
