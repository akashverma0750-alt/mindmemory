import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getMood, type Memory } from "@/lib/moodcanvas";
import { Heart, Music2, Trash2 } from "lucide-react";

export function MemoryModal({
  memory,
  onClose,
  onFavorite,
  onDelete,
}: {
  memory: Memory | null;
  onClose: () => void;
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const open = !!memory;
  const mood = memory ? getMood(memory.moodId) : null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden rounded-3xl border-none bg-transparent p-0 shadow-2xl">
        {memory && mood && (
          <div className={`bg-gradient-to-br ${mood.gradient} p-[1.5px]`}>
            <div className="rounded-[calc(2rem-1px)] bg-white/90 backdrop-blur-xl">
              {memory.imageUrl && (
                <img
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="max-h-[40vh] w-full object-cover"
                />
              )}
              <div className="space-y-4 p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-black/5">
                    <span>{mood.emoji}</span> {mood.label}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onFavorite(memory.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-black/5 transition hover:scale-105"
                    >
                      <Heart
                        className={`h-4 w-4 ${memory.favorite ? "fill-pink-500 text-pink-500" : ""}`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        onDelete(memory.id);
                        onClose();
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-black/5 transition hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4 text-rose-500" />
                    </button>
                  </div>
                </div>
                <h2 className="font-display text-3xl">{memory.title}</h2>
                <p className="whitespace-pre-line text-foreground/80">{memory.note}</p>
                {memory.song && (
                  <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-sm ring-1 ring-black/5">
                    <Music2 className="h-4 w-4 text-pink-500" />
                    <span className="font-medium">{memory.song}</span>
                  </div>
                )}
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {new Date(memory.date).toLocaleString(undefined, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
