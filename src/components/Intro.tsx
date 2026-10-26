import { useEffect, useState } from "react";
import { swish } from "../lib/prefs";

const LINE1 = "Mustapha";
const LINE2 = "Sulaimon";

/**
 * Opening: an Adire cloth hangs on a wire, the name types itself onto it with a blinking cursor,
 * then the cloth is pulled off the wire and folds away to reveal the site.
 * Once per session; skipped for reduced motion; click or any key skips it.
 */
export function Intro() {
  const [show] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      // Replays after an hour away (or when asked from the command bar), not just once per session.
      if (sessionStorage.getItem("intro-replay")) { sessionStorage.removeItem("intro-replay"); return true; }
      const last = Number(localStorage.getItem("intro-seen-at") || 0);
      return Date.now() - last > 60 * 60 * 1000 && !sessionStorage.getItem("intro-seen");
    } catch { return false; }
  });
  const [typed, setTyped] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(!show);
  const total = LINE1.length + LINE2.length;

  useEffect(() => {
    if (!show) { document.documentElement.classList.add("ready"); return; }
    try { sessionStorage.setItem("intro-seen", "1"); localStorage.setItem("intro-seen-at", String(Date.now())); } catch { /* private mode */ }
    document.documentElement.style.overflow = "hidden";
    const timers: number[] = [];
    for (let i = 1; i <= total; i++) timers.push(window.setTimeout(() => setTyped(i), 260 + i * 70));
    const finish = () => {
      setLeaving(true);
      swish(0.9);
      document.documentElement.classList.add("ready");
      timers.push(window.setTimeout(() => { setGone(true); document.documentElement.style.overflow = ""; }, 1100));
    };
    timers.push(window.setTimeout(finish, 260 + total * 70 + 650));
    const skip = () => { timers.forEach(clearTimeout); setTyped(total); finish(); };
    window.addEventListener("keydown", skip, { once: true });
    return () => { timers.forEach(clearTimeout); window.removeEventListener("keydown", skip); document.documentElement.style.overflow = ""; };
  }, [show, total]);

  if (gone) return null;
  const a = LINE1.slice(0, Math.min(typed, LINE1.length));
  const b = LINE2.slice(0, Math.max(0, typed - LINE1.length));

  return (
    <div className={`intro on-dark ${leaving ? "intro-leave" : ""}`} onClick={() => { setTyped(total); setLeaving(true); document.documentElement.classList.add("ready"); window.setTimeout(() => { setGone(true); document.documentElement.style.overflow = ""; }, 1100); }}>
      {/* The wire and its pegs */}
      <div className="intro-wire" style={{ top: "calc(env(safe-area-inset-top) + 28px)" }}>
        <span className="intro-peg" style={{ left: "18%" }} />
        <span className="intro-peg" style={{ left: "82%" }} />
      </div>
      <div className="intro-cloth adire-dots text-starch/[0.08]">
        <div className="relative font-display font-extrabold leading-[0.9] tracking-tight text-starch" style={{ fontSize: "clamp(3.4rem, 13vw, 9rem)" }}>
          <div>{a}{typed < LINE1.length && <span className="caret ml-1 inline-block h-[0.72em] w-[0.18em] translate-y-[0.06em] bg-coral" />}</div>
          <div className="min-h-[0.9em]">{b}{typed >= LINE1.length && <span className="caret ml-1 inline-block h-[0.72em] w-[0.18em] translate-y-[0.06em] bg-coral" />}</div>
        </div>
        <p className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-0 right-0 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-starch/50">Made on purpose · click to skip</p>
      </div>
    </div>
  );
}
