import { ShieldCheck, Truck, Lock } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const benefits = [
  { Icon: ShieldCheck, title: 'Quality Guarantee', body: 'Only the best products from trusted brands - inspected before they ship.' },
  { Icon: Truck, title: 'Fast Shipping', body: 'Get your orders delivered quickly, with free shipping on orders over $75.' },
  { Icon: Lock, title: 'Secure Payment', body: 'Your payment information is safe with us - encrypted end to end.' },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-[1480px] px-5 pt-4 sm:px-8 lg:px-12">
      <Reveal>
        <div className="grid overflow-hidden rounded-3xl border border-ink-200/70 bg-white md:grid-cols-3">
          {benefits.map(({ Icon, title, body }, i) => (
            <div key={title} className={`flex items-start gap-4 p-7 lg:p-9 ${i < benefits.length - 1 ? 'border-b border-ink-200/70 md:border-b-0 md:border-r' : ''}`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-800 ring-1 ring-ink-200/70">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[14.5px] font-medium text-ink-900">{title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
