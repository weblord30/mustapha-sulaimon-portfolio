import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <span className="flex items-center gap-3">
          <img src="/logo-wordmark.svg" alt={profile.name} className="h-6 w-auto" />
          <span>© {new Date().getFullYear()}</span>
        </span>
        <span>Built with React, GSAP & Framer Motion</span>
      </div>
    </footer>
  );
}
