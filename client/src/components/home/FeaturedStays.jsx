import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { getProperties } from '../../services/api';
import PropertyCard from '../stays/PropertyCard';

const tabs = ['All', 'Private Villa', 'Cottages', 'Camping & Glamping', 'Resorts', 'Homestays'];

export default function FeaturedStays() {
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties()
      .then((res) => {
        if (res.data.success) {
          setProperties(res.data.data);
        }
      })
      .catch((err) => console.error('Error fetching stays:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProperties = properties.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Signature Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0a231b] tracking-tight">
              Featured Stays & Retreats
            </h2>
            <p className="mt-3 text-stone-600 text-base sm:text-lg max-w-2xl">
              Hand-selected sanctuaries offering breathtaking misty views, complete privacy, and authentic Kerala mountain hospitality.
            </p>
          </div>

          <Link
            to="/stays"
            className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-semibold text-sm sm:text-base group"
          >
            <span>View All 10+ Stays</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#0a231b] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab === 'All' ? 'All Stays' : tab}
            </button>
          ))}
        </div>

        {/* Grid or Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-stone-100 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-3xl border border-stone-200">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-800">No stays in this category yet</h3>
            <p className="text-stone-500 text-sm mt-1">Try selecting 'All Stays' or another category</p>
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <Link
            to="/stays"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#143d2f] hover:bg-[#0a231b] text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span>Explore All Accommodations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
