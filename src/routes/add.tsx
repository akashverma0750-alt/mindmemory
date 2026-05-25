import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Blobs } from "@/components/Blobs";
import { addMemory, MOODS } from "@/lib/moodcanvas";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/add")({
  head: () => ({
    meta: [
      { title: "New memory — MoodCanvas" },
      { name: "description", content: "Capture a feeling, a song, a small joy." },
    ],
  }),
  component: AddMemory,
});

function AddMemory() {
  const navigate = useNavigate();
  const [moodId, setMoodId] = useState(MOODS[0].id);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [song, setSong] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const mood = MOODS.find((m) => m.id === moodId)!;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Give your memory a little title ✨");
      return;
    }
    addMemory({
      moodId,
      title: title.trim(),
      note: note.trim(),
      song: song.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
    });
    toast.success("Saved to your canvas ♡");
    navigate({ to: "/explore" });
  }

  return (
    <div className="min-h-screen">
      <Blobs />
      <Nav />

      <section className="mx-auto max-w-3xl px-6 pt-14">
        <h1 className="font-display text-5xl sm:text-6xl">A new little canvas</h1>
        <p className="mt-3 text-foreground/70">
          How did the day feel? Capture a thought, a song, an image — anything you want to keep.
        </p>
      </section>

      <form onSubmit={submit} className="mx-auto mt-10 max-w-3xl px-6 pb-20">
        <div
          className={`rounded-[2rem] bg-gradient-to-br ${mood.gradient} p-[1.5px] transition-all duration-500`}
        >
          <div className="space-y-8 rounded-[calc(2rem-1px)] bg-white/85 p-8 backdrop-blur-xl">
            {/* MOOD */}
            <div>
              <Label>Pick a mood</Label>
              <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8">
                {MOODS.map((m) => {
                  const selected = m.id === moodId;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMoodId(m.id)}
                      className={`group relative flex flex-col items-center gap-1 rounded-2xl p-3 text-xs transition ${
                        selected
                          ? "bg-foreground text-background"
                          : "bg-white/60 ring-1 ring-black/5 hover:bg-white"
                      }`}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="font-medium">{m.label}</span>
                      {selected && (
                        <Check className="absolute right-1.5 top-1.5 h-3 w-3" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A walk in the park…"
                className="input"
                maxLength={80}
              />
            </Field>

            <Field label="Your thoughts">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write whatever your heart wants to remember."
                rows={5}
                className="input resize-none"
                maxLength={2000}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="A song that fits ♪">
                <input
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  placeholder="From the Start — Laufey"
                  className="input"
                />
              </Field>
              <Field label="Image URL (optional)">
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://…"
                  className="input"
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate({ to: "/explore" })}
                className="rounded-full bg-white/70 px-5 py-2.5 text-sm ring-1 ring-black/5 hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:scale-[1.03]"
              >
                Save to canvas
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
      {children}
    </label>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      <style>{`.input{width:100%;border-radius:1rem;background:rgba(255,255,255,0.7);padding:0.75rem 1rem;font-size:0.95rem;outline:none;border:1px solid rgba(0,0,0,0.06);transition:all .2s} .input:focus{background:#fff;box-shadow:0 0 0 4px rgba(236,72,153,.15)}`}</style>
    </div>
  );
}
