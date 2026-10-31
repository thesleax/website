"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <FiSun className="size-4" />
        ) : (
          <FiMoon className="size-4" />
        )
      ) : (
        <FiMoon className="size-4 opacity-0" />
      )}
    </Button>
  );
}
