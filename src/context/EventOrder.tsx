"use client";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { products } from "@/data/products";
import { MIN_QTY, QTY_STEP } from "@/lib/rules";
import { isValidCoupon, totals, type Cart } from "@/lib/pricing";
import { emptyEvent, validateOrder, type EventDetails } from "@/lib/order";
import { formatEventDate } from "@/lib/dates";

type Ctx = {
  selectedId: string;
  select: (id: string) => void;
  cart: Cart;
  summary: ReturnType<typeof totals>;
  addItem: (id: string) => void;
  step: (id: string, direction: 1 | -1) => void;
  event: EventDetails;
  setEvent: (patch: Partial<EventDetails>) => void;
  coupon: string | null;
  applyCoupon: (code: string) => boolean;
  bookings: Record<string, number>;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  error: string;
  submit: () => void;
  toast: string;
};

const EventOrderContext = createContext<Ctx | null>(null);

export function EventOrderProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [cart, setCart] = useState<Cart>({});
  const [event, setEventState] = useState<EventDetails>(emptyEvent);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Record<string, number>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const orderNo = useRef(1040);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const say = useCallback((message: string) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3600);
  }, []);

  const addItem = (id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + MIN_QTY }));
    say(`${MIN_QTY} × ${products.find((p) => p.id === id)?.name} added to your event order.`);
  };

  const step = (id: string, direction: 1 | -1) =>
    setCart((c) => {
      const next = (c[id] ?? 0) + direction * QTY_STEP;
      const rest = { ...c };
      delete rest[id];
      return next < MIN_QTY ? rest : { ...rest, [id]: next };
    });

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const ok = isValidCoupon(clean);
    setCoupon(ok ? clean : null);
    if (ok) say(`Coupon ${clean} applied.`);
    return ok;
  };

  const submit = () => {
    const problem = validateOrder(cart, event);
    setError(problem ?? "");
    if (problem) return;
    // Payment is simulated. This is where a Razorpay order would be created.
    const key = `${event.date}|${event.window}`;
    setBookings((b) => ({ ...b, [key]: (b[key] ?? 0) + 1 }));
    orderNo.current += 1;
    say(`Event order #${orderNo.current} booked for ${formatEventDate(event.date)}, ${event.window}.`);
    setCart({});
    setEventState(emptyEvent);
    setCoupon(null);
    setDrawerOpen(false);
  };

  const value: Ctx = {
    selectedId, select: setSelectedId, cart, summary: totals(cart, coupon), addItem, step,
    event, setEvent: (patch) => setEventState((e) => ({ ...e, ...patch })),
    coupon, applyCoupon, bookings, drawerOpen, setDrawerOpen, error, submit, toast,
  };
  return <EventOrderContext.Provider value={value}>{children}</EventOrderContext.Provider>;
}

export function useEventOrder() {
  const ctx = useContext(EventOrderContext);
  if (!ctx) throw new Error("useEventOrder must be used inside EventOrderProvider");
  return ctx;
}
