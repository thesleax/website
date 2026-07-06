"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import FuzzyText from "@/components/ui/fuzzy-text";

// Centered, minimal error screen in the site theme. The big code is rendered
// with the fuzzy effect and reused for 404s and any other error.
export function ErrorView({
  code,
  title,
  description,
  action,
}: {
  code: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const color = mounted && resolvedTheme === "light" ? "#111111" : "#fafafa";

  return (
    <main className="flex min-h-[80vh] flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div aria-label={code} className="flex justify-center">
        {mounted ? (
          <FuzzyText
            fontSize="clamp(4rem, 20vw, 11rem)"
            fontWeight={900}
            color={color}
            baseIntensity={0.16}
            hoverIntensity={0.42}
          >
            {code}
          </FuzzyText>
        ) : (
          <span className="text-[clamp(4rem,20vw,11rem)] font-black leading-none">
            {code}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          {title}
        </p>
        {description ? (
          <p className="mx-auto max-w-sm text-sm text-[var(--muted-foreground)]">
            {description}
          </p>
        ) : null}
      </div>

      {action ?? (
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          <FiArrowLeft className="size-4" />
          Back to home
        </Link>
      )}
    </main>
  );
}
