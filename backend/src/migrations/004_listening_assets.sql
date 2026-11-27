CREATE TABLE listening_assets (
 recording_id text PRIMARY KEY REFERENCES recordings(id),
 object_key text NOT NULL UNIQUE CHECK (length(object_key) BETWEEN 1 AND 512),
 mime_type text NOT NULL CHECK (mime_type IN ('audio/mpeg','audio/mp4','audio/ogg','audio/webm')),
 enabled boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
