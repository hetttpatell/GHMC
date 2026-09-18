import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

/**
 * FloatingPaths — Single SVG layer of curved paths.
 *
 * Matches the reference shadcn/ui "background-paths" component:
 * - 36 paths with gentle spread controlled by `position`
 * - Initial draw-in, then continuous path-offset flow (lines glide along curves)
 * - Subtle opacity breathing layered on top
 *
 * Use two instances (position={1} and position={-1}) to create the full
 * dual-layer, mirrored wave effect shown in the reference design.
 */
function FloatingPaths({ position = 1 }) {
  const svgRef = useRef(null);

  const paths = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      strokeOpacity: 0.1 + i * 0.03,
    }));
  }, [position]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pathEls = svg.querySelectorAll('path');
    if (!pathEls.length) return;

    const ctx = gsap.context(() => {
      pathEls.forEach((el, i) => {
        const len = el.getTotalLength();
        const dur = 20 + Math.random() * 10; // 20–30s per cycle, matching reference

        // ─── Phase 1: Draw-in (paths reveal from 0 → full length) ───
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut',
          delay: i * 0.06,
        });

        // ─── Phase 2: Continuous flowing offset (lines glide along curves) ───
        // After draw-in completes, start cycling dashoffset from 0 → len → 0
        gsap.to(el, {
          strokeDashoffset: len,
          duration: dur,
          ease: 'linear',
          repeat: -1,
          yoyo: true,
          delay: 2.5 + i * 0.06,
        });

        // ─── Phase 3: Subtle opacity breathing ───
        gsap.fromTo(
          el,
          { opacity: 0.6 },
          {
            opacity: 0.3,
            duration: dur / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 2.5 + i * 0.06,
          }
        );
      });
    }, svg);

    return () => ctx.revert();
  }, [paths]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        ref={svgRef}
        className="w-full h-full text-[#372C5F]"
        viewBox="0 0 696 316"
        fill="none"
        overflow="visible"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.strokeOpacity}
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * FloatingPathsBackground — Dual-layer background with mirrored flowing paths.
 *
 * Renders two FloatingPaths layers (position 1 and -1) to create the
 * characteristic criss-cross wave pattern from the reference design.
 */
export function FloatingPathsBackground({ children, className }) {
  return (
    <div className={cn('w-full h-full', className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      {children}
    </div>
  );
}

export default FloatingPathsBackground;
