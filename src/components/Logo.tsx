/** The WeClip mark (the app icon's bolt) and wordmark. */
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#ffffff" />
      <path d="M22 16h20l-6 14h8L26 50l4-14h-8z" fill="#0d0d0d" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">WeClip</span>
    </span>
  );
}
