import { skills } from "../data/content";

/** A strip of indigo cloth tape scrolling the stack past, stitched along both edges. Pauses on hover. */
export function Ribbon() {
  const items = skills.flatMap((g) => g.items);
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((s) => (
        <span key={s} className="flex items-center whitespace-nowrap px-5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          {s}<span className="ml-10 h-2 w-2 rounded-full bg-coral" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className="ribbon relative -rotate-[1.2deg] overflow-hidden bg-indigo py-5 text-starch" aria-label="Skills">
      <div className="adire-stitch absolute inset-x-0 top-2 text-starch/30" />
      <div className="ribbon-track">{row}{row}</div>
      <div className="adire-stitch absolute inset-x-0 bottom-2 text-starch/30" />
    </div>
  );
}
