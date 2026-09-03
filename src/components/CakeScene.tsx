import { useState } from "react";
import { burstFromEvent, heartBurst } from "@/lib/hearts";

/** Illustrated SVG cake with flickering candles that can be blown out. */
export function CakeScene() {
  const [blown, setBlown] = useState(false);

  const extinguish = (e: React.MouseEvent) => {
    setBlown(true);
    // Wave 1 — immediate burst from click point
    burstFromEvent(e, 40);
    // Wave 2 — delayed center burst
    window.setTimeout(() => heartBurst(window.innerWidth / 2, window.innerHeight / 2, 35), 300);
    // Wave 3 — another delayed burst for extra magic
    window.setTimeout(() => heartBurst(window.innerWidth / 2, window.innerHeight / 2 - 50, 30), 700);
    // Wave 4 — final shower from sides
    window.setTimeout(() => {
      heartBurst(window.innerWidth * 0.3, window.innerHeight / 2, 20);
      heartBurst(window.innerWidth * 0.7, window.innerHeight / 2, 20);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        onClick={extinguish}
        aria-label="Blow out the candles"
        className="transition-transform duration-300 hover:scale-105"
      >
        <svg viewBox="0 0 240 220" className="h-56 w-64 sm:h-72 sm:w-80" role="img" aria-label="Birthday cake">
          <title>Birthday cake</title>
          {[70, 120, 170].map((x, i) => (
            <g key={x}>
              {!blown ? (
                <g className="animate-flicker" style={{ transformOrigin: `${x}px 62px`, animationDelay: `${i * 0.11}s` }}>
                  <ellipse cx={x} cy={56} rx="7" ry="13" fill="var(--accent)" opacity="0.9" />
                  <ellipse cx={x} cy={59} rx="3.4" ry="7" fill="var(--cream)" />
                </g>
              ) : (
                <g className="animate-smoke" style={{ animationDelay: `${i * 0.12}s` }}>
                  <circle cx={x} cy={56} r="4" fill="var(--muted-foreground)" opacity="0.45" />
                  <circle cx={x + 5} cy={44} r="3" fill="var(--muted-foreground)" opacity="0.3" />
                </g>
              )}
              <rect x={x - 3} y="70" width="6" height="34" rx="3" fill="var(--rose-gold)" />
            </g>
          ))}
          <rect x="40" y="104" width="160" height="40" rx="14" fill="var(--cream)" />
          <rect x="34" y="136" width="172" height="48" rx="18" fill="oklch(0.88 0.062 8)" />
          <rect x="28" y="176" width="184" height="30" rx="15" fill="var(--primary)" opacity="0.85" />
          {[55, 90, 125, 160, 190].map((x) => (
            <circle key={x} cx={x} cy="140" r="4" fill="var(--primary)" opacity="0.55" />
          ))}
        </svg>
      </button>
      <p className="text-sm text-muted-foreground">
        {blown ? "Wish sent to the stars 💫 tap again for more magic" : "Tap the cake to blow out the candles"}
      </p>
    </div>
  );
}
