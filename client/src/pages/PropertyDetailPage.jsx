import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapPin, Users, Bed, Bath, Star, Heart, ArrowLeft, Share2,
  CheckCircle2, Clock, ShieldCheck, Flame, Wifi, Car, Waves,
  Utensils, Coffee, Trees, Eye, Sparkles, MessageSquare
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BookingWidget from '../components/stays/BookingWidget';
import PropertyCard from '../components/stays/PropertyCard';
import { getPropertyById, getProperties } from '../services/api';
import { formatINR } from '../utils/formatters';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [property, setProperty] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  const initialDates = {
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: searchParams.get('guests') || '2'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    getPropertyById(id)
      .then((res) => {
        if (res.data.success) {
          setProperty(res.data.data);
          // Fetch related properties in same category
          getProperties({ category: res.data.data.category })
            .then((relRes) => {
              if (relRes.data.success) {
                setRelatedProperties(relRes.data.data.filter((p) => p.id !== id).slice(0, 3));
              }
            })
            .catch(() => {});
        } else {
          setProperty(null);
        }
      })
      .catch((err) => {
        console.error('Error fetching property:', err);
        setProperty(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.name || 'YATHRA Stay',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="h-8 w-48 bg-stone-200 rounded animate-pulse mb-6" />
          <div className="h-[480px] w-full bg-stone-200 rounded-3xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-10 bg-stone-200 rounded animate-pulse" />
              <div className="h-40 bg-stone-200 rounded animate-pulse" />
            </div>
            <div className="h-96 bg-stone-200 rounded-3xl animate-pulse" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Stay Not Found</h2>
          <p className="text-stone-600 mb-6">The accommodation you requested could not be located or may be inactive.</p>
          <Link
            to="/stays"
            className="px-6 py-3 rounded-full bg-[#143d2f] text-white font-semibold text-sm hover:bg-[#0a231b] transition-colors"
          >
            Explore Other Stays
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'];

  const favorite = isFavorite(property.id);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        {/* Navigation Breadcrumbs & Actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stays</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors shadow-sm relative"
              title="Share stay"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -top-8 -left-6 bg-stone-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
              title={favorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#143d2f]/10 text-[#143d2f] text-xs font-bold tracking-wide">
              {property.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{property.rating ? property.rating.toFixed(1) : '4.9'}</span>
              <span className="font-normal text-stone-500">({property.reviewCount || 42} reviews)</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#0a231b] tracking-tight">
            {property.name}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-stone-600 text-sm">
            <MapPin className="w-4 h-4 text-[#d97706]" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Large Photo Gallery */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 h-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-lg bg-stone-100">
            {/* Main Featured Photo */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="md:col-span-3 relative h-full cursor-pointer overflow-hidden group"
            >
              <img
                src={images[activeImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover zoom-card-image"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>View Fullscreen</span>
              </div>
            </div>

            {/* Thumbnails Column */}
            <div className="hidden md:flex flex-col gap-3 h-full overflow-y-auto">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative flex-1 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImageIndex === i ? 'border-[#d97706] scale-[0.98]' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${property.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Thumbnails Row */}
          <div className="flex md:hidden gap-2 mt-2 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 ${
                  activeImageIndex === i ? 'border-[#d97706]' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content & Sticky Booking Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Property Key Overview Stats */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-3xl bg-white border border-stone-200/80 shadow-sm text-center">
              <div>
                <span className="text-xs text-stone-500 block">Guests</span>
                <span className="text-base sm:text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Users className="w-4 h-4 text-emerald-800" />
                  <span>Up to {property.guestCapacity}</span>
                </span>
              </div>
              <div className="border-x border-stone-100">
                <span className="text-xs text-stone-500 block">Bedrooms</span>
                <span className="text-base sm:text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Bed className="w-4 h-4 text-emerald-800" />
                  <span>{property.bedrooms || 1} Room{property.bedrooms > 1 ? 's' : ''}</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Bathrooms</span>
                <span className="text-base sm:text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                  <Bath className="w-4 h-4 text-emerald-800" />
                  <span>{property.bathrooms || 1} Bath</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0a231b] mb-4">
                About this stay
              </h2>
              <p className="text-stone-700 leading-relaxed text-base sm:text-lg whitespace-pre-line font-light">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0a231b] mb-5">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.amenities?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span className="text-sm font-medium text-stone-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0a231b] mb-4">
                House Rules & Policies
              </h2>
              <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-3">
                {property.houseRules?.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <Clock className="w-4 h-4 text-[#d97706] mt-0.5 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0a231b] mb-3">
                Cancellation Policy
              </h2>
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-sm text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  {property.cancellationPolicy || 'Free cancellation up to 48 hours before check-in. Contact host on WhatsApp for emergency reschedule.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingWidget property={property} initialDates={initialDates} />
            </div>
          </div>
        </div>

        {/* Related Stays */}
        {relatedProperties.length > 0 && (
          <div className="mt-20 pt-16 border-t border-stone-200">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a231b] mb-8">
              Similar Stays You May Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={images[activeImageIndex]}
            alt="Fullscreen view"
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl"
          />
        </div>
      )}

      {/* Mobile Sticky Booking Footer Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#0a231b]">{formatINR(property.pricePerNight)}</span>
            <span className="text-xs text-stone-500 font-medium">/ night</span>
          </div>
        </div>

        <button
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d97706] to-[#e59325] text-white font-bold text-sm tracking-wide shadow-md"
        >
          Book / Enquire
        </button>
      </div>

      <Footer />
    </div>
  );
}
