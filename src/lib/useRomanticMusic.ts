import { useCallback, useEffect, useState } from "react";
import songUrl from "@/assets/song.mp3";

/**
 * Plays the background song imported from assets so Vite resolves and bundles it properly.
 * Attempts to play immediately when web opens; starts on the first touch/click/scroll anywhere.
 */

let sharedAudio: HTMLAudioElement | null = null;
const listeners = new Set<(playing: boolean) => void>();

export function getRomanticAudio(): HTMLAudioElement {
  if (typeof window === "undefined") {
    return {} as HTMLAudioElement;
  }
  if (!sharedAudio) {
    sharedAudio = new Audio(songUrl);
    sharedAudio.loop = true;
    sharedAudio.volume = 0.6;
    sharedAudio.preload = "auto";

    sharedAudio.addEventListener("play", () => {
      listeners.forEach((cb) => cb(true));
    });
    sharedAudio.addEventListener("pause", () => {
      listeners.forEach((cb) => cb(false));
    });
  }
  return sharedAudio;
}

export function playRomanticMusic(): Promise<void> {
  const audio = getRomanticAudio();
  if (!audio || typeof audio.play !== "function") return Promise.resolve();
  return audio.play().catch(() => {
    // Autoplay blocked by browser policy until user interacts
  });
}

export function pauseRomanticMusic(): void {
  const audio = getRomanticAudio();
  if (audio && typeof audio.pause === "function") {
    audio.pause();
  }
}

export function toggleRomanticMusic(): void {
  const audio = getRomanticAudio();
  if (audio) {
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  }
}

export function useRomanticMusic() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = getRomanticAudio();
    if (audio && !audio.paused) {
      setPlaying(true);
    }

    const handler = (isPlaying: boolean) => setPlaying(isPlaying);
    listeners.add(handler);

    // Try playing immediately on mount
    void playRomanticMusic();

    // Fallback: start on first user interaction anywhere
    const onUserInteraction = () => {
      void playRomanticMusic();
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
    };

    window.addEventListener("pointerdown", onUserInteraction, { passive: true });
    window.addEventListener("click", onUserInteraction, { passive: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true });
    window.addEventListener("keydown", onUserInteraction, { passive: true });
    window.addEventListener("scroll", onUserInteraction, { passive: true });

    return () => {
      listeners.delete(handler);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
    };
  }, []);

  const toggle = useCallback(() => {
    toggleRomanticMusic();
  }, []);

  return { playing, toggle };
}
