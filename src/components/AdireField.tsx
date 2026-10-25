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

/**
 * A generative Adire cloth drawn on canvas. Motifs lean towards the pointer (mouse or finger).
 * Pauses when off-screen and draws a single still frame for reduced-motion users.
 */
export function AdireField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    let w = 0, h = 0, raf = 0, running = false;
    let wind = 0, lastScroll = window.scrollY, tilt = 0;
    // Phone tilt where the browser allows it without a permission prompt (Android); iOS simply skips it.
    const onTilt = (e: DeviceOrientationEvent) => { tilt += ((e.gamma ?? 0) / 3 - tilt) * 0.1; };
    window.addEventListener("deviceorientation", onTilt);

    function draw(t: number) {
      if (!ctx) return;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      ctx.fillStyle = INDIGO;
      ctx.fillRect(0, 0, w, h);
      const cols = w < 420 ? 5 : 7, s = w / cols, rows = Math.ceil(h / s);
      ctx.lineWidth = Math.max(1.2, s * 0.022);
      ctx.lineCap = "round";
      // Fabric ripple: a travelling wave plus a kick from scroll speed and phone tilt.
      wind += (Math.min(18, Math.abs(window.scrollY - lastScroll)) - wind) * 0.08;
      lastScroll = window.scrollY;
      const amp = s * (0.035 + wind * 0.006) + Math.abs(tilt) * 0.12;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const wave = Math.sin(t / 900 + i * 0.75 + j * 0.35 + tilt * 0.05);
          const cx = (i + 0.5) * s + wave * amp, cy = (j + 0.5) * s + Math.cos(t / 1150 + j * 0.6) * amp * 0.6;
          const d = Math.hypot(cx - pointer.x, cy - pointer.y);
          const k = Math.max(0, 1 - d / (s * 2.4));
          const bead = (i * 7 + j * 3) % 11 === 0;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(((i + j) % 2 ? 1 : -1) * (k * 0.9 + Math.sin(t / 2600 + i * 0.7 + j) * 0.05));
          ctx.scale(0.86 + k * 0.22, 0.86 + k * 0.22);
          ctx.strokeStyle = bead ? CORAL : STARCH;
          ctx.fillStyle = bead ? CORAL : STARCH;
          MOTIFS[(i * 3 + j * 5) % MOTIFS.length](ctx, s);
          ctx.restore();
        }
      }
      // Faint stitched grid between cells, like the starch lines on the cloth.
      ctx.strokeStyle = "rgba(246,243,236,0.14)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      for (let i = 1; i < cols; i++) { ctx.beginPath(); ctx.moveTo(i * s, 0); ctx.lineTo(i * s, h); ctx.stroke(); }
      for (let j = 1; j < rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * s); ctx.lineTo(w, j * s); ctx.stroke(); }
      ctx.setLineDash([]);
      // Light and shadow folds drifting across the cloth.
      const shift = (t / 40 + tilt * 6) % w;
      const g = ctx.createLinearGradient(-w + shift, 0, w + shift, h * 0.3);
      for (let k = 0; k <= 8; k++) g.addColorStop(k / 8, k % 2 ? "rgba(0,0,10,0.16)" : "rgba(255,255,255,0.05)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    function loop(t: number) {
      draw(t);
      if (running) raf = requestAnimationFrame(loop);
    }

    function resize() {
      // Layout size, not getBoundingClientRect: the cloth starts folded (CSS transform), which would shrink the measured rect.
      w = canvas!.clientWidth; h = canvas!.clientHeight;
      canvas!.width = Math.round(w * dpr); canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    }

    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      pointer.tx = e.clientX - r.left; pointer.ty = e.clientY - r.top;
      if (reduce) draw(performance.now());
    }
    function onLeave() { pointer.tx = -1e4; pointer.ty = -1e4; }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !reduce;
      if (visible && !running) { running = true; raf = requestAnimationFrame(loop); }
      if (!visible) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    resize();

    return () => {
      running = false; cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("deviceorientation", onTilt);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" style={{ touchAction: "pan-y" }} />;
}
