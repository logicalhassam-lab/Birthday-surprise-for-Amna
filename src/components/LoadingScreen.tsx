import { useEffect, useState } from "react";
import { MagicBackground } from "./MagicBackground";
import { playRomanticMusic } from "@/lib/useRomanticMusic";

export function LoadingScreen({ done }: { done: boolean }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Attempt autoplay immediately
    void playRomanticMusic();
  }, []);

  const handleEnter = () => {
    void playRomanticMusic();
    setEntered(true);
  };

  /* Phase 1 — Tap to Enter / Open */
  if (!entered) {
    return (
      <div
        className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center select-none"
        style={{ background: "var(--gradient-dream)" }}
        onClick={handleEnter}
      >
        <MagicBackground count={30} seed={3} />
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          <div className="relative">
            <span className="absolute inset-0 -z-10 block rounded-full bg-primary/25 blur-2xl" />
            <svg
              viewBox="0 0 24 24"
              className="h-20 w-20 animate-heartbeat text-primary drop-shadow-[0_0_24px_oklch(0.7_0.15_10/0.6)]"
              aria-hidden="true"
            >
              <path
                d="M12 21s-8-4.9-8-10.4A4.6 4.6 0 0 1 12 7.6 4.6 4.6 0 0 1 20 10.6C20 16.1 12 21 12 21z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1 className="animate-shimmer-in font-playfair font-semibold tracking-wide glow-soft text-3xl leading-relaxed text-primary sm:text-5xl">
            A Magical Surprise,
            <br />
            Crafted With Love, Just For You 💕
          </h1>

          <button
            onClick={handleEnter}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-romance px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)]"
          >
            🎶 Open Your Surprise 🎶
          </button>

          <p className="text-xs text-muted-foreground/70 animate-pulse">Tap anywhere to begin</p>
        </div>
      </div>
    );
  }

  /* Phase 2 — brief loading transition */
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
        done ? "pointer-events-none opacity-0 blur-md" : "opacity-100"
      }`}
      style={{ background: "var(--gradient-dream)" }}
    >
      <MagicBackground count={30} seed={3} />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div className="relative">
          <span className="absolute inset-0 -z-10 block rounded-full bg-primary/25 blur-2xl" />
          <svg
            viewBox="0 0 24 24"
            className="h-20 w-20 animate-heartbeat text-primary drop-shadow-[0_0_24px_oklch(0.7_0.15_10/0.6)]"
            aria-hidden="true"
          >
            <path
              d="M12 21s-8-4.9-8-10.4A4.6 4.6 0 0 1 12 7.6 4.6 4.6 0 0 1 20 10.6C20 16.1 12 21 12 21z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1 className="animate-shimmer-in font-playfair font-semibold tracking-wide glow-soft text-3xl leading-relaxed text-primary sm:text-5xl">
          Loading your surprise...
        </h1>

        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-2 w-2 animate-twinkle rounded-full bg-rose-gold"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
