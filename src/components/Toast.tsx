"use client";
import { useEventOrder } from "@/context/EventOrder";

export default function Toast() {
  const { toast } = useEventOrder();
  return (
    <div role="status" className={`fixed bottom-6 left-1/2 z-[60] max-w-[92%] -translate-x-1/2 rounded-full bg-ink px-5 py-3.5 text-bg transition-transform duration-500 ease-[cubic-bezier(.3,1.4,.5,1)] ${toast ? "translate-y-0" : "translate-y-[200%]"}`}>
      {toast}
    </div>
  );
}
