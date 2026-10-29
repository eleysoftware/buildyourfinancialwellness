-- Build Financial Wellness — Savings Reset Kit (Phase 6)
-- Run once in Supabase Dashboard → SQL Editor. Safe to re-run.
-- Requires newsletters-setup.sql first (app_role, user_roles, has_role, touch_updated_at).

create table if not exists public.savings_reset_kit (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Savings Reset Kit',
  pdf_url text,
  updated_at timestamptz not null default now()
);
grant select on public.savings_reset_kit to anon, authenticated;
grant insert, update, delete on public.savings_reset_kit to authenticated;
grant all on public.savings_reset_kit to service_role;
alter table public.savings_reset_kit enable row level security;

drop policy if exists "Anyone can read the Savings Reset Kit" on public.savings_reset_kit;
create policy "Anyone can read the Savings Reset Kit" on public.savings_reset_kit
  for select to anon, authenticated using (true);

drop policy if exists "Admins manage the Savings Reset Kit" on public.savings_reset_kit;
create policy "Admins manage the Savings Reset Kit" on public.savings_reset_kit
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists savings_reset_kit_touch on public.savings_reset_kit;
create trigger savings_reset_kit_touch before update on public.savings_reset_kit
  for each row execute function public.touch_updated_at();

insert into storage.buckets (id, name, public)
values ('savings-reset-kit', 'savings-reset-kit', true)
on conflict (id) do nothing;

drop policy if exists "Public read Savings Reset Kit files" on storage.objects;
create policy "Public read Savings Reset Kit files" on storage.objects
  for select using (bucket_id = 'savings-reset-kit');

drop policy if exists "Admins write Savings Reset Kit files" on storage.objects;
create policy "Admins write Savings Reset Kit files" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'savings-reset-kit' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins update Savings Reset Kit files" on storage.objects;
create policy "Admins update Savings Reset Kit files" on storage.objects
  for update to authenticated
  using (bucket_id = 'savings-reset-kit' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins delete Savings Reset Kit files" on storage.objects;
create policy "Admins delete Savings Reset Kit files" on storage.objects
  for delete to authenticated
  using (bucket_id = 'savings-reset-kit' and public.has_role(auth.uid(), 'admin'));

insert into public.savings_reset_kit (title, pdf_url)
select 'Savings Reset Kit', '/kits/savings-reset-kit.pdf'
where not exists (select 1 from public.savings_reset_kit);
