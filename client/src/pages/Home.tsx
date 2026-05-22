/*
 * Western Public Academy — Home Page
 * Style: Himalayan Heritage editorial.
 * Sections (top → bottom):
 *  1. Hero (rotating background, asymmetric editorial composition)
 *  2. Welcome / mission
 *  3. Stats strip
 *  4. Why Choose Us — 6 editorial cards
 *  5. Programs (+2 streams)
 *  6. Beyond Classrooms (life at school)
 *  7. Leadership / Heads
 *  8. Gallery preview
 *  9. CTA — Apply
 */
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Compass,
  Hotel,
  Laptop,
  Quote,
  Trophy,
  Users,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

const HERO_BGS = [
  "/assets-images/background-img-1.jpg",
  "/assets-images/background-img-2.jpg",
  "/assets-images/background-img-3.jpg",
  "/assets-images/background-img-4.jpg",
];

const PROGRAMS = [
  {
    n: "01",
    eyebrow: "Hospitality",
    title: "Hotel Management",
    desc: "An applied program that blends classroom theory with kitchen, front-office, and service practice — opening doors across Nepal's growing tourism economy.",
    img: "/assets-images/hotel-management.png",
    icon: Hotel,
    href: "/programs/hotel-management",
  },
  {
    n: "02",
    eyebrow: "Computing",
    title: "Computer Science",
    desc: "Programming, digital systems, and computational thinking — equipping students for engineering, software, and data-driven futures.",
    img: "/assets-images/gallery-2.jpg",
    icon: Laptop,
    href: "/programs/computer-science",
  },
  {
    n: "03",
    eyebrow: "Athletics & Health",
    title: "Sports Science",
    desc: "Human performance, kinesiology, and athletic training — for students passionate about sport, fitness, and physical education leadership.",
    img: "/assets-images/sports-science.jpeg",
    icon: Trophy,
    href: "/programs/sports-science",
  },
  {
    n: "04",
    eyebrow: "Pedagogy",
    title: "Education",
    desc: "A reflective track for future teachers — child psychology, curriculum, and classroom practice rooted in Nepali educational realities.",
    img: "/assets-images/education-faculty.png",
    icon: BookOpen,
    href: "/programs/education",
  },
];

const FEATURES = [
  {
    Icon: Award,
    title: "PABSON Affiliation",
    body: "A trusted, nationally-recognised affiliation that signals our commitment to academic standards and ethical schooling.",
  },
  {
    Icon: Calendar,
    title: "Established 2066 B.S.",
    body: "Decades of patient teaching in Bheemdatt — generations of alumni now leading in business, healthcare, sport, and education.",
  },
  {
    Icon: Users,
    title: "Dedicated Faculty",
    body: "Teachers who know each student by name. Small cohorts, weekly mentor meetings, and an open-door staff room.",
  },
  {
    Icon: Compass,
    title: "Four Distinct Streams",
    body: "Four streams under +2 — Hotel Management, Computer Science, Sports Science, and Education — choice with purpose.",
  },
  {
    Icon: Briefcase,
    title: "Hands-On Learning",
    body: "Field visits, kitchen labs, computer studios, sports grounds — theory always meets practice on our campus.",
  },
  {
    Icon: Sparkles,
    title: "Vibrant Campus Life",
    body: "Picnics, cultural functions, sports days, and clubs — character grows alongside coursework, not after it.",
  },
];

const STATS = [
  { v: "2066", suffix: " B.S.", label: "Founded" },
  { v: "PABSON", label: "Affiliation" },
  { v: "4", suffix: "", label: "+2 Streams" },
  { v: "1500", suffix: "+", label: "Alumni & Students" },
];

const GALLERY = [
  "/assets-images/gallery-1.jpg",       // 0 - 4x2 hero (people in lawn)
  "/assets-images/gallery-5.jpg",       // 1 - 2x1
  "/assets-images/gal-13.jpg",          // 2 - 2x1
  "/assets-images/picnic-gallery.jpg",  // 3 - 2x2 vertical
  "/assets-images/gallery-9.jpg",       // 4 - 2x2 vertical
  "/assets-images/gal-22.jpg",          // 5 - 2x1
  "/assets-images/gal-17.jpg",          // 6 - 2x1
  "/assets-images/teacher-picnic.jpg",  // 7 - 2x1
  "/assets-images/boating-picnic.jpg",  // 8 - 2x1
  "/assets-images/home-down-cover-photo.jpg", // 9 - 4x1 wide finale
];

const HEADS = [
  {
    name: "Bibek Raj Kalouni",
    role: "Principal",
    img: "/assets-images/principal-bibek-raj-kalouni.jpg",
    quote:
      "Education at Western Public Academy is not the filling of a vessel, but the lighting of a flame.",
  },
  {
    name: "Mahesh Chaudhary",
    role: "Vice Principal",
    img: "/assets-images/vice-principal-mahesh-chaudhary.jpg",
    quote:
      "Our students learn to question carefully, work patiently, and lead kindly.",
  },
  {
    name: "Bhoj Singh Rawal",
    role: "Asst. Administrator",
    img: "/assets-images/assistant-administrator-bhoj-singh-rawal.jpg",
    quote:
      "A well-run school is a quiet promise we keep — every day, for every student.",
  },
  {
    name: "Tulsi Chand",
    role: "Accountant",
    img: "/assets-images/tulsi-chand-accountant.jpg",
    quote:
      "Stewardship of resources is stewardship of opportunity for the next generation.",
  },
];

function notImplemented(label: string) {
  toast(`${label} — coming soon`, { description: "This page is being prepared." });
}

/* ───────────────────────────── HERO ───────────────────────────── */
function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_BGS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {HERO_BGS.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1200ms]"
            style={{
              opacity: i === idx ? 1 : 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: i === idx ? "scale(1.04)" : "scale(1)",
              transition:
                "opacity 1200ms var(--ease-out), transform 7000ms var(--ease-out)",
            }}
          />
        ))}
        {/* Forest tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(10,42,32,0.86) 0%, rgba(15,61,46,0.78) 35%, rgba(15,61,46,0.45) 70%, rgba(15,61,46,0.25) 100%)",
          }}
        />
        {/* Grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <div className="relative container pt-10 sm:pt-14 lg:pt-20 pb-28 sm:pb-32 lg:pb-36 min-h-[580px] sm:min-h-[640px] lg:min-h-[760px]">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
          {/* Left: editorial heading */}
          <div className="col-span-12 lg:col-span-8">
            <div
              className="gold-rule"
              style={{ color: "var(--color-brass)" }}
            >
              Affiliated with PABSON · Est. 2066 B.S.
            </div>

            <h1
              className="display-serif mt-5 sm:mt-6 h-display"
              style={{
                color: "var(--color-parchment)",
                letterSpacing: "-0.025em",
              }}
            >
              A school where{" "}
              <span style={{ fontStyle: "italic", color: "var(--color-brass)" }}>
                curious minds
              </span>{" "}
              find their home.
            </h1>

            <p
              className="mt-6 sm:mt-7 max-w-xl text-[14px] sm:text-[15px] lg:text-[17px] leading-relaxed"
              style={{ color: "rgba(247,241,229,0.88)" }}
            >
              Western Public Academy is a +2 college in Bheemdatt, Kanchanpur —
              raising thoughtful, capable graduates across our four +2 streams
              of Hotel Management, Computer Science, Sports Science, and
              Education since 2066&nbsp;B.S.
            </p>

            <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => { window.location.href = "/apply"; }}
                className="pill-btn inline-flex items-center gap-3 px-6 py-3.5 text-[12.5px] sm:text-[13px] font-semibold uppercase"
                style={{
                  background: "var(--color-brass)",
                  color: "var(--color-forest-deep)",
                  letterSpacing: "0.16em",
                  boxShadow: "0 14px 28px -14px rgba(201,161,74,0.55)",
                }}
              >
                Apply for Admission
                <ArrowRight size={16} />
              </button>
              <a
                href="#programs"
                className="ghost-btn inline-flex items-center gap-3 px-6 py-3.5 text-[12.5px] sm:text-[13px] font-semibold uppercase"
                style={{
                  background: "rgba(247,241,229,0.08)",
                  color: "var(--color-parchment)",
                  letterSpacing: "0.16em",
                  border: "1px solid rgba(247,241,229,0.55)",
                  backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.18)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-brass)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,241,229,0.55)";
                }}
              >
                Explore Programs
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: floating editorial card */}
          <div className="col-span-12 lg:col-span-4">
            <div
              className="ml-auto mt-10 lg:mt-0 max-w-sm relative"
              style={{ animation: "floatIn 800ms var(--ease-out)" }}
            >
              <div
                className="p-6 sm:p-7 lg:p-8 relative"
                style={{
                  background: "var(--color-parchment)",
                  border: "1px solid var(--color-parchment-deep)",
                  boxShadow: "0 32px 80px -32px rgba(0,0,0,0.55)",
                  borderRadius: 18,
                }}
              >
                {/* Decorative corner accent */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                    borderTop: "2px solid var(--color-brass)",
                    borderLeft: "2px solid var(--color-brass)",
                    borderTopLeftRadius: 18,
                  }}
                />
                <div className="eyebrow mb-3">Our Promise</div>
                <p
                  className="display-serif text-[22px] sm:text-[24px] lg:text-[26px]"
                  style={{
                    color: "var(--color-forest-deep)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.01em",
                  }}
                >
                  To teach with patience, and to lead with example.
                </p>
                <div
                  aria-hidden
                  className="mt-5 mb-5"
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, var(--color-brass) 0%, transparent 100%)",
                  }}
                />
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  More than two decades of teaching, mentoring, and graduating
                  students who carry Bheemdatt's spirit into the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* White dot indicators (centered, like reference) */}
        <div className="absolute left-0 right-0 bottom-6 sm:bottom-8 flex items-center justify-center gap-2.5 z-10">
          {HERO_BGS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`hero-dot ${i === idx ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── WELCOME ─────────────────────────── */
function Welcome() {
  return (
    <section className="py-24 lg:py-32 paper-texture">
      <div className="container grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-5 reveal">
          <div className="gold-rule">Welcome to Western Public Academy</div>
          <h2
            className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]"
            style={{ color: "var(--color-forest-deep)", letterSpacing: "-0.025em" }}
          >
            A small school with{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-terracotta)" }}>
              big ambitions
            </span>{" "}
            for every student.
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal">
          <p
            className="text-[16px] lg:text-[17px] leading-relaxed"
            style={{ color: "var(--color-ink-soft)" }}
          >
            Founded in 2066&nbsp;B.S., Western Public Academy began as a
            community-driven school in Bheemdatt with a simple conviction: that
            quality education in the Far-West should not be a privilege, but a
            promise. Today, that promise lives in our classrooms, our staff
            room, and our playground.
          </p>
          <p
            className="mt-5 text-[16px] lg:text-[17px] leading-relaxed"
            style={{ color: "var(--color-ink-soft)" }}
          >
            Under PABSON affiliation, we offer four distinct +2 streams
            — Hotel Management, Computer Science, Sports Science, and
            Education — each grounded in real practice, dignified instruction,
            and a respect for the lives our students will go on to build.
          </p>

          <div
            aria-hidden
            className="mt-9 mb-3"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, var(--color-brass) 0%, transparent 60%)",
              maxWidth: 220,
            }}
          />
          <div
            className="text-[12px] uppercase"
            style={{
              color: "var(--color-brass-deep)",
              letterSpacing: "0.22em",
              fontWeight: 600,
            }}
          >
            Established 2066 B.S. · Bheemdatt-18, Kanchanpur
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── STATS ──────────────────────────── */
function Stats() {
  return (
    <section
      className="py-12 lg:py-16"
      style={{ background: "var(--color-forest-deep)" }}
    >
      <div className="container grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`reveal flex flex-col items-start ${i % 2 !== 0 ? 'border-l pl-5' : ''} lg:border-l-0 lg:pl-0 ${i !== 0 ? 'lg:border-l lg:pl-5' : ''}`}
            style={{
              borderColor: "rgba(201,161,74,0.3)",
            }}
          >
            <div
              className="display-serif text-[42px] lg:text-[56px]"
              style={{
                color: "var(--color-parchment)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {s.v}
              {s.suffix && (
                <span style={{ color: "var(--color-brass)" }}>{s.suffix}</span>
              )}
            </div>
            <div
              className="mt-3 text-[11px] uppercase"
              style={{
                color: "var(--color-brass)",
                letterSpacing: "0.22em",
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── WHY CHOOSE US ───────────────────── */
function WhyChoose() {
  return (
    <section className="py-24 lg:py-32 paper-texture">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-12 lg:col-span-5 reveal">
            <div className="gold-rule">Our Edge</div>
            <h2
              className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[52px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              Why families choose Western Public Academy.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal">
            <p
              className="text-[16px] leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              We're proud to be a part of the Bheemdatt community — and prouder
              still of how our students grow here. These are the small, daily
              practices that have built our reputation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="editorial-card p-6 sm:p-7 lg:p-8 reveal group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="inline-flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                style={{
                  width: 52,
                  height: 52,
                  background: "var(--color-parchment)",
                  border: "1px solid var(--color-brass)",
                  color: "var(--color-forest-deep)",
                  borderRadius: 14,
                  boxShadow: "inset 0 0 0 4px #fff",
                }}
              >
                <f.Icon size={22} />
              </div>
              <h3
                className="display-serif text-[22px] mb-2"
                style={{ color: "var(--color-forest-deep)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-[14.5px] leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PROGRAMS ───────────────────────── */
function Programs() {
  return (
    <section
      id="programs"
      className="py-24 lg:py-32"
      style={{ background: "var(--color-parchment-deep)" }}
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 lg:col-span-6 reveal">
            <div className="gold-rule">Academic Offerings</div>
            <h2
              className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              Four +2 streams.<br />
              <span style={{ fontStyle: "italic" }}>One careful school.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 reveal flex items-end">
            <p
              className="text-[16px] leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Each stream is taught by a dedicated faculty, with a balance of
              theory, practical work, and pastoral care. Choose the path that
              fits — we'll help you walk it well.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {PROGRAMS.map((p, i) => (
            <article
              key={p.title}
              className="reveal grid grid-cols-12 gap-0 group cursor-pointer shine-on-hover"
              style={{
                background: "#fff",
                border: "1px solid var(--color-parchment-deep)",
                transition: "all 320ms var(--ease-out)",
                borderRadius: 16,
                overflow: "hidden",
                transitionDelay: `${i * 60}ms`,
              }}
              onClick={() => { if (p.href) window.location.href = p.href; else window.location.href = '/programs'; }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-brass)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 32px 60px -32px rgba(15,61,46,0.32)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-parchment-deep)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div className="col-span-12 md:col-span-4 lg:col-span-3 relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[220px]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,61,46,0.1) 0%, rgba(15,61,46,0.55) 100%)",
                  }}
                />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <div
                    className="display-serif text-[36px] sm:text-[44px]"
                    style={{ color: "var(--color-parchment)", lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
                  >
                    {p.n}
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-8 lg:col-span-9 p-6 sm:p-7 lg:p-10 flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <div className="eyebrow">{p.eyebrow}</div>
                  <h3
                    className="display-serif mt-2 text-[24px] sm:text-[28px] lg:text-[34px] transition-colors duration-300 group-hover:text-[var(--color-terracotta)]"
                    style={{ color: "var(--color-forest-deep)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-3 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    {p.desc}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3 md:gap-4">
                  <span
                    className="text-[10.5px] sm:text-[11px] uppercase whitespace-nowrap"
                    style={{
                      color: "var(--color-brass-deep)",
                      letterSpacing: "0.22em",
                      fontWeight: 600,
                    }}
                  >
                    +2 · 2 Years
                  </span>
                  <span
                    className="inline-flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-[var(--color-brass)] group-hover:text-[var(--color-forest-deep)]"
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--color-forest)",
                      color: "var(--color-parchment)",
                      borderRadius: 9999,
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── BEYOND CLASSROOMS ───────────────────── */
function BeyondClassrooms() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(/assets-images/home-down-cover-photo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(10,42,32,0.88) 0%, rgba(15,61,46,0.78) 60%, rgba(15,61,46,0.6) 100%)",
        }}
      />
      <div className="relative container py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 reveal">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>
              Beyond Classrooms
            </div>
            <h2
              className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]"
              style={{ color: "var(--color-parchment)" }}
            >
              Picnics, sports, music, and the slow craft of growing up together.
            </h2>
            <p
              className="mt-7 max-w-xl text-[16px] leading-relaxed"
              style={{ color: "rgba(247,241,229,0.85)" }}
            >
              A school is more than its syllabus. Boating trips, teacher
              picnics, annual functions, sports days, and quiet afternoons in
              the school yard — these are the moments where character is shaped
              and friendships are made.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 reveal grid grid-cols-2 gap-3 self-end">
            {[
              "/assets-images/picnic-gallery.jpg",
              "/assets-images/teacher-picnic.jpg",
              "/assets-images/boating-picnic.jpg",
              "/assets-images/gal-22.jpg",
            ].map((src, idx) => (
              <div
                key={src}
                className="aspect-[4/5] overflow-hidden group relative"
                style={{
                  border: "1px solid rgba(201,161,74,0.4)",
                  borderRadius: 14,
                  transform: idx % 2 === 1 ? "translateY(20px)" : "none",
                }}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover img-zoom"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(15,61,46,0.6) 0%, transparent 60%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── LEADERSHIP ───────────────────────── */
function Leadership() {
  return (
    <section className="py-24 lg:py-32 paper-texture">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-12 lg:col-span-7 reveal">
            <div className="gold-rule">Our Leadership</div>
            <h2
              className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[52px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              The hands that hold this school steady.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 reveal flex items-end">
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
              From classroom to office, our team is built on long careers in
              teaching, administration, and care.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {HEADS.map((h, i) => (
            <figure
              key={h.name}
              className="reveal group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="aspect-[4/5] overflow-hidden mb-5 relative soft-frame-lg"
                style={{
                  border: "1px solid var(--color-parchment-deep)",
                  boxShadow: "0 18px 36px -22px rgba(15,61,46,0.25)",
                  transition: "box-shadow 320ms var(--ease-out), transform 320ms var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 32px 56px -28px rgba(15,61,46,0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 36px -22px rgba(15,61,46,0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src={h.img}
                  alt={h.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(15,61,46,0.85) 0%, rgba(15,61,46,0) 100%)",
                  }}
                >
                  <Quote
                    size={18}
                    style={{ color: "var(--color-brass)" }}
                  />
                </div>
              </div>
              <figcaption>
                <div className="eyebrow">{h.role}</div>
                <div
                  className="display-serif mt-1.5 text-[20px]"
                  style={{ color: "var(--color-forest-deep)" }}
                >
                  {h.name}
                </div>
                <p
                  className="mt-3 text-[13.5px] italic leading-relaxed"
                  style={{
                    color: "var(--color-ink-soft)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  "{h.quote}"
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── GALLERY ───────────────────────── */
function GalleryPreview() {
  const [, setLocation] = useLocation();
  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--color-parchment-deep)" }}>
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="reveal">
            <div className="gold-rule">Life on Campus</div>
            <h2
              className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[52px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              A glance at Western life.
            </h2>
          </div>
          <button
            onClick={() => setLocation("/gallery")}
            className="press inline-flex items-center gap-2 self-start lg:self-auto reveal text-[12px] font-semibold uppercase"
            style={{
              color: "var(--color-forest-deep)",
              letterSpacing: "0.22em",
              borderBottom: "1px solid var(--color-brass)",
              paddingBottom: 4,
            }}
          >
            View Full Gallery <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Editorial mosaic — spans tuned to fill an 8-col grid exactly,
            with grid-flow-dense as a safety net so no cells are ever empty. */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[170px] gap-3 lg:gap-4" style={{ gridAutoFlow: "dense" }}>
          {GALLERY.map((src, i) => {
            // Spans designed for an 8-col x 4-row grid (32 cells, 32 cells used)
            //   row 1-2 :  0 (4x2)  +  3 (2x2)  +  4 (2x2)
            //   row 3   :  1 (2x1)  +  2 (2x1)  +  5 (2x1)  +  6 (2x1)
            //   row 4   :  7 (2x1)  +  8 (2x1)  +  9 (4x1)
            const layouts = [
              "col-span-2 row-span-2 sm:col-span-4 sm:row-span-2 lg:col-span-4 lg:row-span-2", // 0 hero
              "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // 1
              "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // 2
              "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2", // 3 tall
              "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2", // 4 tall
              "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // 5
              "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // 6
              "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // 7
              "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // 8
              "col-span-2 row-span-1 sm:col-span-4 sm:row-span-1 lg:col-span-4 lg:row-span-1", // 9 wide finale
            ];
            return (
              <div
                key={src}
                className={`reveal overflow-hidden group relative soft-frame ${layouts[i] ?? "col-span-1 row-span-1"}`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover img-zoom"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(10,42,32,0.55) 0%, transparent 60%)",
                  }}
                />
                <div
                  className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500"
                  style={{
                    color: "var(--color-parchment)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "var(--color-brass)" }}>·</span> Campus Life
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "var(--color-forest-deep)" }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/assets-images/background-img-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "luminosity",
        }}
      />
      <div className="relative container">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 reveal">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>
              Admissions Open
            </div>
            <h2
              className="display-serif mt-5 text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.02]"
              style={{ color: "var(--color-parchment)" }}
            >
              Begin a chapter at{" "}
              <span style={{ fontStyle: "italic", color: "var(--color-brass)" }}>
                Western Public Academy.
              </span>
            </h2>
            <p
              className="mt-6 max-w-xl text-[16px] leading-relaxed"
              style={{ color: "rgba(247,241,229,0.85)" }}
            >
              Applications for the upcoming +2 session are now being accepted.
              Visit our campus in Bheemdatt, meet our faculty, and find the
              stream that's right for you.
            </p>
            <div className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => { window.location.href = "/apply"; }}
                className="pill-btn inline-flex items-center gap-3 px-6 py-3.5 text-[12.5px] sm:text-[13px] font-semibold uppercase"
                style={{
                  background: "var(--color-brass)",
                  color: "var(--color-forest-deep)",
                  letterSpacing: "0.16em",
                  boxShadow: "0 14px 28px -14px rgba(201,161,74,0.55)",
                }}
              >
                Apply for Admission <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { window.location.href = "/contact"; }}
                className="ghost-btn inline-flex items-center gap-3 px-6 py-3.5 text-[12.5px] sm:text-[13px] font-semibold uppercase"
                style={{
                  background: "rgba(247,241,229,0.08)",
                  color: "var(--color-parchment)",
                  letterSpacing: "0.16em",
                  border: "1px solid rgba(247,241,229,0.55)",
                  backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.18)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-brass)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,241,229,0.55)";
                }}
              >
                Talk to Admissions <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 lg:col-start-10 reveal flex lg:flex-col gap-6 lg:gap-3 lg:items-end lg:justify-end">
            <div className="text-right">
              <div className="eyebrow" style={{ color: "var(--color-brass)" }}>
                Visit Us
              </div>
              <div className="display-serif mt-2 text-[20px]" style={{ color: "var(--color-parchment)" }}>
                Bheemdatt-18, Katan
              </div>
              <div className="text-[13px] mt-1" style={{ color: "rgba(247,241,229,0.7)" }}>
                Kanchanpur, Sudurpashchim
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PAGE ───────────────────────── */
export default function Home() {
  useReveal();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-parchment)" }}>
      <SiteHeader />
      <main>
        <Hero />
        <Welcome />
        <Stats />
        <WhyChoose />
        <Programs />
        <BeyondClassrooms />
        <Leadership />
        <GalleryPreview />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
