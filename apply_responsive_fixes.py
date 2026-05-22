from pathlib import Path

root = Path('/home/ubuntu/western-public-academy-work')

def replace(path, old, new):
    p = root / path
    s = p.read_text()
    if old not in s:
        raise SystemExit(f'Pattern not found in {path}: {old[:120]!r}')
    p.write_text(s.replace(old, new))

# Header: make all visible nav items resolve to implemented pages, improve logo sizing, drawer width, and mobile submenu links.
replace('client/src/components/SiteHeader.tsx',
'''  { label: "Gallery", href: "/gallery" },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Admission", href: "/academics/admission" },
      { label: "Notices", href: "/academics/notices" },
    ],
  },''',
'''  { label: "Notices", href: "/academics/notices" },''')
replace('client/src/components/SiteHeader.tsx',
'''                width: 52,
                height: 52,''',
'''                width: "clamp(42px, 12vw, 52px)",
                height: "clamp(42px, 12vw, 52px)",''')
replace('client/src/components/SiteHeader.tsx',
'''                className="display-serif text-[15px] sm:text-[17px] lg:text-[20px] xl:text-[22px] whitespace-nowrap"''',
'''                className="display-serif text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] lg:text-[20px] xl:text-[22px] whitespace-nowrap"''')
replace('client/src/components/SiteHeader.tsx',
'''                className="text-[8.5px] sm:text-[9.5px] lg:text-[10.5px] uppercase mt-0.5 whitespace-nowrap"''',
'''                className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[9.5px] lg:text-[10.5px] uppercase mt-0.5 whitespace-nowrap"''')
replace('client/src/components/SiteHeader.tsx',
'''            width: "min(86vw, 380px)",''',
'''            width: "min(92vw, 400px)",
            maxWidth: "100vw",''')
replace('client/src/components/SiteHeader.tsx',
'''              className="mt-3 flex items-center justify-center gap-4 text-[11px]"''',
'''              className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]"''')

# About: reduce mobile vertical pressure, avoid tiny two-column stat overflow, make buttons and cards friendlier on phones.
replace('client/src/pages/About.tsx',
'''      <div className="relative container pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 min-h-[620px] flex items-end">''',
'''      <div className="relative container pt-10 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-28 min-h-[560px] sm:min-h-[620px] flex items-end">''')
replace('client/src/pages/About.tsx',
'''            <div className="mt-8 flex flex-wrap gap-3">''',
'''            <div className="mt-8 flex flex-col min-[420px]:flex-row flex-wrap gap-3">''')
replace('client/src/pages/About.tsx',
'''                className="pill-btn inline-flex items-center gap-3 px-6 py-3.5 text-[12.5px] font-semibold uppercase"''',
'''                className="pill-btn inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[12.5px] font-semibold uppercase"''')
replace('client/src/pages/About.tsx',
'''                className="ghost-btn inline-flex items-center gap-3 px-6 py-3.5 text-[12.5px] font-semibold uppercase"''',
'''                className="ghost-btn inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[12.5px] font-semibold uppercase"''')
replace('client/src/pages/About.tsx',
'''      <div className="container grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">''',
'''      <div className="container grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">''')
replace('client/src/pages/About.tsx',
'''              className={`reveal flex flex-col items-start ${index % 2 !== 0 ? 'border-l pl-5' : ''} lg:border-l-0 lg:pl-0 ${index !== 0 ? 'lg:border-l lg:pl-5' : ''}`}''',
'''              className={`reveal flex flex-col items-start min-[420px]:${index % 2 !== 0 ? 'border-l pl-5' : ''} lg:border-l-0 lg:pl-0 ${index !== 0 ? 'lg:border-l lg:pl-5' : ''}`}''')
replace('client/src/pages/About.tsx',
'''              <div className="display-serif text-[38px] lg:text-[50px]"''',
'''              <div className="display-serif text-[34px] sm:text-[38px] lg:text-[50px] break-words"''')

# Programs: improve hero sizing, chip wrapping, media heights, overlay cards, anchor offset, and CTA stacking.
replace('client/src/pages/Programs.tsx',
'''        <section className="relative min-h-[82vh] flex items-center overflow-hidden">''',
'''        <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[82vh] flex items-center overflow-hidden">''')
replace('client/src/pages/Programs.tsx',
'''          <div className="container relative z-10 pt-16 pb-20 lg:pt-24 lg:pb-24">''',
'''          <div className="container relative z-10 pt-12 sm:pt-16 pb-16 sm:pb-20 lg:pt-24 lg:pb-24">''')
replace('client/src/pages/Programs.tsx',
'''              <div className="flex flex-wrap gap-2 mb-6">''',
'''              <div className="flex flex-wrap gap-2 mb-6 max-w-full">''')
replace('client/src/pages/Programs.tsx',
'''                    className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-300"''',
'''                    className="rounded-full px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-all duration-300"''')
replace('client/src/pages/Programs.tsx',
'''              <h1 className="display-serif text-[clamp(3.2rem,9vw,8.9rem)] leading-[0.94]"''',
'''              <h1 className="display-serif text-[clamp(2.7rem,13vw,8.9rem)] leading-[0.96] sm:leading-[0.94]"''')
replace('client/src/pages/Programs.tsx',
'''            <img
          src={stream.image}
          alt={stream.imageAlt}
          className="img-zoom w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover"''',
'''            <img
          src={stream.image}
          alt={stream.imageAlt}
          className="img-zoom w-full h-[260px] min-[420px]:h-[320px] sm:h-[420px] lg:h-[520px] object-cover"''')
replace('client/src/pages/Programs.tsx',
'''        <div className="absolute left-5 bottom-5 right-5 rounded-xl p-4 backdrop-blur-md"''',
'''        <div className="absolute left-3 bottom-3 right-3 sm:left-5 sm:bottom-5 sm:right-5 rounded-xl p-3 sm:p-4 backdrop-blur-md"''')
replace('client/src/pages/Programs.tsx',
'''            <div className="flex items-start gap-3">''',
'''            <div className="flex items-start gap-2.5 sm:gap-3">''')
replace('client/src/pages/Programs.tsx',
'''              <div className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center"''',
'''              <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full flex items-center justify-center"''')
replace('client/src/pages/Programs.tsx',
'''              <p className="mt-1 text-sm leading-relaxed"''',
'''              <p className="mt-1 text-[12.5px] sm:text-sm leading-relaxed"''')
replace('client/src/pages/Programs.tsx',
'''            <section key={stream.id} id={stream.id} className="scroll-mt-28 py-16 lg:py-24"''',
'''            <section key={stream.id} id={stream.id} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 lg:py-24"''')
replace('client/src/pages/Programs.tsx',
'''                        <div className="flex items-center gap-3 mb-5">''',
'''                        <div className="flex items-start sm:items-center gap-3 mb-5">''')
replace('client/src/pages/Programs.tsx',
'''                <a href="/contact" className="pill-btn inline-flex items-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase"''',
'''                <a href="/contact" className="pill-btn inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase"''')

# Contact: more breathing room on mobile, prevent cramped rows and improve map/form touch layout.
replace('client/src/pages/Contact.tsx',
'''      <div className="relative container py-16 sm:py-20 lg:py-24">''',
'''      <div className="relative container py-14 sm:py-20 lg:py-24">''')
replace('client/src/pages/Contact.tsx',
'''              className="display-serif mt-5 text-[32px] sm:text-[40px] lg:text-[52px]"''',
'''              className="display-serif mt-5 text-[clamp(2.4rem,11vw,3.25rem)] sm:text-[40px] lg:text-[52px]"''')
replace('client/src/pages/Contact.tsx',
'''                <div className="flex justify-between text-[12px]">''',
'''                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-[12px]">''')
replace('client/src/pages/Contact.tsx',
'''                <div className="flex justify-between text-[12px]">''',
'''                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-[12px]">''')
replace('client/src/pages/Contact.tsx',
'''              <div className="col-span-12 lg:col-span-7 lg:col-start-6 reveal">''',
'''              <div className="col-span-12 lg:col-span-8 xl:col-span-7 lg:col-start-5 xl:col-start-6 reveal">''')
replace('client/src/pages/Contact.tsx',
'''              <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal">''',
'''              <div className="col-span-12 lg:col-span-7 lg:col-start-6 reveal">''')
replace('client/src/pages/Contact.tsx',
'''              className="editorial-card p-6 sm:p-8"''',
'''              className="editorial-card p-5 sm:p-8"''')
replace('client/src/pages/Contact.tsx',
'''                <div className="mt-5 flex items-center gap-3">''',
'''                <div className="mt-5 flex items-start gap-3">''')
replace('client/src/pages/Contact.tsx',
'''                  height="360"''',
'''                  height="360"
                className="min-h-[280px] sm:min-h-[360px]"''')

# Global CSS: device-wide fixes for overflow, touch targets, images/iframes, mobile typography and spacing.
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
    s = s.replace(marker, insert + '\n\n' + marker)
p.write_text(s)

print('Responsive fixes applied successfully.')
