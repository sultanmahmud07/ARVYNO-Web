import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#080808] flex flex-col items-center justify-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#222222]" />
        <div className="absolute inset-0 rounded-full border-2 border-[#c9a227] border-t-transparent animate-spin" />
      </div>
      <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#c9a227]">
        Loading ARVYNO Atelier...
      </p>
    </div>
  );
}
