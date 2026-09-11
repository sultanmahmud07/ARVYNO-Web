import { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { RotateCcw, Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Exchanges Policy",
  description:
    "7-day easy exchange and return policy for ARVYNO garments in Bangladesh.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Returns & Exchanges" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6] mt-3">
            Returns & Size Exchanges
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-1.5 max-w-xl">
            We want every ARVYNO piece to fit you with absolute perfection.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#242424] space-y-6">
          <div className="flex items-center gap-3 text-[#c9a227]">
            <RotateCcw className="w-6 h-6" />
            <h2 className="font-serif text-xl font-bold text-white">
              7-Day Hassle-Free Exchange Policy
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed">
            If your garment does not fit as desired or if you wish to exchange it
            for a different colorway or size, you may initiate an exchange within
            7 days of receiving your delivery.
          </p>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Eligibility Conditions:
            </h3>
            <ul className="space-y-2 text-xs text-[#888888]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                <span>Garment must be unworn, unwashed, and in original condition.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                <span>Original brand hangtag and interior labels must remain attached.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                <span>Return in the original luxury ARVYNO packaging box.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#202020] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              How to Request an Exchange:
            </h3>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Simply message our concierge on WhatsApp at{" "}
              <span className="text-[#e5c76b] font-semibold">+880 1700-000000</span>{" "}
              with your Order Number. Our rider will deliver the replacement size
              to your doorstep and collect the return item simultaneously.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e5c76b] hover:text-white"
          >
            Need assistance? Contact our Concierge →
          </Link>
        </div>
      </div>
    </div>
  );
}
