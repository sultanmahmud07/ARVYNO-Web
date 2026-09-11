"use client";

import React from "react";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { SearchProvider } from "@/hooks/use-search";
import { SmoothScroll } from "@/components/common/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
          <SmoothScroll />
          {children}
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

