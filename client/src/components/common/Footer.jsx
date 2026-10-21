import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail, MapPin, Compass, Shield, ArrowUp, Download, Smartphone } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { usePWA } from '../../context/PWAContext';

export default function Footer() {
  const { isInstalled, openInstallModal } = usePWA();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a231b] text-stone-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#0d221a] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-7 h-7 fill-current">
                    <circle cx="50" cy="50" r="46" fill="#e59325" />
                    <circle cx="28" cy="24" r="7" fill="#fef08a" />
                    <polygon points="12,78 38,42 62,78" fill="#1b4d3e" />
                    <polygon points="40,78 65,34 90,78" fill="#0d221a" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-serif font-black tracking-wider text-white">YATHRA</span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">Find Your Escape</span>
              </div>
            </Link>

            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Discover handpicked hill station resorts, glass A-frame cabins, luxury camping tents, and serene plantation homestays across Munnar, Wayanad, Idukki, Vagamon, and South India.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-emerald-200/90 leading-relaxed max-w-sm">
              <p className="font-serif italic text-sm text-amber-300 mb-0.5">
                "പ്രണയമാണ് യാത്രയോട് ❤️"
              </p>
              <p className="text-stone-300">
                കണ്ടത് മനോഹരം, കാണാത്തത് അതിമനോഹരം. ഒപ്പം യാത്ര ചെയ്യാം പുതിയ ലോകത്തേക്ക്.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/yathra._/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#e1306c] text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919072442250?text=Hi%20YATHRA!%20I%20would%20like%20to%20enquire%20about%20stay%20bookings"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stay Categories */}
          <div>
            <h4 className="text-white font-serif font-semibold text-base mb-4 tracking-wide">
              Stay Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/stays?category=Resorts" className="hover:text-emerald-300 transition-colors">
                  Luxury Resorts
                </Link>
              </li>
              <li>
                <Link to="/stays?category=Camping%20%26%20Glamping" className="hover:text-emerald-300 transition-colors">
                  Camping & Glamping
                </Link>
              </li>
              <li>
                <Link to="/stays?category=Cottages" className="hover:text-emerald-300 transition-colors">
                  A-Frames & Cottages
                </Link>
              </li>
              <li>
                <Link to="/stays?category=Private%20Villa" className="hover:text-emerald-300 transition-colors">
                  Private Pool Villas
                </Link>
              </li>
              <li>
                <Link to="/stays?category=Homestays" className="hover:text-emerald-300 transition-colors">
                  Plantation Homestays
                </Link>
              </li>
              <li>
                <Link to="/stays?category=Treehouse" className="hover:text-emerald-300 transition-colors">
                  Nature Treehouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-serif font-semibold text-base mb-4 tracking-wide">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/stays?district=Idukki" className="hover:text-emerald-300 transition-colors">
                  Munnar & Marayoor
                </Link>
              </li>
              <li>
                <Link to="/stays?district=Wayanad" className="hover:text-emerald-300 transition-colors">
                  Wayanad Valleys
                </Link>
              </li>
              <li>
                <Link to="/stays?district=Idukki" className="hover:text-emerald-300 transition-colors">
                  Kuttikkanam Stays
                </Link>
              </li>
              <li>
                <Link to="/stays?district=Idukki" className="hover:text-emerald-300 transition-colors">
                  Vagamon Meadows
                </Link>
              </li>
              <li>
                <Link to="/stays?district=Kodaikanal" className="hover:text-emerald-300 transition-colors">
                  Kookal & Kodaikanal
                </Link>
              </li>
              <li>
                <Link to="/stays?district=Alappuzha" className="hover:text-emerald-300 transition-colors">
                  Alleppey Backwaters
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Enquiries & Support */}
          <div>
            <h4 className="text-white font-serif font-semibold text-base mb-4 tracking-wide">
              Direct Enquiry
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span>Munnar, Idukki & Wayanad, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919072442250" className="hover:text-white transition-colors">
                  +91 90724 42250
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:bookings@yathra.com" className="hover:text-white transition-colors">
                  bookings@yathra.com
                </a>
              </li>
              <li className="pt-2 flex flex-col gap-2">
                {!isInstalled && (
                  <button
                    type="button"
                    onClick={openInstallModal}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors py-1 cursor-pointer font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Install YATHRA App (PWA)</span>
                  </button>
                )}
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-300 py-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin & Host Management</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div>
            <p>© {new Date().getFullYear()} YATHRA Travels & Stays. All rights reserved.</p>
            <p className="text-[11px] text-stone-400 mt-1">
              Demonstration booking portal for @yathra._. All prices in Indian Rupees (₹).
            </p>
          </div>

          <div className="flex items-center gap-6 text-stone-300">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Cancellation Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
