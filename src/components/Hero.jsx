import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingPathsBackground } from './ui/floating-paths';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero component for GHMC
 *
 * Layout:
 *   - Bottom-Left: Static "GHMC" wordmark (single text node, identical to Preloader)
 *   - Top-Right: Editorial headline with comes-up entrance animation
 *   - Bottom-Right: Video card flush to bottom & right edges, with comes-up entrance
 *   - Background: Dual-layer floating paths covering the full viewport
 *
 * Scroll choreography (pinned scrub):
 *   - Video expands from bottom-right corner → fullscreen
 *   - GHMC wordmark glides upward, transitions to white
 *   - Headline fades out
 *   - Floating paths fade out
 */
const Hero = ({ introDone = false }) => {
  const heroRef = useRef(null);
  const wordmarkRef = useRef(null);
  const letterRefs = useRef([]);
  const headlineBlockRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const credibilityRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoCardRef = useRef(null);
  const videoPlaceholderRef = useRef(null);
  const pathsBgRef = useRef(null);

  // Mobile refs (for dedicated Screenshot 2 vertical layout)
  const mobileWordmarkRef = useRef(null);
  const mobileContentRef = useRef(null);
  const mobileVideoRef = useRef(null);

  // ─── 1. Individual Comes-Up Entrance Animations (staggered on intro complete) ───
  useEffect(() => {
    if (!introDone) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const items = [
        eyebrowRef.current,
        headlineLine1Ref.current,
        headlineLine2Ref.current,
        subtextRef.current,
        ctaBtnRef.current,
        credibilityRef.current,
        mobileWordmarkRef.current,
        mobileContentRef.current,
        mobileVideoRef.current,
      ].filter(Boolean);
      items.forEach((el) => gsap.set(el, { y: 0, opacity: 1, scale: 1 }));
      if (videoContainerRef.current) gsap.set(videoContainerRef.current, { opacity: 1 });
      if (videoCardRef.current) gsap.set(videoCardRef.current, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ delay: 0.1 });

      // 1. Eyebrow comes up
      if (eyebrowRef.current) {
        entranceTl.to(
          eyebrowRef.current,
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
          0
        );
      }

      // 2. Headline Line 1 rises through clip mask
      if (headlineLine1Ref.current) {
        entranceTl.to(
          headlineLine1Ref.current,
          { y: 0, opacity: 1, duration: 0.95, ease: 'power4.out' },
          0.08
        );
      }

      // 3. Headline Line 2 rises through clip mask with slight offset
      if (headlineLine2Ref.current) {
        entranceTl.to(
          headlineLine2Ref.current,
          { y: 0, opacity: 1, duration: 0.95, ease: 'power4.out' },
          0.16
        );
      }

      // 4. Supporting statement glides up
      if (subtextRef.current) {
        entranceTl.to(
          subtextRef.current,
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.26
        );
      }

      // 5. CTA Button springs into view
      if (ctaBtnRef.current) {
        entranceTl.to(
          ctaBtnRef.current,
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(1.3)' },
          0.34
        );
      }

      // 6. Credibility Badge reveals
      if (credibilityRef.current) {
        entranceTl.to(
          credibilityRef.current,
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.42
        );
      }

      // Desktop Video container and card rise into view
      if (videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.18,
        });
      }
      if (videoCardRef.current) {
        gsap.to(videoCardRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.26,
        });
      }

      // Mobile Entrance: wordmark, editorial content stack, and full-width video card
      if (mobileWordmarkRef.current) {
        gsap.to(mobileWordmarkRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.05,
        });
      }
      if (mobileContentRef.current) {
        gsap.to(mobileContentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          delay: 0.15,
        });
      }
      if (mobileVideoRef.current) {
        gsap.to(mobileVideoRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          delay: 0.28,
        });
      }
    });

    return () => ctx.revert();
  }, [introDone]);

  // ─── 2. Desktop-Only: Pinned Fullscreen Video Expansion & Wordmark Glide ───
  useEffect(() => {
    // Only enable pinned expansion on desktop (width >= 768px)
    if (window.innerWidth < 768) return;

    const heroEl = heroRef.current;
    if (!heroEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const travelDistance = window.innerHeight * 0.55;

      // Compute clipPath from the larger video placeholder position
      const computeClip = () => {
        if (!videoPlaceholderRef.current || !heroEl) return null;
        const r = videoPlaceholderRef.current.getBoundingClientRect();
        const h = heroEl.getBoundingClientRect();
        return {
          top: Math.max(0, Math.round(r.top - h.top)),
          right: Math.max(0, Math.round(h.right - r.right)),
          bottom: Math.max(0, Math.round(h.bottom - r.bottom)),
          left: Math.max(0, Math.round(r.left - h.left)),
        };
      };

      const applyClip = () => {
        const clip = computeClip();
        if (clip && videoContainerRef.current) {
          gsap.set(videoContainerRef.current, {
            clipPath: `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px round 0px)`,
          });
        }
      };

      applyClip();
      setTimeout(applyClip, 150);

      const tl = gsap.timeline();

      // Video expands to fullscreen
      tl.to(videoContainerRef.current, {
        clipPath: 'inset(0px 0px 0px 0px round 0px)',
        duration: 1,
        ease: 'power3.inOut',
      }, 0);

      // Wordmark glides upward
      tl.to(wordmarkRef.current, {
        y: -travelDistance,
        duration: 1,
        ease: 'power3.inOut',
      }, 0);

      // Wordmark letters turn white
      tl.to(letterRefs.current, {
        color: '#ffffff',
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.inOut',
      }, 0.25);

      // ── Clean Unified Editorial Fade-Out (NO parallax drift on scroll) ──
      if (headlineBlockRef.current) {
        tl.to(headlineBlockRef.current, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        }, 0.04);
      }

      // Floating paths fade out cleanly
      if (pathsBgRef.current) {
        tl.to(pathsBgRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        }, 0.08);
      }


      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        animation: tl,
      });

      const handleResize = () => {
        if (window.innerWidth >= 768) {
          applyClip();
          ScrollTrigger.refresh();
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, heroEl);

    return () => ctx.revert();
  }, []);

  return (
    <div id="hero" className="hero-scroll-wrapper relative w-full overflow-x-clip">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. MOBILE HERO VIEW — Assembled like Reference Photo (Ario Law Mobile)
          - Header: Managed by interactive GHMC Navbar
          - Wordmark: GHMC
          - Headline: MANAGEMENT CONSULTANCY + BUILDING ORGANISATIONS THAT PERFORM.
          - Video (NO border)
          - Supporting copy ("We help organisations...") + CTA button
          ────────────────────────────────────────────────────────────────────────── */}
      <section className="block md:hidden relative w-full min-h-screen bg-white text-black px-5 pt-24 pb-16 overflow-x-clip">
        {/* Floating Paths subtle background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
          <FloatingPathsBackground className="absolute inset-0" />
        </div>
        {/* Subtle radial atmosphere */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 15%, rgba(55, 44, 95, 0.05) 0%, transparent 65%)',
          }}
        />

        {/* 1.2 Prominent Wordmark (Matching giant ARIO in reference photo) */}
        <div ref={mobileWordmarkRef} className="relative z-10 mb-6 select-none will-change-transform">
          <span className="font-['ario-sans',sans-serif] font-bold uppercase tracking-[-0.05em] leading-[0.85] text-[4.75rem] sm:text-[5.75rem] block text-[#372C5F]">
            GHMC
          </span>
        </div>

        {/* 1.3 Headline Section (In place of "we enjoy..." line in reference photo) */}
        <div className="relative z-10 w-full mb-6">
          <div className="inline-flex items-center gap-2 font-['ario-sans',sans-serif] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#372C5F] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#372C5F] shrink-0" />
            <span>MANAGEMENT CONSULTANCY</span>
          </div>
          <h1 className="font-['ario-sans',sans-serif] text-[2.1rem] sm:text-[2.5rem] font-bold uppercase tracking-[-0.04em] leading-[1.04] text-[#020202]">
            <span className="block">BUILDING</span>
            <span className="block">ORGANISATIONS</span>
            <span className="block">THAT PERFORM.</span>
          </h1>
        </div>

        {/* 1.4 The Video (NO border) */}
        <div
          ref={mobileVideoRef}
          className="relative z-10 w-full rounded-2xl overflow-hidden shadow-xl bg-black aspect-[16/10] will-change-transform mb-8"
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          <video
            src="/Videos-asset/mixkit-busy-office-space-918-hd-ready.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </div>

        {/* 1.5 Lower Section (In place of "Rock the future..." line in reference photo) */}
        <div
          ref={mobileContentRef}
          className="relative z-10 w-full flex flex-col items-start will-change-transform"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {/* Supporting Statement */}
          <p className="font-['ario-sans',sans-serif] text-[15px] sm:text-[16px] font-normal leading-[1.55] tracking-[-0.02em] text-[#4a4d55] mb-5 max-w-[460px]">
            We help organisations strengthen their people, processes and structures for sustainable growth.
          </p>

          {/* Action Row: CTA Button + Credibility Element */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 w-full">
            <a
              href="#impact"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-['ario-sans',sans-serif] text-[13px] font-semibold tracking-wide whitespace-nowrap shadow-[0_2px_8px_rgba(55,44,95,0.2)] active:scale-95 transition-all cursor-pointer shrink-0"
              style={{ backgroundColor: '#372C5F', color: '#ffffff' }}
            >
              <span className="whitespace-nowrap" style={{ color: '#ffffff' }}>View Our Impact</span>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-black/10 bg-black/[0.02] whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#372C5F] shrink-0" />
              <span className="font-['ario-sans',sans-serif] text-[10.5px] font-semibold tracking-[0.14em] uppercase text-[#372C5F]">
                20+ YEARS OF ORGANISATIONAL EXPERIENCE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. DESKTOP HERO VIEW — Pinned Scroll, Fullscreen Expansion & Large Video
          ────────────────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="hidden md:block relative w-full h-screen min-h-[640px] max-h-[1200px] overflow-hidden select-none"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* ── Floating Paths — Dual-layer mirrored waves ── */}
        <div ref={pathsBgRef} className="absolute inset-0 z-0 overflow-hidden">
          <FloatingPathsBackground className="absolute inset-0" />
        </div>

        {/* ── Subtle radial atmosphere ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 80% 20%, rgba(55, 44, 95, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(55, 44, 95, 0.05) 0%, transparent 55%)',
          }}
        />

        {/* ── Middle-Right: Editorial Content Section ── */}
        <div
          className="absolute z-10 pointer-events-none flex flex-col justify-center text-left"
          style={{
            top: 'clamp(110px, 13vh, 150px)',
            right: 'clamp(24px, 5vw, 84px)',
          }}
        >
          <div
            ref={headlineBlockRef}
            className="pointer-events-auto w-full max-w-[560px] lg:max-w-[620px] flex flex-col items-start"
          >
            {/* 1. Small eyebrow / category */}
            <div className="overflow-hidden mb-3 sm:mb-3.5">
              <div
                ref={eyebrowRef}
                className="inline-flex items-center gap-2 font-['ario-sans',sans-serif] text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-[0.22em] will-change-transform"
                style={{ color: '#372C5F', opacity: 0, transform: 'translateY(24px)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#372C5F' }} />
                <span>MANAGEMENT CONSULTANCY</span>
              </div>
            </div>

            {/* 2. Main headline (Individual masked line-by-line reveals in authentic ario-sans) */}
            <div className="mb-3.5 sm:mb-4">
              <div className="overflow-hidden">
                <h1
                  ref={headlineLine1Ref}
                  className="font-['ario-sans',sans-serif] text-[2.1rem] sm:text-[2.65rem] md:text-[3rem] lg:text-[3.35rem] font-bold uppercase tracking-[-0.04em] leading-[1.04] will-change-transform block"
                  style={{
                    color: '#020202',
                    opacity: 0,
                    transform: 'translateY(36px)',
                  }}
                >
                  BUILDING ORGANISATIONS
                </h1>
              </div>
              <div className="overflow-hidden">
                <span
                  ref={headlineLine2Ref}
                  className="font-['ario-sans',sans-serif] text-[2.1rem] sm:text-[2.65rem] md:text-[3rem] lg:text-[3.35rem] font-bold uppercase tracking-[-0.04em] leading-[1.04] will-change-transform block"
                  style={{
                    color: '#020202',
                    opacity: 0,
                    transform: 'translateY(36px)',
                  }}
                >
                  THAT PERFORM
                </span>
              </div>
            </div>

            {/* 3. Supporting statement (1–2 lines) */}
            <div className="overflow-hidden mb-6 sm:mb-7">
              <p
                ref={subtextRef}
                className="font-['ario-sans',sans-serif] text-[15px] sm:text-[15.5px] font-normal leading-[1.55] tracking-[-0.02em] max-w-[480px] will-change-transform"
                style={{
                  color: '#4a4d55',
                  opacity: 0,
                  transform: 'translateY(24px)',
                }}
              >
                We help organisations strengthen their people, processes and structures to achieve sustainable growth.
              </p>
            </div>

            {/* 4. Action Row: CTA + Credibility Element */}
            <div className="w-full">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* CTA Button */}
                <div className="overflow-hidden">
                  <a
                    ref={ctaBtnRef}
                    href="#impact"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-['ario-sans',sans-serif] text-[13px] font-semibold tracking-wide whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(55,44,95,0.18)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_6px_18px_rgba(55,44,95,0.26)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer select-none shrink-0 will-change-transform"
                    style={{
                      backgroundColor: '#372C5F',
                      color: '#ffffff',
                      opacity: 0,
                      transform: 'translateY(28px) scale(0.96)',
                    }}
                  >
                    <span className="whitespace-nowrap" style={{ color: '#ffffff' }}>
                      View Our Impact
                    </span>
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      style={{ color: '#ffffff' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>

                {/* Small credibility element */}
                <div className="overflow-hidden">
                  <div
                    ref={credibilityRef}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-black/10 bg-black/[0.02] whitespace-nowrap shrink-0 will-change-transform"
                    style={{
                      opacity: 0,
                      transform: 'translateY(28px)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: '#372C5F' }}
                    />
                    <span
                      className="font-['ario-sans',sans-serif] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap"
                      style={{ color: '#372C5F' }}
                    >
                      20+ YEARS OF ORGANISATIONAL EXPERIENCE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom-Right: Video Placeholder — SHARP EDGES & BALANCED CINEMATIC SIZE ── */}
        <div
          ref={videoPlaceholderRef}
          className="absolute bottom-0 right-0 pointer-events-none opacity-0"
          style={{
            width: 'clamp(420px, 37vw, 680px)',
            aspectRatio: '16 / 9',
          }}
        />

        {/* ── Fullscreen Video Layer (Sharp Edges, 90° Corners) ── */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 z-20 overflow-hidden pointer-events-none will-change-[clip-path]"
          style={{
            opacity: 0,
            clipPath: 'inset(30% 0px 0px 35% round 0px)',
          }}
        >
          <div
            ref={videoCardRef}
            className="w-full h-full will-change-transform"
            style={{ opacity: 0, transform: 'translateY(40px)' }}
          >
            <video
              src="/Videos-asset/mixkit-busy-office-space-918-hd-ready.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.03) 40%, rgba(0,0,0,0.50) 100%)',
              }}
            />
          </div>
        </div>

        {/* ── GHMC Wordmark — IDENTICAL inline-block structure to Preloader ── */}
        <div
          ref={wordmarkRef}
          className="absolute z-30 select-none pointer-events-none will-change-transform"
          style={{
            left: 'clamp(16px, 4vw, 56px)',
            bottom: 'clamp(16px, 3vh, 48px)',
          }}
        >
          <span
            className="te-h1 block font-black uppercase tracking-tight whitespace-nowrap leading-[0.82]"
            style={{ letterSpacing: '-0.05em' }}
          >
            {['G', 'H', 'M', 'C'].map((letter, i) => (
              <span
                key={letter}
                ref={(el) => (letterRefs.current[i] = el)}
                className="inline-block"
                style={{ color: '#372C5F' }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Hero;
