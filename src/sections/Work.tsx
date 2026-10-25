import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { PaperIn, SplitTitle } from "../components/Motion";
import { KINDS, projects, type Kind } from "../data/content";

export function Work() {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const live = projects.filter((p) => p.status === "live");
  const shown = filter === "all" ? live : live.filter((p) => p.kinds.includes(filter));

  return (
    <section id="work" className="gutter mx-auto max-w-7xl scroll-mt-24 py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Selected work</p>
        </Reveal>
          <SplitTitle text="Shipped, live and" accent="in use." className="mt-3 max-w-2xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl" />
        </div>
        {/* Wraps on small screens instead of scrolling sideways (horizontal swipe has a bad track record here). */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {KINDS.map((k) => {
            const count = k.id === "all" ? live.length : live.filter((p) => p.kinds.includes(k.id as Kind)).length;
            const on = filter === k.id;
            return (
              <button key={k.id} type="button" aria-pressed={on} onClick={() => setFilter(k.id)}
                className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${on ? "border-ink bg-ink text-starch" : "border-line bg-paper text-ink/75 hover:border-ink/40"}`}>
                {k.label} <span className={`ml-1 font-mono text-[10px] ${on ? "text-starch/60" : "text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {shown.map((p, i) => (
          <PaperIn key={`${filter}-${p.id}`} index={i} className="h-full">
            <ProjectCard project={p} index={live.indexOf(p)} />
          </PaperIn>
        ))}
      </div>
    </section>
  );
}
