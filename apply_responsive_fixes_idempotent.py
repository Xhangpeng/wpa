from pathlib import Path

root = Path('/home/ubuntu/western-public-academy-work')

def replace_if_needed(path, old, new, label):
    p = root / path
    s = p.read_text()
    if new in s:
        return False
    if old not in s:
        raise SystemExit(f'Neither old nor new pattern found for {label} in {path}')
    p.write_text(s.replace(old, new))
    return True

changes = 0

def r(path, old, new, label):
    global changes
    if replace_if_needed(path, old, new, label):
        changes += 1

# About remaining line.
r('client/src/pages/About.tsx',
'''<div className="display-serif text-[38px] lg:text-[50px]" style={{ color: "var(--color-parchment)", lineHeight: 1, letterSpacing: "-0.02em" }}>''',
'''<div className="display-serif text-[34px] sm:text-[38px] lg:text-[50px] break-words" style={{ color: "var(--color-parchment)", lineHeight: 1, letterSpacing: "-0.02em" }}>''',
'about stats text size')

# Programs page responsive improvements.
r('client/src/pages/Programs.tsx',
'''<section className="relative min-h-[82vh] flex items-center overflow-hidden">''',
'''<section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[82vh] flex items-center overflow-hidden">''',
'program hero min-height')
r('client/src/pages/Programs.tsx',
'''<div className="container relative z-10 pt-16 pb-20 lg:pt-24 lg:pb-24">''',
'''<div className="container relative z-10 pt-12 sm:pt-16 pb-16 sm:pb-20 lg:pt-24 lg:pb-24">''',
'program hero padding')
r('client/src/pages/Programs.tsx',
'''<div className="flex flex-wrap gap-2 mb-6">''',
'''<div className="flex flex-wrap gap-2 mb-6 max-w-full">''',
'program chips wrap')
r('client/src/pages/Programs.tsx',
'''className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-300"''',
'''className="rounded-full px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-all duration-300"''',
'program chips sizing')
r('client/src/pages/Programs.tsx',
'''<h1 className="display-serif text-[clamp(3.2rem,9vw,8.9rem)] leading-[0.94]"''',
'''<h1 className="display-serif text-[clamp(2.7rem,13vw,8.9rem)] leading-[0.96] sm:leading-[0.94]"''',
'program hero title')
r('client/src/pages/Programs.tsx',
'''className="img-zoom w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover"''',
'''className="img-zoom w-full h-[260px] min-[420px]:h-[320px] sm:h-[420px] lg:h-[520px] object-cover"''',
'program media height')
r('client/src/pages/Programs.tsx',
'''<div className="absolute left-5 bottom-5 right-5 rounded-xl p-4 backdrop-blur-md"''',
'''<div className="absolute left-3 bottom-3 right-3 sm:left-5 sm:bottom-5 sm:right-5 rounded-xl p-3 sm:p-4 backdrop-blur-md"''',
'program overlay position')
r('client/src/pages/Programs.tsx',
'''<div className="flex items-start gap-3">''',
'''<div className="flex items-start gap-2.5 sm:gap-3">''',
'program overlay gap')
r('client/src/pages/Programs.tsx',
'''<div className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center"''',
'''<div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full flex items-center justify-center"''',
'program overlay icon')
r('client/src/pages/Programs.tsx',
'''<p className="mt-1 text-sm leading-relaxed"''',
'''<p className="mt-1 text-[12.5px] sm:text-sm leading-relaxed"''',
'program overlay copy')
r('client/src/pages/Programs.tsx',
'''<section key={stream.id} id={stream.id} className="scroll-mt-28 py-16 lg:py-24"''',
'''<section key={stream.id} id={stream.id} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 lg:py-24"''',
'program section offset')
r('client/src/pages/Programs.tsx',
'''<div className="flex items-center gap-3 mb-5">''',
'''<div className="flex items-start sm:items-center gap-3 mb-5">''',
'program heading row')
r('client/src/pages/Programs.tsx',
'''<a href="/contact" className="pill-btn inline-flex items-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase"''',
'''<a href="/contact" className="pill-btn inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase"''',
'program cta')

# Contact page responsive improvements.
r('client/src/pages/Contact.tsx',
'''<div className="relative container py-16 sm:py-20 lg:py-24">''',
'''<div className="relative container py-14 sm:py-20 lg:py-24">''',
'contact hero padding')
r('client/src/pages/Contact.tsx',
'''className="display-serif mt-5 text-[32px] sm:text-[40px] lg:text-[52px]"''',
'''className="display-serif mt-5 text-[clamp(2.4rem,11vw,3.25rem)] sm:text-[40px] lg:text-[52px]"''',
'contact title')
r('client/src/pages/Contact.tsx',
'''<div className="flex justify-between text-[12px]">''',
'''<div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-[12px]">''',
'contact office row')
r('client/src/pages/Contact.tsx',
'''<div className="col-span-12 lg:col-span-7 lg:col-start-6 reveal">''',
'''<div className="col-span-12 lg:col-span-8 xl:col-span-7 lg:col-start-5 xl:col-start-6 reveal">''',
'contact info cards width')
r('client/src/pages/Contact.tsx',
'''<div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal">''',
'''<div className="col-span-12 lg:col-span-7 lg:col-start-6 reveal">''',
'contact form width')
r('client/src/pages/Contact.tsx',
'''className="editorial-card p-6 sm:p-8"''',
'''className="editorial-card p-5 sm:p-8"''',
'contact form padding')
r('client/src/pages/Contact.tsx',
'''<div className="mt-5 flex items-center gap-3">''',
'''<div className="mt-5 flex items-start gap-3">''',
'contact map address alignment')
r('client/src/pages/Contact.tsx',
'''height="360"''',
'''height="360"
                className="min-h-[280px] sm:min-h-[360px]"''',
'contact map height class')

# Global CSS hardening.
p = root / 'client/src/index.css'
s = p.read_text()
insert = r'''

  /* Device-wide responsive hardening added during continuation pass */
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { min-width: 0; }
  a, button, input, select, textarea { -webkit-tap-highlight-color: transparent; }
  input, select, textarea { max-width: 100%; min-width: 0; }
  iframe, svg, video, canvas { max-width: 100%; }
  section { overflow-wrap: anywhere; }
  .container > *, .editorial-card, .soft-frame { min-width: 0; }

  @media (max-width: 639px) {
    .container {
      padding-left: clamp(0.875rem, 4vw, 1rem);
      padding-right: clamp(0.875rem, 4vw, 1rem);
    }
    .h-display { font-size: clamp(2.2rem, 13vw, 3.8rem); line-height: 1; }
    .h-section { font-size: clamp(1.85rem, 10vw, 2.8rem); line-height: 1.05; }
    .gold-rule {
      gap: 0.55rem;
      letter-spacing: 0.16em;
      line-height: 1.35;
    }
    .gold-rule::before { width: 1.65rem; flex: 0 0 auto; }
    .editorial-card:hover { transform: none; }
    .marquee-track { gap: 1.5rem; padding-right: 1.5rem; }
    .pill-btn, .ghost-btn { min-height: 44px; }
  }

  @media (max-width: 359px) {
    .container { padding-left: 0.75rem; padding-right: 0.75rem; }
    .display-serif { letter-spacing: -0.018em; }
    .gold-rule { font-size: 0.64rem; letter-spacing: 0.12em; }
  }
'''
marker = '''  /* Reduced motion */'''
if insert.strip() not in s:
    if marker not in s:
        raise SystemExit('Reduced motion marker not found in CSS')
    s = s.replace(marker, insert + '\n\n' + marker)
    p.write_text(s)
    changes += 1

print(f'Idempotent responsive fixes complete. Newly applied changes: {changes}')
