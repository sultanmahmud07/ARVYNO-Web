import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace("BDT", "৳").trim();
}

export function calculateDiscountPercentage(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ARV-${timestamp}${random}`;
}

/**
 * Formats an order into a clean, professional WhatsApp text invoice
 */
export function formatOrderForWhatsApp(order: {
  id: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    zone: string;
    postalCode?: string;
    deliveryNote?: string;
  };
  items: Array<{
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}): string {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}*\n   • Size: ${item.size} | Color: ${item.color}\n   • Qty: ${item.quantity} × ৳${item.price} = ৳${item.price * item.quantity}`
    )
    .join("\n\n");

  const zoneLabel =
    order.customer.zone === "inside_dhaka"
      ? "Inside Dhaka City"
      : "Outside Dhaka";

  const deliveryText =
    order.deliveryFee === 0 ? "FREE" : `৳${order.deliveryFee}`;

  const noteText = order.customer.deliveryNote
    ? `\n📝 *Customer Note:* ${order.customer.deliveryNote}`
    : "";

  const postalText = order.customer.postalCode
    ? ` - ${order.customer.postalCode}`
    : "";

  return `🛍️ *NEW ARVYNO ORDER — #${order.id}*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${order.customer.fullName}
📞 *Phone Number:* ${order.customer.phone}
📍 *Delivery Address:* ${order.customer.address}, ${order.customer.city}${postalText}
🚚 *Delivery Zone:* ${zoneLabel} (${deliveryText})${noteText}

📦 *ORDER ITEMS (${order.items.length}):*
${itemsText}

━━━━━━━━━━━━━━━━━━━━━━━━
💵 *Subtotal:* ৳${order.subtotal}
🚚 *Delivery Fee:* ${deliveryText}
💰 *Total Payable (COD):* ৳${order.total}
💳 *Payment Method:* Cash on Delivery
━━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Ordered via:* https://www.arvynobd.com`;
}

/**
 * Generates direct WhatsApp chat URL with prefilled order text
 */
export function generateWhatsAppOrderUrl(
  order: {
    id: string;
    customer: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      zone: string;
      postalCode?: string;
      deliveryNote?: string;
    };
    items: Array<{
      name: string;
      size: string;
      color: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    deliveryFee: number;
    total: number;
  },
  whatsappNumber: string = "8801886957897"
): string {
  const message = formatOrderForWhatsApp(order);
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

