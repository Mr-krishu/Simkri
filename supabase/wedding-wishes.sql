-- Run once in Supabase Dashboard > SQL Editor.
-- The only publicly callable operations are the read-count and add-one RPCs.
-- Do not publish the database connection string or any secret/service_role key.

create table if not exists public.wedding_wish_counts (
  id text primary key,
  wish_count bigint not null default 0 check (wish_count >= 0)
);

alter table public.wedding_wish_counts enable row level security;
revoke all on table public.wedding_wish_counts from public, anon, authenticated;

insert into public.wedding_wish_counts (id, wish_count)
values ('simran-krishna-2026', 0)
on conflict (id) do nothing;

create or replace function public.get_wedding_wishes()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select c.wish_count
    from public.wedding_wish_counts as c
    where c.id = 'simran-krishna-2026'
  ), 0)::bigint;
$$;

create or replace function public.release_wedding_lantern()
returns bigint
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  new_total bigint;
begin
  update public.wedding_wish_counts
  set wish_count = wish_count + 1
  where id = 'simran-krishna-2026'
  returning wish_count into new_total;

  if new_total is null then
    raise exception 'Wedding wish counter has not been initialized';
  end if;

  return new_total;
end;
$$;

-- Anonymous guests can only call these two fixed-purpose functions.
revoke all on function public.get_wedding_wishes() from public, anon, authenticated;
revoke all on function public.release_wedding_lantern() from public, anon, authenticated;
grant execute on function public.get_wedding_wishes() to anon, authenticated;
grant execute on function public.release_wedding_lantern() to anon, authenticated;

-- Note: public buttons are not abuse-proof. For strict one-wish-per-person
-- limits, add authentication or a server-side rate-limited endpoint.
