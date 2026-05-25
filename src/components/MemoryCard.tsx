import { Heart, Music2 } from "lucide-react";
import { getMood, type Memory } from "@/lib/moodcanvas";

export function MemoryCard({
  memory,
  onClick,
  onFavorite,
}: {
  memory: Memory;
  onClick?: () => void;
  onFavorite?: () => void;
}) {
  const mood = getMood(memory.moodId);
  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br ${mood.gradient} p-[1px] text-left transition duration-500 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="relative rounded-[calc(2rem-1px)] bg-white/80 backdrop-blur-md">
        {memory.imageUrl && (
          <div className="overflow-hidden rounded-t-[calc(2rem-1px)]">
            <img
              src={memory.imageUrl}
              alt={memory.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <div className="space-y-2 p-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-foreground/70 ring-1 ring-black/5">
              <span className="text-base">{mood.emoji}</span> {mood.label}
            </span>
            {onFavorite && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    onFavorite();
                  }
                }}
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/70 transition hover:scale-110"
              >
                <Heart
                  className={`h-4 w-4 transition ${memory.favorite ? "fill-pink-500 text-pink-500" : "text-foreground/60"}`}
                />
              </span>
            )}
          </div>
          <h3 className="font-display text-xl leading-tight">{memory.title}</h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{memory.note}</p>
          {memory.song && (
            <div className="flex items-center gap-1.5 pt-1 text-xs text-foreground/60">
              <Music2 className="h-3.5 w-3.5" />
              <span className="truncate">{memory.song}</span>
            </div>
          )}
          <div className="pt-1 text-[11px] uppercase tracking-wider text-muted-foreground/80">
            {new Date(memory.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </button>
  );
}
