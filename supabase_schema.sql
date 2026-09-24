-- ============================================================================
-- Millenium Tech — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Safe to re-run: every object uses "if not exists" / "or replace" / drop-first.
--
-- What this sets up:
--   1. public.profiles     — one row per signed-up user (name, is_staff flag)
--   2. public.project_requests — the "get a free consultation" form data
--   3. Row Level Security so:
--        - anyone (including guests) can SUBMIT a request
--        - a logged-in customer can only see THEIR OWN past requests
--        - only staff (is_staff = true) can see/update everyone's requests
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. PROFILES  (extends Supabase's built-in auth.users with app-specific data)
-- ----------------------------------------------------------------------------

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text not null default '',
  email      text,
  is_staff   boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A security-definer helper so RLS policies can check "is this user
-- staff?" without re-triggering RLS on profiles itself (which would
-- otherwise recurse). Used throughout the policies below.
create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select is_staff from public.profiles where id = auth.uid()),
    false
  );
$$;

drop policy if exists "profiles_select_own_or_staff" on public.profiles;
create policy "profiles_select_own_or_staff"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_staff());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

grant select, update on public.profiles to authenticated;
-- No insert/delete grants for end users — profiles are created only by the
-- trigger below (as the table owner), never directly by a client.

-- Auto-create a profile row whenever someone signs up. The "name" passed
-- to supabase.auth.signUp({ options: { data: { name } } }) lands in
-- raw_user_meta_data, which is where we read it from here.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ----------------------------------------------------------------------------
-- 2. PROJECT REQUESTS
-- ----------------------------------------------------------------------------

create table if not exists public.project_requests (
  id                     bigint generated always as identity primary key,
  reference_number       text unique,

  -- contact
  name                   text not null,
  phone                  text not null,
  email                  text not null default '',
  organization           text not null default '',

  -- the request itself
  project_type text not null default 'OTHER'
    check (project_type in (
      'BUSINESS_WEBSITE', 'WEB_APPLICATION', 'SCHOOL_SYSTEM', 'CHURCH_SYSTEM',
      'ECOMMERCE', 'BRANDING_DESIGN', 'IT_SUPPORT', 'PRODUCT_IDEA', 'OTHER'
    )),
  problem_description    text not null,
  desired_solution       text not null default '',
  target_users           text not null default '',
  current_approach       text not null default '',
  budget_range           text not null default '',
  timeline               text not null default '',
  additional_information text not null default '',
  related_product        text not null default '',

  -- pipeline state — team-managed, a customer/guest can never set these
  status text not null default 'NEW'
    check (status in (
      'NEW', 'REVIEWING', 'DISCOVERY', 'PROPOSAL', 'APPROVED', 'BUILDING',
      'TESTING', 'LAUNCHED', 'SUPPORT', 'REJECTED', 'ARCHIVED'
    )),
  priority text not null default 'NORMAL'
    check (priority in ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
  assigned_to    uuid references auth.users (id) on delete set null,
  internal_notes text not null default '',

  -- who submitted it (null for guests — a login has never been required
  -- to send a request, only to look up your past ones afterwards)
  submitted_by uuid references auth.users (id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_requests_submitted_by_idx
  on public.project_requests (submitted_by);
create index if not exists project_requests_status_idx
  on public.project_requests (status);

-- Generates "MT-2026-0001" style reference numbers (resets each calendar
-- year) AND locks down every field a non-staff submitter must not be able
-- to set, regardless of what the client sends — mirroring what the old
-- Django serializer enforced server-side.
create or replace function public.project_requests_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  yr     text := to_char(now(), 'YYYY');
  prefix text := 'MT-' || yr || '-';
  next_seq int;
begin
  if new.reference_number is null or new.reference_number = '' then
    select coalesce(max(substring(reference_number from '(\d+)$')::int), 0) + 1
      into next_seq
      from public.project_requests
      where reference_number like prefix || '%';
    new.reference_number := prefix || lpad(next_seq::text, 4, '0');
  end if;

  -- Always force these, no matter what a client submitted:
  new.status := 'NEW';
  new.priority := 'NORMAL';
  new.assigned_to := null;
  new.internal_notes := '';
  new.submitted_by := auth.uid(); -- the logged-in submitter, or null for a guest

  return new;
end;
$$;

drop trigger if exists set_project_request_defaults on public.project_requests;
create trigger set_project_request_defaults
  before insert on public.project_requests
  for each row execute function public.project_requests_before_insert();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_requests_set_updated_at on public.project_requests;
create trigger project_requests_set_updated_at
  before update on public.project_requests
  for each row execute function public.set_updated_at();

alter table public.project_requests enable row level security;

-- Anyone — guest or logged in — may submit a request.
drop policy if exists "project_requests_insert_anyone" on public.project_requests;
create policy "project_requests_insert_anyone"
  on public.project_requests for insert
  to anon, authenticated
  with check (true);

-- A logged-in customer can only ever see their own requests; staff see all.
drop policy if exists "project_requests_select_own_or_staff" on public.project_requests;
create policy "project_requests_select_own_or_staff"
  on public.project_requests for select
  to authenticated
  using (submitted_by = auth.uid() or public.is_staff());

-- Only staff can update the pipeline (status, priority, assignment, notes).
drop policy if exists "project_requests_update_staff_only" on public.project_requests;
create policy "project_requests_update_staff_only"
  on public.project_requests for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

grant select, insert on public.project_requests to anon, authenticated;
grant update on public.project_requests to authenticated;


-- ----------------------------------------------------------------------------
-- 3. MAKE SOMEONE STAFF
-- ----------------------------------------------------------------------------
-- Run this manually (in the SQL Editor) after a team member has signed up
-- through the site once, so their profile row already exists:
--
--   update public.profiles set is_staff = true where email = 'someone@millenium-tech.co.tz';
