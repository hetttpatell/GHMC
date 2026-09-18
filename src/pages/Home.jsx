import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import Hero from '../components/Hero';
import AboutUsSection from '../components/ui/about-us-section';
import WhoWeAreSection from '../components/ui/who-we-are-section';
import ScrollThread from '../components/ui/ScrollThread';

/**
 * Home Page Component:
 * - Pure White Primary Theme
 * - Extended Cinematic 4-Corner Intro Preloader
 * - Hero section with headline entrance animation and scroll-grown video
 * - About Us / Our Impact section (The Impact Behind the Work)
 * - Who We Are editorial section
 * - Global ScrollThread — single interactive scroll-sensitive line across entire site
 */
const Home = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-white text-black">
      {/* ── GHMC 4-Corner Letter Intro Preloader ── */}
      <Preloader onComplete={() => setIntroDone(true)} />

      {/* ── Main Site Content ── */}
      <main className="relative w-full overflow-hidden">
        {/* ── Global Interactive Scroll-Sensitive Background Thread (single line) ── */}
        <ScrollThread />

        <Hero introDone={introDone} />
        <AboutUsSection />
        <WhoWeAreSection />
      </main>
    </div>
  );
};

export default Home;
