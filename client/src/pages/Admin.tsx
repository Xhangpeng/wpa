import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  KeyRound,
  ImagePlus,
  Images,
  LayoutDashboard,
  LogOut,
  Pencil,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  deleteGalleryItem,
  deleteNotice,
  galleryCategoryLabels,
  saveNotice,
  subscribeGalleryItems,
  subscribeNotices,
  updateGalleryItem,
  uploadGalleryImage,
} from "@/lib/adminContent";
import type { GalleryCategory, GalleryItem, NoticeCategory, NoticeItem } from "@/lib/adminContent";
import {
  adminEmails,
  auth,
  firebaseConfigured,
  googleProvider,
  isAllowedAdmin,
} from "@/lib/firebase";

type AdminTab = "gallery" | "notices";

const ADMIN_ACCESS_CODE = "WESTERN";
const LOCAL_ADMIN_SESSION_KEY = "wpa-admin-code-session";
const noticeCategories: NoticeCategory[] = ["general", "academic", "exams", "events"];
const galleryCategories = Object.keys(galleryCategoryLabels) as GalleryCategory[];

const emptyNoticeForm = (): Omit<NoticeItem, "id"> & { id?: string } => ({
  title: "",
  date: new Date().toISOString().slice(0, 10),
  category: "general",
  description: "",
  fullContent: "",
  isNew: true,
});

const emptyGalleryForm = (): GalleryItem => ({
  id: "",
  title: "",
  category: "campus",
  categoryLabel: galleryCategoryLabels.campus,
  src: "",
  alt: "",
  featured: false,
});

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-brass-deep)" }}>
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-[14px] outline-none transition focus:ring-2";

function AdminShell({
  adminLabel,
  adminEmail,
  modeLabel,
  localMode,
  onSignOut,
  activeTab,
  setActiveTab,
  children,
}: {
  adminLabel: string;
  adminEmail: string;
  modeLabel: string;
  localMode: boolean;
  onSignOut: () => void;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  children: ReactNode;
}) {
  const tabs = [
    { id: "gallery" as const, label: "Gallery", Icon: Images },
    { id: "notices" as const, label: "Notices", Icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-parchment)", color: "var(--color-ink)" }}>
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:flex flex-col border-r" style={{ borderColor: "var(--color-parchment-deep)", background: "var(--color-forest-deep)" }}>
          <div className="p-7">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}>
              <ShieldCheck size={23} />
            </div>
            <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-brass)" }}>
              Private Admin
            </div>
            <h1 className="display-serif mt-2 text-[32px] leading-none" style={{ color: "var(--color-parchment)" }}>
              Western Control Room
            </h1>
          </div>

          <nav className="px-4">
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] font-semibold transition"
                  style={{
                    background: active ? "rgba(247,241,229,0.12)" : "transparent",
                    color: active ? "var(--color-brass)" : "rgba(247,241,229,0.78)",
                    border: active ? "1px solid rgba(201,161,74,0.34)" : "1px solid transparent",
                  }}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-5">
            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(201,161,74,0.24)", background: "rgba(247,241,229,0.06)" }}>
              <div className="text-[12px] font-semibold" style={{ color: "var(--color-parchment)" }}>
                {adminLabel}
              </div>
              <div className="mt-1 truncate text-[11px]" style={{ color: "rgba(247,241,229,0.58)" }}>
                {adminEmail}
              </div>
              <div className="mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: "rgba(201,161,74,0.14)", color: "var(--color-brass)" }}>
                {modeLabel}
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-30 border-b backdrop-blur-xl" style={{ borderColor: "var(--color-parchment-deep)", background: "rgba(247,241,229,0.88)" }}>
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="eyebrow">Admin Dashboard</div>
                  <div className="display-serif mt-1 text-[28px] leading-none" style={{ color: "var(--color-forest-deep)" }}>
                    Manage site content
                  </div>
                </div>
                <a
                  href="/"
                  className="pill-btn inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)" }}
                >
                  View website
                  <ArrowRight size={14} />
                </a>
              </div>
              <div className="flex gap-2 lg:hidden">
                {tabs.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className="flex-1 rounded-full px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em]"
                    style={{
                      background: activeTab === id ? "var(--color-forest-deep)" : "#fff",
                      color: activeTab === id ? "var(--color-parchment)" : "var(--color-forest-deep)",
                      border: "1px solid var(--color-parchment-deep)",
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon size={14} />
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </header>
          <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            {localMode && (
              <div className="mb-5 rounded-2xl border bg-white px-4 py-3 text-[13px] leading-relaxed" style={{ borderColor: "var(--color-parchment-deep)", color: "var(--color-ink-soft)" }}>
                Temporary code access is active. Changes are saved in this browser until Firebase Google sign-in is configured.
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function hasLocalAdminSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LOCAL_ADMIN_SESSION_KEY) === "true";
}

function setLocalAdminSession(enabled: boolean) {
  if (typeof window === "undefined") return;

  if (enabled) window.localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, "true");
  else window.localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
}

function SignInView({ onCodeAccepted }: { onCodeAccepted: () => void }) {
  const [accessCode, setAccessCode] = useState("");

  const signIn = async () => {
    if (!auth) {
      toast.info("Firebase Google sign-in is not connected yet. Use the access code for now.");
      return;
    }

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Google sign-in failed.");
    }
  };

  const submitCode = (event: FormEvent) => {
    event.preventDefault();

    if (accessCode.trim().toUpperCase() !== ADMIN_ACCESS_CODE) {
      toast.error("Access code is incorrect.");
      return;
    }

    setLocalAdminSession(true);
    onCodeAccepted();
    toast.success("Temporary admin access enabled.");
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: "var(--color-forest-deep)" }}>
      <div className="container grid min-h-screen items-center py-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <div className="gold-rule" style={{ color: "var(--color-brass)" }}>Western Admin</div>
          <h1 className="display-serif mt-5 text-[clamp(3rem,8vw,7rem)] leading-none" style={{ color: "var(--color-parchment)" }}>
            Private content desk.
          </h1>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed" style={{ color: "rgba(247,241,229,0.78)" }}>
            Sign in with the authorized Google account to manage gallery images and school notices.
          </p>
        </div>

        <div className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <div className="rounded-3xl border p-6 sm:p-8" style={{ background: "var(--color-parchment)", borderColor: "rgba(201,161,74,0.35)", boxShadow: "0 40px 90px -46px rgba(0,0,0,0.75)" }}>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}>
              <LayoutDashboard size={23} />
            </div>
            <h2 className="display-serif mt-5 text-[34px] leading-none" style={{ color: "var(--color-forest-deep)" }}>
              Admin sign in
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
              Use Google for production access. During setup, the temporary school access code can open a local admin session.
            </p>

            <button
              type="button"
              onClick={signIn}
              className="pill-btn mt-7 inline-flex w-full items-center justify-center gap-3 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
              style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)" }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white font-bold normal-case tracking-normal" style={{ color: "var(--color-forest-deep)" }}>
                G
              </span>
              Continue with Google
              <ArrowRight size={16} />
            </button>

            {!firebaseConfigured && (
              <p className="mt-3 rounded-xl border px-4 py-3 text-[12px] leading-relaxed" style={{ background: "#fff", borderColor: "var(--color-parchment-deep)", color: "var(--color-ink-soft)" }}>
                Google sign-in will work after Firebase environment variables are added. Temporary code access is available now.
              </p>
            )}

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1" style={{ background: "var(--color-parchment-deep)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-brass-deep)" }}>Or</span>
              <span className="h-px flex-1" style={{ background: "var(--color-parchment-deep)" }} />
            </div>

            <form onSubmit={submitCode} className="rounded-2xl border bg-white p-4" style={{ borderColor: "var(--color-parchment-deep)" }}>
              <FieldLabel>Access code</FieldLabel>
              <div className="mt-2 flex gap-2">
                <input
                  type="password"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  placeholder="Enter temporary code"
                  className="min-w-0 flex-1 rounded-xl border px-4 py-3 text-[14px] outline-none transition focus:ring-2"
                  style={{ borderColor: "var(--color-parchment-deep)" }}
                />
                <button
                  type="submit"
                  className="grid h-[46px] w-[52px] shrink-0 place-items-center rounded-xl"
                  style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}
                  aria-label="Unlock admin with access code"
                >
                  <KeyRound size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessDenied({ user }: { user: User }) {
  return (
    <div className="min-h-screen grid place-items-center px-4" style={{ background: "var(--color-parchment)" }}>
      <div className="max-w-lg rounded-3xl border bg-white p-8 text-center" style={{ borderColor: "var(--color-parchment-deep)" }}>
        <ShieldCheck className="mx-auto" size={42} style={{ color: "var(--color-terracotta)" }} />
        <h1 className="display-serif mt-5 text-[36px]" style={{ color: "var(--color-forest-deep)" }}>
          Access not allowed
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
          {user.email} is signed in, but this email is not listed in <code>VITE_ADMIN_EMAILS</code>.
        </p>
        <button
          type="button"
          onClick={() => auth && signOut(auth)}
          className="pill-btn mt-6 inline-flex items-center gap-2 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
          style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)" }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}

function GalleryManager({ items, localMode }: { items: GalleryItem[]; localMode: boolean }) {
  const [form, setForm] = useState<GalleryItem>(emptyGalleryForm);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const previewUrl = useMemo(() => {
    if (!file) return form.src;
    return URL.createObjectURL(file);
  }, [file, form.src]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const setCategory = (category: GalleryCategory) => {
    setForm((current) => ({
      ...current,
      category,
      categoryLabel: galleryCategoryLabels[category],
    }));
  };

  const reset = () => {
    setForm(emptyGalleryForm());
    setFile(null);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) {
      toast.error("Gallery title is required.");
      return;
    }

    setSaving(true);
    try {
      if (form.id) {
        await updateGalleryItem(form, { local: localMode });
        toast.success("Gallery image updated.");
      } else {
        if (!file) {
          toast.error("Choose an image to upload.");
          return;
        }
        await uploadGalleryImage(file, form, { local: localMode });
        toast.success("Gallery image added.");
      }
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save gallery image.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
      <form onSubmit={submit} className="rounded-3xl border bg-white p-5 sm:p-6" style={{ borderColor: "var(--color-parchment-deep)" }}>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: "var(--color-parchment)", color: "var(--color-forest-deep)" }}>
            <ImagePlus size={21} />
          </div>
          <div>
            <div className="eyebrow">Gallery Manager</div>
            <h2 className="display-serif text-[28px] leading-none" style={{ color: "var(--color-forest-deep)" }}>
              {form.id ? "Edit image" : "Add image"}
            </h2>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--color-parchment-deep)", background: "var(--color-parchment)" }}>
          {previewUrl ? (
            <img src={previewUrl} alt="Gallery preview" className="h-56 w-full object-contain" />
          ) : (
            <div className="grid h-56 place-items-center text-[13px]" style={{ color: "var(--color-ink-soft)" }}>
              Image preview
            </div>
          )}
        </div>

        {!form.id && (
          <div className="mt-5">
            <FieldLabel>Image file</FieldLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-brass)] file:px-4 file:py-2 file:text-[12px] file:font-bold file:text-[var(--color-forest-deep)]`}
              style={{ borderColor: "var(--color-parchment-deep)" }}
            />
          </div>
        )}

        <div className="mt-5 grid gap-4">
          <div>
            <FieldLabel>Title</FieldLabel>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }} />
          </div>
          <div>
            <FieldLabel>Alt text</FieldLabel>
            <input value={form.alt} onChange={(event) => setForm({ ...form, alt: event.target.value })} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }} />
          </div>
          <div>
            <FieldLabel>Category</FieldLabel>
            <select value={form.category} onChange={(event) => setCategory(event.target.value as GalleryCategory)} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }}>
              {galleryCategories.map((category) => (
                <option key={category} value={category}>{galleryCategoryLabels[category]}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-[14px]" style={{ borderColor: "var(--color-parchment-deep)", color: "var(--color-forest-deep)" }}>
            <input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />
            Feature in gallery hero
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={saving} className="pill-btn inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)" }}>
            <Save size={15} />
            {saving ? "Saving" : "Save"}
          </button>
          <button type="button" onClick={reset} className="pill-btn px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ background: "var(--color-parchment)", color: "var(--color-forest-deep)" }}>
            New
          </button>
        </div>
      </form>

      <section className="rounded-3xl border bg-white p-5 sm:p-6" style={{ borderColor: "var(--color-parchment-deep)" }}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="eyebrow">Uploaded Library</div>
            <h2 className="display-serif mt-1 text-[30px] leading-none" style={{ color: "var(--color-forest-deep)" }}>
              {items.length} managed images
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--color-parchment-deep)" }}>
              <div className="h-44" style={{ background: "linear-gradient(135deg, #071c24, #12372d)" }}>
                <img src={item.src} alt={item.alt} className="h-full w-full object-contain" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-brass-deep)" }}>{item.categoryLabel}</div>
                <h3 className="display-serif mt-1 text-[22px] leading-tight" style={{ color: "var(--color-forest-deep)" }}>{item.title}</h3>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => { setForm(item); setFile(null); }} className="pill-btn inline-flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: "var(--color-parchment)", color: "var(--color-forest-deep)" }}>
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button type="button" onClick={async () => { if (!window.confirm("Delete this gallery image?")) return; try { await deleteGalleryItem(item, { local: localMode }); toast.success("Gallery image deleted."); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not delete image."); } }} className="pill-btn inline-flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: "#fff1ed", color: "var(--color-terracotta)" }}>
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-6 rounded-2xl border p-8 text-center" style={{ borderColor: "var(--color-parchment-deep)", color: "var(--color-ink-soft)" }}>
            Uploaded gallery images will appear here.
          </div>
        )}
      </section>
    </div>
  );
}

function NoticesManager({ notices, localMode }: { notices: NoticeItem[]; localMode: boolean }) {
  const [form, setForm] = useState<Omit<NoticeItem, "id"> & { id?: string }>(emptyNoticeForm);
  const [saving, setSaving] = useState(false);

  const reset = () => setForm(emptyNoticeForm());

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and summary are required.");
      return;
    }

    setSaving(true);
    try {
      await saveNotice(form, { local: localMode });
      toast.success(form.id ? "Notice updated." : "Notice added.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save notice.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
      <form onSubmit={submit} className="rounded-3xl border bg-white p-5 sm:p-6" style={{ borderColor: "var(--color-parchment-deep)" }}>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: "var(--color-parchment)", color: "var(--color-forest-deep)" }}>
            <CalendarDays size={21} />
          </div>
          <div>
            <div className="eyebrow">Notice Editor</div>
            <h2 className="display-serif text-[28px] leading-none" style={{ color: "var(--color-forest-deep)" }}>
              {form.id ? "Edit notice" : "Add notice"}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <FieldLabel>Title</FieldLabel>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }} />
          </div>
          <div>
            <FieldLabel>Date</FieldLabel>
            <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }} />
          </div>
          <div>
            <FieldLabel>Category</FieldLabel>
            <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as NoticeCategory })} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }}>
              {noticeCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2">
            <FieldLabel>Short summary</FieldLabel>
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={3} className={inputClass} style={{ borderColor: "var(--color-parchment-deep)" }} />
          </div>
          <div className="lg:col-span-2">
            <FieldLabel>Full notice content</FieldLabel>
            <textarea value={form.fullContent ?? ""} onChange={(event) => setForm({ ...form, fullContent: event.target.value })} rows={12} className={`${inputClass} font-mono`} style={{ borderColor: "var(--color-parchment-deep)" }} />
          </div>
          <label className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-[14px]" style={{ borderColor: "var(--color-parchment-deep)", color: "var(--color-forest-deep)" }}>
            <input type="checkbox" checked={Boolean(form.isNew)} onChange={(event) => setForm({ ...form, isNew: event.target.checked })} />
            Mark as new
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={saving} className="pill-btn inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)" }}>
            <Save size={15} />
            {saving ? "Saving" : "Save notice"}
          </button>
          <button type="button" onClick={reset} className="pill-btn px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ background: "var(--color-parchment)", color: "var(--color-forest-deep)" }}>
            New
          </button>
        </div>
      </form>

      <section className="rounded-3xl border bg-white p-5 sm:p-6" style={{ borderColor: "var(--color-parchment-deep)" }}>
        <div className="eyebrow">Notice Library</div>
        <h2 className="display-serif mt-1 text-[30px] leading-none" style={{ color: "var(--color-forest-deep)" }}>
          {notices.length} notices
        </h2>
        <div className="mt-6 space-y-3">
          {notices.map((notice) => (
            <article key={notice.id} className="rounded-2xl border p-4" style={{ borderColor: "var(--color-parchment-deep)" }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-brass-deep)" }}>
                    {notice.category} | {notice.date}
                  </div>
                  <h3 className="display-serif mt-1 text-[21px] leading-tight" style={{ color: "var(--color-forest-deep)" }}>{notice.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{notice.description}</p>
                </div>
                {notice.isNew && <CheckCircle2 size={18} style={{ color: "var(--color-brass-deep)" }} />}
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => setForm(notice)} className="pill-btn inline-flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: "var(--color-parchment)", color: "var(--color-forest-deep)" }}>
                  <Pencil size={13} />
                  Edit
                </button>
                <button type="button" onClick={async () => { if (!window.confirm("Delete this notice?")) return; try { await deleteNotice(notice.id, { local: localMode }); toast.success("Notice deleted."); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not delete notice."); } }} className="pill-btn inline-flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: "#fff1ed", color: "var(--color-terracotta)" }}>
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {notices.length === 0 && (
          <div className="mt-6 rounded-2xl border p-8 text-center" style={{ borderColor: "var(--color-parchment-deep)", color: "var(--color-ink-soft)" }}>
            Managed notices will appear here.
          </div>
        )}
      </section>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!auth);
  const [codeMode, setCodeMode] = useState(hasLocalAdminSession);
  const [activeTab, setActiveTab] = useState<AdminTab>("gallery");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
  }, []);

  const isGoogleAdmin = isAllowedAdmin(user?.email);
  const hasAdminAccess = codeMode || isGoogleAdmin;

  useEffect(() => {
    if (!hasAdminAccess) return;
    const contentOptions = { local: codeMode };
    const stopGallery = subscribeGalleryItems(setGalleryItems, (error) => toast.error(error.message), contentOptions);
    const stopNotices = subscribeNotices(setNotices, (error) => toast.error(error.message), contentOptions);
    return () => {
      stopGallery();
      stopNotices();
    };
  }, [codeMode, hasAdminAccess]);

  const handleSignOut = async () => {
    setLocalAdminSession(false);
    setCodeMode(false);
    if (auth) await signOut(auth);
    setUser(null);
  };

  if (!authReady) {
    return (
      <div className="grid min-h-screen place-items-center" style={{ background: "var(--color-parchment)" }}>
        <div className="display-serif text-[28px]" style={{ color: "var(--color-forest-deep)" }}>
          Loading admin...
        </div>
      </div>
    );
  }

  if (!codeMode && !user) return <SignInView onCodeAccepted={() => setCodeMode(true)} />;
  if (!codeMode && (!isGoogleAdmin || adminEmails.length === 0) && user) return <AccessDenied user={user} />;

  const localMode = codeMode;
  const adminLabel = codeMode ? "Western Admin" : user?.displayName || "Admin";
  const adminEmail = codeMode ? "Temporary access code" : user?.email ?? "";
  const modeLabel = codeMode ? "Local code mode" : "Google verified";

  return (
    <AdminShell adminLabel={adminLabel} adminEmail={adminEmail} modeLabel={modeLabel} localMode={localMode} onSignOut={handleSignOut} activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "gallery" ? <GalleryManager items={galleryItems} localMode={localMode} /> : <NoticesManager notices={notices} localMode={localMode} />}
    </AdminShell>
  );
}
