"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// false while rendering on the server and during hydration, true afterwards.
// Use it for anything that depends on the browser (theme, WebGL, media queries).
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// Live result of a CSS media query; false on the server.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
