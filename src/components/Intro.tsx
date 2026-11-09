"use client";
import { useEffect, useState } from "react";

export default function Intro() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => { const iv = setInterval(() => setN((v) => Math.min(100, v + 4)), 40); return () => clearInterval(iv); }, []);
  useEffect(() => { if (n >= 100) { const t = setTimeout(() => setDone(true), 250); return () => clearTimeout(t); } }, [n]);
  return (
    <div className={`fixed inset-0 z-[100] flex items-end justify-between bg-g p-7 text-[#111611] transition-transform duration-1000 ease-[cubic-bezier(.7,0,.2,1)] ${done ? "pointer-events-none -translate-y-full" : ""}`} aria-hidden={done}>
      <span className="font-display text-[clamp(2rem,6vw,4rem)] font-light">Crumb &amp; Cream</span>
      <span className="font-display text-[clamp(4rem,14vw,10rem)] font-light leading-[.8]">{n}%</span>
    </div>
  );
}
