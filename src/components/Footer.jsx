import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconPhone,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ghmc-private-limited",
    icon: IconBrandLinkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ghmc.me",
    icon: IconBrandInstagram,
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Capabilities",
    links: [
      { name: "Strategy & Corporate Finance", href: "#who-we-are" },
      { name: "Organizational Architecture", href: "#who-we-are" },
      { name: "Leadership & Board Governance", href: "#who-we-are" },
      { name: "Operational Agility & Scale", href: "#who-we-are" },
      { name: "Enterprise Technology & AI", href: "#who-we-are" },
      { name: "Restructuring & Turnaround", href: "#who-we-are" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Healthcare & Life Sciences", href: "#impact" },
      { name: "Financial Services & Capital Markets", href: "#impact" },
      { name: "Sovereign & Public Institutions", href: "#impact" },
      { name: "Technology & Telecommunications", href: "#impact" },
      { name: "Energy, Resources & Utilities", href: "#impact" },
      { name: "Industrial & Manufacturing", href: "#impact" },
    ],
  },
  {
    title: "Insights",
    links: [
      { name: "Executive Perspectives", href: "#case-studies" },
      { name: "Global Benchmarking Reports", href: "#case-studies" },
      { name: "Client Impact & Case Studies", href: "#case-studies" },
      { name: "Boardroom Strategic Briefings", href: "#case-studies" },
      { name: "The Impact Behind the Work", href: "#impact" },
      { name: "Global Research Library", href: "#case-studies" },
    ],
  },
  {
    title: "The Firm",
    links: [
      { name: "About GHMC", href: "#hero" },
      { name: "Who We Are", href: "#who-we-are" },
      { name: "Leadership & Partners", href: "#who-we-are" },
      { name: "Careers & Culture", href: "#contact" },
      { name: "Client Portal Access", href: "#contact" },
      { name: "Press & Media Relations", href: "#contact" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const newsletterRef = useRef(null);
  const brandColRef = useRef(null);
  const columnsRef = useRef(null);
  const legalRef = useRef(null);
  const bottomBarRef = useRef(null);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // GSAP Come-Up Animations
  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          start: "top 85%",
          once: true,
        },
      });

      // 1. Newsletter row entrance
      if (newsletterRef.current) {
        tl.fromTo(
          newsletterRef.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
        );
      }

      // 2. Brand column
      if (brandColRef.current) {
        tl.fromTo(
          brandColRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          "-=0.45"
        );
      }

      // 3. Columns stagger
      const cols = columnsRef.current?.children;
      if (cols && cols.length > 0) {
        tl.fromTo(
          Array.from(cols),
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.55"
        );
      }

      // 4. Legal disclaimer & bottom bar
      if (legalRef.current && bottomBarRef.current) {
        tl.fromTo(
          [legalRef.current, bottomBarRef.current],
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    }, footerEl);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim().length > 3 && email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-white text-[#020202] border-t border-black/10 font-['ario-sans',sans-serif] select-none pt-10 sm:pt-16 md:pt-20 pb-10 sm:pb-12"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        {/* ── 1. Top Section: Executive Briefings / Newsletter Subscription ── */}
        <div
          ref={newsletterRef}
          className="pb-8 sm:pb-12 border-b border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center will-change-transform"
        >
          <div className="lg:col-span-6">
            <span className="inline-block text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#372C5F] mb-1.5 sm:mb-2">
              Executive Perspectives
            </span>
            <h3 className="font-bold text-[19px] sm:text-[22px] md:text-[24px] tracking-[-0.03em] text-[#020202] leading-tight mb-2">
              Stay ahead with GHMC Boardroom Insights.
            </h3>
            <p className="text-[13px] sm:text-[13.5px] text-[#4a4d55] leading-[1.6] max-w-lg">
              Receive periodic strategic research, global economic benchmarks, and leadership advisories directly from our practice directors.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:items-end">
            {subscribed ? (
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#372C5F]/5 border border-[#372C5F]/20 text-[#372C5F] text-[13.5px] font-medium">
                <IconCheck className="w-4 h-4 text-[#372C5F] shrink-0" />
                <span>Thank you. You have been enrolled in GHMC Executive Briefings.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-md flex flex-col gap-2"
              >
                <div className="flex items-center rounded-lg border border-black/15 bg-white focus-within:border-[#372C5F] focus-within:ring-2 focus-within:ring-[#372C5F]/10 transition-all p-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email address"
                    required
                    className="w-full bg-transparent px-3 py-2 text-[13.5px] text-[#020202] placeholder:text-[#8c919c] outline-none font-['ario-sans',sans-serif]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#372C5F] hover:bg-[#020202] text-white text-[12.5px] font-semibold tracking-wide uppercase transition-colors shrink-0 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Subscribe</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-[#717682] pl-1">
                  By subscribing, you agree to our Privacy Policy and Terms of Engagement.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* ── 2. Main Corporate Directory Grid ── */}
        <div className="py-10 sm:py-14 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 border-b border-black/10">
          {/* Brand Column (4 Columns on Desktop) */}
          <div
            ref={brandColRef}
            className="lg:col-span-4 flex flex-col justify-between will-change-transform"
          >
            <div>
              {/* GHMC Corporate Wordmark */}
              <a href="#hero" className="inline-block select-none mb-1 group">
                <span className="font-black text-[28px] tracking-[-0.04em] uppercase text-[#020202] leading-none group-hover:text-[#372C5F] transition-colors block">
                  GHMC
                </span>
                <span className="text-[9.5px] font-bold tracking-[0.24em] text-[#372C5F] uppercase block mt-1">
                  Private Limited
                </span>
              </a>

              {/* Corporate Overview */}
              <p className="text-[13.5px] text-[#4a4d55] leading-[1.65] max-w-sm mt-4 mb-6">
                A premier management consulting and advisory firm advising leadership teams, enterprises, and institutions on strategic transformation and organizational performance.
              </p>

              {/* Corporate Contact Details */}
              <div className="flex flex-col space-y-2 text-[13px] text-[#4a4d55] mb-6">
                <a
                  href="mailto:tyara.connect@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-[#372C5F] transition-colors"
                >
                  <IconMail className="w-4 h-4 text-[#372C5F] shrink-0" />
                  <span>tyara.connect@gmail.com</span>
                </a>
                <a
                  href="tel:+919512919235"
                  className="inline-flex items-center gap-2 hover:text-[#372C5F] transition-colors"
                >
                  <IconPhone className="w-4 h-4 text-[#372C5F] shrink-0" />
                  <span>+91 95129 19235</span>
                </a>
              </div>
            </div>

            {/* Social Media Integration */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#372C5F] mb-3">
                Connect With GHMC
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow GHMC on ${name}`}
                    className="w-9 h-9 rounded-lg border border-black/10 hover:border-[#372C5F] bg-white hover:bg-[#372C5F] text-[#020202] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Columns (8 Columns on Desktop) */}
          <div
            ref={columnsRef}
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6"
          >
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col will-change-transform">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#020202] mb-4 pb-2 border-b border-black/10 inline-block">
                  {col.title}
                </span>
                <ul className="flex flex-col space-y-2.5 text-[13px]">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[#4a4d55] hover:text-[#372C5F] transition-colors leading-relaxed block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Regulatory & Legal Corporate Disclaimer ── */}
        <div
          ref={legalRef}
          className="pt-6 pb-6 text-[11.5px] text-[#717682] leading-[1.65] border-b border-black/5 will-change-transform"
        >
          <p>
            GHMC refers to GHMC Private Limited and its operating advisory divisions. Strategic, organizational, and operational consulting services are delivered in strict compliance with corporate governance standards and applicable regulatory frameworks.
          </p>
        </div>

        {/* ── 4. Bottom Legal Bar ── */}
        <div
          ref={bottomBarRef}
          className="pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#717682] will-change-transform"
        >
          {/* Copyright & Core Legal Links */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} GHMC Private Limited. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-3.5">
              <a href="#privacy" className="hover:text-[#020202] transition-colors">
                Privacy Statement
              </a>
              <span className="text-black/20">•</span>
              <a href="#terms" className="hover:text-[#020202] transition-colors">
                Terms of Engagement
              </a>
              <span className="text-black/20">•</span>
              <a href="#cookies" className="hover:text-[#020202] transition-colors">
                Cookie Notice
              </a>
              <span className="text-black/20">•</span>
              <a href="#regulatory" className="hover:text-[#020202] transition-colors">
                Regulatory Disclosures
              </a>
              <span className="text-black/20">•</span>
              <a href="#whistleblowing" className="hover:text-[#020202] transition-colors">
                Ethics & Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
