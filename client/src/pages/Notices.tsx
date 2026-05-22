/*
 * Western Public Academy — Notices & Announcements Page
 * Design: "Himalayan Heritage" editorial system — asymmetric layouts,
 * restrained palette (forest, brass, parchment, terracotta), Fraunces + Inter.
 */
import { useState, useRef } from "react";
import {
  Megaphone,
  CalendarDays,
  FileText,
  Bell,
  Clock,
  Eye,
  ZoomIn,
  ZoomOut,
  X,
  Download,
  Printer,
  ArrowUpRight,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

/* ─── Notice Data ─── */
type NoticeCategory = "all" | "general" | "exams" | "academic" | "events";

interface Notice {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  description: string;
  isNew?: boolean;
  fullContent?: string;
}

const NOTICES: Notice[] = [
  {
    id: "1",
    title: "Annual Examination Schedule 2083 B.S.",
    date: "2083-01-15",
    category: "exams",
    description:
      "The annual examination for all +2 streams will commence from Baisakh 25, 2083. Students are advised to collect their admit cards from the examination cell.",
    isNew: true,
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal
Affiliated with PABSON | Est. 2066 B.S.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Annual Examination Schedule 2083 B.S.
Date: 2083-01-15 (Baisakh 15, 2083)
Ref No: WPA/EXAM/2083/001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To all students of +2 (Grade 11 & 12),

This is to inform all students that the Annual Examination for the academic session 2082/83 will commence from Baisakh 25, 2083 B.S. The examination schedule is as follows:

COMPUTER SCIENCE STREAM:
• Computer Science — Baisakh 25
• Mathematics — Baisakh 27
• Physics — Baisakh 29
• Practical Examination — Jestha 2-3

HOTEL MANAGEMENT STREAM:
• Food Production — Baisakh 25
• Front Office Management — Baisakh 27
• Housekeeping — Baisakh 29
• Practical Examination — Jestha 2-3

SPORTS SCIENCE STREAM:
• Sports Physiology — Baisakh 25
• Sports Management — Baisakh 27
• Physical Education — Baisakh 29
• Practical Assessment — Jestha 2-3

EDUCATION STREAM:
• Foundation of Education — Baisakh 25
• Educational Psychology — Baisakh 27
• Curriculum Development — Baisakh 29
• Teaching Practice — Jestha 2-3

IMPORTANT INSTRUCTIONS:
1. Students must collect their admit cards from the Examination Cell by Baisakh 20, 2083.
2. Examination time: 7:00 AM to 10:00 AM (Morning Shift)
3. Students must arrive 30 minutes before the examination.
4. Mobile phones and electronic devices are strictly prohibited.
5. Use of unfair means will result in immediate cancellation.

For any queries, please contact the Examination Cell.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Examination Controller
Western Public Academy
Contact: exam@westernpublic.edu.np`,
  },
  {
    id: "2",
    title: "Admission Open for 2083/84 Session",
    date: "2083-01-10",
    category: "academic",
    description:
      "Western Public Academy announces admission for the academic session 2083/84 in all four +2 streams.",
    isNew: true,
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal
Affiliated with PABSON | Est. 2066 B.S.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Admission Open for Academic Session 2083/84
Date: 2083-01-10 (Baisakh 10, 2083)
Ref No: WPA/ADM/2083/001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Western Public Academy is pleased to announce that admissions are now open for the academic session 2083/84 in the following +2 streams:

PROGRAMS OFFERED:
1. Hotel Management
2. Computer Science
3. Sports Science
4. Education

ELIGIBILITY:
• Passed SEE (Secondary Education Examination) or equivalent
• Minimum GPA as per NEB guidelines

DOCUMENTS REQUIRED:
• SEE Mark Sheet & Character Certificate (Original + 2 copies)
• Migration Certificate (if applicable)
• Passport-size photographs (4 copies)
• Citizenship/Birth Certificate copy

SCHOLARSHIP AVAILABLE:
• Merit-based scholarships for top SEE performers
• Sports quota scholarships
• Need-based financial assistance

APPLICATION DEADLINE: Jestha 15, 2083

For admission inquiries, visit the Administration Office or call 099-XXXXXX.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Administration Office
Western Public Academy`,
  },
  {
    id: "3",
    title: "Inter-School Sports Competition",
    date: "2082-12-20",
    category: "events",
    description:
      "Our school is hosting the annual inter-school sports competition. Events include football, cricket, athletics, and volleyball.",
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Inter-School Sports Competition 2082
Date: 2082-12-20 (Poush 20, 2082)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Western Public Academy is proud to host the Annual Inter-School Sports Competition.

EVENT DETAILS:
• Date: Magh 5-10, 2082
• Venue: Western Public Academy Sports Ground
• Participating Schools: 12 schools from Kanchanpur District

SPORTS EVENTS:
1. Football (Boys & Girls)
2. Cricket (Boys)
3. Volleyball (Boys & Girls)
4. Athletics (100m, 200m, 400m, Long Jump, High Jump)
5. Badminton (Boys & Girls)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sports Department
Western Public Academy`,
  },
  {
    id: "4",
    title: "Parent-Teacher Meeting Notice",
    date: "2082-12-15",
    category: "general",
    description:
      "A parent-teacher meeting is scheduled for all classes. Parents are requested to attend and discuss their ward's academic progress.",
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Parent-Teacher Meeting
Date: 2082-12-15 (Poush 15, 2082)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear Parents/Guardians,

A Parent-Teacher Meeting is scheduled as follows:

DATE: Poush 22, 2082 (Saturday)
TIME: 10:00 AM - 1:00 PM
VENUE: Respective Classrooms

AGENDA:
1. Discussion on academic progress
2. Mid-term examination performance review
3. Attendance and discipline report
4. Upcoming academic calendar briefing

Your presence is highly appreciated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Principal
Western Public Academy`,
  },
  {
    id: "5",
    title: "Mid-Term Examination Results Published",
    date: "2082-12-01",
    category: "exams",
    description:
      "Mid-term examination results for all streams have been published. Students can check their results at the administration office.",
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Mid-Term Examination Results Published
Date: 2082-12-01 (Mangsir 16, 2082)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mid-Term Examination results for the academic session 2082/83 have been published.

HOW TO CHECK RESULTS:
• Visit the Administration Office during office hours
• Contact your respective class teacher

IMPORTANT:
• Students with backlogs must meet their subject teachers for remedial guidance.
• Re-examination for absent students will be held on Poush 5-7, 2082.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Examination Cell
Western Public Academy`,
  },
  {
    id: "6",
    title: "Cultural Program & Annual Day Celebration",
    date: "2082-11-25",
    category: "events",
    description:
      "The annual cultural program and prize distribution ceremony will be held in the school auditorium.",
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Annual Cultural Program & Prize Distribution
Date: 2082-11-25 (Mangsir 10, 2082)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Western Public Academy cordially invites all to the Annual Cultural Program and Prize Distribution Ceremony.

DATE: Mangsir 20, 2082
TIME: 11:00 AM onwards
VENUE: School Auditorium

PROGRAM HIGHLIGHTS:
• Cultural dances and songs
• Drama performances
• Academic excellence awards
• Sports achievement recognition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cultural Committee
Western Public Academy`,
  },
  {
    id: "7",
    title: "Library Membership Renewal",
    date: "2082-11-20",
    category: "general",
    description:
      "All students are requested to renew their library membership for the current academic session.",
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Library Membership Renewal
Date: 2082-11-20 (Mangsir 5, 2082)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Library membership renewal for the academic session 2082/83 is now open.

DETAILS:
• Renewal Fee: Rs. 200 (annual)
• New books added: 500+ titles
• Digital library access included

DEADLINE: Mangsir 25, 2082

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Librarian
Western Public Academy`,
  },
  {
    id: "8",
    title: "Scholarship Application Deadline Extended",
    date: "2082-11-15",
    category: "academic",
    description:
      "The deadline for merit-based scholarship applications has been extended. Eligible students are encouraged to apply.",
    fullContent: `WESTERN PUBLIC ACADEMY
Bheemdatt-18, Katan, Kanchanpur, Nepal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTICE

Subject: Scholarship Application Deadline Extended
Date: 2082-11-15 (Kartik 30, 2082)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The deadline for Merit-Based Scholarship applications has been extended.

NEW DEADLINE: Mangsir 15, 2082

ELIGIBILITY:
• GPA 3.6+ in previous examination
• Regular attendance (minimum 90%)

SCHOLARSHIP COVERAGE:
• Full scholarship: 100% tuition waiver (GPA 3.8+)
• Partial scholarship: 50% tuition waiver (GPA 3.6-3.79)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scholarship Committee
Western Public Academy`,
  },
];

const CATEGORIES = [
  { key: "general" as NoticeCategory, label: "General", Icon: Megaphone },
  { key: "exams" as NoticeCategory, label: "Examinations", Icon: CalendarDays },
  { key: "academic" as NoticeCategory, label: "Academic", Icon: FileText },
  { key: "events" as NoticeCategory, label: "Events", Icon: Bell },
];

const TABS: { key: NoticeCategory; label: string }[] = [
  { key: "all", label: "All Notices" },
  { key: "exams", label: "Exams" },
  { key: "academic", label: "Academic" },
  { key: "general", label: "General" },
  { key: "events", label: "Events" },
];

/* ─────────────────────── Hero (asymmetric editorial) ─────────────────────── */
function NoticesHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/manus-storage/BACKGROUND-IMG-2_af8cbdf6.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Forest overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(10,42,32,0.92) 0%, rgba(15,61,46,0.85) 50%, rgba(15,61,46,0.7) 100%)",
        }}
      />
      {/* Grain texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative container py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
          {/* Left: editorial heading */}
          <div className="col-span-12 lg:col-span-7">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>
              Official Announcements
            </div>

            <h1
              className="display-serif mt-5 text-[32px] sm:text-[40px] lg:text-[52px]"
              style={{ color: "var(--color-parchment)", letterSpacing: "-0.025em" }}
            >
              Notice{" "}
              <span style={{ fontStyle: "italic", color: "var(--color-brass)" }}>
                Board
              </span>
            </h1>

            <p
              className="mt-5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed"
              style={{ color: "rgba(247,241,229,0.85)" }}
            >
              Exam schedules, admission updates, and important announcements for
              students, faculty, and parents of Western Public Academy.
            </p>
          </div>

          {/* Right: floating stat card */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div
              className="p-5 sm:p-6 relative"
              style={{
                background: "var(--color-parchment)",
                border: "1px solid var(--color-parchment-deep)",
                boxShadow: "0 24px 60px -24px rgba(0,0,0,0.4)",
                borderRadius: 14,
              }}
            >
              {/* Brass corner accent */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 36,
                  height: 36,
                  borderTop: "2px solid var(--color-brass)",
                  borderLeft: "2px solid var(--color-brass)",
                  borderTopLeftRadius: 14,
                }}
              />
              <div className="display-serif text-[36px]" style={{ color: "var(--color-forest-deep)", lineHeight: 1 }}>
                {NOTICES.length}
                <span style={{ color: "var(--color-brass)" }}>+</span>
              </div>
              <div className="eyebrow mt-2">Active Notices</div>
              <div
                aria-hidden
                className="mt-4 mb-3"
                style={{ height: 1, background: "linear-gradient(90deg, var(--color-brass) 0%, transparent 100%)" }}
              />
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                Stay informed with the latest updates from the administration, examination cell, and student affairs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Category Filter (editorial cards) ─────────────────── */
function CategoryFilter({
  onSelect,
  activeTab,
}: {
  onSelect: (cat: NoticeCategory) => void;
  activeTab: NoticeCategory;
}) {
  return (
    <section className="py-10 lg:py-12 paper-texture">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {CATEGORIES.map(({ key, label, Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className="editorial-card p-5 sm:p-6 text-left group"
                style={{
                  borderColor: isActive ? "var(--color-brass)" : undefined,
                  boxShadow: isActive ? "0 28px 56px -28px rgba(15, 61, 46, 0.28)" : undefined,
                  transform: isActive ? "translateY(-4px)" : undefined,
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                  style={{
                    width: 44,
                    height: 44,
                    background: isActive ? "var(--color-forest-deep)" : "var(--color-parchment)",
                    border: `1px solid ${isActive ? "var(--color-forest-deep)" : "var(--color-brass)"}`,
                    color: isActive ? "var(--color-brass)" : "var(--color-forest-deep)",
                    borderRadius: 12,
                    boxShadow: "inset 0 0 0 3px #fff",
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  className="display-serif text-[16px] sm:text-[18px]"
                  style={{ color: "var(--color-forest-deep)" }}
                >
                  {label}
                </h3>
                <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                  {key === "general" && "School-wide announcements & updates"}
                  {key === "exams" && "Schedules, results & examination info"}
                  {key === "academic" && "Admissions, courses & registration"}
                  {key === "events" && "Programs, sports & celebrations"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PDF-Style Notice Viewer ─────────────────── */
function NoticeViewer({
  notice,
  onClose,
}: {
  notice: Notice;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(100);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 20, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 20, 60));

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && notice.fullContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${notice.title}</title>
            <style>
              body { font-family: 'Courier New', monospace; padding: 40px; line-height: 1.6; white-space: pre-wrap; }
              @media print { body { padding: 20px; } }
            </style>
          </head>
          <body>${notice.fullContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,42,32,0.88)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Viewer Panel */}
      <div
        className="relative w-[95vw] max-w-[780px] h-[85vh] flex flex-col overflow-hidden"
        style={{
          background: "var(--color-parchment)",
          boxShadow: "0 32px 80px -20px rgba(0,0,0,0.6)",
          borderRadius: 16,
          border: "1px solid rgba(201,161,74,0.3)",
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{
            background: "var(--color-forest-deep)",
            borderBottom: "2px solid var(--color-brass)",
          }}
        >
          <div className="flex items-center gap-3">
            <FileText size={16} style={{ color: "var(--color-brass)" }} />
            <span
              className="text-[12px] font-medium truncate max-w-[250px] sm:max-w-[380px]"
              style={{ color: "var(--color-parchment)" }}
            >
              {notice.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={handleZoomOut} className="p-1.5 rounded-md transition-colors hover:bg-white/10" title="Zoom Out">
              <ZoomOut size={15} style={{ color: "var(--color-parchment)" }} />
            </button>
            <span className="text-[11px] px-2 min-w-[36px] text-center font-medium" style={{ color: "var(--color-brass)" }}>
              {zoom}%
            </span>
            <button onClick={handleZoomIn} className="p-1.5 rounded-md transition-colors hover:bg-white/10" title="Zoom In">
              <ZoomIn size={15} style={{ color: "var(--color-parchment)" }} />
            </button>
            <div className="w-px h-4 mx-2 bg-white/20" />
            <button onClick={handlePrint} className="p-1.5 rounded-md transition-colors hover:bg-white/10" title="Print / Save PDF">
              <Printer size={15} style={{ color: "var(--color-parchment)" }} />
            </button>
            <button onClick={handlePrint} className="p-1.5 rounded-md transition-colors hover:bg-white/10" title="Download">
              <Download size={15} style={{ color: "var(--color-parchment)" }} />
            </button>
            <div className="w-px h-4 mx-2 bg-white/20" />
            <button onClick={onClose} className="p-1.5 rounded-md transition-colors hover:bg-red-500/20" title="Close">
              <X size={15} style={{ color: "var(--color-parchment)" }} />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div
          className="flex-1 overflow-auto p-5 sm:p-8"
          style={{ background: "#e8e2d4" }}
        >
          <div
            ref={contentRef}
            className="mx-auto transition-transform duration-200"
            style={{
              background: "#fffef9",
              padding: "48px 40px",
              maxWidth: "680px",
              minHeight: "90%",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
              borderRadius: 4,
              border: "1px solid var(--color-parchment-deep)",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.12)",
            }}
          >
            <pre
              className="whitespace-pre-wrap text-[13px] leading-[1.7]"
              style={{
                fontFamily: "'Courier New', 'Consolas', monospace",
                color: "#1a1a1a",
              }}
            >
              {notice.fullContent || notice.description}
            </pre>
          </div>
        </div>

        {/* Footer bar */}
        <div
          className="flex items-center justify-between px-5 py-2.5 shrink-0"
          style={{
            background: "var(--color-forest-deep)",
            borderTop: "2px solid var(--color-brass)",
          }}
        >
          <span className="text-[10px]" style={{ color: "rgba(247,241,229,0.7)" }}>
            Published: {notice.date}
          </span>
          <span className="text-[10px] uppercase font-semibold" style={{ color: "var(--color-brass)", letterSpacing: "0.1em" }}>
            {notice.category}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Notice Row (editorial list item) ─────────────────── */
function NoticeRow({
  notice,
  onView,
}: {
  notice: Notice;
  onView: (notice: Notice) => void;
}) {
  const categoryColors: Record<string, string> = {
    general: "var(--color-forest-deep)",
    exams: "var(--color-terracotta)",
    academic: "var(--color-brass-deep)",
    events: "var(--color-forest-soft)",
  };

  const accentColor = categoryColors[notice.category] || categoryColors.general;

  return (
    <article
      className="editorial-card p-5 sm:p-6 group cursor-pointer"
      onClick={() => onView(notice)}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Date block */}
        <div
          className="shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl"
          style={{
            background: "var(--color-parchment)",
            border: "1px solid var(--color-parchment-deep)",
          }}
        >
          <span className="display-serif text-[18px] sm:text-[20px]" style={{ color: "var(--color-forest-deep)", lineHeight: 1 }}>
            {notice.date.split("-")[2]}
          </span>
          <span className="text-[9px] uppercase font-semibold mt-0.5" style={{ color: "var(--color-ink-soft)", letterSpacing: "0.08em" }}>
            {new Date(notice.date).toLocaleString("en", { month: "short" })}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[9px] uppercase font-bold px-2 py-0.5 rounded"
              style={{
                color: accentColor,
                background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
                letterSpacing: "0.08em",
              }}
            >
              {notice.category}
            </span>
            {notice.isNew && (
              <span
                className="text-[9px] uppercase font-bold px-2 py-0.5 rounded"
                style={{
                  background: "var(--color-brass)",
                  color: "var(--color-forest-deep)",
                  letterSpacing: "0.06em",
                }}
              >
                New
              </span>
            )}
          </div>

          <h3
            className="display-serif text-[16px] sm:text-[18px] leading-snug transition-colors duration-300 group-hover:text-[var(--color-terracotta)]"
            style={{ color: "var(--color-forest-deep)" }}
          >
            {notice.title}
          </h3>

          <p className="text-[13px] mt-1.5 leading-relaxed line-clamp-2" style={{ color: "var(--color-ink-soft)" }}>
            {notice.description}
          </p>
        </div>

        {/* Action */}
        <div className="shrink-0 flex items-center self-center">
          <span
            className="inline-flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-[var(--color-brass)] group-hover:text-[var(--color-forest-deep)]"
            style={{
              width: 40,
              height: 40,
              background: "var(--color-forest)",
              color: "var(--color-parchment)",
              borderRadius: 9999,
            }}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─────────────── Announcements Section ─────────────── */
function AnnouncementsSection({
  activeTab,
  setActiveTab,
  onViewNotice,
}: {
  activeTab: NoticeCategory;
  setActiveTab: (tab: NoticeCategory) => void;
  onViewNotice: (notice: Notice) => void;
}) {
  const filtered =
    activeTab === "all"
      ? NOTICES
      : NOTICES.filter((n) => n.category === activeTab);

  return (
    <section
      className="py-14 lg:py-20"
      style={{ background: "var(--color-parchment-deep)" }}
    >
      <div className="container">
        {/* Section header — asymmetric */}
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-6 reveal">
            <div className="gold-rule">Latest Updates</div>
            <h2
              className="display-serif mt-4 text-[28px] sm:text-[34px] lg:text-[42px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              All{" "}
              <span style={{ fontStyle: "italic" }}>Announcements</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end reveal">
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
              Filter by category to find relevant notices, or browse all recent announcements below.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 reveal">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="pill-btn px-5 py-2.5 text-[11px] uppercase font-semibold press"
              style={{
                letterSpacing: "0.12em",
                background: activeTab === key ? "var(--color-forest-deep)" : "#fff",
                color: activeTab === key ? "var(--color-parchment)" : "var(--color-ink-soft)",
                border: activeTab === key ? "1px solid var(--color-forest-deep)" : "1px solid var(--color-parchment-deep)",
                boxShadow: activeTab === key ? "0 8px 20px -8px rgba(15,61,46,0.3)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Notice List */}
        {filtered.length > 0 ? (
          <div className="space-y-4 reveal">
            {filtered.map((notice) => (
              <NoticeRow key={notice.id} notice={notice} onView={onViewNotice} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 reveal">
            <p className="text-[15px]" style={{ color: "var(--color-ink-soft)" }}>
              No notices in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────── Quick Contact (dark editorial) ─────────────── */
function QuickContact() {
  const contacts = [
    { dept: "Examination Cell", detail: "exam@westernpublic.edu.np", Icon: CalendarDays },
    { dept: "Student Affairs", detail: "student.affairs@westernpublic.edu.np", Icon: Megaphone },
    { dept: "Administration", detail: "admin@westernpublic.edu.np", Icon: FileText },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/manus-storage/BACKGROUND-IMG-3_2f26548e.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(115deg, rgba(10,42,32,0.92) 0%, rgba(15,61,46,0.88) 60%, rgba(15,61,46,0.75) 100%)",
        }}
      />

      <div className="relative container py-14 lg:py-18">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-5 reveal">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>
              Need Help?
            </div>
            <h2
              className="display-serif mt-4 text-[28px] sm:text-[34px]"
              style={{ color: "var(--color-parchment)" }}
            >
              Contact the relevant department directly.
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal">
            <div className="space-y-3">
              {contacts.map((c) => (
                <div
                  key={c.dept}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: "rgba(247,241,229,0.06)",
                    border: "1px solid rgba(201,161,74,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,161,74,0.4)";
                    (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,161,74,0.2)";
                    (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(201,161,74,0.15)",
                      border: "1px solid rgba(201,161,74,0.3)",
                    }}
                  >
                    <c.Icon size={18} style={{ color: "var(--color-brass)" }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold" style={{ color: "var(--color-parchment)", letterSpacing: "0.02em" }}>
                      {c.dept}
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: "rgba(247,241,229,0.6)" }}>
                      {c.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Main Page ─────────────────── */
export default function Notices() {
  const [activeTab, setActiveTab] = useState<NoticeCategory>("all");
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  useReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-parchment)" }}>
      <SiteHeader />
      <main className="flex-1">
        <NoticesHero />
        <CategoryFilter onSelect={(cat) => setActiveTab(cat)} activeTab={activeTab} />
        <AnnouncementsSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onViewNotice={(notice) => setViewingNotice(notice)}
        />
        <QuickContact />
      </main>
      <SiteFooter />

      {/* PDF-style Notice Viewer Modal */}
      {viewingNotice && (
        <NoticeViewer
          notice={viewingNotice}
          onClose={() => setViewingNotice(null)}
        />
      )}
    </div>
  );
}
