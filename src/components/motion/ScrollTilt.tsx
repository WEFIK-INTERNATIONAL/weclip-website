"use client";
// The hero screenshot starts slightly tilted back and settles flat as it scrolls into the middle of the screen.
import { useEffect, useRef, type ReactNode } from "react";

export function ScrollTilt({ children }: { children: ReactNode }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0
      const node = el.current
      if (!node) return
      const r = node.getBoundingClientRect()
      // 0 when the top of the screenshot is at the bottom of the screen, 1 when it reaches 25% from the top.
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75)))
      const e = 1 - (1 - p) ** 3
      node.style.transform = `perspective(1400px) rotateX(${(1 - e) * 14}deg) scale(${0.94 + e * 0.06})`
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={el} className="origin-top will-change-transform">{children}</div>;
}
