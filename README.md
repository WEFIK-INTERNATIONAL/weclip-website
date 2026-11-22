# WeClip website

The download site for WeClip. Next.js (static export), Tailwind CSS, pnpm. Hosted on Render as a static site.

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
| `NEXT_PUBLIC_SITE_URL` | `https://weclip.onrender.com` | The site's own address (for link previews) |

Installer names the site recognises (electron-builder defaults): `WeClip-Setup-<v>.exe`, `WeClip-<v>-arm64.dmg`, `WeClip-<v>-x64.dmg`.

## Deploy on Render

1. Push this folder to a GitHub repository.
2. In Render: **New > Blueprint**, choose the repository. `render.yaml` creates a free static site (build `pnpm build`, publish `out`).
3. Every push to `main` redeploys.
