
const WISHLIST_COOKIE_NAME = "arvyno_guest_wishlist";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 days

export function getWishlistFromCookies(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === WISHLIST_COOKIE_NAME && value) {
        return JSON.parse(decodeURIComponent(value));
      }
    }
  } catch {
    try {
      const ls = localStorage.getItem(WISHLIST_COOKIE_NAME);
      if (ls) return JSON.parse(ls);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveWishlistToCookies(productIds: string[]): void {
  if (typeof window === "undefined") return;

  try {
    const serialized = encodeURIComponent(JSON.stringify(productIds));
    document.cookie = `${WISHLIST_COOKIE_NAME}=${serialized}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    localStorage.setItem(WISHLIST_COOKIE_NAME, JSON.stringify(productIds));
  } catch {
    // ignore
  }
}
