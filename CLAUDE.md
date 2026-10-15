# CLAUDE.md

Read this first, before anything else, in any new session on this repo —
it says where things actually stand and what not to redo. Also read
`CASE_STUDIES_PLAN.md` right after this for the full project/case-study
history and detail; this file is the short pickup point.

## Where we are right now (as of 2026-10-14)
Mid-overhaul on `themustaphasulaimon.vercel.app`: adding new project case
studies and planning a full Apple/Scale-style visual redesign. Nothing on
the visual redesign has started yet. Renames for Ledger/Handy are still
pending — **nothing has been committed to git yet**, holding until those
are settled (per explicit user instruction).

## Real projects — don't touch without confirming first
- **KlassLab** — real, shipped, `status: "live"`. Leave as-is.
- **SurgeNet** (surgenet.vercel.app) — real, shipped, `status: "live"`.
  Paid WiFi hotspot billing portal: plan selection, Paystack payments,
  voucher system, admin/staff panel. Stack: Next.js, Node.js, Paystack.
- **GREady** (greadyprep.vercel.app) — real, shipped, `status: "live"`.
  GRE test-prep PWA with adaptive full-length practice tests mirroring the
  real exam interface. Stack confirmed from the actual repo at
  `C:\Users\cork\Documents\GREady`: Next.js, PostgreSQL via Prisma,
  Zustand, next-pwa. That repo also has `GREADY_BRIEF.local.md` and
  `HANDOFF.local.md` if more detail is ever needed.
- **iKonLeague** and **Nexus** were removed — iKonLeague was
  mischaracterized (it's a PWA, not represented accurately), Nexus wasn't
  a real project. Do not re-add either.

## Competitor check — done 2026-10-03, do not redo from scratch
Four new concept case studies were drafted. Before this check, they were
treated as fresh ideas. They are not — every one has real, existing
competitors:

- **Atlas** (3D property viewer) — **dropped entirely.** A real company
  already operates under this exact name in real-estate hotspot/investment
  analysis, and Planner5D/Cedreo already do floor-plan-to-3D well. Already
  removed from `content.ts` and `projects/`.
- **Handy** (tradesperson booking) — **name collision, must be renamed.**
  handy.com is a real, large company doing exactly this: home
  cleaning/handyman/plumber/electrician booking, vetted pros, upfront
  pricing, 30+ cities. The underlying idea (verified local tradespeople,
  review-history-as-product) can stay, but the name "Handy" cannot be used.
- **Ledger** (freelancer milestone escrow) — **name is risky, mechanic is
  commoditized, not renamed yet.** Escrow.com already does generic
  milestone escrow; Upwork has built-in milestone payments. "Ledger" is
  also a globally known crypto hardware wallet brand, inviting confusion.
  Mechanic can stay as "my take on an existing problem," framing must be
  honest, not pitched as original. Needs a new name.
- **Marketplace** (WhatsApp inventory for small sellers) — **not a name
  collision, but the mechanic already has direct competitors**: Syncli,
  Kyte, QuickSell, and AiSensy all already do real-time WhatsApp catalog +
  inventory sync. The one real differentiator kept from the original scope
  is that this doesn't require WhatsApp Cloud API access (just a `wa.me`
  pre-filled link), which the competitors generally do require — a real
  but narrow wedge, not an open market.

**Rule going forward, learned the hard way:** before writing any new
project/company spec, actually run a web search for existing products
with the same name AND the same mechanic. Do not just note "competitors
probably exist" in the abstract — check, and report back what was found
before writing a full spec, the way it should have happened before Atlas,
Ledger, Marketplace, and Handy were drafted.

## Open decisions — ask the user before proceeding
1. Rename Ledger and Handy (or drop them too) — not yet decided.
2. Whether to replace the dropped Atlas slot with a new 4th idea, or run
   with three.
3. Sequencing: which project gets actually built first as a real,
   deployed product (the goal is the user becoming founder/CEO of these,
   not portfolio decoration — see `CASE_STUDIES_PLAN.md`).
4. The Apple/Scale-style visual redesign (Hero, Work section, motion) is
   agreed scope but entirely unstarted.

## File map
- `CASE_STUDIES_PLAN.md` — full history/decisions on the case studies.
- `projects/*.md` — standalone founder specs per surviving project
  (currently `ledger.md`, `marketplace.md`, `handy.md` — all three need the
  competitor-check findings above folded in / names reconsidered before
  anyone builds from them as-is).
- `src/data/content.ts` — live site content, `Project.status` is
  `"live" | "concept"`, drives the "Shipped" vs "Case Study" badge in
  `ProjectCard.tsx`.
