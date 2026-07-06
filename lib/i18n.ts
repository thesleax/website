import tr from "@/messages/tr.json";
import en from "@/messages/en.json";

export type Locale = "tr" | "en";
export const locales: Locale[] = ["en", "tr"];
export const defaultLocale: Locale = "en";

const dictionaries = { tr, en } as const;

/** Copy for a single featured project, matched to `config/site.ts` by index. */
export type ProjectCopy = { name: string; description: string };

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
export function localePrefix(locale: Locale): string {
  return locale === "tr" ? "/tr" : "";
}

export function localeHref(locale: Locale, hash = ""): string {
  const base = localePrefix(locale) || "/";
  return `${base}${hash}`;
}
