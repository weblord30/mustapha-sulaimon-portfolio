import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Pinned scroll-jacking only above tablet width. On phones it fights
    // native scroll and feels broken, so mobile gets a plain scroll-snap row.
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
    <section id="process" ref={sectionRef} className="relative overflow-hidden bg-surface/30 py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-6 md:mb-16">
        <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">Process</span>
        <h2 className="mt-4 font-display text-3xl leading-tight font-bold sm:text-4xl">
          How the work actually gets done.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-max gap-5 overflow-x-auto px-6 pb-4 [scroll-snap-type:x_mandatory] md:w-max md:gap-10 md:overflow-visible md:px-[max(1.5rem,calc((100vw-72rem)/2))] md:pb-0"
      >
        {process.map((step) => (
          <div
            key={step.step}
            className="flex h-80 w-[80vw] max-w-md flex-shrink-0 flex-col justify-between rounded-2xl border border-border bg-surface-2/60 p-8 [scroll-snap-align:center] sm:h-[22rem] md:w-[26rem]"
          >
            <span className="font-mono text-6xl font-medium text-border">{step.step}</span>
            <div>
              <h3 className="font-display text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
