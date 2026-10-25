import { AdireField } from "../components/AdireField";
import { Wordmark } from "../components/Wordmark";
import { Magnetic } from "../components/Motion";
import { bookCall, profile } from "../data/content";

export function Hero() {
  return (
    <section id="top" className="gutter relative mx-auto grid max-w-7xl items-center gap-12 pb-16 pt-[calc(env(safe-area-inset-top)+6.5rem)] md:pb-24 lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-[calc(env(safe-area-inset-top)+5rem)]">
      <div>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-8 bg-coral" /> Full-stack · AI / ML · Design
        </p>
        <h1 className="sr-only">Mustapha Sulaimon, full-stack developer, AI/ML engineer and designer</h1>
        <Wordmark className="mt-6 w-full max-w-[540px]" />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
          {profile.tagline} <span className="text-muted">Web, mobile and AI products, built end to end from Nigeria for anywhere.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href={bookCall} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-starch">
              Book a call <span aria-hidden>→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.cv} download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 bg-paper px-6 font-medium transition-colors hover:border-ink">
              Download CV <span aria-hidden>↓</span>
            </a>
          </Magnetic>
          <a href="#work" className="px-2 py-3 font-mono text-xs uppercase tracking-[0.16em] text-indigo underline-offset-4 hover:underline">See the work</a>
        </div>
      </div>

      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[560px] lg:mr-0">
        {/* The cloth hangs from a wire on two coral pegs and unfolds down once the intro is done. */}
        <div className="hero-wire" aria-hidden="true"><span style={{ left: "14%" }} /><span style={{ right: "14%" }} /></div>
        <div className="hero-cloth absolute inset-0">
          <div className="absolute inset-0 overflow-hidden rounded-b-[2rem] rounded-t-md shadow-[0_40px_80px_-40px_rgba(26,36,102,0.7)]">
            <AdireField className="absolute inset-0 h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img src="/seal.svg" alt="" className="seal-float w-[44%] drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]" />
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-starch/90 px-3 py-1.5 font-mono text-[10px] text-ink backdrop-blur">
            Adire, drawn in code. Move your cursor.
          </span>
        </div>
      </div>
    </section>
  );
}
