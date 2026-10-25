import { useEffect, useState } from "react";
import { bookCall, profile } from "../data/content";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#lab", label: "Lab" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Local time where I am, so visitors know when I'll reply. */
function useLocalTime() {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function TopBar() {
  const time = useLocalTime();
  const [open, setOpen] = useState(false);

  return (
    // Safe-area padding keeps the bar's content clear of the notch / Dynamic Island under viewport-fit=cover.
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-starch/85 backdrop-blur-md" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="gutter mx-auto flex h-16 max-w-7xl items-center gap-3">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Mustapha Sulaimon, back to top" onClick={() => setOpen(false)}>
          <img src="/logo-icon.svg" alt="" className="h-8 w-8" />
          <span className="hidden font-display text-[17px] font-extrabold tracking-tight lg:block">Mustapha Sulaimon</span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-1.5 text-sm text-ink/70 transition-colors hover:bg-sand hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 font-mono text-[11px] text-ink/70 md:ml-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            {profile.availability}
          </span>
          <span className="tabular-nums" title="My local time (WAT, UTC+1)">NG {time}</span>
        </div>

        <a href={bookCall} target="_blank" rel="noopener" className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-starch transition-transform hover:-translate-y-0.5 md:inline-flex">
          Book a call
        </a>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="gutter border-t border-line/70 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 md:hidden">
          <nav className="flex flex-col" aria-label="Sections">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line/60 py-3.5 font-display text-2xl font-bold">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-mono text-[11px] text-ink/70">
              <span className="h-2 w-2 rounded-full bg-green" /> {profile.availability}
            </span>
            <a href={bookCall} target="_blank" rel="noopener" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-starch">Book a call</a>
          </div>
        </div>
      )}
    </header>
  );
}
