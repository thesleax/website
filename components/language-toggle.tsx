"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiGlobe } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { localeHref, type Locale } from "@/lib/i18n";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const next: Locale = locale === "tr" ? "en" : "tr";

  function swap() {
    // Strip any leading locale segment so the shared sub-path is preserved,
    // regardless of whether the router reports the clean or rewritten path.
    const rest = pathname.replace(/^\/(en|tr)(?=\/|$)/, "").replace(/^\/$/, "");
    router.push(localeHref(next, rest));
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
