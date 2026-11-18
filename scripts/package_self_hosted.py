#!/usr/bin/env python3
"""Build a portable public-only deployment. Never ship repository/private backend files."""
from pathlib import Path
import argparse, hashlib, json, shutil, subprocess, tarfile

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {'.html', '.css', '.js', '.svg', '.webp', '.png', '.jpg', '.jpeg', '.ico', '.webmanifest', '.xml', '.txt', '.woff', '.woff2'}

def build(destination):
    destination = destination.resolve()
    if destination.exists():
        raise SystemExit('Destination already exists; choose a new release directory.')
    if destination == ROOT or ROOT in destination.parents:
        raise SystemExit('Release must be outside the source repository.')
    destination.mkdir(parents=True)
    public = destination / 'public'
    public.mkdir()
    sources = [p for p in ROOT.iterdir() if p.is_file() and p.suffix in EXTENSIONS]
    sources += [p for p in (ROOT / 'assets').rglob('*') if p.is_file() and p.suffix in EXTENSIONS]
    checksums = {}
    for source in sources:
        if source.is_symlink():
            raise SystemExit(f'Symlinks are not allowed: {source}')
        relative = source.relative_to(ROOT)
        target = public / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
        checksums[str(relative)] = hashlib.sha256(target.read_bytes()).hexdigest()
    for name in ['compose.yml', 'Caddyfile', 'start.sh', 'README.md']:
        shutil.copyfile(ROOT / 'deploy/self-hosted' / name, destination / name)
    (destination / 'start.sh').chmod(0o755)
    revision = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    (destination / 'release.json').write_text(json.dumps({'source_commit': revision, 'domain': 'curadet.com', 'sha256': checksums}, indent=2) + '\n')
    archive = destination.with_suffix('.tar.gz')
    if archive.exists():
        raise SystemExit('Archive already exists.')
    with tarfile.open(archive, 'w:gz') as tar:
        tar.add(destination, arcname=destination.name)
    return archive, len(checksums)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('destination', type=Path)
    archive, count = build(parser.parse_args().destination)
    print(json.dumps({'archive': str(archive), 'public_files': count}))
