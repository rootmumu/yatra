import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Bed, Star, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { useFavorites } from '../../context/FavoritesContext';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const coverImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 transition-all duration-300 flex flex-col h-full">
      {/* Top Image Container */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-stone-100">
        <img
          src={coverImage}
          alt={property.name}
          loading="lazy"
          className="w-full h-full object-cover zoom-card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-[#0a231b]/80 backdrop-blur-md text-emerald-300 text-xs font-semibold tracking-wide border border-white/10">
            {property.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-90"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 transition-colors ${favorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        {/* Rating overlay badge */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{property.rating ? property.rating.toFixed(1) : '4.9'}</span>
          {property.reviewCount > 0 && (
            <span className="text-stone-400 font-normal">({property.reviewCount})</span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Property Name */}
          <Link to={`/stay/${property.id}`}>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
              {property.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          <p className="mt-1 text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed">
            {property.tagline || property.description}
          </p>

          {/* Capacity and Rooms */}
          <div className="mt-3.5 flex items-center gap-4 text-xs font-medium text-stone-600 border-t border-b border-stone-100 py-2.5">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              <span>Up to {property.guestCapacity} Guests</span>
            </span>
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-stone-400" />
                <span>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
              </span>
            )}
          </div>

          {/* Amenities preview chips */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 3).map((amenity, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-1.5 py-0.5 text-stone-400 text-[10px] font-medium">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer: Price and CTA */}
        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 block">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-[#0a231b]">
                {formatINR(property.pricePerNight)}
              </span>
              <span className="text-xs text-stone-500 font-medium">/ night</span>
            </div>
          </div>

          <Link
            to={`/stay/${property.id}`}
            className="px-4 py-2 rounded-xl bg-[#143d2f] hover:bg-[#0a231b] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all group-hover:shadow-md flex items-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
