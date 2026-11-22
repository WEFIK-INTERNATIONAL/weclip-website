"use client";
// The hero's main button: the right installer for this computer (Windows / Apple Silicon / Intel Mac), with the
// other choices right underneath. On phones it explains WeClip is a desktop app.
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { TARGETS, formatSize, type Release, type Target } from "@/lib/release";
import { usePlatform, useRelease } from "@/lib/useRelease";
import { OsIcon } from "./OsIcon";

export function DownloadButton({ initial }: { initial: Release | null }) {
  const { release, loading } = useRelease(initial);
  const p = usePlatform();
  const target: Target | null = p?.target ?? null;
  const asset = target && release?.assets[target];

  const primary = (() => {
    if (!p) return <span className="inline-flex h-12 w-64 animate-pulse rounded-md bg-white/10" aria-hidden="true" />;
    if (p.os === "other") {
      return (
        <Link href="/download/" className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-5 text-[15px] font-medium text-black hover:bg-white/85">
          <Download size={17} />{p.mobile ? "Get WeClip for your computer" : "Download WeClip"}
        </Link>
      );
    }
    const label = `Download for ${TARGETS[target!].short}`;
    if (asset) {
      return (
        <a href={asset.url} className="inline-flex h-12 items-center gap-2.5 rounded-md bg-white px-5 text-[15px] font-medium text-black hover:bg-white/85">
          <OsIcon target={target!} />{label}<span className="text-[13px] font-normal text-black/55">{formatSize(asset.size)}</span>
        </a>
      );
    }
    return (
      <Link href="/download/" className="inline-flex h-12 items-center gap-2.5 rounded-md bg-white px-5 text-[15px] font-medium text-black hover:bg-white/85" aria-disabled={loading}>
        <OsIcon target={target!} />{loading ? "Finding the latest version…" : label}
      </Link>
    );
  })();

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {primary}
        <Link href="/download/" className="inline-flex h-12 items-center gap-1.5 rounded-md border border-line-strong px-5 text-[15px] text-white hover:bg-white/5">
          Other platforms<ArrowRight size={15} />
        </Link>
      </div>
      <p className="text-[13px] text-dim" aria-live="polite">
        {p?.os === "other" && p.mobile ? "WeClip is a desktop app for Windows and macOS. Open this page on your computer to install it."
          : release ? <>Free · Version {release.version} · Windows 10/11 · macOS 11+{p?.os === "mac" && !p.sure && <> · <Link className="underline decoration-dim underline-offset-2 hover:text-white" href="/download/#mac-x64">Intel Mac?</Link></>}</>
            : loading ? "Free · Windows 10/11 · macOS 11+" : "Free · Windows 10/11 · macOS 11+ · First public release coming soon"}
      </p>
    </div>
  );
}
