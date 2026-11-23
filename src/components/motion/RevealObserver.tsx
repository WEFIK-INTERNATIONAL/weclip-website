"use client";
// Marks every .reveal element (and .bars) with data-shown once it scrolls into view, so CSS can animate it in.
// One observer for the whole page; new elements after a client-side page change are picked up too.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not([data-shown]), .bars:not([data-shown]), [data-reveal-group]:not([data-shown])");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.setAttribute("data-shown", "")); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.setAttribute("data-shown", ""); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
