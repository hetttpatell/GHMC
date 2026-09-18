import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollThread - Interactive Scroll-Sensitive Background Line
 *
 * Features:
 * - Dynamic organic serpentine Bezier spline generated across the full document height
 * - Pure GSAP ScrollTrigger scrub animating stroke-dashoffset in real-time as the user scrolls
 * - Retracts smoothly when scrolling back up
 * - Luminous pulsing beacon following the leading tip of the drawn thread
 * - Faint ghost guideline underneath for architectural depth
 * - Respects prefers-reduced-motion
 * - Auto-recalculates on resize or dynamic content expansion
 */
export default function ScrollThread() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const ghostPathRef = useRef(null);
  const beaconRef = useRef(null);
  const beaconGlowRef = useRef(null);
  const [pathData, setPathData] = useState({ d: '', width: 1440, height: 4000 });

  // Generate an organic, flowing serpentine cubic Bezier spline
  const generateSpline = (w, h) => {
    // Spacing between vertical wave inflection points (~700px to ~900px)
    const targetStep = Math.max(650, Math.min(880, h / 7));
    const count = Math.max(5, Math.floor(h / targetStep));
    const actualStep = h / count;

    // Organic wave distribution fractions across viewport width (weaving between left, center, right)
    const xFractions = [0.72, 0.28, 0.82, 0.30, 0.22, 0.78, 0.36, 0.68, 0.48];

    const points = [];
    for (let i = 0; i <= count; i++) {
      const y = i === 0 ? 80 : i === count ? h : i * actualStep;
      const frac = xFractions[i % xFractions.length];
      // Keep margin away from extreme screen edges
      const minX = Math.max(48, w * 0.08);
      const maxX = Math.min(w - 48, w * 0.92);
      const x = Math.max(minX, Math.min(maxX, w * frac));
      points.push({ x, y });
    }

    // Build smooth cubic Bezier path with vertical entrance/exit tangencies
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const dy = p1.y - p0.y;
      const cp1x = p0.x;
      const cp1y = p0.y + dy * 0.52;
      const cp2x = p1.x;
      const cp2y = p1.y - dy * 0.52;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }

    return d;
  };

  // Measure parent document dimensions and generate spline
  useEffect(() => {
    const updateDimensions = () => {
      const parent = containerRef.current?.parentElement || document.body;
      const w = Math.max(window.innerWidth, parent.clientWidth || 1440);
      const h = Math.max(window.innerHeight * 2, parent.scrollHeight || 5000);

      const d = generateSpline(w, h);
      setPathData({ d, width: w, height: h });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // GSAP ScrollTrigger scrub binding
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !pathData.d) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      length = 4000;
    }

    if (prefersReducedMotion) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      if (beaconRef.current) beaconRef.current.style.display = 'none';
      if (beaconGlowRef.current) beaconGlowRef.current.style.display = 'none';
      return;
    }

    // Initialize line hidden
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length;

    const parent = containerRef.current?.parentElement || document.body;

    const ctx = gsap.context(() => {
      const proxy = { progress: 0 };

      gsap.to(proxy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: parent,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            const currentOffset = length * (1 - p);
            path.style.strokeDashoffset = currentOffset;

            // Update beacon position along the path tip
            if (beaconRef.current && beaconGlowRef.current) {
              const currentDist = length * p;
              if (currentDist > 0 && currentDist <= length) {
                const pt = path.getPointAtLength(currentDist);
                beaconRef.current.setAttribute('cx', pt.x);
                beaconRef.current.setAttribute('cy', pt.y);
                beaconRef.current.style.opacity = p > 0.008 ? '1' : '0';

                beaconGlowRef.current.setAttribute('cx', pt.x);
                beaconGlowRef.current.setAttribute('cy', pt.y);
                beaconGlowRef.current.style.opacity = p > 0.008 ? '0.7' : '0';
              }
            }
          },
        },
      });
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, [pathData]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        width={pathData.width}
        height={pathData.height}
        viewBox={`0 0 ${pathData.width} ${pathData.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'transform' }}
      >
        <defs>
          {/* Subtle architectural gradient for the interactive thread */}
          <linearGradient id="scrollThreadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#372C5F" stopOpacity="0.10" />
            <stop offset="20%" stopColor="#372C5F" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#372C5F" stopOpacity="0.32" />
            <stop offset="85%" stopColor="#372C5F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#372C5F" stopOpacity="0.14" />
          </linearGradient>

          {/* Beacon tip glow filter */}
          <filter id="beaconGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* 1. Subtle Ghost Guide Track (faint dashed architectural trace) */}
        {pathData.d && (
          <path
            ref={ghostPathRef}
            d={pathData.d}
            stroke="#372C5F"
            strokeOpacity="0.06"
            strokeWidth="1.2"
            strokeDasharray="4 10"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* 2. Main Interactive Scroll-Sensitive Line */}
        {pathData.d && (
          <path
            ref={pathRef}
            d={pathData.d}
            stroke="url(#scrollThreadGradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            style={{
              willChange: 'stroke-dashoffset',
              transition: 'stroke-dashoffset 0.05s linear',
            }}
          />
        )}

        {/* 3. Luminous Traveling Beacon Head (Soft halo + focal point) */}
        <circle
          ref={beaconGlowRef}
          r="9"
          fill="#372C5F"
          filter="url(#beaconGlowFilter)"
          style={{ opacity: 0, willChange: 'cx, cy, opacity' }}
        />
        <circle
          ref={beaconRef}
          r="3.5"
          fill="#372C5F"
          style={{ opacity: 0, willChange: 'cx, cy, opacity' }}
        />
      </svg>
    </div>
  );
}
