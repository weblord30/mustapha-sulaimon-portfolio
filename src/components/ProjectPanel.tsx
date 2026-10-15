import { LivePreview } from "./LivePreview";
import type { Project } from "../data/content";

const ACCENTS = {
  violet: { glow: "rgba(108,63,212,0.35)", text: "text-violet", border: "border-violet/40" },
  mint: { glow: "rgba(15,252,190,0.25)", text: "text-mint", border: "border-mint/40" },
  blue: { glow: "rgba(26,140,255,0.3)", text: "text-blue", border: "border-blue/40" },
} as const;

type Props = {
  project: Project;
  accent: keyof typeof ACCENTS;
};

export function ProjectPanel({ project, accent }: Props) {
  const tone = ACCENTS[accent];

  return (
    <div
      className="relative flex h-[32rem] w-[85vw] max-w-xl flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 [scroll-snap-align:center] sm:w-[30rem]"
      style={{
        backgroundImage: `radial-gradient(50% 40% at 90% 0%, ${tone.glow}, transparent 70%)`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${tone.border} ${tone.text}`}
        >
          Shipped
        </span>

        {project.link && <LivePreview url={project.link} title={project.title} />}
      </div>

      <span className="mt-6 font-mono text-xs tracking-[0.3em] text-muted uppercase">
        {project.category}
      </span>
      <h3 className="mt-2 font-display text-3xl font-bold">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.problem}</p>

      <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto border-t border-border pt-4">
        {project.decisions.map((d, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span className={tone.text}>·</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-text px-5 py-2 font-mono text-xs text-ground transition-transform hover:scale-[1.03]"
        >
          Visit {project.title} ↗
        </a>
      )}
    </div>
  );
}
