# Crumb & Cream

Event pre-order storefront for a fresh food company. Next.js (App Router), TypeScript and Tailwind CSS.
Customers pick an event date, set quantities and pay upfront. Payment is simulated in this version.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| Path | What it holds |
|---|---|
| `src/data/products.ts` | The menu. Edit prices, names and details here. |
| `src/lib/rules.ts` | Minimum quantity, lead days, delivery windows, fees. |
| `src/lib/pricing.ts` | Totals, bulk discounts and coupons. |
| `src/lib/order.ts` | Event details and order validation. |
| `src/context/EventOrder.tsx` | Cart and order state shared by the whole site. |
| `src/components/` | One file per section: Hero, HeroLoop, ProductShowcase, EventOrderDrawer, and so on. |
| `src/app/globals.css` | Colour palette (light and dark) and shared styles. |
| `public/` | Logo and food photos. |

## Next steps

1. Replace the code-drawn illustrations in `ProductArt.tsx` with real photos from `public/`.
2. Add a database (Prisma and Postgres) and an `/api/orders` route to save bookings.
3. Create real payments in `submit()` in `EventOrder.tsx` with Razorpay.
4. Add an `/admin` page for orders and delivery-window capacity.
