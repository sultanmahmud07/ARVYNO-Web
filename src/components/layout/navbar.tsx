"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useSearch } from "@/hooks/use-search";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { summary, toggleCart, isLoaded: isCartLoaded } = useCart();
  const { wishlist, isLoaded: isWishlistLoaded } = useWishlist();
  const { openSearch } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const cartCount = isCartLoaded ? summary.itemCount : 0;
  const wishlistCount = isWishlistLoaded ? wishlist.length : 0;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3.5 shadow-2xl shadow-black/50"
            : "bg-[#080808]/90 backdrop-blur-md py-4 border-b border-[#1c1c1c]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-2 -ml-2 text-[#cccccc] hover:text-[#c9a227] transition-colors focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group flex items-center gap-3 focus:outline-none"
                aria-label="ARVYNO Home"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#c9a227]/30 group-hover:border-[#c9a227] transition-colors overflow-hidden bg-black flex items-center justify-center shadow-lg">
                  <Image
                    src="/images/logo/arvyno-logo.png"
                    alt="ARVYNO Official Logo"
                    fill
                    sizes="(max-width: 640px) 44px, 48px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.25em] text-[#f8f8f6] group-hover:text-[#c9a227] transition-colors leading-none">
                    ARVYNO
                  </span>
                  <span className="text-[9px] tracking-[0.3em] text-[#c9a227] font-medium uppercase mt-0.5">
                    WEAR YOUR IDENTITY
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center space-x-8"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 py-1 ${
                      isActive
                        ? "text-[#c9a227] font-semibold"
                        : "text-[#b0b0b0] hover:text-[#ffffff]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons (Search, Wishlist, Cart) */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Search Button */}
              <button
                onClick={openSearch}
                aria-label="Search products"
                className="p-2.5 text-[#cccccc] hover:text-[#c9a227] hover:bg-[#181818] rounded-full transition-all flex items-center gap-1.5 focus:outline-none"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline-block text-[11px] font-mono text-[#777777] border border-[#2a2a2a] rounded px-1.5 py-0.5">
                  ⌘K
                </span>
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2.5 text-[#cccccc] hover:text-[#c9a227] hover:bg-[#181818] rounded-full transition-all focus:outline-none"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-black bg-[#c9a227] rounded-full px-1 shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={toggleCart}
                aria-label={`Shopping cart with ${cartCount} items`}
                className="relative p-2.5 text-[#f8f8f6] hover:text-[#c9a227] hover:bg-[#181818] rounded-full transition-all focus:outline-none flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-black bg-[#e5c76b] rounded-full px-1 shadow-sm animate-pulse-glow">
                    {cartCount}
                  </span>
                )}
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full glass-drawer p-6 flex flex-col justify-between shadow-2xl border-r border-[#262626] animate-in slide-in-from-left duration-300">
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
              <nav className="py-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium tracking-wider uppercase transition-colors ${
                        isActive
                          ? "bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30"
                          : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#666666]" />
                    </Link>
                  );
                })}
              </nav>

              {/* Extra Category Shortcuts */}
              <div className="pt-4 border-t border-[#222222] space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-[#777777] px-3 font-semibold">
                  Featured Collections
                </p>
                <Link
                  href="/categories/new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#e5c76b] hover:text-[#ffffff]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
                  <span>New Drop: Striped Shirts & Heavy Tees</span>
                </Link>
                <Link
                  href="/categories/best-sellers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#b8b8b8] hover:text-[#ffffff]"
                >
                  <span>Best Sellers Collection</span>
                </Link>
              </div>
            </div>

            {/* Bottom Support Contact */}
            <div className="pt-6 border-t border-[#222222] text-xs text-[#888888] space-y-2">
              <p className="text-[#f8f8f6] font-medium">Customer Concierge</p>
              <p>{BRAND.contact.phone}</p>
              <p className="text-[11px] text-[#c9a227] tracking-wider">
                CASH ON DELIVERY NATIONWIDE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
