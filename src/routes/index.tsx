import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { Blobs } from "@/components/Blobs";
import { MemoryCard } from "@/components/MemoryCard";
import {
  ensureSeed,
  loadMemories,
  MOODS,
  quoteOfDay,
  type Memory,
} from "@/lib/moodcanvas";
import { ArrowRight, Quote, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoodCanvas — a soft place for your days" },
      {
        name: "description",
        content:
          "A creative mood journal & aesthetic memory board. Capture feelings, songs and small joys in beautiful visual cards.",
      },
      { property: "og:title", content: "MoodCanvas — a soft place for your days" },
      {
        property: "og:description",
        content: "Capture moods, songs and tiny joys in beautiful visual cards.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [memories, setMemories] = useState<Memory[]>([]);
  useEffect(() => {
    ensureSeed();
    setMemories(loadMemories());
  }, []);
  const quote = useMemo(() => quoteOfDay(), []);
  const featured = memories.slice(0, 3);
  const favorites = memories.filter((m) => m.favorite).slice(0, 4);

  const stats = useMemo(() => {
    const counts = new Map<string, number>();
    memories.forEach((m) => counts.set(m.moodId, (counts.get(m.moodId) || 0) + 1));
    return MOODS.map((m) => ({ ...m, count: counts.get(m.id) || 0 })).filter((m) => m.count > 0);
  }, [memories]);
  const maxStat = Math.max(1, ...stats.map((s) => s.count));

  return (
    <div className="min-h-screen">
      <Blobs />
      <Nav />

      {/* HERO */}
      <section className="mx-auto mt-12 max-w-6xl px-6 pb-10 pt-12 text-center sm:pt-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/70 ring-1 ring-black/5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> a soft journal for your moods
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-7xl md:text-8xl">
            Paint your days
            <br />
            into <span className="text-gradient italic">tiny canvases</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-foreground/70 sm:text-lg">
            MoodCanvas turns your feelings, photos and favorite songs into a beautiful
            memory board — a quiet, aesthetic place to remember who you were today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/add"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]"
            >
              Capture a mood
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-6 py-3 text-sm font-medium ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
            >
              Explore the board
            </Link>
          </div>
        </div>

        {/* Floating mood chips */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {MOODS.map((m, i) => (
            <span
              key={m.id}
              className={`glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm animate-float`}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <span className="text-lg">{m.emoji}</span>
              <span className="font-medium">{m.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="glass-strong relative rounded-[2rem] p-10 text-center">
          <Quote className="absolute left-6 top-6 h-8 w-8 text-pink-300" />
          <p className="font-display text-2xl italic leading-snug sm:text-3xl">
            "{quote}"
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Quote of the day
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl sm:text-4xl">Recently captured</h2>
            <Link to="/explore" className="text-sm font-medium text-foreground/70 hover:text-foreground">
              See all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((m) => (
              <MemoryCard key={m.id} memory={m} />
            ))}
          </div>
        </section>
      )}

      {/* STATS */}
      {stats.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="glass rounded-[2rem] p-8">
            <h2 className="font-display text-2xl">Your mood palette</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A little portrait of how you've been feeling.
            </p>
            <div className="mt-6 space-y-3">
              {stats.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="w-28 text-sm">
                    {s.emoji} {s.label}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/60">
                    <div
                      className={`h-full bg-gradient-to-r ${s.gradient}`}
                      style={{ width: `${(s.count / maxStat) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm tabular-nums text-muted-foreground">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAVORITES */}
      {favorites.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="mb-8 font-display text-3xl sm:text-4xl">Favorite memories ♡</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((m) => (
              <MemoryCard key={m.id} memory={m} />
            ))}
          </div>
        </section>
      )}

      <footer className="mx-auto max-w-6xl px-6 py-16 text-center text-sm text-muted-foreground">
        Made by Akash Verma ♡
      </footer>
    </div>
  );
}
