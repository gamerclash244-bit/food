import { earliestEventDate } from "./dates";
import { LEAD_DAYS, EVENT_TYPES } from "./rules";
import type { Cart } from "./pricing";

export type EventDetails = {
  type: (typeof EVENT_TYPES)[number];
  guests: string;
  date: string;
  window: string;
  address: string;
  pincode: string;
  phone: string;
};

export const emptyEvent: EventDetails = { type: "Birthday", guests: "", date: "", window: "", address: "", pincode: "", phone: "" };

/** Returns an error message to show the customer, or null when the order is valid. */
export function validateOrder(cart: Cart, e: EventDetails): string | null {
  if (!Object.keys(cart).length) return "Add at least one item.";
  if (!e.date || e.date < earliestEventDate()) return `Choose an event date at least ${LEAD_DAYS} days ahead.`;
  if (!e.window) return "Choose a delivery time.";
  if (!/^\d+$/.test(e.guests.trim())) return "Enter the number of guests.";
  if (!e.address.trim()) return "Enter the venue address.";
  if (!/^\d{6}$/.test(e.pincode)) return "Enter a valid 6-digit pincode.";
  if (e.phone.replace(/\D/g, "").length !== 10) return "Enter a 10-digit contact number.";
  return null;
}
