"use client";

import React, { useState } from "react";
import { BRAND } from "@/lib/constants";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.phone) {
      setSubmitted(true);
      setForm({ name: "", phone: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Header */}
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact Concierge" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6] mt-3">
            Concierge & Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-1.5 max-w-xl">
            Whether you need sizing guidance, order tracking, or styling advice,
            our Banani atelier team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-5">
              <h3 className="font-serif text-lg font-bold text-white">
                Direct Inquiries
              </h3>

              <div className="space-y-4 text-xs text-[#a0a0a0]">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Customer Hotline</p>
                    <p>{BRAND.contact.phone}</p>
                    <p className="text-[11px] text-[#777777]">
                      Direct WhatsApp support available
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Email Concierge</p>
                    <p>{BRAND.contact.email}</p>
                    <p className="text-[11px] text-[#777777]">
                      Response within 4 business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Flagship Atelier</p>
                    <p>{BRAND.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Operating Hours</p>
                    <p>{BRAND.contact.supportHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#101010] border border-[#1f1f1f] space-y-2 text-xs text-[#888888]">
              <p className="text-white font-semibold">Track an Existing Order</p>
              <p>
                Have your Order Reference Number (e.g. ARV-XXXX) ready and message
                our WhatsApp hotline for real-time dispatch updates.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-[#242424] space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">
                Send a Message to the Concierge
              </h3>

              {submitted ? (
                <div className="p-6 bg-[#c9a227]/20 border border-[#c9a227]/40 rounded-xl text-[#e5c76b] text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#c9a227] mx-auto" />
                  <p className="font-serif text-base font-bold text-white">
                    Thank You for Your Message
                  </p>
                  <p className="text-xs text-[#cccccc]">
                    Our concierge representative will reach out to your phone
                    number shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#cccccc] font-medium mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sultan Mahmud"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] focus:outline-none focus:border-[#c9a227]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#cccccc] font-medium mb-1.5">
                      Mobile Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01700-000000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] focus:outline-none focus:border-[#c9a227]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#cccccc] font-medium mb-1.5">
                      Message / Inquiry Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can our atelier assist you today?"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-2.5 text-xs text-[#f8f8f6] focus:outline-none focus:border-[#c9a227]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
