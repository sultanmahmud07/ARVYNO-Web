export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-98XM8Y8978";

// Extend global window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Log page views for SPA navigation in Google Analytics 4
 */
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom/standard events in GA4
 */
export const event = (
  action: string,
  params: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};
