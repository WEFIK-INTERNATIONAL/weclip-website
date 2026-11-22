import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6">
      <p className="font-mono text-[13px] text-accent-soft">404</p>
      <h1 className="display mt-3 text-[44px] sm:text-[64px]">This page is not here</h1>
      <p className="mt-4 text-[17px] text-muted">It may have moved. The download is always one click away.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="inline-flex h-11 items-center rounded-md border border-line-strong px-5 text-[15px] hover:bg-white/5">Home</Link>
        <Link href="/download/" className="inline-flex h-11 items-center rounded-md bg-white px-5 text-[15px] font-medium text-black hover:bg-white/85">Download</Link>
      </div>
    </section>
  );
}
