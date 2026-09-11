import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#080808] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 glass-card rounded-3xl p-8 sm:p-12 border border-[#242424] shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center mx-auto text-[#c9a227]">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c9a227]">
            404 Error
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
            The luxury piece or page you are seeking is either discontinued,
            renamed, or temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
          >
            Return Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 bg-[#181818] hover:bg-[#222222] text-[#f8f8f6] font-semibold text-xs uppercase tracking-widest rounded-xl border border-[#2b2b2b] transition-colors"
          >
            Browse All Items
          </Link>
        </div>
      </div>
    </div>
  );
}
