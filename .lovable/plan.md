# Connect your own Supabase project (kbtwskvjxdhjrnrdthua)

Wire the site to your external Supabase project for user accounts (with profiles) and content storage, replacing the disabled Lovable Cloud path.

## 1. Credentials & connection

- Project URL: `https://kbtwskvjxdhjrnrdthua.supabase.co`
- I'll open a secure form for you to paste your **publishable (anon) key** (Supabase Dashboard → Project Settings → API Keys). It's stored as a secret and exposed to the app as `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (publishable keys are safe in browser code).
- If we later need server-side privileged work, I'll ask for the **service role key** separately — not yet.

## 2. Supabase client setup

- `src/integrations/supabase/client.ts` — browser client (publishable key, session persisted in localStorage, RLS enforced).
- `src/integrations/supabase/types.ts` — generated Database types placeholder, updated as tables are added.
- Auth-middleware + bearer attacher so server functions can act as the signed-in user (`requireSupabaseAuth`), appended to the existing middleware in `src/start.ts`.

## 3. User accounts & login

- `/auth` page: sign-up and sign-in with email + password (email confirmation behavior follows your Supabase dashboard settings — you manage providers there since this is your own project).
- `profiles` table (SQL migration you run in your Supabase SQL editor, since this is an external project I can't migrate directly):
  - `id uuid references auth.users(id) on delete cascade`, `display_name`, `avatar_url`, timestamps
  - Trigger auto-creates a profile row on signup
  - RLS: users can read/update only their own profile; GRANTs included
- Protected area: `src/routes/_authenticated/` layout (client-side gate redirecting to `/auth`) with a starter `/account` page showing the signed-in user's profile.
- Header sign-in affordance reflects session state: "Sign in" when logged out, account menu with sign-out when logged in. Sign-out clears cached data and returns home.
- Root `onAuthStateChange` listener (filtered to sign-in/sign-out) to keep the router and caches fresh.

## 4. Content storage

- Connection and client are ready for content tables (testimonials, blog, resources). I'll hold off creating them until you tell me which content should move into Supabase — that's a follow-up step.

## 5. What stays the same

- The three forms keep posting to your Make.com webhook as they do now.
- All existing pages, design, and navigation are untouched except the header gaining the sign-in control.

## Technical notes

- External Supabase = `external_unmanaged`: I can't run migrations or mint test sessions for you; you'll run the provided SQL in your dashboard and can create a test user there or via the new `/auth` page.
- Email/password provider must be enabled in your Supabase dashboard (Authentication → Providers → Email) — it is on by default for new projects.
- Every new table gets GRANT + RLS policies in the same SQL block.
