"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid sending duplicate pageview on initial mount because initial gtag config fires page_view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const queryString = searchParams?.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Route Change Tracker for SPA client-side navigations */}
      <Suspense fallback={null}>
        <GoogleAnalyticsTracker />
      </Suspense>

      {/* Google Analytics Script (gtag.js) */}
      <Script
        id="google-analytics-tag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
