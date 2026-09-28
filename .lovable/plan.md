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

1. **Newsletters page (`/newsletters`)** built to match the Figma design: a "Newsletters" heading with its subtitle, a 3-column card grid (thumbnail, title, summary, author avatar with "TaMara West" and date), and numbered pagination with 9 per page as in the design. Cards stack to 2 columns on tablet and 1 on phone. It uses the **main site Header and Footer**, not the Figma footer.
2. **Newsletter detail page (`/newsletters/<slug>`)**: a large thumbnail, title, author and date, full article text, and a "Back to Newsletters" link.
3. **Blog is fully replaced by Newsletters**: every "Blog" link, in the Resources dropdown, mobile menu, and footer, becomes "Newsletters" and points to `/newsletters`. The old Blog page and the `/blog` address are removed entirely, with no redirect, and no "Blog" wording remains anywhere on the site. No other navigation changes; those belong to Phase 1.
4. **Admin management** at `/account/newsletters`, only for signed-in admins. Admins can create, edit, and delete newsletters, upload a thumbnail, and switch each one between Published and Draft. Only published newsletters appear on the public site. Anyone who is not an admin never sees these controls.
5. **Starter content**: the three thumbnail photos from the design are uploaded to the image library. A few sample newsletters are included so the page doesn't look empty. You can edit or delete them from the admin area.

## What I need from you afterward

- Run one new SQL file in your Supabase SQL Editor. I can't change your Supabase project directly. The file creates the newsletters table, the thumbnail storage, and the admin role.
- Make yourself an admin by running the one-line command included in that file, with your email filled in.
- Only 3 of the 9 photos in the design were included in the export. Upload the rest, or add real images from the admin area.

## Verification

- Check the list, pagination, and detail pages at desktop, tablet, and phone sizes.
- Confirm a signed-out visitor can't reach the admin page.
- Regression-check the home page, header, footer, and sign-in.
- Report back, then stop. Phase 5 does not start on its own.

## Technical details

- New file `supabase/newsletters-setup.sql`:
  - `app_role` enum, `user_roles` table, and a `has_role()` security-definer function (roles are kept separate from profiles).
  - `newsletters` table (id, slug unique, title, excerpt, body, thumbnail_url, author_name default 'TaMara West', published bool, published_at, timestamps), plus grants and RLS: anyone can read published rows, and admins have full access.
  - Public `newsletter-thumbnails` storage bucket, where only admins can write.
  - Sample newsletter rows, plus a commented `insert into user_roles` line for the admin role.
- Public reads go through the browser Supabase client with TanStack Query. Admin writes go through the browser client under RLS, and the admin route checks `has_role` via RPC.
- Card styles follow the Figma classes: `shadow-[0px_15px_35px_0px_rgb(0_0_0_/_0.1)]`, title `text-[22px] font-semibold text-[#6d7d8b]`, meta `text-xs text-[#697694]`, and the active page button on a light grey tile. The layout is a responsive CSS grid instead of absolute positioning.
- Pagination uses a `?page=` search param. Delete `blog.tsx`, then search the codebase (`rg -i blog`) to confirm no references remain, including in labels, links, and metadata. Add `newsletters.index.tsx`, `newsletters.$slug.tsx`, and `_authenticated/account.newsletters.tsx`, and update `database.types.ts`. The public newsletter routes have no auth gate.
- Design images are uploaded as Lovable Asset pointers, and the Figma avatar is used for the author image.
