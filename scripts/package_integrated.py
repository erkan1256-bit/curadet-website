#!/usr/bin/env python3
"""Package tracked source, private backend and separate public web root."""
from pathlib import Path
import hashlib, json, subprocess, tempfile, zipfile, sys
ROOT=Path(__file__).resolve().parents[1]
EXT={'.html','.css','.js','.svg','.webp','.png','.jpg','.jpeg','.ico','.webmanifest','.xml','.txt','.woff','.woff2'}
def build(out):
    out=Path(out).resolve()
    if out.exists(): raise SystemExit('Choose a new output path')
    revision=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
    with tempfile.TemporaryDirectory() as tmp:
        archive=Path(tmp)/'tracked.zip'
        subprocess.run(['git','archive','--format=zip','-o',str(archive),revision],cwd=ROOT,check=True)
        with zipfile.ZipFile(archive) as source, zipfile.ZipFile(out,'x',zipfile.ZIP_DEFLATED) as target:
            manifest={}
            def add(path,data):
                info=zipfile.ZipInfo('CURADET/'+path)
                info.create_system=3
                info.external_attr=0o100644 << 16
                info.compress_type=zipfile.ZIP_DEFLATED
                target.writestr(info,data)
                manifest[path]=hashlib.sha256(data).hexdigest()
            for item in source.infolist():
                if item.is_dir(): continue
                p=Path(item.filename)
                if (item.external_attr >> 16)&0o170000 == 0o120000: raise ValueError('Symlink prohibited')
                if p.name=='.env' or p.name.startswith('.env.') or p.suffix in {'.pem','.key'}: raise ValueError('Secret-like path: '+str(p))
                data=source.read(item)
                add(p.as_posix(),data)
                if (len(p.parts)==1 or p.parts[0]=='assets') and p.suffix in EXT:
                    add('deploy/staging/public/'+p.as_posix(),data)
            info=zipfile.ZipInfo('CURADET/RELEASE.json')
            info.create_system=3
            info.external_attr=0o100644 << 16
            target.writestr(info,json.dumps({'commit':revision,'sha256':manifest,'status':'staging candidate; not live acceptance'},indent=2))
    with zipfile.ZipFile(out) as z:
        assert z.testzip() is None
        m=json.loads(z.read('CURADET/RELEASE.json'))
        for p,h in m['sha256'].items(): assert hashlib.sha256(z.read('CURADET/'+p)).hexdigest()==h
    print(out)
if __name__=='__main__': build(sys.argv[1])
