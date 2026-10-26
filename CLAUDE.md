# CLAUDE.md

Read this first, before anything else, in any new session on this repo —
it says where things actually stand and what not to redo. Also read
`CASE_STUDIES_PLAN.md` right after this for the full project/case-study
history; this file is the short pickup point.

## Where we are right now (as of 2026-10-26): the Adire edition
Full redesign merged to master (auto-deploys to themustaphasulaimon.vercel.app). Identity, palette and
logo come from `C:\Users\cork\Documents\brand` (`build.mjs` generates every logo file; copy
`final/svg/stacked-light.svg` to `src/assets/wordmark-stacked.svg` after rebuilding).

- Palette: Adire indigo #1a2466, starch #f6f3ec, coral #e4572e, ink #0b0d12 (tokens in `src/index.css`).
- Sections: Hero (animated wordmark + `AdireField` canvas cloth on a wire), Now (status cards + shipping
  log), Ribbon, Work (filterable grid, `PaperIn` cards, `ProjectCover` for projects without a site), Lab,
  About, Process, Contact (footer inside). Motion helpers in `src/components/Motion.tsx`; `Intro.tsx` is
  the once-per-session cloth intro; `Cursor.tsx` the custom cursor (fine pointers only).
- Shipping log: `src/data/shiplog.json` comes from local git history via `node scripts/shiplog.mjs` (the
  repos live on this PC, not on Vercel). Re-run before deploys.
- Project shots: `public/work/*.webp` (static, not iframes). CV: `public/Mustapha-Sulaimon-CV.pdf`
  (source `brand/cv.html`). Link card: `public/og.png` (source `brand/og.html`).
- Safe areas: `viewport-fit=cover`; fixed elements and edge sections pad with `env(safe-area-inset-*)`.
- Rules: never list This Lagos or Arzuz; girlfriend-day only as the anonymised Lab piece; Akanbi only in
  the wordmark line, seal and one About paragraph; KanbiIT never.
- Wow pass (26 Oct): hero cloth is a Verlet physics mesh (`AdireField.tsx`; draws each triangle's own
  texture patch for speed), case studies unfold as sheets (`CaseSheet.tsx`, deep links `#case-<id>`),
  scroll thread (`Thread.tsx`), Indigo Night theme + optional synthesised sound (`lib/prefs.ts`; theme
  set before first paint in index.html; dark sections use `.on-dark`), Ctrl/Cmd-K `CommandBar.tsx`, and
  the "Leave a bead" guestbook (`sections/Beads.tsx`) backed by `C:\Users\cork\Documents\portfolio-beads`
  (Cloudflare Worker + D1 on the musbaftech account, https://portfolio-beads.musbaftech.workers.dev;
  stores only x, y, colour; one bead per IP hash per 10 minutes; CORS limited to this site).
- Mobile: no horizontal swipe anywhere (filters wrap). Test real motion with puppeteer, not
  `--virtual-time-budget` screenshots (those don't advance CSS animations).

Live projects (all in `src/data/content.ts`, plus LLM platform, Yoruba translator, dropout model and KDP Mate):

- **Westhomes** (westhomeshub.com) — client build for a property agency.
  Astro on Cloudflare Workers free tier (D1, R2, Workers AI), Telegram
  listing bot, daily email digests. Repo at
  `C:\Users\cork\Documents\westhomes` (`PLAN.md` has everything).
- **KonnectKWASU** (konnectkwasu.musbaftech.workers.dev) — the user's own
  campus social app for Kwara State University, pre-launch (being pitched
  to the SU). Expo + Supabase PWA, matric verification, E2E chat. Repo at
  `C:\Users\cork\Documents\konnectKWASU` (`docs/PLAN.md`, `docs/NEXT.md`).
- **KlassLab** (klasslab.vercel.app) — EdTech/LMS.
- **SurgeNet** (surgenet.vercel.app) — WiFi hotspot billing portal, Next.js
  + Node.js + Paystack.
- **GREady** (greadyprep.vercel.app) — GRE test-prep PWA, Next.js +
  PostgreSQL/Prisma + Zustand. Real repo at
  `C:\Users\cork\Documents\GREady` has more detail if ever needed
  (`GREADY_BRIEF.local.md`, `HANDOFF.local.md`).
- **MD Writers** (mdwriters.vercel.app) — the user's own ghostwriting/
  publishing agency site, not client work. Static HTML/CSS/JS.

The three concept case studies (**Ledger**, **Marketplace**, **Handy**) were removed from `content.ts`
in the redesign; their specs remain in `projects/*.md`. See the competitor-check section below before
doing anything with them.

iKonLeague, Nexus, and Atlas were all removed earlier and should **not**
be re-added (mischaracterized / not real / name-collided — see git history
and `CASE_STUDIES_PLAN.md` for why).

## Performance notes — don't reintroduce these
Found and fixed real lag on lower-end hardware earlier in this project;
don't undo these without a reason:
- (Old) `MeshGradient.tsx` was removed in the redesign; `AdireField.tsx` follows the same rule and pauses via `IntersectionObserver` when
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
