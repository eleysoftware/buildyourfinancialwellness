# Phase 4 — Newsletter Module (Spec sections 9–11)

## Inspection results

| Requirement | Status | Notes |
|---|---|---|
| 10.1 Public newsletter listing | Not complete | Only a placeholder "Blog" page exists (`/blog`, "Articles are on the way"). It gets replaced, not duplicated. |
| 10.2 Pagination | Not complete | Nothing exists yet. |
| 10.3 Thumbnail images | Not complete | Nothing exists yet. |
| 10.4 Newsletter detail pages | Not complete | There is no blog detail page to reuse. |
| 11 Admin create / edit / delete / publish-unpublish | Not complete | Your Supabase sign-in (`/auth`, `/account`) exists, but there is no admin role or content management. It gets extended, not duplicated. |

## What I'll build

Visitors can read the Newsletters list and every newsletter without signing in, with no username or password. Only the admin signs in, using the existing Sign In page, to manage newsletters.

1. **Newsletters page (`/newsletters`)** built to match the Figma card layout. It has the "Newsletters" heading and subtitle, a 3-column grid, and numbered pagination with 9 per page. Each card shows:
   - A thumbnail, which is the main photo taken from that newsletter's PDF.
   - A title in the form "Month Year - Headline", for example "September 2026 - A More Manageable Way to Tackle Debt".
   - A short description written from the newsletter's opening.
   - The author's photo and "TaMara West".
   - The date in "mmm yyyy" format, for example "Sep 2026".

   Newsletters are sorted newest first by year and month. Cards stack to 2 columns on tablet and 1 on phone. The page uses the **main site Header and Footer**, not the Figma footer.
2. **Newsletter detail page (`/newsletters/<slug>`)** shows the thumbnail, title, author, and date, followed by the PDF newsletter itself, viewable on the page and downloadable. It also has a "Back to Newsletters" link.
3. **Blog is fully replaced by Newsletters**: every "Blog" link, in the Resources dropdown, mobile menu, and footer, becomes "Newsletters" and points to `/newsletters`. The old Blog page and the `/blog` address are removed entirely, with no redirect, and no "Blog" wording remains anywhere on the site. No other navigation changes; those belong to Phase 1.
4. **Admin management** at `/account/newsletters`, only for signed-in admins. Admins can:
   - Create, edit, and delete newsletters.
   - Upload the PDF and a thumbnail, and set the title, description, and month/year.
   - Switch each newsletter between Published and Draft.

   Only published newsletters appear publicly, and admin controls are never shown to visitors.
5. **Starting content**: the three newsletters you sent (July, August, and September 2026) are loaded as the first entries, each with its PDF and its extracted thumbnail. The Figma placeholder cards and images are not used.

| Month | Title |
|---|---|
| Sep 2026 | September 2026 - A More Manageable Way to Tackle Debt |
| Aug 2026 | August 2026 - Find Your Financial Rhythm Again |
| Jul 2026 | July 2026 - Where Does Your Paycheck Go? |

## What I need from you afterward

- Run one new SQL file in your Supabase SQL Editor. I can't change your Supabase project directly. The file creates the newsletters table, the file storage, the admin role, and the three starting newsletters.
- Make yourself an admin by running the one-line command included in that file, with your email filled in.
- Review the short descriptions, which I will write from each newsletter's opening. You can edit them in the admin area.

## Verification

- Check the list, pagination, and detail pages at desktop, tablet, and phone sizes.
- Confirm a signed-out visitor can't reach the admin page.
- Regression-check the home page, header, footer, and sign-in.
- Report back, then stop. Phase 5 does not start on its own.

## Technical details

- New file `supabase/newsletters-setup.sql`:
  - `app_role` enum, `user_roles` table, and a `has_role()` security-definer function (roles are kept separate from profiles).
  - `newsletters` table: id, slug (unique), title, excerpt, issue_year, issue_month, thumbnail_url, pdf_url, author_name (default 'TaMara West'), published bool, and timestamps. Grants and RLS let anyone read published rows (`TO anon, authenticated`), and admins have full access.
  - Public `newsletters` storage bucket for PDFs and thumbnails, where only admins can write.
  - Three seeded rows (Jul, Aug, and Sep 2026), plus a commented `insert into user_roles` line for the admin role.
- Thumbnails are extracted with `pdfimages` (the large page-1 photo in each PDF), resized to about 800px JPG, and uploaded as Lovable Assets together with the three PDFs. The seed rows store those asset URLs, and admin uploads go to Supabase Storage.
- Sort order is `issue_year desc, issue_month desc`. The date is rendered as `mmm yyyy` (for example `Sep 2026`) from year and month.
- The detail page embeds the PDF with `<iframe>`/`<object>` and includes a "Download PDF" link as a fallback on phones.
- Public reads go through the browser Supabase client with TanStack Query. Admin writes go through the browser client under RLS, and the admin route checks `has_role` via RPC.
- Card styles follow the Figma classes: `shadow-[0px_15px_35px_0px_rgb(0_0_0_/_0.1)]`, title `text-[22px] font-semibold text-[#6d7d8b]`, meta `text-xs text-[#697694]`, and the active page button on a light grey tile. The layout is a responsive CSS grid instead of absolute positioning.
- Pagination uses a `?page=` search param. Delete `blog.tsx`, then search the codebase (`rg -i blog`) to confirm no references remain, including in labels, links, and metadata. Add `newsletters.index.tsx`, `newsletters.$slug.tsx`, and `_authenticated/account.newsletters.tsx`, and update `database.types.ts`. The public newsletter routes have no auth gate.
- The author image uses the Figma avatar (`ellipse.png`, the TaMara portrait), uploaded as a Lovable Asset.
