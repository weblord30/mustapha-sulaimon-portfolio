import { Reveal } from "../components/Reveal";
import { ProjectPanel } from "../components/ProjectPanel";
import { useDragScroll } from "../hooks/useDragScroll";
import { projects } from "../data/content";

const ACCENTS = ["violet", "mint", "blue"] as const;

export function Work() {
  const shipped = projects.filter((p) => p.status === "live");
  const drag = useDragScroll<HTMLDivElement>();

  return (
    <section id="work" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:mb-16">
        <Reveal>
          <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">Work</span>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
            A few things, done properly, and live.
          </h2>
          <p className="mt-3 font-mono text-xs text-muted">Drag, swipe, or scroll to browse →</p>
        </Reveal>
      </div>

      <div
        ref={drag.ref}
        onPointerDown={drag.onPointerDown}
        onPointerMove={drag.onPointerMove}
        onPointerUp={drag.onPointerUp}
        onPointerLeave={drag.onPointerLeave}
        onClickCapture={drag.onClickCapture}
        data-lenis-prevent
        className="flex w-max cursor-grab gap-5 overflow-x-auto px-6 pb-4 [scroll-snap-type:x_mandatory] [touch-action:pan-x] active:cursor-grabbing md:w-max md:gap-8 md:px-[max(1.5rem,calc((100vw-72rem)/2))]"
      >
        {shipped.map((project, i) => (
          <ProjectPanel key={project.id} project={project} accent={ACCENTS[i % ACCENTS.length]} />
        ))}
      </div>
    </section>
  );
}
