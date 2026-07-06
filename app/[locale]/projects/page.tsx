import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsPage } from "@/components/projects-page";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { localeUrl } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.projects.title,
    description: dict.projects.subtitle,
    alternates: { canonical: `${localeUrl(locale)}/projects` },
  };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProjectsPage locale={locale} />;
}
