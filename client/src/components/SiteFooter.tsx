/*
 * Western Public Academy — Site Footer
 * Style: Himalayan Heritage editorial — deep forest background, parchment text,
 * brass-gold rule accents, embedded Google Map, four-column layout collapsing
 * on mobile. Recurring "Est. 2066 B.S." gold-rule motif.
 */
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const LOGO = "/IMAGES/SCHOOL%27S%20LOGO.jpg";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/academics/notices" },
  { label: "Contact", href: "/contact" },
];

const PROGRAMS = [
  { label: "Hotel Management", href: "/programs/hotel-management" },
  { label: "Computer Science", href: "/programs/computer-science" },
  { label: "Sports Science", href: "/programs/sports-science" },
  { label: "Education", href: "/programs/education" },
];

function notImplemented(label: string) {
  toast(`${label} — coming soon`, {
    description: "This page is being prepared.",
  });
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-20 pb-8"
      style={{
        background: "var(--color-forest-deep)",
        color: "var(--color-parchment)",
      }}
    >
      {/* Decorative top brass rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-brass) 30%, var(--color-brass) 70%, transparent 100%)",
        }}
      />

      <div className="container">
        {/* Brand block + map row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 lg:pb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-5">
              <div
                className="shrink-0 relative overflow-hidden"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow:
                    "0 0 0 1.5px var(--color-brass), 0 0 0 3px #fff, 0 12px 24px -10px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={LOGO}
                  alt="Western Public Academy logo"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>
                <div
                  className="display-serif text-[22px] leading-tight"
                  style={{ color: "var(--color-parchment)" }}
                >
                  Western Public Academy
                </div>
                <div
                  className="text-[10px] uppercase mt-1"
                  style={{
                    color: "var(--color-brass)",
                    letterSpacing: "0.22em",
                    fontWeight: 600,
                  }}
                >
                  Educating · Inspiring · Leading
                </div>
              </div>
            </div>

            <p
              className="text-[14px] leading-relaxed max-w-md"
              style={{ color: "rgba(247,241,229,0.78)" }}
            >
              Established in 2066 B.S. and proudly affiliated with PABSON,
              Western Public Academy nurtures a generation of curious, principled
              leaders from Bheemdatt-Kanchanpur — through hands-on learning,
              dedicated teaching, and a campus rooted in care.
            </p>

            <div className="gold-rule mt-7" style={{ color: "var(--color-brass)" }}>
              Est. 2066 B.S.
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  onClick={() => notImplemented(label)}
                  aria-label={label}
                  className="w-10 h-10 inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:rotate-[-6deg]"
                  style={{
                    border: "1px solid rgba(201,161,74,0.35)",
                    color: "var(--color-parchment)",
                    borderRadius: 9999,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--color-brass)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-forest-deep)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-parchment)";
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <div
              className="text-[11px] uppercase mb-4 pb-2"
              style={{
                color: "var(--color-brass)",
                letterSpacing: "0.22em",
                fontWeight: 600,
                borderBottom: "1px solid rgba(201,161,74,0.3)",
              }}
            >
              Explore
            </div>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      const implemented = ["/", "/about", "/programs", "/gallery", "/contact", "/apply", "/academics/notices"];
                      if (implemented.includes(l.href)) return;
                      e.preventDefault();
                      notImplemented(l.label);
                    }}
                    className="text-[14px] transition-colors duration-200"
                    style={{ color: "rgba(247,241,229,0.82)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-brass)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(247,241,229,0.82)")
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3">
            <div
              className="text-[11px] uppercase mb-4 pb-2"
              style={{
                color: "var(--color-brass)",
                letterSpacing: "0.22em",
                fontWeight: 600,
                borderBottom: "1px solid rgba(201,161,74,0.3)",
              }}
            >
              +2 Streams
            </div>
            <ul className="space-y-2.5">
              {PROGRAMS.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    onClick={() => {}}
                    className="text-[14px] transition-colors duration-200"
                    style={{ color: "rgba(247,241,229,0.82)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--color-brass)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(247,241,229,0.82)")
                    }
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <div
              className="text-[11px] uppercase mb-4 pb-2"
              style={{
                color: "var(--color-brass)",
                letterSpacing: "0.22em",
                fontWeight: 600,
                borderBottom: "1px solid rgba(201,161,74,0.3)",
              }}
            >
              Visit Us
            </div>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-start gap-2.5" style={{ color: "rgba(247,241,229,0.82)" }}>
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "var(--color-brass)" }} />
                <span>Bheemdatt-18, Katan,<br />Kanchanpur, Sudurpashchim</span>
              </li>
              <li className="flex items-center gap-2.5" style={{ color: "rgba(247,241,229,0.82)" }}>
                <Phone size={15} className="shrink-0" style={{ color: "var(--color-brass)" }} />
                <span>Contact office for current phone details</span>
              </li>
              <li className="flex items-center gap-2.5" style={{ color: "rgba(247,241,229,0.82)" }}>
                <Mail size={15} className="shrink-0" style={{ color: "var(--color-brass)" }} />
                <span>info@westernpublic.edu.np</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Map row */}
        <div
          className="overflow-hidden"
          style={{
            border: "1px solid rgba(201,161,74,0.35)",
            boxShadow: "0 16px 40px -28px rgba(0,0,0,0.6)",
            borderRadius: 18,
          }}
        >
          <iframe
            title="Western Public Academy on map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.9086356053217!2d80.17494067496901!3d28.960434269115762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ade09cb43e27%3A0x4d2443b21d771baa!2sWestern%20Public%20Academy!5e0!3m2!1sen!2snp!4v1779358428653!5m2!1sen!2snp"
            width="100%"
            height="260"
            style={{ border: 0, filter: "saturate(0.9) contrast(1.05)", display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11.5px] sm:text-[12px]"
          style={{
            borderTop: "1px solid rgba(201,161,74,0.25)",
            color: "rgba(247,241,229,0.6)",
          }}
        >
          <div>
            © {year} Western Public Academy. All rights reserved.
          </div>
          <div className="uppercase tracking-[0.18em]">
            Crafted with care · Bheemdatt, Kanchanpur
          </div>
        </div>
      </div>
    </footer>
  );
}
