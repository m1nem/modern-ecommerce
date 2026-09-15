import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Mail, Phone, MapPin } from 'lucide-react';
export const metadata: Metadata = { title: 'Contact' };
export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Contact" title="Get in touch" description="Our team replies within one business day." />
      <div className="mx-auto mt-12 grid max-w-[1100px] gap-4 px-5 sm:px-8 lg:grid-cols-3 lg:px-12">
        {[
          { Icon: Mail, label: 'Email', value: 'support@modernshop.com', href: 'mailto:support@modernshop.com' },
          { Icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
          { Icon: MapPin, label: 'Address', value: '123 Shop St, City, State 12345' },
        ].map(({ Icon, label, value, href }: { Icon: typeof Mail; label: string; value: string; href?: string }) => (
          <div key={label} className="rounded-2xl border border-ink-200/70 bg-white p-6">
            <Icon className="h-4 w-4 text-ink-600" />
            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">{label}</p>
            {href ? <a href={href} className="mt-2 block text-[15px] font-medium text-ink-900 hover:underline">{value}</a> : <p className="mt-2 text-[15px] font-medium text-ink-900">{value}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
