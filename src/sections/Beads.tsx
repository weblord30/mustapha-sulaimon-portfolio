import { useEffect, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";
import { SplitTitle } from "../components/Motion";
import { swish, tick } from "../lib/prefs";

// Guestbook API: Documents/portfolio-beads (Cloudflare Worker + D1). Stores only position and colour.
const API = "https://portfolio-beads.musbaftech.workers.dev/beads";
const COLORS: Record<string, string> = { coral: "#e4572e", starch: "#f6f3ec", gold: "#d9a93c" };
type Bead = { x: number; y: number; color: string; mine?: boolean; tmp?: number };

/** "Leave a bead": visitors drop a bead on a shared Adire cloth; the pattern grows with every visit. */
export function Beads() {
  const [beads, setBeads] = useState<Bead[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [color, setColor] = useState("coral");
  const [note, setNote] = useState("");
  const [left, setLeft] = useState(() => { try { return !!localStorage.getItem("ms-bead"); } catch { return false; } });
  const cloth = useRef<HTMLDivElement>(null);

  // Load the cloth only when it scrolls near, so the API isn't hit by people who never get here.
  useEffect(() => {
    const el = cloth.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      fetch(API).then((r) => r.json()).then((d: { total: number; beads: Bead[] }) => {
        let mine: Bead | null = null;
        try { mine = JSON.parse(localStorage.getItem("ms-bead") || "null"); } catch { /* ignore */ }
        setBeads(d.beads.map((b) => (mine && Math.abs(b.x - mine.x) < 1e-6 && Math.abs(b.y - mine.y) < 1e-6 ? { ...b, mine: true } : b)));
        setTotal(d.total);
      }).catch(() => setTotal(null));
    }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function drop(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    const tmp = Date.now();
    const bead = { x: +x.toFixed(4), y: +y.toFixed(4), color, mine: true, tmp };
    const drop = () => setBeads((b) => b.filter((o) => o.tmp !== tmp));
    setBeads((b) => [bead, ...b.map((o) => ({ ...o, mine: false }))]);
    swish(0.35);
    try {
      const res = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ x: bead.x, y: bead.y, color }) });
      if (res.status === 429) { setNote("You've left a bead recently. Come back in a few minutes."); drop(); return; }
      if (!res.ok) throw new Error();
      try { localStorage.setItem("ms-bead", JSON.stringify(bead)); } catch { /* ignore */ }
      setLeft(true); setTotal((t) => (t ?? 0) + 1);
      setNote("Your bead is on the cloth. Thank you for stopping by.");
    } catch {
      setNote("The cloth couldn't be reached. Try again in a moment.");
      drop();
    }
  }

  return (
    <section id="beads" className="gutter mx-auto max-w-7xl scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Guestbook</p></Reveal>
          <SplitTitle text="Leave a bead" accent="on the cloth." accentClass="text-coral" className="mt-3 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl" />
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink/75">
              Tap anywhere on the cloth to leave your mark. No names, no sign-up: just a bead in a pattern made by everyone who has visited.
            </p>
            <div className="mt-6 flex items-center gap-3" role="radiogroup" aria-label="Bead colour">
              {Object.entries(COLORS).map(([k, v]) => (
                <button key={k} type="button" role="radio" aria-checked={color === k} aria-label={k} onClick={() => { setColor(k); tick(); }}
                  className={`h-9 w-9 rounded-full border-2 transition-transform ${color === k ? "scale-110 border-ink" : "border-line"}`} style={{ background: v }} />
              ))}
              <span className="ml-2 font-mono text-[11px] text-muted">{total == null ? "" : `${total} ${total === 1 ? "bead" : "beads"} so far`}</span>
            </div>
            <p className="mt-4 min-h-6 font-mono text-[12px] text-indigo" role="status">{note || (left ? "You've already left a bead. Thank you." : "")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative pt-4">
            <div className="hero-wire" aria-hidden="true"><span style={{ left: "16%" }} /><span style={{ right: "16%" }} /></div>
            <div ref={cloth} onClick={drop} role="button" tabIndex={0} aria-label="The bead cloth. Click to leave a bead."
              className="on-dark relative aspect-[16/11] w-full cursor-crosshair overflow-hidden rounded-b-[1.75rem] rounded-t-md bg-indigo shadow-[0_40px_80px_-40px_rgba(26,36,102,0.7)]">
              <div className="adire-dots pointer-events-none absolute inset-0 text-starch/[0.09]" />
              <div className="pointer-events-none absolute inset-3 rounded-b-[1.4rem] rounded-t border border-dashed border-starch/20" />
              {beads.map((b, i) => (
                <span key={`${b.x}-${b.y}-${i}`} className={`bead pointer-events-none absolute ${b.mine ? "bead-mine" : ""}`}
                  style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, background: COLORS[b.color] ?? COLORS.coral, animationDelay: b.mine ? "0s" : `${Math.min(i, 40) * 18}ms` }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
