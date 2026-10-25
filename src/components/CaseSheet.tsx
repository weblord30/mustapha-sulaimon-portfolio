import { useEffect, useState } from "react";
import type { Project } from "../data/content";
import { ProjectCover } from "./ProjectCover";
import { swish } from "../lib/prefs";

const SHOTS: Record<string, string> = { westhomes: "westhomes", konnectkwasu: "konnect", gready: "gready", surgenet: "surgenet", klasslab: "klasslab", mdwriters: "mdwriters" };

/**
 * A project's case study as a sheet of paper that unfolds open (two folds) and folds back up to close.
 * Deep-linkable as #case-<id>. Scrolls on its own; Lenis is told to leave it alone.
 */
export function CaseSheet({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const shot = SHOTS[p.id];

  function close() {
    setClosing(true);
    swish(0.5);
    window.setTimeout(onClose, 650);
  }

  useEffect(() => {
    swish(0.6);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`case-backdrop fixed inset-0 z-[80] bg-ink/45 backdrop-blur-sm ${closing ? "is-closing" : ""}`} onClick={close}>
      <div role="dialog" aria-modal="true" aria-label={`${p.title} case study`} data-lenis-prevent
        className={`case-sheet paper absolute inset-x-0 bottom-0 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-t-[1.75rem] bg-paper md:inset-y-6 md:rounded-[1.75rem] ${closing ? "is-closing" : ""}`}
        style={{ top: "calc(env(safe-area-inset-top) + 0.75rem)" }}
        onClick={(e) => e.stopPropagation()}>
        <span className="case-crease" aria-hidden="true" />
        <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Case study · {p.category}</p>
          <button type="button" onClick={close} aria-label="Close case study" className="flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none hover:bg-sand">×</button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-sand">
            {shot ? <img src={`/work/${shot}.webp`} alt={`${p.title} home page`} className="h-full w-full object-cover object-top" /> : p.cover && <ProjectCover kind={p.cover} />}
          </div>
          <div className="px-5 py-8 sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">{p.title}</h2>
              <p className="font-mono text-xs text-muted">{p.year}{p.note ? ` · ${p.note}` : ""}</p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-coral">The problem</p>
                <p className="mt-3 text-lg leading-relaxed text-ink/80">{p.problem}</p>
                <p className="mt-8 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-coral">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink/75">{s}</span>)}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-starch">
                    Visit live <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
              <ol className="space-y-6">
                <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-coral">How I built it</p>
                {p.decisions.map((d, i) => (
                  <li key={d} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-dashed border-line pt-5">
                    <span className="font-display text-3xl font-extrabold leading-none text-indigo">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[16px] leading-relaxed text-ink/80">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
