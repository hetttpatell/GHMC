import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialise Lenis smooth scroll for desktop screens (>= 768px) and synchronise
 * it with GSAP's ticker so that ScrollTrigger stays in lock-step.
 *
 * On mobile/touch screens (< 768px), Lenis is disabled so that native
 * hardware-accelerated momentum touch scrolling works without event interception.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') {
    return {
      lenis: null,
      destroy() {},
    };
  }

  let lenisInstance = null;
  let updateTicker = null;

  const startLenis = () => {
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    updateTicker = (time) => {
      lenisInstance?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);
  };

  const stopLenis = () => {
    if (!lenisInstance) return;

    if (updateTicker) {
      gsap.ticker.remove(updateTicker);
      updateTicker = null;
    }

    lenisInstance.destroy();
    lenisInstance = null;
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
    ScrollTrigger.refresh();
  };

  const checkViewport = () => {
    if (window.innerWidth >= 768) {
      startLenis();
    } else {
      stopLenis();
    }
  };

  checkViewport();
  window.addEventListener('resize', checkViewport);

  return {
    get lenis() {
      return lenisInstance;
    },
    destroy() {
      window.removeEventListener('resize', checkViewport);
      stopLenis();
    },
  };
}

