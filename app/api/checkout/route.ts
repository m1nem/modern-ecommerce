import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';
import { isStripeConfigured, getStripe } from '@/lib/stripe';

type Item = { productId: number; quantity: number };

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: 'Stripe is not configured yet. Add your test keys to .env.local.' }, { status: 503 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }
  const itemsRaw = (body as { items?: unknown })?.items;
  if (!Array.isArray(itemsRaw) || itemsRaw.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
  }
  const line_items = [];
  for (const raw of itemsRaw as Item[]) {
    const productId = Number(raw?.productId);
    const quantity = Math.max(1, Math.min(99, Math.floor(Number(raw?.quantity) || 1)));
    const product = getProductById(productId);
    if (!product) continue;
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: product.name, images: [product.image], metadata: { sku: product.sku, category: product.category } },
        unit_amount: Math.round(product.price * 100),
      },
      quantity,
    });
  }
  if (line_items.length === 0) {
    return NextResponse.json({ error: 'No valid items in cart.' }, { status: 400 });
  }
  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'ES', 'IT'] },
    });
    if (!session.url) {
      return NextResponse.json({ error: 'Could not create checkout session.' }, { status: 500 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Stripe error: ${message}` }, { status: 500 });
  }
}
