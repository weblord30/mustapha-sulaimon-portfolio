import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const raf_id = requestAnimationFrame(raf);

    // Nav links and CTAs (#about, #contact, etc.) jump instantly by default,
    // so route them through Lenis to ease into the section instead.
    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        offset: -24,
      });
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(raf_id);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);
}
