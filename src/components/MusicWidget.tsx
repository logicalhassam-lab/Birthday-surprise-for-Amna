import { useRomanticMusic } from "@/lib/useRomanticMusic";

/**
 * Floating music widget (bottom-right) with play/pause + audio visualizer bars.
 * TODO: swap `useRomanticMusic` for a real royalty-free audio file if desired:
 * const audio = new Audio(CONFIG.musicFile)
 */
export function MusicWidget() {
  const { playing, toggle } = useRomanticMusic();

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="glass-card fixed bottom-5 right-4 z-40 flex items-center gap-3 rounded-full py-3 pl-4 pr-5 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] sm:bottom-7 sm:right-7"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        {playing ? (
          <span className="flex gap-[3px]">
            <span className="h-4 w-[4px] rounded bg-primary" />
            <span className="h-4 w-[4px] rounded bg-primary" />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </span>

      <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-primary/70"
            style={{
              height: playing ? "100%" : "28%",
              transformOrigin: "bottom",
              animation: playing
                ? `bob ${0.55 + i * 0.14}s ease-in-out ${i * 0.08}s infinite alternate`
                : undefined,
            }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{playing ? "Pause" : "Our song"}</span>
    </button>
  );
}
