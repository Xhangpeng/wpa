import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Hotel,
  Laptop,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

const HERO_IMAGE = "/assets-images/background-img-3.jpg";

type Stream = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
  tone: string;
  facts: string[];
  overview: string;
  focus: string[];
  practical: string;
  pathways: string[];
};

const STREAMS: Stream[] = [
  {
    id: "hotel-management",
    number: "01",
    eyebrow: "Hospitality · Service · Tourism",
    title: "Hotel Management",
    subtitle:
      "A hands-on hospitality stream for students who want to enter tourism, hotel operations, culinary practice, guest relations, and service leadership.",
    image: "/assets-images/hotel-management.png",
    imageAlt: "Hotel Management practical learning at Western Public Academy",
    Icon: Hotel,
    tone: "Hospitality skills shaped by service discipline",
    facts: ["Practical exposure", "Guest service", "Kitchen basics", "Tourism orientation"],
    overview:
      "Hotel Management combines professional conduct, service culture, hospitality operations, food and beverage basics, front-office awareness, and communication skills. It prepares students for Nepal's expanding tourism and hospitality sector while also opening doors to higher hospitality studies.",
    focus: [
      "Front-office and guest relation basics",
      "Food production and service awareness",
      "Housekeeping and operational standards",
      "Tourism, culture, and hospitality communication",
      "Professional grooming and workplace etiquette",
      "Teamwork through practical demonstrations",
    ],
    practical:
      "The stream benefits from visual, demonstration-led learning. Students develop professional habits through service routines, hospitality role-play, practical assignments, and reflective observation of tourism and hotel standards.",
    pathways: ["BHM", "Hotel Operations", "Tourism & Travel", "Culinary / Service Careers"],
  },
  {
    id: "computer-science",
    number: "02",
    eyebrow: "Programming · Systems · Digital Thinking",
    title: "Computer Science",
    subtitle:
      "A future-ready stream focused on computational thinking, programming logic, digital systems, and responsible use of technology.",
    image: "/assets-images/gallery-8.jpg",
    imageAlt: "Western Public Academy students participating in digital and academic activities",
    Icon: Laptop,
    tone: "Digital learning with analytical problem-solving",
    facts: ["Programming logic", "Digital literacy", "Project mindset", "IT pathways"],
    overview:
      "Computer Science helps students understand how digital systems work and how technology can be used to solve real academic, social, and professional problems. The stream builds logic, patience, creativity, and structured thinking for students interested in software, engineering, data, and modern IT careers.",
    focus: [
      "Programming fundamentals and logic building",
      "Computer systems and digital tools",
      "Problem-solving through algorithms",
      "Project-based digital assignments",
      "Cyber awareness and responsible technology use",
      "Foundation for software and IT studies",
    ],
    practical:
      "Students are guided to think like creators: building small projects, testing ideas, improving logic, and using digital tools responsibly to solve practical academic and community problems.",
    pathways: ["BSc CSIT / BIT", "Software Engineering", "Data & Analytics", "IT Support / Systems"],
  },
  {
    id: "sports-science",
    number: "03",
    eyebrow: "Performance · Health · Discipline",
    title: "Sports Science",
    subtitle:
      "A stream for students interested in physical education, fitness, training science, sports leadership, and health-oriented careers.",
    image: "/assets-images/sports-science.jpeg",
    imageAlt: "Sports Science learning and athletics at Western Public Academy",
    Icon: Trophy,
    tone: "Physical performance guided by scientific understanding",
    facts: ["Fitness science", "Sports leadership", "Event discipline", "Health awareness"],
    overview:
      "Sports Science links active participation with academic understanding of movement, health, fitness, discipline, and leadership. It is ideal for students who want sport to become more than an activity: a pathway to education, coaching, training, and community health leadership.",
    focus: [
      "Human movement and fitness foundations",
      "Training routines and performance awareness",
      "Sportsmanship, teamwork, and discipline",
      "Event participation and leadership",
      "Health, wellness, and physical education",
      "Career readiness for sport-related pathways",
    ],
    practical:
      "Students learn through participation, reflection, and guided observation. The program encourages discipline, teamwork, body awareness, and leadership through school sports culture and structured activity.",
    pathways: ["Physical Education", "Coaching & Training", "Fitness Industry", "Sports Leadership"],
  },
  {
    id: "education",
    number: "04",
    eyebrow: "Teaching · Psychology · Community",
    title: "Education",
    subtitle:
      "A thoughtful stream for future educators, mentors, social leaders, and students who want to understand learning, children, and community development.",
    image: "/assets-images/education-faculty.png",
    imageAlt: "Education faculty and teaching-learning environment at Western Public Academy",
    Icon: GraduationCap,
    tone: "Teacher preparation with community responsibility",
    facts: ["Pedagogy", "Child psychology", "Communication", "Classroom practice"],
    overview:
      "The Education stream develops students who are patient, reflective, communicative, and socially responsible. It introduces learning theory, child development, classroom communication, and the role of education in shaping families and communities.",
    focus: [
      "Foundations of pedagogy",
      "Child psychology and learner behaviour",
      "Classroom communication and presentation",
      "Curriculum awareness and teaching practice",
      "Ethics, care, and community service",
      "Preparation for teaching and social-sector studies",
    ],
    practical:
      "The stream is strengthened through observation, presentation, peer teaching, and reflective assignments. Students learn to speak clearly, listen patiently, and lead with care.",
    pathways: ["B.Ed.", "Teaching Careers", "Counselling & Child Development", "Community Education"],
  },
];

const LEARNING_MODEL = [
  {
    Icon: ClipboardCheck,
    title: "Eligibility & Guidance",
    body: "Students receive stream counseling so that subject choice connects with interest, performance, and long-term study goals.",
  },
  {
    Icon: Users,
    title: "Mentored Classrooms",
    body: "Teachers guide students through disciplined routines, presentations, discussion, and revision systems that support exam readiness.",
  },
  {
    Icon: Compass,
    title: "Practical Exposure",
    body: "Each stream includes practical, project, observation, or activity-based learning so the curriculum feels connected to real life.",
  },
  {
    Icon: CheckCircle2,
    title: "Pathway Preparation",
    body: "The goal is not only to complete +2, but to prepare students for higher studies, interviews, scholarships, and meaningful careers.",
  },
];

function scrollToHash() {
  const { hash, pathname } = window.location;
  const slug = pathname.startsWith("/programs/") ? pathname.split("/").filter(Boolean).at(-1) : "";
  const id = hash ? hash.replace("#", "") : slug;
  if (!id) return;
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
}

function ProgramMedia({ stream, reverse }: { stream: Stream; reverse?: boolean }) {
  const Icon = stream.Icon;
  const isComputer = stream.id === "computer-science";

  return (
    <div
      className={`relative reveal lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}
      style={{ minHeight: 0 }}
    >
      <div className="soft-frame soft-frame-lg group relative overflow-hidden" style={{ boxShadow: "0 32px 70px -42px rgba(15,61,46,0.45)" }}>
        <img
          src={stream.image}
          alt={stream.imageAlt}
          className="img-zoom w-full h-[260px] min-[420px]:h-[320px] sm:h-[420px] lg:h-[520px] object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ background: isComputer ? "linear-gradient(135deg, rgba(7,28,36,0.18), rgba(15,61,46,0.38))" : "linear-gradient(180deg, rgba(10,42,32,0.04), rgba(10,42,32,0.26))" }} />
        {isComputer && (
          <div className="absolute inset-6 pointer-events-none">
            <div className="absolute top-0 left-0 h-px w-28 bg-cyan-200/70" />
            <div className="absolute top-0 left-0 h-28 w-px bg-cyan-200/70" />
            <div className="absolute bottom-0 right-0 h-px w-32 bg-cyan-200/70" />
            <div className="absolute bottom-0 right-0 h-32 w-px bg-cyan-200/70" />
            <div className="absolute right-6 top-8 rounded-full border border-cyan-100/45 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-50 backdrop-blur-sm">
              Logic · Code · Create
            </div>
          </div>
        )}
        <div className="absolute left-3 bottom-3 right-3 sm:left-5 sm:bottom-5 sm:right-5 rounded-xl p-3 sm:p-4 backdrop-blur-md" style={{ background: "rgba(10,42,32,0.76)", border: "1px solid rgba(201,161,74,0.35)" }}>
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full flex items-center justify-center" style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}>
              <Icon size={20} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--color-brass)" }}>{stream.number} · {stream.title}</div>
              <p className="mt-1 text-[12.5px] sm:text-sm leading-relaxed" style={{ color: "rgba(247,241,229,0.86)" }}>{stream.tone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  useReveal();

  useEffect(() => {
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-parchment)", color: "var(--color-ink)" }}>
      <SiteHeader />
      <main>
        <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[82vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_IMAGE} alt="Western Public Academy academic programs" className="w-full h-full object-cover" loading="eager" decoding="async" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,42,32,0.92) 0%, rgba(10,42,32,0.72) 52%, rgba(10,42,32,0.38) 100%)" }} />
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(201,161,74,0.45), transparent 24%), radial-gradient(circle at 82% 70%, rgba(247,241,229,0.22), transparent 28%)" }} />
          </div>

          <div className="container relative z-10 pt-12 sm:pt-16 pb-16 sm:pb-20 lg:pt-24 lg:pb-24">
            <div className="max-w-5xl reveal">
              <div className="gold-rule mb-6" style={{ color: "var(--color-brass)" }}>Academic Programs</div>
              <div className="flex flex-wrap gap-2 mb-6 max-w-full">
                {STREAMS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.16em] transition-all duration-300"
                    style={{ border: "1px solid rgba(201,161,74,0.45)", color: "var(--color-parchment)", background: "rgba(247,241,229,0.08)" }}
                  >
                    {s.title}
                  </a>
                ))}
              </div>
              <h1 className="display-serif text-[clamp(2.7rem,13vw,8.9rem)] leading-[0.96] sm:leading-[0.94]" style={{ color: "var(--color-parchment)" }}>
                Choose a stream that shapes your <span className="italic" style={{ color: "var(--color-brass)" }}>future.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-[17px] sm:text-[20px] leading-relaxed" style={{ color: "rgba(247,241,229,0.84)" }}>
                Western Public Academy offers focused +2 pathways where classroom discipline, practical learning, mentorship, and career imagination work together. Each stream is presented with the same care students experience on campus: guided, purposeful, and connected to life beyond school.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a href="#streams" className="pill-btn inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] font-semibold uppercase" style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)", letterSpacing: "0.16em" }}>
                  Explore Streams <ArrowRight size={15} />
                </a>
                <a href="#learning-model" className="pill-btn inline-flex items-center justify-center gap-2 px-6 py-3 text-[12px] font-semibold uppercase" style={{ border: "1px solid rgba(247,241,229,0.45)", color: "var(--color-parchment)", letterSpacing: "0.16em" }}>
                  Learning Model <Sparkles size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="streams" className="py-20 lg:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end mb-12 lg:mb-16">
              <div className="lg:col-span-7 reveal">
                <div className="gold-rule mb-4">+2 Academic Streams</div>
                <h2 className="display-serif text-[clamp(2.5rem,5vw,5.7rem)] leading-[0.98]">
                  Four pathways, one disciplined school culture.
                </h2>
              </div>
              <p className="lg:col-span-5 reveal text-[16px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                Each stream is presented with a clear overview, focus areas, practical learning direction, and future pathways, so students and guardians can understand what the choice means beyond the subject name.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STREAMS.map((stream) => {
                const Icon = stream.Icon;
                return (
                  <a key={stream.id} href={`#${stream.id}`} className="editorial-card reveal group p-5 min-h-[230px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-[12px] font-semibold" style={{ color: "var(--color-brass-deep)", letterSpacing: "0.18em" }}>{stream.number}</span>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-8deg]" style={{ background: "var(--color-parchment-deep)", color: "var(--color-forest-deep)" }}>
                          <Icon size={18} />
                        </div>
                      </div>
                      <h3 className="display-serif text-2xl leading-tight">{stream.title}</h3>
                      <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{stream.subtitle}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase font-semibold" style={{ color: "var(--color-brass-deep)", letterSpacing: "0.16em" }}>
                      View focus <ArrowRight size={13} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {STREAMS.map((stream, index) => {
          const Icon = stream.Icon;
          const reverse = index % 2 === 1;
          return (
            <section key={stream.id} id={stream.id} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 lg:py-24" style={{ background: index % 2 === 0 ? "#fffaf0" : "var(--color-parchment)" }}>
              <div className="container">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <ProgramMedia stream={stream} reverse={reverse} />

                  <div className={`lg:col-span-6 reveal ${reverse ? "lg:order-1" : ""}`}>
                    <div className="flex items-start sm:items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--color-forest-deep)", color: "var(--color-brass)" }}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="eyebrow">{stream.eyebrow}</div>
                        <div className="text-[12px] mt-1" style={{ color: "var(--color-ink-soft)" }}>{stream.facts.join(" · ")}</div>
                      </div>
                    </div>
                    <h2 className="display-serif text-[clamp(2.4rem,4.8vw,5rem)] leading-[0.98]">{stream.title}</h2>
                    <p className="mt-5 text-[17px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{stream.overview}</p>
                    <div className="mt-7 grid sm:grid-cols-2 gap-3">
                      {stream.focus.map((item) => (
                        <div key={item} className="flex items-start gap-2 rounded-xl p-3" style={{ background: "rgba(239,230,210,0.65)", border: "1px solid var(--color-parchment-deep)" }}>
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-brass-deep)" }} />
                          <span className="text-[13.5px] leading-relaxed" style={{ color: "var(--color-ink)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 editorial-card p-5" style={{ background: "var(--color-forest-deep)", borderColor: "rgba(201,161,74,0.34)" }}>
                      <div className="eyebrow" style={{ color: "var(--color-brass)" }}>Practical Component</div>
                      <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: "rgba(247,241,229,0.86)" }}>{stream.practical}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {stream.pathways.map((path) => (
                        <span key={path} className="rounded-full px-3.5 py-2 text-[12px]" style={{ background: "#fff", border: "1px solid var(--color-parchment-deep)", color: "var(--color-forest-deep)" }}>
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section id="learning-model" className="scroll-mt-28 py-20 lg:py-28" style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)" }}>
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5 reveal">
                <div className="gold-rule mb-4" style={{ color: "var(--color-brass)" }}>How Students Are Guided</div>
                <h2 className="display-serif text-[clamp(2.4rem,4.7vw,5.3rem)] leading-[0.98]" style={{ color: "var(--color-parchment)" }}>
                  Stream choice becomes a serious academic journey.
                </h2>
                <p className="mt-6 text-[16px] leading-relaxed" style={{ color: "rgba(247,241,229,0.78)" }}>
                  This section explains not only what students study, but how the school supports them. Western Public Academy's stream model is designed around guidance, mentorship, practical exposure, and pathway preparation.
                </p>
              </div>
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {LEARNING_MODEL.map(({ Icon, title, body }) => (
                  <div key={title} className="reveal rounded-2xl p-6" style={{ background: "rgba(247,241,229,0.08)", border: "1px solid rgba(201,161,74,0.24)" }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="display-serif text-2xl" style={{ color: "var(--color-parchment)" }}>{title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "rgba(247,241,229,0.76)" }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, var(--color-brass), transparent 22%), radial-gradient(circle at 78% 80%, var(--color-forest-deep), transparent 28%)" }} />
          <div className="container relative">
            <div className="editorial-card reveal p-8 sm:p-10 lg:p-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center" style={{ background: "#fff" }}>
              <div className="lg:col-span-8">
                <div className="gold-rule mb-4">Admissions Counseling</div>
                <h2 className="display-serif text-[clamp(2.3rem,4.4vw,4.8rem)] leading-[0.98]">Need help choosing the right stream?</h2>
                <p className="mt-5 text-[16px] leading-relaxed max-w-3xl" style={{ color: "var(--color-ink-soft)" }}>
                  Students and families can compare interest, strengths, future study plans, and career goals before selecting a stream. This keeps the decision personal and practical rather than rushed.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <a href="/contact" className="pill-btn inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase" style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)", letterSpacing: "0.16em" }}>
                  Ask for Counseling <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
