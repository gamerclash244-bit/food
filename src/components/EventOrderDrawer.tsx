"use client";
import { useEffect, useState } from "react";
import { getProduct } from "@/data/products";
import { useEventOrder } from "@/context/EventOrder";
import { DELIVERY_WINDOWS, EVENT_TYPES, LEAD_DAYS, MAX_PER_WINDOW, MIN_QTY } from "@/lib/rules";
import { earliestEventDate } from "@/lib/dates";
import { inr } from "@/lib/format";

const Label = ({ children }: { children: React.ReactNode }) => <h4 className="mb-2 mt-5 text-[.95rem] font-semibold">{children}</h4>;

export default function EventOrderDrawer() {
  const o = useEventOrder();
  const { summary: t, event: e } = o;
  const [minDate, setMinDate] = useState("");
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState(false);
  useEffect(() => setMinDate(earliestEventDate()), []);

  return (
    <>
      <div onClick={() => o.setDrawerOpen(false)} className={`fixed inset-0 z-30 bg-black/45 transition-opacity duration-300 ${o.drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside aria-label="Your event order" aria-hidden={!o.drawerOpen} className={`fixed inset-y-0 right-0 z-40 flex w-[min(440px,100%)] flex-col bg-bg transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${o.drawerOpen ? "" : "translate-x-[105%]"}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="text-2xl">Your event order</h3>
          <button className="pill" onClick={() => o.setDrawerOpen(false)}>Close</button>
        </div>

        <div className="flex-1 overflow-auto px-5 pb-4">
          {Object.keys(o.cart).length === 0 && <p className="py-3.5 text-mut">Add items from the menu. Minimum {MIN_QTY} per item.</p>}
          {Object.entries(o.cart).map(([id, qty]) => (
            <div key={id} className="flex items-center gap-2.5 border-b border-line py-2.5">
              <b className="flex-1 font-semibold">{getProduct(id)?.name}</b>
              <span className="flex items-center gap-2">
                <button className="h-7 w-7 rounded-full border border-ink" aria-label="Remove 5" onClick={() => o.step(id, -1)}>−</button>
                {qty}
                <button className="h-7 w-7 rounded-full border border-ink" aria-label="Add 5" onClick={() => o.step(id, 1)}>+</button>
              </span>
              <span className="w-20 text-right">{inr((getProduct(id)?.price ?? 0) * qty)}</span>
            </div>
          ))}

          <Label>Event type</Label>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((x) => <button key={x} className="chip" data-on={e.type === x} onClick={() => o.setEvent({ type: x })}>{x}</button>)}
          </div>
          <Label>Number of guests</Label>
          <input className="field" inputMode="numeric" placeholder="e.g. 60" value={e.guests} onChange={(ev) => o.setEvent({ guests: ev.target.value })} />
          <Label>Event date <span className="font-normal text-mut">(at least {LEAD_DAYS} days ahead)</span></Label>
          <input className="field" type="date" min={minDate} value={e.date} onChange={(ev) => o.setEvent({ date: ev.target.value, window: "" })} />
          <Label>Delivery time</Label>
          <div className="flex flex-wrap gap-2">
            {DELIVERY_WINDOWS.map((w) => {
              const left = MAX_PER_WINDOW - (o.bookings[`${e.date}|${w}`] ?? 0);
              return (
                <button key={w} className="chip" data-on={e.window === w} disabled={!e.date || left <= 0} onClick={() => o.setEvent({ window: w })}>
                  {w}{e.date ? ` · ${left <= 0 ? "full" : `${left} left`}` : ""}
                </button>
              );
            })}
          </div>
          <Label>Venue address</Label>
          <input className="field" placeholder="Hall name and street" value={e.address} onChange={(ev) => o.setEvent({ address: ev.target.value })} />
          <Label>Pincode</Label>
          <input className="field" inputMode="numeric" maxLength={6} placeholder="6-digit pincode" value={e.pincode} onChange={(ev) => o.setEvent({ pincode: ev.target.value })} />
          <Label>Contact number</Label>
          <input className="field" inputMode="tel" placeholder="10-digit phone number" value={e.phone} onChange={(ev) => o.setEvent({ phone: ev.target.value })} />
          <Label>Coupon</Label>
          <div className="flex gap-2">
            <input className="field" placeholder="Try FRESH10" value={code} onChange={(ev) => setCode(ev.target.value)} />
            <button className="pill" onClick={() => setCouponError(!o.applyCoupon(code))}>Apply</button>
          </div>
          {couponError && <p className="mt-1 text-sm text-red-700">That coupon code isn’t valid.</p>}
        </div>

        <div className="border-t border-line px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
          <div className="flex justify-between"><span>Subtotal</span><span>{inr(t.subtotal)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{t.subtotal ? (t.delivery ? inr(t.delivery) : "Free") : "–"}</span></div>
          {t.discount > 0 && <div className="flex justify-between"><span>Discounts</span><span>−{inr(t.discount)}</span></div>}
          <div className="mt-1.5 flex justify-between border-t border-ink pt-2 font-display text-2xl font-light"><span>Pay now</span><span>{inr(t.total)}</span></div>
          <p className="text-sm text-mut">50+ pieces: 5% off. 100+ pieces: 10% off. Free delivery above ₹5,000.</p>
          <p className="min-h-6 text-sm font-semibold text-red-700" role="alert">{o.error}</p>
          <button className="pill pill-dark w-full justify-center py-3.5" onClick={o.submit}>Pay in full to book your date</button>
        </div>
      </aside>
    </>
  );
}
