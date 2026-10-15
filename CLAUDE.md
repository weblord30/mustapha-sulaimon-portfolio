# CLAUDE.md

Read this first, before anything else, in any new session on this repo —
it says where things actually stand and what not to redo. Also read
`CASE_STUDIES_PLAN.md` right after this for the full project/case-study
history; this file is the short pickup point.

## Where we are right now (as of 2026-10-15)
The Work section has been rebuilt and pushed to GitHub (origin/master),
which auto-deploys to `themustaphasulaimon.vercel.app` via Vercel. Four
real, live projects are in `src/data/content.ts` with `status: "live"`,
each with a small lazy-loaded iframe preview (`LivePreview.tsx`) and a
"Visit" link:

- **KlassLab** (klasslab.vercel.app) — EdTech/LMS.
- **SurgeNet** (surgenet.vercel.app) — WiFi hotspot billing portal, Next.js
  + Node.js + Paystack.
- **GREady** (greadyprep.vercel.app) — GRE test-prep PWA, Next.js +
  PostgreSQL/Prisma + Zustand. Real repo at
  `C:\Users\cork\Documents\GREady` has more detail if ever needed
  (`GREADY_BRIEF.local.md`, `HANDOFF.local.md`).
- **MD Writers** (mdwriters.vercel.app) — the user's own ghostwriting/
  publishing agency site, not client work. Static HTML/CSS/JS.

Three concept case studies (not real, not built) sit in `content.ts` with
`status: "concept"` and are filtered out of the live Work section
(`Work.tsx` does `projects.filter(p => p.status === "live")`) — **Ledger**,
**Marketplace**, **Handy**. See the competitor-check section below before
doing anything with these.

iKonLeague, Nexus, and Atlas were all removed earlier and should **not**
be re-added (mischaracterized / not real / name-collided — see git history
and `CASE_STUDIES_PLAN.md` for why).

## Layout architecture — read before changing Work.tsx or Process.tsx
Both sections share one pattern, arrived at after several broken attempts
worth knowing about so they don't get retried:

- **Mobile (<768px):** cards stack **vertically** in plain document flow —
  `flex flex-col`, full-width cards, zero custom scroll handling. This
  was a deliberate final call after horizontal touch-scroll kept breaking
  across real devices (WebKit `touch-action`/`scroll-snap` interactions,
  Lenis wheel capture, a custom drag hook fighting native touch momentum —
  tried and reverted, in that order). Don't reintroduce horizontal swipe
  on mobile without a strong reason; it has a bad track record here.
- **Desktop/tablet (≥768px, `md:`):** GSAP `ScrollTrigger` pins the section
  and pans the row horizontally as the user scrolls down (`gsap.matchMedia`
  gated to `(min-width: 768px)`), exactly the same in both `Work.tsx` and
  `Process.tsx`.
- `useLenis.ts` has a `prevent` option wired to `data-lenis-prevent` — not
  currently used by anything (removed along with the horizontal mobile
  scroll it was protecting), but left in place since it's the correct way
  to exempt a future nested scroll area from Lenis's wheel capture.

## Performance notes — don't reintroduce these
Found and fixed real lag on lower-end hardware earlier in this project;
don't undo these without a reason:
- `MeshGradient.tsx`'s WebGL shader pauses via `IntersectionObserver` when
  scrolled off-screen — it used to run every frame for the entire session.
- `About.tsx`'s skill chips are static — they used to be 15 concurrent
  infinite framer-motion animations, running forever, never pausing.
- `filter: brightness()` / CSS `filter` generally was the single biggest
  cause of jank in an earlier sticky-stack card design (now replaced). If
  a future design wants a scroll-tied dim/scale effect, use `transform`
  and `opacity` only — both are compositor-only and cheap; `filter` is not.
- `LivePreview.tsx` lazy-mounts its iframe via `IntersectionObserver` and
  sets `pointerEvents: none` — don't make it eager-load or interactive,
  that's both a perf cost (3+ live external sites loading at once) and a
  mobile touch-scroll-trap risk.

## Competitor check — done 2026-10-03, do not redo from scratch
The three remaining concept case studies all have real, existing
competitors — expected and fine for a portfolio case study, but the
framing must stay "my take on an existing problem," never pitched as
original:
- **Handy** (tradesperson booking) — **name collision, must be renamed
  before building.** handy.com is a real, large competitor in the same
  category.
- **Ledger** (freelancer milestone escrow) — name is risky (also a known
  crypto-wallet brand), mechanic is commoditized (Escrow.com, Upwork
  milestones already do this generically).
- **Marketplace** (WhatsApp inventory) — mechanic has direct competitors
  (Syncli, Kyte, QuickSell, AiSensy already do real-time WhatsApp catalog
  + inventory sync). The one real differentiator: no WhatsApp Cloud API
  required, just a `wa.me` pre-filled link.

**Rule going forward:** before writing any new project/company spec,
actually web-search for existing products with the same name AND the same
mechanic, and report findings before writing a full spec. Atlas got
dropped entirely because this wasn't done first.

## Open decisions — ask the user before proceeding
1. Rename Ledger and Handy (or drop them too) — not yet decided.
2. Whether to build any of the three concepts into real, deployed
   products — the stated goal is the user becoming founder/CEO of these,
   not portfolio decoration (see `CASE_STUDIES_PLAN.md`).
3. Hero/About/Services/Contact haven't had the same design pass as Work —
   unclear if more visual work is wanted there.

## File map
- `CASE_STUDIES_PLAN.md` — full history/decisions on the case studies.
- `projects/*.md` — standalone founder specs for `ledger`, `marketplace`,
  `handy` — need the competitor-check findings folded in / names
  reconsidered before anyone builds from them as-is.
- `src/data/content.ts` — site content. `Project.status` is
  `"live" | "concept"`; `Work.tsx` only renders `"live"` ones.
- `src/components/ProjectPanel.tsx` + `LivePreview.tsx` — the project card
  and its lazy iframe preview thumbnail.
