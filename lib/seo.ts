import type { Metadata } from "next";
import { getDictionary, localeHref, localePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { techStack } from "@/config/tech";

const OG_IMAGE = { url: "/avatar.png", width: 420, height: 420 };
const siteHost = new URL(siteConfig.url).host;

/** Absolute URL of `path` in a locale (English at root, Turkish under /tr). */
export function localeUrl(locale: Locale, path = ""): string {
  return `${siteConfig.url}${localePath(locale, path)}`;
}

/** Metadata for a locale's home page (shared by both languages to avoid duplication). */
export function siteMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const url = localeUrl(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(siteConfig.url),
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    robots: { index: true, follow: true },
    alternates: { canonical: url, languages: { en: localeHref("en"), tr: localeHref("tr") } },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url,
      siteName: siteHost,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ ...OG_IMAGE, alt: `${siteConfig.name}, ${siteConfig.jobTitle[locale]}` }],
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [OG_IMAGE.url],
    },
  };
}

/** JSON-LD Person schema for a locale's home page. */
export function personJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: localeUrl(locale),
    image: `${siteConfig.url}/avatar.png`,
    jobTitle: siteConfig.jobTitle[locale],
    description: dict.meta.description,
    sameAs: [siteConfig.social.github],
    knowsAbout: techStack.map((t) => t.name),
  };
}
