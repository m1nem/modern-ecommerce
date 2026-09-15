import type { CategoryName, Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    description: 'Premium noise-cancelling wireless headphones.',
    longDescription:
      'Studio-grade drivers tuned by audio engineers, adaptive noise cancellation, and a memory-foam headband that disappears after a few minutes. Up to 40 hours of battery, USB-C fast charge, and multipoint pairing for the way you actually work.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&h=1200&fit=crop',
    ],
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 234,
    badges: ['New', 'Sale'],
    stock: 18,
    sku: 'MS-EL-0001',
    features: [
      'Adaptive active noise cancellation',
      '40-hour battery life, 5-min fast charge',
      'Bluetooth 5.3 multipoint pairing',
      'Memory foam ear cushions',
      'USB-C + 3.5mm wired mode',
    ],
    colors: [
      { name: 'Midnight', hex: '#0d0c0b' },
      { name: 'Sand', hex: '#c8b69a' },
      { name: 'Fog', hex: '#b9bcc0' },
    ],
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    category: 'Electronics',
    description: 'Advanced fitness tracking smartwatch.',
    longDescription:
      'A titanium-cased smartwatch with an always-on retina display, dual-band GPS, ECG, blood-oxygen monitoring, and multi-day battery. Built for athletes, dressed for the boardroom.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&h=1200&fit=crop',
    ],
    price: 449,
    rating: 4.7,
    reviews: 189,
    badges: ['New'],
    stock: 24,
    sku: 'MS-EL-0002',
    features: [
      'Grade-5 titanium case',
      'Dual-band GPS + offline maps',
      'ECG & blood oxygen',
      'Up to 72h battery (low-power mode)',
      '100m water resistance',
    ],
    colors: [
      { name: 'Titanium', hex: '#7f7c76' },
      { name: 'Graphite', hex: '#3a3a3a' },
    ],
    sizes: ['41mm', '45mm'],
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    description: 'Sustainable organic cotton t-shirt.',
    longDescription:
      'Made from GOTS-certified organic cotton. A heavier 220gsm jersey that holds its shape, with a subtle structured shoulder and a soft, broken-in hand feel from day one.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=1200&fit=crop',
    ],
    price: 39,
    originalPrice: 59,
    rating: 4.6,
    reviews: 156,
    badges: ['Sale'],
    stock: 120,
    sku: 'MS-CL-0003',
    features: [
      '100% GOTS-certified organic cotton',
      '220gsm heavyweight jersey',
      'Pre-shrunk, garment dyed',
      'Reinforced collar',
    ],
    colors: [
      { name: 'Bone', hex: '#f3ede2' },
      { name: 'Slate', hex: '#4a505a' },
      { name: 'Olive', hex: '#6b6a4a' },
      { name: 'Ink', hex: '#15171a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    category: 'Home & Garden',
    description: 'Premium ergonomic office chair.',
    longDescription:
      'A breathable mesh back with a synchronized tilt mechanism, adjustable lumbar, and 4D armrests. Designed with an occupational therapist to keep your spine honest through long sessions.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=1200&fit=crop',
    ],
    price: 599,
    rating: 4.9,
    reviews: 98,
    badges: [],
    stock: 12,
    sku: 'MS-HG-0004',
    features: [
      'Synchronized tilt with 4 lock positions',
      '4D adjustable armrests',
      'Adjustable lumbar support',
      'Breathable knit mesh back',
      '10-year warranty',
    ],
    colors: [
      { name: 'Graphite', hex: '#2b2b2b' },
      { name: 'Cream', hex: '#efe8dc' },
    ],
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    category: 'Sports',
    description: 'Non-slip premium yoga mat.',
    longDescription:
      'A 5mm natural rubber mat with a polyurethane top layer that grips better as you sweat. Alignment markers, closed-cell surface, and a carry strap included.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=1200&h=1200&fit=crop',
    ],
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    reviews: 267,
    badges: ['Sale'],
    stock: 60,
    sku: 'MS-SP-0005',
    features: [
      'Natural rubber base',
      'Polyurethane sweat-grip top',
      '5mm cushioning',
      'Alignment markings',
      'Carry strap included',
    ],
    colors: [
      { name: 'Clay', hex: '#b0725a' },
      { name: 'Forest', hex: '#3b4a3b' },
      { name: 'Charcoal', hex: '#333333' },
    ],
  },
  {
    id: 6,
    name: 'Coffee Maker Deluxe',
    category: 'Home & Garden',
    description: 'Programmable coffee maker.',
    longDescription:
      'A 12-cup programmable drip brewer with a thermal carafe, precise temperature control, and a showerhead sprayer that evenly saturates the grounds. Wake up to coffee already made.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1200&h=1200&fit=crop',
    ],
    price: 249,
    rating: 4.5,
    reviews: 145,
    badges: [],
    stock: 30,
    sku: 'MS-HG-0006',
    features: [
      '12-cup thermal carafe',
      'Programmable 24h timer',
      'Showerhead sprayer',
      'SCA-certified brewing temp',
      'Auto-clean cycle',
    ],
    colors: [
      { name: 'Stainless', hex: '#9a9a9a' },
      { name: 'Matte Black', hex: '#1c1c1c' },
    ],
  },
  {
    id: 7,
    name: 'Running Shoes Pro',
    category: 'Sports',
    description: 'Professional running shoes.',
    longDescription:
      'A carbon-plated race-day trainer with a supercritical foam midsole. Lightweight, propulsive, and surprisingly stable at tempo. Built for personal bests.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=1200&fit=crop',
    ],
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    reviews: 312,
    badges: ['New', 'Sale'],
    stock: 42,
    sku: 'MS-SP-0007',
    features: [
      'Carbon-fiber propulsion plate',
      'Supercritical foam midsole',
      'Engineered knit upper',
      'Approx. 218g (US M9)',
    ],
    colors: [
      { name: 'Volt', hex: '#c8e04a' },
      { name: 'Bone', hex: '#ece7dc' },
      { name: 'Ink', hex: '#141414' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
  },
  {
    id: 8,
    name: 'Skincare Set',
    category: 'Beauty',
    description: 'Complete skincare set.',
    longDescription:
      'A four-step routine built around gentle actives: gel cleanser, hydrating essence, a niacinamide serum, and a ceramide moisturizer. Dermatologist-tested, fragrance-free, and formulated for daily use.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=1200&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=1200&fit=crop',
    ],
    price: 129,
    rating: 4.6,
    reviews: 89,
    badges: [],
    stock: 55,
    sku: 'MS-BE-0008',
    features: [
      'Gentle gel cleanser (150ml)',
      'Hydrating essence (120ml)',
      '10% niacinamide serum (30ml)',
      'Ceramide moisturizer (50ml)',
      'Fragrance-free, dermatologist-tested',
    ],
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category?: string) {
  if (!category || category === 'All') return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(id: number, limit = 4) {
  const current = getProductById(id);
  if (!current) return [];
  const same = products.filter((p) => p.category === current.category && p.id !== id);
  const rest = products.filter((p) => p.category !== current.category && p.id !== id);
  return [...same, ...rest].slice(0, limit);
}

export function getCategories(): CategoryName[] {
  return ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys'];
}

export function getCategoryCount(cat: CategoryName | 'All') {
  if (cat === 'All') return products.length;
  return products.filter((p) => p.category === cat).length;
}
