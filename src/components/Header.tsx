"use client";
import { useEffect, useState } from "react";
import { useEventOrder } from "@/context/EventOrder";

export default function Header() {
  const { summary, setDrawerOpen } = useEventOrder();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => setProgress(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-[66px] max-w-[1160px] items-center gap-6 px-6">
        <a href="#top" className="font-display text-2xl font-light">Crumb &amp; Cream</a>
        <nav className="ml-auto hidden gap-6 text-mut md:flex">
          <a className="hover:text-ink" href="#shop">Menu</a>
          <a className="hover:text-ink" href="#how">How it works</a>
        </nav>
        <button className="pill ml-auto md:ml-0" onClick={() => setDrawerOpen(true)}>
          Event order <span className="rounded-full bg-g px-2 text-sm text-[#111611]">{summary.pieces}</span>
        </button>
      </div>
      <div className="absolute -bottom-px left-0 h-0.5 bg-ink" style={{ width: `${progress * 100}%` }} />
    </header>
  );
}
