/*
 * Western Public Academy — Contact Page
 * Design: "Himalayan Heritage" editorial system — asymmetric layouts,
 * restrained palette (forest, brass, parchment, terracotta), Fraunces + Inter.
 */
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowUpRight,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

/* ─────────────────────── Hero (asymmetric editorial) ─────────────────────── */
function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/IMAGES/BACKGROUND-IMG-3.jpg)",
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

      <div className="relative container py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
          {/* Left: editorial heading */}
          <div className="col-span-12 lg:col-span-7">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>
              Reach Out
            </div>

            <h1
              className="display-serif mt-5 text-[clamp(2.4rem,11vw,3.25rem)] sm:text-[40px] lg:text-[52px]"
              style={{ color: "var(--color-parchment)", letterSpacing: "-0.025em" }}
            >
              Get in{" "}
              <span style={{ fontStyle: "italic", color: "var(--color-brass)" }}>
                Touch
              </span>
            </h1>

            <p
              className="mt-5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed"
              style={{ color: "rgba(247,241,229,0.85)" }}
            >
              Whether you have questions about admissions, programs, or campus life — our team is here to help.
            </p>
          </div>

          {/* Right: contact quick card */}
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
              <div className="display-serif text-[14px]" style={{ color: "var(--color-forest-deep)", lineHeight: 1.3 }}>
                Office Hours
              </div>
              <div
                aria-hidden
                className="mt-3 mb-3"
                style={{ height: 1, background: "linear-gradient(90deg, var(--color-brass) 0%, transparent 100%)" }}
              />
              <div className="space-y-2">
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-[12px]">
                  <span style={{ color: "var(--color-ink-soft)" }}>Sunday – Friday</span>
                  <span style={{ color: "var(--color-forest-deep)", fontWeight: 600 }}>7:00 AM – 4:00 PM</span>
                </div>
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-[12px]">
                  <span style={{ color: "var(--color-ink-soft)" }}>Saturday</span>
                  <span style={{ color: "var(--color-terracotta)", fontWeight: 600 }}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Contact Info (editorial cards) ─────────────────── */
function ContactInfo() {
  const cards = [
    {
      Icon: MapPin,
      title: "Visit Us",
      detail: "Bheemdatt-18, Katan, Kanchanpur",
      subDetail: "Mahendranagar, Nepal",
    },
    {
      Icon: Phone,
      title: "Call Us",
      detail: "+977-99-XXXXXX",
      subDetail: "+977-99-XXXXXX",
    },
    {
      Icon: Mail,
      title: "Email Us",
      detail: "info@westernpublic.edu.np",
      subDetail: "admin@westernpublic.edu.np",
    },
    {
      Icon: Clock,
      title: "Office Hours",
      detail: "Sun – Fri: 7:00 AM – 4:00 PM",
      subDetail: "Saturday: Closed",
    },
  ];

  return (
    <section className="py-14 lg:py-18 paper-texture">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left heading */}
          <div className="col-span-12 lg:col-span-4 reveal">
            <div className="gold-rule">Contact Information</div>
            <h2
              className="display-serif mt-4 text-[26px] sm:text-[32px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              How to reach us
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
              Multiple ways to connect with Western Public Academy.
            </p>
          </div>

          {/* Right: cards grid */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-7 lg:col-start-5 xl:col-start-6 reveal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map(({ Icon, title, detail, subDetail }) => (
                <div
                  key={title}
                  className="editorial-card p-5 group"
                >
                  <div
                    className="inline-flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                    style={{
                      width: 44,
                      height: 44,
                      background: "var(--color-forest-deep)",
                      color: "var(--color-brass)",
                      borderRadius: 12,
                      boxShadow: "inset 0 0 0 3px var(--color-parchment)",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    className="display-serif text-[15px] sm:text-[16px] mb-1.5"
                    style={{ color: "var(--color-forest-deep)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[13px] font-medium" style={{ color: "var(--color-ink)" }}>
                    {detail}
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--color-ink-soft)" }}>
                    {subDetail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Contact Form (editorial layout) ─────────────────── */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section
      className="py-14 lg:py-20"
      style={{ background: "var(--color-parchment-deep)" }}
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left: heading + context */}
          <div className="col-span-12 lg:col-span-5 reveal">
            <div className="gold-rule">Send a Message</div>
            <h2
              className="display-serif mt-4 text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{ color: "var(--color-forest-deep)" }}
            >
              Have a{" "}
              <span style={{ fontStyle: "italic" }}>question?</span>
            </h2>
            <p
              className="mt-4 text-[14px] leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Fill out the form and our team will get back to you within 24 hours. For urgent matters, please call us directly.
            </p>

            {/* Decorative image */}
            <div
              className="mt-8 aspect-[4/3] rounded-xl overflow-hidden hidden lg:block"
              style={{
                border: "1px solid rgba(201,161,74,0.3)",
              }}
            >
              <img
                src="/IMAGES/BACKGROUND-IMG-2.jpg"
                alt="Campus"
                className="w-full h-full object-cover img-zoom"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 reveal">
            <form
              onSubmit={handleSubmit}
              className="editorial-card p-5 sm:p-8"
              style={{
                boxShadow: "0 28px 56px -28px rgba(15, 61, 46, 0.18)",
              }}
            >
              {/* Form header */}
              <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid var(--color-parchment-deep)" }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--color-forest-deep)", color: "var(--color-brass)" }}
                >
                  <Send size={14} />
                </div>
                <span className="text-[12px] uppercase font-bold" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.1em" }}>
                  Contact Form
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] uppercase font-semibold mb-1.5" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.06em" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all text-[13px]"
                    style={{
                      background: "var(--color-parchment)",
                      border: "1px solid var(--color-parchment-deep)",
                      color: "var(--color-ink)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-semibold mb-1.5" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.06em" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all text-[13px]"
                    style={{
                      background: "var(--color-parchment)",
                      border: "1px solid var(--color-parchment-deep)",
                      color: "var(--color-ink)",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] uppercase font-semibold mb-1.5" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.06em" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+977-XX-XXXXXXX"
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all text-[13px]"
                    style={{
                      background: "var(--color-parchment)",
                      border: "1px solid var(--color-parchment-deep)",
                      color: "var(--color-ink)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-semibold mb-1.5" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.06em" }}>
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all text-[13px]"
                    style={{
                      background: "var(--color-parchment)",
                      border: "1px solid var(--color-parchment-deep)",
                      color: "var(--color-ink)",
                    }}
                  >
                    <option value="">Select subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="academic">Academic Information</option>
                    <option value="fees">Fees & Scholarships</option>
                    <option value="general">General Inquiry</option>
                    <option value="complaint">Complaint / Feedback</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] uppercase font-semibold mb-1.5" style={{ color: "var(--color-forest-deep)", letterSpacing: "0.06em" }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all resize-none text-[13px]"
                  style={{
                    background: "var(--color-parchment)",
                    border: "1px solid var(--color-parchment-deep)",
                    color: "var(--color-ink)",
                  }}
                />
              </div>

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
                Send Message
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Map Section (dark editorial) ─────────────────── */
function MapSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/IMAGES/BACKGROUND-IMG-2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(115deg, rgba(10,42,32,0.94) 0%, rgba(15,61,46,0.9) 60%, rgba(15,61,46,0.8) 100%)",
        }}
      />

      <div className="relative container py-14 lg:py-20">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left: heading */}
          <div className="col-span-12 lg:col-span-4 reveal">
            <div className="gold-rule" style={{ color: "var(--color-brass)" }}>
              Find Us
            </div>
            <h2
              className="display-serif mt-4 text-[26px] sm:text-[32px]"
              style={{ color: "var(--color-parchment)" }}
            >
              Our Location
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "rgba(247,241,229,0.8)" }}>
              Western Public Academy is located in Bheemdatt-18, Katan, Kanchanpur, Mahendranagar, Nepal.
            </p>
            <div className="mt-5 flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(201,161,74,0.15)", border: "1px solid rgba(201,161,74,0.3)" }}
              >
                <MapPin size={18} style={{ color: "var(--color-brass)" }} />
              </div>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "var(--color-parchment)" }}>
                  Bheemdatt-18, Katan, Kanchanpur
                </p>
                <p className="text-[11px]" style={{ color: "rgba(247,241,229,0.6)" }}>
                  Mahendranagar, Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-7 lg:col-start-5 xl:col-start-6 reveal">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(201,161,74,0.3)",
                boxShadow: "0 24px 60px -24px rgba(0,0,0,0.4)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.123456789!2d80.18!3d28.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDU4JzEyLjAiTiA4MMKwMTAnNDguMCJF!5e0!3m2!1sen!2snp!4v1234567890"
                width="100%"
                height="360"
                className="min-h-[280px] sm:min-h-[360px]"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Western Public Academy Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Main Page ─────────────────── */
export default function Contact() {
  useReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-parchment)" }}>
      <SiteHeader />
      <main className="flex-1">
        <ContactHero />
        <ContactInfo />
        <ContactForm />
        <MapSection />
      </main>
      <SiteFooter />
    </div>
  );
}
