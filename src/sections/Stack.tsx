import { skills } from "../data/content";

export function Stack() {
  const loop = [...skills, ...skills];

  return (
    <section className="relative overflow-hidden border-y border-border py-14">
      <div className="animate-marquee flex w-max gap-10">
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="font-mono text-sm tracking-wide text-muted whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ground to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ground to-transparent" />
    </section>
  );
}
