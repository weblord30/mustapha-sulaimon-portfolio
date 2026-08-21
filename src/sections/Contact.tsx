import { Reveal } from "../components/Reveal";
import { profile } from "../data/content";

export function Contact() {
  const waLink = `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-32 text-center">
      <Reveal>
        <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">Contact</span>
        <h2 className="mt-4 font-display text-4xl leading-tight font-bold text-balance sm:text-6xl">
          Let's build something worth shipping.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-muted">
          Open to full-stack, mobile, and UI/UX work. Reach out directly, I reply fast.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-text px-7 py-3 font-mono text-sm text-ground transition-transform hover:scale-[1.03]"
          >
            {profile.email}
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-7 py-3 font-mono text-sm text-text transition-colors hover:bg-white/5"
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-8">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors hover:text-mint"
          >
            LinkedIn ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}
