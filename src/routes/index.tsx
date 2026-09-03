import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import confetti from "canvas-confetti";

import { LoadingScreen } from "@/components/LoadingScreen";
import { MagicBackground } from "@/components/MagicBackground";
import { Navbar } from "@/components/Navbar";
import { MusicWidget } from "@/components/MusicWidget";
import { CakeScene } from "@/components/CakeScene";
import { CountUp } from "@/components/CountUp";
import { ButterfliesSection } from "@/components/ButterfliesSection";
import { useReveal } from "@/lib/useReveal";
import { heartBurst } from "@/lib/hearts";
import { useRomanticMusic } from "@/lib/useRomanticMusic";

/* TODO: replace with real photos */
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory4 from "@/assets/memory-4.jpg";

/* ------------------------------------------------------------------ */
/*  EDIT ME — everything personal lives in this one config object      */
/* ------------------------------------------------------------------ */
const CONFIG = {
  name: "Meri Jaan",
  tagline: "Today is a very special day",
  heroSub: "My favourite everything in this world",
  marquee: [
    "Happy Birthday",
    "You Are Loved",
    "Forever Yours",
    "My Everything",
    "Dreams Come True",
  ],
  musicFile: "", // TODO: point to a royalty-free mp3; empty = built-in soft piano
  letter: `Happy Birthday, Meri Jaan ❤️

Aaj ka din mere liye sirf tumhari birthday nahi hai, aaj ka din woh din hai jis din meri zindagi mein ek aisi person aayi jo mere liye bohat zyada special ban gayi. 🥹❤️

Sach bolun toh mujhe nahi pata main words mein kabhi properly bata paunga ya nahi ke tum mere liye kitni important ho. Tumhari narazgi bhi mujhe affect karti hai, tumhara mood off ho toh mera bhi dil nahi lagta, aur tumhari ek choti si smile mera pura mood theek kar deti hai. ❤️

Humare beech bohat si nok-jhok hoti hai, kabhi tum naraz hoti ho, kabhi main chup ho jata hoon 😂 lekin in sab cheezon ke bawajood ek cheez kabhi change nahi hui — tum mere liye special thi, ho aur hamesha rahogi. 🫶🏻

Main bas ye chahta hoon ke tum hamesha khush raho, tumhare face pe ye smile hamesha rahe aur tumhe zindagi mein woh sab mile jo tum deserve karti ho. Aur haan, agar kabhi meri wajah se tumhara dil dukha ho ya main tumhe samajhne mein fail hua hoon, toh uske liye genuinely sorry. 🥺❤️

Happy Birthday to the girl who became more than just a person in my life. ❤️

Allah tumhari har dua qabool kare, tumhari har mushkil asaan kare aur tumhari zindagi ko bohat saari khushiyon se bhar de. Ameen. 🤲🏻❤️

Aur haan... birthday tumhara hai, lekin gift mujhe mila tha jab tum meri life mein aayi thi. 🥹❤️`,
  /* TODO: replace with real photos + captions */
  moments: [
    { src: memory1, caption: "The flowers you loved", sticker: "💕" },
    { src: memory4, caption: "Dreaming together", sticker: "" },
    { src: memory2, caption: "Late night talks", sticker: "💝" },
  ],
  reasons: [
    { icon: "💕", title: "Your smile", text: "It rearranges my whole day. One look and everything heavy becomes light." },
    { icon: "💗", title: "Your kindness", text: "You love people gently, and somehow you love me even more gently than that." },
    { icon: "💝", title: "Ordinary days", text: "The way you turn plain afternoons into memories I keep replaying." },
    { icon: "💞", title: "Your heart", text: "Patient, brave and soft all at once — my favourite place in the world." },
  ],
  stats: [
    { value: 173, suffix: "+", label: "Days together" },
    { value: 100, suffix: "%", label: "Forever yours" },
    { value: 999, suffix: "+", label: "Reasons to smile" },
  ],
  finaleMessage: "You are, and always will be, my favourite chapter. Happy Birthday ❤️",
  year: 2026,
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "letter", label: "Letter" },
  { id: "moments", label: "Journey" },
  { id: "butterflies", label: "Butterflies" },
  { id: "why", label: "Why You" },
  { id: "celebrate", label: "Celebrate" },
  { id: "finale", label: "Finale" },
];
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${CONFIG.name} — A Magical Surprise` },
      {
        name: "description",
        content:
          "A dreamy handmade birthday surprise: a love letter, cherished moments, reasons why, a wish to blow out and a grand finale.",
      },
      { property: "og:title", content: `Happy Birthday, ${CONFIG.name} ❤️` },
      {
        property: "og:description",
        content: "A magical surprise, crafted with love, just for you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Sticker({ emoji, style }: { emoji: string; style?: CSSProperties }) {
  return (
    <span className="pointer-events-none absolute animate-bob select-none opacity-70" style={style} aria-hidden="true">
      {emoji}
    </span>
  );
}

function SectionTitle({ script, sub }: { script: string; sub?: string }) {
  return (
    <div className="mb-12 text-center reveal" data-reveal>
      <h2 className="font-playfair font-semibold tracking-wide glow-soft text-gradient-romance text-3xl leading-tight sm:text-5xl">
        {script}
      </h2>
      {sub ? (
        <p className="font-lora italic mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  );
}

function Marquee() {
  const phrases = [...CONFIG.marquee, ...CONFIG.marquee, ...CONFIG.marquee];
  return (
    <div className="relative overflow-hidden bg-romance py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {phrases.map((p, i) => (
          <span key={i} className="font-playfair font-medium tracking-wide text-xl text-primary-foreground sm:text-2xl">
            {p} <span className="px-3">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Finale() {
  const [revealed, setRevealed] = useState(false);

  const launch = () => {
    setRevealed(true);
    const end = Date.now() + 2500;
    const colors = ["#f7b6c2", "#e79aae", "#d8a7d8", "#f3d6b0", "#ffffff"];
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors });
    heartBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
    window.setTimeout(() => heartBurst(window.innerWidth / 2, window.innerHeight / 2 - 50, 35), 400);
    window.setTimeout(() => {
      heartBurst(window.innerWidth * 0.25, window.innerHeight / 2, 20);
      heartBurst(window.innerWidth * 0.75, window.innerHeight / 2, 20);
    }, 800);
  };

  return (
    <>
      <button
        onClick={launch}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-romance px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)]"
      >
        Launch grand finale! 🎉
      </button>
      <div
        className={`mx-auto mt-12 max-w-xl transition-all duration-1000 ${
          revealed ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="glass-card rounded-[2rem] px-8 py-10">
          <p className="font-playfair italic font-medium text-2xl leading-relaxed text-primary sm:text-3xl">
            {CONFIG.finaleMessage}
          </p>
        </div>
      </div>
    </>
  );
}

function Index() {
  useRomanticMusic();
  const [loaded, setLoaded] = useState(false);
  useReveal(loaded);

  useEffect(() => {
    const id = window.setTimeout(() => setLoaded(true), 3200);
    return () => window.clearTimeout(id);
  }, []);

  const paragraphs = CONFIG.letter.split("\n\n");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen done={loaded} />
      <MagicBackground count={24} seed={11} />
      {loaded ? (
        <>
          <Navbar items={NAV} />
          <MusicWidget />
        </>
      ) : null}

      <main className="relative z-10">
        {/* HOME */}
        <section
          id="home"
          className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-28 text-center"
        >
          <Sticker emoji="💕" style={{ left: "8%", top: "22%", fontSize: 34 }} />
          <Sticker emoji="💖" style={{ right: "10%", top: "26%", fontSize: 30, animationDelay: "1.1s" }} />
          <Sticker emoji="💗" style={{ left: "14%", bottom: "18%", fontSize: 28, animationDelay: "2s" }} />
          <Sticker emoji="💝" style={{ right: "16%", bottom: "22%", fontSize: 26, animationDelay: "0.6s" }} />

          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-muted-foreground">
            {CONFIG.tagline}
          </p>
          <h1 className="font-playfair text-4xl uppercase tracking-[0.2em] text-primary sm:text-6xl">
            Happy Birthday
          </h1>
          <p className="font-script glow-soft text-gradient-romance mt-2 text-6xl leading-[1.15] sm:text-8xl">
            {CONFIG.name}
          </p>
          <p className="font-lora mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {CONFIG.heroSub}
          </p>
          <button
            onClick={() =>
              document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-romance px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)]"
          >
            Open your surprise →
          </button>
        </section>

        <Marquee />

        {/* LETTER */}
        <section id="letter" className="mx-auto max-w-3xl px-6 py-24">
          <SectionTitle script="A Letter For You" sub="Kuch baatein jo sirf tumhare liye hain..." />
          <div className="glass-card relative rounded-[2rem] p-2" data-reveal>
            <Sticker emoji="💌" style={{ right: -14, top: -18, fontSize: 34 }} />
            <div className="rounded-[1.6rem] border border-dashed border-primary/40 bg-cream/90 px-6 py-10 sm:px-12 sm:py-14 shadow-inner">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-lora mb-6 whitespace-pre-line text-lg leading-[2.2] text-foreground/95 font-normal last:mb-0 sm:text-xl"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* MOMENTS */}
        <section id="moments" className="mx-auto max-w-6xl px-6 py-24">
          <SectionTitle
            script="Our Beautiful Journey"
            sub="Every picture holds a thousand sweet whispers of our beautiful journey together..."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CONFIG.moments.map((m, i) => (
              <figure
                key={`${m.caption}-${i}`}
                data-reveal
                className="reveal group relative text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {m.sticker ? (
                  <Sticker emoji={m.sticker} style={{ left: -10, top: -14, fontSize: 30, zIndex: 10 }} />
                ) : null}
                <div className="glass-card overflow-hidden rounded-[2.5rem] p-2 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-glow)]">
                  {/* TODO: replace with real photo */}
                  <img
                    src={m.src}
                    alt={m.caption}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="aspect-square w-full rounded-[2rem] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <figcaption className="mt-4 font-playfair italic font-medium text-xl text-primary">{m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* BUTTERFLIES */}
        <ButterfliesSection />

        {/* WHY YOU */}
        <section id="why" className="mx-auto max-w-6xl px-6 py-24">
          <SectionTitle script="Why You" sub="A few of the countless reasons, written down before I run out of paper." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONFIG.reasons.map((r, i) => (
              <article
                key={r.title}
                data-reveal
                className="reveal glass-card rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="text-3xl" aria-hidden="true">{r.icon}</span>
                <h3 className="mt-4 font-playfair font-semibold text-2xl text-primary">{r.title}</h3>
                <p className="font-lora mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-20" data-reveal>
            <h3 className="reveal text-center font-playfair font-semibold tracking-wide text-3xl sm:text-4xl text-primary">Love, Measured</h3>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {CONFIG.stats.map((s, i) => (
                <div
                  key={s.label}
                  data-reveal
                  className="reveal glass-card rounded-3xl px-6 py-10 text-center"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <p className="font-playfair text-5xl text-primary">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="font-lora mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CELEBRATE */}
        <section id="celebrate" className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <SectionTitle script="Close Your Eyes & Make A Wish" sub={`Whatever you wish for, ${CONFIG.name} — I'll spend my life helping it come true.`} />
          <div data-reveal className="reveal">
            <CakeScene />
          </div>
        </section>

        {/* FINALE */}
        <section id="finale" className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <SectionTitle
            script="A Little Magic From The Universe"
            sub="Wishing you a birthday as magical as you are"
          />
          <div data-reveal className="reveal">
            <Finale />
          </div>
        </section>

        <footer className="relative z-10 px-6 pb-16 text-center text-sm text-muted-foreground">
          <p className="font-playfair font-medium tracking-wide text-xl text-primary">Made with infinite love by Bilal for Amna ❤️</p>
          <p className="font-lora mt-2 text-sm text-muted-foreground">This moment was crafted entirely for you • {CONFIG.year}</p>
        </footer>
      </main>
    </div>
  );
}
