// types.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price_cents: number;
  image_url?: string;
  stock: number;
  category_id?: number;
}

export interface OrderItem {
  product: Product; // store full product
  quantity: number;
}

export interface Buyer {
  name: string;
  email: string;
}

export interface Order {
  id: number;
  buyer_name: string;
  buyer_email: string;
  total_cents: number;
  items: Array<{
    product: Product;
    quantity: number;
    unit_price_cents: number;
  }>;
}
