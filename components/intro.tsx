import { Fragment } from "react";
import { emailHref, siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";

const EMAIL = siteConfig.email;

// Turn the email address inside a paragraph into a mailto link, keep the rest as text.
function renderParagraph(text: string) {
  if (!EMAIL) return text;
  const parts = text.split(EMAIL);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <a
          href={emailHref}
          className="font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:decoration-[var(--foreground)]"
        >
          {EMAIL}
        </a>
      ) : null}
    </Fragment>
  ));
}

export function Intro({ dict }: { dict: Dictionary }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
      {dict.intro.paragraphs.map((p, i) => (
        <p key={i}>{renderParagraph(p)}</p>
      ))}
    </div>
  );
}
