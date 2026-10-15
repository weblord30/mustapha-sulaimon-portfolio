import { Reveal } from "../components/Reveal";
import { profile, skills } from "../data/content";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="grid gap-16 md:grid-cols-2 md:gap-8">
        <Reveal>
          <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">About</span>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
            {profile.yearsExperience}+ years building software end to end.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {profile.bio}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative flex h-72 flex-wrap content-center items-center justify-center gap-3 rounded-2xl border border-border bg-surface/40 p-8">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-surface-2/60 px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-violet/40 hover:text-text"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
