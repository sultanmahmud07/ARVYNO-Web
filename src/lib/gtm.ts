export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID || "GTM-MPSZ4FXT";

// Extend global window interface for dataLayer
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Safely push any payload to the GTM dataLayer
 */
export const sendGTMEvent = (data: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
};

/**
 * Track client-side page views in GTM/GA4 for Next.js App Router navigations
 */
export const gtmPageView = (url: string) => {
  sendGTMEvent({
    event: "page_view",
    page_path: url,
    page_location: typeof window !== "undefined" ? window.location.href : url,
    page_title: typeof document !== "undefined" ? document.title : "",
  });
};

export type GTMEcommerceEventName =
  | "view_item"
  | "view_item_list"
  | "select_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "purchase"
  | "refund"
  | "add_to_wishlist"
  | "search";

export interface GTMItemParam {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
  [key: string]: unknown;
}

export interface GTMEcommerceParams {
  currency?: string;
  value?: number;
  transaction_id?: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  search_term?: string;
  items?: GTMItemParam[];
  [key: string]: unknown;
}

/**
 * Track standard GA4 / GTM E-commerce events following Google's specification:
 * Clears the previous ecommerce object before pushing new data to prevent stale data inheritance.
 */
export const gtmEcommerceEvent = (
  eventName: GTMEcommerceEventName,
  ecommerceData: GTMEcommerceParams
) => {
  // Clear previous ecommerce object per Google GA4 documentation
  sendGTMEvent({ ecommerce: null });
  sendGTMEvent({
    event: eventName,
    ecommerce: ecommerceData,
  });
};
