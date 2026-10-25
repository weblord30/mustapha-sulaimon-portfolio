import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Section title that reveals word by word, each word rising from behind a mask. */
export function SplitTitle({ text, accent, className = "", accentClass = "text-indigo" }: { text: string; accent?: string; className?: string; accentClass?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const all = [...words.map((w) => ({ w, a: false })), ...accentWords.map((w) => ({ w, a: true }))];
  return (
    <motion.h2 className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ staggerChildren: reduce ? 0 : 0.06 }}>
      {all.map(({ w, a }, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className={`inline-block ${a ? accentClass : ""}`}
            variants={{ hidden: { y: reduce ? 0 : "110%", rotate: reduce ? 0 : 4 }, show: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/** Pulls its child gently towards the pointer. Desktop only. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} className="inline-flex transition-transform duration-300 ease-out">{children}</span>;
}

/** A card that lands like a sheet of paper: drops in slightly turned, then settles flat. */
export function PaperIn({ children, index = 0, className = "" }: { children: ReactNode; index?: number; className?: string }) {
  const reduce = useReducedMotion();
  const turn = index % 2 ? 2.5 : -2.5;
  return (
    <motion.div className={className}
      initial={reduce ? false : { opacity: 0, y: 70, rotate: turn, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 0%" }}>
      {children}
    </motion.div>
  );
}

/** A dark block that spreads open like cloth being laid out as it scrolls into view. */
export function Spread({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.section id={id} className={className}
      initial={reduce ? false : { clipPath: "inset(6% 7% 0% 7% round 48px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.section>
  );
}

/** Appears after scrolling; the cursor block with its coral bead, back to the top. */
export function BackToTop() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 900);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <a href="#top" aria-label="Back to top"
      className={`on-dark fixed z-40 flex h-12 w-12 items-center justify-center rounded-full bg-indigo shadow-[0_12px_30px_-10px_rgba(26,36,102,0.8)] transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ right: "max(1.25rem, env(safe-area-inset-right))", bottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.5rem))" }}>
      <span className="relative flex flex-col items-center">
        <span className="h-2 w-2 rounded-full bg-coral" />
        <span className="mt-0.5 h-4 w-1.5 rounded-[2px] bg-starch" />
      </span>
      <span className="absolute -top-1 text-[10px] text-starch opacity-0">↑</span>
    </a>
  );
}
