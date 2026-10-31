import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n";

/** Language and theme switches, top right on every page. */
export function SiteControls({ locale }: { locale: Locale }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <LanguageToggle locale={locale} />
      <ThemeToggle />
    </div>
  );
}
