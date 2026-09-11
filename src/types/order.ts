import { CartItem } from "./cart";

export type DeliveryZone = "inside_dhaka" | "outside_dhaka";

export type PaymentMethod = "cod"; // Cash on Delivery (prepared for bkash, nagad, card)

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  zone: DeliveryZone;
  postalCode?: string;
  deliveryNote?: string;
}

export interface Order {
  id: string; // e.g. ARV-89423
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}
