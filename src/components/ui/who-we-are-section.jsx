import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * WhoWeAreSection — Premium editorial "About GHMC / Who We Are"
 *
 * Design language:
 *   - Oversized bold heading with parallax scroll (matching "THE IMPACT BEHIND THE WORK")
 *   - Asymmetric layout: headline left, image right on desktop
 *   - GSAP-driven clip-path image reveal
 *   - Sequential philosophy formula animation
 *   - Expanding connecting line
 *   - Transparent background (matching about-us-section)
 *   - Full mobile-first professional layout
 *   - Reduced-motion safe
 */
export default function WhoWeAreSection() {
  const sectionRef = useRef(null);

  // ── Header refs ──
  const labelRef = useRef(null);
  const labelLineRef = useRef(null);
  const headLine1Ref = useRef(null);
  const headLine2Ref = useRef(null);
  const headLine3Ref = useRef(null);

  // ── Image refs ──
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);

  // ── Description refs ──
  const descBlockRef = useRef(null);
  const descHeadingRef = useRef(null);
  const descBodyRef = useRef(null);

  // ── Philosophy refs ──
  const philosBlockRef = useRef(null);
  const philosLineRef = useRef(null);
  const philosItemRefs = useRef([]);

  // ── CTA ref ──
  const ctaRef = useRef(null);

  // ── Mobile-specific animation refs ──
  const mLabelRef = useRef(null);
  const mLabelLineRef = useRef(null);
  const mHeadRef = useRef(null);
  const mImageRef = useRef(null);
  const mImageInnerRef = useRef(null);
  const mDescRef = useRef(null);
  const mPhilosRef = useRef(null);
  const mCtaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ── Reduced Motion: show everything immediately ──
    if (prefersReducedMotion) {
      const allEls = [
        labelRef.current,
        headLine1Ref.current,
        headLine2Ref.current,
        headLine3Ref.current,
        descHeadingRef.current,
        descBodyRef.current,
        ctaRef.current,
        mLabelRef.current,
        mHeadRef.current,
        mImageRef.current,
        mDescRef.current,
        mPhilosRef.current,
        mCtaRef.current,
        ...philosItemRefs.current,
      ].filter(Boolean);
      allEls.forEach((el) => gsap.set(el, { opacity: 1, y: 0, scale: 1 }));

      [labelLineRef.current, mLabelLineRef.current].filter(Boolean).forEach((el) =>
        gsap.set(el, { scaleX: 1 })
      );
      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, { clipPath: 'inset(0 0% 0 0)', opacity: 1 });
      }
      if (imageInnerRef.current) gsap.set(imageInnerRef.current, { scale: 1 });
      if (mImageInnerRef.current) gsap.set(mImageInnerRef.current, { scale: 1 });
      if (philosLineRef.current) gsap.set(philosLineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      // ════════════════════════════════════════════════════════════════════
      //  DESKTOP ANIMATIONS (lg+)
      // ════════════════════════════════════════════════════════════════════
      if (isDesktop) {
        // ── Stage 1: Section Label ──
        if (labelRef.current) {
          gsap.fromTo(
            labelRef.current,
            { y: 22, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true },
            }
          );
        }
        if (labelLineRef.current) {
          gsap.fromTo(
            labelLineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.1, ease: 'power2.inOut',
              scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true },
            }
          );
        }

        // ── Stage 2: Headline lines stagger reveal ──
        const headLines = [headLine1Ref.current, headLine2Ref.current, headLine3Ref.current].filter(Boolean);
        if (headLines.length) {
          gsap.fromTo(
            headLines,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power4.out',
              scrollTrigger: { trigger: headLine1Ref.current, start: 'top 82%', once: true },
            }
          );
        }

        // ── Stage 3: Image clip-path reveal + parallax ──
        if (imageWrapRef.current && imageInnerRef.current) {
          gsap.set(imageWrapRef.current, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
          gsap.set(imageInnerRef.current, { scale: 1.08 });

          const imgTl = gsap.timeline({
            scrollTrigger: { trigger: imageWrapRef.current, start: 'top 78%', once: true },
          });
          imgTl.to(imageWrapRef.current, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power3.inOut' });
          imgTl.to(imageInnerRef.current, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0);

          // Parallax on image
          gsap.to(imageWrapRef.current, {
            y: -55,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
          });
        }

        // ── Stage 4: Description block ──
        const descEls = [descHeadingRef.current, descBodyRef.current].filter(Boolean);
        if (descEls.length) {
          gsap.fromTo(
            descEls,
            { y: 35, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: descBlockRef.current, start: 'top 84%', once: true },
            }
          );
        }

        // ── Stage 5: Philosophy formula ──
        const items = philosItemRefs.current.filter(Boolean);
        if (items.length) {
          gsap.fromTo(
            items,
            { y: 30, opacity: 0, scale: 0.92 },
            {
              y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
              scrollTrigger: { trigger: philosBlockRef.current, start: 'top 82%', once: true },
            }
          );
        }
        if (philosLineRef.current) {
          gsap.fromTo(
            philosLineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.4, ease: 'power2.inOut',
              scrollTrigger: { trigger: philosBlockRef.current, start: 'top 78%', once: true },
            }
          );
        }

        // ── Stage 6: CTA ──
        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            { y: 18, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
            }
          );
        }
      }

      // ════════════════════════════════════════════════════════════════════
      //  MOBILE / TABLET ANIMATIONS (< lg) — Simpler, performant
      // ════════════════════════════════════════════════════════════════════
      if (!isDesktop) {
        // Label + line
        if (mLabelRef.current) {
          gsap.fromTo(mLabelRef.current, { y: 16, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: mLabelRef.current, start: 'top 90%', once: true },
          });
        }
        if (mLabelLineRef.current) {
          gsap.fromTo(mLabelLineRef.current, { scaleX: 0 }, {
            scaleX: 1, duration: 0.9, ease: 'power2.inOut',
            scrollTrigger: { trigger: mLabelRef.current, start: 'top 90%', once: true },
          });
        }

        // Headline
        if (mHeadRef.current) {
          gsap.fromTo(mHeadRef.current, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: mHeadRef.current, start: 'top 86%', once: true },
          });
        }

        // Image clip reveal
        if (mImageRef.current && mImageInnerRef.current) {
          gsap.set(mImageRef.current, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
          gsap.set(mImageInnerRef.current, { scale: 1.06 });
          const mImgTl = gsap.timeline({
            scrollTrigger: { trigger: mImageRef.current, start: 'top 82%', once: true },
          });
          mImgTl.to(mImageRef.current, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, ease: 'power3.inOut' });
          mImgTl.to(mImageInnerRef.current, { scale: 1, duration: 1.2, ease: 'power2.out' }, 0);
        }

        // Description
        if (mDescRef.current) {
          gsap.fromTo(mDescRef.current, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: mDescRef.current, start: 'top 86%', once: true },
          });
        }

        // Philosophy
        if (mPhilosRef.current) {
          gsap.fromTo(mPhilosRef.current, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: mPhilosRef.current, start: 'top 86%', once: true },
          });
        }

        // CTA
        if (mCtaRef.current) {
          gsap.fromTo(mCtaRef.current, { y: 16, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: mCtaRef.current, start: 'top 90%', once: true },
          });
        }
      }
    }, section);

    const timeout = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  // ── Helper to collect philosophy item refs ──
  const setPhilosRef = (i) => (el) => {
    philosItemRefs.current[i] = el;
  };

  // ── Philosophy data ──
  const philosophyItems = [
    { text: 'PEOPLE', type: 'word' },
    { text: '+', type: 'operator' },
    { text: 'PROCESS', type: 'word' },
    { text: '+', type: 'operator' },
    { text: 'STRUCTURE', type: 'word' },
    { text: '→', type: 'operator' },
    { text: 'PERFORMANCE', type: 'result' },
  ];

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none bg-transparent text-[#020202]"
    >
      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT (lg+) — Asymmetric editorial composition
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative z-10 py-36 xl:py-44 px-12 xl:px-20 2xl:px-28">
        {/* ── Section Label  04 — WHO WE ARE  ───────── ── */}
        <div className="flex items-center gap-5 mb-16 xl:mb-20">
          <span
            ref={labelRef}
            className="font-['ario-sans',sans-serif] text-[12px] font-bold uppercase tracking-[0.18em] whitespace-nowrap will-change-transform"
            style={{ color: '#372C5F', opacity: 0 }}
          >
            04 — WHO WE ARE
          </span>
          <div
            ref={labelLineRef}
            className="flex-1 h-px will-change-transform"
            style={{
              backgroundColor: '#372C5F',
              opacity: 0.18,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* ── BOLD HEADING — Matching "THE IMPACT BEHIND THE WORK" style ── */}
        <div className="flex flex-col items-center mb-6 text-center">
          <h2 className="font-['ario-sans',sans-serif] font-black uppercase tracking-[-0.045em] leading-[0.88] select-none max-w-6xl mx-auto">
            <span
              ref={headLine1Ref}
              className="block text-[#020202] will-change-transform"
              style={{ fontSize: 'clamp(2.6rem, 7.2vw, 6.2rem)', letterSpacing: '-0.045em', opacity: 0 }}
            >
              BUILT AROUND
            </span>
            <span
              ref={headLine2Ref}
              className="block text-[#372C5F] mt-1 will-change-transform"
              style={{ fontSize: 'clamp(2.6rem, 7.2vw, 6.2rem)', letterSpacing: '-0.045em', opacity: 0 }}
            >
              BETTER ORGANISATIONS.
            </span>
          </h2>
        </div>

        {/* ── Decorative accent bar (matching about-us-section) ── */}
        <div className="flex justify-center mb-10">
          <div className="w-24 h-1 bg-[#372C5F] rounded-full" />
        </div>

        {/* ── Supporting narrative (centered, matching about-us-section) ── */}
        <div className="max-w-3xl mx-auto text-center mb-20 xl:mb-28">
          <p
            ref={descHeadingRef}
            className="font-['ario-sans',sans-serif] text-[16.5px] sm:text-[18.5px] text-[#333742] font-normal leading-[1.65] max-w-2xl mx-auto will-change-transform"
            style={{ opacity: 0 }}
          >
            GHMC partners with organisations to strengthen the way they are
            structured, managed and operated. We bring together strategic
            thinking, practical expertise and a deep understanding of people
            and processes to help organisations overcome challenges and build
            sustainable performance.
          </p>
        </div>

        {/* ── Asymmetric Row: Image Left + Description Right ── */}
        <div ref={descBlockRef} className="flex items-start gap-16 xl:gap-24 mb-28 xl:mb-36">
          {/* LEFT — Large editorial image with clip-path reveal */}
          <div
            ref={imageWrapRef}
            className="relative shrink-0 will-change-[clip-path,transform] overflow-hidden"
            style={{
              width: 'clamp(340px, 40vw, 580px)',
              aspectRatio: '4 / 5',
              clipPath: 'inset(0 100% 0 0)',
              opacity: 0,
            }}
          >
            <img
              ref={imageInnerRef}
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
              alt="GHMC consulting environment — strategic collaboration"
              className="w-full h-full object-cover will-change-transform"
              style={{ transform: 'scale(1.08)' }}
              loading="lazy"
            />
            {/* Cinematic vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 35%, rgba(55,44,95,0.1) 100%)',
              }}
            />
          </div>

          {/* RIGHT — Description + Sub-heading */}
          <div className="flex-1 pt-8 xl:pt-16">
            <h3
              className="font-['ario-sans',sans-serif] text-[1.45rem] xl:text-[1.65rem] font-bold uppercase tracking-[-0.02em] leading-[1.2] mb-6 will-change-transform"
              style={{ color: '#1E1E24', opacity: 0 }}
              ref={descBodyRef}
            >
              WE HELP ORGANISATIONS
              <br />
              BECOME STRONGER FROM WITHIN.
            </h3>
            <p
              className="font-['ario-sans',sans-serif] text-[16px] xl:text-[17.5px] font-normal leading-[1.72] max-w-lg"
              style={{ color: '#6F6B78' }}
            >
              GHMC works with organisations to address challenges across people,
              processes and structure. By combining strategic thinking with practical
              execution, we help create clearer ways of working, stronger capabilities
              and sustainable performance.
            </p>
          </div>
        </div>

        {/* ── Core Philosophy Formula ── */}
        <div ref={philosBlockRef} className="relative mb-20 xl:mb-24">
          {/* Connecting horizontal line (behind items) */}
          <div
            ref={philosLineRef}
            className="absolute left-0 right-0 h-px will-change-transform"
            style={{
              top: '50%',
              backgroundColor: '#372C5F',
              opacity: 0.1,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />

          <div className="relative flex items-center justify-center gap-6 xl:gap-10 flex-wrap py-6">
            {philosophyItems.map((item, i) => (
              <span
                key={i}
                ref={setPhilosRef(i)}
                className={`font-['ario-sans',sans-serif] will-change-transform ${
                  item.type === 'word'
                    ? 'font-black uppercase tracking-[-0.03em]'
                    : item.type === 'result'
                    ? 'font-black uppercase tracking-[-0.03em]'
                    : 'font-light'
                }`}
                style={{
                  fontSize:
                    item.type === 'result'
                      ? 'clamp(1.8rem, 3.4vw, 3.2rem)'
                      : item.type === 'word'
                      ? 'clamp(1.6rem, 3vw, 2.8rem)'
                      : 'clamp(1.4rem, 2.5vw, 2.4rem)',
                  color:
                    item.type === 'result'
                      ? '#1E1E24'
                      : item.type === 'word'
                      ? '#372C5F'
                      : '#C9B887',
                  opacity: 0,
                }}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-end">
          <a
            ref={ctaRef}
            href="#contact"
            className="group inline-flex items-center gap-3 font-['ario-sans',sans-serif] text-[14px] font-bold uppercase tracking-[0.14em] cursor-pointer select-none will-change-transform"
            style={{ color: '#372C5F', opacity: 0 }}
          >
            <span
              className="relative pb-1 transition-transform duration-300 group-hover:translate-x-1"
              style={{ borderBottom: '1.5px solid #372C5F' }}
            >
              DISCOVER GHMC
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE & TABLET LAYOUT (< lg) — Professional, readable, performant
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden relative z-10 px-5 sm:px-8 pt-24 sm:pt-32 pb-24 sm:pb-32">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-4 mb-10 sm:mb-12">
          <span
            ref={mLabelRef}
            className="font-['ario-sans',sans-serif] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] whitespace-nowrap will-change-transform"
            style={{ color: '#372C5F', opacity: 0 }}
          >
            04 — WHO WE ARE
          </span>
          <div
            ref={mLabelLineRef}
            className="flex-1 h-px will-change-transform"
            style={{
              backgroundColor: '#372C5F',
              opacity: 0.15,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* ── Bold Centered Heading ── */}
        <div ref={mHeadRef} className="text-center mb-8 sm:mb-10 will-change-transform" style={{ opacity: 0 }}>
          <h2 className="font-['ario-sans',sans-serif] font-black uppercase tracking-[-0.04em] leading-[0.90]">
            <span
              className="block"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 4rem)', color: '#020202' }}
            >
              BUILT AROUND
            </span>
            <span
              className="block mt-1"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 4rem)', color: '#372C5F' }}
            >
              BETTER
            </span>
            <span
              className="block"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 4rem)', color: '#020202' }}
            >
              ORGANISATIONS.
            </span>
          </h2>

          {/* Decorative accent bar */}
          <div className="w-16 h-0.5 bg-[#372C5F] rounded-full mx-auto mt-6" />
        </div>

        {/* ── Supporting narrative (centered) ── */}
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="font-['ario-sans',sans-serif] text-[14.5px] sm:text-[16px] text-[#333742] font-normal leading-[1.62] max-w-md mx-auto"
          >
            GHMC partners with organisations to strengthen the way they are
            structured, managed and operated — combining strategic thinking
            with a deep understanding of people and processes.
          </p>
        </div>

        {/* ── Image with clip-path reveal ── */}
        <div
          ref={mImageRef}
          className="relative w-full overflow-hidden mb-12 sm:mb-16 will-change-[clip-path,transform]"
          style={{ aspectRatio: '16 / 11', clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
        >
          <img
            ref={mImageInnerRef}
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
            alt="GHMC consulting environment — team collaboration"
            className="w-full h-full object-cover will-change-transform"
            style={{ transform: 'scale(1.06)' }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, transparent 40%, rgba(55,44,95,0.08) 100%)',
            }}
          />
        </div>

        {/* ── Description ── */}
        <div ref={mDescRef} className="mb-14 sm:mb-16 will-change-transform" style={{ opacity: 0 }}>
          <h3
            className="font-['ario-sans',sans-serif] text-[1.1rem] sm:text-[1.25rem] font-bold uppercase tracking-[-0.02em] leading-[1.28] mb-4"
            style={{ color: '#1E1E24' }}
          >
            WE HELP ORGANISATIONS
            <br />
            BECOME STRONGER FROM WITHIN.
          </h3>
          <p
            className="font-['ario-sans',sans-serif] text-[14.5px] sm:text-[15.5px] font-normal leading-[1.68]"
            style={{ color: '#6F6B78' }}
          >
            GHMC works with organisations to address challenges across people,
            processes and structure. By combining strategic thinking with
            practical execution, we help create clearer ways of working,
            stronger capabilities and sustainable performance.
          </p>
        </div>

        {/* ── Philosophy (Vertical stacked on mobile) ── */}
        <div ref={mPhilosRef} className="mb-14 sm:mb-16 will-change-transform" style={{ opacity: 0 }}>
          {/* Thin top separator */}
          <div className="w-full h-px bg-[#372C5F]/10 mb-8" />

          <div className="flex flex-col items-start gap-1.5">
            {philosophyItems.map((item, i) => (
              <span
                key={i}
                className={`font-['ario-sans',sans-serif] ${
                  item.type === 'word'
                    ? 'font-black uppercase tracking-[-0.03em]'
                    : item.type === 'result'
                    ? 'font-black uppercase tracking-[-0.03em]'
                    : 'font-light'
                }`}
                style={{
                  fontSize:
                    item.type === 'result'
                      ? 'clamp(1.6rem, 7vw, 2.4rem)'
                      : item.type === 'word'
                      ? 'clamp(1.4rem, 6vw, 2rem)'
                      : '1.3rem',
                  color:
                    item.type === 'result'
                      ? '#1E1E24'
                      : item.type === 'word'
                      ? '#372C5F'
                      : '#C9B887',
                }}
              >
                {item.text}
              </span>
            ))}
          </div>

          {/* Thin bottom separator */}
          <div className="w-full h-px bg-[#372C5F]/10 mt-8" />
        </div>

        {/* ── CTA ── */}
        <div ref={mCtaRef} className="will-change-transform" style={{ opacity: 0 }}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 font-['ario-sans',sans-serif] text-[13px] font-bold uppercase tracking-[0.14em] cursor-pointer"
            style={{ color: '#372C5F' }}
          >
            <span
              className="relative pb-1"
              style={{ borderBottom: '1.5px solid #372C5F' }}
            >
              DISCOVER GHMC
            </span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
