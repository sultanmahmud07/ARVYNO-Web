"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CartItem, CartSummary } from "@/types/cart";
import { getCartFromCookies, saveCartToCookies } from "@/lib/cart-storage";
import { DELIVERY_CONFIG } from "@/lib/constants";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  summary: CartSummary;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Hydrate cart from cookies on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = getCartFromCookies();
      setItems(saved);
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync to cookies whenever items change after initial load
  useEffect(() => {
    if (isLoaded) {
      saveCartToCookies(items);
    }
  }, [items, isLoaded]);

  const addItem = (newItem: Omit<CartItem, "id">) => {
    const cartItemId = `${newItem.productId}_${newItem.size}_${newItem.color.replace(/\s+/g, "-")}`;
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = Math.min(
          current.quantity + newItem.quantity,
          newItem.maxStock || 10
        );
        updated[existingIndex] = { ...current, quantity: newQty };
        return updated;
      } else {
        return [...prev, { ...newItem, id: cartItemId }];
      }
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.maxStock || 10) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const summary = useMemo<CartSummary>(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const freeDeliveryThreshold = DELIVERY_CONFIG.freeDeliveryThreshold;
    const isFreeDelivery = subtotal >= freeDeliveryThreshold && subtotal > 0;
    const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : DELIVERY_CONFIG.insideDhaka;
    const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
    const discount = 0;
    const total = subtotal + deliveryFee - discount;

    return {
      subtotal,
      deliveryFee,
      discount,
      total,
      itemCount,
      freeDeliveryThreshold,
      amountNeededForFreeDelivery,
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        summary,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
