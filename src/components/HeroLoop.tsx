"use client";
import { useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import { useEventOrder } from "@/context/EventOrder";
import { inr } from "@/lib/format";
import ProductArt from "./ProductArt";

const N = products.length;
const GAP = 26;

/** Draggable, endlessly looping row of featured products that rides a lazy S-curve. */
export default function HeroLoop() {
  const { select } = useEventOrder();
  const root = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [cw, setCw] = useState(290);
  const [active, setActive] = useState(0);
  const copies = Math.max(1, Math.ceil(2600 / (N * (cw + GAP))));

  useEffect(() => { setCw(window.innerWidth < 700 ? 220 : 290); }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const step = cw + GAP, total = copies * N * step;
    const mod = (a: number, m: number) => ((a % m) + m) % m;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let off = 0, vel = 0, target = 0, drag = false, lastX = 0, moved = 0, idle = 0, last = -1, down = -1, raf = 0;
    const posOf = (i: number) => mod(i * step + off + total / 2, total) - total / 2;
    const open = (i: number) => { select(products[i % N].id); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); };

    const frame = () => {
      if (!drag) {
        if (Math.abs(vel) > 0.6) { off += vel; vel *= 0.94; target = Math.round(off / step) * step; }
        else { vel = 0; off += (target - off) * 0.07; }
      }
      let best = 1e9, act = 0;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const x = posOf(i), d = x / step, ad = Math.abs(d);
        c.style.transform = `translateX(${x}px) rotateY(${-d * 16}deg) rotate(${Math.cos(d * 0.85) * 10}deg) translateY(${Math.sin(d * 0.85) * 46}px) scale(${1 - Math.min(ad, 2.5) * 0.14})`;
        c.style.opacity = String(1 - Math.min(ad, 3) * 0.18);
        c.style.zIndex = String(100 - Math.round(ad * 10));
        c.dataset.act = ad < 0.5 ? "1" : "";
        if (ad < best) { best = ad; act = i % N; }
      });
      if (act !== last) { last = act; setActive(act); }
      raf = requestAnimationFrame(frame);
    };

    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button")) return;
      drag = true; moved = 0; lastX = e.clientX;
      const c = t.closest<HTMLElement>("[data-i]");
      down = c ? Number(c.dataset.i) : -1;
      el.classList.add("cursor-grabbing");
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      off += dx; vel = dx; moved += Math.abs(dx); idle = performance.now();
    };
    const onUp = () => {
      if (!drag) return;
      drag = false; el.classList.remove("cursor-grabbing"); idle = performance.now();
      target = Math.round(off / step) * step;
      if (moved < 6 && down >= 0) {
        const x = posOf(down);
        if (Math.abs(x) < step / 2) open(down); else target = off - x;
      }
      down = -1;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); off -= e.deltaX; vel = -e.deltaX * 0.5; idle = performance.now(); }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") target += step;
      if (e.key === "ArrowRight") target -= step;
      idle = performance.now();
    };
    const auto = setInterval(() => { if (!drag && !calm && !document.hidden && performance.now() - idle > 4500) target -= step; }, 5000);

    el.addEventListener("pointerdown", onDown); el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp); el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false }); el.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); clearInterval(auto);
      el.removeEventListener("pointerdown", onDown); el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp); el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel); el.removeEventListener("keydown", onKey);
    };
  }, [cw, copies, select]);

  const p = products[active];
  return (
    <section
      ref={root} tabIndex={0} aria-label="Featured products. Drag, or use the arrow keys, to explore."
      className="hero-loop relative mt-2.5 h-[min(70vh,590px)] cursor-grab select-none overflow-hidden"
      style={{ touchAction: "pan-y", perspective: 1400, WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}
    >
      <div className="absolute inset-0">
        {Array.from({ length: copies * N }, (_, i) => (
          <div key={i} data-i={i} className="lc" ref={(c) => { cards.current[i] = c; }} style={{ width: cw, marginLeft: -cw / 2 }}>
            <div className="im"><ProductArt art={products[i % N].art} /></div>
          </div>
        ))}
      </div>
      <p className="pointer-events-none absolute left-1/2 top-2.5 -translate-x-1/2 text-sm text-mut">Drag to explore</p>
      <div className="absolute inset-x-0 bottom-3 flex flex-wrap items-center justify-center gap-4">
        <span className="font-display text-3xl font-light">{p.name}</span>
        <span className="text-mut">{inr(p.price)} each</span>
        <button className="pill pill-dark" onClick={() => { select(p.id); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>View product</button>
      </div>
    </section>
  );
}
