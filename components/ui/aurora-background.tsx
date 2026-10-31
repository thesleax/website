"use client";

import { useTheme } from "next-themes";
import Aurora from "@/components/ui/aurora";
import { useMediaQuery, useMounted } from "@/hooks/use-mounted";

// White / grayscale aurora so it fits the site's neutral palette.
// Dark: bright whites glow over the dark background.
// Light: light grays stay visible over the near-white background.
const DARK_STOPS = ["#9a9a9a", "#6a6a6a", "#9a9a9a"];
const LIGHT_STOPS = ["#dadada", "#c2c2c2", "#dadada"];

export function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // WebGL + theme dependent, so render only on the client after mount.
  if (!mounted) return null;

  const dark = resolvedTheme === "dark";

  return (
    <Aurora
      colorStops={dark ? DARK_STOPS : LIGHT_STOPS}
      amplitude={1.0}
      blend={0.6}
      speed={reducedMotion ? 0 : 0.6}
    />
  );
}
