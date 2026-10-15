import { useRef } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  function onPointerDown(e: React.PointerEvent<T>) {
    const el = ref.current;
    // Touch and pen already get perfectly good native swipe/momentum
    // scrolling from the browser. Hijacking that with manual scrollLeft
    // math fights it and feels broken on real touchscreens — this drag
    // path exists only for desktop mice, which have no horizontal wheel
    // gesture of their own.
    if (!el || e.pointerType !== "mouse") return;
    state.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<T>) {
    const el = ref.current;
    if (!el || !state.current.down) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 3) state.current.moved = true;
    el.scrollLeft = state.current.startScroll - dx;
  }

  function endDrag(e: React.PointerEvent<T>) {
    state.current.down = false;
    ref.current?.releasePointerCapture(e.pointerId);
  }

  // Dragging fires click on the links/buttons underneath the pointer once
  // released; swallow that single click only when an actual drag happened,
  // so normal taps still work on touch and plain clicks still work on desktop.
  function onClickCapture(e: React.MouseEvent<T>) {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  }

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerLeave: endDrag,
    onClickCapture,
  };
}
