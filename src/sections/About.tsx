import { Reveal } from "../components/Reveal";
import { experience, profile, skills } from "../data/content";

export function About() {
  return (
    <section id="about" className="gutter mx-auto max-w-7xl scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">About</p>
            <blockquote className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-[3.4rem]">
              <span className="text-coral">{profile.oriki}:</span> {profile.orikiMeaning}.
            </blockquote>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink/80">
              <p>
                I'm {profile.fullName}. Akanbi is my oriki, the Yoruba praise name I was given, and Olabode means wealth has come home.
                Between them is how I work: everything I build is made on purpose, and it's built here in Nigeria for anywhere.
              </p>
              <p>{profile.bio}</p>
              <p>
                I studied Computer Science at Kwara State University, where my final-year research taught a neural network to make digital
                banking readable in Yoruba. Outside client work I publish books, teach Python, and build products I'd want to use myself.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ol className="relative border-l border-dashed border-ink/25 pl-7">
            {experience.map((e) => (
              <li key={e.role} className="relative pb-7 last:pb-0">
                <span className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full border-2 border-starch bg-indigo" />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{e.period} · {e.org}</p>
                <p className="mt-1 font-display text-xl font-extrabold tracking-tight">{e.role}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink/70">{e.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-paper p-5">
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-indigo">{g.group}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((s) => <span key={s} className="rounded-full bg-sand px-2.5 py-1 text-[13px] text-ink/80">{s}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
