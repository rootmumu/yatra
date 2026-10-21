import React from 'react';
import { Play, Heart, ExternalLink } from 'lucide-react';
import InstagramIcon from '../common/InstagramIcon';

const instagramPosts = [
  {
    id: 1,
    title: 'Kuttikkanam Starlit A-Frame',
    location: 'Kuttikkanam, Idukki',
    image: '/images/yathra/kuttikkanam-aframe-night.jpg',
    tag: '#Reel'
  },
  {
    id: 2,
    title: 'Munnar 6BHK Pool Villa in Pine Woods',
    location: 'Munnar, Kerala',
    image: '/images/yathra/munnar-villa-pool.jpg',
    tag: '#StayHighlight'
  },
  {
    id: 3,
    title: 'Cliff Balcony Morning at Kookal',
    location: 'Kookal Village',
    image: '/images/yathra/kookal-village-views.jpg',
    tag: '#HiddenGems'
  },
  {
    id: 4,
    title: 'Kanthalloor Fruit Orchard Treehouse',
    location: 'Kanthalloor, Kerala',
    image: '/images/yathra/kanthalloor-treehouse.jpg',
    tag: '#NatureStay'
  },
  {
    id: 5,
    title: 'Marayoor Jacaranda Valley Bloom',
    location: 'Marayoor, Munnar',
    image: '/images/yathra/marayoor-jacaranda-valleys.jpg',
    tag: '#KeralaVibes'
  },
  {
    id: 6,
    title: '9BHK Highland Private Estate Gate',
    location: 'Kodaikanal Ridge',
    image: '/images/yathra/kodaikanal-estate-9bhk.jpg',
    tag: '#GroupStay'
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Follow Our Escapes on Instagram
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base">
              Tag <span className="text-amber-300 font-semibold">@yathra._</span> in your travel moments to be featured on our feed!
            </p>
          </div>

          <a
            href="https://www.instagram.com/yathra._/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <InstagramIcon className="w-5 h-5" />
            <span>Follow @yathra._ (58K)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Grid items resembling Instagram feed */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/yathra._/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/14] rounded-2xl overflow-hidden bg-stone-800 shadow-md block"
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover zoom-card-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

              {/* Tag chip */}
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white block">
                  <Play className="w-3 h-3 fill-white" />
                </span>
              </div>

              {/* Hover text */}
              <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[11px] font-semibold text-white leading-tight line-clamp-2">
                  {post.title}
                </p>
                <span className="text-[10px] text-amber-300 block mt-0.5">
                  {post.location}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
