import { useEffect, useMemo, useRef, useState } from "react";
import { bookCall, profile } from "../data/content";
import { getPrefs, setPrefs, tick } from "../lib/prefs";

type Cmd = { id: string; label: string; hint: string; run: () => void };

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** ⌘K / Ctrl+K command bar: jump anywhere, copy my email, grab the CV, switch theme or sound. */
export function CommandBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const cmds: Cmd[] = useMemo(() => [
    { id: "work", label: "Go to work", hint: "Section", run: () => go("work") },
    { id: "lab", label: "Go to the lab", hint: "Section", run: () => go("lab") },
    { id: "about", label: "Go to about", hint: "Section", run: () => go("about") },
    { id: "contact", label: "Go to contact", hint: "Section", run: () => go("contact") },
    { id: "email", label: "Copy my email", hint: profile.email, run: () => { void navigator.clipboard?.writeText(profile.email); flash("Email copied"); } },
    { id: "call", label: "Book a call on WhatsApp", hint: profile.whatsappDisplay, run: () => window.open(bookCall, "_blank", "noopener") },
    { id: "cv", label: "Download my CV", hint: "PDF", run: () => { const a = document.createElement("a"); a.href = profile.cv; a.download = ""; a.click(); } },
    { id: "night", label: "Toggle Indigo Night", hint: "Theme", run: () => setPrefs({ night: !getPrefs().night }) },
    { id: "sound", label: "Toggle sound", hint: "Off by default", run: () => { setPrefs({ sound: !getPrefs().sound }); flash(getPrefs().sound ? "Sound on" : "Sound off"); } },
    { id: "github", label: "Open GitHub", hint: "weblord30", run: () => window.open(profile.github, "_blank", "noopener") },
    { id: "linkedin", label: "Open LinkedIn", hint: "mustapha-sulaimon", run: () => window.open(profile.linkedin, "_blank", "noopener") },
  ], []);

  function flash(t: string) { setToast(t); window.setTimeout(() => setToast(""), 1600); }

  const list = cmds.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-bar", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-command-bar", onOpen); };
  }, []);

  useEffect(() => { if (open) { setQ(""); setSel(0); window.setTimeout(() => input.current?.focus(), 30); tick(); } }, [open]);

  function run(c: Cmd) { setOpen(false); tick(); window.setTimeout(c.run, 60); }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center bg-ink/40 px-4 pt-[calc(env(safe-area-inset-top)+12vh)] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div role="dialog" aria-label="Command bar" className="paper w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="caret h-5 w-1.5 rounded-[2px] bg-coral" aria-hidden />
              <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Type a command…" aria-label="Search commands"
                className="h-14 flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
                  if (e.key === "Enter" && list[sel]) run(list[sel]);
                }} />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {list.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === sel}>
                  <button type="button" onMouseEnter={() => setSel(i)} onClick={() => run(c)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left text-[15px] ${i === sel ? "on-dark bg-indigo text-starch" : "text-ink"}`}>
                    {c.label}
                    <span className={`truncate font-mono text-[11px] ${i === sel ? "text-starch/60" : "text-muted"}`}>{c.hint}</span>
                  </button>
                </li>
              ))}
              {!list.length && <li className="px-3 py-6 text-center font-mono text-xs text-muted">Nothing matches “{q}”.</li>}
            </ul>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed left-1/2 z-[96] -translate-x-1/2 rounded-full bg-ink px-4 py-2 font-mono text-xs text-starch shadow-lg" style={{ bottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))" }} role="status">
          {toast}
        </div>
      )}
    </>
  );
}
