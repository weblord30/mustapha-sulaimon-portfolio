import { Reveal } from "../components/Reveal";
import { services } from "../data/content";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-[0.3em] text-mint uppercase">Services</span>
      </Reveal>

      <div className="mt-10 divide-y divide-border border-t border-border">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.08}>
            <div className="group flex flex-col justify-between gap-2 py-10 md:flex-row md:items-baseline md:gap-8">
              <h3 className="font-display text-3xl font-bold text-balance transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet group-hover:to-blue sm:text-4xl md:w-1/2">
                {service.title}
              </h3>
              <p className="max-w-md text-muted md:w-1/2">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
