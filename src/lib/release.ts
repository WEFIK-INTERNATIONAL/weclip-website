// The latest WeClip release from GitHub: which file is the Windows installer and which are the Mac disk images.
// Used at build time (the page ships with the version it was built with) and again in the visitor's browser, so a
// new release appears without rebuilding the site.
import { SITE } from "./site";

export type Target = "windows" | "mac-arm64" | "mac-x64";

export interface Asset { name: string; url: string; size: number }
export interface Release {
  version: string; // "0.2.0"
  publishedAt: string;
  notes: string;
  page: string;
  assets: Partial<Record<Target, Asset>>;
}

interface GhAsset { name: string; browser_download_url: string; size: number }
interface GhRelease { tag_name: string; published_at: string; body: string | null; html_url: string; draft: boolean; prerelease: boolean; assets: GhAsset[] }

/** Which installer a file is, from electron-builder's names: WeClip-Setup-0.2.0.exe, WeClip-0.2.0-arm64.dmg, WeClip-0.2.0-x64.dmg. */
export function targetOf(name: string): Target | null {
  const n = name.toLowerCase();
  if (n.endsWith(".exe") && !n.includes("uninstall")) return "windows";
  if (n.endsWith(".dmg") && n.includes("arm64")) return "mac-arm64";
  if (n.endsWith(".dmg") && (n.includes("x64") || n.includes("intel"))) return "mac-x64";
  return null;
}

export function toRelease(r: GhRelease): Release {
  const assets: Release["assets"] = {};
  for (const a of r.assets) {
    const t = targetOf(a.name);
    if (t && !assets[t]) assets[t] = { name: a.name, url: a.browser_download_url, size: a.size };
  }
  // Windows uses a small web installer that downloads the app package (.nsis.7z) itself: show the whole download.
  const pkg = r.assets.find((a) => a.name.toLowerCase().endsWith(".nsis.7z"));
  if (assets.windows && pkg) assets.windows = { ...assets.windows, size: assets.windows.size + pkg.size };
  return { version: r.tag_name.replace(/^v/, ""), publishedAt: r.published_at, notes: (r.body ?? "").trim(), page: r.html_url, assets };
}

const BUILD_STAMP = Date.now().toString(36);

/** Latest published release with at least one installer, or null (none yet, offline, or rate-limited). */
export async function fetchLatestRelease(signal?: AbortSignal, fresh = true): Promise<Release | null> {
  try {
    // At build time Next.js keeps fetch results between builds; the build stamp makes every build ask GitHub again.
    const stamp = fresh ? "" : `&build=${BUILD_STAMP}`;
    const res = await fetch(`https://api.github.com/repos/${SITE.releasesRepo}/releases?per_page=10${stamp}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal,
      // In the browser: always the newest. At build time (static export) the default cache keeps the page static.
      ...(fresh ? { cache: "no-store" as const } : {}),
    });
    if (!res.ok) return null;
    const list = (await res.json()) as GhRelease[];
    const r = list.find((x) => !x.draft && !x.prerelease && x.assets.some((a) => targetOf(a.name)));
    return r ? toRelease(r) : null;
  } catch {
    return null;
  }
}

export const formatSize = (bytes: number) => `${Math.round(bytes / 1e6)} MB`;
export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" });

export const TARGETS: Record<Target, { label: string; short: string; requirement: string }> = {
  windows: { label: "Windows", short: "Windows", requirement: "Windows 10 or 11, 64-bit" },
  "mac-arm64": { label: "macOS · Apple Silicon", short: "Mac (Apple Silicon)", requirement: "M1, M2, M3, M4 and newer · macOS 11+" },
  "mac-x64": { label: "macOS · Intel", short: "Mac (Intel)", requirement: "Intel Macs · macOS 11+" },
};
