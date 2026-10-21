import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, CloudRain, Flame, Trees, Compass, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const experiences = [
  {
    title: 'High Altitude Cloud Treks & Camping',
    location: 'Meeshapulimala & Camptop Munnar',
    badge: 'Signature Trek',
    image: '/images/yathra/marayoor-jacaranda-valleys.jpg',
    description: 'Camp atop rolling misty knolls at 7,000+ feet. Catch first light piercing through a literal ocean of white clouds, surrounded by wild rhododendrons and cool hill winds.',
    highlights: ['Sunrise cloud bed outlook', 'Cedar campfire & BBQ', 'Guided mountain trail guide', 'Tent accommodations included']
  },
  {
    title: 'Monsoon Forest Retreats & Waterfalls',
    location: 'Wayanad Rainforest & Kanthalloor',
    badge: 'Rain Lover',
    image: '/images/yathra/kerala-waterfalls-treks.jpg',
    description: 'Immerse in the magic of Kerala monsoons. Enjoy private stream-side cottages, natural rock bathing pools, and warm spiced chai served against the soothing sound of rain on tin roofs.',
    highlights: ['Direct stream access', 'Private natural pools', 'Homestyle Malabar meals', 'Jeep safari through tea valleys']
  },
  {
    title: 'Starlit A-Frames & Quiet Evenings',
    location: 'Kuttikkanam & Kookal Ridge',
    badge: 'Couples & Solitude',
    image: '/images/yathra/kuttikkanam-aframe-night.jpg',
    description: 'Escape the city rush in secluded architectural A-frame chalets. Warm fairy lights, wooden timber interiors, and cozy private campfire pits make this an unforgettable romantic retreat.',
    highlights: ['Glass-front timber cabin', 'Private campfire circle', 'Stargazing setup', 'Zero crowd disturbance']
  },
  {
    title: 'Highland Heritage Estates & Reunions',
    location: 'Kodaikanal & Munnar',
    badge: 'Big Groups & Families',
    image: '/images/yathra/munnar-villa-pool.jpg',
    description: 'Exclusive 6 to 9 BHK private properties with large lawns, crystal blue private pools, indoor fireplaces, and personal chefs. Ideal for destination celebrations and group getaways.',
    highlights: ['Up to 24 guests capacity', 'Private swimming pool', 'Gated compound & huge parking', 'Personalized catering & BBQ']
  }
];

export default function ExperiencesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-bold block mb-2">
            Curated Journeys
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#0a231b] tracking-tight">
            Unforgettable Travel Experiences
          </h1>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Every YATHRA experience is tailored to awaken your sense of wonder. Explore misty ridges, wild forests, and secluded hideaways.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-xl transition-shadow`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 h-72 sm:h-96 rounded-2xl overflow-hidden relative group">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover zoom-card-image"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#0a231b]/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10">
                    {exp.badge}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>{exp.location}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a231b]">
                  {exp.title}
                </h3>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                  {exp.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Experience Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-stone-700">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/stays"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#143d2f] hover:bg-[#0a231b] text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md"
                  >
                    <span>View Matching Stays</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
