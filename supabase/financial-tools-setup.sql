-- Build Financial Wellness — Financial Tools (Phase 5)
-- Run once in Supabase Dashboard → SQL Editor. Safe to re-run.
-- Requires newsletters-setup.sql first (app_role, user_roles, has_role).

create table if not exists public.financial_tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  pdf_url text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.financial_tools to anon, authenticated;
grant insert, update, delete on public.financial_tools to authenticated;
grant all on public.financial_tools to service_role;
alter table public.financial_tools enable row level security;

drop policy if exists "Anyone can read published financial tools" on public.financial_tools;
create policy "Anyone can read published financial tools" on public.financial_tools
  for select to anon, authenticated using (published = true);

drop policy if exists "Admins manage financial tools" on public.financial_tools;
create policy "Admins manage financial tools" on public.financial_tools
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists financial_tools_touch on public.financial_tools;
create trigger financial_tools_touch before update on public.financial_tools
  for each row execute function public.touch_updated_at();

insert into storage.buckets (id, name, public)
values ('financial-tools', 'financial-tools', true)
on conflict (id) do nothing;

drop policy if exists "Public read financial tool files" on storage.objects;
create policy "Public read financial tool files" on storage.objects
  for select using (bucket_id = 'financial-tools');

drop policy if exists "Admins write financial tool files" on storage.objects;
create policy "Admins write financial tool files" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'financial-tools' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins update financial tool files" on storage.objects;
create policy "Admins update financial tool files" on storage.objects
  for update to authenticated
  using (bucket_id = 'financial-tools' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins delete financial tool files" on storage.objects;
create policy "Admins delete financial tool files" on storage.objects
  for delete to authenticated
  using (bucket_id = 'financial-tools' and public.has_role(auth.uid(), 'admin'));

insert into public.financial_tools (slug, title, pdf_url, published, sort_order) values
('50-30-20-budgeting-tool', '50/30/20 Budgeting Tool', '/tools/50-30-20-budgeting-tool.pdf', true, 1),
('pay-conversion-tool', 'Pay Conversion Tool', '/tools/pay-conversion-tool.pdf', true, 2),
('pay-yourself-first-planning-tool', 'Pay Yourself First Planning Tool', '/tools/pay-yourself-first-planning-tool.pdf', true, 3),
('zero-based-budgeting-tool', 'Zero-Based Budgeting Tool', '/tools/zero-based-budgeting-tool.pdf', true, 4)
on conflict (slug) do update set
  title = excluded.title,
  pdf_url = excluded.pdf_url,
  sort_order = excluded.sort_order;
