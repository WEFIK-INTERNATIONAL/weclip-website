// Site-wide settings. The releases repository is public and holds only the installers (the app's code stays private);
// the app's own updater reads the same releases.
export const SITE = {
  name: "WeClip",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://weclip.wefik.in",
  // Search result title and description: what people search for ("AI clip maker", "Shorts", "Reels", "TikTok").
  title: "WeClip: Free AI Clip Maker for Shorts, Reels and TikTok",
  description:
    "Free desktop app that turns long videos and live streams into Shorts, Reels and TikToks with AI clipping, auto captions and fast GPU export. Windows and Mac.",
  releasesRepo: process.env.NEXT_PUBLIC_RELEASES_REPO ?? "Sandip123samanta/weclip-releases",
} as const;

export const releasesPage = `https://github.com/${SITE.releasesRepo}/releases`;
