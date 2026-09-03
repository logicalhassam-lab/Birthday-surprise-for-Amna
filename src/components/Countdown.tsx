import { useEffect, useState } from "react";

function diff(target: number, now: number) {
  const ms = Math.abs(target - now);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = new Date(targetDate).getTime();
  const t = diff(target, now ?? target);
  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {units.map((u) => (
        <div key={u.label} className="glass-card rounded-3xl px-4 py-6 text-center">
          <div className="text-gradient-romance text-4xl font-semibold tabular-nums sm:text-5xl">
            {now === null ? "--" : String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
