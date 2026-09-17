"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getOrderById } from "@/lib/services/order-service";
import { Order } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_CONFIG } from "@/lib/constants";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Phone,
  ArrowRight,
  Printer,
  Sparkles,
} from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (orderId) {
        const data = await getOrderById(orderId);
        setOrder(data);
      }
      setLoading(false);
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pb-24 pt-8 sm:pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Success Card */}
        <div className="glass-card-gold rounded-3xl p-8 sm:p-12 text-center space-y-5 relative overflow-hidden shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-[#c9a227]/20 border border-[#c9a227]/40 flex items-center justify-center mx-auto text-[#e5c76b] animate-pulse-glow">
            <CheckCircle2 className="w-10 h-10 text-[#c9a227]" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a227]/15 border border-[#c9a227]/30 text-xs font-semibold text-[#e5c76b] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Order Confirmed & Logged</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6]">
              Thank You for Dressing with ARVYNO
            </h1>
            <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed">
              Your order has been recorded. Our concierge team will prepare
              and dispatch your parcel for express delivery.
            </p>
          </div>

          {/* Order ID Tag */}
          <div className="inline-block px-6 py-3 rounded-xl bg-[#141414] border border-[#2d2d2d]">
            <p className="text-[11px] text-[#888888] uppercase tracking-wider">
              Order Reference Number
            </p>
            <p className="font-mono text-xl font-bold text-[#e5c76b] mt-0.5">
              {orderId}
            </p>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        {order ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Customer Info & Timeline */}
            <div className="md:col-span-6 space-y-6">
              {/* Delivery Details */}
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-4">
                <h3 className="font-serif text-base font-bold text-[#f8f8f6] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a227]" />
                  <span>Delivery Information</span>
                </h3>

                <div className="space-y-2 text-xs text-[#cccccc]">
                  <p className="font-bold text-sm text-white">
                    {order.customer.fullName}
                  </p>
                  <p className="flex items-center gap-2 text-[#a0a0a0]">
                    <Phone className="w-3.5 h-3.5 text-[#c9a227]" />
                    {order.customer.phone}
                  </p>
                  {order.customer.email && <p>{order.customer.email}</p>}
                  <p className="text-[#888888] pt-1">
                    {order.customer.address}, {order.customer.city}{" "}
                    {order.customer.postalCode ? `- ${order.customer.postalCode}` : ""}
                  </p>
                  {order.customer.deliveryNote && (
                    <p className="text-[11px] text-[#e5c76b] italic pt-1">
                      Note: &quot;{order.customer.deliveryNote}&quot;
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#202020] flex items-center justify-between text-xs">
                  <span className="text-[#888888]">Payment Method:</span>
                  <span className="text-[#e5c76b] font-bold">
                    Cash on Delivery (৳{order.total})
                  </span>
                </div>
              </div>

              {/* Delivery Status Timeline */}
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-4">
                <h3 className="font-serif text-base font-bold text-[#f8f8f6] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#c9a227]" />
                  <span>Estimated Delivery</span>
                </h3>

                <p className="text-xs text-[#a0a0a0]">
                  {order.customer.zone === "inside_dhaka"
                    ? `Estimated ${DELIVERY_CONFIG.estimatedDhaka} via Dhaka Express`
                    : `Estimated ${DELIVERY_CONFIG.estimatedOutsideDhaka} via RedX / SteadFast`}
                </p>

                {/* Progress tracker */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
                    <span className="text-xs font-semibold text-white">
                      Order Confirmed (Payment on Delivery)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#c9a227] animate-pulse" />
                    <span className="text-xs text-[#cccccc]">
                      Quality Inspection & Luxury Packaging
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#333333]" />
                    <span className="text-xs text-[#777777]">
                      Dispatched to Courier
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Items Ordered Breakdown */}
            <div className="md:col-span-6 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-4">
                <h3 className="font-serif text-base font-bold text-[#f8f8f6] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#c9a227]" />
                  <span>Ordered Garments ({order.items.length})</span>
                </h3>

                <div className="divide-y divide-[#202020]">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 flex gap-3">
                      <div className="relative w-14 h-16 rounded-lg bg-[#141414] overflow-hidden flex-shrink-0 border border-[#262626]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#f8f8f6] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#888888]">
                          Size: {item.size} • {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="text-xs font-bold text-[#e5c76b] mt-0.5">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-[#202020] space-y-2 text-xs">
                  <div className="flex justify-between text-[#888888]">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">
                      {formatPrice(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#888888]">
                    <span>Delivery</span>
                    <span className="text-white font-medium">
                      {order.deliveryFee === 0
                        ? "FREE"
                        : formatPrice(order.deliveryFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#202020] flex justify-between items-baseline font-bold text-sm">
                    <span className="text-white">Amount Due on Delivery</span>
                    <span className="text-lg text-[#e5c76b]">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-6 border border-[#242424] text-center space-y-2 text-xs text-[#888888]">
            <p className="text-white font-semibold">
              Order {orderId} is registered in our system.
            </p>
            <p>
              If you placed this order from a different device, our concierge has
              your information and will contact you via phone before dispatch.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-4 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#c9a227]/15"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-4 glass-card text-[#f8f8f6] hover:text-[#e5c76b] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
