// Business rules in one place. Change a number here and the whole site follows.
export const MIN_QTY = 10; // minimum pieces per item
export const QTY_STEP = 5; // +/- step in the order drawer
export const LEAD_DAYS = 3; // events must be booked this many days ahead
export const MAX_PER_WINDOW = 3; // events the kitchen can take per delivery window per day
export const DELIVERY_FEE = 150;
export const FREE_DELIVERY_FROM = 5000;
export const DELIVERY_WINDOWS = ["8–10 AM", "12–2 PM", "4–6 PM", "6–8 PM"];
export const EVENT_TYPES = ["Birthday", "Wedding", "Corporate", "Other"] as const;
