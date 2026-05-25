import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Nav() {
  return (
    <header className="sticky top-4 z-40 mx-auto mt-4 w-[min(96%,1100px)]">
      <nav className="glass flex items-center justify-between rounded-full px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-300 to-violet-300 text-lg shadow-inner">
            🎨
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Mood<span className="text-gradient">Canvas</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 sm:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/add">Add</NavLink>
        </div>
        <Link
          to="/add"
          className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:scale-[1.03]"
        >
          <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
          New memory
        </Link>
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-white/60 hover:text-foreground"
      activeProps={{ className: "bg-white/70 text-foreground" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}
