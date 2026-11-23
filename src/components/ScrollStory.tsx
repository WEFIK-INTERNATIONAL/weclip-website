"use client";
// "How it works" as a scroll-driven drawing of what WeClip does: a 16:9 stream with its sound, the AI marking the
// best moment, the gameplay and facecam boxes lifting out of the wide frame into a 9:16 short, captions popping in
// word by word, and the export. The section is tall; the drawing stays pinned while the page scrolls through it.
// Everything is set on the SVG directly from the scroll position (no React re-render per frame).
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => { const m = matchMedia(REDUCED); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); };
/** The visitor asked their system for less motion: show the finished drawing and all steps, no pinned scroll. */
const useReducedMotion = () => useSyncExternalStore(subscribeReduced, () => matchMedia(REDUCED).matches, () => false);

const STEPS = [
  { at: 0, title: "Bring a video", body: "A file, a YouTube, Twitch or Kick link, or a stream that is live right now." },
  { at: 0.22, title: "The AI finds the moment", body: "It listens to every word and watches the chat. The best moments get a score." },
  { at: 0.45, title: "Framed for vertical", body: "Mark the gameplay and your facecam once. Every clip comes out 9:16, framed the same way." },
  { at: 0.75, title: "Captions, then export", body: "Word-by-word captions are already on. Export one short or fifty, on your graphics card." },
];

// Source frame (16:9) and phone (9:16) in SVG units.
const SRC = { x: 30, y: 30, w: 580, h: 326 };
const PHONE = { x: 228, y: 22, w: 184, h: 327 };
const SPLIT = 0.6; // gameplay takes the top 60 % of the phone
// The artwork is 160 x 90; the two crops below are where the boxes sit in it.
const ART = { w: 160, h: 90 };
const GAME = { x: 42, y: 0, w: 66, h: 90 };
const CAM = { x: 119, y: 55, w: 37, h: 32 };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const inSrc = (r: { x: number; y: number; w: number; h: number }) => {
  const s = SRC.w / ART.w;
  return { x: SRC.x + r.x * s, y: SRC.y + r.y * s, w: r.w * s, h: r.h * s };
};
const BARS = Array.from({ length: 58 }, (_, i) => {
  const base = 6 + ((i * 37) % 11) + ((i * 13) % 7);
  const spike = i >= 31 && i <= 38 ? 26 + ((i * 7) % 9) : 0;
  return base + spike;
});
const WORDS = ["NO", "WAY", "THAT", "WORKED"];

export function ScrollStory() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [step, setStep] = useState(0);
  const still = useReducedMotion();

  useEffect(() => {
    const reduced = still;
    const root = svg.current!;
    const $ = <T extends SVGElement>(id: string) => root.querySelector<T>(`[data-k="${id}"]`)!;
    const set = (el: SVGElement, attrs: Record<string, number | string>) => { for (const k in attrs) el.setAttribute(k, String(attrs[k])); };
    const box = (el: SVGElement, r: { x: number; y: number; w: number; h: number }) => set(el, { x: r.x, y: r.y, width: Math.max(0, r.w), height: Math.max(0, r.h) });
    const lerpBox = (a: typeof SRC, b: typeof SRC, t: number) => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), w: mix(a.w, b.w, t), h: mix(a.h, b.h, t) });

    const gameFrom = inSrc(GAME), camFrom = inSrc(CAM);
    const gameTo = { x: PHONE.x, y: PHONE.y, w: PHONE.w, h: PHONE.h * SPLIT };
    const camTo = { x: PHONE.x, y: PHONE.y + PHONE.h * SPLIT, w: PHONE.w, h: PHONE.h * (1 - SPLIT) };
    let last = -1;
    let lastStep = -1;

    const draw = (p: number) => {
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      // 1. Sound and chat activity drawn in under the video.
      const wave = ease(seg(p, 0.02, 0.2));
      root.querySelectorAll<SVGRectElement>("[data-bar]").forEach((b, i) => {
        const h = BARS[i]! * clamp(wave * 1.6 - i / BARS.length * 0.6)
        set(b, { y: 418 - h, height: h })
      });
      // 2. The AI's moment: a window sweeps along and settles on the spike.
      const find = ease(seg(p, 0.24, 0.42));
      const mw = mix(30, 112, find), mx = mix(40, 352, find);
      set($("moment"), { x: mx, width: mw, opacity: seg(p, 0.22, 0.26) * (1 - seg(p, 0.55, 0.6)) });
      set($("score"), { opacity: seg(p, 0.38, 0.43) * (1 - seg(p, 0.55, 0.6)), transform: `translate(${mx + mw / 2} 384)` });
      root.querySelectorAll<SVGRectElement>("[data-bar]").forEach((b, i) => {
        const x = 40 + i * 10.2;
        b.setAttribute("fill", find > 0.95 && x >= mx && x <= mx + mw ? "var(--accent-soft)" : "#3a3a3a");
      });
      set($("timeline"), { opacity: 1 - seg(p, 0.55, 0.62) });
      // 3. Crop boxes appear on the wide frame, then the frame turns into a phone.
      const boxes = seg(p, 0.45, 0.52);
      const morph = ease(seg(p, 0.55, 0.76));
      set($("boxes"), { opacity: boxes * (1 - seg(p, 0.55, 0.6)) });
      set($("full"), { opacity: 1 - seg(p, 0.56, 0.66) });
      set($("srcframe"), { opacity: 1 - seg(p, 0.56, 0.66) });
      box($("game"), lerpBox(gameFrom, gameTo, morph));
      box($("cam"), lerpBox(camFrom, camTo, morph));
      set($("game"), { opacity: morph > 0 ? 1 : 0 });
      set($("cam"), { opacity: morph > 0 ? 1 : 0 });
      const phoneIn = seg(p, 0.66, 0.76);
      set($("phone"), { opacity: phoneIn, transform: `translate(${PHONE.x + PHONE.w / 2} ${PHONE.y + PHONE.h / 2}) scale(${mix(1.06, 1, phoneIn)}) translate(${-PHONE.x - PHONE.w / 2} ${-PHONE.y - PHONE.h / 2})` });
      set($("divider"), { opacity: phoneIn });
      // 4. Captions word by word, then the export.
      WORDS.forEach((_, i) => {
        const t = seg(p, 0.78 + i * 0.03, 0.8 + i * 0.03);
        const active = p >= 0.78 + i * 0.03 && p < 0.81 + (i + 1) * 0.03;
        const w = $(`w${i}`);
        set(w, { opacity: t, fill: active || (i === WORDS.length - 1 && p > 0.9) ? "#ffe14d" : "#ffffff" });
        w.style.transform = `scale(${active ? 1.12 : 1})`;
      });
      const done = ease(seg(p, 0.92, 0.98));
      set($("export"), { opacity: done, transform: `translate(0 ${mix(14, 0, done)})` });
      const s = STEPS.reduce((acc, st, i) => (p >= st.at ? i : acc), 0);
      if (s !== lastStep) { lastStep = s; setStep(s); }
    };

    if (reduced) { draw(1); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      draw(clamp(-r.top / Math.max(1, r.height - innerHeight)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [still]);

  return (
    <section id="how" className="scroll-mt-16 border-t border-line">
      <div ref={wrap} className={still ? "" : "relative h-[340vh]"}>
        <div className={still ? "py-24" : "sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden"}>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.4fr] lg:gap-14">
            <div>
              <h2 className="display text-[36px] sm:text-[52px]">Click, click, done.</h2>
              <ol className="mt-6 space-y-1 lg:mt-10">
                {STEPS.map((s, i) => (
                  <li key={s.title} className={`rounded-lg border px-4 py-3 transition-all duration-500 ${i === step ? "border-line-strong bg-surface" : "border-transparent"} ${!still && i !== step ? "max-lg:hidden" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] text-[12px] font-semibold transition-colors duration-500 ${i <= step ? "bg-accent text-white" : "bg-raised text-dim"}`}>{i + 1}</span>
                      <span className={`text-[17px] font-medium transition-colors duration-500 ${i === step ? "text-fg" : "text-dim"}`}>{s.title}</span>
                    </div>
                    <p className={`overflow-hidden pl-9 text-[14px] leading-relaxed text-muted transition-all duration-500 ${i === step || still ? "mt-1.5 max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <svg ref={svg} viewBox="0 0 640 440" className="h-auto max-h-[62svh] w-full" role="img" aria-label="A wide 16:9 video with gameplay and a facecam is turned into a vertical 9:16 short with captions.">
              <defs>
                <symbol id="art" viewBox="0 0 160 90">
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d1450" /><stop offset="0.6" stopColor="#5b2a86" /><stop offset="1" stopColor="#e0607e" /></linearGradient>
                    <linearGradient id="cam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a2350" /><stop offset="1" stopColor="#120f24" /></linearGradient>
                  </defs>
                  <rect width="160" height="90" fill="url(#sky)" />
                  <circle cx="104" cy="22" r="8" fill="#ffd27a" opacity="0.9" />
                  <path d="M0 62 L22 44 L38 56 L58 36 L80 58 L100 42 L122 60 L142 46 L160 58 V90 H0Z" fill="#2b1846" />
                  <path d="M0 72 L30 60 L54 70 L82 58 L112 72 L140 62 L160 70 V90 H0Z" fill="#160d26" />
                  <rect x="70" y="60" width="9" height="13" rx="1.5" fill="#45c98f" />
                  <circle cx="74.5" cy="57" r="3.2" fill="#45c98f" />
                  <rect x="4" y="4" width="34" height="5" rx="1" fill="#000" opacity="0.45" />
                  <rect x="5" y="5" width="22" height="3" rx="0.6" fill="#ff6b7f" />
                  <rect x="119" y="55" width="37" height="32" rx="2" fill="url(#cam)" stroke="#968dfa" strokeWidth="0.6" />
                  <circle cx="137.5" cy="67" r="6" fill="#d9a888" />
                  <path d="M126 87 C127 77 148 77 149 87Z" fill="#6c35f5" />
                  <path d="M131.5 64 C132 58 143 58 143.5 64 C141 61 134 61 131.5 64Z" fill="#2a1a12" />
                </symbol>
              </defs>
              {/* The wide source frame with the whole picture. */}
              <g data-k="full">
                <svg x={SRC.x} y={SRC.y} width={SRC.w} height={SRC.h} viewBox="0 0 160 90"><use href="#art" width={ART.w} height={ART.h} /></svg>
              </g>
              <rect data-k="srcframe" x={SRC.x} y={SRC.y} width={SRC.w} height={SRC.h} rx="8" fill="none" stroke="#3a3a3a" />
              {/* The two crops, moving from their boxes on the wide frame into the phone. */}
              <svg data-k="game" opacity="0" viewBox={`${GAME.x} ${GAME.y} ${GAME.w} ${GAME.h}`} preserveAspectRatio="xMidYMid slice"><use href="#art" width={ART.w} height={ART.h} /></svg>
              <svg data-k="cam" opacity="0" viewBox={`${CAM.x} ${CAM.y} ${CAM.w} ${CAM.h}`} preserveAspectRatio="xMidYMid slice"><use href="#art" width={ART.w} height={ART.h} /></svg>
              <g data-k="boxes" opacity="0">
                {(() => { const g = inSrc(GAME), c = inSrc(CAM); return (
                  <>
                    <rect x={g.x} y={g.y} width={g.w} height={g.h} fill="none" stroke="#45c98f" strokeWidth="2.5" strokeDasharray="8 5" rx="3" />
                    <rect x={g.x + 6} y={g.y - 12} width="78" height="18" rx="3" fill="#45c98f" /><text x={g.x + 13} y={g.y + 1.5} fontSize="11" fontWeight="700" fill="#000">GAMEPLAY</text>
                    <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="none" stroke="#968dfa" strokeWidth="2.5" strokeDasharray="8 5" rx="3" />
                    <rect x={c.x + 4} y={c.y - 12} width="72" height="18" rx="3" fill="#968dfa" /><text x={c.x + 11} y={c.y + 1.5} fontSize="11" fontWeight="700" fill="#000">FACECAM</text>
                  </>
                ) })()}
              </g>
              {/* Timeline: sound, chat spike and the AI's moment. */}
              <g data-k="timeline">
                <text x="40" y="378" fontSize="11" fill="#8a8a8a" fontFamily="var(--font-mono)">AUDIO + CHAT</text>
                {BARS.map((_, i) => <rect key={i} data-bar="" x={40 + i * 10.2} y="418" width="6" height="0" rx="1.5" fill="#3a3a3a" />)}
                <rect data-k="moment" y="366" height="58" rx="6" fill="rgba(108,53,245,0.18)" stroke="#6c35f5" strokeWidth="1.5" opacity="0" />
                <g data-k="score" opacity="0">
                  <rect x="-34" y="-11" width="68" height="20" rx="10" fill="#6c35f5" />
                  <text x="0" y="3" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">★ 9.4</text>
                </g>
              </g>
              {/* The phone the short ends up in. */}
              <line data-k="divider" opacity="0" x1={PHONE.x} x2={PHONE.x + PHONE.w} y1={PHONE.y + PHONE.h * SPLIT} y2={PHONE.y + PHONE.h * SPLIT} stroke="#000" strokeWidth="2" />
              <g data-k="phone" opacity="0">
                <rect x={PHONE.x - 6} y={PHONE.y - 6} width={PHONE.w + 12} height={PHONE.h + 12} rx="26" fill="none" stroke="#3a3a3a" strokeWidth="2" />
                <rect x={PHONE.x + PHONE.w / 2 - 22} y={PHONE.y + 6} width="44" height="7" rx="3.5" fill="#0d0d0d" />
              </g>
              <g fontSize="22" fontWeight="900" fontFamily="var(--font-display)" textAnchor="middle" stroke="#000" strokeWidth="5" paintOrder="stroke" style={{ letterSpacing: "-0.02em" }}>
                {WORDS.map((w, i) => {
                  const line = i < 3 ? 0 : 1;
                  const xs = [256, 307, 369, 320];
                  return <text key={w} data-k={`w${i}`} x={xs[i]} y={PHONE.y + PHONE.h * SPLIT + 4 + line * 26} opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", transition: "transform 160ms ease" }}>{w}</text>;
                })}
              </g>
              <g data-k="export" opacity="0">
                <rect x={PHONE.x + 12} y={PHONE.y + PHONE.h + 18} width={PHONE.w - 24} height="30" rx="15" fill="#141414" stroke="#45c98f" />
                <text x={PHONE.x + PHONE.w / 2} y={PHONE.y + PHONE.h + 37} textAnchor="middle" fontSize="12" fill="#45c98f" fontWeight="600">✓ Exported 1080×1920</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
