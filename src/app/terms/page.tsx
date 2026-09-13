import { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for purchasing from ARVYNO Atelier.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6] mt-3">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-1.5">
            Effective Date: September 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#242424] space-y-6 text-xs sm:text-sm text-[#a0a0a0] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and placing an order on www.arvynobd.com, you agree to be
              bound by these terms of service, our shipping policies, and our
              return guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              2. Product Descriptions & Pricing
            </h2>
            <p>
              We strive to display our garments, colors, and fabric specifications
              with absolute accuracy. All prices are listed in Bangladeshi Taka
              (BDT ৳) and include applicable trade taxes. ARVYNO reserves the
              right to adjust pricing or discontinue items without prior notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              3. Cash on Delivery Commitment
            </h2>
            <p>
              When placing a Cash on Delivery order, you agree to receive and
              tender payment to the authorized courier rider upon arrival. Orders
              may be verified via automated phone confirmation prior to dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              4. Intellectual Property
            </h2>
            <p>
              The ARVYNO trademark, logo monogram, visual photography, and brand
              slogan &quot;WEAR YOUR IDENTITY&quot; are the exclusive intellectual
              property of ARVYNO Atelier Ltd.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
