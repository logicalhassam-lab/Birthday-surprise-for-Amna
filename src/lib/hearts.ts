const PINK_STICKERS = ["💕", "💗", "🌸", "🌺"];

/** Bursts a cloud of romantic stickers from a screen coordinate (exactly 50% red hearts, 50% pink stickers). */
export function heartBurst(x: number, y: number, amount = 30) {
  if (typeof document === "undefined") return;

  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    // Guaranteed 50% Red hearts and 50% Pink stickers (💕, 💗, 🌸, 🌺)
    const isRed = i % 2 === 0;
    el.textContent = isRed
      ? "❤️"
      : (PINK_STICKERS[Math.floor(Math.random() * PINK_STICKERS.length)] ?? "💕");

    const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.6;
    const dist = 80 + Math.random() * 200;
    el.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;z-index:60;pointer-events:none;
      font-size:${16 + Math.random() * 24}px;will-change:transform,opacity;
      --dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist - 60}px;
      animation: burst ${800 + Math.random() * 800}ms cubic-bezier(.2,.7,.2,1) forwards;
    `;
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), 2000);
  }
}

export function burstFromEvent(e: { clientX: number; clientY: number }, amount = 30) {
  heartBurst(e.clientX, e.clientY, amount);
}

