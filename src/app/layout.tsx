import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchOverlay } from "@/components/search/search-overlay";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/common/json-ld";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arvynobd.com"),
  title: {
    default: "ARVYNO — Wear Your Identity | Luxury Fashion & Essentials",
    template: "%s | ARVYNO",
  },
  description:
    "ARVYNO is a luxury fashion house offering premium minimalist t-shirts, tailored shirts, and contemporary essentials. Crafted with precision for those who dress with purpose.",
  keywords: [
    "ARVYNO",
    "ARVYNO Fashion",
    "ARVYNO BD",
    "Luxury Fashion",
    "Wear Your Identity",
    "Premium T-Shirts Bangladesh",
    "Men's Designer Shirts",
    "Luxury Clothing Brand",
    "Minimalist Fashion Dhaka",
    "Cash on Delivery Bangladesh Clothing",
  ],
  authors: [{ name: "ARVYNO" }],
  creator: "ARVYNO",
  publisher: "ARVYNO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arvynobd.com",
    title: "ARVYNO — Wear Your Identity",
    description:
      "Premium essentials and luxury apparel designed for those who dress with purpose. Free delivery nationwide over ৳3,000.",
    siteName: "ARVYNO",
    images: [
      {
        url: "/images/banners/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "ARVYNO — Wear Your Identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARVYNO — Wear Your Identity",
    description: "Premium fashion essentials crafted with luxury precision.",
    images: ["/images/banners/hero-banner.png"],
  },
  icons: {
    icon: "/images/logo/arvyno-logo.png",
    apple: "/images/logo/arvyno-logo.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "8mBV51rwtbjn2mY-bb0LcUoIWvIGtCL-JdDXGXbb09Y",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${cinzel.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#080808] text-[#F8F8F6] font-sans flex flex-col selection:bg-[#C9A227] selection:text-[#000000]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MPSZ4FXT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPSZ4FXT');`,
          }}
        />

        <Providers>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </Providers>
      </body>
    </html>
  );
}
