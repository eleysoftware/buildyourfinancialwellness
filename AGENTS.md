<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Newsletters live in the Supabase `newsletters` table (public reads of published rows via browser client); `src/lib/newsletters.ts` falls back to built-in launch issues if the table is unreachable. Why: pages keep working before the owner runs the setup SQL.
- Admin access uses `user_roles` + `has_role()` RPC (`useIsAdmin`); admin pages live under `_authenticated/admin.*`. Why: roles must never live on profiles or client storage.

- Media lives as real files in `src/assets/` (imported by Vite) or `public/` (stable public URLs); do not use Lovable `.asset.json` pointers. Why: the app must render its media on any host (local, Vercel, Lovable).
