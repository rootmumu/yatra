import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ShieldCheck, Heart, Download, Sparkles } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { usePWA } from '../../context/PWAContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { openInstallModal, isInstalled } = usePWA();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Stays', path: '/stays' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-[#0a231b]/95 backdrop-blur-md shadow-xl py-3 border-b border-white/10'
            : 'bg-gradient-to-b from-[#0a231b]/90 via-[#0a231b]/50 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full rounded-full bg-[#0d221a] flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 fill-current">
                    <circle cx="50" cy="50" r="46" fill="#e59325" />
                    <circle cx="28" cy="24" r="7" fill="#fef08a" />
                    <polygon points="12,78 38,42 62,78" fill="#1b4d3e" />
                    <polygon points="38,42 46,54 36,54" fill="#ffffff" />
                    <polygon points="40,78 65,34 90,78" fill="#0d221a" />
                    <polygon points="65,34 74,48 60,48" fill="#ffffff" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-serif font-extrabold tracking-wider text-white group-hover:text-[#f4ba54] transition-colors leading-tight">
                  YATHRA
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-emerald-300/80 font-medium">
                  Find Your Escape
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all ${
                      isActive
                        ? 'text-white bg-white/15 shadow-sm font-semibold'
                        : 'text-stone-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Desktop PWA Install Button */}
              {!isInstalled && (
                <button
                  type="button"
                  onClick={openInstallModal}
                  className="px-3 py-1.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm cursor-pointer"
                  title="Install YATHRA Progressive Web App"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Install App</span>
                </button>
              )}

              {/* Instagram link */}
              <a
                href="https://www.instagram.com/yathra._/"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow @yathra._ on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e1306c]/90 text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              {/* Favorites link */}
              <Link
                to="/stays?favorites=true"
                className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                title="Saved Stays"
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Admin Portal shortcut */}
              <Link
                to={isAuthenticated ? '/admin' : '/admin/login'}
                className="px-2.5 py-1.5 rounded-full text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
                title="Host & Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin</span>
              </Link>

              {/* Main Find a Stay CTA Button */}
              <Link
                to="/stays"
                className="bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Find a Stay</span>
              </Link>
            </div>

            {/* Mobile Actions: Prominent PWA Install + Favorites + Hamburger */}
            <div className="flex items-center gap-1.5 md:hidden">
              {!isInstalled && (
                <button
                  type="button"
                  onClick={openInstallModal}
                  className="px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] text-white text-xs font-bold tracking-wide shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-amber-400/30"
                  title="Install YATHRA Progressive Web App"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Install App</span>
                </button>
              )}

              <Link
                to="/stays?favorites=true"
                className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Favorites"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a231b] border-t border-white/10 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Dedicated PWA Install Card in Mobile Drawer */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-[#143d2f] border border-emerald-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-[#0d221a] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-white">YATHRA Web App</h4>
                  <p className="text-[10px] text-stone-300">1-Tap Bookings & Offline Access</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInstallModal();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#e59325] text-white text-xs font-bold tracking-wide shadow flex items-center gap-1 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                      isActive ? 'bg-white/15 text-white font-semibold' : 'text-stone-300 hover:bg-white/10 text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                to="/stays"
                className="w-full bg-gradient-to-r from-[#d97706] to-[#e59325] text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 shadow-md"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Stays & Resorts</span>
              </Link>

              <div className="flex items-center justify-between pt-2 px-1 text-sm text-stone-300">
                <a
                  href="https://www.instagram.com/yathra._/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>@yathra._ (58K)</span>
                </a>

                <Link to="/admin" className="flex items-center gap-1 text-emerald-400 hover:underline text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
