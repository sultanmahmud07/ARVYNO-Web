"use client";

import React, { useState } from "react";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-[#080808] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="scale" duration={700}>
          <div className="glass-card-gold rounded-3xl p-8 sm:p-14 space-y-6 relative overflow-hidden animate-border-breathing">
            {/* Subtle gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/10 rounded-full blur-[90px] pointer-events-none animate-pulse-glow" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c9a227]/15 border border-[#c9a227]/30 text-xs font-semibold text-[#e5c76b] uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a227] animate-pulse" />
              <span>Private Members Club</span>
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f8f6] tracking-tight">
                JOIN THE ARVYNO SOCIETY
              </h2>
              <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
                Be the first to access limited-quantity drops, private trunk shows,
                and styling editorials. Enjoy complimentary express delivery on your
                first order.
              </p>
            </div>

            {submitted ? (
              <div className="max-w-md mx-auto p-4 bg-[#c9a227]/20 border border-[#c9a227]/40 rounded-xl text-[#e5c76b] flex items-center justify-center gap-2 text-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-[#c9a227]" />
                <span>Welcome to ARVYNO. Check your inbox for your welcome privilege.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email"
                  className="flex-1 bg-[#161616] border border-[#2d2d2d] rounded-xl px-4 py-3.5 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227] transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] hover:brightness-110 active:scale-[0.98] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-[#c9a227]/15 group cursor-pointer"
                >
                  <span>Request Access</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#666666]">
              We value your privacy. Unsubscribe anytime with one click.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
