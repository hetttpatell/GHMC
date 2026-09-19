import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CtaBannerSection — Dual-Split Executive & Career CTA Banner
 *
 * Faithfully adapts the Bain-style dual-column banner into the GHMC design system:
 * - Brand Signature Purple (#372C5F) luxury background with atmospheric radial lighting
 * - Left: "What can we help you achieve?" + "LET'S GET TO WORK"
 * - Right: "Where will your career take you?" + "COME FIND OUT"
 * - Central hairline divider rule (vertical on md+, horizontal on mobile)
 * - Minimalist white rectangular outline buttons with invert hover transitions
 */
export default function CtaBannerSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const leftTitleRef = useRef(null);
  const rightTitleRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        [leftTitleRef.current, rightTitleRef.current],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
        }
      ).fromTo(
        [leftBtnRef.current, rightBtnRef.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-x-clip"
      style={{
        background: 'linear-gradient(135deg, #372C5F 0%, #292147 50%, #1c1533 100%)',
      }}
    >
      {/* ── Atmospheric Ambient Radial Glow (GHMC Theme) ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(201, 184, 135, 0.06) 0%, transparent 55%)',
        }}
      />

      {/* ── 2-Column Dual-Split Layout with Central Hairline Divider ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/15 w-full">
        {/* ── Left Column: Executive Engagement ── */}
        <div
          ref={leftColRef}
          className="flex flex-col items-center justify-center text-center py-10 sm:py-16 md:py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-20"
        >
          <h2
            ref={leftTitleRef}
            className="font-['ario-sans',sans-serif] text-[19px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white tracking-[-0.03em] leading-[1.18] mb-4 sm:mb-6 md:mb-8 max-w-md will-change-transform"
          >
            What can we help you achieve?
          </h2>

          <div ref={leftBtnRef} className="will-change-transform">
            <a
              href="#contact"
              className="inline-block border border-white/80 hover:border-white text-white hover:text-[#372C5F] hover:bg-white font-['ario-sans',sans-serif] text-[10.5px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-[0.16em] px-5 sm:px-8 py-2.5 sm:py-3.5 transition-all duration-300 ease-out shadow-sm hover:shadow-xl active:scale-95 cursor-pointer"
            >
              LET&apos;S GET TO WORK
            </a>
          </div>
        </div>

        {/* ── Right Column: Careers & Leadership ── */}
        <div
          ref={rightColRef}
          className="flex flex-col items-center justify-center text-center py-10 sm:py-16 md:py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-20"
        >
          <h2
            ref={rightTitleRef}
            className="font-['ario-sans',sans-serif] text-[19px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-bold text-white tracking-[-0.03em] leading-[1.18] mb-4 sm:mb-6 md:mb-8 max-w-md will-change-transform"
          >
            Where will your career take you?
          </h2>

          <div ref={rightBtnRef} className="will-change-transform">
            <a
              href="#careers"
              className="inline-block border border-white/80 hover:border-white text-white hover:text-[#372C5F] hover:bg-white font-['ario-sans',sans-serif] text-[10.5px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-[0.16em] px-5 sm:px-8 py-2.5 sm:py-3.5 transition-all duration-300 ease-out shadow-sm hover:shadow-xl active:scale-95 cursor-pointer"
            >
              COME FIND OUT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
