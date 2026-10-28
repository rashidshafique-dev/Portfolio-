import { createClient } from '@supabase/supabase-js';

// Supabase Connection Configuration
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://pktmigbdhxpnzmsgtnwr.supabase.co';

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_FyYT1XEozrhB29iT14aVxw_AKYyEETL';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
};

export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export const SUPABASE_SQL_SETUP = `-- 1. Create the portfolio visits telemetry table
create table if not exists public.portfolio_visits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  path text not null,
  page_title text,
  referrer text,
  device text,
  browser text,
  os text,
  country text,
  country_flag text,
  session_id text,
  duration_seconds integer default 30
);

-- 2. Create index for fast date filtering
create index if not exists idx_portfolio_visits_created_at on public.portfolio_visits (created_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.portfolio_visits enable row level security;

-- 4. Allow public visitors to insert pageviews without authentication
drop policy if exists "Allow public visitors to insert telemetry" on public.portfolio_visits;
create policy "Allow public visitors to insert telemetry"
  on public.portfolio_visits
  for insert
  to anon, authenticated
  with check (true);

-- 5. Allow reading telemetry data
drop policy if exists "Allow reading telemetry" on public.portfolio_visits;
create policy "Allow reading telemetry"
  on public.portfolio_visits
  for select
  to anon, authenticated
  using (true);
`;
