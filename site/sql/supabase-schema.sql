create table if not exists app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key,
  created_at timestamptz not null default now(),
  customer_name text,
  customer_phone text,
  customer_email text,
  target_score text,
  courses jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  receipt_name text,
  recommendation jsonb,
  quiz_summary jsonb,
  telegram jsonb,
  channel text default 'website'
);

create table if not exists quiz_results (
  id uuid primary key,
  created_at timestamptz not null default now(),
  customer_name text,
  summary jsonb not null,
  recommendation jsonb,
  meta jsonb
);
