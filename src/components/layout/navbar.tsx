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
  ArrowUpRight,
  Flame,
  Layers,
} from "lucide-react";

interface DropdownCategory {
  name: string;
  href: string;
  image: string;
  tagline: string;
  badge?: string;
  price: string;
  itemCount: string;
  icon?: React.ReactNode;
}

const COLLECTION_ITEMS: DropdownCategory[] = [
  {
    name: "Drop Shoulder T-Shirts",
    href: "/categories/drop-shoulder",
    image: "/images/products/drop-shoulder/Drop Shoulder T-Shirt (White).png",
    tagline: "100% soft cotton 220+ GSM oversized fit",
    badge: "New Drop",
    price: "৳599",
    itemCount: "4 Designs",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "Heavyweight Hoodies",
    href: "/categories/hoodies",
    image: "/images/products/hoodies/cream-hoodie.png",
    tagline: "350+ GSM fleece & drop-shoulder fits",
    badge: "Winter Capsule",
    price: "৳1,050",
    itemCount: "6 Designs",
    icon: <Flame className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "Acid Wash T-Shirts",
    href: "/categories/acid-wash",
    image: "/images/products/acid-wash/acid-wash-black-tee.jpg",
    tagline: "Drop-shoulder fit & mineral wash finish",
    badge: "Streetwear",
    price: "৳699",
    itemCount: "3 Designs",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "Premium Baggy Pants",
    href: "/categories/baggy-pants",
    image: "/images/products/buggy/buggy-solid-black.jpg",
    tagline: "Premium interlock fabric & metal tips",
    badge: "Trending",
    price: "৳720",
    itemCount: "5 Designs",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "New Arrivals Drop",
    href: "/categories/new-arrivals",
    image: "/images/banners/drop-sholder.jpg",
    tagline: "Autumn/Winter 2026 limited capsule",
    badge: "New Release",
    price: "From ৳599",
    itemCount: "12 Items",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />,
  },
  {
    name: "Best Sellers Archive",
    href: "/categories/best-sellers",
    image: "/images/banners/welcome-tee-banner.jpg",
    tagline: "Most coveted wardrobe staples",
    badge: "Top Rated",
    price: "Wardrobe Icons",
    itemCount: "10 Items",
    icon: <Flame className="w-3.5 h-3.5 text-[#c9a227]" />,
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
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(true);
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
  const isDropShoulderActive = pathname === "/categories/drop-shoulder";
  const isAcidWashActive = pathname === "/categories/acid-wash";
  const isHoodiesActive = pathname === "/categories/hoodies";
  const isBaggyActive =
    pathname === "/categories/baggy-pants" ||
    pathname === "/categories/buggy-pants" ||
    pathname === "/categories/baggy";
  const isAboutActive = pathname === "/about";
  const isContactActive = pathname === "/contact";

  return (
    <>
      {/* Background Dimming Backdrop for Visual Focus on Open Submenu */}
      {collectionsOpen && (
        <div
          className="hidden lg:block fixed inset-0 bg-black/75 backdrop-blur-sm z-30 animate-in fade-in duration-200"
          onClick={() => setCollectionsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Pill Navbar Wrapper */}
      <header className="sticky top-2 sm:top-3.5 z-40 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 relative print:hidden">
        <div
          className={`w-full rounded-full transition-all duration-300 ${isScrolled
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
                className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${isHomeActive
                  ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)] scale-[1.02]"
                  : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                  }`}
              >
                Home
              </Link>

              {/* 2. Collections Full-Width Submenu Trigger */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setCollectionsOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${collectionsOpen
                    ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_22px_rgba(201,162,39,0.55)] font-bold scale-[1.02]"
                    : isCollectionsActive && !isHomeActive
                      ? "bg-white/15 text-[#e5c76b] border border-[#c9a227]/40 shadow-sm"
                      : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                    }`}
                  aria-expanded={collectionsOpen}
                  aria-haspopup="true"
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${collectionsOpen ? "rotate-180 text-black font-bold" : "text-[#777777]"
                      }`}
                  />
                </button>
              </div>

              {/* 3. Hoodies Link */}
              <Link
                href="/categories/drop-shoulder"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${isHoodiesActive
                  ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                  : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                  }`}
              >
                T-Shirt
              </Link>
              <Link
                href="/categories/hoodies"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${isHoodiesActive
                  ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                  : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                  }`}
              >
                Hoodies
              </Link>

              {/* 4. Baggy Pants Link */}
              <Link
                href="/categories/baggy-pants"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${isBaggyActive
                  ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                  : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                  }`}
              >
                Baggy
              </Link>

              {/* 5. About / Atelier Link */}
              <Link
                href="/about"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${isAboutActive
                  ? "bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black shadow-[0_0_20px_rgba(201,162,39,0.45)]"
                  : "text-[#b0b0b0] hover:text-white hover:bg-white/10"
                  }`}
              >
                Atelier
              </Link>

              {/* 6. Contact Link */}
              <Link
                href="/contact"
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${isContactActive
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
                className="p-2 sm:p-2.5 text-[#cccccc] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-all focus:outline-none flex items-center gap-1.5 cursor-pointer"
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
                className="relative p-2 sm:p-2.5 text-[#f8f8f6] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-all focus:outline-none flex items-center cursor-pointer"
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
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 text-[#cccccc] hover:text-[#c9a227] hover:bg-white/10 rounded-full transition-colors focus:outline-none ml-1 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Desktop Collections Mega-Menu Submenu with Images */}
        {collectionsOpen && (
          <div
            className="hidden lg:block absolute top-full left-3 right-3 sm:left-6 sm:right-6 lg:left-8 lg:right-8 mt-3 bg-[#0d0d0d] border-2 border-[#c9a227]/40 rounded-3xl p-6 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_50px_rgba(201,162,39,0.22)] animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top Bar inside Mega-Menu */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#c9a227]/20 border border-[#c9a227]/50 text-[#e5c76b] shadow-sm">
                  <Layers className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg tracking-wide text-white flex items-center gap-2">
                    <span>ARVYNO Atelier Categories</span>
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-[#c9a227]/15 text-[#e5c76b] border border-[#c9a227]/30 font-semibold">
                      Curated Drops
                    </span>
                  </h3>
                  <p className="text-xs text-[#a0a0a0] pt-0.5">
                    100% soft cotton 220+ GSM, 350+ GSM fleece hoodies, artisanal acid wash, and interlock baggy pants.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/products"
                  onClick={() => setCollectionsOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black font-extrabold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(201,162,39,0.6)] hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <span>Shop Full Catalog (13 Items)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3-Column Full Width Grid with Left Info & Right Smallest Image Thumbnail */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLLECTION_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setCollectionsOpen(false)}
                    className={`group relative p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${isActive
                      ? "bg-[#1f1b12] border-[#c9a227] ring-1 ring-[#c9a227]/60 shadow-[0_0_25px_rgba(201,162,39,0.25)]"
                      : "bg-[#161616] hover:bg-[#202020] border-[#2c2c2c] hover:border-[#c9a227]/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(201,162,39,0.2)] hover:-translate-y-0.5"
                      }`}
                  >
                    {/* Left Side: Category Name, Tagline, Price & Badges */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-md bg-[#c9a227]/15 text-[#e5c76b] border border-[#c9a227]/30 flex-shrink-0">
                            {item.icon}
                          </span>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#f3d37a] transition-colors truncate">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#a8a8a8] group-hover:text-[#dddddd] line-clamp-1 leading-relaxed">
                          {item.tagline}
                        </p>
                      </div>

                      <div className="flex items-center flex-wrap gap-2 pt-1">
                        <span className="text-xs font-mono font-extrabold text-black bg-[#c9a227] group-hover:bg-[#e5c76b] px-2.5 py-0.5 rounded-md shadow-sm transition-colors">
                          {item.price}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-[#d4d4d4] border border-white/15">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-[#888888] font-medium ml-auto hidden sm:inline">
                          {item.itemCount}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Smallest Category Image Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden flex-shrink-0 bg-black border border-[#383838] group-hover:border-[#c9a227] shadow-lg transition-colors">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="90px"
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Horizontal Info Bar */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#999999]">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 text-[#e0e0e0] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" /> 100% Quality Checked Product
                </span>
                <span className="hidden md:inline text-white/20">•</span>
                <span className="flex items-center gap-1.5 text-[#e0e0e0] font-medium">
                  <Flame className="w-3.5 h-3.5 text-[#c9a227]" /> Bangladesh Weather Friendly
                </span>
                <span className="hidden md:inline text-white/20">•</span>
                <span className="text-[#e5c76b] font-semibold">
                  Concierge Helpline: {BRAND.contact.phone}
                </span>
              </div>

              <span className="text-[#c9a227] font-bold tracking-wider uppercase text-[11px] bg-[#c9a227]/10 px-3 py-1 rounded-full border border-[#c9a227]/30">
                Cash on Delivery Nationwide
              </span>
            </div>
          </div>
        )}
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
              <nav className="py-6 space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${isHomeActive
                    ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold shadow-md"
                    : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                    }`}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* Vertical Submenu Accordion for Collections */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${isCollectionsActive && !isHomeActive
                      ? "bg-white/10 text-[#e5c76b] border border-[#c9a227]/30"
                      : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#c9a227]" />
                      <span>Collections & Categories</span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 text-[#888888] ${mobileCollectionsOpen ? "rotate-180 text-[#c9a227]" : ""
                        }`}
                    />
                  </button>

                  {/* Mobile Vertical List with Left Info & Right Smallest Image Thumbnail */}
                  {mobileCollectionsOpen && (
                    <div className="pt-2 pb-1 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="flex flex-col space-y-2">
                        {COLLECTION_ITEMS.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 bg-[#141414] ${isActive
                                ? "bg-[#c9a227]/15 border-[#c9a227]"
                                : "border-white/10 hover:border-white/25"
                                }`}
                            >
                              <div className="flex-1 min-w-0 space-y-1">
                                <p className="text-xs font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] truncate">
                                  {item.name}
                                </p>
                                <p className="text-[10px] text-[#777777] truncate">
                                  {item.tagline}
                                </p>
                                <div className="flex items-center gap-1.5 pt-0.5">
                                  <span className="text-[10px] font-mono font-bold text-[#e5c76b]">
                                    {item.price}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[7px] font-bold uppercase px-1.5 py-0.2 rounded-full bg-[#c9a227]/15 text-[#e5c76b]">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-black border border-white/10">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#c9a227] hover:text-black text-[#e5c76b] text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        <span>View All 13 Items</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${isAboutActive
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${isContactActive
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
