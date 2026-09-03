import { useMemo } from "react";

type Particle = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  kind: "heart" | "sparkle" | "petal";
};

const KINDS: Particle["kind"][] = ["heart", "sparkle", "petal", "sparkle"];

function makeParticles(count: number, seed: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(seed + i * 12.9898 + n * 78.233) + 1) / 2);
    return {
      id: i,
      left: Math.round(r(1) * 10000) / 100,
      size: Math.round(8 + r(2) * 20),
      delay: Math.round(r(3) * 1800) / 100,
      duration: Math.round((16 + r(4) * 18) * 100) / 100,
      opacity: Math.round((0.25 + r(5) * 0.5) * 100) / 100,
      kind: KINDS[Math.floor(r(6) * KINDS.length)] ?? "heart",
    };
  });
}

function Glyph({ kind, size }: { kind: Particle["kind"]; size: number }) {
  if (kind === "sparkle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 0c.7 6.6 4.7 10.6 12 12-7.3 1.4-11.3 5.4-12 12-.7-6.6-4.7-10.6-12-12C7.3 10.6 11.3 6.6 12 0z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (kind === "petal") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="6" ry="10" fill="currentColor" transform="rotate(28 12 12)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-8-4.9-8-10.4A4.6 4.6 0 0 1 12 7.6 4.6 4.6 0 0 1 20 10.6C20 16.1 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MagicBackground({ count = 26, seed = 7 }: { count?: number; seed?: number }) {
  const particles = useMemo(() => makeParticles(count, seed), [count, seed]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-primary/15 blur-[110px]" />
      <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-secondary/40 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/30 blur-[110px]" />
      {particles.map((p) => (
        <span
          key={p.id}
          className={
            p.kind === "sparkle"
              ? "absolute bottom-[-60px] text-accent"
              : p.kind === "petal"
                ? "absolute bottom-[-60px] text-secondary"
                : "absolute bottom-[-60px] text-primary"
          }
          style={{
            left: `${p.left}%`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            ["--o" as string]: p.opacity,
          }}
        >
          <Glyph kind={p.kind} size={p.size} />
        </span>
      ))}
    </div>
  );
}
