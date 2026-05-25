import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { Blobs } from "@/components/Blobs";
import { MemoryCard } from "@/components/MemoryCard";
import { MemoryModal } from "@/components/MemoryModal";
import {
  deleteMemory,
  ensureSeed,
  loadMemories,
  MOODS,
  toggleFavorite,
  type Memory,
} from "@/lib/moodcanvas";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — MoodCanvas" },
      { name: "description", content: "Browse your aesthetic mood memory board." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [items, setItems] = useState<Memory[]>([]);
  const [q, setQ] = useState("");
  const [mood, setMood] = useState<string>("all");
  const [range, setRange] = useState<"all" | "week" | "month">("all");
  const [active, setActive] = useState<Memory | null>(null);

  function refresh() {
    setItems(loadMemories());
  }
  useEffect(() => {
    ensureSeed();
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const now = Date.now();
    return items.filter((m) => {
      if (mood !== "all" && m.moodId !== mood) return false;
      if (range !== "all") {
        const days = range === "week" ? 7 : 30;
        if (now - new Date(m.date).getTime() > days * 86400000) return false;
      }
      if (q) {
        const hay = `${m.title} ${m.note} ${m.song || ""}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [items, q, mood, range]);

  return (
    <div className="min-h-screen">
      <Blobs />
      <Nav />

      <section className="mx-auto max-w-6xl px-6 pt-14">
        <h1 className="font-display text-5xl sm:text-6xl">The memory board</h1>
        <p className="mt-3 max-w-xl text-foreground/70">
          A soft little gallery of everything you've felt and noticed.
        </p>
      </section>

      {/* FILTERS */}
      <section className="mx-auto mt-8 max-w-6xl px-6">
        <div className="glass flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/70 px-4 py-2.5 ring-1 ring-black/5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search memories, songs, words…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value as "all" | "week" | "month")}
              className="rounded-full bg-white/70 px-3 py-2 text-sm ring-1 ring-black/5"
            >
              <option value="all">All time</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={mood === "all"} onClick={() => setMood("all")}>
            ✦ All moods
          </Chip>
          {MOODS.map((m) => (
            <Chip key={m.id} active={mood === m.id} onClick={() => setMood(m.id)}>
              {m.emoji} {m.label}
            </Chip>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {filtered.length === 0 ? (
          <div className="glass mx-auto max-w-md rounded-3xl p-12 text-center">
            <div className="text-6xl">🫧</div>
            <h3 className="mt-4 font-display text-2xl">Nothing here yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different mood or capture a new memory.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {filtered.map((m) => (
              <MemoryCard
                key={m.id}
                memory={m}
                onClick={() => setActive(m)}
                onFavorite={() => {
                  toggleFavorite(m.id);
                  refresh();
                }}
              />
            ))}
          </div>
        )}
      </section>

      <MemoryModal
        memory={active}
        onClose={() => setActive(null)}
        onFavorite={(id) => {
          toggleFavorite(id);
          refresh();
          const next = loadMemories().find((x) => x.id === id) || null;
          setActive(next);
        }}
        onDelete={(id) => {
          deleteMemory(id);
          refresh();
        }}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm transition ${
        active
          ? "bg-foreground text-background"
          : "bg-white/70 text-foreground/70 ring-1 ring-black/5 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}
