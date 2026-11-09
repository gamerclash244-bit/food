"use client";
import { useEffect, useRef, useState } from "react";
import { getProduct, products } from "@/data/products";
import { useEventOrder } from "@/context/EventOrder";
import { MIN_QTY } from "@/lib/rules";
import { inr } from "@/lib/format";
import ProductArt from "./ProductArt";
import Reveal from "./Reveal";

export default function ProductShowcase() {
  const { selectedId, select, addItem } = useEventOrder();
  const [shownId, setShownId] = useState(selectedId);
  const [leaving, setLeaving] = useState(false);
  const art = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId === shownId) return;
    setLeaving(true);
    const t = setTimeout(() => { setShownId(selectedId); setLeaving(false); }, 320);
    return () => clearTimeout(t);
  }, [selectedId, shownId]);

  const p = getProduct(shownId)!;
  const fade = `transition duration-300 ${leaving ? "translate-y-3.5 opacity-0" : ""}`;
  const rows: [string, string][] = [["Ingredients", p.ingredients], ["Useful tips", p.tip], ["Available as", p.size], ["Shelf life", p.shelfLife]];

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    if (art.current) art.current.style.translate = `${x * 22}px ${y * 22}px`;
  };

  return (
    <section id="shop" className="mx-auto max-w-[1160px] px-6 py-16">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-16">
        <div
          className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[30px] bg-g2 md:sticky md:top-[90px]"
          onPointerMove={tilt} onPointerLeave={() => { if (art.current) art.current.style.translate = "0 0"; }}
        >
          <div ref={art} className={`w-[64%] transition-all duration-500 ${leaving ? "-rotate-6 scale-90 opacity-0" : ""}`}>
            <ProductArt art={p.art} className="block w-full" />
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-sf px-3.5 py-1 text-sm">Minimum {MIN_QTY} per item</span>
        </div>
        <div>
          <p className="text-mut">Bakery and dairy · Made fresh for your date</p>
          <h2 className={`mb-3.5 mt-2.5 text-[clamp(2.2rem,5vw,3.6rem)] ${fade}`}>{p.name}</h2>
          <p className={`max-w-[44ch] text-mut ${fade}`}>{p.description}</p>
          <dl className={`my-6 ${fade}`}>
            {rows.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[110px_1fr] gap-3 border-t border-line py-3.5 md:grid-cols-[150px_1fr] ${i === rows.length - 1 ? "border-b" : ""}`}>
                <dt className="text-mut">{k}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-4xl font-light">{inr(p.price)} <small className="font-sans text-sm text-mut">per piece</small></span>
            <button className="pill pill-dark" onClick={() => addItem(p.id)}>Add {MIN_QTY} to event order</button>
          </div>
        </div>
      </div>

      <h3 className="mb-5 mt-24 text-2xl">The other products</h3>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
        {products.map((x, i) => (
          <Reveal key={x.id} delay={i * 0.06} className="shrink-0 snap-start">
            <button className="group w-[200px] text-left" onClick={() => select(x.id)} aria-pressed={x.id === selectedId}>
              <div className={`grid aspect-[4/5] place-items-center rounded-[22px] border transition duration-300 group-hover:-translate-y-1.5 ${x.id === selectedId ? "border-ink bg-g" : "border-transparent bg-g2"}`}>
                <ProductArt art={x.art} className="w-[58%]" />
              </div>
              <b className="mt-2.5 block font-semibold">{x.name}</b>
              <span className="text-[.92rem] text-mut">{inr(x.price)} each</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
