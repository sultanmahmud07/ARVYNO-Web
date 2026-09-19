"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getOrderById } from "@/lib/services/order-service";
import { Order } from "@/types/order";
import { formatPrice, generateWhatsAppOrderUrl } from "@/lib/utils";
import { DELIVERY_CONFIG, BRAND } from "@/lib/constants";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Phone,
  ArrowRight,
  Printer,
  Sparkles,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

function formatInvoiceDate(isoDate?: string) {
  if (!isoDate) {
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return isoDate;
  }
}

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
    <>
      {/* =========================================================================
          1. PRINT-ONLY OFFICIAL INVOICE RECEIPT (FITS 1 SINGLE A4 PAGE)
          ========================================================================= */}
      {order && (
        <div className="hidden print:block print-invoice-page bg-white text-black p-6 font-sans antialiased max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start pb-4 border-b-2 border-neutral-900">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-extrabold tracking-[0.2em] text-black">
                  {BRAND.name}
                </span>
                <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 border border-black rounded uppercase">
                  ATELIER
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase">
                {BRAND.tagline}
              </p>
              <div className="text-[10px] text-neutral-600 leading-tight pt-1 space-y-0.5">
                <p>{BRAND.contact.address}</p>
                <p>
                  <span className="font-semibold text-black">Phone:</span> {BRAND.contact.phone} •{" "}
                  <span className="font-semibold text-black">WhatsApp:</span> {BRAND.contact.whatsappDisplay}
                </p>
                <p>
                  <span className="font-semibold text-black">Email:</span> {BRAND.contact.email} •{" "}
                  <span className="font-semibold text-black">Web:</span> {BRAND.domain}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                Official Retail Invoice
              </div>
              <p className="font-mono text-base font-extrabold text-black pt-1">
                {order.id}
              </p>
              <p className="text-[10px] text-neutral-600">
                Date: <span className="font-medium text-black">{formatInvoiceDate(order.createdAt)}</span>
              </p>
              <p className="text-[10px] text-neutral-600">
                Payment: <span className="font-bold text-black uppercase">Cash on Delivery</span>
              </p>
              <div className="inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300">
                Status: Confirmed & Logged
              </div>
            </div>
          </div>

          {/* 2-Column Info Grid */}
          <div className="grid grid-cols-2 gap-4 py-3 border-b border-neutral-300 text-[11px]">
            {/* Bill & Ship To */}
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 space-y-1">
              <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                Customer & Delivery Destination
              </p>
              <p className="font-bold text-black text-xs">
                {order.customer.fullName}
              </p>
              <p className="text-neutral-800">
                <span className="font-semibold">Phone:</span> {order.customer.phone}
              </p>
              {order.customer.email && (
                <p className="text-neutral-600">
                  <span className="font-semibold">Email:</span> {order.customer.email}
                </p>
              )}
              <p className="text-neutral-800 leading-snug">
                <span className="font-semibold">Address:</span> {order.customer.address}, {order.customer.city}
                {order.customer.postalCode ? ` - ${order.customer.postalCode}` : ""}
              </p>
            </div>

            {/* Courier & Shipping Route */}
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 space-y-1">
              <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                Fulfillment & Logistics
              </p>
              <p className="text-neutral-800">
                <span className="font-semibold">Delivery Zone:</span>{" "}
                {order.customer.zone === "inside_dhaka" ? "Inside Dhaka City" : "Outside Dhaka"}
              </p>
              <p className="text-neutral-800">
                <span className="font-semibold">Courier Partner:</span>{" "}
                {order.customer.zone === "inside_dhaka"
                  ? "Dhaka Express"
                  : "Steadfast / RedX"}
              </p>
              <p className="text-neutral-800">
                <span className="font-semibold">Estimated Time:</span>{" "}
                {order.customer.zone === "inside_dhaka"
                  ? DELIVERY_CONFIG.estimatedDhaka
                  : DELIVERY_CONFIG.estimatedOutsideDhaka}
              </p>
              {order.customer.deliveryNote && (
                <p className="text-neutral-800 italic">
                  <span className="font-semibold not-italic">Note:</span> &quot;{order.customer.deliveryNote}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="py-3">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b-2 border-neutral-900 bg-neutral-100 text-black font-bold uppercase text-[9px] tracking-wider">
                  <th className="py-2 px-2 text-center w-8">#</th>
                  <th className="py-2 px-2">Garment Description</th>
                  <th className="py-2 px-2 text-center">Size</th>
                  <th className="py-2 px-2 text-center">Color</th>
                  <th className="py-2 px-2 text-right">Unit Price</th>
                  <th className="py-2 px-2 text-center">Qty</th>
                  <th className="py-2 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, idx) => (
                  <tr key={item.id} className="text-neutral-800">
                    <td className="py-2 px-2 text-center text-neutral-500 font-mono text-[10px]">
                      {idx + 1}
                    </td>
                    <td className="py-2 px-2 font-medium text-black">
                      {item.name}
                    </td>
                    <td className="py-2 px-2 text-center font-semibold text-black">
                      {item.size}
                    </td>
                    <td className="py-2 px-2 text-center text-neutral-600">
                      {item.color}
                    </td>
                    <td className="py-2 px-2 text-right font-mono">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-2 px-2 text-center font-bold text-black">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-black font-mono">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Notes Summary */}
          <div className="flex justify-between items-start pt-2 border-t-2 border-neutral-900 text-[11px]">
            {/* Left: Customer instructions & terms */}
            <div className="w-7/12 pr-4 space-y-1.5 text-[10px] text-neutral-600">
              <p className="font-bold text-black uppercase tracking-wider text-[9px]">
                Customer Notice & Exchange Policy:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-neutral-700 leading-snug">
                <li>Please inspect garment condition upon delivery.</li>
                <li>Size/fit exchange is valid within 7 days with intact barcode & tag.</li>
                <li>Care Helpline: <strong className="text-black">{BRAND.contact.phone}</strong> | WhatsApp: <strong className="text-black">{BRAND.contact.whatsappDisplay}</strong></li>
              </ul>
              <p className="text-[9px] text-neutral-500 pt-1">
                * Computer-generated official retail sales invoice from arvynobd.com.
              </p>
            </div>

            {/* Right: Subtotal, Delivery Fee & Total Due */}
            <div className="w-5/12 space-y-1.5">
              <div className="bg-neutral-50 p-3 rounded border border-neutral-200 space-y-1">
                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium text-black">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>Delivery Charge:</span>
                  <span className="font-mono font-medium text-black">
                    {order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-neutral-700">
                    <span>Discount:</span>
                    <span className="font-mono text-black">-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-neutral-300 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-black uppercase">Amount Due (COD):</span>
                  <span className="font-mono font-black text-base text-black">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
              <div className="text-center text-[10px] font-bold text-neutral-900 bg-neutral-100 py-1 rounded border border-neutral-300 uppercase tracking-wider">
                Payment: Cash on Delivery
              </div>
            </div>
          </div>

          {/* Bottom Dispatch Sign-off */}
          <div className="pt-4 mt-4 border-t border-dashed border-neutral-300 flex justify-between items-end text-[9px] text-neutral-500">
            <div>
              <p className="font-semibold text-black uppercase tracking-wider">
                ARVYNO LUXURY ATELIER — DHAKA, BANGLADESH
              </p>
              <p>Thank you for expressing your identity with ARVYNO.</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-neutral-400 mb-1" />
              <p className="uppercase tracking-widest text-neutral-600 font-semibold">Authorized Dispatch</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. SCREEN INTERACTIVE LUXURY VIEW (HIDDEN DURING PRINT)
          ========================================================================= */}
      <div className="min-h-screen bg-[#080808] pb-24 pt-8 sm:pt-12 print:hidden">
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

            {/* WhatsApp Direct Order Push Banner */}
            {order && (
              <div className="pt-2 max-w-lg mx-auto">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d2215] via-[#09180e] to-[#0d2215] border border-[#25D366]/40 shadow-2xl shadow-[#25D366]/15 space-y-3.5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[11px] font-bold text-[#4ade80] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                    <span>Instant WhatsApp Confirmation</span>
                  </div>

                  <p className="text-xs text-[#d1d5db] leading-relaxed">
                    Send your order details directly to our official WhatsApp (<span className="text-white font-semibold">{BRAND.contact.whatsappDisplay}</span>) for priority dispatch and color selection.
                  </p>

                  <a
                    href={generateWhatsAppOrderUrl(order, BRAND.contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#25D366] via-[#22c55e] to-[#16a34a] hover:brightness-110 active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-[0.15em] rounded-xl shadow-lg shadow-[#25D366]/30 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>Send Order to WhatsApp ({BRAND.contact.whatsappDisplay})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
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
            {order && (
              <a
                href={generateWhatsAppOrderUrl(order, BRAND.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 bg-[#25D366] hover:bg-[#22c55e] text-black font-bold text-xs uppercase tracking-[0.15em] rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>WhatsApp Concierge</span>
              </a>
            )}

            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#c9a227]/15"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-4 glass-card text-[#f8f8f6] hover:text-[#e5c76b] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
