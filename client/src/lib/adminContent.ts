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

export function subscribeNotices(
  onData: (items: NoticeItem[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!db) {
    onData([]);
    return () => undefined;
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
): Unsubscribe {
  if (!db) {
    onData([]);
    return () => undefined;
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

export async function saveNotice(input: Omit<NoticeItem, "id"> & { id?: string }) {
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

export async function deleteNotice(id: string) {
  await deleteDoc(doc(requireDb(), noticesCollection, id));
}

export async function uploadGalleryImage(
  file: File,
  input: Omit<GalleryItem, "id" | "src" | "storagePath">,
) {
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

export async function updateGalleryItem(input: GalleryItem) {
  await updateDoc(doc(requireDb(), galleryCollection, input.id), {
    title: input.title.trim(),
    category: input.category,
    categoryLabel: input.categoryLabel,
    alt: input.alt.trim() || input.title.trim(),
    featured: Boolean(input.featured),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGalleryItem(item: GalleryItem) {
  await deleteDoc(doc(requireDb(), galleryCollection, item.id));
  if (item.storagePath && storage) {
    await deleteObject(ref(storage, item.storagePath)).catch(() => undefined);
  }
}
