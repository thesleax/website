import tr from "@/messages/tr.json";
import en from "@/messages/en.json";
import { siteConfig } from "@/config/site";
import type { Project } from "@/types/project";

export type Locale = "tr" | "en";
export const locales: Locale[] = ["en", "tr"];
const defaultLocale: Locale = "en";

const dictionaries = { tr, en } as const;

/** Copy for a single featured project, matched to `config/site.ts` by index. */
type ProjectCopy = { name: string; description: string };

// `items` is typed explicitly so the template compiles with an empty projects
// list (an empty JSON array would otherwise infer as `never[]`).
export type Dictionary = Omit<typeof tr, "projects"> & {
  projects: Omit<(typeof tr)["projects"], "items"> & { items: ProjectCopy[] };
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

// English lives at the root (/), Turkish at /tr.
/** `path` ("" or "/projects") under the locale: "/tr/projects", "/projects"; "" for the English home. */
export function localePath(locale: Locale, path = ""): string {
  return `${locale === "tr" ? "/tr" : ""}${path}`;
}

/** A link to `path` in `locale`; the English home is "/". */
export function localeHref(locale: Locale, path = ""): string {
  return localePath(locale, path) || "/";
}

/** The featured projects from `config/site.ts` with their name and description in this language. */
export function localizedProjects(dict: Dictionary): Project[] {
  return siteConfig.projects.map((p, i) => ({ ...p, ...dict.projects.items[i] }));
}
