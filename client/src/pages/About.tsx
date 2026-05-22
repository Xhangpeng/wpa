/*
 * Western Public Academy — About Page
 * Revised as a production-level, image-led section that preserves the existing
 * Himalayan Heritage homepage flow while using the supplied school assets with
 * clear purpose: Our Story and Messages.
 */
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Compass,
  Eye,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useReveal } from "@/hooks/useReveal";

const ASSETS = {
  bg1: "/IMAGES/BACKGROUND-IMG-1.jpg",
  bg2: "/IMAGES/BACKGROUND-IMG-2.jpg",
  bg3: "/IMAGES/BACKGROUND-IMG-3.jpg",
  bg4: "/IMAGES/BACKGROUND%20IMG%204.jpg",
  cover: "/IMAGES/home-down-cover-photo.jpg",
  schoolHeads: "/IMAGES/school-heads.jpg",
  principal: "/IMAGES/principal%20bibek%20raj%20kalouni.jpg",
  vicePrincipal: "/IMAGES/vice-principal%20mahesh%20chaudhary.jpg",
  administrator: "/IMAGES/asst.%20adiministrator%20bhoj%20singh%20rawal.jpg",
  accountant: "/IMAGES/tulsi%20chand%20accountant.jpg",
  hotel: "/IMAGES/HOTEL-MANAGEMENT.png",
  education: "/IMAGES/education-faculty.png",
  sports: "/IMAGES/sports-science.jpeg",
  gallery1: "/IMAGES/gallery-1.jpg",
  gallery2: "/IMAGES/gallery-2.jpg",
  gallery3: "/IMAGES/gallery-3.jpg",
  gallery4: "/IMAGES/gallery-4.jpg",
  gallery5: "/IMAGES/gallery-5.jpg",
  gal13: "/IMAGES/gal-13.jpg",
  gal17: "/IMAGES/gal-17.jpg",
  gal22: "/IMAGES/gal-22.jpg",
  picnic: "/IMAGES/picnic-gallery.jpg",
  teacherPicnic: "/IMAGES/teacher-picnic.jpg",
  boatingPicnic: "/IMAGES/boating%20%2B%20picnic.jpg",
};

const STORY_STATS = [
  { value: "2066", suffix: " B.S.", label: "Founded" },
  { value: "PABSON", label: "Affiliated" },
  { value: "4", suffix: "", label: "+2 Streams" },
  { value: "Bheemdatt-18", label: "Katan, Kanchanpur" },
];

const OBJECTIVES = [
  {
    n: "01",
    Icon: ShieldCheck,
    title: "Build disciplined character",
    body: "Guide students through punctuality, respectful conduct, self-belief, and responsibility without losing warmth or dignity.",
  },
  {
    n: "02",
    Icon: BookOpen,
    title: "Strengthen academic foundations",
    body: "Deliver dependable +2 teaching across Hotel Management, Computer Science, Sports Science, and Education.",
  },
  {
    n: "03",
    Icon: Compass,
    title: "Connect learning to practice",
    body: "Use projects, presentations, field exposure, sports, cultural activities, and lab-based work so knowledge becomes usable.",
  },
  {
    n: "04",
    Icon: HeartHandshake,
    title: "Care for every learner",
    body: "Maintain close teacher-student relationships so each student is noticed, guided, corrected, and encouraged.",
  },
];

const CAMPUS_MOMENTS = [
  { src: ASSETS.gallery1, label: "School community" },
  { src: ASSETS.gallery5, label: "Student activities" },
  { src: ASSETS.gal13, label: "Learning together" },
  { src: ASSETS.picnic, label: "Picnic and recreation" },
  { src: ASSETS.teacherPicnic, label: "Teacher fellowship" },
  { src: ASSETS.boatingPicnic, label: "Outdoor exposure" },
  { src: ASSETS.gal22, label: "Campus memories" },
  { src: ASSETS.gal17, label: "Events and participation" },
];

const PROGRAM_SNAPSHOTS = [
  { title: "Hotel Management", img: ASSETS.hotel, desc: "Practical hospitality exposure for service, kitchen, and front-office confidence." },
  { title: "Sports Science", img: ASSETS.sports, desc: "Physical education, performance, teamwork, and disciplined athletic growth." },
  { title: "Education", img: ASSETS.education, desc: "A teaching-focused stream for students drawn toward classrooms and community service." },
];

const LEADERSHIP_MESSAGES = [
  {
    id: "principal-message",
    name: "Bibek Raj Kalouni",
    role: "Principal",
    img: ASSETS.principal,
    quote:
      "At Western Public Academy, our responsibility is not only to complete a course, but to shape learners who can think clearly, act responsibly, and move forward with courage.",
  },
  {
    id: "vice-principal-message",
    name: "Mahesh Chaudhary",
    role: "Vice Principal",
    img: ASSETS.vicePrincipal,
    quote:
      "The strength of our school is built through daily discipline, careful teaching, honest feedback, and a supportive partnership between students, teachers, and guardians.",
  },
];

const SUPPORT_TEAM = [
  { name: "Bhoj Singh Rawal", role: "Asst. Administrator", img: ASSETS.administrator },
  { name: "Tulsi Chand", role: "Accountant", img: ASSETS.accountant },
];

function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${ASSETS.bg3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.04)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(112deg, rgba(10,42,32,0.92) 0%, rgba(15,61,46,0.82) 42%, rgba(15,61,46,0.46) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <div className="relative container pt-10 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-28 min-h-[560px] sm:min-h-[620px] flex items-end">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-end w-full">
          <div className="col-span-12 lg:col-span-7 reveal">
            <div className="gold-rule mt-8" style={{ color: "var(--color-brass)" }}>
              Our Story · Messages
            </div>
            <h1 className="display-serif h-display mt-5" style={{ color: "var(--color-parchment)", letterSpacing: "-0.03em" }}>
              The story behind <span style={{ color: "var(--color-brass)", fontStyle: "italic" }}>Western Public</span> Academy.
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed" style={{ color: "rgba(247,241,229,0.86)" }}>
              A trusted +2 institution in Bheemdatt-18, Katan, Kanchanpur — shaped by community trust, practical learning, disciplined care, and the belief that students grow best when academics and character move together.
            </p>
            <div className="mt-8 flex flex-col min-[420px]:flex-row flex-wrap gap-3">
              <a
                href="#our-story"
                className="pill-btn inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[12.5px] font-semibold uppercase"
                style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)", letterSpacing: "0.16em" }}
              >
                Our Story
                <ArrowRight size={16} />
              </a>
              <a
                href="#messages"
                className="ghost-btn inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[12.5px] font-semibold uppercase"
                style={{ background: "rgba(247,241,229,0.08)", color: "var(--color-parchment)", border: "1px solid rgba(247,241,229,0.55)", letterSpacing: "0.16em" }}
              >
                Messages
                <Quote size={16} />
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 reveal">
            <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:translate-y-8">
              <div className="col-span-6 soft-frame group h-[230px] sm:h-[300px] lg:h-[340px] shadow-[0_36px_90px_-42px_rgba(0,0,0,0.7)]">
                <img src={ASSETS.schoolHeads} alt="Western Public Academy school heads" className="w-full h-full object-cover img-zoom" />
              </div>
              <div className="col-span-3 soft-frame group h-[160px] sm:h-[190px] lg:h-[220px] translate-y-3">
                <img src={ASSETS.gallery2} alt="Western Public Academy student activities" className="w-full h-full object-cover img-zoom" />
              </div>
              <div className="col-span-3 p-5 sm:p-6 flex flex-col justify-between h-[160px] sm:h-[190px] lg:h-[220px]"
                style={{ background: "var(--color-parchment)", border: "1px solid rgba(201,161,74,0.48)", borderRadius: 16 }}>
                <Award size={24} style={{ color: "var(--color-brass-deep)" }} />
                <div>
                  <div className="display-serif text-[26px] sm:text-[30px]" style={{ color: "var(--color-forest-deep)", lineHeight: 1 }}>2066 B.S.</div>
                  <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                    A community-rooted academic journey in Far-West Nepal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSubNav() {
  return (
    <section className="sticky top-[72px] z-30 hidden lg:block" style={{ background: "rgba(247,241,229,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--color-parchment-deep)" }}>
      <div className="container flex items-center justify-between py-3">
        <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: "var(--color-brass-deep)" }}>
          About Western Public Academy
        </div>
        <nav className="flex items-center gap-2">
          <a href="#our-story" className="px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-semibold transition-colors" style={{ color: "var(--color-forest-deep)" }}>Our Story</a>
          <a href="#messages" className="px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-semibold transition-colors" style={{ color: "var(--color-forest-deep)" }}>Messages</a>
        </nav>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section id="our-story" className="py-24 lg:py-32 paper-texture" style={{ scrollMarginTop: 130 }}>
      <div className="container grid grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="col-span-12 lg:col-span-5 reveal">
          <div className="gold-rule">Our Story</div>
          <h2 className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]" style={{ color: "var(--color-forest-deep)", letterSpacing: "-0.025em" }}>
            Built from community trust, carried forward by students.
          </h2>
          <div className="mt-7 space-y-5 text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            <p>
              Western Public Academy was established in <strong style={{ color: "var(--color-forest-deep)" }}>2066 B.S.</strong> with a clear promise: to provide dependable education for families of Bheemdatt and the wider Kanchanpur region.
            </p>
            <p>
              The Academy is affiliated with <strong style={{ color: "var(--color-forest-deep)" }}>PABSON</strong> and offers focused +2 pathways in Hotel Management, Computer Science, Sports Science, and Education. Each stream is designed to help students choose a direction with confidence and practical exposure.
            </p>
            <p>
              Our school culture combines classroom discipline with the warmth of a close community. Students learn through lectures, projects, presentations, activities, sports, picnics, and events that help them become capable, cooperative, and responsible young people.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 reveal">
          <div className="grid grid-cols-7 gap-3 sm:gap-4">
            <div className="col-span-7 sm:col-span-4 soft-frame group h-[300px] sm:h-[500px]">
              <img src={ASSETS.cover} alt="Western Public Academy students and school life" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="col-span-7 sm:col-span-3 grid gap-3 sm:gap-4">
              <div className="soft-frame group h-[180px] sm:h-[240px]">
                <img src={ASSETS.gallery1} alt="Western Public Academy school community" className="w-full h-full object-cover img-zoom" />
              </div>
              <div className="p-6 sm:p-7 flex flex-col justify-between min-h-[220px]" style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)", borderRadius: 16 }}>
                <Landmark size={26} style={{ color: "var(--color-brass)" }} />
                <div>
                  <div className="display-serif text-[30px]" style={{ color: "var(--color-parchment)" }}>Bheemdatt-18</div>
                  <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "rgba(247,241,229,0.76)" }}>
                    Katan, Kanchanpur — a school home for learners across Sudurpashchim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "var(--color-forest-deep)" }}>
      <div className="container grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        {STORY_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`reveal flex flex-col items-start ${index % 2 !== 0 ? 'min-[420px]:border-l min-[420px]:pl-5' : ''} lg:border-l-0 lg:pl-0 ${index !== 0 ? 'lg:border-l lg:pl-5' : ''}`}
            style={{ borderColor: "rgba(201,161,74,0.3)" }}
          >
            <div className="display-serif text-[34px] sm:text-[38px] lg:text-[50px] break-words" style={{ color: "var(--color-parchment)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {stat.value}{stat.suffix && <span style={{ color: "var(--color-brass)" }}>{stat.suffix}</span>}
            </div>
            <div className="mt-3 text-[11px] uppercase" style={{ color: "var(--color-brass)", letterSpacing: "0.22em", fontWeight: 600 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--color-parchment-deep)" }}>
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16 items-end">
          <div className="col-span-12 lg:col-span-6 reveal">
            <div className="gold-rule">Direction</div>
            <h2 className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]" style={{ color: "var(--color-forest-deep)", letterSpacing: "-0.025em" }}>
              Vision and mission with a practical heart.
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 lg:col-start-8 reveal text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            Our direction is shaped by what we see in daily life: students learning, teachers guiding, and activities creating confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <article className="editorial-card overflow-hidden reveal">
            <div className="h-[240px] sm:h-[310px] overflow-hidden">
              <img src={ASSETS.gallery3} alt="Western Public Academy academic learning" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="p-7 sm:p-9">
              <Eye size={28} style={{ color: "var(--color-brass-deep)" }} />
              <h3 className="display-serif text-[30px] sm:text-[36px] mt-5" style={{ color: "var(--color-forest-deep)" }}>Vision</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                To develop confident, capable, and responsible learners who can pursue higher education, serve society, and lead with integrity in a changing world.
              </p>
            </div>
          </article>

          <article className="editorial-card overflow-hidden reveal" style={{ transitionDelay: "80ms" }}>
            <div className="h-[240px] sm:h-[310px] overflow-hidden">
              <img src={ASSETS.gallery4} alt="Western Public Academy school activity" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="p-7 sm:p-9">
              <Target size={28} style={{ color: "var(--color-brass-deep)" }} />
              <h3 className="display-serif text-[30px] sm:text-[36px] mt-5" style={{ color: "var(--color-forest-deep)" }}>Mission</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                To provide quality, student-centered education through dedicated teaching, practical activities, moral guidance, and a supportive partnership among school, students, and guardians.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Objectives() {
  return (
    <section className="py-24 lg:py-32 paper-texture">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-5 reveal">
            <div className="gold-rule">What guides us</div>
            <h2 className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[52px]" style={{ color: "var(--color-forest-deep)" }}>
              Objectives that shape both study and school life.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
              These goals connect the Academy's academic work with the everyday culture visible across the campus: discipline, practical learning, mentorship, activity, and community.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {OBJECTIVES.map(({ n, Icon, title, body }, index) => (
            <article key={title} className="editorial-card p-6 sm:p-7 reveal group" style={{ transitionDelay: `${index * 65}ms` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="display-serif text-[44px] leading-none" style={{ color: "rgba(201,161,74,0.48)" }}>{n}</div>
                <div className="inline-flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]" style={{ width: 48, height: 48, background: "var(--color-parchment)", border: "1px solid var(--color-brass)", borderRadius: 14, color: "var(--color-forest-deep)" }}>
                  <Icon size={22} />
                </div>
              </div>
              <h3 className="display-serif text-[23px] mt-6" style={{ color: "var(--color-forest-deep)" }}>{title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramAndCampusLife() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#fff" }}>
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center mb-14 lg:mb-18">
          <div className="col-span-12 lg:col-span-5 reveal">
            <div className="gold-rule">Learning Pathways</div>
            <h2 className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[52px]" style={{ color: "var(--color-forest-deep)" }}>
              Streams and experiences placed in the same school journey.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 reveal grid sm:grid-cols-3 gap-4">
            {PROGRAM_SNAPSHOTS.map((item) => (
              <article key={item.title} className="overflow-hidden group" style={{ borderRadius: 16, border: "1px solid var(--color-parchment-deep)", background: "var(--color-parchment)" }}>
                <div className="h-[170px] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover img-zoom" />
                </div>
                <div className="p-5">
                  <h3 className="display-serif text-[22px]" style={{ color: "var(--color-forest-deep)" }}>{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden p-4 sm:p-5 lg:p-6" style={{ background: "var(--color-forest-deep)", borderRadius: 24 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {CAMPUS_MOMENTS.map((moment, index) => (
              <figure
                key={moment.src}
                className={`relative overflow-hidden group ${index === 0 ? "col-span-2 row-span-2 min-h-[320px]" : "min-h-[150px] sm:min-h-[190px]"}`}
                style={{ borderRadius: 16, border: "1px solid rgba(201,161,74,0.34)" }}
              >
                <img src={moment.src} alt={moment.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover img-zoom" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,61,46,0.08) 0%, rgba(15,61,46,0.64) 100%)" }} />
                <figcaption className="absolute left-4 bottom-4 right-4 text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "var(--color-parchment)" }}>
                  {moment.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Messages() {
  return (
    <section id="messages" className="py-24 lg:py-32" style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)", scrollMarginTop: 130 }}>
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-7 reveal">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>Messages</div>
            <h2 className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]" style={{ color: "var(--color-parchment)", letterSpacing: "-0.025em" }}>
              Guidance from the people who lead the Academy.
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 reveal text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "rgba(247,241,229,0.76)" }}>
            Messages from our leadership team reflect the values and commitment that drive Western Public Academy forward every day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {LEADERSHIP_MESSAGES.map((leader, index) => (
            <article id={leader.id} key={leader.id} className="reveal group" style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="grid md:grid-cols-[0.86fr_1fr] h-full overflow-hidden" style={{ background: "rgba(247,241,229,0.97)", borderRadius: 20, border: "1px solid rgba(201,161,74,0.36)" }}>
                <div className="relative min-h-[320px] md:min-h-full overflow-hidden">
                  <img src={leader.img} alt={`${leader.name}, ${leader.role}`} className="absolute inset-0 w-full h-full object-cover img-zoom" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,61,46,0.04) 0%, rgba(15,61,46,0.28) 100%)" }} />
                </div>
                <div className="p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <Quote size={28} style={{ color: "var(--color-brass-deep)" }} />
                    <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                      "{leader.quote}"
                    </p>
                  </div>
                  <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--color-parchment-deep)" }}>
                    <h3 className="display-serif text-[28px]" style={{ color: "var(--color-forest-deep)" }}>{leader.name}</h3>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--color-brass-deep)" }}>{leader.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8 mt-8 lg:mt-10 items-stretch">
          <div className="col-span-12 lg:col-span-7 reveal soft-frame group min-h-[280px] lg:min-h-[360px]">
            <img src={ASSETS.schoolHeads} alt="Western Public Academy leadership team" className="w-full h-full object-cover img-zoom" />
          </div>
          <div className="col-span-12 lg:col-span-5 reveal grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {SUPPORT_TEAM.map((member) => (
              <article key={member.name} className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] overflow-hidden" style={{ background: "rgba(247,241,229,0.97)", borderRadius: 18, border: "1px solid rgba(201,161,74,0.32)" }}>
                <div className="relative min-h-[150px] overflow-hidden">
                  <img src={member.img} alt={`${member.name}, ${member.role}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="display-serif text-[24px]" style={{ color: "var(--color-forest-deep)" }}>{member.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--color-brass-deep)" }}>{member.role}</p>
                  <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                    Supporting the systems of care, coordination, and service behind every classroom.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CampusEnvironment() {
  const points = [
    { Icon: Building2, text: "Classrooms and academic spaces arranged for focused teaching and discussion." },
    { Icon: Trophy, text: "Sports, recreation, and activities that build discipline and teamwork." },
    { Icon: Users, text: "A close mentorship culture among students, teachers, staff, and guardians." },
    { Icon: Sparkles, text: "Events, picnics, presentations, and cultural programs that shape confidence." },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${ASSETS.bg4})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(10,42,32,0.9) 0%, rgba(15,61,46,0.78) 58%, rgba(15,61,46,0.62) 100%)" }} />
      <div className="relative container py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-6 reveal">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>Campus Environment</div>
            <h2 className="display-serif mt-5 text-[36px] sm:text-[44px] lg:text-[56px]" style={{ color: "var(--color-parchment)", letterSpacing: "-0.025em" }}>
              A living campus, not just a building.
            </h2>
            <p className="mt-7 text-[16px] leading-relaxed max-w-xl" style={{ color: "rgba(247,241,229,0.82)" }}>
              The Academy's identity is visible in the way students gather, participate, compete, celebrate, and learn together.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 reveal grid sm:grid-cols-2 gap-4">
            {points.map(({ Icon, text }) => (
              <div key={text} className="p-5 sm:p-6" style={{ background: "rgba(247,241,229,0.94)", borderRadius: 16, border: "1px solid rgba(201,161,74,0.38)" }}>
                <Icon size={23} style={{ color: "var(--color-brass-deep)" }} />
                <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="py-20 lg:py-24" style={{ background: "#fff" }}>
      <div className="container reveal">
        <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12" style={{ background: "var(--color-parchment)", border: "1px solid var(--color-parchment-deep)", borderRadius: 22 }}>
          <div className="absolute right-0 top-0 w-56 h-56 rounded-full blur-3xl opacity-20" style={{ background: "var(--color-brass)" }} />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="gold-rule">Western Public Academy</div>
              <h2 className="display-serif text-[32px] sm:text-[40px] lg:text-[50px] mt-5" style={{ color: "var(--color-forest-deep)", letterSpacing: "-0.025em" }}>
                Begin a confident academic journey in Bheemdatt-Kanchanpur.
              </h2>
              <div className="mt-5 flex flex-wrap gap-3 text-[13px]" style={{ color: "var(--color-ink-soft)" }}>
                <span className="inline-flex items-center gap-2"><Landmark size={15} style={{ color: "var(--color-brass-deep)" }} /> Bheemdatt-18, Katan</span>
                <span className="inline-flex items-center gap-2"><Award size={15} style={{ color: "var(--color-brass-deep)" }} /> PABSON Affiliated</span>
                <span className="inline-flex items-center gap-2"><GraduationCap size={15} style={{ color: "var(--color-brass-deep)" }} /> Four +2 Streams</span>
              </div>
            </div>
            <a
              href="/apply"
              className="pill-btn inline-flex items-center justify-center gap-3 px-7 py-4 text-[12.5px] font-semibold uppercase w-full sm:w-auto"
              style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)", letterSpacing: "0.16em" }}
            >
              Admission Inquiry
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-parchment)" }}>
      <SiteHeader />
      <main className="flex-1">
        <AboutHero />
        <AboutSubNav />
        <OurStory />
        <StatsStrip />
        <VisionMission />
        <Objectives />
        <ProgramAndCampusLife />
        <Messages />
        <CampusEnvironment />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
