import Link from "next/link";
import { releasesPage } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const cols = [
    { title: "Product", links: [["Features", "/#features"], ["Live Clipping", "/#live"], ["How it works", "/#how"], ["Privacy", "/#private"]] },
    { title: "Download", links: [["Windows", "/download/#windows"], ["Mac (Apple Silicon)", "/download/#mac-arm64"], ["Mac (Intel)", "/download/#mac-x64"], ["All releases", releasesPage]] },
    { title: "Help", links: [["Install guide", "/download/#install"], ["FAQ", "/#faq"], ["System requirements", "/download/#requirements"]] },
  ] as const;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-[14px] leading-relaxed text-dim">Turn long videos and live streams into vertical shorts, on your own computer.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="mb-3 text-[13px] font-medium text-white">{c.title}</h2>
            <ul className="space-y-2 text-[14px] text-dim">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("http")
                    ? <a className="hover:text-white" href={href} target="_blank" rel="noreferrer">{label}</a>
                    : <Link className="hover:text-white" href={href}>{label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-[13px] text-dim sm:px-6">© {new Date().getFullYear()} WeClip. Free to download. Only use footage you own or have permission to edit.</p>
      </div>
    </footer>
  );
}
