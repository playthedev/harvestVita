'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // On route change: refresh ScrollTrigger so it recalculates positions for the
  // newly mounted page. The cleanup of this layout effect runs synchronously
  // just before React tears down the outgoing page — we kill all ScrollTriggers
  // there so GSAP unwraps any `pin-spacer` it inserted (which reparents the
  // pinned <section>) BEFORE React's deletion walk runs. Otherwise React tries
  // to removeChild a node whose live parent is now the pin-spacer, not the one
  // it recorded, and throws NotFoundError mid-navigation.
  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(id);
      ScrollTrigger.getAll().forEach((st) => st.kill(true));
    };
  }, [pathname]);

  return null;
}
