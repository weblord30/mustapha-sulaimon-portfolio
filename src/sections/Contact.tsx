import { Reveal } from "../components/Reveal";
import { Magnetic, Spread } from "../components/Motion";
import { bookCall, profile } from "../data/content";

/** Closing call to action and footer in one indigo block; bottom padding clears the iPhone home indicator. */
export function Contact() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    { label: "WhatsApp", href: bookCall, value: profile.whatsappDisplay },
    { label: "LinkedIn", href: profile.linkedin, value: "mustapha-sulaimon" },
    { label: "GitHub", href: profile.github, value: "weblord30" },
  ];
  return (
    <Spread id="contact" className="relative scroll-mt-24 overflow-hidden bg-indigo text-starch">
      <div className="adire-dots pointer-events-none absolute inset-0 text-starch/[0.06]" />
      <div className="gutter relative mx-auto max-w-7xl pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 md:pt-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-starch/55">Contact</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.9rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight">
            Let's build something <span className="text-coral">on purpose.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-starch/75">
            Products, client builds, AI work or a second pair of hands on your team. I reply fastest on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href={bookCall} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-coral px-6 font-medium text-starch">
                Book a call <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <a href={profile.cv} download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-starch/30 px-6 font-medium transition-colors hover:border-starch">
              Download CV <span aria-hidden>↓</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-starch/10 bg-starch/10 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="group bg-indigo p-5 transition-colors hover:bg-indigo-2">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-starch/50">{l.label}</p>
              <p className="mt-2 flex items-center justify-between gap-2 truncate font-medium">{l.value} <span aria-hidden className="text-coral transition-transform group-hover:translate-x-1">↗</span></p>
            </a>
          ))}
        </div>

        <footer className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-starch/10 pt-8 sm:flex-row sm:items-center">
          <img src="/logo-wordmark.svg" alt={profile.name} className="h-8 w-auto" />
          <p className="font-mono text-[11px] text-starch/50">© {new Date().getFullYear()} {profile.name} · Designed and built by me</p>
        </footer>
      </div>
    </Spread>
  );
}
