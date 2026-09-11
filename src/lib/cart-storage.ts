import { CartItem } from "@/types/cart";

const CART_COOKIE_NAME = "arvyno_guest_cart";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getCartFromCookies(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === CART_COOKIE_NAME && value) {
        return JSON.parse(decodeURIComponent(value));
      }
    }
  } catch {
    // Fallback to localStorage
    try {
      const ls = localStorage.getItem(CART_COOKIE_NAME);
      if (ls) return JSON.parse(ls);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveCartToCookies(items: CartItem[]): void {
  if (typeof window === "undefined") return;

  try {
    const serialized = encodeURIComponent(JSON.stringify(items));
    document.cookie = `${CART_COOKIE_NAME}=${serialized}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    localStorage.setItem(CART_COOKIE_NAME, JSON.stringify(items));
  } catch {
    // ignore
  }
}
