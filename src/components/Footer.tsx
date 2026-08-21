import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, GSAP & Framer Motion</span>
      </div>
    </footer>
  );
}
