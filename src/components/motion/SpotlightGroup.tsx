"use client";
// Lets the .spot cards inside follow the pointer with a soft violet light (sets --mx / --my on the hovered card).
import type { ReactNode } from "react";

export function SpotlightGroup({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>(".spot");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
