"use client";

import React from "react";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { SearchProvider } from "@/hooks/use-search";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>{children}</SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
