import type { Target } from "@/lib/release";

/** Small operating-system marks for the download buttons (currentColor). */
export function OsIcon({ target, size = 16 }: { target: Target; size?: number }) {
  if (target === "windows") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
        <path d="M0 2.2 6.5 1.3v6.3H0zM7.3 1.2 16 0v7.6H7.3zM0 8.4h6.5v6.3L0 13.8zM7.3 8.4H16V16l-8.7-1.2z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M11.2 8.5c0-1.6 1.3-2.4 1.4-2.5-.8-1.1-2-1.3-2.4-1.3-1-.1-2 .6-2.5.6s-1.3-.6-2.2-.6C4.4 4.7 3.3 5.4 2.7 6.5c-1.2 2.1-.3 5.3.9 7 .6.8 1.2 1.8 2.1 1.7.9 0 1.2-.5 2.2-.5s1.3.5 2.2.5c.9 0 1.5-.9 2.1-1.7.6-.9.9-1.8.9-1.9 0 0-1.9-.7-1.9-3.1zM9.6 3.6c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1z" />
    </svg>
  );
}
