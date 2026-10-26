import { useEffect, useRef } from "react";

const INDIGO = "#1a2466";
const STARCH = "rgba(246,243,236,0.92)";
const CORAL = "#e4572e";

type Motif = (c: CanvasRenderingContext2D, s: number) => void;

// Motifs in the spirit of Adire eleko cloth: rings, dot grids, leaves, suns, stitches, crosses.
const MOTIFS: Motif[] = [
  (c, s) => { for (const r of [0.36, 0.25, 0.13]) { c.beginPath(); c.arc(0, 0, s * r, 0, Math.PI * 2); c.stroke(); } },
  (c, s) => { for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { c.beginPath(); c.arc(i * s * 0.22, j * s * 0.22, s * 0.04, 0, Math.PI * 2); c.fill(); } },
  (c, s) => {
    for (let k = 0; k < 4; k++) {
      c.save(); c.rotate((k * Math.PI) / 2);
      c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(s * 0.2, -s * 0.12, s * 0.38, 0); c.quadraticCurveTo(s * 0.2, s * 0.12, 0, 0); c.stroke();
      c.restore();
    }
  },
  (c, s) => {
    c.beginPath(); c.arc(0, 0, s * 0.12, 0, Math.PI * 2); c.stroke();
    for (let k = 0; k < 12; k++) { const a = (k * Math.PI) / 6; c.beginPath(); c.moveTo(Math.cos(a) * s * 0.2, Math.sin(a) * s * 0.2); c.lineTo(Math.cos(a) * s * 0.36, Math.sin(a) * s * 0.36); c.stroke(); }
  },
  (c, s) => { c.setLineDash([s * 0.06, s * 0.05]); for (const y of [-0.27, -0.09, 0.09, 0.27]) { c.beginPath(); c.moveTo(-s * 0.36, y * s); c.lineTo(s * 0.36, y * s); c.stroke(); } c.setLineDash([]); },
  (c, s) => {
    c.beginPath(); c.moveTo(-s * 0.3, -s * 0.3); c.lineTo(s * 0.3, s * 0.3); c.moveTo(s * 0.3, -s * 0.3); c.lineTo(-s * 0.3, s * 0.3); c.stroke();
    c.beginPath(); c.arc(0, 0, s * 0.07, 0, Math.PI * 2); c.fill();
  },
];

/** Paints the flat cloth (pattern + seal) into a texture canvas. */
function paintTexture(tex: HTMLCanvasElement, w: number, h: number, dpr: number, t: number, seal: HTMLImageElement | null) {
  const c = tex.getContext("2d")!;
  tex.width = Math.round(w * dpr); tex.height = Math.round(h * dpr);
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.fillStyle = INDIGO; c.fillRect(0, 0, w, h);
  const cols = w < 420 ? 5 : 7, s = w / cols, rows = Math.ceil(h / s);
  c.lineWidth = Math.max(1.2, s * 0.022); c.lineCap = "round";
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const bead = (i * 7 + j * 3) % 11 === 0;
    c.save(); c.translate((i + 0.5) * s, (j + 0.5) * s); c.rotate(((i + j) % 2 ? 1 : -1) * Math.sin(t / 2600 + i * 0.7 + j) * 0.05); c.scale(0.86, 0.86);
    c.strokeStyle = bead ? CORAL : STARCH; c.fillStyle = bead ? CORAL : STARCH;
    MOTIFS[(i * 3 + j * 5) % MOTIFS.length](c, s); c.restore();
  }
  c.strokeStyle = "rgba(246,243,236,0.14)"; c.lineWidth = 1; c.setLineDash([3, 5]);
  for (let i = 1; i < cols; i++) { c.beginPath(); c.moveTo(i * s, 0); c.lineTo(i * s, h); c.stroke(); }
  for (let j = 1; j < rows; j++) { c.beginPath(); c.moveTo(0, j * s); c.lineTo(w, j * s); c.stroke(); }
  c.setLineDash([]);
  if (seal?.complete && seal.naturalWidth) {
    const sw = w * 0.44;
    c.save(); c.shadowColor = "rgba(0,0,0,0.35)"; c.shadowBlur = 24; c.shadowOffsetY = 14;
    c.drawImage(seal, (w - sw) / 2, (h - sw) / 2, sw, sw); c.restore();
  }
}

/** Affine-maps one texture triangle onto a screen triangle (classic canvas mesh trick). */
function tri(ctx: CanvasRenderingContext2D, img: HTMLCanvasElement, k: number,
  x0: number, y0: number, x1: number, y1: number, x2: number, y2: number,
  u0: number, v0: number, u1: number, v1: number, u2: number, v2: number,
  sx: number, sy: number, sw: number, sh: number) {
  ctx.save();
  // Grow the clip triangle a hair from its centroid so neighbouring triangles leave no seams.
  const cx = (x0 + x1 + x2) / 3, cy = (y0 + y1 + y2) / 3, g = 1.04;
  ctx.beginPath();
  ctx.moveTo(cx + (x0 - cx) * g, cy + (y0 - cy) * g); ctx.lineTo(cx + (x1 - cx) * g, cy + (y1 - cy) * g); ctx.lineTo(cx + (x2 - cx) * g, cy + (y2 - cy) * g);
  ctx.closePath(); ctx.clip();
  u0 *= k; v0 *= k; u1 *= k; v1 *= k; u2 *= k; v2 *= k;
  const d = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
  if (Math.abs(d) < 1e-6) { ctx.restore(); return; }
  const a = (x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2) / d;
  const b = (u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2) / d;
  const c = (u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2) / d;
  const e = (y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2) / d;
  const f = (u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2) / d;
  const g2 = (u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2) / d;
  ctx.transform(a, e, b, f, c, g2);
  // Only this cell's patch of texture: drawing the whole texture per triangle is ~200x the pixel work.
  ctx.drawImage(img, sx, sy, sw, sh, sx, sy, sw, sh);
  ctx.restore();
}

type Pt = { x: number; y: number; px: number; py: number; pin: boolean; x0: number; y0: number };

/**
 * The hero cloth: the Adire pattern and seal painted on a mesh that hangs from the wire with real
 * physics (Verlet). Sags under gravity, billows in a breeze, gusts on scroll, and can be grabbed and
 * dragged by mouse or finger. Lighter mesh on phones; a still cloth for reduced-motion visitors.
 * Pauses when off-screen.
 */
export function AdireField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const tex = document.createElement("canvas");
    const seal = new Image(); seal.src = "/seal.svg";
    // The cloth hangs inside a larger canvas so it can swing past its resting edges.
    const MX = 0.08, MB = 0.12;
    let W = 0, H = 0, cw = 0, ch = 0, ox = 0, raf = 0, running = false, frame = 0;
    let pts: Pt[][] = [], COLS = 0, ROWS = 0, rx = 0, ry = 0;
    let wind = 0, lastScroll = window.scrollY;
    // Touch screens get gentler gusts so the cloth never swings off a narrow screen.
    const coarse = !window.matchMedia("(pointer: fine)").matches, calm = coarse ? 0.5 : 1;
    const ptr = { x: -1e4, y: -1e4, vx: 0, vy: 0, down: false, grab: null as Pt | null };

    function build() {
      W = canvas!.clientWidth; H = canvas!.clientHeight;
      canvas!.width = Math.round(W * dpr); canvas!.height = Math.round(H * dpr);
      cw = W / (1 + 2 * MX); ch = H / (1 + MB); ox = cw * MX;
      const fine = window.matchMedia("(pointer: fine)").matches;
      COLS = fine ? 15 : 10; ROWS = fine ? 15 : 10;
      rx = cw / (COLS - 1); ry = ch / (ROWS - 1);
      pts = [];
      for (let j = 0; j < ROWS; j++) {
        const row: Pt[] = [];
        for (let i = 0; i < COLS; i++) { const x = ox + i * rx, y = j * ry; row.push({ x, y, px: x, py: y, pin: j === 0, x0: x, y0: y }); }
        pts.push(row);
      }
      paintTexture(tex, cw, ch, dpr, performance.now(), seal);
    }

    const fixed = (p: Pt) => p.pin || p === ptr.grab;
    function satisfy(a: Pt, b: Pt, rest: number) {
      const fa = fixed(a), fb = fixed(b);
      if (fa && fb) return;
      const dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx, dy) || 1e-6, diff = (dist - rest) / dist;
      const wa = fa ? 0 : fb ? 1 : 0.5, wb = fb ? 0 : fa ? 1 : 0.5;
      a.x += dx * diff * wa; a.y += dy * diff * wa;
      b.x -= dx * diff * wb; b.y -= dy * diff * wb;
    }

    function step(t: number) {
      wind += (Math.min(30, Math.abs(window.scrollY - lastScroll)) - wind) * 0.1;
      lastScroll = window.scrollY;
      // A barely-there breeze; real movement comes from scrolling and dragging.
      const breeze = Math.sin(t / 2600) * 0.03 + Math.sin(t / 1100) * 0.01;
      const lim = cw * (coarse ? 0.07 : 0.12); // how far the cloth may swing sideways from where it hangs
      for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
        const p = pts[j][i];
        if (p.pin || p === ptr.grab) continue;
        // Heavy damping so the cloth settles instead of bobbing forever.
        const vx = (p.x - p.px) * 0.955, vy = (p.y - p.py) * 0.935;
        p.px = p.x; p.py = p.y;
        const depth = j / (ROWS - 1);
        const gust = (breeze + wind * 0.01 * Math.sin(t / 300 + i * 0.4)) * depth * 5;
        p.x += vx + gust * Math.sin(t / 700 + j * 0.5) * calm;
        p.y += vy + 0.12;
        // A gentle pull back to how it hangs, so it always comes to rest.
        p.x += (p.x0 - p.x) * 0.006; p.y += (p.y0 - p.y) * 0.012;
        // Brush: the pointer pushes cloth it moves through.
        const d = Math.hypot(p.x - ptr.x, p.y - ptr.y);
        if (d < rx * 1.6 && !ptr.down) { p.x += ptr.vx * 0.35 * (1 - d / (rx * 1.6)); p.y += ptr.vy * 0.35 * (1 - d / (rx * 1.6)); }
      }
      for (const row of pts) for (const p of row) if (p !== ptr.grab) p.x = Math.max(p.x0 - lim, Math.min(p.x0 + lim, p.x));
      if (ptr.grab) { ptr.grab.x = ptr.x; ptr.grab.y = ptr.y; }
      for (let it = 0; it < 7; it++) {
        for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
          if (i < COLS - 1) satisfy(pts[j][i], pts[j][i + 1], rx);
          if (j < ROWS - 1) satisfy(pts[j][i], pts[j + 1][i], ry);
        }
      }
      ptr.vx *= 0.8; ptr.vy *= 0.8;
    }

    function render() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      const k = dpr, tu = cw / (COLS - 1), tv = ch / (ROWS - 1);
      for (let j = 0; j < ROWS - 1; j++) for (let i = 0; i < COLS - 1; i++) {
        const a = pts[j][i], b = pts[j][i + 1], c = pts[j + 1][i], d = pts[j + 1][i + 1];
        const u0 = i * tu, v0 = j * tv, u1 = (i + 1) * tu, v1 = (j + 1) * tv;
        const pad = 2, sx = Math.max(0, u0 * k - pad), sy = Math.max(0, v0 * k - pad);
        const sw = Math.min(tex.width - sx, (u1 - u0) * k + pad * 2), sh = Math.min(tex.height - sy, (v1 - v0) * k + pad * 2);
        tri(ctx!, tex, k, a.x, a.y, b.x, b.y, d.x, d.y, u0, v0, u1, v0, u1, v1, sx, sy, sw, sh);
        tri(ctx!, tex, k, a.x, a.y, d.x, d.y, c.x, c.y, u0, v0, u1, v1, u0, v1, sx, sy, sw, sh);
        // Fold shading: darker where the cloth bunches up, lighter where it stretches and faces the light.
        const area = ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) / (rx * ry);
        const tilt = (b.y - a.y) / rx;
        const shade = Math.max(-0.22, Math.min(0.32, (1 - area) * 0.9 + tilt * 0.5));
        ctx!.fillStyle = shade > 0 ? `rgba(4,6,24,${shade})` : `rgba(255,255,255,${-shade * 0.5})`;
        ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.lineTo(d.x, d.y); ctx!.lineTo(c.x, c.y); ctx!.closePath(); ctx!.fill();
      }
    }

    function loop(t: number) {
      frame++;
      if (frame % 30 === 0) canvas!.dataset.frames = String(frame); // cheap liveness marker for tests
      if (frame % 4 === 0) paintTexture(tex, cw, ch, dpr, t, seal); // motifs breathe slowly
      step(t); render();
      if (running) raf = requestAnimationFrame(loop);
    }

    const toLocal = (e: PointerEvent) => { const r = canvas!.getBoundingClientRect(); return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }; };
    function onMove(e: PointerEvent) { const p = toLocal(e); ptr.vx = p.x - ptr.x; ptr.vy = p.y - ptr.y; if (Math.abs(ptr.vx) > 80) ptr.vx = 0; if (Math.abs(ptr.vy) > 80) ptr.vy = 0; ptr.x = p.x; ptr.y = p.y; }
    function onDown(e: PointerEvent) {
      const p = toLocal(e); ptr.x = p.x; ptr.y = p.y; ptr.down = true;
      let best: Pt | null = null, bd = rx * 1.4;
      for (const row of pts) for (const q of row) { if (q.pin) continue; const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = q; } }
      ptr.grab = best;
      if (best && e.pointerType === "mouse") canvas!.setPointerCapture(e.pointerId);
    }
    function onUp() { ptr.down = false; ptr.grab = null; }
    function onLeave() { ptr.x = -1e4; ptr.y = -1e4; ptr.grab = null; ptr.down = false; }

    seal.onload = () => paintTexture(tex, cw, ch, dpr, performance.now(), seal);
    build(); render();
    const ro = new ResizeObserver(() => { build(); render(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !reduce;
      if (visible && !running) { running = true; raf = requestAnimationFrame(loop); }
      if (!visible) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      running = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp); canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // touch-action pan-y: a vertical swipe still scrolls the page; a sideways drag grabs the cloth.
  return <canvas ref={ref} className={className} aria-hidden="true" style={{ touchAction: "pan-y" }} />;
}
