"use client";
// The release and the visitor's platform in the browser. Starts from the release the page was built with, then asks
// GitHub for the newest one (so a new version appears without rebuilding the site).
import { useEffect, useState } from "react";
import { detectPlatform, type Detected } from "./platform";
import { fetchLatestRelease, type Release } from "./release";

export function useRelease(initial: Release | null): { release: Release | null; loading: boolean } {
  const [release, setRelease] = useState(initial);
  const [loading, setLoading] = useState(!initial);
  useEffect(() => {
    const ac = new AbortController();
    void fetchLatestRelease(ac.signal, true).then((r) => { if (r) setRelease(r); setLoading(false); });
    return () => ac.abort();
  }, []);
  return { release, loading };
}

export function usePlatform(): Detected | null {
  const [p, setP] = useState<Detected | null>(null);
  useEffect(() => { void detectPlatform().then(setP); }, []);
  return p;
}
