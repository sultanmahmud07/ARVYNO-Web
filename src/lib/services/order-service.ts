import { Order, CustomerInfo } from "@/types/order";
import { CartItem } from "@/types/cart";
import { DELIVERY_CONFIG } from "@/lib/constants";
import { generateOrderId } from "@/lib/utils";

// In-memory / client-storage bridge for guest orders before backend DB
const ORDERS_STORAGE_KEY = "arvyno_guest_orders";

export async function createOrder(
  customer: CustomerInfo,
  items: CartItem[]
): Promise<Order> {
  if (!items || items.length === 0) {
    throw new Error("Cannot create an order with an empty cart.");
  }

  // Calculate Subtotal strictly from verified item prices
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate delivery fee based on zone & free delivery threshold
  let deliveryFee =
    customer.zone === "inside_dhaka"
      ? DELIVERY_CONFIG.insideDhaka
      : DELIVERY_CONFIG.outsideDhaka;

  if (subtotal >= DELIVERY_CONFIG.freeDeliveryThreshold) {
    deliveryFee = 0;
  }

  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  const order: Order = {
    id: generateOrderId(),
    customer,
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    paymentMethod: "cod",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  // Save to client storage if in browser
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) || "[]"
      );
      existing.unshift(order);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore storage quota errors
    }
  }

  return order;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (typeof window !== "undefined") {
    try {
      const orders: Order[] = JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) || "[]"
      );
      return orders.find((o) => o.id === orderId) || null;
    } catch {
      return null;
    }
  }
  return null;
}

export { formatOrderForWhatsApp, generateWhatsAppOrderUrl } from "@/lib/utils";

