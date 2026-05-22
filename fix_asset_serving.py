from pathlib import Path
import shutil

root = Path('/home/ubuntu/western-public-academy-work')
source = root / 'public' / 'manus-storage'
target = root / 'client' / 'public' / 'manus-storage'
target.mkdir(parents=True, exist_ok=True)
for file in source.iterdir():
    if file.is_file():
        shutil.copy2(file, target / file.name)

remote = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663587492290/NsXtt4cmUZtJwZZjJdsACi/cs-classroom-8p5ChBxSDFNziZniRpq7bA.webp'
local = '/manus-storage/gallery-2_794d068d.jpg'
for p in (root / 'client/src').rglob('*.tsx'):
    s = p.read_text()
    if remote in s:
        p.write_text(s.replace(remote, local))

print(f'Copied {len(list(target.iterdir()))} assets to {target} and replaced remote classroom image references.')
