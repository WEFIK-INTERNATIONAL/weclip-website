import Link from "next/link";
import { ArrowRight, AudioLines, Captions, Cpu, Download, LayoutTemplate, Layers, Lock, Radio, ScanFace, Scissors, Sparkles, Wand2 } from "lucide-react";
import { AppScreenshot } from "@/components/AppScreenshot";
import { ScrollStory } from "@/components/ScrollStory";
import { ScrollTilt } from "@/components/motion/ScrollTilt";
import { SpotlightGroup } from "@/components/motion/SpotlightGroup";
import { DownloadButton } from "@/components/DownloadButton";
import { fetchLatestRelease } from "@/lib/release";
import { SITE } from "@/lib/site";

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
  // Structured data for search engines: the app (free, Windows / macOS, version, screenshot) and the FAQ.
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication", name: SITE.name, description: SITE.description, url: SITE.url,
      applicationCategory: "MultimediaApplication", applicationSubCategory: "Video editor", operatingSystem: "Windows 10, Windows 11, macOS 11 or newer",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, downloadUrl: `${SITE.url}/download/`, screenshot: `${SITE.url}/app-editor.webp`,
      ...(initial ? { softwareVersion: initial.version, datePublished: initial.publishedAt.slice(0, 10) } : {}),
      featureList: FEATURES.map((f) => f.title),
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:pt-28">
          <h1 className="display rise max-w-4xl text-[44px] sm:text-[64px] md:text-[80px]">Your fastest path from long video to Shorts</h1>
          <p className="rise mt-6 max-w-2xl text-[18px] leading-relaxed text-muted [animation-delay:80ms]">
            WeClip finds the best moments in streams, podcasts and gameplay, frames them for vertical video, adds captions and exports them for TikTok, YouTube Shorts and Reels. On your own computer.
          </p>
          <div className="rise mt-9 [animation-delay:160ms]"><DownloadButton initial={initial} /></div>
          <div className="rise mt-16 [animation-delay:240ms]"><ScrollTilt><AppScreenshot /></ScrollTilt></div>
        </div>
      </section>

      {/* How it works: scroll-driven drawing */}
      <ScrollStory />

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <h2 className="reveal display max-w-3xl text-[40px] sm:text-[56px]">Everything a short needs, in one app</h2>
          <SpotlightGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="reveal spot bg-bg p-6" style={{ "--i": i % 3 } as React.CSSProperties}>
                <f.icon size={20} className="spot-icon text-accent-soft" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* Live Clipping */}
      <section id="live" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div className="reveal">
            <p className="inline-flex items-center gap-2 text-[13px] font-medium text-accent-soft"><Radio size={14} />Live Clipping</p>
            <h2 className="display mt-4 text-[40px] sm:text-[52px]">Clip the stream while it is still live</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Paste a YouTube, Twitch or Kick link. WeClip records in the best quality the site offers, transcribes as it goes, watches the chat for spikes and turns the best moments into editable shorts, every couple of minutes. Not live yet? It waits and starts by itself.
            </p>
            <Link href="/download/" className="group mt-8 inline-flex items-center gap-1.5 text-[15px] text-accent-soft hover:text-accent-faint">Get WeClip<ArrowRight size={15} className="nudge" /></Link>
          </div>
          <div className="reveal rounded-xl border border-line bg-surface p-5 font-mono text-[12.5px] leading-7" style={{ "--i": 2 } as React.CSSProperties} aria-hidden="true">
            <div className="mb-3 flex items-center gap-2 text-[12px]"><span className="live-dot h-2 w-2 rounded-full bg-[#ff6b7f]" /><span className="text-white">LIVE</span><span className="text-dim">· 1920×1080 · 60 fps · not re-encoded</span></div>
            {[
              { t: "01:02:10", text: "AI is looking at 0:58–1:02", tone: "text-dim" },
              { t: "01:02:31", text: "★ chat spike: 64 messages in 10 s (5.1× normal)", tone: "text-accent-soft" },
              { t: "01:02:44", text: "New clip: “The clutch nobody expected” (9.1)", tone: "text-white" },
              { t: "01:04:12", text: "AI is looking at 1:00–1:04", tone: "text-dim" },
              { t: "01:04:39", text: "New clip: “Chat could not believe it” (8.6)", tone: "text-white" },
            ].map((l, i) => (
              <p key={l.t} className={`reveal ${l.tone}`} style={{ "--i": 4 + i * 3 } as React.CSSProperties}><span className="text-dim">{l.t}</span>  {l.text}</p>
            ))}
            <div className="bars mt-4 flex h-12 items-end gap-1">{[3, 3, 4, 3, 3, 5, 3, 12, 18, 7, 3, 3, 4, 3, 14, 6, 3, 3, 4, 3, 3, 3, 5, 3].map((h, i) => <i key={i} className={`flex-1 rounded-[2px] ${h > 10 ? "bg-accent-soft" : "bg-[#2e2e2e]"}`} style={{ height: `${h * 5}%`, "--i": i } as React.CSSProperties} />)}</div>
          </div>
        </div>
      </section>

      {/* Private */}
      <section id="private" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <h2 className="reveal display max-w-3xl text-[40px] sm:text-[56px]">Runs on your computer. Stays on your computer.</h2>
          <SpotlightGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {[
              { icon: Lock, title: "No account, no upload", body: "Your footage never leaves your machine unless you pick a cloud service yourself." },
              { icon: Cpu, title: "Local AI", body: "Whisper transcribes and Ollama picks moments offline. Prefer the cloud? Bring your own key." },
              { icon: Scissors, title: "Uses your graphics card", body: "Fast exports with NVIDIA, AMD, Intel and Apple hardware encoders, and a software fallback that works everywhere." },
            ].map((c, i) => (
              <div key={c.title} className="reveal spot bg-bg p-6" style={{ "--i": i } as React.CSSProperties}>
                <c.icon size={20} className="spot-icon text-accent-soft" aria-hidden="true" />
                <h3 className="mt-4 text-[17px] font-medium">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="reveal display text-[40px] sm:text-[56px]">Questions</h2>
          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((f, i) => (
              <details key={f.q} className="reveal group py-5" style={{ "--i": i } as React.CSSProperties}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium transition-colors hover:text-accent-faint">
                  {f.q}<span className="text-[20px] leading-none text-dim transition-transform duration-300 group-open:rotate-45 group-open:text-accent-soft" aria-hidden="true">+</span>
                </summary>
                <p className="faq-answer mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="glow pointer-events-none absolute inset-x-0 bottom-0 top-1/3 -z-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6">
          <h2 className="reveal display max-w-3xl text-[44px] sm:text-[64px]">Start clipping today</h2>
          <p className="reveal mt-5 max-w-xl text-[17px] text-muted" style={{ "--i": 1 } as React.CSSProperties}>Free for Windows and macOS. Your first short takes a couple of minutes.</p>
          <div className="reveal mt-9" style={{ "--i": 2 } as React.CSSProperties}><DownloadButton initial={initial} /></div>
        </div>
      </section>
    </>
  );
}
