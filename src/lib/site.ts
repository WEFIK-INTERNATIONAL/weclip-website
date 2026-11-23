// Site-wide settings. The releases repository is public and holds only the installers (the app's code stays private);
// the app's own updater reads the same releases.
export const SITE = {
  name: "WeClip",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://weclip.wefik.in",
  description:
    "WeClip turns long videos, streams and live broadcasts into vertical Shorts, Reels and TikToks with AI clipping, captions and one-click export. Free for Windows and macOS.",
  releasesRepo: process.env.NEXT_PUBLIC_RELEASES_REPO ?? "Sandip123samanta/weclip-releases",
} as const;

export const releasesPage = `https://github.com/${SITE.releasesRepo}/releases`;
