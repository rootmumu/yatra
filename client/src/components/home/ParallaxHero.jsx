import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Calendar, Users, MapPin, Search, ChevronDown, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2, Download, Smartphone } from 'lucide-react';
import { getTodayDateString, getTomorrowDateString } from '../../utils/formatters';
import { usePWA } from '../../context/PWAContext';

const quickCategories = [
  { name: 'All Stays', value: 'All' },
  { name: 'A-Frames & Cabins', value: 'Cottages' },
  { name: 'Private Pool Villas', value: 'Private Villa' },
  { name: 'Luxury Resorts', value: 'Resorts' },
  { name: 'Glamping Tents', value: 'Camping & Glamping' },
  { name: 'Treehouses', value: 'Treehouse' }
];

export default function ParallaxHero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  const [location, setLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [checkIn, setCheckIn] = useState(getTodayDateString());
  const [checkOut, setCheckOut] = useState(getTomorrowDateString());
  const [guests, setGuests] = useState('2');
  const { isInstalled, openInstallModal } = usePWA();

  // Smooth scroll-based parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !contentRef.current) return;
      const scrollY = window.scrollY;
      // Parallax translation with reduced intensity for smooth performance
      bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0) scale(1.05)`;
      contentRef.current.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      contentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 750)}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location && location !== 'All') params.append('district', location);
    if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);
    navigate(`/stays?${params.toString()}`);
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24"
    >
      {/* Pristine Cinematic Background Layer (Clean, high-resolution Munnar & Western Ghats mist - ZERO watermarks) */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center will-change-transform transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2560&q=90')`,
          filter: 'brightness(0.68) contrast(1.08)'
        }}
      />

      {/* Layered Rich Overlays for High-Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a231b] via-[#0a231b]/50 to-[#0a231b]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a231b]/60 via-transparent to-[#0a231b]/60" />

      {/* Ambient Lighting Accents */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-4 sm:mt-8 w-full"
      >
        {/* Instagram Community Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide text-amber-300 mb-5 sm:mb-6 shadow-xl animate-in fade-in zoom-in-95 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Curated Highland Stays • Inspired by @yathra._ (58K Travelers)</span>
        </div>

        {/* Cinematic Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight leading-[1.08] text-white drop-shadow-lg">
          Find Your{' '}
          <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow">
            Escape.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-stone-200/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
          Secluded A-frame lofts, private pool villas, and mountain retreats across Munnar, Wayanad, and the Western Ghats.
        </p>

        {/* Quick Trust Pillars (Horizontal Pills) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-stone-200/90">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Personally Vetted</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent INR Rates</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
            <span>Direct Host WhatsApp Support</span>
          </span>
        </div>

        {/* Mobile PWA Install Quick Banner (Highly Visible on Mobile) */}
        {!isInstalled && (
          <div className="sm:hidden mt-5 mx-auto max-w-md p-3 rounded-2xl bg-[#0a231b]/90 backdrop-blur-md border border-amber-400/40 shadow-xl flex items-center justify-between gap-3 text-left animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 shrink-0 shadow">
                <div className="w-full h-full rounded-[10px] bg-[#0d221a] flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-white leading-tight">YATHRA Mobile App</h4>
                <p className="text-[10px] text-emerald-300 font-light">1-Tap Bookings • Fast & Offline Ready</p>
              </div>
            </div>
            <button
              type="button"
              onClick={openInstallModal}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] active:scale-95 text-white text-xs font-bold tracking-wide shadow flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          </div>
        )}

        {/* Interactive Floating Search Widget */}
        <div className="mt-8 sm:mt-12 w-full max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl text-stone-800 p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/50 text-left">
            {/* Quick Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-4 border-b border-stone-200/70 no-scrollbar">
              {quickCategories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-[#143d2f] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Form Fields Grid */}
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 1. Destination */}
                <div className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition-all focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/20">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-950 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>Destination</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs sm:text-sm text-stone-900 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Kerala & South India</option>
                    <option value="Idukki">Munnar & Marayoor (Idukki)</option>
                    <option value="Wayanad">Wayanad Valleys</option>
                    <option value="Idukki">Kuttikkanam & Vagamon</option>
                    <option value="Kodaikanal">Kodaikanal & Kookal</option>
                    <option value="Alappuzha">Alleppey Backwaters</option>
                  </select>
                </div>

                {/* 2. Check-In Date */}
                <div className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition-all focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/20">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-950 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>Check-In</span>
                  </label>
                  <input
                    type="date"
                    min={getTodayDateString()}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value >= checkOut) {
                        setCheckOut(getTomorrowDateString(e.target.value));
                      }
                    }}
                    className="w-full bg-transparent font-semibold text-xs sm:text-sm text-stone-900 focus:outline-none cursor-pointer"
                  />
                </div>

                {/* 3. Check-Out Date */}
                <div className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition-all focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/20">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-950 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>Check-Out</span>
                  </label>
                  <input
                    type="date"
                    min={getTomorrowDateString(checkIn)}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs sm:text-sm text-stone-900 focus:outline-none cursor-pointer"
                  />
                </div>

                {/* 4. Guests */}
                <div className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition-all focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/20">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-950 mb-1">
                    <Users className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>Guests</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs sm:text-sm text-stone-900 focus:outline-none cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests (Couple)</option>
                    <option value="4">4 Guests (Small Family)</option>
                    <option value="6">6 Guests (Group)</option>
                    <option value="8">8+ Guests (Villa Group)</option>
                    <option value="12">12+ Guests (Grand Reunion)</option>
                  </select>
                </div>

                {/* 5. Search Button */}
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="w-full h-full min-h-[52px] sm:min-h-[58px] px-6 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="whitespace-nowrap">Search Stays</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToCategories}
          className="mt-10 sm:mt-12 inline-flex flex-col items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-[11px] uppercase tracking-widest text-emerald-300/80 group-hover:text-emerald-300 font-medium">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-amber-400" />
        </button>
      </div>
    </section>
  );
}
