"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-[#080808] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 glass-card rounded-3xl p-8 sm:p-12 border border-[#242424] shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center mx-auto text-[#ef4444]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#ef4444]">
            System Notification
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#f8f8f6]">
            Something went wrong
          </h1>
          <p className="text-xs text-[#888888] leading-relaxed">
            We encountered an unexpected issue while loading this page. Please try
            refreshing or return to our shop.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-[#181818] hover:bg-[#222222] text-[#f8f8f6] font-semibold text-xs uppercase tracking-widest rounded-xl border border-[#2b2b2b] transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
