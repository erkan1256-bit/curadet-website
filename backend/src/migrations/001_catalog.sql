CREATE TABLE works (
 id text PRIMARY KEY, title text NOT NULL CHECK (length(trim(title)) > 0),
 language text, contributors jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(contributors) = 'array'),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 version integer NOT NULL DEFAULT 1 CHECK (version > 0)
);
CREATE TABLE recordings (
 id text PRIMARY KEY, work_id text NOT NULL REFERENCES works(id),
 source_class text NOT NULL CHECK (source_class IN ('curadet_original','client_original','co_production','licensed_or_external')),
 master_asset_id text, duration_ms integer CHECK (duration_ms > 0),
 contributors jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(contributors) = 'array'),
 rights_state text NOT NULL DEFAULT 'draft' CHECK (rights_state IN ('draft','hold','cleared','blocked')),
 provenance_state text NOT NULL DEFAULT 'draft' CHECK (provenance_state IN ('draft','verified','blocked')),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 version integer NOT NULL DEFAULT 1 CHECK (version > 0)
);
CREATE TABLE releases (
 id text PRIMARY KEY, title text NOT NULL CHECK (length(trim(title)) > 0),
 publication_state text NOT NULL DEFAULT 'draft' CHECK (publication_state IN ('draft','qc_passed','rights_cleared','metadata_ready','scheduled','published','paused','withdrawn')),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 version integer NOT NULL DEFAULT 1 CHECK (version > 0)
);
CREATE TABLE release_recordings (
 release_id text REFERENCES releases(id), recording_id text REFERENCES recordings(id),
 PRIMARY KEY (release_id, recording_id)
);
CREATE TABLE catalog_entries (
 id text PRIMARY KEY, release_id text NOT NULL, recording_id text NOT NULL,
 visible boolean NOT NULL DEFAULT false, available_from timestamptz, available_until timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 version integer NOT NULL DEFAULT 1 CHECK (version > 0),
 FOREIGN KEY (release_id,recording_id) REFERENCES release_recordings(release_id,recording_id),
 CHECK (available_until IS NULL OR available_from IS NULL OR available_until > available_from),
 UNIQUE (release_id,recording_id)
);
CREATE INDEX recordings_work_idx ON recordings(work_id);
CREATE VIEW public_catalog AS
 SELECT c.id,c.release_id,c.recording_id,w.title AS work_title,r.title AS release_title,w.language
 FROM catalog_entries c JOIN recordings rec ON rec.id=c.recording_id
 JOIN works w ON w.id=rec.work_id JOIN releases r ON r.id=c.release_id
 WHERE c.visible AND r.publication_state='published' AND rec.rights_state='cleared'
 AND rec.provenance_state='verified'
 AND (c.available_from IS NULL OR c.available_from <= now())
 AND (c.available_until IS NULL OR c.available_until > now());
