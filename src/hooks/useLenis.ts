"use client";

import { useLenis as useLenisHook } from "lenis/react";

export function useLenisScroll(callback?: (scroll: { progress: number; velocity: number }) => void) {
  useLenisHook((lenis) => {
    if (callback) {
      callback({ progress: lenis.progress, velocity: lenis.velocity });
    }
  });
}
