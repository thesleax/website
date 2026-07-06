import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-4 border-t border-[var(--border)]/60 pt-6 text-xs text-[var(--muted-foreground)]">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
      </p>
    </footer>
  );
}
