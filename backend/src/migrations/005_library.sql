CREATE TABLE favorites (
 user_id text REFERENCES accounts(id), catalog_id text REFERENCES catalog_entries(id),
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,catalog_id)
);
CREATE TABLE listening_history (
 user_id text REFERENCES accounts(id), catalog_id text REFERENCES catalog_entries(id),
 last_played_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,catalog_id)
);
