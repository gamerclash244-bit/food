import { LEAD_DAYS } from "./rules";

const pad = (n: number) => String(n).padStart(2, "0");

/** Earliest bookable event date as YYYY-MM-DD in the visitor's local time. */
export function earliestEventDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + LEAD_DAYS);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const formatEventDate = (iso: string) =>
  new Date(iso + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
