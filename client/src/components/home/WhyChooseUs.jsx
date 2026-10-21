import React from 'react';
import { ShieldCheck, IndianRupee, MessageSquareCheck, HeartHandshake, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Personally Vetted Stays',
    description: 'We do not list mass generic hotels. Every A-frame cabin, cliffside cottage, and tea plantation homestay is hand-inspected for cleanliness, scenery, and hospitality.'
  },
  {
    icon: IndianRupee,
    title: '100% Transparent INR Pricing',
    description: 'Direct per-night pricing in Indian Rupees (₹) with clear automatic calculation. What you see is exactly what you pay, with zero surprise hidden platform fees.'
  },
  {
    icon: MessageSquareCheck,
    title: 'Hassle-Free Booking Enquiry',
    description: 'Submit an instant booking enquiry or connect directly via WhatsApp. Receive direct host availability confirmation without rigid payment lock-ins.'
  },
  {
    icon: HeartHandshake,
    title: 'Local Kerala Host Guidance',
    description: 'Get insider tips on hidden waterfall treks, seasonal cloud-viewing sunrise spots, 4x4 jeep safari routes, and authentic homemade Malabar cuisine.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#faf8f5] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>The YATHRA Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0a231b] tracking-tight">
            Why Travelers Choose YATHRA
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Born from a passion for authentic travel and nature exploration. Here is how we make your journey seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#143d2f]/10 text-[#143d2f] flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">
                  {b.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed flex-1">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
