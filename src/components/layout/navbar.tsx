"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/constants";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useSearch } from "@/hooks/use-search";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Flame,
  Layers,
} from "lucide-react";

interface DropdownCategory {
  name: string;
  href: string;
  tagline: string;
  badge?: string;
  icon?: React.ReactNode;
}

const COLLECTION_ITEMS: DropdownCategory[] = [
  {
    name: "All Menswear",
    href: "/products",
    tagline: "Explore full signature catalog",
    badge: "20 Designs",
  },
  {
    name: "Heavyweight T-Shirts",
    href: "/categories/t-shirts",
    tagline: "260 GSM compact combed cotton",
    badge: "Popular",
    icon: <Flame className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "Luxury Striped Shirts",
    href: "/categories/shirts",
    tagline: "100% Egyptian poplin & tailored fits",
    badge: "Trending",
  },
  {
    name: "New Arrivals Drop",
    href: "/categories/new-arrivals",
    tagline: "Autumn/Winter 2026 limited capsule",
    badge: "New",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "Best Sellers",
    href: "/categories/best-sellers",
    tagline: "Most coveted wardrobe staples",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { summary, toggleCart, isLoaded: isCartLoaded } = useCart();
  const { wishlist, isLoaded: isWishlistLoaded } = useWishlist();
  const { openSearch } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCollectionsOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCollectionsOpen(false);
    }, 150);
  };

  const cartCount = isCartLoaded ? summary.itemCount : 0;
  const wishlistCount = isWishlistLoaded ? wishlist.length : 0;

  const isHomeActive = pathname === "/";
  const isCollectionsActive =
    pathname.startsWith("/products") || pathname.startsWith("/categories");
  const isTeesActive = pathname === "/categories/t-shirts";
  const isShirtsActive = pathname === "/categories/shirts";
  const isAboutActive = pathname === "/about";
  const isContactActive = pathname === "/contact";

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <header className="sticky top-2 sm:top-3.5 z-40 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
        <div
          className={`w-full rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#090909]/92 dark:bg-[#090909]/95 backdrop-blur-2xl border border-white/15 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.65)] py-2 sm:py-2.5 px-3.5 sm:px-5"
              : "bg-[#0c0c0c]/85 dark:bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 dark:border-[#222222] shadow-[0_8px_30px_rgba(0,0,0,0.45)] py-2.5 sm:py-3 px-4 sm:px-6"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Brand Identity with Icon & Monogram */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none"
                aria-label="ARVYNO Home"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#c9a227]/40 group-hover:border-[#c9a227] transition-all duration-300 overflow-hidden bg-black flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(201,162,39,0.35)]">
                  <Image
                    src="/images/logo/arvyno-logo.png"
                    alt="ARVYNO Logo"
                    fill
                    sizes="(max-width: 640px) 36px, 40px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base sm:text-lg font-bold tracking-[0.2em] text-[#f8f8f6] group-hover:text-[#c9a227] transition-colors leading-none">
                    ARVYNO
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#c9a227] font-semibold uppercase mt-0.5">
                    ATELIER
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Floating Dock Nav Capsule (Desktop) */}
            <nav
              className="hidden lg:flex items-center bg-white/[0.04] dark:bg-white/[0.03] border border-white/10 dark:border-white/5 rounded-full p-1 sm:p-1.5 shadow-inner"
              aria-label="Main Navigation"
            >
              {/* 1. Home Link (with Glowing Active Pill) */}
              <Link
                href="/"
                className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isHomeActive
                    ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)] scale-[1.02]"
                    : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                }`}
              >
                Home
              </Link>

              {/* 2. Collections Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setCollectionsOpen((prev) => !prev)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                    isCollectionsActive && !isHomeActive
                      ? "bg-white/15 text-[#e5c76b] border border-[#c9a227]/40 shadow-sm"
                      : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                  }`}
                  aria-expanded={collectionsOpen}
                  aria-haspopup="true"
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      collectionsOpen ? "rotate-180 text-[#c9a227]" : "text-[#777777]"
                    }`}
                  />
                </button>

                {/* Dropdown Card */}
                {collectionsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-72 bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="p-2 border-b border-white/10 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#888888] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#c9a227]" /> Curation
                      </span>
                      <span className="text-[#c9a227]">Banani Atelier</span>
                    </div>

                    <div className="py-1.5 space-y-1">
                      {COLLECTION_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setCollectionsOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-all group"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              {item.icon}
                              <p className="text-xs font-semibold text-[#f8f8f6] group-hover:text-[#c9a227] transition-colors">
                                {item.name}
                              </p>
                            </div>
                            <p className="text-[10px] text-[#777777] group-hover:text-[#aaaaaa] line-clamp-1">
                              {item.tagline}
                            </p>
                          </div>

                          {item.badge && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c9a227]/15 text-[#e5c76b] border border-[#c9a227]/30">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. T-Shirts Link */}
              <Link
                href="/categories/t-shirts"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isTeesActive
                    ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                    : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                }`}
              >
                T-Shirts
              </Link>

              {/* 4. Shirts Link */}
              <Link
                href="/categories/shirts"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isShirtsActive
                    ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                    : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                }`}
              >
                Shirts
              </Link>

              {/* 5. About / Atelier Link */}
              <Link
                href="/about"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isAboutActive
                    ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                    : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                }`}
              >
                Atelier
              </Link>

              {/* 6. Contact Link */}
              <Link
                href="/contact"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isContactActive
                    ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                    : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Search, Wishlist, Cart & Glowing Pill CTA */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Search Trigger */}
              <button
                onClick={openSearch}
                aria-label="Search products"
                className="p-2 sm:p-2.5 text-[#cccccc] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-all focus:outline-none flex items-center gap-1.5"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span className="hidden xl:inline-block text-[10px] font-mono text-[#777777] border border-white/10 rounded-full px-1.5 py-0.5">
                  ⌘K
                </span>
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2 sm:p-2.5 text-[#cccccc] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-all focus:outline-none"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[16px] h-[16px] text-[9px] font-bold text-black bg-[#c9a227] rounded-full px-1 shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={toggleCart}
                aria-label={`Shopping bag with ${cartCount} items`}
                className="relative p-2 sm:p-2.5 text-[#f8f8f6] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-all focus:outline-none flex items-center"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[16px] h-[16px] text-[9px] font-bold text-black bg-[#e5c76b] rounded-full px-1 shadow-sm animate-pulse-glow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Glowing Pill CTA Button (Matches reference image) */}
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black hover:shadow-[0_0_22px_rgba(201,162,39,0.55)] hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <span>Shop Drop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 text-[#cccccc] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-colors focus:outline-none ml-1"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#0c0c0c] p-6 flex flex-col justify-between shadow-2xl border-r border-[#262626] animate-in slide-in-from-left duration-300">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#222222]">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full border border-[#c9a227]/40 overflow-hidden bg-black">
                    <Image
                      src="/images/logo/arvyno-logo.png"
                      alt="ARVYNO"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-base font-bold tracking-[0.2em] text-[#f8f8f6]">
                      ARVYNO
                    </p>
                    <p className="text-[8px] tracking-[0.25em] text-[#c9a227]">
                      WEAR YOUR IDENTITY
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#888888] hover:text-[#f8f8f6] rounded-full hover:bg-[#1f1f1f]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-1.5">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    isHomeActive
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                  }`}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    pathname === "/products"
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                  }`}
                >
                  <span>Shop All</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  href="/categories/t-shirts"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    isTeesActive
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                  }`}
                >
                  <span>T-Shirts (260 GSM)</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  href="/categories/shirts"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    isShirtsActive
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                  }`}
                >
                  <span>Striped Shirts</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    isAboutActive
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                  }`}
                >
                  <span>About Atelier</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    isContactActive
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                  }`}
                >
                  <span>Contact Concierge</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              </nav>

              {/* Extra Category Shortcuts */}
              <div className="pt-4 border-t border-[#222222] space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-[#777777] px-3 font-semibold">
                  Exclusive Drops
                </p>
                <Link
                  href="/categories/new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#e5c76b] hover:text-[#ffffff]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
                  <span>Autumn/Winter 2026 Collection</span>
                </Link>
              </div>
            </div>

            {/* Bottom Support Contact */}
            <div className="pt-6 border-t border-[#222222] text-xs text-[#888888] space-y-3">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Shop Entire Drop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="space-y-1 text-center">
                <p className="text-[#f8f8f6] font-medium">Customer Hotline: {BRAND.contact.phone}</p>
                <p className="text-[10px] text-[#c9a227] tracking-wider uppercase">
                  Cash on Delivery Nationwide
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
