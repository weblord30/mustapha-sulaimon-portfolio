import { useEffect, useRef, useState } from "react";

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 900;

export function LivePreview({ url, title }: { url: string; title: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0.1);

  // Lazy-mount: don't load three live external sites at once, only once
  // this specific preview actually scrolls into view.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    function updateScale() {
      if (!el) return;
      setScale(el.clientWidth / FRAME_WIDTH);
    }
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-ground shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
    >
      {visible ? (
        <iframe
          src={url}
          title={`${title} live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={-1}
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            border: "none",
          }}
        />
      ) : (
        <div className="h-full w-full animate-pulse bg-surface-2/40" />
      )}
    </div>
  );
}
