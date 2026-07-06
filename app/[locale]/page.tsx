import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";
import { siteMetadata, personJsonLd } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n";

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale) : {};
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <HomePage locale={locale} />
    </>
  );
}
