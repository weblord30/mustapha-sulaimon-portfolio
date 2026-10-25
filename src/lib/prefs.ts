// Visitor preferences (theme, sound) kept in localStorage, with a tiny event bus so the
// top bar, command bar and anything else stay in sync. Storage can be blocked: always wrapped.

type Prefs = { night: boolean; sound: boolean };
const KEY = "ms-prefs";

function read(): Prefs {
  let saved: Partial<Prefs> = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { /* private mode */ }
  const systemNight = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return { night: saved.night ?? systemNight, sound: saved.sound ?? false };
}

let prefs = read();
const listeners = new Set<(p: Prefs) => void>();

export const getPrefs = () => prefs;
export function setPrefs(patch: Partial<Prefs>) {
  prefs = { ...prefs, ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch { /* ignore */ }
  applyTheme();
  listeners.forEach((l) => l(prefs));
}
export function onPrefs(l: (p: Prefs) => void) { listeners.add(l); return () => { listeners.delete(l); }; }

/** Indigo Night: the page dyed in the indigo pot. Also recolours the browser's status bar. */
export function applyTheme() {
  document.documentElement.dataset.theme = prefs.night ? "night" : "day";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", prefs.night ? "#0c1233" : "#f6f3ec");
}

// ---- Sound: synthesised with Web Audio, nothing to download. Off by default. ----
let ctx: AudioContext | null = null;
function audio() {
  if (!prefs.sound) return null;
  try { ctx ??= new AudioContext(); if (ctx.state === "suspended") void ctx.resume(); } catch { return null; }
  return ctx;
}

/** Short soft tick for buttons. */
export function tick() {
  const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = "sine"; o.frequency.setValueAtTime(1150, a.currentTime); o.frequency.exponentialRampToValueAtTime(700, a.currentTime + 0.05);
  g.gain.setValueAtTime(0.05, a.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.07);
  o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + 0.08);
}

/** Cloth swish: filtered noise that sweeps up, like fabric pulled off a line. */
export function swish(duration = 0.7) {
  const a = audio(); if (!a) return;
  const len = Math.floor(a.sampleRate * duration), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len);
  const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  src.buffer = buf; f.type = "bandpass"; f.Q.value = 0.8;
  f.frequency.setValueAtTime(400, a.currentTime); f.frequency.exponentialRampToValueAtTime(3200, a.currentTime + duration);
  g.gain.value = 0.22;
  src.connect(f).connect(g).connect(a.destination); src.start();
}
