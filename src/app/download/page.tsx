import type { Metadata } from "next";
import { DownloadCards } from "@/components/DownloadCards";
import { fetchLatestRelease } from "@/lib/release";

export const metadata: Metadata = {
  title: "Download",
  description: "Download WeClip for Windows, Mac with Apple Silicon or Intel Mac. Free, no account needed.",
};

const WINDOWS = [
  "Open WeClip-Setup.exe from your Downloads folder.",
  "If you see “Windows protected your PC”, click More info, then Run anyway. This shows up for new apps that are not code-signed yet.",
  "Choose where to install it and click Install. The installer is small, so it opens in a few seconds; it then downloads WeClip (about 150 MB), installs it and opens it. Stay online until it finishes.",
];

const MAC = [
  "Open the .dmg file and drag WeClip into the Applications folder.",
  "Open Applications, right-click (or Control-click) WeClip and choose Open, then click Open again.",
  "If macOS says WeClip is damaged or cannot be opened, go to System Settings > Privacy & Security and click Open Anyway.",
];

const FIRST_START = [
  { title: "Tools download once", body: "On first start WeClip fetches FFmpeg and its other tools (about 150 MB). After that it works offline." },
  { title: "Pick your AI", body: "Use the free local AI (Whisper and Ollama), or paste a key for a cloud service. You can change it any time in Settings." },
  { title: "Take the tour", body: "A short guided tour shows where everything is. You can replay it from the help menu." },
];

export default async function DownloadPage() {
  const initial = await fetchLatestRelease(undefined, false);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 md:pt-24">
          <h1 className="display rise max-w-3xl text-[44px] sm:text-[64px]">Download WeClip</h1>
          <p className="rise mt-5 max-w-xl text-[18px] text-muted [animation-delay:80ms]">Free for Windows and macOS. We have marked the right file for this computer.</p>
          <div className="rise mt-12 [animation-delay:160ms]"><DownloadCards initial={initial} /></div>
        </div>
      </section>

      <section id="install" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="display text-[36px] sm:text-[48px]">Install guide</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {[{ title: "Windows", steps: WINDOWS }, { title: "macOS", steps: MAC }].map((g) => (
              <div key={g.title} className="bg-bg p-6">
                <h3 className="text-[18px] font-medium">{g.title}</h3>
                <ol className="mt-5 space-y-4">
                  {g.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-accent text-[12px] font-semibold text-white">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {g.title === "macOS" && (
                  <div className="mt-6 rounded-md border border-line bg-surface p-4 text-[14px] text-muted">
                    <p>Still blocked? Open Terminal and run:</p>
                    <pre className="mt-2 overflow-x-auto rounded bg-black px-3 py-2 font-mono text-[13px] text-white">xattr -cr /Applications/WeClip.app</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="requirements" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-[36px] sm:text-[48px]">Requirements</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
              {[
                ["Windows", "Windows 10 or 11, 64-bit"],
                ["macOS", "macOS 11 Big Sur or newer, Apple Silicon or Intel"],
                ["Memory", "8 GB RAM, 16 GB for local AI"],
                ["Disk", "2 GB for the app and tools, plus room for your videos"],
                ["Graphics (optional)", "NVIDIA, AMD, Intel or Apple GPU for faster exports"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[150px_1fr] gap-4 py-3.5"><dt className="text-dim">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="display text-[36px] sm:text-[48px]">First start</h2>
            <div className="mt-8 space-y-px overflow-hidden rounded-xl border border-line bg-line">
              {FIRST_START.map((f) => (
                <div key={f.title} className="bg-bg p-5">
                  <h3 className="text-[16px] font-medium">{f.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
