import { useEffect, useRef } from "react";

/**
 * Custom cursor: the Adire cursor i follows the mouse and becomes the coral bead over anything clickable.
 * Only for fine pointers (mouse/trackpad) without reduced motion; touch devices keep native behaviour.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dot.current;
    if (!fine || reduce || !el) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;

    const move = (e: PointerEvent) => {
      pos.tx = e.clientX; pos.ty = e.clientY;
      const t = e.target as HTMLElement | null;
      el.classList.toggle("is-link", !!t?.closest("a, button, summary, [role='button']"));
      el.classList.remove("is-hidden");
    };
    const leave = () => el.classList.add("is-hidden");
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.22; pos.y += (pos.ty - pos.y) * 0.22;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={dot} className="cursor is-hidden" aria-hidden="true">
      <span className="cursor-bead" />
      <span className="cursor-stem" />
    </div>
  );
}
