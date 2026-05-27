-- Run this in your Supabase project: SQL Editor → New Query → paste & run
-- Last updated: Razorpay payment integration added

create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null unique,
  password_hash text not null,
  saved_address jsonb,
  wishlist      text[] not null default '{}',
  created_at    timestamptz not null default now()
);

create table if not exists public.orders (
  id           text primary key default 'HV-' || upper(substring(gen_random_uuid()::text, 1, 8)),
  user_id      uuid references public.users(id) on delete set null, -- nullable for guest checkout
  guest_name   text,           -- set for guest orders (user_id is null)
  guest_email  text,           -- set for guest orders (user_id is null)
  items        jsonb not null,
  address      jsonb not null,
  total        integer not null,
  shipping     integer not null,
  status       text not null default 'confirmed' check (status in ('confirmed', 'dispatched', 'delivered')),
  placed_at    timestamptz not null default now()
);

-- Migration — run this if the orders table already exists with user_id NOT NULL:
alter table public.orders drop constraint if exists orders_user_id_fkey;
alter table public.orders alter column user_id drop not null;
alter table public.orders add constraint orders_user_id_fkey
  foreign key (user_id) references public.users(id) on delete set null;

-- Indexes for common lookups
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists users_email_idx on public.users(email);

-- Row Level Security: disable for service-role access (we use service role key server-side)
alter table public.users enable row level security;
alter table public.orders enable row level security;

-- Allow service role full access (service role bypasses RLS automatically)
-- No policies needed — your server uses the service role key which bypasses RLS

-- ─────────────────────────────────────────────────────────────────
-- Razorpay payment tables
-- Run these if you haven't already; safe to re-run (if not exists).
-- ─────────────────────────────────────────────────────────────────

-- Tracks each Razorpay order created server-side before the modal opens.
-- State machine: created → attempted → paid | failed
create table if not exists public.razorpay_orders (
  id                  text primary key,                    -- Razorpay order_id (order_xxx)
  hv_order_id         text references public.orders(id),  -- our HV-XXXXXXXX id, set after payment
  user_id             uuid references public.users(id) on delete set null,
  customer_name       text not null,
  customer_email      text not null,
  amount_paise        integer not null,                    -- amount in paise (INR × 100)
  currency            text not null default 'INR',
  receipt             text,
  status              text not null default 'created'
                        check (status in ('created', 'attempted', 'paid', 'failed')),
  cart_snapshot       jsonb not null,                      -- items+address at time of order creation
  razorpay_payment_id text,                                -- filled after capture
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Dedupe key on receipt so we never create two Razorpay orders for the same cart attempt
create unique index if not exists razorpay_orders_receipt_idx on public.razorpay_orders(receipt)
  where receipt is not null;

create index if not exists razorpay_orders_user_idx on public.razorpay_orders(user_id);
create index if not exists razorpay_orders_hv_idx   on public.razorpay_orders(hv_order_id);

-- Append-only event log for all Razorpay webhook payloads.
-- event_id is the Razorpay idempotency key — duplicate events are ignored.
create table if not exists public.payment_events (
  id                  bigserial primary key,
  event_id            text unique not null,               -- Razorpay X-Razorpay-Event-Id header
  event_type          text not null,                      -- e.g. payment.captured
  razorpay_order_id   text,
  razorpay_payment_id text,
  payload             jsonb not null,
  processed_at        timestamptz not null default now()
);

alter table public.razorpay_orders enable row level security;
alter table public.payment_events   enable row level security;

-- ─────────────────────────────────────────────────────────────────
-- OTP email verification — pending signups
-- Rows are created when a user submits the signup form.
-- Deleted atomically on successful OTP verification.
-- Expired rows are cleaned up by the nightly cron (or manually).
-- ─────────────────────────────────────────────────────────────────
create table if not exists public.pending_signups (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  name          text not null,
  password_hash text not null,
  otp_hash      text not null,       -- SHA-256 hex of the 6-digit OTP; never stored raw
  attempts      int  not null default 0,
  expires_at    timestamptz not null,
  created_at    timestamptz not null default now()
);

-- One pending row per email at a time — upsert replaces the old one on resend
create unique index if not exists pending_signups_email_idx on public.pending_signups(email);

alter table public.pending_signups enable row level security;
