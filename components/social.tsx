import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiDiscord, SiX } from "react-icons/si";
import { SectionLabel } from "@/components/section-label";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";

const SOCIALS = [
  { label: "github", href: siteConfig.social.github, Icon: FiGithub },
  { label: "linkedin", href: siteConfig.social.linkedin, Icon: FiLinkedin },
  { label: "x", href: siteConfig.social.x, Icon: SiX },
  { label: "discord", href: siteConfig.social.discord, Icon: SiDiscord },
  { label: "email", href: siteConfig.social.email, Icon: FiMail },
] as const;

export function Social({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <SectionLabel>{dict.social.title}</SectionLabel>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            <Icon className="size-4" />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
