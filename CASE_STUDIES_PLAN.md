# Case Studies / Portfolio Roadmap

Status as of 2026-10-03. Read this first in any new session before touching
`src/data/content.ts` or the Work section — it has the decisions behind why
things are the way they are.

## Real, shipped work
- **KlassLab** — real project, stays as-is, `status: "live"`.
- **iKonLeague** and **Nexus** — removed. iKonLeague was mischaracterized
  (built as a PWA, not represented accurately) and Nexus wasn't a real
  project. Do not re-add either without explicit instruction.

## Concept case studies (added, not yet built)
Case studies live in `content.ts`, tagged `status: "concept"` and rendered
with a "Case Study" badge on `ProjectCard` (vs. "Shipped" for live work) —
this labeling is intentional and must not be removed. Goal: zero
dishonesty, nothing on the site should look built if it isn't.

1. **Ledger** — FinTech / SaaS. Milestone-based freelancer escrow,
   dispute-flow-first, multi-currency, Stripe Connect.
2. **Marketplace** — Commerce / WhatsApp. Catalog link + pre-filled
   WhatsApp order flow sitting on top of WhatsApp (not competing with it).
   WhatsApp Cloud API auto-replies are the *documented phase two*, not a
   corner cut — this framing is deliberate, keep it.
3. **Handy** — Local Services / Trust. Verified tradesperson booking,
   review-history-as-the-product, repeat-booking retention mechanic.

### Dropped: Atlas (PropTech / 3D)
Removed on 2026-10-03, from both `content.ts` and `projects/atlas.md`.
Reason: a real company already operates in real-estate hotspot/investment-
area analysis under the same name, and the core 3D-from-floor-plan mechanic
is already well served by Planner5D and Cedreo. This wasn't caught before
the spec was written — lesson: **actually search for existing direct
competitors and name collisions before writing a full founder spec, not
just acknowledge in the abstract that competitors probably exist.** A
replacement fourth idea has not been picked yet — need 3 (Ledger,
Marketplace, Handy) or a genuinely different 4th, not a reflex replacement.

## Resolved: these are becoming real companies, not demos
As of 2026-10-03, scope expanded beyond "portfolio case study." The user
wants to end up able to call himself founder/CEO of each of these — the
reference point is a friend who actually built and shipped a real app
(StatusHD) and put it on LinkedIn. That means: real products, real users,
not a polished prototype that only lives on this portfolio.

Each remaining project has its own standalone founder spec in `projects/`:
- `projects/ledger.md`
- `projects/marketplace.md`
- `projects/handy.md`

Each file is self-contained (problem, wedge, MVP scope, explicit
non-goals, architecture, business model, roadmap, and a ready-to-paste
"build prompt") so a brand-new session in a brand-new repo can read one
file and start building immediately with no lost context. These are
**separate products/companies**, likely in their own repos — not part of
this portfolio codebase. The portfolio's `content.ts` entries stay
`status: "concept"` and only flip to `"live"` once the real product is
actually built and shipped.

**Still open:** which one to build first, and whether to go one-at-a-time
to full completion or run them in parallel. Check with the user before
starting actual implementation on any of them.

## Visual overhaul (not started)
Full Apple/Scale-style overhaul was agreed (scroll-driven reveals, bold
typography, cinematic per-project sections) — agreed scope, not yet
started. Current structure: `Hero.tsx`, `Work.tsx` + `ProjectCard.tsx`,
`Process.tsx`, `Services.tsx`, `Stack.tsx`, `Contact.tsx`, `Footer.tsx`,
`MeshGradient.tsx` for the hero background, `useTilt` hook for card tilt,
`Reveal.tsx` for scroll-in animations. framer-motion and gsap are already
dependencies — no 3D library needed for now since Atlas was dropped.

## Ground rules established in conversation (don't relitigate)
- Don't rip off existing products wholesale; frame as "my take on a known
  problem," not "nobody's solved this."
- Don't touch real project data (KlassLab) casually — confirm before editing.
- This file is the source of truth across sessions — update it whenever a
  decision changes, don't just let it go stale in chat.
