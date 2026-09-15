import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Package, MapPin, User, Mail, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
export const metadata: Metadata = { title: 'Account' };

const user = { name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', address: '123 Shop St, City, State 12345' };
const orders = [
  { id: 'MS-2041', date: 'Feb 14, 2026', total: 338, status: 'Delivered', items: 2 },
  { id: 'MS-1978', date: 'Jan 02, 2026', total: 129, status: 'Delivered', items: 1 },
  { id: 'MS-1902', date: 'Dec 12, 2025', total: 828, status: 'Refunded', items: 3 },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-16 sm:px-8 lg:px-12 lg:pt-20">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-lg font-medium text-cream">JD</div>
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">Account</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight text-ink-900">{user.name}</h1>
          <p className="mt-1 text-[13.5px] text-ink-500">Demo profile - no authentication is connected to this store.</p>
        </div>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Orders', value: orders.length, Icon: Package, href: '#orders' },
          { label: 'Wishlist', value: '-', Icon: Heart, href: '/wishlist' },
          { label: 'Cart', value: '-', Icon: ShoppingBag, href: '/cart' },
        ].map(({ label, value, Icon, href }) => (
          <Link key={label} href={href} className="group flex items-center justify-between rounded-2xl border border-ink-200/70 bg-white p-5 transition hover:border-ink-300">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">{label}</p>
              <p className="mt-2 text-2xl font-medium tabular-nums text-ink-900">{value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition group-hover:bg-ink-100"><Icon className="h-4 w-4" /></div>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-ink-200/70 bg-white p-6">
          <h2 className="text-[15px] font-medium text-ink-900">Personal information</h2>
          <dl className="mt-5 space-y-4 text-[13.5px]">
            <div className="flex items-center gap-3"><User className="h-4 w-4 shrink-0 text-ink-400" /><div><dt className="text-ink-500">Full name</dt><dd className="mt-0.5 text-ink-900">{user.name}</dd></div></div>
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-ink-400" /><div><dt className="text-ink-500">Email</dt><dd className="mt-0.5 text-ink-900">{user.email}</dd></div></div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-ink-400" /><div><dt className="text-ink-500">Phone</dt><dd className="mt-0.5 text-ink-900">{user.phone}</dd></div></div>
          </dl>
        </section>
        <section className="rounded-2xl border border-ink-200/70 bg-white p-6">
          <h2 className="text-[15px] font-medium text-ink-900">Shipping address</h2>
          <div className="mt-5 flex items-start gap-3 text-[13.5px]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
            <div>
              <p className="text-ink-900">{user.name}</p>
              <p className="mt-1 text-ink-500">{user.address}</p>
              <p className="mt-1 text-ink-500">{user.phone}</p>
            </div>
          </div>
          <p className="mt-6 text-[12px] text-ink-500">This is a demo storefront - address editing is disabled.</p>
        </section>
      </div>
      <section id="orders" className="mt-8 rounded-2xl border border-ink-200/70 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-ink-900">Order history</h2>
          <span className="text-[12px] text-ink-500">Demo data</span>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200/70">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-ink-50/70 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
              <tr><th className="px-4 py-3">Order</th><th className="hidden px-4 py-3 sm:table-cell">Date</th><th className="px-4 py-3">Items</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-ink-200/70">
              {orders.map((o) => (
                <tr key={o.id} className="text-ink-700">
                  <td className="px-4 py-3.5 font-medium text-ink-900">{o.id}</td>
                  <td className="hidden px-4 py-3.5 sm:table-cell">{o.date}</td>
                  <td className="px-4 py-3.5 tabular-nums">{o.items}</td>
                  <td className="px-4 py-3.5 tabular-nums">${o.total}</td>
                  <td className="px-4 py-3.5"><span className="inline-flex items-center rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-700">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Link href="/wishlist" className="mt-8 flex items-center justify-between rounded-2xl bg-ink-900 p-6 text-cream transition hover:bg-ink-800">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Shortcut</p>
          <p className="mt-1.5 text-lg font-medium">Open your wishlist</p>
        </div>
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
