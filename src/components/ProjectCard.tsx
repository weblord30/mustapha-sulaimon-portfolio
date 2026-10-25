import type { Project } from "../data/content";
import { ProjectCover } from "./ProjectCover";

// Screenshot file per live project (public/work/*.webp). Static images load fast on mobile data.
const SHOTS: Record<string, string> = { westhomes: "westhomes", konnectkwasu: "konnect", gready: "gready", surgenet: "surgenet", klasslab: "klasslab", mdwriters: "mdwriters" };

export function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const shot = SHOTS[p.id];
  return (
    <article className="paper group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-paper transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:rotate-[-0.4deg] hover:shadow-[0_30px_60px_-28px_rgba(26,36,102,0.5)]">
      <div className="dogear relative aspect-[16/10] overflow-hidden border-b border-line bg-sand">
        {shot ? (
          <img src={`/work/${shot}.webp`} alt={`${p.title} home page`} loading="lazy" decoding="async" width={1200} height={750}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          p.cover && <ProjectCover kind={p.cover} />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-starch/90 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-ink backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          <span>{p.category}</span>
          <span>{p.year}</span>
        </div>
        <h3 className="font-display text-[1.9rem] font-extrabold leading-none tracking-tight sm:text-4xl">{p.title}</h3>
        <p className="text-[15px] leading-relaxed text-ink/75">{p.problem}</p>

        <details className="group/d rounded-xl border border-line bg-starch/60 px-4 py-3 open:pb-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-indigo [&::-webkit-details-marker]:hidden">
            How I built it
            <span className="text-lg leading-none transition-transform group-open/d:rotate-45">+</span>
          </summary>
          <ul className="mt-3 space-y-2.5">
            {p.decisions.map((d) => (
              <li key={d} className="flex gap-2.5 text-[14px] leading-relaxed text-ink/80">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                {d}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] text-ink/70">{s}</span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4">
          {p.link ? (
            <a href={p.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-medium text-indigo underline-offset-4 hover:underline">
              Visit live <span aria-hidden>↗</span>
            </a>
          ) : (
            <span className="font-mono text-[11px] text-muted">{p.note}</span>
          )}
          {p.link && <span className="truncate pl-4 font-mono text-[10.5px] text-muted">{p.link.replace(/^https:\/\//, "")}</span>}
        </div>
      </div>
    </article>
  );
}
