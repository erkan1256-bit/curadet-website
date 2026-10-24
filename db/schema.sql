-- CURADET core relational model (PostgreSQL-oriented)
create extension if not exists pgcrypto;

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  display_name text,
  status text not null default 'ACTIVE',
  silent_client boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  codename text,
  title text,
  brief_encrypted text,
  state text not null check (state in ('BRIEFED','ACCEPTED','PRODUCTION','PREVIEW','REVISION','APPROVED','LOCKED','DELIVERED')),
  confidentiality_level text not null default 'PRIVATE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table works (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  title text,
  work_type text not null,
  rights_status text not null default 'PENDING',
  public_catalog boolean not null default false,
  exclusive boolean not null default false,
  created_at timestamptz not null default now()
);

create table assets (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references works(id),
  asset_type text not null,
  storage_key text not null unique,
  sha256 text not null,
  mime_type text not null,
  bytes bigint,
  version integer not null default 1,
  private boolean not null default true,
  created_at timestamptz not null default now()
);

create table license_templates (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  version integer not null,
  body_hash text not null,
  terms_json jsonb not null,
  created_at timestamptz not null default now(),
  unique(code, version)
);

create table licenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  work_id uuid not null references works(id),
  template_id uuid not null references license_templates(id),
  state text not null check (state in ('DRAFT','APPROVED','ACTIVE','EXPIRED','TERMINATED','SUPERSEDED')),
  territory text,
  media_scope jsonb,
  starts_at timestamptz,
  ends_at timestamptz,
  exclusive boolean not null default false,
  accepted_at timestamptz,
  acceptance_ip_hash text,
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  project_id uuid references projects(id),
  work_id uuid references works(id),
  license_id uuid references licenses(id),
  state text not null check (state in ('DRAFT','AWAITING_CONTRACT','AWAITING_PAYMENT','PAID','IN_PRODUCTION','READY','DELIVERED','COMPLETED','CANCELLED','REFUNDED','DISPUTED')),
  currency char(3) not null,
  amount_minor bigint not null check (amount_minor >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id),
  provider text not null,
  provider_reference text not null,
  idempotency_key text not null unique,
  state text not null,
  amount_minor bigint not null,
  currency char(3) not null,
  created_at timestamptz not null default now(),
  unique(provider, provider_reference)
);

create table entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  order_id uuid not null references orders(id),
  license_id uuid not null references licenses(id),
  state text not null check (state in ('ACTIVE','REVOKED','EXPIRED')),
  created_at timestamptz not null default now(),
  unique(user_id, order_id, license_id)
);

create table exclusive_locks (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null unique references works(id),
  owner_user_id uuid not null references users(id),
  fingerprint_version text not null,
  fingerprint_ref text not null,
  similarity_threshold numeric(5,4) not null,
  state text not null check (state in ('PENDING','VERIFIED','PROTECTED','RETIRED')),
  protected_at timestamptz,
  created_at timestamptz not null default now()
);

create table delivery_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  asset_id uuid not null references assets(id),
  entitlement_id uuid not null references entitlements(id),
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  downloaded_at timestamptz,
  audit_ref text not null
);

create table audit_events (
  id bigserial primary key,
  actor_user_id uuid references users(id),
  event_type text not null,
  subject_type text not null,
  subject_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_projects_user on projects(user_id);
create index idx_orders_user on orders(user_id);
create index idx_licenses_user on licenses(user_id);
create index idx_entitlements_user on entitlements(user_id);
create index idx_audit_subject on audit_events(subject_type, subject_id);

-- Enforcement principles (implemented in service/database policy layer):
-- 1) a private asset download requires ACTIVE entitlement.
-- 2) an entitlement becomes ACTIVE only after verified payment/approved enterprise settlement and contract acceptance.
-- 3) exclusive locks prevent normal resale and trigger similarity checks on future productions.
-- 4) storage_key values must resolve only through private object storage; never public repository paths.
