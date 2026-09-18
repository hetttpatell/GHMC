import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialise Lenis smooth scroll and synchronise it with GSAP's ticker
 * so that ScrollTrigger stays in lock-step with the smoothed scroll position.
 */
export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Keep ScrollTrigger in sync with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  const updateTicker = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy() {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    },
  };
}
