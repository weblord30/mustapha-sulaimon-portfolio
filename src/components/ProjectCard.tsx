import { useTilt } from "../hooks/useTilt";
import type { Project } from "../data/content";

export function ProjectCard({ project }: { project: Project }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: "transform 0.2s ease-out",
        background:
          "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(108,63,212,0.15), transparent 60%)",
      }}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface-2/60 p-8 [transform-style:preserve-3d] hover:border-violet/50"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted">
          {project.category}
        </span>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-mint opacity-0 transition-opacity group-hover:opacity-100"
          >
            Visit ↗
          </a>
        )}
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold">{project.title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>

      <ul className="mt-6 space-y-2 border-t border-border pt-6">
        {project.decisions.map((d, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted">
            <span className="text-violet">·</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
