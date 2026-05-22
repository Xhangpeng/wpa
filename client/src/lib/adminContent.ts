import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export type NoticeCategory = "general" | "exams" | "academic" | "events";
export type GalleryCategory = "campus" | "programs" | "events" | "recreation" | "community";

export type NoticeItem = {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  description: string;
  isNew?: boolean;
  fullContent?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  src: string;
  alt: string;
  featured?: boolean;
  storagePath?: string;
};

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  campus: "Campus",
  programs: "Learning",
  events: "Events",
  recreation: "Trips",
  community: "Community",
};

const noticesCollection = "notices";
const galleryCollection = "gallery";
const localNoticesKey = "wpa-local-notices";
const localGalleryKey = "wpa-local-gallery";
const localChangeEvent = "wpa-local-cms-change";

type AdminContentOptions = {
  local?: boolean;
};

type LocalGalleryItem = GalleryItem & {
  createdAt?: string;
  updatedAt?: string;
};

const noticeCategoryValues: NoticeCategory[] = ["general", "exams", "academic", "events"];
const galleryCategoryValues = Object.keys(galleryCategoryLabels) as GalleryCategory[];

function requireDb() {
  if (!db) throw new Error("Firebase is not configured.");
  return db;
}

function requireStorage() {
  if (!storage) throw new Error("Firebase Storage is not configured.");
  return storage;
}

function cleanFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function hasLocalStorage() {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "wpa-local-storage-test";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function readLocalJson<T>(key: string, fallback: T): T {
  if (!hasLocalStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function readLocalArray<T>(key: string): T[] {
  const value = readLocalJson<unknown>(key, []);
  return Array.isArray(value) ? (value as T[]) : [];
}

function writeLocalJson<T>(key: string, value: T) {
  if (!hasLocalStorage()) {
    throw new Error("Local browser storage is not available.");
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(localChangeEvent));
}

function normalizeNoticeCategory(value: unknown): NoticeCategory {
  return noticeCategoryValues.includes(value as NoticeCategory) ? (value as NoticeCategory) : "general";
}

function normalizeGalleryCategory(value: unknown): GalleryCategory {
  return galleryCategoryValues.includes(value as GalleryCategory) ? (value as GalleryCategory) : "campus";
}

function readLocalNotices() {
  return readLocalArray<NoticeItem>(localNoticesKey)
    .map((notice) => ({
      id: String(notice.id ?? ""),
      title: String(notice.title ?? ""),
      date: String(notice.date ?? ""),
      category: normalizeNoticeCategory(notice.category),
      description: String(notice.description ?? ""),
      isNew: Boolean(notice.isNew),
      fullContent: notice.fullContent ? String(notice.fullContent) : "",
    }))
    .filter((notice) => notice.id && notice.title)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function readLocalGalleryItems() {
  return readLocalArray<LocalGalleryItem>(localGalleryKey)
    .map((item) => {
      const category = normalizeGalleryCategory(item.category);
      return {
        id: String(item.id ?? ""),
        title: String(item.title ?? "Gallery image"),
        category,
        categoryLabel: String(item.categoryLabel ?? galleryCategoryLabels[category]),
        src: String(item.src ?? ""),
        alt: String(item.alt ?? item.title ?? "Western Public Academy gallery image"),
        featured: Boolean(item.featured),
        storagePath: item.storagePath ? String(item.storagePath) : undefined,
        createdAt: item.createdAt ? String(item.createdAt) : "",
        updatedAt: item.updatedAt ? String(item.updatedAt) : "",
      };
    })
    .filter((item) => item.id && item.src)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function subscribeLocal<T>(loadItems: () => T[], onData: (items: T[]) => void): Unsubscribe {
  if (typeof window === "undefined") {
    onData([]);
    return () => undefined;
  }

  const emit = () => onData(loadItems());
  emit();

  window.addEventListener("storage", emit);
  window.addEventListener(localChangeEvent, emit);

  return () => {
    window.removeEventListener("storage", emit);
    window.removeEventListener(localChangeEvent, emit);
  };
}

function createLocalId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not read the selected image."));
    };
    reader.readAsDataURL(file);
  });
}

function saveLocalNotice(input: Omit<NoticeItem, "id"> & { id?: string }) {
  const notices = readLocalNotices();
  const id = input.id || createLocalId("notice");
  const payload: NoticeItem = {
    id,
    title: input.title.trim(),
    date: input.date,
    category: input.category,
    description: input.description.trim(),
    isNew: Boolean(input.isNew),
    fullContent: input.fullContent?.trim() ?? "",
  };

  const nextNotices = input.id
    ? notices.map((notice) => (notice.id === input.id ? payload : notice))
    : [payload, ...notices];

  writeLocalJson(localNoticesKey, nextNotices);
  return id;
}

async function uploadLocalGalleryImage(file: File, input: Omit<GalleryItem, "id" | "src" | "storagePath">) {
  const src = await fileToDataUrl(file);
  const now = new Date().toISOString();
  const id = createLocalId("gallery");
  const item: LocalGalleryItem = {
    id,
    title: input.title.trim(),
    category: input.category,
    categoryLabel: input.categoryLabel,
    alt: input.alt.trim() || input.title.trim(),
    featured: Boolean(input.featured),
    src,
    createdAt: now,
    updatedAt: now,
  };

  writeLocalJson(localGalleryKey, [item, ...readLocalGalleryItems()]);
  return id;
}

export function subscribeNotices(
  onData: (items: NoticeItem[]) => void,
  onError?: (error: Error) => void,
  options: AdminContentOptions = {},
): Unsubscribe {
  if (!db || options.local) {
    return subscribeLocal(readLocalNotices, onData);
  }

  const noticeQuery = query(collection(db, noticesCollection), orderBy("date", "desc"));

  return onSnapshot(
    noticeQuery,
    (snapshot) => {
      onData(
        snapshot.docs.map((noticeDoc) => {
          const data = noticeDoc.data();
          return {
            id: noticeDoc.id,
            title: String(data.title ?? ""),
            date: String(data.date ?? ""),
            category: (data.category ?? "general") as NoticeCategory,
            description: String(data.description ?? ""),
            isNew: Boolean(data.isNew),
            fullContent: data.fullContent ? String(data.fullContent) : "",
          };
        }),
      );
    },
    (error) => onError?.(error),
  );
}

export function subscribeGalleryItems(
  onData: (items: GalleryItem[]) => void,
  onError?: (error: Error) => void,
  options: AdminContentOptions = {},
): Unsubscribe {
  if (!db || options.local) {
    return subscribeLocal(readLocalGalleryItems, onData);
  }

  const galleryQuery = query(collection(db, galleryCollection), orderBy("createdAt", "desc"));

  return onSnapshot(
    galleryQuery,
    (snapshot) => {
      onData(
        snapshot.docs.map((galleryDoc) => {
          const data = galleryDoc.data();
          const category = (data.category ?? "campus") as GalleryCategory;
          return {
            id: galleryDoc.id,
            title: String(data.title ?? "Gallery image"),
            category,
            categoryLabel: String(data.categoryLabel ?? galleryCategoryLabels[category]),
            src: String(data.src ?? ""),
            alt: String(data.alt ?? data.title ?? "Western Public Academy gallery image"),
            featured: Boolean(data.featured),
            storagePath: data.storagePath ? String(data.storagePath) : undefined,
          };
        }).filter((item) => item.src),
      );
    },
    (error) => onError?.(error),
  );
}

export async function saveNotice(input: Omit<NoticeItem, "id"> & { id?: string }, options: AdminContentOptions = {}) {
  if (!db || options.local) return saveLocalNotice(input);

  const firestore = requireDb();
  const payload: Record<string, unknown> = {
    title: input.title.trim(),
    date: input.date,
    category: input.category,
    description: input.description.trim(),
    isNew: Boolean(input.isNew),
    fullContent: input.fullContent?.trim() ?? "",
    updatedAt: serverTimestamp(),
  };

  if (input.id) {
    await setDoc(doc(firestore, noticesCollection, input.id), payload, { merge: true });
    return input.id;
  }

  payload.createdAt = serverTimestamp();
  const created = await addDoc(collection(firestore, noticesCollection), payload);
  return created.id;
}

export async function deleteNotice(id: string, options: AdminContentOptions = {}) {
  if (!db || options.local) {
    writeLocalJson(localNoticesKey, readLocalNotices().filter((notice) => notice.id !== id));
    return;
  }

  await deleteDoc(doc(requireDb(), noticesCollection, id));
}

export async function uploadGalleryImage(
  file: File,
  input: Omit<GalleryItem, "id" | "src" | "storagePath">,
  options: AdminContentOptions = {},
) {
  if (!db || !storage || options.local) return uploadLocalGalleryImage(file, input);

  const firestore = requireDb();
  const bucket = requireStorage();
  const storagePath = `gallery/${Date.now()}-${cleanFileName(file.name)}`;
  const imageRef = ref(bucket, storagePath);
  await uploadBytes(imageRef, file, { contentType: file.type });
  const src = await getDownloadURL(imageRef);

  const created = await addDoc(collection(firestore, galleryCollection), {
    title: input.title.trim(),
    category: input.category,
    categoryLabel: input.categoryLabel,
    alt: input.alt.trim() || input.title.trim(),
    featured: Boolean(input.featured),
    src,
    storagePath,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return created.id;
}

export async function updateGalleryItem(input: GalleryItem, options: AdminContentOptions = {}) {
  if (!db || options.local) {
    const now = new Date().toISOString();
    writeLocalJson(
      localGalleryKey,
      readLocalGalleryItems().map((item) =>
        item.id === input.id
          ? {
              ...item,
              title: input.title.trim(),
              category: input.category,
              categoryLabel: input.categoryLabel,
              alt: input.alt.trim() || input.title.trim(),
              featured: Boolean(input.featured),
              updatedAt: now,
            }
          : item,
      ),
    );
    return;
  }

  await updateDoc(doc(requireDb(), galleryCollection, input.id), {
    title: input.title.trim(),
    category: input.category,
    categoryLabel: input.categoryLabel,
    alt: input.alt.trim() || input.title.trim(),
    featured: Boolean(input.featured),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGalleryItem(item: GalleryItem, options: AdminContentOptions = {}) {
  if (!db || options.local) {
    writeLocalJson(localGalleryKey, readLocalGalleryItems().filter((entry) => entry.id !== item.id));
    return;
  }

  await deleteDoc(doc(requireDb(), galleryCollection, item.id));
  if (item.storagePath && storage) {
    await deleteObject(ref(storage, item.storagePath)).catch(() => undefined);
  }
}
