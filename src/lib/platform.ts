// Which installer suits this visitor's computer. Windows is easy; for Macs, Chromium browsers say the processor
// directly, and other browsers give it away through the graphics renderer ("Apple M1…"). When that is unknown we
// assume Apple Silicon (every Mac sold since 2020) and show the Intel download right next to it.
import type { Target } from "./release";

export type Detected =
  | { os: "windows"; target: "windows"; sure: true }
  | { os: "mac"; target: Target; sure: boolean }
  | { os: "other"; target: null; sure: false; mobile: boolean };

type UAData = { platform?: string; mobile?: boolean; getHighEntropyValues?(hints: string[]): Promise<{ architecture?: string }> };

function webglSaysAppleSilicon(): boolean | null {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return null;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const r = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    if (/Apple M\d|Apple GPU/i.test(r)) return true;
    if (/Intel|AMD|Radeon|NVIDIA/i.test(r)) return false;
    return null;
  } catch {
    return null;
  }
}

export async function detectPlatform(): Promise<Detected> {
  const nav = navigator as Navigator & { userAgentData?: UAData };
  const ua = navigator.userAgent;
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || nav.userAgentData?.mobile === true || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));
  if (mobile) return { os: "other", target: null, sure: false, mobile: true };
  const plat = (nav.userAgentData?.platform ?? navigator.platform ?? "").toLowerCase();
  if (plat.includes("win") || /Windows NT/.test(ua)) return { os: "windows", target: "windows", sure: true };
  if (plat.includes("mac") || /Macintosh|Mac OS X/.test(ua)) {
    try {
      const v = await nav.userAgentData?.getHighEntropyValues?.(["architecture"]);
      if (v?.architecture === "arm") return { os: "mac", target: "mac-arm64", sure: true };
      if (v?.architecture === "x86") return { os: "mac", target: "mac-x64", sure: true };
    } catch { /* not available */ }
    const gpu = webglSaysAppleSilicon();
    if (gpu !== null) return { os: "mac", target: gpu ? "mac-arm64" : "mac-x64", sure: true };
    return { os: "mac", target: "mac-arm64", sure: false };
  }
  return { os: "other", target: null, sure: false, mobile: false };
}
