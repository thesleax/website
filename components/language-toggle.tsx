"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiGlobe } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const next: Locale = locale === "tr" ? "en" : "tr";

  function swap() {
    // Strip any leading locale segment so the shared sub-path is preserved,
    // regardless of whether the router reports the clean or rewritten path.
    let rest = pathname.replace(/^\/(en|tr)(?=\/|$)/, "");
    if (rest === "/") rest = "";
    const target = next === "tr" ? `/tr${rest}` : rest || "/";
    router.push(target);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Change language"
      onClick={swap}
      className="gap-1.5 h-9 px-3"
    >
      <FiGlobe className="size-4" />
      <span className="font-mono text-xs uppercase tracking-wider">
        {next}
      </span>
    </Button>
  );
}
