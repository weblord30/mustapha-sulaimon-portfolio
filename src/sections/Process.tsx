import { Reveal } from "../components/Reveal";
import { SplitTitle } from "../components/Motion";
import { process } from "../data/content";

export function Process() {
  return (
    <section id="process" className="gutter mx-auto max-w-7xl scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">How I work</p>
      </Reveal>
      <SplitTitle text="One person," accent="the whole thread." className="mt-3 max-w-2xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl" />
      {/* A stitched line runs through the steps: across on desktop, down on mobile. */}
      <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        <span aria-hidden className="adire-stitch absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-[2px] rotate-0 text-coral/60 md:left-3 md:right-3 md:top-[11px] md:h-[2px] md:w-auto" />
        {process.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <li className="relative pl-10 md:pl-0 md:pt-10">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-coral font-mono text-[10px] font-bold text-starch">{i + 1}</span>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Step {s.step}</p>
              <p className="mt-1 font-display text-3xl font-extrabold tracking-tight">{s.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
