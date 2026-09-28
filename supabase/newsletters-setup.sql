-- Build Financial Wellness — Newsletter Module (Phase 4)
-- Run once in Supabase Dashboard → SQL Editor. Safe to re-run.

-- 1. Admin roles (kept separate from profiles) -------------------------------
do $$ begin
  create type public.app_role as enum ('admin', 'moderator', 'user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "Users can read own roles" on public.user_roles;
create policy "Users can read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;

-- 2. Newsletters table -------------------------------------------------------
create table if not exists public.newsletters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  issue_year int not null check (issue_year between 2000 and 2100),
  issue_month int not null check (issue_month between 1 and 12),
  thumbnail_url text,
  pdf_url text,
  author_name text not null default 'TaMara West',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.newsletters to anon, authenticated;
grant insert, update, delete on public.newsletters to authenticated;
grant all on public.newsletters to service_role;
alter table public.newsletters enable row level security;

drop policy if exists "Anyone can read published newsletters" on public.newsletters;
create policy "Anyone can read published newsletters" on public.newsletters
  for select to anon, authenticated using (published = true);

drop policy if exists "Admins manage newsletters" on public.newsletters;
create policy "Admins manage newsletters" on public.newsletters
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
drop trigger if exists newsletters_touch on public.newsletters;
create trigger newsletters_touch before update on public.newsletters
  for each row execute function public.touch_updated_at();

-- 3. File storage for newsletter PDFs and thumbnails ------------------------
insert into storage.buckets (id, name, public)
values ('newsletters', 'newsletters', true)
on conflict (id) do nothing;

drop policy if exists "Public read newsletter files" on storage.objects;
create policy "Public read newsletter files" on storage.objects
  for select using (bucket_id = 'newsletters');

drop policy if exists "Admins write newsletter files" on storage.objects;
create policy "Admins write newsletter files" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'newsletters' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins update newsletter files" on storage.objects;
create policy "Admins update newsletter files" on storage.objects
  for update to authenticated
  using (bucket_id = 'newsletters' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins delete newsletter files" on storage.objects;
create policy "Admins delete newsletter files" on storage.objects
  for delete to authenticated
  using (bucket_id = 'newsletters' and public.has_role(auth.uid(), 'admin'));

-- 4. Launch issues -----------------------------------------------------------
insert into public.newsletters (slug, title, excerpt, issue_year, issue_month, thumbnail_url, pdf_url, published) values
('september-2026-a-more-manageable-way-to-tackle-debt',
 'September 2026 - A More Manageable Way to Tackle Debt',
 'Debt can make it feel like you should be doing more. Discover a steadier, more manageable approach that helps your efforts add up.',
 2026, 9,
 '/__l5e/assets-v1/ed9401b0-92be-43db-acbb-5280e2e1cc10/newsletter-september-2026.jpg',
 '/__l5e/assets-v1/a394e9a1-6bc3-47f6-9ce1-1ef424603521/financially-well-september-2026.pdf', true),
('august-2026-find-your-financial-rhythm-again',
 'August 2026 - Find Your Financial Rhythm Again',
 'As summer winds down and routines return, reconnect with the simple habits that help your money feel in step again.',
 2026, 8,
 '/__l5e/assets-v1/9ff12ee9-8979-42e9-8741-59a75922ba60/newsletter-august-2026.jpg',
 '/__l5e/assets-v1/538eec34-d805-46fc-b5d0-39f447a1faa5/financially-well-august-2026.pdf', true),
('july-2026-where-does-your-paycheck-go',
 'July 2026 - Where Does Your Paycheck Go?',
 'Financial confidence doesn''t always start with earning more. Sometimes it starts with understanding how your money moves through your life.',
 2026, 7,
 '/__l5e/assets-v1/3c707268-29f6-44f1-9fc3-8d6d7cf4e236/newsletter-july-2026.jpg',
 '/__l5e/assets-v1/71f60be2-3d3c-4a8e-828b-a0a1843a43fb/financially-well-july-2026.pdf', true)
on conflict (slug) do nothing;

-- 5. Make yourself an admin (sign up on the site first, then edit the email) --
-- insert into public.user_roles (user_id, role)
-- select id, 'admin' from auth.users where email = 'you@example.com'
-- on conflict do nothing;
