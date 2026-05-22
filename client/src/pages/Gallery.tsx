import { useEffect, useMemo, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Grid3X3, Sparkles, X, ZoomIn } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

type CategoryId = "all" | "campus" | "programs" | "events" | "recreation" | "community";

type GalleryItem = {
  id: string;
  title: string;
  category: Exclude<CategoryId, "all">;
  categoryLabel: string;
  src: string;
  alt: string;
  featured?: boolean;
};

const asset = (name: string) => `/assets-images/${name}`;

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "campus", label: "Campus" },
  { id: "programs", label: "Learning" },
  { id: "events", label: "Events" },
  { id: "recreation", label: "Trips" },
  { id: "community", label: "Community" },
];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "campus-01", title: "Morning Assembly", category: "campus", categoryLabel: "Campus", src: asset("gallery-1.jpg"), alt: "Western Public Academy students gathered on campus", featured: true },
  { id: "program-01", title: "Hotel Management", category: "programs", categoryLabel: "Learning", src: asset("hotel-management.png"), alt: "Hotel Management practical learning at Western Public Academy", featured: true },
  { id: "recreation-01", title: "Picnic Memories", category: "recreation", categoryLabel: "Trips", src: asset("picnic-gallery.jpg"), alt: "Western Public Academy picnic memory", featured: true },
  { id: "events-02", title: "Creative Participation", category: "events", categoryLabel: "Events", src: asset("gal-22.jpg"), alt: "Student creative participation at Western Public Academy", featured: true },
  { id: "campus-02", title: "Student Life", category: "campus", categoryLabel: "Campus", src: asset("gallery-2.jpg"), alt: "Western Public Academy students in daily school life" },
  { id: "campus-03", title: "Learning Culture", category: "campus", categoryLabel: "Campus", src: asset("gallery-3.jpg"), alt: "Students learning together at Western Public Academy" },
  { id: "campus-04", title: "Campus Energy", category: "campus", categoryLabel: "Campus", src: asset("gallery-4.jpg"), alt: "Campus life at Western Public Academy" },
  { id: "campus-05", title: "Togetherness", category: "campus", categoryLabel: "Campus", src: asset("gallery-5.jpg"), alt: "Students sharing a school moment" },
  { id: "campus-06", title: "School Day", category: "campus", categoryLabel: "Campus", src: asset("gallery-6.jpg"), alt: "Western Public Academy school day moment" },
  { id: "campus-07", title: "Student Moment", category: "campus", categoryLabel: "Campus", src: asset("gallery-7.jpg"), alt: "Student moment at Western Public Academy" },
  { id: "campus-08", title: "Future Ready", category: "campus", categoryLabel: "Campus", src: asset("gallery-8.jpg"), alt: "Future-ready student learning at Western Public Academy" },
  { id: "events-01", title: "School Event", category: "events", categoryLabel: "Events", src: asset("gallery-9.jpg"), alt: "School event at Western Public Academy" },
  { id: "campus-09", title: "Campus Detail", category: "campus", categoryLabel: "Campus", src: asset("gallery-10.jpg"), alt: "Campus detail at Western Public Academy" },
  { id: "campus-10", title: "Friends & Focus", category: "campus", categoryLabel: "Campus", src: asset("gal-11.jpg"), alt: "Students at Western Public Academy" },
  { id: "campus-11", title: "Bright Faces", category: "campus", categoryLabel: "Campus", src: asset("gal-12.jpg"), alt: "Western Public Academy student group" },
  { id: "campus-12", title: "Learning Circle", category: "campus", categoryLabel: "Campus", src: asset("gal-13.jpg"), alt: "Learning circle at Western Public Academy" },
  { id: "campus-13", title: "Class Spirit", category: "campus", categoryLabel: "Campus", src: asset("gal-14.jpg"), alt: "Class spirit at Western Public Academy" },
  { id: "campus-14", title: "Everyday Joy", category: "campus", categoryLabel: "Campus", src: asset("gal-15.jpg"), alt: "Everyday joy at Western Public Academy" },
  { id: "campus-15", title: "Confidence", category: "campus", categoryLabel: "Campus", src: asset("gal-16.jpg"), alt: "Student confidence at Western Public Academy" },
  { id: "campus-16", title: "School Pride", category: "campus", categoryLabel: "Campus", src: asset("gal-17.jpg"), alt: "School pride at Western Public Academy" },
  { id: "campus-17", title: "Memories", category: "campus", categoryLabel: "Campus", src: asset("gal-18.jpg"), alt: "School memories at Western Public Academy" },
  { id: "campus-18", title: "Student Growth", category: "campus", categoryLabel: "Campus", src: asset("gal-19.jpg"), alt: "Student growth at Western Public Academy" },
  { id: "campus-19", title: "Daily Rhythm", category: "campus", categoryLabel: "Campus", src: asset("gal-20.jpg"), alt: "Daily rhythm at Western Public Academy" },
  { id: "campus-20", title: "Shared Moments", category: "campus", categoryLabel: "Campus", src: asset("gal-21.jpg"), alt: "Shared student moments at Western Public Academy" },
  { id: "events-03", title: "Activity Day", category: "events", categoryLabel: "Events", src: asset("gal-23.jpg"), alt: "Activity day at Western Public Academy" },
  { id: "campus-21", title: "School Bond", category: "campus", categoryLabel: "Campus", src: asset("gal-24.jpg"), alt: "School bond at Western Public Academy" },
  { id: "events-04", title: "Celebration", category: "events", categoryLabel: "Events", src: asset("gal-25.jpg"), alt: "Celebration at Western Public Academy" },
  { id: "campus-22", title: "Campus Smile", category: "campus", categoryLabel: "Campus", src: asset("gal-26.jpg"), alt: "Campus smile at Western Public Academy" },
  { id: "campus-23", title: "Proud Moment", category: "campus", categoryLabel: "Campus", src: asset("gal-27.jpg"), alt: "Proud school moment at Western Public Academy" },
  { id: "campus-24", title: "Student Story", category: "campus", categoryLabel: "Campus", src: asset("gaal-28.jpg"), alt: "Student story at Western Public Academy" },
  { id: "campus-25", title: "Campus Family", category: "campus", categoryLabel: "Campus", src: asset("gal-29.jpg"), alt: "Campus family at Western Public Academy" },
  { id: "campus-26", title: "Inspiring Place", category: "campus", categoryLabel: "Campus", src: asset("gal-30.jpg"), alt: "Inspiring school place at Western Public Academy" },
  { id: "campus-27", title: "School Memory", category: "campus", categoryLabel: "Campus", src: asset("gall-12.jpg"), alt: "School memory at Western Public Academy" },
  { id: "campus-28", title: "Western Public", category: "campus", categoryLabel: "Campus", src: asset("background-img-1.jpg"), alt: "Western Public Academy campus atmosphere" },
  { id: "campus-29", title: "Campus View", category: "campus", categoryLabel: "Campus", src: asset("background-img-2.jpg"), alt: "Western Public Academy campus view" },
  { id: "campus-30", title: "Learning Environment", category: "campus", categoryLabel: "Campus", src: asset("background-img-3.jpg"), alt: "Learning environment at Western Public Academy" },
  { id: "campus-31", title: "School Setting", category: "campus", categoryLabel: "Campus", src: asset("background-img-4.jpg"), alt: "Western Public Academy school setting" },
  { id: "campus-32", title: "Cover Moment", category: "campus", categoryLabel: "Campus", src: asset("home-down-cover-photo.jpg"), alt: "Western Public Academy cover moment" },
  { id: "program-02", title: "Education", category: "programs", categoryLabel: "Learning", src: asset("education-faculty.png"), alt: "Education faculty learning pathway" },
  { id: "program-03", title: "Sports Science", category: "programs", categoryLabel: "Learning", src: asset("sports-science.jpeg"), alt: "Sports Science learning pathway" },
  { id: "recreation-02", title: "Outdoor Trip", category: "recreation", categoryLabel: "Trips", src: asset("boating-picnic.jpg"), alt: "Outdoor boating picnic at Western Public Academy" },
  { id: "recreation-03", title: "Teacher Picnic", category: "recreation", categoryLabel: "Trips", src: asset("teacher-picnic.jpg"), alt: "Teacher picnic at Western Public Academy" },
  { id: "community-01", title: "School Team", category: "community", categoryLabel: "Community", src: asset("school-heads.jpg"), alt: "Western Public Academy school leadership and team" },
  { id: "community-02", title: "Bibek Raj Kalouni", category: "community", categoryLabel: "Principal", src: asset("principal-bibek-raj-kalouni.jpg"), alt: "Bibek Raj Kalouni, Principal of Western Public Academy" },
  { id: "community-03", title: "Mahesh Chaudhary", category: "community", categoryLabel: "Vice Principal", src: asset("vice-principal-mahesh-chaudhary.jpg"), alt: "Mahesh Chaudhary, Vice Principal of Western Public Academy" },
  { id: "community-04", title: "Bhoj Singh Rawal", category: "community", categoryLabel: "Asst. Administrator", src: asset("assistant-administrator-bhoj-singh-rawal.jpg"), alt: "Bhoj Singh Rawal, Assistant Administrator of Western Public Academy" },
  { id: "community-05", title: "Tulsi Chand", category: "community", categoryLabel: "Accountant", src: asset("tulsi-chand-accountant.jpg"), alt: "Tulsi Chand, Accountant of Western Public Academy" },
];

const INITIAL_VISIBLE_COUNT = 24;
const LOAD_BATCH_SIZE = 12;

const TILE_HEIGHTS = [
  "h-[310px] sm:h-[380px] lg:h-[420px]",
  "h-[260px] sm:h-[320px] lg:h-[360px]",
  "h-[220px] sm:h-[270px] lg:h-[305px]",
  "h-[285px] sm:h-[340px] lg:h-[390px]",
  "h-[235px] sm:h-[290px] lg:h-[330px]",
  "h-[330px] sm:h-[390px] lg:h-[440px]",
  "h-[245px] sm:h-[305px] lg:h-[350px]",
  "h-[300px] sm:h-[355px] lg:h-[405px]",
];

function getCategoryCount(id: CategoryId) {
  if (id === "all") return GALLERY_ITEMS.length;
  return GALLERY_ITEMS.filter((item) => item.category === id).length;
}

function GalleryTile({ item, index, onSelect }: { item: GalleryItem; index: number; onSelect: (item: GalleryItem) => void }) {
  const height = TILE_HEIGHTS[index % TILE_HEIGHTS.length];

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`${height} mb-3 sm:mb-5 block w-full break-inside-avoid group relative overflow-hidden rounded-[24px] sm:rounded-[30px] text-left soft-frame bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2`}
      style={{
        borderColor: "rgba(201,161,74,0.24)",
        backgroundImage: `linear-gradient(135deg, rgba(15,61,46,0.18), rgba(201,161,74,0.12)), url(${item.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label={`Open ${item.title} in gallery viewer`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading={index < INITIAL_VISIBLE_COUNT ? "eager" : "lazy"}
        decoding="async"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,32,24,0.9)] via-[rgba(6,32,24,0.08)] to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
      <div className="absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em]" style={{ background: "rgba(247,241,229,0.95)", color: "var(--color-forest-deep)" }}>
        {item.categoryLabel}
      </div>
      <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/35 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:scale-90">
        <ZoomIn size={18} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="display-serif text-[21px] sm:text-[24px] leading-none drop-shadow-sm" style={{ color: "var(--color-parchment)" }}>{item.title}</div>
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{ color: "var(--color-brass)" }}>
          Zoom Photo <ZoomIn size={13} />
        </div>
      </div>
    </button>
  );
}

function GalleryLightbox({ items, selectedIndex, onClose, onSelect }: { items: GalleryItem[]; selectedIndex: number | null; onClose: () => void; onSelect: (index: number) => void }) {
  const currentItem = selectedIndex === null ? null : items[selectedIndex];

  if (!currentItem || selectedIndex === null) return null;

  const goPrevious = () => onSelect((selectedIndex - 1 + items.length) % items.length);
  const goNext = () => onSelect((selectedIndex + 1) % items.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(3,18,14,0.94)] px-3 py-4 sm:px-6 sm:py-6" role="dialog" aria-modal="true" aria-label={`${currentItem.title} gallery viewer`}>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close gallery viewer"
      >
        <X size={22} />
      </button>

      <button
        type="button"
        onClick={goPrevious}
        className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      <div className="relative flex h-full w-full max-w-[1240px] flex-col items-center justify-center gap-4 pt-9 sm:pt-8">
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden rounded-[26px] border border-white/15 bg-black/35 shadow-2xl">
          <img src={currentItem.src} alt={currentItem.alt} className="max-h-full max-w-full object-contain" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent px-5 pb-5 pt-20 sm:px-8 sm:pb-7">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brass)" }}>{currentItem.categoryLabel}</div>
            <div className="display-serif mt-1 text-[28px] leading-none text-white sm:text-[40px]">{currentItem.title}</div>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-black/25 p-2 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Gallery thumbnails">
            {items.map((item, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(index)}
                  className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28"
                  style={{ borderColor: active ? "var(--color-brass)" : "rgba(255,255,255,0.18)", opacity: active ? 1 : 0.72 }}
                  aria-label={`Go to image ${index + 1}: ${item.title}`}
                >
                  <img src={item.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {active && <span className="absolute inset-0 ring-2 ring-inset" style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.55)" }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [lightboxItems, setLightboxItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const remainingCount = Math.max(filteredItems.length - visibleItems.length, 0);
  const nextBatchCount = Math.min(LOAD_BATCH_SIZE, remainingCount);
  const heroImages = GALLERY_ITEMS.filter((item) => item.featured).slice(0, 4);

  const openLightbox = (item: GalleryItem, collection: GalleryItem[]) => {
    const index = collection.findIndex((entry) => entry.id === item.id);
    setLightboxItems(collection);
    setSelectedIndex(index >= 0 ? index : 0);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setLightboxItems([]);
  };

  const changeCategory = (id: CategoryId) => {
    setActiveCategory(id);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    closeLightbox();
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") setSelectedIndex((index) => (index === null ? index : (index - 1 + lightboxItems.length) % lightboxItems.length));
      if (event.key === "ArrowRight") setSelectedIndex((index) => (index === null ? index : (index + 1) % lightboxItems.length));
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, lightboxItems.length]);

  return (
    <div className="min-h-screen paper-texture" style={{ background: "var(--color-parchment)", color: "var(--color-ink)" }}>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 20%, rgba(201,161,74,0.18) 0%, transparent 30%), linear-gradient(180deg, rgba(247,241,229,1) 0%, rgba(239,230,210,0.45) 100%)" }} />
          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 reveal">
                <div className="gold-rule mb-4">Gallery</div>
                <h1 className="display-serif h-display max-w-3xl" style={{ color: "var(--color-forest-deep)" }}>
                  Life at Western Public
                </h1>
                <p className="mt-5 max-w-xl text-[16px] sm:text-[18px] leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                  Real smiles, school pride, practical learning, trips, events, community moments, and everyday student life.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--color-forest-deep)", border: "1px solid var(--color-parchment-deep)" }}>
                    <Camera size={15} style={{ color: "var(--color-brass-deep)" }} />
                    {GALLERY_ITEMS.length} Photos
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ background: "var(--color-forest-deep)", color: "var(--color-parchment)" }}>
                    <Sparkles size={15} style={{ color: "var(--color-brass)" }} />
                    Student Life
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 reveal" style={{ transitionDelay: "80ms" }}>
                <div className="grid grid-cols-6 auto-rows-[120px] sm:auto-rows-[135px] lg:auto-rows-[150px] gap-3 sm:gap-4">
                  {heroImages.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openLightbox(item, GALLERY_ITEMS)}
                      className={`${index === 0 ? "col-span-6 sm:col-span-3 row-span-2 sm:row-span-3" : "col-span-6 sm:col-span-3 row-span-1"} group relative overflow-hidden rounded-[28px] soft-frame bg-white text-left transition-transform duration-300 hover:-translate-y-1`}
                      style={{
                        borderColor: "rgba(201,161,74,0.28)",
                        backgroundImage: `linear-gradient(135deg, rgba(15,61,46,0.18), rgba(201,161,74,0.12)), url(${item.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      aria-label={`Open ${item.title} in gallery viewer`}
                    >
                      <img src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,32,24,0.84)] via-transparent to-transparent" />
                      <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/35 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                        <ZoomIn size={18} />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-brass)" }}>{item.categoryLabel}</div>
                        <div className="display-serif mt-1 text-[23px] sm:text-[25px] leading-none" style={{ color: "var(--color-parchment)" }}>{item.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-[72px] z-30 border-y backdrop-blur-xl" style={{ background: "rgba(247,241,229,0.88)", borderColor: "var(--color-parchment-deep)" }}>
          <div className="container py-4">
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((category) => {
                const active = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => changeCategory(category.id)}
                    className="press shrink-0 rounded-full px-4 py-2.5 text-[12px] sm:text-[13px] font-semibold transition-all duration-200"
                    style={{
                      background: active ? "var(--color-forest-deep)" : "#fff",
                      color: active ? "var(--color-parchment)" : "var(--color-forest-deep)",
                      border: active ? "1px solid var(--color-forest-deep)" : "1px solid var(--color-parchment-deep)",
                    }}
                  >
                    {category.label} <span style={{ opacity: 0.65 }}>({getCategoryCount(category.id)})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="container">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 reveal">
              <div>
                <div className="eyebrow">Explore Photos</div>
                <h2 className="display-serif text-[28px] sm:text-[40px] leading-tight" style={{ color: "var(--color-forest-deep)" }}>
                  {activeCategory === "all" ? "Beautiful School Moments" : `${CATEGORIES.find((category) => category.id === activeCategory)?.label} Moments`}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--color-forest-deep)", border: "1px solid var(--color-parchment-deep)" }}>
                <Grid3X3 size={15} style={{ color: "var(--color-brass-deep)" }} />
                Showing {visibleItems.length} of {filteredItems.length}
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 [column-fill:_balance]">
              {visibleItems.map((item, index) => (
                <GalleryTile key={item.id} item={item} index={index} onSelect={(selected) => openLightbox(selected, filteredItems)} />
              ))}
            </div>

            {remainingCount > 0 && (
              <div className="mt-7 sm:mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => Math.min(count + LOAD_BATCH_SIZE, filteredItems.length))}
                  className="pill-btn inline-flex items-center gap-2 px-6 py-3 text-[12px] sm:text-[13px] font-semibold uppercase"
                  style={{ background: "var(--color-brass)", color: "var(--color-forest-deep)", letterSpacing: "0.14em" }}
                >
                  <Grid3X3 size={16} />
                  Load {nextBatchCount} More {nextBatchCount === 1 ? "Photo" : "Photos"}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <GalleryLightbox items={lightboxItems} selectedIndex={selectedIndex} onClose={closeLightbox} onSelect={setSelectedIndex} />

      <SiteFooter />
    </div>
  );
}
