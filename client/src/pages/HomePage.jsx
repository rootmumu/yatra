import React, { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import ParallaxHero from '../components/home/ParallaxHero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedStays from '../components/home/FeaturedStays';
import ExperiencesSection from '../components/home/ExperiencesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import InstagramFeed from '../components/home/InstagramFeed';
import Footer from '../components/common/Footer';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ParallaxHero />
        <FeaturedCategories />
        <FeaturedStays />
        <ExperiencesSection />
        <WhyChooseUs />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
