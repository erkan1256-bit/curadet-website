ALTER TABLE subscriptions ADD COLUMN event_sequence bigint NOT NULL DEFAULT 0 CHECK (event_sequence >= 0);
CREATE TABLE subscription_events (
 provider text NOT NULL, event_id text NOT NULL,
 subscription_id text NOT NULL REFERENCES subscriptions(id),
 sequence bigint NOT NULL CHECK (sequence > 0),
 state text NOT NULL CHECK (state IN ('active','past_due','cancelled','expired')),
 valid_until timestamptz,
 applied boolean NOT NULL DEFAULT false,
 received_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(provider,event_id),
 UNIQUE(subscription_id,sequence)
);
