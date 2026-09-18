import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * 4-Corner Letter Preloader for GHMC
 *
 * KEY FIX: Letters are inline-block spans INSIDE a single text container
 * (identical DOM structure to Hero.jsx). GSAP transforms visually displace
 * them to corners, then animate back to transform(0,0) = their natural
 * text-flow position with perfect baseline alignment and kerning.
 *
 * Sequence:
 *   1. Letters appear in 4 corners (G=BL, H=BR, M=TR, C=TL)
 *   2. Stage 1: G+H dock, M→BR, C→TR
 *   3. Stage 2: M docks, C→BR
 *   4. Stage 3: C docks → "GHMC" assembled
 *   5. Curtain wipe reveals Hero's identical wordmark
 */
const Preloader = ({ onComplete }) => {
  const [mounted, setMounted] = useState(true);
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.overflow = originalOverflow;
      setMounted(false);
      if (onComplete) onComplete();
      return;
    }

    const animTimer = setTimeout(() => {
      const letters = letterRefs.current.filter(Boolean);
      if (letters.length !== 4) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mx = Math.max(24, vw * 0.04);
      const my = Math.max(24, vh * 0.04);

      // Each letter's natural bounding rect (in text flow at bottom-left)
      const rects = letters.map((el) => el.getBoundingClientRect());

      // Helper: compute GSAP transform offset to move letter[i] to (vpX, vpY)
      const offsetTo = (i, vpX, vpY) => ({
        x: vpX - rects[i].left,
        y: vpY - rects[i].top,
      });

      // Starting corner offsets
      const starts = [
        offsetTo(0, mx, vh - my - rects[0].height),                       // G → bottom-left
        offsetTo(1, vw - mx - rects[1].width, vh - my - rects[1].height), // H → bottom-right
        offsetTo(2, vw - mx - rects[2].width, my),                        // M → top-right
        offsetTo(3, mx, my),                                               // C → top-left
      ];

      // Intermediate waypoints
      const M_br = offsetTo(2, vw - mx - rects[2].width, vh - my - rects[2].height); // M at bottom-right
      const C_tr = offsetTo(3, vw - mx - rects[3].width, my);                         // C at top-right
      const C_br = offsetTo(3, vw - mx - rects[3].width, vh - my - rects[3].height); // C at bottom-right

      const ctx = gsap.context(() => {
        gsap.set(containerRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });

        // Place letters at their starting corners
        letters.forEach((el, i) => {
          gsap.set(el, { x: starts[i].x, y: starts[i].y, opacity: 1 });
        });

        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            setMounted(false);
            if (onComplete) onComplete();
          },
        });

        // Hold corners
        tl.to({}, { duration: 0.4 });

        // Stage 1: G+H dock to natural positions, M→bottom-right, C→top-right
        tl.to(letters[0], { x: 0, y: 0, duration: 0.7, ease: 'power3.inOut' }, 'stage1');
        tl.to(letters[1], { x: 0, y: 0, duration: 0.7, ease: 'power3.inOut' }, 'stage1');
        tl.to(letters[2], { x: M_br.x, y: M_br.y, duration: 0.7, ease: 'power3.inOut' }, 'stage1');
        tl.to(letters[3], { x: C_tr.x, y: C_tr.y, duration: 0.7, ease: 'power3.inOut' }, 'stage1');

        // Stage 2: M docks, C→bottom-right
        tl.to(letters[2], { x: 0, y: 0, duration: 0.7, ease: 'power3.inOut' }, 'stage2');
        tl.to(letters[3], { x: C_br.x, y: C_br.y, duration: 0.7, ease: 'power3.inOut' }, 'stage2');

        // Stage 3: C docks → "GHMC" assembled with perfect kerning
        tl.to(letters[3], { x: 0, y: 0, duration: 0.7, ease: 'power3.inOut' }, 'stage3');

        // Hold assembled
        tl.to({}, { duration: 0.25 });

        // Curtain wipe
        tl.to(containerRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 0.9,
          ease: 'power3.inOut',
        });
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => {
      clearTimeout(animTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden will-change-[clip-path]"
      style={{ isolation: 'isolate', clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      {/* Blue gradient backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/preloader-bg.jpg)',
          backgroundColor: '#103666',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, transparent 20%, rgba(8, 26, 52, 0.45) 100%)',
          }}
        />
      </div>

      {/* ── GHMC — Responsive Docking Position ── */}
      <div
        className="absolute select-none pointer-events-none"
        style={
          typeof window !== 'undefined' && window.innerWidth < 768
            ? {
                left: '20px',
                top: '72px',
              }
            : {
                left: 'clamp(16px, 4vw, 56px)',
                bottom: 'clamp(16px, 3vh, 48px)',
              }
        }
      >
        <span
          className={`block font-['ario-sans',sans-serif] font-bold uppercase tracking-[-0.05em] whitespace-nowrap ${
            typeof window !== 'undefined' && window.innerWidth < 768
              ? 'text-[4.5rem] sm:text-[5.5rem] leading-[0.85]'
              : 'te-h1 leading-[0.82]'
          }`}
          style={{ letterSpacing: '-0.05em', color: '#ffffff' }}
        >
          {['G', 'H', 'M', 'C'].map((letter, i) => (
            <span
              key={letter}
              ref={(el) => (letterRefs.current[i] = el)}
              className="inline-block will-change-transform"
              style={{ opacity: 0 }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
