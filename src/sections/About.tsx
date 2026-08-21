import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { profile, skills } from "../data/content";

function driftFor(i: number) {
  const dx = ((i * 37) % 20) - 10;
  const dy = ((i * 53) % 16) - 8;
  const duration = 4 + (i % 4);
  return { dx, dy, duration };
}

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
            {skills.map((skill, i) => {
              const { dx, dy, duration } = driftFor(i);
              return (
                <motion.span
                  key={skill}
                  animate={{ x: [0, dx, 0], y: [0, dy, 0] }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-full border border-border bg-surface-2/60 px-3.5 py-1.5 font-mono text-xs text-muted"
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
