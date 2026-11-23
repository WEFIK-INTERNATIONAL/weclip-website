// A real screenshot of the WeClip editor (built-in sample project, dark theme), framed like an app window.
export function AppScreenshot() {
  return (
    <figure className="relative mx-auto w-full max-w-6xl">
      <div className="glow pointer-events-none absolute -inset-x-20 -bottom-24 top-1/3 -z-10 blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-xl border border-line-strong bg-[#101010] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" /><i className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="ml-3 text-[12px] text-dim">WeClip</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: plain img with fixed size */}
        <img
          src="/app-editor.webp"
          width={1920}
          height={1172}
          alt="The WeClip editor: a 16:9 video with gameplay and facecam boxes on the left, the 9:16 short with captions in the middle, layout choices on the right and the timeline with video, caption and text tracks below."
          className="block h-auto w-full"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <figcaption className="mt-4 text-center text-[13px] text-dim">The real WeClip editor: frame your 16:9 video once, get a 9:16 short with captions.</figcaption>
    </figure>
  );
}
