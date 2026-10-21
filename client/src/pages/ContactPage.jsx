import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const faqs = [
  {
    q: 'How does booking work through YATHRA?',
    a: 'When you select your stay dates and guests, our system calculates the total accommodation price in INR. Once you submit the enquiry form or message us on WhatsApp, our travel coordinators immediately verify live room availability with the host and share confirmation within 15–30 minutes.'
  },
  {
    q: 'Can I pay on arrival or is an advance required?',
    a: 'Depending on the property (especially private villas and secluded cabins), an advance date reservation token (typically 20% to 50%) is arranged directly with the host to lock your dates. The remaining balance is paid directly upon check-in.'
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Most stays offer free cancellation up to 48 hours to 5 days prior to check-in. In case of unexpected monsoon weather warnings or road advisories, flexible rescheduling is provided in collaboration with the property.'
  },
  {
    q: 'Are these stays family and couple friendly?',
    a: 'Yes, absolutely. We explicitly tag our properties with capacities and vibes (e.g. Couples Friendly, Family Estate, Biker Friendly). Valid government photo IDs are required for all staying guests during check-in.'
  },
  {
    q: 'How do I list my property with YATHRA?',
    a: 'If you manage an A-frame cabin, camping retreat, estate villa, or heritage homestay in Kerala or South India, reach out to us via WhatsApp or email with your photos and location. Our curation team will schedule a visit!'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-bold block mb-2">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#0a231b] tracking-tight">
            We Are Here to Guide Your Journey
          </h1>
          <p className="mt-3 text-stone-600 text-base sm:text-lg font-light">
            Have questions about a property, dates, or custom travel itineraries? Speak with our team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Card 1: WhatsApp */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Instant WhatsApp</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Chat with our stay coordinators in real time for lightning-fast room verification.
              </p>
            </div>
            <a
              href="https://wa.me/919072442250?text=Hi%20YATHRA!%20I%20have%20an%20enquiry%20regarding%20stays"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1faa4e] text-white font-semibold text-xs text-center block shadow transition-all hover:scale-[1.02]"
            >
              Open WhatsApp Chat
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#d97706] flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Call Direct</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Available daily from 08:00 AM to 09:00 PM IST for urgent booking questions.
              </p>
            </div>
            <a
              href="tel:+919072442250"
              className="py-3 px-4 rounded-xl bg-[#143d2f] hover:bg-[#0a231b] text-white font-semibold text-xs text-center block shadow transition-colors"
            >
              +91 90724 42250
            </a>
          </div>

          {/* Card 3: Instagram */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#e1306c] flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Destinations</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Operating across Munnar, Wayanad, Kuttikkanam, Vagamon, Kookal, and Alleppey.
              </p>
            </div>
            <span className="py-3 px-4 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs text-center block">
              Kerala & South India
            </span>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a231b] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-stone-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-stone-900 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-stone-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-light bg-stone-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
