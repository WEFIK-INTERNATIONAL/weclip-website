"use client";
// Every installer, with the visitor's own platform marked "Recommended for this computer".
import { Check, Download, ExternalLink } from "lucide-react";
import { TARGETS, formatDate, formatSize, type Release, type Target } from "@/lib/release";
import { releasesPage } from "@/lib/site";
import { usePlatform, useRelease } from "@/lib/useRelease";
import { OsIcon } from "./OsIcon";

const ORDER: Target[] = ["windows", "mac-arm64", "mac-x64"];

export function DownloadCards({ initial }: { initial: Release | null }) {
  const { release, loading } = useRelease(initial);
  const p = usePlatform();
  return (
    <div className="space-y-4">
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {ORDER.map((t) => {
          const a = release?.assets[t];
          const mine = p?.target === t;
          return (
            <section key={t} id={t} className={`relative flex scroll-mt-28 flex-col gap-5 p-6 ${mine ? "bg-[#17132a]" : "bg-surface"}`} aria-label={TARGETS[t].label}>
              {mine && <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-sm bg-accent/25 px-2 py-0.5 text-[12px] text-accent-faint"><Check size={12} />Recommended for this computer</span>}
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong bg-raised text-white"><OsIcon target={t} size={18} /></div>
              <div>
                <h3 className="text-[18px] font-medium">{TARGETS[t].label}</h3>
                <p className="mt-1 text-[14px] text-dim">{TARGETS[t].requirement}</p>
              </div>
              <div className="mt-auto space-y-2">
                {a ? (
                  <>
                    <a href={a.url} className={`flex h-11 items-center justify-center gap-2 rounded-md text-[15px] font-medium ${mine ? "bg-white text-black hover:bg-white/85" : "border border-line-strong text-white hover:bg-white/5"}`}>
                      <Download size={16} />Download
                    </a>
                    <p className="truncate text-center font-mono text-[12px] text-dim" title={a.name}>{a.name} · {formatSize(a.size)}</p>
                  </>
                ) : (
                  <p className="flex h-11 items-center justify-center rounded-md border border-dashed border-line-strong text-[14px] text-dim">{loading ? "Checking for the latest version…" : "Coming soon"}</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <p className="text-[13px] text-dim">
        {release ? <>Version <span className="text-white">{release.version}</span>, released {formatDate(release.publishedAt)}. </> : !loading ? <>The first public release is on its way. </> : null}
        <a className="inline-flex items-center gap-1 text-accent-soft hover:text-accent-faint" href={releasesPage} target="_blank" rel="noreferrer">All versions and release notes<ExternalLink size={12} /></a>
      </p>
    </div>
  );
}
