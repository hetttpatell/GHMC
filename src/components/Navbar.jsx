"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconLock, IconMail, IconUser, IconBuilding, IconArrowRight, IconCheck } from "@tabler/icons-react";

export default function Navbar({ introDone = true }) {
  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "Impact", link: "#impact" },
    { name: "Who We Are", link: "#who-we-are" },
    { name: "Case Studies", link: "#case-studies" },
    { name: "Contact", link: "#contact" },
  ];

  const [activeSection, setActiveSection] = useState("#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'signup' | null
  const [authSuccess, setAuthSuccess] = useState(false);

  // Smooth scroll handler for anchor links
  const handleNavClick = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      setActiveSection(link);
      setIsMobileMenuOpen(false);
      const targetEl = document.querySelector(link);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // ScrollSpy: Automatically detects and highlights the current section in the viewport (throttled)
  useEffect(() => {
    let ticking = false;

    const handleScrollSpy = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // When near bottom of document, activate Contact
        if (scrollY + windowHeight >= docHeight - 90) {
          setActiveSection("#contact");
          ticking = false;
          return;
        }

        // When at top of document, activate Home
        if (scrollY < 220) {
          setActiveSection("#hero");
          ticking = false;
          return;
        }

        const sectionIds = ["hero", "impact", "who-we-are", "case-studies", "contact"];
        const triggerOffset = 250; // Visual threshold line below navbar

        // Loop from bottom-most section upwards to find the first section whose top passed triggerOffset
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerOffset) {
              setActiveSection(`#${id}`);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openLogin = () => {
    setAuthSuccess(false);
    setIsMobileMenuOpen(false);
    setActiveModal("login");
  };

  const openSignup = () => {
    setAuthSuccess(false);
    setIsMobileMenuOpen(false);
    setActiveModal("signup");
  };

  return (
    <>
      <div
        className={`transition-opacity duration-700 ${
          introDone ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ResizableNavbar>
          {/* Desktop Navigation */}
          <NavBody>
            {/* 1. Distinct Company Brand Zone */}
            <NavbarLogo />

            {/* 2. Distinct Content Navigation Zone with Active Section Highlight */}
            <NavItems
              items={navItems}
              activeSection={activeSection}
              onItemClick={(link) => {
                setActiveSection(link);
                setIsMobileMenuOpen(false);
              }}
            />

            {/* 3. Distinct Auth Actions Zone */}
            <div className="flex items-center gap-3 shrink-0 pl-4">
              <NavbarButton
                variant="secondary"
                onClick={openLogin}
                className="text-[12.5px] px-4 py-2"
              >
                Login
              </NavbarButton>
              <NavbarButton
                variant="primary"
                onClick={openSignup}
                className="text-[12.5px] px-5 py-2"
              >
                Sign Up
              </NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-full flex flex-col gap-1 pb-3 border-b border-black/[0.06]">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.link;
                  return (
                    <a
                      key={`mobile-link-${idx}`}
                      href={item.link}
                      onClick={(e) => handleNavClick(e, item.link)}
                      className={`flex items-center justify-between py-2.5 px-3 text-sm font-semibold uppercase tracking-[0.12em] font-['ario-sans',sans-serif] transition-colors border-b ${
                        isActive
                          ? "text-[#372C5F] font-bold border-[#372C5F]"
                          : "text-[#020202] border-transparent hover:text-[#372C5F]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#372C5F]" />
                        )}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[#372C5F]/40 text-xs">→</span>
                    </a>
                  );
                })}
              </div>

              <div className="flex w-full flex-col gap-2.5 pt-1">
                <NavbarButton
                  onClick={openLogin}
                  variant="secondary"
                  className="w-full py-2.5 border border-black/10"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={openSignup}
                  variant="primary"
                  className="w-full py-2.5"
                >
                  Sign Up
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </ResizableNavbar>
      </div>

      {/* ─── Client Portal & Sign Up Modals ─── */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#020202]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_24px_64px_rgba(2,2,2,0.25),0_0_0_1px_rgba(55,44,95,0.08)] overflow-hidden z-10"
            >
              {/* Header */}
              <div className="relative px-7 pt-7 pb-5 border-b border-black/[0.06] bg-gradient-to-b from-[#372C5F]/[0.03] to-transparent">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 p-1.5 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <IconX className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-['ario-sans',sans-serif] font-black text-sm tracking-[0.2em] text-[#020202]">
                    GHMC
                  </span>
                  <span className="h-3 w-[1px] bg-black/20" />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#372C5F] font-['ario-sans',sans-serif]">
                    {activeModal === "login" ? "CLIENT PORTAL" : "ENTERPRISE ADVISORY"}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-[-0.03em] text-[#020202] font-['ario-sans',sans-serif]">
                  {activeModal === "login" ? "Log In to GHMC" : "Create Account"}
                </h3>
                <p className="text-xs text-[#4a4d55] mt-1 font-['ario-sans',sans-serif]">
                  {activeModal === "login"
                    ? "Access enterprise intelligence, strategic reports, and executive workspace."
                    : "Join the GHMC network for executive advisory and analytics."}
                </p>
              </div>

              {/* Body */}
              <div className="p-7">
                {authSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 flex flex-col items-center justify-center text-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#372C5F]/10 text-[#372C5F] flex items-center justify-center">
                      <IconCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#020202] uppercase tracking-[0.05em] font-['ario-sans',sans-serif]">
                      {activeModal === "login" ? "Welcome Back" : "Registration Complete"}
                    </h4>
                    <p className="text-xs text-[#4a4d55] max-w-xs font-['ario-sans',sans-serif]">
                      {activeModal === "login"
                        ? "Redirecting to your secure GHMC portal..."
                        : "Our advisory team has received your details and will be in touch shortly."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="mt-3 text-xs font-bold text-[#372C5F] uppercase tracking-[0.14em] hover:underline cursor-pointer"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAuthSuccess(true);
                    }}
                    className="flex flex-col gap-4"
                  >
                    {activeModal === "signup" && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#020202]/70 mb-1.5 font-['ario-sans',sans-serif]">
                            Full Name
                          </label>
                          <div className="relative flex items-center">
                            <IconUser className="w-4 h-4 text-black/30 absolute left-3.5" />
                            <input
                              type="text"
                              required
                              placeholder="Alex Morgan"
                              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/10 text-xs text-[#020202] placeholder:text-black/30 focus:outline-none focus:border-[#372C5F] focus:ring-1 focus:ring-[#372C5F] transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#020202]/70 mb-1.5 font-['ario-sans',sans-serif]">
                            Organisation / Firm
                          </label>
                          <div className="relative flex items-center">
                            <IconBuilding className="w-4 h-4 text-black/30 absolute left-3.5" />
                            <input
                              type="text"
                              required
                              placeholder="Global Enterprises Ltd."
                              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/10 text-xs text-[#020202] placeholder:text-black/30 focus:outline-none focus:border-[#372C5F] focus:ring-1 focus:ring-[#372C5F] transition-all"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#020202]/70 mb-1.5 font-['ario-sans',sans-serif]">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <IconMail className="w-4 h-4 text-black/30 absolute left-3.5" />
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/10 text-xs text-[#020202] placeholder:text-black/30 focus:outline-none focus:border-[#372C5F] focus:ring-1 focus:ring-[#372C5F] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#020202]/70 font-['ario-sans',sans-serif]">
                          Password
                        </label>
                        {activeModal === "login" && (
                          <a
                            href="#contact"
                            onClick={() => setActiveModal(null)}
                            className="text-[10.5px] text-[#372C5F] hover:underline font-medium"
                          >
                            Forgot?
                          </a>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <IconLock className="w-4 h-4 text-black/30 absolute left-3.5" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/10 text-xs text-[#020202] placeholder:text-black/30 focus:outline-none focus:border-[#372C5F] focus:ring-1 focus:ring-[#372C5F] transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 rounded-full bg-[#372C5F] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#2c224c] shadow-[0_4px_16px_rgba(55,44,95,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>{activeModal === "login" ? "Login" : "Sign Up"}</span>
                      <IconArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-2 text-center text-xs text-[#4a4d55]">
                      {activeModal === "login" ? (
                        <span>
                          Don't have an account?{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setAuthSuccess(false);
                              setActiveModal("signup");
                            }}
                            className="font-bold text-[#372C5F] hover:underline cursor-pointer"
                          >
                            Sign Up
                          </button>
                        </span>
                      ) : (
                        <span>
                          Already registered?{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setAuthSuccess(false);
                              setActiveModal("login");
                            }}
                            className="font-bold text-[#372C5F] hover:underline cursor-pointer"
                          >
                            Login
                          </button>
                        </span>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
