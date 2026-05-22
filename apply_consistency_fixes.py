from pathlib import Path

root = Path('/home/ubuntu/western-public-academy-work')

# Keep address consistent with the rest of the site and footer.
for p in (root / 'client/src').rglob('*.tsx'):
    s = p.read_text()
    s2 = s.replace('Bheemdatt-2, Kanchanpur', 'Bheemdatt-18, Katan, Kanchanpur')
    s2 = s2.replace('Bheemdatt-2, Kanchanpur, Nepal', 'Bheemdatt-18, Katan, Kanchanpur, Nepal')
    if s2 != s:
        p.write_text(s2)

# Avoid displaying a fake clickable telephone number in persistent navigation/footer.
def replace_exact(path, old, new):
    p = root / path
    s = p.read_text()
    if old not in s:
        raise SystemExit(f'Pattern not found in {path}')
    p.write_text(s.replace(old, new))

replace_exact('client/src/components/SiteHeader.tsx',
'''              <a href="tel:099000000" className="inline-flex items-center gap-1.5">
                <Phone size={11} style={{ color: "var(--color-brass-deep)" }} />
                099-000-000
              </a>''',
'''              <span className="inline-flex items-center gap-1.5">
                <Phone size={11} style={{ color: "var(--color-brass-deep)" }} />
                Contact office
              </span>''')

replace_exact('client/src/components/SiteFooter.tsx',
'''              <li className="flex items-center gap-2.5" style={{ color: "rgba(247,241,229,0.82)" }}>
                <Phone size={15} className="shrink-0" style={{ color: "var(--color-brass)" }} />
                <span>099-000-000</span>
              </li>''',
'''              <li className="flex items-center gap-2.5" style={{ color: "rgba(247,241,229,0.82)" }}>
                <Phone size={15} className="shrink-0" style={{ color: "var(--color-brass)" }} />
                <span>Contact office for current phone details</span>
              </li>''')

print('Consistency fixes applied.')
