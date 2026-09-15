export type CategoryName =
  | 'Electronics'
  | 'Clothing'
  | 'Home & Garden'
  | 'Sports'
  | 'Books'
  | 'Beauty'
  | 'Toys';

export interface Product {
  id: number;
  name: string;
  category: CategoryName;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badges: ('New' | 'Sale' | 'Bestseller')[];
  stock: number;
  sku: string;
  features: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
}

export interface CartItem {
  productId: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface CartLine extends CartItem {
  product: Product;
}
