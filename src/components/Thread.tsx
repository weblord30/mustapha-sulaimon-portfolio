import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress as a coral thread stitching itself down the right edge (a top line on phones),
 * tying off with a knot when you reach the end.
 */
export function Thread() {
  const bar = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      if (top.current) top.current.style.transform = `scaleX(${p})`;
      setDone(p > 0.985);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* Desktop: vertical thread on the right edge */}
      <div aria-hidden="true" className="pointer-events-none fixed z-40 hidden w-[3px] md:block"
        style={{ right: "max(10px, env(safe-area-inset-right))", top: "calc(env(safe-area-inset-top) + 76px)", bottom: 24 }}>
        <div className="absolute inset-0 rounded-full" style={{ background: "repeating-linear-gradient(180deg, color-mix(in srgb, var(--color-ink) 12%, transparent) 0 8px, transparent 8px 14px)" }} />
        <div ref={bar} className="absolute inset-0 origin-top" style={{ background: "repeating-linear-gradient(180deg, var(--color-coral) 0 8px, transparent 8px 14px)", transform: "scaleY(0)" }} />
        <span className={`absolute -left-[5px] bottom-[-8px] h-[13px] w-[13px] rounded-full bg-coral transition-all duration-500 ${done ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
      </div>
      {/* Phones: a thin stitched line under the top bar */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 z-50 h-[3px] md:hidden" style={{ top: "calc(env(safe-area-inset-top) + 64px)" }}>
        <div ref={top} className="h-full origin-left" style={{ background: "repeating-linear-gradient(90deg, var(--color-coral) 0 8px, transparent 8px 13px)", transform: "scaleX(0)" }} />
      </div>
    </>
  );
}
