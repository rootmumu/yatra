import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trees, Tent, Home, Castle, TreePine, Sparkles } from 'lucide-react';

const categories = [
  {
    id: 'resorts',
    title: 'Luxury Resorts',
    categoryName: 'Resorts',
    description: 'Cliffside infinity pools, mist valleys, and 5-star mountain wellness.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    icon: Castle,
    tag: 'Scenic & Luxury'
  },
  {
    id: 'glamping',
    title: 'Camping & Glamping',
    categoryName: 'Camping & Glamping',
    description: 'Weatherproof safari bell tents, campfire circles, and stargazing.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    icon: Tent,
    tag: 'Adventure & Stars'
  },
  {
    id: 'cottages',
    title: 'A-Frames & Cottages',
    categoryName: 'Cottages',
    description: 'Romantic glass-front wooden lofts tucked into cool pine hills.',
    image: '/images/yathra/kuttikkanam-aframe-night.jpg',
    icon: TreePine,
    tag: 'Couples & Honeymoon'
  },
  {
    id: 'villas',
    title: 'Private Villas',
    categoryName: 'Private Villa',
    description: 'Exclusive 6-9 BHK private estates with swimming pools for big groups.',
    image: '/images/yathra/munnar-villa-pool.jpg',
    icon: Home,
    tag: 'Family & Groups'
  },
  {
    id: 'homestays',
    title: 'Plantation Homestays',
    categoryName: 'Homestays',
    description: 'Heritage teak architecture, authentic home-cooked Sadhya & coffee walks.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    icon: Trees,
    tag: 'Culture & Food'
  },
  {
    id: 'treehouse',
    title: 'Nature Treehouses',
    categoryName: 'Treehouse',
    description: 'Elevated timber hideouts nestled in apple & orange orchards.',
    image: '/images/yathra/kanthalloor-treehouse.jpg',
    icon: Sparkles,
    tag: 'Untamed Nature'
  }
];

export default function FeaturedCategories() {
  return (
    <section id="categories-section" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Handpicked Escapes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0a231b] tracking-tight">
            Explore Stays by Style
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Whether you desire a secluded A-frame cabin beneath the stars or a luxury private pool villa in Munnar, find your perfect setting.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/stays?category=${encodeURIComponent(cat.categoryName)}`}
                className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col justify-end p-6 sm:p-8"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center zoom-card-image"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a231b] via-[#0a231b]/50 to-transparent group-hover:via-[#0a231b]/40 transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 text-white space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-stone-200 text-sm line-clamp-2 leading-relaxed font-light">
                    {cat.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-sm font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                    <span>View Stays</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
