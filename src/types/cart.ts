import { ProductSize } from "./product";

export interface CartItem {
  id: string; // Unique cart item identifier (e.g. productId_size_color)
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: ProductSize;
  color: string;
  quantity: number;
  maxStock: number;
}

export interface CartSummary {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  itemCount: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
}
