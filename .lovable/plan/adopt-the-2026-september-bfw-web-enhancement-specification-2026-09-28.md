# Adopt the 2026-September BFW Web Enhancement Specification

Adopt the uploaded specification as the governing plan for all upcoming enhancement work on this site, and execute it one phase at a time only when you tell me which phase to run.

## What this plan does

1. **Store the specification in the project** as `docs/bfw-enhancement-spec-2026-09.md` (exact copy of your uploaded document) so it is the single source of truth for every future phase request.
2. **Record the working rules** from the spec in project memory so they apply to every session:
   - Inspect before implementing — for every requirement, check whether it is already complete, partially complete, or not complete; never recreate what exists.
   - Enhance, don't rebuild — preserve the existing design, branding, pages, content, images, testimonials, and working functionality; make the smallest change that satisfies each requirement.
   - Phase-by-phase execution — I never run phases automatically; you name the phase, I inspect, implement only what's incomplete, verify, regression-check, report, and stop.
3. **No code changes in this step.** Nothing on the site changes until you instruct a specific phase.

## The phases (from your specification)

1. **Navigation** — Support → Resources, submenu → Resource Library, CTA → Client Login, BLEXware attribution, routing updates.
2. **Services + Hero** — replace the three service cards with Individuals/Households and Employees/Organizations, Acuity → Simply Coach where applicable, hero CTA → "Get Your Free Financial Check-In" with supporting text.
3. **Resource Center** — Resources landing page with Tools (default) and Newsletters tabs, pagination, thumbnails, detail pages.
4. **Newsletter Module** — public listing with pagination/thumbnails/detail pages, replacing the Blog concept.
5. **Financial Tools Library** — four downloadable tools, download confirmation (no lead capture), download management.
6. **Contact Section** — Savings Reset Kit replaces the newsletter download, First Name optional, Last Name removed, Email required, admin-managed PDF, new local phone number.
7. **Website Administration** — secure admin area for newsletters, financial tools, and the Savings Reset Kit PDF, extending the existing Supabase sign-in rather than a second system.

## How each phase will run when you request it

1. Inspect the current implementation for that phase's items.
2. Categorize each item: already complete / partially complete / not complete.
3. Implement only what is incomplete.
4. Verify in the preview at desktop, tablet, and phone sizes.
5. Regression-check unrelated functionality.
6. Report: what was already done, what changed, what's new, and anything I need from you — then stop.

## Items I'll need from you when we reach those phases

- The new local business phone number (Phase 6).
- The four Financial Tools files and the Savings Reset Kit PDF (Phases 5–6) — or I build the admin upload first so you can add them yourself (Phase 7).
- Simply Coach link/details if any scheduling links currently point to Acuity (Phase 2).

## Technical details

- The spec file lives at `docs/bfw-enhancement-spec-2026-09.md`; project memory holds the execution rules so they survive across sessions.
- Admin features in Phases 4–7 will extend the existing Supabase auth (`/auth`, `/account`) with an admin role check — no second login system.
- Each phase execution gets its own short plan before code changes, per the spec's inspect-first rule.
