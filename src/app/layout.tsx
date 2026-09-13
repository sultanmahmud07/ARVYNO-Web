import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchOverlay } from "@/components/search/search-overlay";
import { Providers } from "@/components/providers";

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
  metadataBase: new URL("https://www.arvyno.com"),
  title: {
    default: "ARVYNO — Wear Your Identity | Luxury Fashion & Essentials",
    template: "%s | ARVYNO",
  },
  description:
    "ARVYNO is a luxury fashion house offering premium minimalist t-shirts, tailored shirts, and contemporary essentials. Crafted with precision for those who dress with purpose.",
  keywords: [
    "ARVYNO",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arvyno.com",
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
        <Providers>
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
