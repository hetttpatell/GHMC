import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUsSection from '../components/ui/about-us-section';
import WhoWeAreSection from '../components/ui/who-we-are-section';
import CaseStudies from '../components/ui/CaseStudies';
import CtaBannerSection from '../components/ui/CtaBannerSection';
import Footer from '../components/Footer';
import ScrollThread from '../components/ui/ScrollThread';

/**
 * Home Page Component:
 * - Pure White Primary Theme
 * - Extended Cinematic 4-Corner Intro Preloader
 * - GHMC Resizable Luxury Navbar
 * - Hero section with headline entrance animation and scroll-grown video
 * - About Us / Our Impact section (The Impact Behind the Work)
 * - Who We Are editorial section
 * - Case Studies editorial section
 * - Dual-Split CTA Banner section (Let's Get to Work / Come Find Out)
 * - Global ScrollThread — single interactive scroll-sensitive line across entire site
 * - Unique Swiss Luxury Editorial Footer
 */
const Home = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-white text-black">
      {/* ── GHMC Resizable Navbar ── */}
      <Navbar introDone={introDone} />

      {/* ── GHMC 4-Corner Letter Intro Preloader ── */}
      <Preloader onComplete={() => setIntroDone(true)} />

      {/* ── Main Site Content ── */}
      <main className="relative w-full overflow-x-clip">
        {/* ── Global Interactive Scroll-Sensitive Background Thread (single line) ── */}
        <ScrollThread />

        <Hero introDone={introDone} />
        <AboutUsSection />
        <WhoWeAreSection />
        <CaseStudies />
        <CtaBannerSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
