import { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { DELIVERY_CONFIG } from "@/lib/constants";
import { Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "ARVYNO express delivery policy across Dhaka and all 64 districts in Bangladesh.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Shipping & Delivery" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6] mt-3">
            Shipping & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-1.5 max-w-xl">
            Reliable, tracked, and insured doorstep delivery across Bangladesh.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {/* Highlight Card */}
        <div className="p-6 rounded-2xl glass-card-gold border border-[#c9a227]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#c9a227]/20 rounded-xl text-[#c9a227]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white">
                Complimentary Shipping Privilege
              </h3>
              <p className="text-xs text-[#a0a0a0]">
                Enjoy Free Express Delivery anywhere in Bangladesh on orders over
                ৳{DELIVERY_CONFIG.freeDeliveryThreshold}.
              </p>
            </div>
          </div>
        </div>

        {/* Rates & Zones Table */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#242424] space-y-6">
          <h2 className="font-serif text-xl font-bold text-white">
            Delivery Zones & Rates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#141414] border border-[#282828] space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Inside Dhaka City</h3>
                <span className="text-xs font-bold text-[#e5c76b]">৳80</span>
              </div>
              <p className="text-xs text-[#888888] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c9a227]" />
                Estimated: {DELIVERY_CONFIG.estimatedDhaka}
              </p>
              <p className="text-[11px] text-[#777777] pt-1">
                Handled by our dedicated priority courier riders.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141414] border border-[#282828] space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Outside Dhaka (All BD)</h3>
                <span className="text-xs font-bold text-[#e5c76b]">৳150</span>
              </div>
              <p className="text-xs text-[#888888] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c9a227]" />
                Estimated: {DELIVERY_CONFIG.estimatedOutsideDhaka}
              </p>
              <p className="text-[11px] text-[#777777] pt-1">
                Doorstep delivery to all 64 districts via premium courier partners.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#202020] text-xs text-[#a0a0a0] leading-relaxed">
            <h3 className="text-sm font-bold text-white">Order Processing & Dispatch</h3>
            <p>
              All orders placed before 3:00 PM (Bangladesh Standard Time) are
              processed and packaged on the same business day following phone
              verification by our concierge.
            </p>
            <p>
              Each garment is individually steam-pressed, folded in tissue, and
              sealed in our custom matte black ARVYNO luxury packaging box to
              guarantee pristine condition upon arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
