import { FiExternalLink } from "react-icons/fi";
import type { Project } from "@/types/project";

// Shared project card used on the home page and the projects page.
// Fixed-height image and clamped description keep every card the same size.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-2.5 transition-colors hover:border-[var(--muted-foreground)]/40"
    >
      <div className="overflow-hidden rounded-lg border border-[var(--border)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="aspect-[2/1] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="px-1.5 pb-1 pt-3">
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold tracking-tight">{project.name}</h3>
          <FiExternalLink className="size-3.5 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {project.description}
        </p>
      </div>
    </a>
  );
}
