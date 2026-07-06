"use client";

import LogoLoop from "@/components/ui/logo-loop";
import { SectionLabel } from "@/components/section-label";
import { techStack } from "@/config/tech";
import type { Dictionary } from "@/lib/i18n";

const LOGOS = techStack.map(({ name, icon: Icon, href }) => ({
  node: <Icon />,
  title: name,
  href,
}));

export function Technologies({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <SectionLabel>{dict.tech.title}</SectionLabel>
      <div className="relative mt-5 h-9 overflow-hidden text-[var(--muted-foreground)] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
        <LogoLoop
          logos={LOGOS}
          speed={38}
          direction="left"
          logoHeight={24}
          gap={44}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel={dict.tech.title}
        />
      </div>
    </section>
  );
}
