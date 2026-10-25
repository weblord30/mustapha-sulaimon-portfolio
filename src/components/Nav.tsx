import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 120);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        >
          {/* Desktop / tablet pill nav */}
          <div className="hidden items-center gap-1 rounded-full border border-border bg-surface/80 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:flex">
            <a href="#" aria-label="Mustapha Sulaimon, back to top" className="mr-1 flex items-center rounded-full pl-1">
              <img src="/logo-icon.svg" alt="" className="h-7 w-7" />
            </a>
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 font-mono text-xs tracking-wide text-muted transition-colors hover:bg-white/5 hover:text-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-1 rounded-full bg-text px-4 py-1.5 font-mono text-xs tracking-wide text-ground transition-opacity hover:opacity-85"
            >
              Hire me
            </a>
          </div>

          {/* Mobile compact trigger */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2.5 font-mono text-xs text-text shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
              Menu
              <span className={`transition-transform ${menuOpen ? "rotate-45" : ""}`}>+</span>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 mt-2 flex w-48 -translate-x-1/2 flex-col gap-1 rounded-2xl border border-border bg-surface/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                  {LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-center font-mono text-xs tracking-wide text-muted transition-colors hover:bg-white/5 hover:text-text"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-1 rounded-xl bg-text px-4 py-2.5 text-center font-mono text-xs tracking-wide text-ground"
                  >
                    Hire me
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
