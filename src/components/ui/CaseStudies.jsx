import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Selected GHMC Case Studies Data ──
const CASE_STUDIES_DATA = [
  {
    id: 'case-1',
    sector: 'Energy & Sustainability',
    metric: '+34% Flow Velocity · €14M Saved',
    headline: 'Re-engineering Operational Throughput for a Global Renewable Energy Operator',
    synopsis:
      'Facing operational bottlenecks and ballooning transformation costs across multi-regional assets, GHMC re-architected the client’s core value streams—eliminating execution friction and decoupling overhead from revenue expansion.',
    clientMeta: 'Case Study · European Energy Practice',
    image: '/assets/insights/insight-operations.jpg',
    href: '#contact',
  },
  {
    id: 'case-2',
    sector: 'Telecom & Infrastructure',
    metric: '-28% Opex Bloat · Zero Outages',
    headline: 'Navigating the Infrastructure Opex Reckoning in Next-Gen Telecommunications',
    synopsis:
      'Uncalibrated automation investments had escalated recurring operating expenditures. GHMC instituted predictive infrastructure governance and disciplined resource allocation, reclaiming vital margin without slowing rollout.',
    clientMeta: 'Case Study · Digital Infrastructure Practice',
    image: '/assets/insights/insight-governance.jpg',
    href: '#contact',
  },
  {
    id: 'case-3',
    sector: 'Organisational Architecture',
    metric: '2.4x Execution Speed · 4 Units',
    headline: 'Transitioning a $1.2B Conglomerate from Rigid Silos to a Modular Operating Model',
    synopsis:
      'Market volatility had immobilized centralized executive decision-making. GHMC dismantled monolithic departmental silos into four high-autonomy operational nodes, cutting cycle times by more than half.',
    clientMeta: 'Case Study · Enterprise Architecture Practice',
    image: '/assets/insights/insight-strategy.jpg',
    href: '#contact',
  },
  {
    id: 'case-4',
    sector: 'Leadership & Human Capital',
    metric: '92% Executive Retention · 8,500 Personnel',
    headline: 'Synchronizing Cultural Velocity with Large-Scale Merger & Operating Redesign',
    synopsis:
      'Following a cross-border acquisition, divergent operating habits threatened post-merger integration. GHMC established clear accountability architectures and aligned incentives across 8,500 team members worldwide.',
    clientMeta: 'Case Study · Leadership & Transformation Practice',
    image: '/assets/insights/insight-leadership.jpg',
    href: '#contact',
  },
];

/**
 * Editorial Case Study Item — Flat, Professional, Zero-Card Layout
 */
function EditorialCaseStudy({ item, isBookmarked, onToggleBookmark }) {
  return (
    <article className="group flex flex-col justify-between h-full select-none">
      <div className="flex flex-col">
        {/* ── Visual Media: Crisp Editorial Frame (No Rounded Card Shell) ── */}
        <a
          href={item.href}
          className="relative block w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-[#12101E]/5 mb-3 sm:mb-4.5"
        >
          <img
            src={item.image}
            alt={item.headline}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
            loading="lazy"
            decoding="async"
          />
        </a>

        {/* ── Sector Eyebrow (Brand Purple #372C5F) ── */}
        <div className="mb-1 sm:mb-1.5">
          <span className="font-['ario-sans',sans-serif] text-[11px] sm:text-[13px] font-semibold text-[#372C5F] tracking-normal">
            {item.sector}
          </span>
        </div>

        {/* ── Headline: Bold Obsidian Grotesque ── */}
        <h3 className="font-['ario-sans',sans-serif] text-[13.5px] sm:text-[18px] md:text-[21px] lg:text-[23px] font-bold text-[#020202] tracking-[-0.025em] leading-[1.22] sm:leading-[1.24] mb-2 sm:mb-3 group-hover:text-[#372C5F] transition-colors duration-200">
          <a
            href={item.href}
            className="inline hover:underline decoration-[#372C5F]/40 underline-offset-2"
          >
            {item.headline}
          </a>
        </h3>

        {/* ── Narrative Synopsis: Challenge & Outcome ── */}
        <p className="font-['ario-sans',sans-serif] text-[11px] sm:text-[13.5px] lg:text-[14.5px] text-[#4a4d55] font-normal leading-[1.52] sm:leading-[1.58] line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">
          {item.synopsis}
        </p>
      </div>

      {/* ── Footer Row: Client Practice Meta on Left, Bookmark Outline on Right ── */}
      <div className="pt-2 sm:pt-3 mt-auto flex items-center justify-between gap-3">
        <span className="font-['ario-sans',sans-serif] text-[10.5px] sm:text-[12px] text-[#717682] font-normal truncate max-w-[80%]">
          {item.clientMeta}
        </span>

        {/* Bookmark Icon */}
        <button
          type="button"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark case study'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark(item.id);
          }}
          className="p-1 -mr-1 text-[#717682] hover:text-[#372C5F] transition-colors duration-150 cursor-pointer active:scale-90"
        >
          <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200 ${
              isBookmarked
                ? 'fill-[#372C5F] stroke-[#372C5F]'
                : 'fill-transparent stroke-current'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

/**
 * Case Studies Section — Zero-Card Editorial Layout with Reliable Visibility
 */
export default function CaseStudies() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const labelLineRef = useRef(null);
  const headLine1Ref = useRef(null);
  const headLine2Ref = useRef(null);
  const accentBarRef = useRef(null);
  const narrativeRef = useRef(null);
  const gridRef = useRef(null);

  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (labelLineRef.current) gsap.set(labelLineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Cohesive timeline triggered when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          labelLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
          '-=0.4'
        )
        .fromTo(
          [headLine1Ref.current, headLine2Ref.current],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out' },
          '-=0.6'
        )
        .fromTo(
          accentBarRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          narrativeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          gridRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
          '-=0.4'
        );
    }, section);

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-transparent text-[#020202] py-20 sm:py-28 lg:py-36"
    >
      {/* ── Background Decorative Ambient Elements (Matching AboutUsSection) ── */}
      <div
        className="absolute top-24 left-10 w-80 h-80 rounded-full bg-[#372C5F]/[0.05] blur-3xl pointer-events-none will-change-transform"
      />
      <div
        className="absolute bottom-24 right-10 w-96 h-96 rounded-full bg-[#372C5F]/[0.04] blur-3xl pointer-events-none will-change-transform"
      />

      {/* Floating accent dots */}
      <div
        className="absolute top-1/3 left-1/12 w-3 h-3 rounded-full bg-[#372C5F]/20 pointer-events-none"
      />
      <div
        className="absolute bottom-1/3 right-1/12 w-4 h-4 rounded-full bg-[#372C5F]/15 pointer-events-none"
      />

      <div className="relative z-10 px-4 sm:px-8 lg:px-14 xl:px-20 max-w-7xl mx-auto">
        {/* ── CASE STUDIES Eyebrow + Divider Line (extends to whole screen) ── */}
        <div className="flex items-center gap-4 sm:gap-5 mb-14 sm:mb-20 overflow-visible">
          <span
            ref={labelRef}
            className="font-['ario-sans',sans-serif] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.18em] whitespace-nowrap shrink-0 will-change-transform"
            style={{ color: '#372C5F' }}
          >
            CASE STUDIES
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

        {/* ── BOLD 2-LINE HEADING IN THE CENTER ── */}
        <div className="flex flex-col items-center mb-6 text-center">
          <h2 className="font-['ario-sans',sans-serif] font-black uppercase tracking-[-0.045em] leading-[0.88] select-none max-w-5xl mx-auto">
            <span
              ref={headLine1Ref}
              className="block text-[#020202] will-change-transform"
              style={{
                fontSize: 'clamp(2.4rem, 6.8vw, 5.8rem)',
                letterSpacing: '-0.045em',
              }}
            >
              SELECTED
            </span>
            <span
              ref={headLine2Ref}
              className="block text-[#372C5F] mt-1 sm:mt-2 will-change-transform"
              style={{
                fontSize: 'clamp(2.4rem, 6.8vw, 5.8rem)',
                letterSpacing: '-0.045em',
              }}
            >
              ENGAGEMENTS.
            </span>
          </h2>
        </div>

        {/* ── Decorative Accent Bar ── */}
        <div className="flex justify-center mb-8">
          <div
            ref={accentBarRef}
            className="w-20 sm:w-24 h-1 bg-[#372C5F] rounded-full will-change-transform"
            style={{ transformOrigin: 'center center' }}
          />
        </div>

        {/* ── Supporting Narrative Statement ── */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p
            ref={narrativeRef}
            className="font-['ario-sans',sans-serif] text-[15.5px] sm:text-[17.5px] lg:text-[18.5px] text-[#333742] font-normal leading-[1.68] max-w-2xl mx-auto will-change-transform"
          >
            A selection of recent advisory engagements showcasing how GHMC partners with enterprise
            leadership to resolve operational friction, modernise organisational architecture, and
            drive measurable, lasting performance.
          </p>
        </div>

        {/* ── EDITORIAL GRID (Zero-Card Look, Fine Hairline Column Dividers, 2 Columns on Mobile & Desktop) ── */}
        <div ref={gridRef} className="will-change-transform">
          {/* Row 1: Case Studies 1 & 2 */}
          <div className="grid grid-cols-2 divide-x divide-[#372C5F]/15 pb-8 sm:pb-12 border-b border-[#372C5F]/15">
            <div className="pr-3 sm:pr-6 lg:pr-8">
              <EditorialCaseStudy
                item={CASE_STUDIES_DATA[0]}
                isBookmarked={bookmarkedIds.includes(CASE_STUDIES_DATA[0].id)}
                onToggleBookmark={toggleBookmark}
              />
            </div>
            <div className="pl-3 sm:pl-6 lg:pl-8">
              <EditorialCaseStudy
                item={CASE_STUDIES_DATA[1]}
                isBookmarked={bookmarkedIds.includes(CASE_STUDIES_DATA[1].id)}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          </div>

          {/* Row 2: Case Studies 3 & 4 */}
          <div className="grid grid-cols-2 divide-x divide-[#372C5F]/15 pt-8 sm:pt-12">
            <div className="pr-3 sm:pr-6 lg:pr-8">
              <EditorialCaseStudy
                item={CASE_STUDIES_DATA[2]}
                isBookmarked={bookmarkedIds.includes(CASE_STUDIES_DATA[2].id)}
                onToggleBookmark={toggleBookmark}
              />
            </div>
            <div className="pl-3 sm:pl-6 lg:pl-8">
              <EditorialCaseStudy
                item={CASE_STUDIES_DATA[3]}
                isBookmarked={bookmarkedIds.includes(CASE_STUDIES_DATA[3].id)}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
