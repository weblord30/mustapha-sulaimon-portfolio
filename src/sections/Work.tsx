import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../components/Reveal";
import { ProjectPanel } from "../components/ProjectPanel";
import { projects } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ["violet", "mint", "blue"] as const;

export function Work() {
  const shipped = projects.filter((p) => p.status === "live");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Same pattern as Process: pinned, scroll-driven horizontal pan on
    // desktop/tablet, where there's no natural horizontal-swipe gesture.
    // Phones keep a plain native scroll-snap row — pinning fights touch
    // scroll and feels broken there.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollDistance = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance()}`,
        scrub: 0.5,
        pin: true,
        animation: tween,
        invalidateOnRefresh: true,
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:mb-16">
        <Reveal>
          <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">Work</span>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
            A few things, done properly, and live.
          </h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        data-lenis-prevent
        className="flex w-max gap-5 overflow-x-auto px-6 pb-4 [scroll-snap-type:x_mandatory] [touch-action:pan-x] md:w-max md:gap-10 md:overflow-visible md:px-[max(1.5rem,calc((100vw-72rem)/2))] md:pb-0"
      >
        {shipped.map((project, i) => (
          <ProjectPanel key={project.id} project={project} accent={ACCENTS[i % ACCENTS.length]} />
        ))}
      </div>
    </section>
  );
}
