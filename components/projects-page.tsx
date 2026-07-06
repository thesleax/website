import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/footer";
import { HtmlLang } from "@/components/html-lang";
import { siteConfig } from "@/config/site";
import { getDictionary, localeHref, type Locale } from "@/lib/i18n";

export function ProjectsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const projects = siteConfig.projects.map((p, i) => ({
    ...p,
    ...dict.projects.items[i],
  }));

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12 sm:py-16">
      <HtmlLang locale={locale} />
      <div className="mb-8 flex items-center justify-between gap-3">
        <Link
          href={localeHref(locale)}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          <FiArrowLeft className="size-4" />
          {dict.common.back}
        </Link>
        <div className="flex items-center gap-1">
          <LanguageToggle locale={locale} />
          <ThemeToggle />
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.projects.title}
        </h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          {dict.projects.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className="mt-14">
        <Footer dict={dict} />
      </div>
    </main>
  );
}
