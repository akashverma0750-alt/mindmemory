export type Mood = {
  id: string;
  emoji: string;
  label: string;
  color: string; // tailwind utility color token
  gradient: string;
};

export const MOODS: Mood[] = [
  { id: "joyful", emoji: "🌸", label: "Joyful", color: "blush", gradient: "from-pink-200 via-rose-100 to-orange-100" },
  { id: "calm", emoji: "🌿", label: "Calm", color: "mint", gradient: "from-emerald-100 via-teal-100 to-sky-100" },
  { id: "dreamy", emoji: "☁️", label: "Dreamy", color: "lavender", gradient: "from-violet-200 via-purple-100 to-indigo-100" },
  { id: "cozy", emoji: "🕯️", label: "Cozy", color: "peach", gradient: "from-amber-100 via-orange-100 to-rose-100" },
  { id: "energetic", emoji: "⚡", label: "Energetic", color: "butter", gradient: "from-yellow-100 via-amber-100 to-pink-100" },
  { id: "melancholy", emoji: "🌙", label: "Melancholy", color: "sky", gradient: "from-blue-100 via-indigo-100 to-slate-100" },
  { id: "loved", emoji: "💌", label: "Loved", color: "blush", gradient: "from-rose-200 via-pink-100 to-fuchsia-100" },
  { id: "curious", emoji: "🪞", label: "Curious", color: "lavender", gradient: "from-fuchsia-100 via-violet-100 to-sky-100" },
];

export type Memory = {
  id: string;
  moodId: string;
  title: string;
  note: string;
  imageUrl?: string;
  song?: string;
  date: string; // ISO
  favorite?: boolean;
};

const KEY = "moodcanvas:memories:v1";

export function loadMemories(): Memory[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMemories(list: Memory[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addMemory(m: Omit<Memory, "id" | "date">): Memory {
  const list = loadMemories();
  const memory: Memory = { ...m, id: crypto.randomUUID(), date: new Date().toISOString() };
  saveMemories([memory, ...list]);
  return memory;
}

export function deleteMemory(id: string) {
  saveMemories(loadMemories().filter((m) => m.id !== id));
}

export function toggleFavorite(id: string) {
  saveMemories(loadMemories().map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m)));
}

export const QUOTES = [
  "Collect moments, not things.",
  "Every day is a tiny canvas.",
  "Feelings are just visitors. Let them come and go.",
  "Small joys make whole lives.",
  "Be soft. Do not let the world make you hard.",
  "You are allowed to be both a masterpiece and a work in progress.",
  "The quieter you become, the more you can hear.",
  "Bloom slowly, bloom anyway.",
];

export function quoteOfDay() {
  const day = new Date().getDate();
  return QUOTES[day % QUOTES.length];
}

export function getMood(id: string) {
  return MOODS.find((m) => m.id === id) ?? MOODS[0];
}

// Seed a few sample memories so first-time visitors see the canvas alive
export function ensureSeed() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(KEY)) return;
  const seed: Memory[] = [
    {
      id: crypto.randomUUID(),
      moodId: "joyful",
      title: "Cherry blossom walk",
      note: "Pink petals everywhere. Stopped for matcha and watched the wind move through the trees.",
      imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800",
      song: "Cornfield Chase — Hans Zimmer",
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      favorite: true,
    },
    {
      id: crypto.randomUUID(),
      moodId: "cozy",
      title: "Rain & old books",
      note: "Reread my favorite chapter with chamomile tea. The world felt very small and very warm.",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
      song: "From the Start — Laufey",
      date: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      moodId: "dreamy",
      title: "Midnight sky",
      note: "Lay on the balcony counting stars. Made up names for the ones I didn't know.",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop",
      song: "Glimpse of Us — Joji",
      date: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      moodId: "calm",
      title: "Studio morning",
      note: "Coffee, sunlight on the floor, nothing urgent. A perfect kind of nothing.",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      song: "Sunday — HONNE",
      date: new Date(Date.now() - 86400000 * 8).toISOString(),
      favorite: true,
    },
    {
      id: crypto.randomUUID(),
      moodId: "energetic",
      title: "Friday dance floor",
      note: "Tiny living room rave. Three people, neon socks, full hearts.",
      song: "As It Was — Harry Styles",
      date: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      moodId: "loved",
      title: "Grandma's letter",
      note: "Found a handwritten note in an old book. Still smells faintly of her perfume.",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop",
      date: new Date(Date.now() - 86400000 * 12).toISOString(),
      favorite: true,
    },
  ];
  saveMemories(seed);
}
