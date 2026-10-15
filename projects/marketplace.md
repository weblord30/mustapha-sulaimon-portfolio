# Marketplace (WhatsApp Inventory) — Founder Spec

Status: pre-build. Founder: Mustapha Sulaimon. Standalone product/company
brief — read this file first in any new repo/session before writing code.

## Problem
Most small sellers (fashion, food, informal retail) run their entire shop
through WhatsApp DMs and Instagram — no inventory tracking, no order
history. Result: double-selling the same item, "is this still available?"
messages piling up, no record of who ordered what.

## Who it's for
Micro and small sellers who already sell via WhatsApp and have no
intention of migrating to a separate storefront app — the product has to
meet them where they already are, not ask them to leave.

## The wedge
Don't build a storefront that competes with WhatsApp for the seller's
attention. Build a thin layer that makes WhatsApp selling accurate: a
catalog link they drop into their WhatsApp status/bio, and an order flow
that still ends inside WhatsApp (not a separate checkout).

## MVP scope (phase 1)
- Seller dashboard: add products (photo, price, stock count), mark
  sold out.
- Public catalog page per seller (shareable link) — clean, mobile-first.
- "Order" button on each product opens WhatsApp with a pre-filled message
  to the seller's number ("Hi, I'd like to order: [item] x[qty]").
- Seller confirms the order in the dashboard, stock decrements
  automatically on confirmation.
- Basic order log/history so the seller has a record instead of scrolling
  old chats.

## Explicitly NOT in phase 1 (documented, not hidden)
- WhatsApp Cloud API integration for automated replies/stock-checking —
  this requires Meta business verification and has per-conversation
  pricing past the free tier. This is the real phase 2, pursued once
  phase 1 proves sellers actually want this. Do not claim this is live
  before it's built.
- Payments in-app — orders are confirmed, payment still happens however
  the seller already collects it (bank transfer, cash on delivery, etc.)
  for v1.

## Tech architecture
- Frontend: React (dashboard) + a lightweight public catalog page.
- Backend: Node.js, Supabase (auth + Postgres + storage for product
  photos).
- No WhatsApp API dependency for v1 — the "pre-filled message" trick is
  just a `wa.me/` link with a URL-encoded message, no API access needed.

## Business model
- Freemium: free up to N products, paid tier for more products/sellers
  managing multiple catalogs, or a small monthly fee per seller once
  there's real usage data to price against.

## Roadmap after MVP
1. Get it in front of real sellers (market research: is the pre-filled
   WhatsApp link actually enough, or do sellers want more automation
   sooner than expected?).
2. Build toward WhatsApp Cloud API auto-replies once there's seller
   demand and the business can justify Meta's verification process.
3. Consider a buyer-side feature (saved sellers/wishlist) only once
   seller-side usage is proven.

## Build prompt (paste into a fresh session/repo to start)
"Build the Marketplace MVP: a React + Node.js + Supabase app where a
seller manages a product catalog (photo, price, stock) in a dashboard,
gets a shareable public catalog page, and each product has an 'Order'
button that opens a pre-filled WhatsApp message (`wa.me` link) to the
seller. Seller confirms orders in the dashboard, which decrements stock
and logs order history. No WhatsApp Cloud API in v1 — that's documented
phase 2. See `marketplace.md` for full scope and explicit non-goals."
