import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

export function Navbar({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -40% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:pt-5">
      <div className="glass-card flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-5 pr-2 sm:justify-center">
        <span className="font-script text-2xl text-primary sm:hidden">Surprise</span>
        <div className="hidden gap-1 sm:flex">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => go(i.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                active === i.id
                  ? "bg-romance text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {i.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="rounded-full bg-romance px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground sm:hidden"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="glass-card absolute top-20 grid w-[calc(100%-1.5rem)] max-w-xs gap-1 rounded-3xl p-3 sm:hidden">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => go(i.id)}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
                active === i.id ? "bg-romance text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {i.label}
            </button>
          ))}
        </div>
      ) : null}
    </nav>
  );
}
