import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { PaperIn } from "../components/Motion";
import { now } from "../data/content";
import log from "../data/shiplog.json";

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

/** What I'm doing right now, plus a live-from-git shipping log in place of a numbers strip. */
export function Now() {
  const reduce = useReducedMotion();
  // Last 26 weeks as columns of 7 days, for the activity strip.
  const days = log.days.slice(-26 * 7);
  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, i) => days.slice(i * 7, i * 7 + 7));
  const shade = (n: number) => (n === 0 ? "bg-starch/10" : n < 2 ? "bg-starch/35" : n < 4 ? "bg-starch/65" : "bg-coral");

  return (
    <section id="now" className="gutter mx-auto max-w-7xl py-16 md:py-24">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Right now</p>
      </Reveal>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {now.map((n, i) => (
            <PaperIn key={n.label} index={i} className="h-full">
              <div className="paper h-full rounded-2xl border border-line bg-paper p-5">
                <p className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-coral">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" /> {n.label}
                </p>
                <p className="mt-3 font-display text-2xl font-extrabold tracking-tight">{n.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{n.detail}</p>
              </div>
            </PaperIn>
          ))}
        </div>

        <Reveal delay={0.1} className="h-full">
          <div className="on-dark flex h-full flex-col overflow-hidden rounded-2xl bg-indigo text-starch">
            <div className="flex items-center gap-1.5 border-b border-starch/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-coral" /><span className="h-2.5 w-2.5 rounded-full bg-starch/25" /><span className="h-2.5 w-2.5 rounded-full bg-starch/25" />
              <span className="ml-2 font-mono text-[11px] text-starch/60">~/shipping-log</span>
              <span className="ml-auto font-mono text-[10px] text-starch/40">real commits · updated {fmt(log.updated)}</span>
            </div>
            {/* Lines type in one by one when the log scrolls into view. */}
            <motion.ol className="flex-1 space-y-2 px-4 py-4 font-mono text-[11.5px] leading-relaxed sm:text-[12px]"
              initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-15% 0px" }} transition={{ staggerChildren: 0.14 }}>
              {log.recent.slice(0, 9).map((c, i) => (
                <motion.li key={i} className="grid grid-cols-[3.4rem_6.6rem_1fr] gap-2 sm:grid-cols-[3.6rem_7.4rem_1fr]"
                  variants={{ hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.5, ease: "linear" } } }}>
                  <span className="text-starch/45">{fmt(c.date)}</span>
                  <span className="truncate text-coral">{c.project}</span>
                  <span className="truncate text-starch/85" title={c.message}>{c.message}</span>
                </motion.li>
              ))}
              <li className="text-starch/50"><span className="caret text-coral">▍</span></li>
            </motion.ol>
            <div className="border-t border-starch/10 px-4 py-4">
              <div className="flex gap-[3px] overflow-hidden" aria-label="Commit activity over the last six months">
                {weeks.map((w, i) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    {w.map((d) => <span key={d.date} title={`${d.date}: ${d.count}`} className={`h-2.5 w-2.5 rounded-[2px] ${shade(d.count)}`} />)}
                  </div>
                ))}
              </div>
              <p className="mt-2 font-mono text-[10px] text-starch/45">Six months of commits across my products, private repos included.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
