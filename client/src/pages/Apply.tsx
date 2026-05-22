/*
 * Western Public Academy — Apply Now Page
 * Design: "Himalayan Heritage" editorial system — asymmetric layouts,
 * restrained palette (forest, brass, parchment, terracotta), Fraunces + Inter.
 */
import { useState } from "react";
import {
  GraduationCap,
  User,
  Users,
  BookOpen,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Star,
  Briefcase,
  Hotel,
  Laptop,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

/* ─────────────────────── Hero (asymmetric editorial) ─────────────────────── */
function ApplyHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/assets-images/background-img-2.jpg)",
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
              Admissions 2083/84
            </div>

            <h1
              className="display-serif mt-5 text-[32px] sm:text-[40px] lg:text-[52px]"
              style={{ color: "var(--color-parchment)", letterSpacing: "-0.025em" }}
            >
              Apply{" "}
              <span style={{ fontStyle: "italic", color: "var(--color-brass)" }}>
                Now
              </span>
            </h1>

            <p
              className="mt-5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed"
              style={{ color: "rgba(247,241,229,0.85)" }}
            >
              Begin your academic journey at Western Public Academy. Complete the application form below and our admissions team will be in touch.
            </p>
          </div>

          {/* Right: admission highlights card */}
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
              <div className="display-serif text-[14px] mb-3" style={{ color: "var(--color-forest-deep)" }}>
                Admission Highlights
              </div>
              <div
                aria-hidden
                className="mb-3"
                style={{ height: 1, background: "linear-gradient(90deg, var(--color-brass) 0%, transparent 100%)" }}
              />
              <ul className="space-y-2">
                {["4 +2 Streams Available", "Merit-based Scholarships", "Sports Quota", "Modern Facilities"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12px]" style={{ color: "var(--color-ink-soft)" }}>
                    <CheckCircle2 size={12} style={{ color: "var(--color-brass)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Programs Strip (editorial) ─────────────────── */
function ProgramsStrip() {
  const programs: { name: string; Icon: LucideIcon }[] = [
    { name: "Hotel Management", Icon: Hotel },
    { name: "Computer Science", Icon: Laptop },
    { name: "Sports Science", Icon: Trophy },
    { name: "Education", Icon: BookOpen },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(115deg, rgba(10,42,32,0.96) 0%, rgba(15,61,46,0.92) 100%)",
        }}
      />
      <div className="relative container py-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {programs.map(({ name, Icon }) => (
            <div
              key={name}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-200"
              style={{
                background: "rgba(247,241,229,0.06)",
                border: "1px solid rgba(201,161,74,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,161,74,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,161,74,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(247,241,229,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,161,74,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{
                  background: "var(--color-brass)",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)",
                }}
              >
                <Icon size={15} style={{ color: "var(--color-forest-deep)" }} />
              </div>
              <span
                className="text-[11px] uppercase font-semibold"
                style={{ color: "var(--color-parchment)", letterSpacing: "0.08em" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center mt-4 text-[11px]" style={{ color: "rgba(247,241,229,0.5)" }}>
          Programs available for admission in the academic session 2083/84
        </p>
      </div>
    </section>
  );
}

/* ─────────────────── Application Form (editorial) ─────────────────── */
function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
    previousSchool: "",
    gpa: "",
    program: "",
    statement: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Application submitted successfully!", {
      description: "Our admissions team will contact you within 3-5 working days.",
    });
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass = "w-full px-4 py-3 rounded-lg outline-none transition-all text-[13px]";
  const inputStyle = {
    background: "var(--color-parchment)",
    border: "1px solid var(--color-parchment-deep)",
    color: "var(--color-ink)",
  };
  const labelClass = "block text-[11px] uppercase font-semibold mb-1.5";
  const labelStyle = { color: "var(--color-forest-deep)", letterSpacing: "0.06em" };

  if (submitted) {
    return (
      <section className="py-16 lg:py-20 paper-texture">
        <div className="container max-w-lg text-center">
          <div className="editorial-card p-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "var(--color-forest-deep)" }}
            >
              <CheckCircle2 size={32} style={{ color: "var(--color-brass)" }} />
            </div>
            <h2
              className="display-serif text-[26px] sm:text-[30px] mb-3"
              style={{ color: "var(--color-forest-deep)" }}
            >
              Application Submitted!
            </h2>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: "var(--color-ink-soft)" }}>
              Thank you for applying to Western Public Academy. Our admissions team will review your application and contact you within 3-5 working days.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] uppercase font-bold press transition-all"
              style={{
                background: "var(--color-forest-deep)",
                color: "var(--color-parchment)",
                letterSpacing: "0.08em",
                boxShadow: "0 8px 24px -8px rgba(15,61,46,0.4)",
              }}
            >
              Back to Home
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 lg:py-20 paper-texture">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left: context */}
          <div className="col-span-12 lg:col-span-4 reveal">
            <div className="gold-rule">Application Form</div>
            <h2
              className="display-serif mt-4 text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              Fill your{" "}
              <span style={{ fontStyle: "italic" }}>details</span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
              Complete all required fields below. Ensure all information is accurate for a smooth admission process.
            </p>

            {/* Steps */}
            <div className="mt-8 flex flex-wrap gap-3 lg:flex-col lg:gap-4">
              {[
                { num: "01", label: "Personal Information", color: "var(--color-forest-deep)" },
                { num: "02", label: "Guardian Details", color: "var(--color-brass-deep)" },
                { num: "03", label: "Academic Background", color: "var(--color-terracotta)" },
                { num: "04", label: "Personal Statement", color: "var(--color-forest-soft)" },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 display-serif text-[12px]"
                    style={{ background: step.color, color: "var(--color-parchment)" }}
                  >
                    {step.num}
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: "var(--color-ink-soft)" }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 reveal">
            <form
              onSubmit={handleSubmit}
              className="editorial-card p-6 sm:p-8"
              style={{ boxShadow: "0 28px 56px -28px rgba(15, 61, 46, 0.18)" }}
            >
              {/* Section: Personal Information */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid var(--color-parchment-deep)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--color-forest-deep)", color: "var(--color-brass)" }}
                  >
                    <User size={14} />
                  </div>
                  <h3 className="text-[12px] uppercase font-bold" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.1em" }}>
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass} style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Gender *</label>
                    <select required value={formData.gender} onChange={(e) => update("gender", e.target.value)} className={inputClass} style={inputStyle}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Date of Birth *</label>
                    <input type="date" required value={formData.dob} onChange={(e) => update("dob", e.target.value)} className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+977-XX-XXXXXXX" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Email</label>
                    <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className={inputClass} style={inputStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass} style={labelStyle}>Address *</label>
                    <input type="text" required value={formData.address} onChange={(e) => update("address", e.target.value)} placeholder="Your current address" className={inputClass} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Section: Guardian Information */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid var(--color-parchment-deep)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--color-brass-deep)", color: "var(--color-parchment)" }}
                  >
                    <Users size={14} />
                  </div>
                  <h3 className="text-[12px] uppercase font-bold" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.1em" }}>
                    Guardian Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass} style={labelStyle}>Guardian's Name *</label>
                    <input type="text" required value={formData.guardianName} onChange={(e) => update("guardianName", e.target.value)} placeholder="Guardian's full name" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Guardian's Phone *</label>
                    <input type="tel" required value={formData.guardianPhone} onChange={(e) => update("guardianPhone", e.target.value)} placeholder="+977-XX-XXXXXXX" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Relation *</label>
                    <select required value={formData.guardianRelation} onChange={(e) => update("guardianRelation", e.target.value)} className={inputClass} style={inputStyle}>
                      <option value="">Select relation</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="uncle">Uncle</option>
                      <option value="aunt">Aunt</option>
                      <option value="guardian">Legal Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Academic Background */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid var(--color-parchment-deep)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--color-terracotta)", color: "var(--color-parchment)" }}
                  >
                    <BookOpen size={14} />
                  </div>
                  <h3 className="text-[12px] uppercase font-bold" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.1em" }}>
                    Academic Background
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass} style={labelStyle}>Previous School/College *</label>
                    <input type="text" required value={formData.previousSchool} onChange={(e) => update("previousSchool", e.target.value)} placeholder="Name of your previous school" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>SEE GPA *</label>
                    <input type="text" required value={formData.gpa} onChange={(e) => update("gpa", e.target.value)} placeholder="e.g., 3.60" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>Program of Interest *</label>
                    <select required value={formData.program} onChange={(e) => update("program", e.target.value)} className={inputClass} style={inputStyle}>
                      <option value="">Select program</option>
                      <option value="hotel-management">Hotel Management</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="sports-science">Sports Science</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Statement */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid var(--color-parchment-deep)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--color-forest-soft)", color: "var(--color-parchment)" }}
                  >
                    <Star size={14} />
                  </div>
                  <h3 className="text-[12px] uppercase font-bold" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.1em" }}>
                    Personal Statement
                  </h3>
                </div>
                <label className={labelClass} style={labelStyle}>
                  Why do you want to join Western Public Academy?
                </label>
                <textarea
                  rows={5}
                  value={formData.statement}
                  onChange={(e) => update("statement", e.target.value)}
                  placeholder="Tell us about your motivation and goals..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[12px] uppercase font-bold press transition-all duration-200"
                style={{
                  background: "var(--color-forest-deep)",
                  color: "var(--color-parchment)",
                  letterSpacing: "0.1em",
                  boxShadow: "0 8px 24px -8px rgba(15,61,46,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-brass)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-forest-deep)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-forest-deep)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-parchment)";
                }}
              >
                <Send size={14} />
                Submit Application
                <ArrowUpRight size={14} />
              </button>

              {/* Disclaimer */}
              <p className="mt-5 text-[11px] text-center leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                By submitting, you confirm that the information provided is accurate. Our admissions team will contact you within 3-5 working days.
              </p>

              {/* Help link */}
              <p className="mt-3 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium underline-link"
                  style={{ color: "var(--color-brass-deep)" }}
                >
                  <GraduationCap size={12} />
                  Have questions? Contact our admissions team
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Main Page ─────────────────── */
export default function Apply() {
  useReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-parchment)" }}>
      <SiteHeader />
      <main className="flex-1">
        <ApplyHero />
        <ProgramsStrip />
        <ApplicationForm />
      </main>
      <SiteFooter />
    </div>
  );
}
