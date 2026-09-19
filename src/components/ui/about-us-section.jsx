import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Building2,
  FolderKanban,
  Globe,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutUsSection - The Impact Behind the Work
 *
 * Design updates:
 * - Full brand purple (#372C5F) icon badges with crisp white icons
 * - Continuous GSAP micro-animation on SVG logos/icons (gentle breathing/float)
 * - Solid stationary editorial items (no jumpy hover states)
 * - Generous vertical spacing between cards (space-y-16 sm:space-y-20 lg:space-y-24)
 * - Bespoke Lucide SVGs matching the 6 disciplines (Award, Building2, FolderKanban, Globe, TrendingUp, ShieldCheck)
 * - Multi-layer GSAP parallax on middle card and columns
 */
export default function AboutUsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const narrativeRef = useRef(null);
  const gridRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const centerCardRef = useRef(null);
  const centerCardInnerRef = useRef(null);
  const centerCardOffsetRef = useRef(null);

  // Floating accent decorative refs
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const floatDot1Ref = useRef(null);
  const floatDot2Ref = useRef(null);
  const centerOrb1Ref = useRef(null);
  const centerOrb2Ref = useRef(null);

  // Data for the 6 strategic pillars / impact items with appropriate SVGs
  const services = [
    {
      icon: <Award className="w-5 h-5 text-white" />,
      tag: '01 — EXPERIENCE',
      title: 'Years of Expertise',
      description:
        'Years of experience helping organisations navigate complex challenges, strengthen their foundations and build for sustainable growth.',
      position: 'left',
    },
    {
      icon: <Building2 className="w-5 h-5 text-white" />,
      tag: '02 — ORGANISATIONS',
      title: 'Organisations Supported',
      description:
        'Working alongside organisations to understand their challenges, strengthen their capabilities and create meaningful improvements.',
      position: 'left',
    },
    {
      icon: <FolderKanban className="w-5 h-5 text-white" />,
      tag: '03 — PROJECTS',
      title: 'Projects Delivered',
      description:
        'Practical consulting engagements focused on solving real organisational, operational and people-related challenges.',
      position: 'left',
    },
    {
      icon: <Globe className="w-5 h-5 text-white" />,
      tag: '04 — INDUSTRIES',
      title: 'Industry Experience',
      description:
        'Experience across diverse sectors, bringing adaptable thinking and practical solutions to different organisational environments.',
      position: 'right',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      tag: '05 — TRANSFORMATION',
      title: 'From Challenge to Change',
      description:
        'Turning organisational complexity into clearer structures, stronger processes and more effective ways of working.',
      position: 'right',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      tag: '06 — SUSTAINABLE GROWTH',
      title: 'Built for the Long Term',
      description:
        'Creating solutions that go beyond immediate improvements and help organisations develop the capability to sustain progress over time.',
      position: 'right',
    },
  ];

  // ─── Pure GSAP ScrollTrigger "Comes Up" & Parallax Animations ───
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.refresh();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Ambient continuous floating dots
      if (!prefersReducedMotion) {
        if (floatDot1Ref.current) {
          gsap.to(floatDot1Ref.current, {
            y: -16,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
        if (floatDot2Ref.current) {
          gsap.to(floatDot2Ref.current, {
            y: 18,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.6,
          });
        }
        if (centerOrb1Ref.current) {
          gsap.to(centerOrb1Ref.current, {
            y: -12,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
        if (centerOrb2Ref.current) {
          gsap.to(centerOrb2Ref.current, {
            y: 14,
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.9,
          });
        }

        // Background large atmospheric orbs parallax
        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        // Continuous gentle breathing animation for the SVG logos/icons inside full purple badges
        const iconSvgs = section.querySelectorAll('.service-icon-svg');
        iconSvgs.forEach((icon, i) => {
          gsap.to(icon, {
            y: -2.5,
            scale: 1.12,
            duration: 2.2 + (i % 3) * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15,
          });
        });
      }

      // 2. Professional "Comes Up" Reveal: Bold Heading + Sub-headline
      if (headingRef.current) {
        const headerElements = [
          headlineLine1Ref.current,
          headlineLine2Ref.current,
          headingRef.current.querySelector('.header-divider'),
          narrativeRef.current,
        ].filter(Boolean);

        gsap.fromTo(
          headerElements,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Professional "Comes Up" Reveal for Service Items (Left & Right)
      const serviceItems = section.querySelectorAll('.service-item-clean');
      gsap.fromTo(
        serviceItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // 4. Center Spotlight Card "Comes Up" Reveal
      if (centerCardInnerRef.current) {
        gsap.fromTo(
          centerCardInnerRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: centerCardRef.current,
              start: 'top 84%',
              once: true,
            },
          }
        );
      }

      // 5. ─── PARALLAX ANIMATION ON MIDDLE CARD AND OTHER CARDS (Desktop Only for Peak Mobile Performance) ───
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (!prefersReducedMotion && gridRef.current && isDesktop) {
        // Middle Card Parallax: Moves upward smoothly as the user scrolls through the grid
        if (centerCardRef.current) {
          gsap.to(centerCardRef.current, {
            y: -48,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        // Offset border parallax (moves at slightly different rate for 3D depth)
        if (centerCardOffsetRef.current) {
          gsap.to(centerCardOffsetRef.current, {
            y: -65,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        // Left column cards subtle parallax
        if (leftColRef.current) {
          gsap.to(leftColRef.current, {
            y: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          });
        }

        // Right column cards subtle counter-parallax
        if (rightColRef.current) {
          gsap.to(rightColRef.current, {
            y: 24,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          });
        }
      }
    }, section);

    const timeout = setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 lg:py-44 px-4 sm:px-8 md:px-12 lg:px-20 bg-transparent text-[#020202] overflow-hidden select-none"
    >
      {/* ── Background Decorative Ambient Elements (Parallax Orbs) ── */}
      <div
        ref={orb1Ref}
        className="absolute top-24 left-10 w-80 h-80 rounded-full bg-[#372C5F]/[0.05] blur-3xl pointer-events-none will-change-transform"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-24 right-10 w-96 h-96 rounded-full bg-[#372C5F]/[0.04] blur-3xl pointer-events-none will-change-transform"
      />

      {/* Floating accent dots */}
      <div
        ref={floatDot1Ref}
        className="absolute top-1/3 left-1/6 w-3 h-3 rounded-full bg-[#372C5F]/25 pointer-events-none"
      />
      <div
        ref={floatDot2Ref}
        className="absolute bottom-1/3 right-1/6 w-4 h-4 rounded-full bg-[#372C5F]/20 pointer-events-none"
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ──────────────────────────────────────────────────────────────────────────
            1. SECTION HEADER WITH BOLD HEADING IN THE MIDDLE OF THE PAGE
            ────────────────────────────────────────────────────────────────────────── */}
        <div ref={headingRef} className="flex flex-col items-center mb-16 sm:mb-20 text-center">
          {/* 
            THE BOLD HEADING IN THE MIDDLE OF THE PAGE:
            "THE IMPACT BEHIND THE WORK"
            Matching the bold grotesque architectural typography of Hero "GHMC"
          */}
          <h2 className="font-['ario-sans',sans-serif] font-black uppercase tracking-[-0.045em] leading-[0.88] select-none text-[#020202] max-w-5xl mx-auto">
            <span
              ref={headlineLine1Ref}
              className="block text-[#020202] will-change-transform"
              style={{
                fontSize: 'clamp(2.6rem, 7.2vw, 6.2rem)',
                letterSpacing: '-0.045em',
              }}
            >
              THE IMPACT
            </span>
            <span
              ref={headlineLine2Ref}
              className="block text-[#372C5F] mt-1 will-change-transform"
              style={{
                fontSize: 'clamp(2.6rem, 7.2vw, 6.2rem)',
                letterSpacing: '-0.045em',
              }}
            >
              BEHIND THE WORK
            </span>
          </h2>

          {/* Decorative accent bar */}
          <div className="header-divider w-24 h-1 bg-[#372C5F] rounded-full mt-6 mb-8" />

          {/* Sub-headline & Executive narrative statement */}
          <div ref={narrativeRef} className="max-w-3xl mx-auto will-change-transform">
            <h3 className="font-['ario-sans',sans-serif] text-[1.45rem] sm:text-[1.85rem] md:text-[2.2rem] font-bold uppercase tracking-[-0.03em] leading-[1.15] text-[#020202] mb-4">
              REAL EXPERIENCE.&nbsp;
              <span className="text-[#372C5F]">MEASURABLE IMPACT.</span>
            </h3>
            <p className="font-['ario-sans',sans-serif] text-[16.5px] sm:text-[18.5px] text-[#333742] font-normal leading-[1.65] max-w-2xl mx-auto">
              At GHMC, we work with organisations to address complex challenges across people,
              processes and organisational structures. Our approach combines practical expertise,
              structured thinking and close collaboration to create improvements that are built to last.
            </p>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────────────
            2. THE ADVISORY GRID:
               - Desktop (lg+): 3-Column Editorial Architecture with Parallax Center Spotlight
               - Mobile & Tablet (<lg): Sleek Spotlight Card + High-Performance 2-by-2 Grid
            ────────────────────────────────────────────────────────────────────────── */}

        {/* ── DESKTOP VIEW (lg:grid 3 Columns) ── */}
        <div
          ref={gridRef}
          className="hidden lg:grid grid-cols-3 gap-12 lg:gap-16 xl:gap-20 relative items-center mb-28 sm:mb-36"
        >
          {/* ── LEFT COLUMN (Items 01, 02, 03 — Full Purple Badge, Animated SVG, Generous Space) ── */}
          <div ref={leftColRef} className="space-y-16 sm:space-y-20 lg:space-y-24 will-change-transform">
            {services
              .filter((service) => service.position === 'left')
              .map((service, index) => (
                <div
                  key={`left-${index}`}
                  className="service-item-clean flex flex-col rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(55,44,95,0.04) 0%, rgba(55,44,95,0.02) 50%, rgba(255,255,255,0.6) 100%)',
                    border: '1px solid rgba(55,44,95,0.10)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.7), 0 1px 3px rgba(55,44,95,0.06), 0 4px 12px rgba(55,44,95,0.04)',
                  }}
                >
                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, #4a3d73 0%, #372C5F 60%, #2a2149 100%)',
                        boxShadow: '0 2px 8px rgba(55,44,95,0.30), 0 0 0 1px rgba(55,44,95,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
                      }}
                    >
                      <div className="service-icon-svg flex items-center justify-center will-change-transform">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#372C5F] font-['ario-sans',sans-serif] mb-0.5">
                        {service.tag}
                      </span>
                      <h4 className="text-[18px] sm:text-[19.5px] font-bold uppercase tracking-tight text-[#020202] leading-[1.22] font-['ario-sans',sans-serif]">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14.5px] sm:text-[15px] text-[#4a4d55] leading-[1.68] pl-[64px] font-normal font-['ario-sans',sans-serif]">
                    {service.description}
                  </p>
                </div>
              ))}
          </div>

          {/* ── CENTER COLUMN (Parallax Spotlight Card with Floating Accents) ── */}
          <div className="flex justify-center items-center my-6 md:my-0">
            <div
              ref={centerCardRef}
              className="relative w-full max-w-sm will-change-transform"
            >
              {/* Main Photo Card Shell */}
              <div
                ref={centerCardInnerRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a10] aspect-[4/5] flex flex-col justify-end p-6 will-change-transform"
              >
                {/* Visual Image */}
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                  alt="GHMC Strategic Advisory"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110"
                />

                {/* Atmospheric Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(2,2,2,0.1) 0%, rgba(55,44,95,0.4) 45%, rgba(2,2,2,0.92) 100%)',
                  }}
                />

                {/* Card Bottom Content */}
                <div className="relative z-10 w-full flex flex-col items-start text-white">
                  <h4 className="text-[20px] font-bold uppercase tracking-tight text-white mb-3 font-['ario-sans',sans-serif]">
                    Strategic Transformation
                  </h4>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#020202] text-[13px] font-bold uppercase tracking-wider shadow-lg hover:bg-[#372C5F] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <span>Discover Our Approach</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Offset Decorative Architectural Border with Parallax */}
              <div
                ref={centerCardOffsetRef}
                className="absolute inset-0 border-2 border-[#372C5F]/35 rounded-2xl -m-3 z-[-1] pointer-events-none will-change-transform"
              />

              {/* Floating Decorative Accent Orbs */}
              <div
                ref={centerOrb1Ref}
                className="absolute -top-4 -right-6 w-14 h-14 rounded-full bg-[#372C5F]/20 pointer-events-none blur-sm will-change-transform"
              />
              <div
                ref={centerOrb2Ref}
                className="absolute -bottom-6 -left-8 w-18 h-18 rounded-full bg-[#372C5F]/15 pointer-events-none blur-sm will-change-transform"
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN (Items 04, 05, 06 — Full Purple Badge, Animated SVG, Generous Space) ── */}
          <div ref={rightColRef} className="space-y-16 sm:space-y-20 lg:space-y-24 will-change-transform">
            {services
              .filter((service) => service.position === 'right')
              .map((service, index) => (
                <div
                  key={`right-${index}`}
                  className="service-item-clean flex flex-col rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(55,44,95,0.04) 0%, rgba(55,44,95,0.02) 50%, rgba(255,255,255,0.6) 100%)',
                    border: '1px solid rgba(55,44,95,0.10)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.7), 0 1px 3px rgba(55,44,95,0.06), 0 4px 12px rgba(55,44,95,0.04)',
                  }}
                >
                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, #4a3d73 0%, #372C5F 60%, #2a2149 100%)',
                        boxShadow: '0 2px 8px rgba(55,44,95,0.30), 0 0 0 1px rgba(55,44,95,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
                      }}
                    >
                      <div className="service-icon-svg flex items-center justify-center will-change-transform">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#372C5F] font-['ario-sans',sans-serif] mb-0.5">
                        {service.tag}
                      </span>
                      <h4 className="text-[18px] sm:text-[19.5px] font-bold uppercase tracking-tight text-[#020202] leading-[1.22] font-['ario-sans',sans-serif]">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14.5px] sm:text-[15px] text-[#4a4d55] leading-[1.68] pl-[64px] font-normal font-['ario-sans',sans-serif]">
                    {service.description}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* ── MOBILE & TABLET VIEW (< lg): High-Performance 2-by-2 Grid + Spotlight Card ── */}
        <div className="block lg:hidden w-full space-y-8 mb-20">
          {/* Mobile Spotlight Card */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#0a0a10] aspect-[16/10] sm:aspect-[16/9] flex flex-col justify-end p-5">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="GHMC Strategic Advisory"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(2,2,2,0.1) 0%, rgba(55,44,95,0.4) 45%, rgba(2,2,2,0.92) 100%)',
                }}
              />
              <div className="relative z-10 w-full flex flex-col items-start text-white">
                <h4 className="text-[17px] sm:text-[19px] font-bold uppercase tracking-tight text-white mb-2 font-['ario-sans',sans-serif]">
                  Strategic Transformation
                </h4>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#020202] text-[11.5px] sm:text-[12px] font-bold uppercase tracking-wider shadow-md hover:bg-[#372C5F] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Discover Our Approach</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile 2-by-2 Grid for the 6 Strategic Disciplines */}
          <div className="mobile-grid grid grid-cols-2 gap-3 sm:gap-4.5">
            {services.map((service, index) => (
              <div
                key={`mob-${index}`}
                className="service-item-clean flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(145deg, rgba(55,44,95,0.05) 0%, rgba(255,255,255,0.85) 40%, rgba(55,44,95,0.03) 100%)',
                  border: '1px solid rgba(55,44,95,0.12)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.8), 0 1px 4px rgba(55,44,95,0.08), 0 4px 16px rgba(55,44,95,0.05)',
                }}
              >
                <div>
                  {/* Icon Badge */}
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl text-white flex items-center justify-center shrink-0 mb-2.5"
                    style={{
                      background: 'linear-gradient(145deg, #4a3d73 0%, #372C5F 60%, #2a2149 100%)',
                      boxShadow: '0 2px 6px rgba(55,44,95,0.30), inset 0 1px 0 rgba(255,255,255,0.10)',
                    }}
                  >
                    <div className="service-icon-svg flex items-center justify-center will-change-transform">
                      {service.icon}
                    </div>
                  </div>

                  {/* Tag & Title */}
                  <span className="block text-[9px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#372C5F] font-['ario-sans',sans-serif] mb-1">
                    {service.tag}
                  </span>
                  <h4 className="text-[13.5px] sm:text-[16px] font-bold uppercase tracking-tight text-[#020202] leading-[1.22] font-['ario-sans',sans-serif] mb-1.5">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[11px] sm:text-[13px] text-[#4a4d55] leading-[1.48] font-normal font-['ario-sans',sans-serif]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
