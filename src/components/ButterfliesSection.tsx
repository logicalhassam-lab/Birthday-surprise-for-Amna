import { useState } from "react";
import { heartBurst } from "@/lib/hearts";

interface ButterflyData {
  id: number;
  name: string;
  color: string;
  secondaryColor: string;
  glowColor: string;
  posClass: string;
  flyClass: string;
  flapSpeed: string;
  scale: number;
  title: string;
  message: string;
  tag: string;
}

const BUTTERFLIES: ButterflyData[] = [
  {
    id: 1,
    name: "Rose Butterfly",
    color: "#ff6b8b",
    secondaryColor: "#ffa8ba",
    glowColor: "rgba(255, 107, 139, 0.6)",
    posClass: "top-[12%] left-[14%] sm:top-[16%] sm:left-[12%]",
    flyClass: "animate-[butterfly-fly-1_6.2s_ease-in-out_infinite]",
    flapSpeed: "0.24s",
    scale: 1.15,
    tag: "Your Beautiful Smile 💕",
    title: "When You Smile at Me",
    message:
      "Amna, your smile has a gentle magic that instantly brightens my whole world. No matter how exhausting or difficult any day feels, seeing your laugh makes everything peaceful and light. Always keep smiling, my love. 💕",
  },
  {
    id: 2,
    name: "Sky Butterfly",
    color: "#38bdf8",
    secondaryColor: "#93c5fd",
    glowColor: "rgba(56, 189, 248, 0.6)",
    posClass: "top-[14%] left-[64%] sm:top-[20%] sm:left-[72%]",
    flyClass: "animate-[butterfly-fly-2_7.0s_ease-in-out_infinite]",
    flapSpeed: "0.28s",
    scale: 1.25,
    tag: "My Entire World 🌍",
    title: "Only You, Always",
    message:
      "Out of all the billions of people in this world, my heart chose you without a single doubt. You are not just someone special in my life — you are my peaceful home, my comfort, and my safe place. Where you are is where my heart belongs. 🫶🏻",
  },
  {
    id: 3,
    name: "Rose Gold Butterfly",
    color: "#d9777f",
    secondaryColor: "#ffccd5",
    glowColor: "rgba(217, 119, 127, 0.65)",
    posClass: "top-[38%] left-[38%] sm:top-[44%] sm:left-[44%]",
    flyClass: "animate-[butterfly-fly-3_6.5s_ease-in-out_infinite]",
    flapSpeed: "0.22s",
    scale: 1.1,
    tag: "Our Sweet Moments 😂",
    title: "Every Little Laugh & Nok-Jhok",
    message:
      "We have our funny little moments, silly debates, and times when you get upset and I try everything just to make you smile again! But the truth is, even your little anger is adorable to me. Loving you through every mood is my favorite thing. 💖",
  },
  {
    id: 4,
    name: "Lavender Butterfly",
    color: "#a855f7",
    secondaryColor: "#d8b4fe",
    glowColor: "rgba(168, 85, 247, 0.6)",
    posClass: "top-[54%] left-[10%] sm:top-[56%] sm:left-[14%]",
    flyClass: "animate-[butterfly-fly-4_7.2s_ease-in-out_infinite]",
    flapSpeed: "0.26s",
    scale: 1.2,
    tag: "My Heartfelt Prayer 🤲🏻",
    title: "In Every Single Prayer",
    message:
      "In every prayer I whisper, your name is always the first on my lips. I pray Allah blesses you with endless health, a long joyful life, and all the boundless happiness your kind and gentle heart deserves. Ameen. 🤲🏻❤️",
  },
  {
    id: 5,
    name: "Coral Butterfly",
    color: "#fb7185",
    secondaryColor: "#fecdd3",
    glowColor: "rgba(251, 113, 133, 0.6)",
    posClass: "top-[56%] left-[68%] sm:top-[58%] sm:left-[74%]",
    flyClass: "animate-[butterfly-fly-5_6.8s_ease-in-out_infinite]",
    flapSpeed: "0.25s",
    scale: 1.05,
    tag: "My Greatest Gift 🎁",
    title: "The Greatest Gift in My Life",
    message:
      "Today is your birthday, but honestly? The greatest gift was given to me the day you walked into my life. You brought colors, warmth, and meaning into my everyday world that I will cherish for as long as I live. 🥹❤️",
  },
  {
    id: 6,
    name: "Magenta Butterfly",
    color: "#ec4899",
    secondaryColor: "#fbcfe8",
    glowColor: "rgba(236, 72, 153, 0.6)",
    posClass: "top-[76%] left-[36%] sm:top-[74%] sm:left-[42%]",
    flyClass: "animate-[butterfly-fly-6_7.5s_ease-in-out_infinite]",
    flapSpeed: "0.23s",
    scale: 1.18,
    tag: "Forever & Always ♾️",
    title: "Bilal Will Always Be Yours",
    message:
      "Times will change, seasons will turn, and years will fly by — but my love and devotion for you will only grow deeper with each passing day. You were, you are, and you will forever be my favorite person. Happy Birthday, Amna! Always yours, Bilal. ❤️",
  },
];

function ButterflySVG({
  color,
  secondaryColor,
  flapSpeed,
  glowColor,
}: {
  color: string;
  secondaryColor: string;
  flapSpeed: string;
  glowColor: string;
}) {
  return (
    <div
      className="relative flex items-center justify-center filter"
      style={{ filter: `drop-shadow(0 0 14px ${glowColor})` }}
    >
      <svg
        viewBox="0 0 70 60"
        className="h-11 w-13 select-none sm:h-16 sm:w-20"
        style={{ perspective: "600px" }}
      >
        <defs>
          <linearGradient id={`grad-left-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <linearGradient id={`grad-right-${color}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* LEFT WINGS */}
        <g
          style={{
            transformOrigin: "35px 30px",
            animation: `butterfly-wing-left ${flapSpeed} ease-in-out infinite alternate`,
          }}
        >
          {/* Top Left Wing */}
          <path
            d="M 35 28 C 30 14, 10 4, 6 16 C 2 28, 18 36, 35 32 Z"
            fill={`url(#grad-left-${color})`}
            opacity="0.95"
          />
          {/* Bottom Left Wing */}
          <path
            d="M 35 32 C 24 35, 12 42, 16 52 C 20 58, 30 48, 35 36 Z"
            fill={`url(#grad-left-${color})`}
            opacity="0.85"
          />
          {/* Wing patterns */}
          <circle cx="16" cy="20" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="22" cy="46" r="1.8" fill="#ffffff" opacity="0.8" />
        </g>

        {/* RIGHT WINGS */}
        <g
          style={{
            transformOrigin: "35px 30px",
            animation: `butterfly-wing-right ${flapSpeed} ease-in-out infinite alternate`,
          }}
        >
          {/* Top Right Wing */}
          <path
            d="M 35 28 C 40 14, 60 4, 64 16 C 68 28, 52 36, 35 32 Z"
            fill={`url(#grad-right-${color})`}
            opacity="0.95"
          />
          {/* Bottom Right Wing */}
          <path
            d="M 35 32 C 46 35, 58 42, 54 52 C 50 58, 40 48, 35 36 Z"
            fill={`url(#grad-right-${color})`}
            opacity="0.85"
          />
          {/* Wing patterns */}
          <circle cx="54" cy="20" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="48" cy="46" r="1.8" fill="#ffffff" opacity="0.8" />
        </g>

        {/* BODY & ANTENNAE */}
        <g>
          {/* Antennae */}
          <path
            d="M 35 22 Q 30 12 26 10 M 35 22 Q 40 12 44 10"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <circle cx="26" cy="10" r="1.2" fill="#ffffff" />
          <circle cx="44" cy="10" r="1.2" fill="#ffffff" />
          {/* Body */}
          <ellipse cx="35" cy="31" rx="2.2" ry="11" fill="#4a042e" />
          <ellipse cx="35" cy="30" rx="1.6" ry="8" fill="#ffffff" opacity="0.4" />
          <circle cx="35" cy="21" r="2.2" fill="#4a042e" />
        </g>
      </svg>
    </div>
  );
}

export function ButterfliesSection() {
  const [activeButterfly, setActiveButterfly] = useState<ButterflyData | null>(null);
  const [openedIds, setOpenedIds] = useState<number[]>([]);

  const handleButterflyClick = (b: ButterflyData, e: React.MouseEvent) => {
    // Pop heart burst at touch/click coordinates
    heartBurst(e.clientX, e.clientY, 25);
    setActiveButterfly(b);
    if (!openedIds.includes(b.id)) {
      setOpenedIds((prev) => [...prev, b.id]);
    }
  };

  return (
    <section id="butterflies" className="relative mx-auto max-w-6xl px-6 py-24">
      {/* SECTION TITLE */}
      <div className="mb-10 text-center reveal" data-reveal>
        <h2 className="font-playfair font-semibold tracking-wide glow-soft text-gradient-romance text-3xl leading-tight sm:text-5xl">
          Flutters of Love for Amna
        </h2>
        <p className="font-lora italic mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
          Every fluttering butterfly carries a sweet secret message from Bilal... tap any butterfly to discover what his heart has to say! 🦋💕
        </p>

        {/* Discovery Progress Indicator */}
        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/60 px-5 py-2 text-xs text-primary backdrop-blur-md">
          <span>Messages Discovered:</span>
          <span className="font-bold text-base text-primary">
            {openedIds.length} / {BUTTERFLIES.length}
          </span>
          <span>{openedIds.length === BUTTERFLIES.length ? "🎉 All Discovered!" : "💕"}</span>
        </div>
      </div>

      {/* BUTTERFLY GARDEN SKY */}
      <div
        data-reveal
        className="reveal glass-card relative mx-auto h-[540px] w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-primary/30 p-3 sm:p-6 shadow-[var(--shadow-soft)] sm:h-[480px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.96 0.04 350 / 0.85), oklch(0.94 0.05 320 / 0.75), oklch(0.97 0.02 60 / 0.8))",
        }}
      >
        {/* Soft bottom guide message */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs font-medium text-muted-foreground/60 select-none">
          💕 Tap any floating butterfly to catch Bilal's message 💕
        </div>

        {/* FLYING BUTTERFLIES */}
        {BUTTERFLIES.map((b) => {
          const isOpened = openedIds.includes(b.id);
          return (
            <div
              key={b.id}
              className={`absolute z-20 transition-transform duration-300 hover:scale-125 ${b.posClass}`}
            >
              <div className={b.flyClass}>
                <button
                  onClick={(e) => handleButterflyClick(b, e)}
                  aria-label={`Open ${b.name}`}
                  className="group relative flex flex-col items-center cursor-pointer p-1.5 sm:p-3 outline-none"
                >
                  <ButterflySVG
                    color={b.color}
                    secondaryColor={b.secondaryColor}
                    flapSpeed={b.flapSpeed}
                    glowColor={b.glowColor}
                  />

                  {/* Cute floating label below butterfly */}
                  <span
                    className={`mt-1 rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wider transition-all duration-300 backdrop-blur-md shadow-sm sm:px-2.5 sm:text-[10px] ${
                      isOpened
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-white/85 text-foreground/85 group-hover:bg-primary group-hover:text-white"
                    }`}
                  >
                    {isOpened ? "✓ " + b.tag : "Tap me 💌"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROMANTIC POPUP MODAL FOR AMNA */}
      {activeButterfly ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setActiveButterfly(null)}
        >
          <div
            className="glass-card relative w-full max-w-lg rounded-[2.2rem] border-2 border-primary/40 bg-card/95 p-7 text-center shadow-2xl transition-all duration-300 animate-in zoom-in-95 sm:p-10"
            onClick={(e) => e.stopPropagation()}
            style={{
              background:
                "linear-gradient(145deg, oklch(0.99 0.015 340 / 0.96), oklch(0.96 0.03 330 / 0.94))",
            }}
          >
            {/* Top Glowing Butterfly preview */}
            <div className="mx-auto -mt-16 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-pink-200 to-rose-100 shadow-lg border-2 border-white">
              <ButterflySVG
                color={activeButterfly.color}
                secondaryColor={activeButterfly.secondaryColor}
                flapSpeed="0.3s"
                glowColor={activeButterfly.glowColor}
              />
            </div>

            {/* Tag / Category */}
            <span className="mt-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {activeButterfly.tag}
            </span>

            {/* Title */}
            <h3 className="font-playfair font-semibold mt-3 text-2xl sm:text-3xl text-primary glow-soft">
              {activeButterfly.title}
            </h3>

            {/* Message in English */}
            <p className="font-lora mt-4 text-base sm:text-lg leading-[2] text-foreground/90 font-normal">
              "{activeButterfly.message}"
            </p>

            {/* Sign-off */}
            <p className="font-playfair italic mt-5 text-xl text-primary font-medium">
              Forever yours, Bilal ❤️
            </p>

            {/* Close Button */}
            <button
              onClick={() => setActiveButterfly(null)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-romance px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:scale-105"
            >
              Close with love 💕
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
