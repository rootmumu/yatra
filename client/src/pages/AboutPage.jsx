import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, ShieldCheck, Mountain, Users, ArrowRight } from 'lucide-react';
import InstagramIcon from '../components/common/InstagramIcon';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-16 h-80 sm:h-96 shadow-xl flex items-center justify-center text-center p-6 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/yathra/marayoor-jacaranda-valleys.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a231b] via-[#0a231b]/60 to-[#0a231b]/70" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-wider border border-white/20 inline-block">
              Our Journey & Ethos
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight">
              In Love With Travel.
            </h1>
            <p className="text-stone-200 text-sm sm:text-lg font-light leading-relaxed">
              "കണ്ടത് മനോഹരം കാണാത്തത് അതിമനോഹരം" — What we have seen is beautiful; what remains undiscovered is extraordinary.
            </p>
          </div>
        </div>

        {/* Brand Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#d97706] font-bold block">
              The YATHRA Origin
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a231b] leading-tight">
              From an Instagram Community to Curated Highland Stays
            </h2>
            <p className="text-stone-700 leading-relaxed text-base font-light">
              YATHRA began with a simple passion: traversing the winding mountain ghats of Munnar, Vagamon, Wayanad, and Kodaikanal to uncover quiet places far from the tourist crowds. Through our Instagram page <strong>@yathra._</strong>, over <strong>58,000 passionate travelers</strong> connected over misty sunrises, hidden waterfall trails, and starlit campsites.
            </p>
            <p className="text-stone-700 leading-relaxed text-base font-light">
              Today, YATHRA bridges that passion into reality. We hand-select and partner directly with local property hosts to offer exceptional A-frame timber cabins, cliff-edge cottages, private pool villas, and plantation homestays with 100% transparent pricing and personal host support.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/yathra._/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-md hover:scale-105 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Visit @yathra._ Instagram</span>
              </a>

              <Link
                to="/stays"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#143d2f] text-white font-semibold text-sm hover:bg-[#0a231b] transition-colors"
              >
                <span>Browse Stays</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
              <img
                src="/images/yathra/kuttikkanam-aframe-night.jpg"
                alt="Yathra Stay Experience"
                className="w-full h-[440px] object-cover"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-stone-200 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#d97706] flex items-center justify-center font-serif font-black text-xl">
                  58K
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Travel Community</span>
                  <span className="text-xs text-stone-500">Across Kerala & South India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-stone-200">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Mountain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Untouched Nature</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Every stay is chosen for its intimate relationship with nature—whether perched over deep tea valleys or beside crystal streams.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#d97706] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900">No Hidden Fees</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Transparent per-night rates in Indian Rupees (₹) with clear date calculations so you always know your exact expenditure.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Direct Host Connection</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Quick enquiries routed to responsive property owners who welcome you with warm Kerala hospitality and home-cooked meals.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
