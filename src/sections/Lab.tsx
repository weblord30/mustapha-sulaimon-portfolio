import { Reveal } from "../components/Reveal";
import { SplitTitle, Spread } from "../components/Motion";
import { lab } from "../data/content";

/** Experiments and personal work. The love letter is shown as an abstract piece only: no names, photos or song. */
export function Lab() {
  return (
    <Spread id="lab" className="scroll-mt-24 bg-indigo-deep py-16 text-starch md:py-24">
      <div className="gutter mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-starch/50">The lab</p>
        </Reveal>
        <SplitTitle text="Things I make" accent="because I can." accentClass="text-coral" className="lab-title mt-3 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {lab.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-starch/10 bg-indigo">
                <div className="relative aspect-[16/10] overflow-hidden">{item.visual === "heart" ? <Heart /> : <Brand />}</div>
                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-coral">{item.kicker}</p>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-starch/75">{item.body}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((t) => <span key={t} className="rounded-full border border-starch/15 px-2.5 py-1 font-mono text-[10.5px] text-starch/70">{t}</span>)}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Spread>
  );
}

/** Faceted crystal heart with a slow heartbeat and drifting particles. Pure SVG, no personal content. */
function Heart() {
  const facets = [
    "M100 170 L40 105 L70 70 Z", "M100 170 L70 70 L100 95 Z", "M100 170 L100 95 L130 70 Z", "M100 170 L130 70 L160 105 Z",
    "M40 105 L45 65 L70 70 Z", "M45 65 L70 40 L70 70 Z", "M70 40 L100 60 L70 70 Z", "M70 70 L100 60 L100 95 Z",
    "M100 60 L130 40 L130 70 Z", "M100 95 L100 60 L130 70 Z", "M130 40 L155 65 L130 70 Z", "M155 65 L160 105 L130 70 Z",
  ];
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_55%,#3a2a8f_0%,#10173f_70%)]">
      <svg viewBox="0 0 200 200" className="h-[78%] w-auto overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd2c2" /><stop offset=".5" stopColor="#e4572e" /><stop offset="1" stopColor="#7a1f3d" /></linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        <g style={{ transformOrigin: "100px 110px", animation: "beat 1.6s ease-in-out infinite" }}>
          <path d="M100 170 L40 105 L45 65 L70 40 L100 60 L130 40 L155 65 L160 105 Z" fill="#e4572e" opacity=".45" filter="url(#glow)" />
          {facets.map((d, i) => <path key={i} d={d} fill="url(#hg)" opacity={0.55 + (i % 4) * 0.12} stroke="#ffe7de" strokeOpacity=".35" strokeWidth=".6" />)}
        </g>
        {Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx={20 + ((i * 37) % 160)} cy={30 + ((i * 53) % 150)} r={i % 3 ? 1 : 1.8} fill="#f6f3ec" opacity=".6"
            style={{ animation: `drift ${5 + (i % 5)}s ease-in-out ${i * 0.3}s infinite alternate` }} />
        ))}
      </svg>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-[6%] bg-starch p-6">
      <img src="/logo-wordmark-light.svg" alt="Mustapha Sulaimon wordmark" className="w-[52%]" />
      <img src="/seal.svg" alt="" className="w-[28%]" />
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 overflow-hidden rounded-full border border-line">
        {["#1a2466", "#f6f3ec", "#e4572e", "#0b0d12"].map((c) => <span key={c} className="h-4 w-8" style={{ background: c }} />)}
      </div>
    </div>
  );
}
