# Ledger — Founder Spec

Status: pre-build. Founder: Mustapha Sulaimon. Standalone product/company
brief — read this file first in any new repo/session before writing code.

## Problem
Freelancers doing milestone-based work get stiffed or ghosted mid-project,
with no neutral record of what was agreed, delivered, or paid. Existing
platforms (Upwork, Deel) solve this but only inside their own marketplace —
freelancers who find clients independently (the majority, especially
outside the big platforms) have nothing.

## Who it's for
Independent freelancers and small agencies working directly with clients
(not through a marketplace that already escrows), especially where
client and freelancer are in different countries/currencies and trust is
the actual blocker to getting paid on time.

## The wedge
Not a marketplace — a trust layer either side can bring to a deal they
already have. You don't have to convince your client to "join a platform
to find freelancers," you convince them to use a neutral escrow for a deal
that already exists.

## MVP scope (phase 1)
- Freelancer creates a project with milestones (name, amount, due date).
- Client gets a link, funds the first milestone via Stripe (held, not paid
  out yet).
- Freelancer marks milestone delivered → client approves → funds release.
- Built-in dispute state: either side can flag a milestone, which freezes
  release and surfaces a simple structured record (what was agreed, what
  was delivered, timestamps) rather than leaving it to email threads.
- Multi-currency support from day one (Stripe handles this reasonably
  well) since most of this userbase is being paid cross-border.

## Explicitly NOT in phase 1
- Full marketplace / discovery (finding freelancers) — this is a tool for
  a deal that already exists between two people who found each other.
- In-house dispute arbitration/mediation — phase 1 just needs a clean,
  neutral record; actual arbitration process is a later phase once there's
  real volume to justify building it.
- Non-Stripe-supported countries/currencies — be honest about coverage
  gaps rather than claiming universal support.

## Tech architecture
- Frontend: Next.js.
- Backend: Node.js, Postgres.
- Payments: Stripe Connect (Express accounts for freelancers) — this is
  the single hardest technical/compliance piece; budget real time for
  Stripe's onboarding/KYC flow, don't underestimate it.
- Notifications: email at minimum for milestone state changes.

## Business model
- Small percentage fee on funds released (standard escrow model), or flat
  fee per milestone — decide based on early user feedback, don't guess.

## Compliance note (be honest with yourself here)
Moving client money, even via Stripe Connect as the processor, still
means you're responsible for building this correctly — dispute handling,
refund paths, and not holding funds longer than Stripe's terms allow.
This is the one project in the four where cutting corners has real
financial/legal consequences, not just a bad user experience. Read
Stripe Connect's docs on Express accounts and platform responsibilities
before writing the payment flow.

## Roadmap after MVP
1. Prove it with a handful of real freelancer-client pairs (could be your
   own network first).
2. Tighten the dispute flow based on what actually goes wrong.
3. Expand currency/country coverage as Stripe Connect allows.

## Build prompt (paste into a fresh session/repo to start)
"Build the Ledger MVP: a Next.js + Node.js app where a freelancer creates
a project with milestones, a client funds each milestone via Stripe
Connect (held until approval), and either side can flag a dispute which
freezes release and shows a structured record of what was agreed and
delivered. Multi-currency via Stripe. See `ledger.md` for full scope,
explicit non-goals, and the compliance note on handling client funds
correctly."
