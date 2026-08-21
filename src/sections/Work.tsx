import { Reveal } from "../components/Reveal";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/content";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">Work</span>
        <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
          A few things, done properly.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.1} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
