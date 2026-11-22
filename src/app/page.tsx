import Link from "next/link";
import { ArrowRight, AudioLines, Captions, Cpu, Download, LayoutTemplate, Layers, Lock, Radio, ScanFace, Scissors, Sparkles, Wand2 } from "lucide-react";
import { AppMock } from "@/components/AppMock";
import { DownloadButton } from "@/components/DownloadButton";
import { fetchLatestRelease } from "@/lib/release";

const STEPS = [
  { n: 1, title: "Bring a video", body: "Drop in a file, paste a YouTube, Twitch or Kick link, or point WeClip at a stream that is live right now.", lines: ["Saturday stream.mp4", "youtube.com/watch?v=…", "twitch.tv/yourchannel"] },
  { n: 2, title: "Let the AI find moments", body: "WeClip listens to every word, watches where the chat goes wild, and picks the moments worth a short.", lines: ["★ 9.4  The final round comeback", "★ 8.8  Nobody saw that coming", "★ 8.1  Funniest fail of the stream"] },
  { n: 3, title: "Export for every app", body: "Captions, layout and titles are done. Export one or fifty at once for TikTok, Shorts and Reels.", lines: ["✓ comeback.mp4      1080×1920", "✓ no-way.mp4        1080×1920", "✓ fail.mp4          1080×1920"] },
];

const FEATURES = [
  { icon: Sparkles, title: "AI Clips", body: "Finds the best moments in hours of footage, scores them and opens each one ready to edit." },
  { icon: Radio, title: "Live Clipping", body: "Records a live stream in full quality and clips highlights while it is still going." },
  { icon: Captions, title: "16 caption styles", body: "Word-by-word captions with karaoke, pop, glow and more. Find & replace, emojis and bleeps built in." },
  { icon: Layers, title: "15 layouts", body: "Split screen, facecam bubble, blur fit, post card, three-stack and more, per segment." },
  { icon: Wand2, title: "Tighten", body: "Removes pauses and “um, uh” in one click, with every cut listed before it happens." },
  { icon: LayoutTemplate, title: "Templates", body: "Save your look once; every new short, AI clip and live clip starts with it." },
  { icon: Download, title: "Batch export", body: "Queue fifty shorts and keep editing. Hardware encoding on NVIDIA, AMD, Intel and Apple." },
  { icon: ScanFace, title: "Finds your facecam", body: "Spots the webcam in your stream and frames it for you." },
  { icon: AudioLines, title: "Upload kit", body: "Titles, descriptions, hashtags and a thumbnail for each platform, saved next to the video." },
];

const FAQ = [
  { q: "Is WeClip free?", a: "Yes. Download it and use it; there is no account and no watermark." },
  { q: "Does my video get uploaded anywhere?", a: "No. WeClip edits and exports on your computer. Transcription and AI can run fully offline (Whisper and Ollama); you can also choose a cloud service with your own key." },
  { q: "Which file do I need?", a: "The download button picks the right one for your computer. On a Mac, choose Apple Silicon for M1, M2, M3 and M4 Macs, or Intel for older ones ( > About This Mac)." },
  { q: "Windows says “Windows protected your PC”. Is that safe?", a: "That appears for new apps that are not code-signed yet. Click More info, then Run anyway. You only see it once." },
  { q: "macOS says the app cannot be opened.", a: "Right-click WeClip in Applications and choose Open, or allow it in System Settings > Privacy & Security. The install guide shows every step." },
  { q: "What computer do I need?", a: "Windows 10/11 (64-bit) or macOS 11 and newer. Any recent computer works; a graphics card makes exports and local AI faster." },
  { q: "How do updates work?", a: "WeClip checks for new versions by itself. On Windows they download in the background and install when you restart." },
];

export default async function Home() {
  const initial = await fetchLatestRelease(undefined, false);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:pt-28">
          <h1 className="display rise max-w-4xl text-[44px] sm:text-[64px] md:text-[80px]">Your fastest path from long video to Shorts</h1>
          <p className="rise mt-6 max-w-2xl text-[18px] leading-relaxed text-muted [animation-delay:80ms]">
            WeClip finds the best moments in streams, podcasts and gameplay, frames them for vertical video, adds captions and exports them for TikTok, YouTube Shorts and Reels. On your own computer.
          </p>
          <div className="rise mt-9 [animation-delay:160ms]"><DownloadButton initial={initial} /></div>
          <div className="rise mt-16 [animation-delay:240ms]"><AppMock /></div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <h2 className="display text-[40px] sm:text-[56px]">Click, click, done.</h2>
          <p className="mt-4 max-w-xl text-[17px] text-muted">From a three-hour stream to a week of shorts in a coffee break.</p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col gap-4 bg-bg p-6">
                <span className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-accent text-[13px] font-semibold">{s.n}</span>
                <h3 className="display text-[26px]">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{s.body}</p>
                <div className="mt-auto rounded-md border border-line bg-surface p-3 font-mono text-[12px] leading-6 text-dim">
                  {s.lines.map((l) => <p key={l} className="truncate">{l}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <h2 className="display max-w-3xl text-[40px] sm:text-[56px]">Everything a short needs, in one app</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="group bg-bg p-6 transition-colors hover:bg-surface">
                <f.icon size={20} className="text-accent-soft" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Clipping */}
      <section id="live" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 text-[13px] font-medium text-accent-soft"><Radio size={14} />Live Clipping</p>
            <h2 className="display mt-4 text-[40px] sm:text-[52px]">Clip the stream while it is still live</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Paste a YouTube, Twitch or Kick link. WeClip records in the best quality the site offers, transcribes as it goes, watches the chat for spikes and turns the best moments into editable shorts, every couple of minutes. Not live yet? It waits and starts by itself.
            </p>
            <Link href="/download/" className="mt-8 inline-flex items-center gap-1.5 text-[15px] text-accent-soft hover:text-accent-faint">Get WeClip<ArrowRight size={15} /></Link>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 font-mono text-[12.5px] leading-7" aria-hidden="true">
            <div className="mb-3 flex items-center gap-2 text-[12px]"><span className="live-dot h-2 w-2 rounded-full bg-[#ff6b7f]" /><span className="text-white">LIVE</span><span className="text-dim">· 1920×1080 · 60 fps · not re-encoded</span></div>
            <p className="text-dim">01:02:10  AI is looking at 0:58–1:02</p>
            <p className="text-dim">01:02:31  <span className="text-accent-soft">★ chat spike: 64 messages in 10 s (5.1× normal)</span></p>
            <p className="text-white">01:02:44  New clip: “The clutch nobody expected” (9.1)</p>
            <p className="text-dim">01:04:12  AI is looking at 1:00–1:04</p>
            <p className="text-white">01:04:39  New clip: “Chat could not believe it” (8.6)</p>
            <div className="mt-4 flex h-12 items-end gap-1">{[3, 3, 4, 3, 3, 5, 3, 12, 18, 7, 3, 3, 4, 3, 14, 6, 3, 3, 4, 3, 3, 3, 5, 3].map((h, i) => <i key={i} className={`flex-1 rounded-[2px] ${h > 10 ? "bg-accent-soft" : "bg-[#2e2e2e]"}`} style={{ height: `${h * 5}%` }} />)}</div>
          </div>
        </div>
      </section>

      {/* Private */}
      <section id="private" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <h2 className="display max-w-3xl text-[40px] sm:text-[56px]">Runs on your computer. Stays on your computer.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {[
              { icon: Lock, title: "No account, no upload", body: "Your footage never leaves your machine unless you pick a cloud service yourself." },
              { icon: Cpu, title: "Local AI", body: "Whisper transcribes and Ollama picks moments offline. Prefer the cloud? Bring your own key." },
              { icon: Scissors, title: "Uses your graphics card", body: "Fast exports with NVIDIA, AMD, Intel and Apple hardware encoders, and a software fallback that works everywhere." },
            ].map((c) => (
              <div key={c.title} className="bg-bg p-6">
                <c.icon size={20} className="text-accent-soft" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="display text-[40px] sm:text-[56px]">Questions</h2>
          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium">
                  {f.q}<span className="text-dim transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="glow pointer-events-none absolute inset-x-0 bottom-0 top-1/3 -z-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6">
          <h2 className="display max-w-3xl text-[44px] sm:text-[64px]">Start clipping today</h2>
          <p className="mt-5 max-w-xl text-[17px] text-muted">Free for Windows and macOS. Your first short takes a couple of minutes.</p>
          <div className="mt-9"><DownloadButton initial={initial} /></div>
        </div>
      </section>
    </>
  );
}
