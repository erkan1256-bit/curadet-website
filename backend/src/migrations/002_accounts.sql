CREATE TABLE accounts (
 id text PRIMARY KEY CHECK (length(id) BETWEEN 1 AND 256),
 enabled boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE subscriptions (
 id text PRIMARY KEY, user_id text NOT NULL REFERENCES accounts(id),
 plan_id text NOT NULL, state text NOT NULL DEFAULT 'pending'
 CHECK (state IN ('pending','active','grace','past_due','cancelled','expired')),
 provider_ref text UNIQUE, valid_until timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE entitlement_grants (
 id text PRIMARY KEY, user_id text NOT NULL REFERENCES accounts(id),
 scope text NOT NULL CHECK (scope IN ('listen','download','license','project')),
 resource_id text, valid_until timestamptz, revoked_at timestamptz,
 authority text NOT NULL CHECK (authority IN ('subscription','order','contract','owner_grant')),
 authority_id text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX entitlement_user_scope_idx ON entitlement_grants(user_id,scope);
CREATE INDEX subscription_user_idx ON subscriptions(user_id);
