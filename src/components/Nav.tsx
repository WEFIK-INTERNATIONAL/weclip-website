"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#private", label: "Privacy" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border-b border-line bg-[#1a1530] text-center text-[13px] text-white/90">
        <p className="mx-auto max-w-7xl px-4 py-2">
          New: <b className="font-medium">Live Clipping</b> makes Shorts from a stream while it is still live.{" "}
          <Link href="/#live" className="ml-1 rounded-sm border border-white/30 px-1.5 py-0.5 text-[12px] hover:bg-white/10">Learn more</Link>
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
          <Link href="/" aria-label="WeClip home"><Logo /></Link>
          <ul className="hidden items-center gap-8 text-[14px] text-muted md:flex">
            {LINKS.map((l) => <li key={l.href}><Link className="transition-colors hover:text-white" href={l.href}>{l.label}</Link></li>)}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/download/" className="hidden h-9 items-center rounded-md border border-line-strong px-3.5 text-[14px] text-white transition-colors hover:bg-white/5 sm:inline-flex">All downloads</Link>
            <Link href="/download/" className="inline-flex h-9 items-center rounded-md bg-white px-3.5 text-[14px] font-medium text-black transition-colors hover:bg-white/85">Download</Link>
            <button type="button" className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-white/5 hover:text-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {open && (
          <ul className="border-t border-line px-4 py-3 md:hidden">
            {LINKS.map((l) => <li key={l.href}><Link onClick={() => setOpen(false)} className="block py-2 text-[15px] text-muted hover:text-white" href={l.href}>{l.label}</Link></li>)}
          </ul>
        )}
      </header>
    </>
  );
}
