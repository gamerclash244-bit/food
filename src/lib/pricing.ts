import { getProduct } from "@/data/products";
import { DELIVERY_FEE, FREE_DELIVERY_FROM } from "./rules";

export type Cart = Record<string, number>; // product id -> pieces

export const bulkRate = (pieces: number) => (pieces >= 100 ? 0.1 : pieces >= 50 ? 0.05 : 0);

export function totals(cart: Cart, coupon: string | null) {
  const entries = Object.entries(cart);
  const subtotal = entries.reduce((sum, [id, qty]) => sum + (getProduct(id)?.price ?? 0) * qty, 0);
  const pieces = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const bulk = Math.round(subtotal * bulkRate(pieces));
  let discount = bulk;
  if (coupon === "FRESH10") discount += Math.round((subtotal - bulk) * 0.1);
  if (coupon === "FIRST50" && subtotal >= 1000) discount += 50;
  const delivery = subtotal && subtotal < FREE_DELIVERY_FROM ? DELIVERY_FEE : 0;
  return { subtotal, pieces, discount, delivery, total: Math.max(0, subtotal - discount + delivery) };
}

export const isValidCoupon = (code: string) => ["FRESH10", "FIRST50"].includes(code);
