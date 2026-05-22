/*
 * Western Public Academy — Site Header
 * Style: Himalayan Heritage editorial.
 * - Top utility strip (Est. · PABSON · address · phone)
 * - Main row: round logo on parchment disk + serif wordmark + nav + Apply CTA
 * - Mobile: full-screen sheet with smooth slide
 * - Tablet: nav collapses to drawer at <1024 (lg)
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, ChevronDown, Phone, MapPin, ArrowRight } from "lucide-react";
// (Phone & MapPin are still used inside the mobile drawer footer below)
import { toast } from "sonner";

// Routes that are actually implemented
const IMPLEMENTED_ROUTES = ["/", "/about", "/about#our-story", "/about#messages", "/programs", "/programs/hotel-management", "/programs/computer-science", "/programs/sports-science", "/programs/education", "/gallery", "/academics/notices", "/contact", "/apply"];

const LOGO = "/manus-storage/school-logo-circle-256_2612ab98.png";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "Messages", href: "/about#messages" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Hotel Management", href: "/programs/hotel-management" },
      { label: "Computer Science", href: "/programs/computer-science" },
      { label: "Sports Science", href: "/programs/sports-science" },
      { label: "Education", href: "/programs/education" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/academics/notices" },
  { label: "Contact", href: "/contact" },
];

function notImplemented(label: string) {
  toast(`${label} — coming soon`, {
    description: "This page is being prepared.",
  });
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubMobile, setOpenSubMobile] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [, setLocation] = useLocation();

  const handleNav = (
    e: React.MouseEvent,
    href: string,
    label: string,
    hasChildren?: boolean,
  ) => {
    if (IMPLEMENTED_ROUTES.includes(href) || href.startsWith("/about")) {
      e.preventDefault();
      if (href.includes("#")) {
        window.location.href = href;
      } else {
        setLocation(href);
      }
      return;
    }
    if (hasChildren) {
      // For parent items with children on desktop click -> let dropdown govern (still placeholder)
    }
    e.preventDefault();
    notImplemented(label);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main row */}
      <div
        style={{
          background: scrolled
            ? "rgba(247, 241, 229, 0.94)"
            : "rgba(247, 241, 229, 0.98)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: scrolled
            ? "1px solid var(--color-parchment-deep)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 28px -22px rgba(15,61,46,0.4)" : "none",
          transition: "all 280ms var(--ease-out)",
        }}
      >
        <div className="container flex items-center justify-between gap-4 py-2.5 lg:py-3">
          {/* Logo + wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 group shrink-0"
          >
            <div
              className="relative shrink-0 overflow-hidden transition-transform duration-300 group-hover:rotate-[6deg]"
              style={{
                width: "clamp(42px, 12vw, 52px)",
                height: "clamp(42px, 12vw, 52px)",
                borderRadius: "50%",
                background: "#fff",
                boxShadow:
                  "0 0 0 1.5px var(--color-brass), 0 0 0 3px #fff, 0 0 0 4.5px rgba(15,61,46,0.18), 0 8px 18px -10px rgba(15,61,46,0.45)",
              }}
            >
              <img
                src={LOGO}
                alt="Western Public Academy logo"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ borderRadius: "50%" }}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="leading-tight">
              <div
                className="display-serif text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] lg:text-[20px] xl:text-[22px] whitespace-nowrap"
                style={{ color: "var(--color-forest-deep)" }}
              >
                Western Public Academy
              </div>
              <div
                className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[9.5px] lg:text-[10.5px] uppercase mt-0.5 whitespace-nowrap"
                style={{
                  color: "var(--color-brass-deep)",
                  letterSpacing: "0.22em",
                  fontWeight: 600,
                }}
              >
                Educating · Inspiring · Leading
              </div>
            </div>
          </Link>

          {/* Desktop nav (lg+) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 ml-auto mr-3">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href, item.label, !!item.children)}
                  className={`nav-link inline-flex items-center gap-1 text-[12.5px] xl:text-[13.5px] font-medium px-2.5 xl:px-3 py-2 rounded-full ${openDropdown === item.label ? "is-active" : ""}`}
                  style={{
                    color: openDropdown === item.label ? "var(--color-brass-deep)" : "var(--color-forest-deep)",
                    background:
                      openDropdown === item.label
                        ? "var(--color-parchment-deep)"
                        : "transparent",
                  }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200"
                      style={{
                        transform:
                          openDropdown === item.label ? "rotate(180deg)" : "none",
                        color: "var(--color-brass-deep)",
                      }}
                    />
                  )}
                </a>
                {item.children && openDropdown === item.label && (
                  <div className="dropdown-panel absolute left-0 top-full pt-2 min-w-[240px]">
                    <div
                      className="py-2 overflow-hidden"
                      style={{
                        background: "#fff",
                        border: "1px solid var(--color-parchment-deep)",
                        borderRadius: 14,
                        boxShadow: "0 24px 48px -24px rgba(15,61,46,0.3), 0 4px 14px -8px rgba(15,61,46,0.18)",
                      }}
                    >
                      {/* Brass top accent */}
                      <div style={{ height: 2, background: "linear-gradient(90deg, var(--color-brass) 0%, transparent 70%)" }} />
                      {item.children.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          onClick={(e) => {
                            e.preventDefault();
                            if (IMPLEMENTED_ROUTES.includes(c.href) || c.href.startsWith("/about")) {
                              if (c.href.includes("#")) {
                                window.location.href = c.href;
                              } else {
                                setLocation(c.href);
                              }
                            } else {
                              notImplemented(c.label);
                            }
                          }}
                          className="dropdown-item block px-4 py-2.5 text-[13px]"
                          style={{ color: "var(--color-ink)" }}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA (lg+) */}
          <button
            onClick={() => setLocation("/apply")}
            className="hidden lg:inline-flex pill-btn items-center gap-2 px-4 xl:px-5 py-2.5 text-[11.5px] xl:text-[12.5px] font-semibold uppercase shrink-0 whitespace-nowrap"
            style={{
              background: "var(--color-brass)",
              color: "var(--color-forest-deep)",
              letterSpacing: "0.14em",
            }}
          >
            Apply Now
            <ArrowRight size={14} className="pill-cta-icon" />
          </button>

          {/* Mobile menu trigger — animated hamburger → X */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`menu-trigger lg:hidden shrink-0 ${open ? "is-open" : ""}`}
          >
            <span className="bar b1" aria-hidden="true" />
            <span className="bar b2" aria-hidden="true" />
            <span className="bar b3" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer (full-screen sheet) */}
      <div
        className={`lg:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          top: 0,
        }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,42,32,0.6)",
            backdropFilter: "blur(2px)",
            opacity: open ? 1 : 0,
            transition: "opacity 280ms var(--ease-out)",
          }}
        />
        {/* Panel */}
        <aside
          className={open ? "drawer-open" : ""}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(92vw, 400px)",
            maxWidth: "100vw",
            background: "var(--color-parchment)",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 380ms var(--ease-out)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "-24px 0 60px -20px rgba(15,61,46,0.35)",
          }}
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{
              borderBottom: "1px solid var(--color-parchment-deep)",
              background: "var(--color-forest-deep)",
              color: "var(--color-parchment)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="relative overflow-hidden"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow:
                    "0 0 0 1.5px var(--color-brass), 0 0 0 3px #fff",
                }}
              >
                <img
                  src={LOGO}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>
                <div
                  className="display-serif text-[15px]"
                  style={{ color: "var(--color-parchment)", lineHeight: 1.1 }}
                >
                  Western Public Academy
                </div>
                <div
                  className="text-[9px] uppercase mt-0.5"
                  style={{
                    color: "var(--color-brass)",
                    letterSpacing: "0.22em",
                  }}
                >
                  Est. 2066 B.S.
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-full"
              style={{ color: "var(--color-parchment)" }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {NAV.map((item) => {
              const isOpen = openSubMobile === item.label;
              return (
                <div key={item.label} className="drawer-item mb-1">
                  <button
                    onClick={() => {
                      if (item.children) {
                        setOpenSubMobile(isOpen ? null : item.label);
                      } else if (IMPLEMENTED_ROUTES.includes(item.href)) {
                        setLocation(item.href);
                        setOpen(false);
                      } else {
                        notImplemented(item.label);
                        setOpen(false);
                      }
                    }}
                    className={`drawer-row w-full flex items-center justify-between px-3 py-3 text-[15px] font-medium rounded-lg ${isOpen ? "is-open" : ""}`}
                    style={{
                      color: "var(--color-forest-deep)",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 280ms var(--ease-out)",
                          color: "var(--color-brass-deep)",
                        }}
                      />
                    )}
                  </button>
                  {item.children && isOpen && (
                    <div
                      className="pl-5 ml-3 mt-1 mb-2"
                      style={{
                        borderLeft: "1px solid var(--color-brass)",
                      }}
                    >
                      {item.children.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          onClick={(e) => {
                            e.preventDefault();
                            if (IMPLEMENTED_ROUTES.includes(c.href) || c.href.startsWith("/about")) {
                              if (c.href.includes("#")) {
                                window.location.href = c.href;
                              } else {
                                setLocation(c.href);
                              }
                            } else {
                              notImplemented(c.label);
                            }
                            setOpen(false);
                          }}
                          className="block py-2 text-[13.5px]"
                          style={{ color: "var(--color-ink-soft)" }}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer footer CTA */}
          <div
            className="px-5 py-4 border-t"
            style={{ borderColor: "var(--color-parchment-deep)" }}
          >
            <button
              onClick={() => {
                setLocation("/apply");
                setOpen(false);
              }}
              className="pill-btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[12.5px] font-semibold uppercase"
              style={{
                background: "var(--color-brass)",
                color: "var(--color-forest-deep)",
                letterSpacing: "0.16em",
              }}
            >
              Apply for Admission
              <ArrowRight size={14} />
            </button>
            <div
              className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]"
              style={{ color: "var(--color-ink-soft)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Phone size={11} style={{ color: "var(--color-brass-deep)" }} />
                Contact office
              </span>
              <span style={{ color: "var(--color-parchment-deep)" }}>·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={11} style={{ color: "var(--color-brass-deep)" }} />
                Bheemdatt
              </span>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
