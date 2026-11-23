# WeClip website

The download site for WeClip. Next.js (static export), Tailwind CSS, pnpm. Hosted on Vercel.

The download buttons read the latest release of `Sandip123samanta/weclip-releases` on GitHub, pick the installer for the
visitor's computer (Windows, Mac with Apple Silicon, Intel Mac), and refresh in the browser, so a new app release shows up
without redeploying the site.

## Develop

```
pnpm install
pnpm dev
```

`pnpm build` writes the static site to `out/`.

## Settings

| Variable | Default | What it is |
| --- | --- | --- |
| `NEXT_PUBLIC_RELEASES_REPO` | `Sandip123samanta/weclip-releases` | Public GitHub repo whose releases hold the installers |
| `NEXT_PUBLIC_SITE_URL` | `https://weclip.wefik.in` | The site's own address (for link previews) |

Installer names the site recognises (electron-builder defaults): `WeClip-Setup-<v>.exe`, `WeClip-<v>-arm64.dmg`, `WeClip-<v>-x64.dmg`.

## Deploy on Vercel

1. In Vercel: **Add New > Project**, import this GitHub repository. Vercel detects Next.js and pnpm by itself; no
   settings need changing.
2. Optional: under **Settings > Environment Variables** set `NEXT_PUBLIC_SITE_URL` to the site's final address.
3. Every push to `main` redeploys. New app versions do **not** need a redeploy: the page asks GitHub for the latest
   release when it opens.

Note: on Vercel's free Hobby plan, private repositories owned by a GitHub organization cannot be imported. Either make
this repository public (it holds no secrets), or use a Pro team.
