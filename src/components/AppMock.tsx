// A drawn (HTML/CSS) picture of WeClip at work: a 16:9 stream on the left becomes a 9:16 short with captions on the
// right, with AI-found moments below. Decorative; the real app looks the same in spirit.
const MOMENTS = [
  { t: "12:41", title: "The final round comeback", score: "9.4", tag: "chat spike ×3" },
  { t: "27:03", title: "Nobody saw that coming", score: "8.8", tag: "loud reaction" },
  { t: "41:56", title: "Funniest fail of the stream", score: "8.1", tag: "laughter" },
];

export function AppMock() {
  return (
    <div className="relative mx-auto w-full max-w-6xl" aria-hidden="true">
      <div className="glow pointer-events-none absolute -inset-x-20 -bottom-24 top-1/3 -z-10 blur-2xl" />
      <div className="overflow-hidden rounded-xl border border-line-strong bg-[#101010] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 text-[12px] text-dim">
          <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" /></span>
          <span className="text-white/80">WeClip</span><span>/</span><span>Saturday stream</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-sm bg-[#3a1820] px-1.5 py-0.5 text-[11px] font-semibold text-[#ff6b7f]"><i className="live-dot h-1.5 w-1.5 rounded-full bg-[#ff6b7f]" />LIVE · 1:42:10</span>
        </div>
        <div className="grid gap-px bg-line md:grid-cols-[1.6fr_1fr]">
          {/* source */}
          <div className="bg-[#101010] p-4">
            <p className="mb-2 text-[11px] uppercase tracking-wider text-dim">Source · 1920×1080</p>
            <div className="relative aspect-video overflow-hidden rounded-md bg-gradient-to-br from-[#1d3557] via-[#2a1f4d] to-[#0f2a22]">
              <div className="absolute inset-0 opacity-50 [background:radial-gradient(40%_50%_at_30%_60%,#2f8f6a_0%,transparent_70%),radial-gradient(30%_40%_at_70%_30%,#7b4dff_0%,transparent_70%)]" />
              <div className="absolute left-[30%] top-[8%] h-[84%] w-[34%] rounded-sm border-2 border-[#45c98f]"><span className="absolute -top-2.5 left-1 rounded-sm bg-[#45c98f] px-1 text-[9px] font-bold text-black">GAMEPLAY</span></div>
              <div className="absolute bottom-[8%] right-[4%] h-[30%] w-[20%] rounded-sm border-2 border-accent-soft bg-black/30"><span className="absolute -top-2.5 left-1 rounded-sm bg-accent-soft px-1 text-[9px] font-bold text-black">FACECAM</span></div>
            </div>
            <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1.5 text-[11px] text-dim">
              <span>Video</span><div className="h-4 rounded-sm bg-gradient-to-r from-[#2b2b2b] via-[#3a3a3a] to-[#2b2b2b]" />
              <span>Captions</span><div className="flex gap-0.5">{Array.from({ length: 22 }, (_, i) => <i key={i} className="h-3 flex-1 rounded-[2px] bg-[#2b2b2b]" />)}</div>
              <span>Chat</span>
              <div className="flex h-5 items-end gap-0.5">{[2, 2, 3, 2, 2, 3, 2, 9, 14, 6, 2, 2, 3, 2, 2, 11, 5, 2, 2, 2, 3, 2].map((h, i) => <i key={i} className={`flex-1 rounded-[1px] ${h > 8 ? "bg-accent-soft" : "bg-[#333]"}`} style={{ height: `${h * 7}%` }} />)}</div>
            </div>
          </div>
          {/* short */}
          <div className="flex items-center justify-center gap-5 bg-[#101010] p-4">
            <div className="relative aspect-[9/16] w-[46%] max-w-[190px] overflow-hidden rounded-[14px] border border-line-strong bg-black">
              <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-br from-[#2a1f4d] via-[#1d3557] to-[#0f2a22]"><div className="absolute inset-0 opacity-60 [background:radial-gradient(50%_60%_at_40%_60%,#2f8f6a_0%,transparent_70%)]" /></div>
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-[#3b2a66] to-[#1b1430]">
                <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a68a]/80" />
              </div>
              <p className="absolute inset-x-0 top-[50%] -translate-y-1/2 text-center text-[13px] font-black uppercase leading-tight tracking-tight [text-shadow:0_2px_0_#000,0_0_6px_#000]">
                no way <span className="caption-pop text-[#ffe14d]">that</span><br />worked
              </p>
            </div>
            <div className="hidden w-[44%] space-y-2 lg:block">
              {MOMENTS.map((m, i) => (
                <div key={m.t} className={`rounded-md border p-2.5 ${i === 0 ? "border-accent/60 bg-[#17132a]" : "border-line bg-surface"}`}>
                  <div className="flex items-center justify-between text-[10px] text-dim"><span className="font-mono">{m.t}</span><span className="text-[#ffe14d]">★ {m.score}</span></div>
                  <p className="mt-1 text-[12px] leading-snug text-white">{m.title}</p>
                  <p className="mt-1 text-[10px] text-accent-soft">{m.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
