import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, MapPin, Compass, Heart, RotateCcw } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PropertyCard from '../components/stays/PropertyCard';
import { getProperties } from '../services/api';
import { formatINR } from '../utils/formatters';
import { useFavorites } from '../context/FavoritesContext';

const categories = ['All', 'Resorts', 'Camping & Glamping', 'Cottages', 'Private Villa', 'Homestays', 'Treehouse'];
const districts = ['All', 'Idukki', 'Wayanad', 'Kodaikanal', 'Alappuzha'];

export default function StaysPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state initialized from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'All');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '10000');
  const [sortBy, setSortBy] = useState('recommended');
  const [onlyFavorites, setOnlyFavorites] = useState(searchParams.get('favorites') === 'true');

  const { favorites } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProperties()
      .then((res) => {
        if (res.data.success) {
          setProperties(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedDistrict !== 'All') params.set('district', selectedDistrict);
    if (onlyFavorites) params.set('favorites', 'true');
    setSearchParams(params, { replace: true });
  }, [search, selectedCategory, selectedDistrict, onlyFavorites]);

  // Client-side filtering and sorting
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedDistrict !== 'All') {
      result = result.filter((p) => p.district.toLowerCase() === selectedDistrict.toLowerCase());
    }

    if (maxPrice) {
      result = result.filter((p) => p.pricePerNight <= Number(maxPrice));
    }

    if (onlyFavorites) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [properties, search, selectedCategory, selectedDistrict, maxPrice, onlyFavorites, favorites, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedDistrict('All');
    setMaxPrice('10000');
    setOnlyFavorites(false);
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-bold block mb-1">
            YATHRA Sanctuary Directory
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#0a231b] tracking-tight">
            Explore Handpicked Stays
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            From misty Munnar villas with private pools to starlit A-frames in Kuttikkanam.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-sm mb-10 space-y-5">
          {/* Top Search & Dropdown row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search stay name, town, or landmark..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* District select */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="All">All Regions / Districts</option>
                <option value="Idukki">Idukki (Munnar, Kuttikkanam, Vagamon)</option>
                <option value="Wayanad">Wayanad (Meppadi, Kalpetta)</option>
                <option value="Kodaikanal">Kodaikanal & Kookal</option>
                <option value="Alappuzha">Alleppey Backwaters</option>
              </select>
            </div>

            {/* Sort select */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Category Chips row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#143d2f] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Bottom Filter toggles & Price slider */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFavorites}
                  onChange={(e) => setOnlyFavorites(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Saved Stays Only ({favorites.length})</span>
                </span>
              </label>

              <button
                onClick={resetFilters}
                className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-500 font-medium">Max Nightly Price:</span>
              <input
                type="range"
                min="1800"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-32 accent-[#d97706] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#0a231b] w-16">{formatINR(maxPrice)}</span>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-stone-500">
          <span>Showing <strong className="text-stone-900">{filteredProperties.length}</strong> stays</span>
          {onlyFavorites && <span className="text-rose-600 font-medium">Filtering by saved favorites</span>}
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-stone-200/70 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
            <Compass className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-stone-800">No stays match your criteria</h3>
            <p className="text-stone-500 text-sm mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, changing the category, or resetting your filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#143d2f] text-white text-xs font-semibold hover:bg-[#0a231b] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
