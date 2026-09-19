import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from '@/components/ui/logo-cloud-14-utils/logos';

gsap.registerPlugin(ScrollTrigger);

// Original logo list from logo-cloud-14 (Screenshot 2):
// 1. ahrefs, 2. TURSO, 3. ROBLOX, 4. hulu, 5. Suno, 6. Soldera, 7. mintlify, 8. clerk, 9. ahrefs
const logos = [
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
  Logo01,
];

/**
 * WhoWeAreSection — Editorial "About GHMC / Who We Are"
 *
 * Integrated Sections:
 *   1. 04 — WHO WE ARE header + rule
 *   2. BUILT AROUND / BETTER / ORGANISATIONS 3-tier heading with accent bar
 *   3. Supporting narrative paragraph
 *   4. Original logo-cloud-14 component (authentic brand logos & dark styling as in Screenshot 2)
 *   5. PEOPLE + PROCESS + STRUCTURE → PERFORMANCE philosophy formula
 *   6. DISCOVER GHMC → CTA
 */
export default function WhoWeAreSection() {
  const sectionRef = useRef(null);

  // ── Header refs ──
  const labelRef = useRef(null);
  const labelLineRef = useRef(null);
  const headLine1Ref = useRef(null);
  const headLine2Ref = useRef(null);
  const headLine3Ref = useRef(null);
  const accentBarRef = useRef(null);
  const narrativeRef = useRef(null);

  // ── Logo cloud refs ──
  const logoGridRef = useRef(null);
  const logoCardRefs = useRef([]);

  // ── Philosophy refs ──
  const philosBlockRef = useRef(null);
  const philosHeadingRef = useRef(null);
  const philosLineRef = useRef(null);
  const philosItemRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      const allEls = [
        labelRef.current,
        headLine1Ref.current,
        headLine2Ref.current,
        headLine3Ref.current,
        accentBarRef.current,
        narrativeRef.current,
        logoGridRef.current,
        philosHeadingRef.current,
        ...logoCardRefs.current,
        ...philosItemRefs.current,
      ].filter(Boolean);
      allEls.forEach((el) => gsap.set(el, { opacity: 1, y: 0, scale: 1 }));

      if (labelLineRef.current) gsap.set(labelLineRef.current, { scaleX: 1 });
      if (philosLineRef.current) gsap.set(philosLineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // ── Stage 1: Label & Rule ──
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true },
          }
        );
      }
      if (labelLineRef.current) {
        gsap.fromTo(
          labelLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true },
          }
        );
      }

      // ── Stage 2: Three-line headline stagger ──
      const headLines = [headLine1Ref.current, headLine2Ref.current, headLine3Ref.current].filter(Boolean);
      if (headLines.length) {
        gsap.fromTo(
          headLines,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: headLine1Ref.current, start: 'top 85%', once: true },
          }
        );
      }

      // ── Stage 3: Accent bar & narrative ──
      if (accentBarRef.current) {
        gsap.fromTo(
          accentBarRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: accentBarRef.current, start: 'top 86%', once: true },
          }
        );
      }
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: narrativeRef.current, start: 'top 86%', once: true },
          }
        );
      }

      // ── Stage 4: Professional "Comes Up" ScrollTrigger Reveal for Logo Cloud ──
      const featuredCard = logoCardRefs.current[0];
      const logoTiles = logoCardRefs.current.slice(1).filter(Boolean);

      // 4a. Featured CTA Card "Comes Up" Reveal
      if (featuredCard && logoGridRef.current) {
        gsap.fromTo(
          featuredCard,
          { y: 55, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: logoGridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 4b. 9 Partner Logo Tiles Staggered Wave "Comes Up" Reveal
      if (logoTiles.length && logoGridRef.current) {
        gsap.fromTo(
          logoTiles,
          { y: 48, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: {
              amount: 0.45,
              from: 'start',
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: logoGridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 4c. Subtle Upward Parallax on Scroll (Desktop only)
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isDesktop && logoGridRef.current) {
        gsap.to(logoGridRef.current, {
          y: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: logoGridRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // ── Stage 5: Philosophy heading & formula animation ──
      if (philosHeadingRef.current) {
        gsap.fromTo(
          philosHeadingRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: philosHeadingRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      const items = philosItemRefs.current.filter(Boolean);
      if (items.length) {
        gsap.fromTo(
          items,
          { y: 28, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: philosBlockRef.current, start: 'top 84%', once: true },
          }
        );
      }
      if (philosLineRef.current) {
        gsap.fromTo(
          philosLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: philosBlockRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, section);

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  const setPhilosRef = (i) => (el) => {
    philosItemRefs.current[i] = el;
  };

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
      <div className="relative z-10 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        {/* ── WHO WE ARE Label + Divider Line (extends to whole screen) ── */}
        <div className="flex items-center gap-4 sm:gap-5 mb-14 sm:mb-20 overflow-visible">
          <span
            ref={labelRef}
            className="font-['ario-sans',sans-serif] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.18em] whitespace-nowrap shrink-0 will-change-transform"
            style={{ color: '#372C5F', opacity: 0 }}
          >
            WHO WE ARE
          </span>
          <div
            ref={labelLineRef}
            className="h-px will-change-transform"
            style={{
              width: '100vw',
              backgroundColor: '#372C5F',
              opacity: 0.18,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* ── BOLD 3-LINE HEADING ── */}
        <div className="flex flex-col items-center mb-6 text-center">
          <h2 className="font-['ario-sans',sans-serif] font-black uppercase tracking-[-0.045em] leading-[0.88] select-none max-w-5xl mx-auto">
            <span
              ref={headLine1Ref}
              className="block text-[#020202] will-change-transform"
              style={{ fontSize: 'clamp(2.4rem, 6.8vw, 5.8rem)', letterSpacing: '-0.045em', opacity: 0 }}
            >
              BUILT AROUND
            </span>
            <span
              ref={headLine2Ref}
              className="block text-[#372C5F] mt-1 sm:mt-2 will-change-transform"
              style={{ fontSize: 'clamp(2.4rem, 6.8vw, 5.8rem)', letterSpacing: '-0.045em', opacity: 0 }}
            >
              BETTER
            </span>
            <span
              ref={headLine3Ref}
              className="block text-[#372C5F] mt-1 sm:mt-2 will-change-transform"
              style={{ fontSize: 'clamp(2.4rem, 6.8vw, 5.8rem)', letterSpacing: '-0.045em', opacity: 0 }}
            >
              ORGANISATIONS.
            </span>
          </h2>
        </div>

        {/* ── Decorative Accent Bar ── */}
        <div className="flex justify-center mb-8">
          <div
            ref={accentBarRef}
            className="w-20 sm:w-24 h-1 bg-[#372C5F] rounded-full will-change-transform"
            style={{ opacity: 0, transformOrigin: 'center center' }}
          />
        </div>

        {/* ── Supporting Narrative Statement ── */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p
            ref={narrativeRef}
            className="font-['ario-sans',sans-serif] text-[15.5px] sm:text-[17.5px] lg:text-[18.5px] text-[#333742] font-normal leading-[1.68] max-w-2xl mx-auto will-change-transform"
            style={{ opacity: 0 }}
          >
            GHMC partners with organisations to strengthen the way they are
            structured, managed and operated. We bring together strategic
            thinking, practical expertise and a deep understanding of people
            and processes to help organisations overcome challenges and build
            sustainable performance.
          </p>
        </div>

        {/* ── LOGO CLOUD 14 (Synced with Page Theme, Preserving Authentic Logos) ── */}
        <div
          ref={logoGridRef}
          className="mx-auto mt-8 mb-24 sm:mb-32 max-w-5xl will-change-transform"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-4 md:grid-cols-4">
            {/* Featured Card — Spans all 3 columns on mobile, 1 col x 3 rows on md+ */}
            <div
              ref={(el) => (logoCardRefs.current[0] = el)}
              className="col-span-3 md:col-span-1 md:row-span-3 flex flex-col rounded-2xl p-5 sm:p-7 justify-between will-change-transform transition-all duration-300"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255, 255, 255, 0.94) 0%, rgba(246, 244, 251, 0.84) 100%)',
                border: '1px solid rgba(55, 44, 95, 0.14)',
                boxShadow:
                  '0 8px 30px -4px rgba(55, 44, 95, 0.07), inset 0 1px 0 0 rgba(255, 255, 255, 1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="font-['ario-sans',sans-serif] mb-6 sm:mb-8 max-w-[22ch] text-balance font-black uppercase text-xl sm:text-2xl tracking-[-0.03em] leading-[1.14] text-[#020202]">
                Trusted by teams and companies around the world
              </p>

              <Button
                className="mt-auto w-full sm:w-auto self-start bg-[#372C5F] hover:bg-[#372C5F]/90 text-white font-['ario-sans',sans-serif] font-bold uppercase tracking-[0.09em] text-xs px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                size="lg"
                asChild
              >
                <a href="#contact" className="inline-flex items-center justify-center gap-2">
                  View companies <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* 9 Original Logo Tiles (3 in a row on mobile, 3 in a row across 3 rows on md+) */}
            {logos.map((Logo, index) => (
              <div
                key={index}
                ref={(el) => (logoCardRefs.current[index + 1] = el)}
                className="col-span-1 group flex w-full items-center justify-center rounded-xl px-2 py-4 sm:px-3 sm:py-6 md:py-8 will-change-transform transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#372C5F]/35 hover:shadow-[0_10px_24px_-2px_rgba(55,44,95,0.1)]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(248, 246, 252, 0.70) 100%)',
                  border: '1px solid rgba(55, 44, 95, 0.10)',
                  boxShadow:
                    '0 2px 10px rgba(55, 44, 95, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center w-full max-w-[85%] sm:max-w-none">
                  <Logo className="h-5 sm:h-6 md:h-8 w-auto max-w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Philosophy Section Heading ── */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#372C5F]/10 border border-[#372C5F]/15 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#372C5F]" />
            <span className="font-['ario-sans',sans-serif] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#372C5F]">
              CORE PHILOSOPHY
            </span>
          </div>

          <h3
            ref={philosHeadingRef}
            className="font-['ario-sans',sans-serif] font-black uppercase text-center text-[#020202] will-change-transform select-none max-w-4xl mx-auto"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            STRONGER ORGANISATIONS{' '}
            <span className="text-[#372C5F]">START FROM WITHIN.</span>
          </h3>

          <div className="w-16 sm:w-20 h-1 bg-[#372C5F] rounded-full mx-auto mt-4 sm:mt-5" />
        </div>

        {/* ── CORE PHILOSOPHY FORMULA ── */}
        <div ref={philosBlockRef} className="relative mb-16 sm:mb-20">
          {/* Horizontal dividing thread */}
          <div
            ref={philosLineRef}
            className="absolute left-0 right-0 h-px will-change-transform"
            style={{
              top: '50%',
              backgroundColor: '#372C5F',
              opacity: 0.12,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />

          <div className="relative flex items-center justify-center flex-nowrap whitespace-nowrap gap-2 sm:gap-3 md:gap-5 lg:gap-7 xl:gap-8 py-6 w-full">
            {philosophyItems.map((item, i) => (
              <span
                key={i}
                ref={setPhilosRef(i)}
                className={`font-['ario-sans',sans-serif] whitespace-nowrap shrink-0 will-change-transform ${
                  item.type === 'word'
                    ? 'font-black uppercase tracking-[-0.03em]'
                    : item.type === 'result'
                      ? 'font-black uppercase tracking-[-0.03em]'
                      : 'font-light'
                }`}
                style={{
                  fontSize:
                    item.type === 'result'
                      ? 'clamp(0.9rem, 2.1vw, 2.6rem)'
                      : item.type === 'word'
                        ? 'clamp(0.82rem, 1.9vw, 2.3rem)'
                        : 'clamp(0.75rem, 1.6vw, 1.9rem)',
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
      </div>
    </section>
  );
}