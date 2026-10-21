import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, CloudRain, Flame, Compass, ArrowRight, Sparkles } from 'lucide-react';

const experiences = [
  {
    id: 'exp-mountain',
    title: 'High Altitude Mountain Escapes',
    subtitle: 'Meeshapulimala & Vagamon Ridges',
    description: 'Trek above cloud blankets at 8,000 feet, catch golden sunrises, and experience the crisp chill of the Western Ghats.',
    image: '/images/yathra/marayoor-jacaranda-valleys.jpg',
    badge: 'Popular',
    icon: Mountain
  },
  {
    id: 'exp-forest',
    title: 'Forest Camping & Monsoon Camps',
    subtitle: 'Camptop Munnar & Wayanad Wilds',
    description: 'Listen to the rain patter against rugged canvas tents, gather around cedar log fires, and breathe fresh pine mist.',
    image: '/images/yathra/kerala-waterfalls-treks.jpg',
    badge: 'Monsoon Special',
    icon: CloudRain
  },
  {
    id: 'exp-romantic',
    title: 'Romantic Starlit A-Frames',
    subtitle: 'Kuttikkanam & Kookal Sanctuaries',
    description: 'Floor-to-ceiling glass lofts illuminated with warm fairy lights. Savor quiet evenings with private bonfires and stargazing.',
    image: '/images/yathra/kuttikkanam-aframe-night.jpg',
    badge: 'Couples',
    icon: Flame
  }
];

export default function ExperiencesSection() {
  return (
    <section className="py-24 bg-[#0a231b] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#215b4c]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#d97706]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unforgettable Memories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight">
            Curated Nature Experiences
          </h2>
          <p className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Travel is not just where you sleep—it is the stories you tell when you return. Explore our bespoke highland journeys.
          </p>
        </div>

        {/* 3 Large Parallax/Visual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between h-[460px] p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40"
              >
                {/* Background image with hover zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center zoom-card-image"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a231b] via-[#0a231b]/70 to-[#0a231b]/30" />

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/20">
                    {exp.badge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/15">
                    <Icon className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold block">
                    {exp.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif font-bold group-hover:text-amber-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-light">
                    {exp.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/experiences"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-white transition-colors"
                    >
                      <span>Discover Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
