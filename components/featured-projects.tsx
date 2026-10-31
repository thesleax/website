import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Slides } from "@/components/animate-ui/slide";
import { SectionLabel } from "@/components/section-label";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { localeHref, localizedProjects, type Dictionary, type Locale } from "@/lib/i18n";

export function FeaturedProjects({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const projects = localizedProjects(dict);

  return (
    <section id="projects" className="scroll-mt-8">
      <div className="flex items-center justify-between gap-3">
        <SectionLabel>{dict.projects.title}</SectionLabel>
        <Link
          href={localeHref(locale, "/projects")}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
          )}
        >
          {dict.projects.all}
          <FiArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <Slides
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
        direction="up"
        holdDelay={70}
        inView
        inViewOnce
        inViewMargin="-40px"
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </Slides>
    </section>
  );
}
