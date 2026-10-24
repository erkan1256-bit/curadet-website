from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import sys

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {'.git', 'node_modules', 'backend'}

class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            value = attrs.get(key)
            if value:
                self.refs.append((key, value))

def local_target(source: Path, ref: str):
    if ref.startswith(('#', 'mailto:', 'tel:', 'data:', 'javascript:')):
        return None
    parsed = urlparse(ref)
    if parsed.scheme or parsed.netloc:
        return None
    path = parsed.path
    if not path:
        return None
    if path.startswith('/'):
        target = ROOT / path.lstrip('/')
    else:
        target = source.parent / path
    if path.endswith('/'):
        target = target / 'index.html'
    return target.resolve()

def main():
    failures = []
    html_files = [p for p in ROOT.rglob('*.html') if not any(part in SKIP_DIRS for part in p.parts)]
    if not html_files:
        failures.append('No HTML files found')
    for page in html_files:
        parser = RefParser()
        try:
            parser.feed(page.read_text(encoding='utf-8'))
        except Exception as exc:
            failures.append(f'{page.relative_to(ROOT)}: HTML parse/read error: {exc}')
            continue
        for kind, ref in parser.refs:
            target = local_target(page, ref)
            if target is not None and not target.exists():
                failures.append(f'{page.relative_to(ROOT)}: broken {kind} {ref}')
    required = ['index.html', 'styles.css', 'curadet-logo.svg', 'favicon.svg', 'site.webmanifest', 'CNAME']
    for name in required:
        if not (ROOT / name).exists():
            failures.append(f'Missing required site asset: {name}')
    cname = ROOT / 'CNAME'
    if cname.exists() and cname.read_text(encoding='utf-8').strip() != 'curadet.com':
        failures.append('CNAME must be exactly curadet.com')
    if failures:
        print('SITE QUALITY GATE: FAIL')
        for item in failures:
            print(f'- {item}')
        return 1
    print(f'SITE QUALITY GATE: PASS ({len(html_files)} HTML pages checked)')
    return 0

if __name__ == '__main__':
    sys.exit(main())
