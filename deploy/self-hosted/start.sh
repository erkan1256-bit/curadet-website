#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
command -v docker >/dev/null 2>&1 || { echo 'Docker Engine ve Compose gereklidir.' >&2; exit 1; }
[ -f public/index.html ] || { echo 'public/index.html bulunamadı. Önce yayın paketini hazırlayın.' >&2; exit 1; }
docker compose config --quiet
docker compose run --rm --no-deps web caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker compose up -d
