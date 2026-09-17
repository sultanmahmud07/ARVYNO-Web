import { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ARVYNO data protection and customer privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6] mt-3">
            Privacy Policy
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
              1. Information We Collect
            </h2>
            <p>
              When you place a guest order with ARVYNO, we collect your full name,
              contact phone number, delivery address, city, and optional email
              address solely for order fulfillment, courier dispatch, and customer
              care communications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              2. Cookies & Local Storage
            </h2>
            <p>
              We utilize essential browser cookies and local storage to preserve
              your guest shopping bag items and wishlist preferences across sessions
              without requiring you to create an account. No tracking or sensitive
              financial information is stored in client cookies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              3. Data Security & Third Parties
            </h2>
            <p>
              We do not sell or lease your personal contact details to third-party
              marketing companies. Your address and phone number are shared
              exclusively with authorized courier riders for physical delivery of
              your package.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-white">
              4. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions regarding your data or would like your
              order history purged, please email us at{" "}
              <a href={`mailto:${BRAND.contact.email}`} className="text-[#e5c76b] hover:underline">
                {BRAND.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
