# Handy — Founder Spec

Status: pre-build. Founder: Mustapha Sulaimon. Standalone product/company
brief — read this file first in any new repo/session before writing code.

## Problem
Finding a plumber, electrician, or generator technician you can actually
trust means asking around every time — no history, no accountability, and
price is renegotiated at the door regardless of what was agreed on the
phone. TaskRabbit/Thumbtack-style platforms don't operate in this market.

## Who it's for
Households and small businesses who need a tradesperson and currently
rely on word-of-mouth or informal contacts, plus tradespeople who want
repeat customers instead of one-off jobs found through asking around.

## The wedge
The product IS the trust record, not the listing. A tradesperson's profile
is their completed-job history and reviews — not a self-written bio — and
price ranges are set before contact, removing the haggle-at-the-door
friction that's the single biggest complaint in this market.

## MVP scope (phase 1)
- Tradesperson profile: service category, price range, completed-job
  count, reviews (only from verified completed bookings, not open
  reviews anyone can post).
- Customer books a job (category + rough description + preferred time) —
  gets matched to available tradespeople in-category, sees price range
  upfront.
- Booking confirmation + simple in-app contact (phone/WhatsApp handoff is
  fine for v1 — don't build in-app chat/calling until there's a reason to).
- After job completion, both sides confirm completion → review unlocked.

## Explicitly NOT in phase 1
- In-app payments — this market still largely pays cash/transfer on
  completion; don't force a payment rail nobody asked for yet.
- Real-time location tracking / dispatch algorithms — simple
  availability + manual acceptance is enough to prove the trust mechanic.
- Verification beyond basic ID + phone number for v1 — background checks
  or certifications are a credibility feature to layer in once there's
  real usage, not a blocker to launching.

## Tech architecture
- Mobile: React Native (both customer and tradesperson use the same app,
  different role/view).
- Backend: Node.js, Postgres, Supabase for auth/storage.
- Matching logic starts simple: category + rough location/area, no need
  for anything sophisticated at MVP scale.

## Business model
- Lead fee per accepted booking, or a small subscription for
  tradespeople to appear in search — decide based on which tradespeople
  actually respond to early outreach.

## Roadmap after MVP
1. Manually recruit and vet a small pool of tradespeople in one city/area
   first — this is a trust product, it dies if the first batch of
   tradespeople are bad. Don't scale faster than you can vet.
2. Prove repeat-booking actually happens (the core retention thesis)
   before investing in matching/discovery sophistication.
3. Expand categories/areas only after the trust loop is proven in one.

## Build prompt (paste into a fresh session/repo to start)
"Build the Handy MVP: a React Native app with two roles (customer,
tradesperson) where tradespeople have profiles showing category, price
range, and reviews gated to verified completed bookings only, customers
book a job and see the price range upfront before contact, and reviews
unlock after both sides confirm job completion. No in-app payments in v1.
See `handy.md` for full scope, explicit non-goals, and the note on vetting
the first tradesperson pool manually before scaling."
