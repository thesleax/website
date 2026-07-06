/**
 * Central site configuration.
 *
 * Edit this file to make the site your own. Identity, links, integrations and
 * featured projects are all driven from here, so nothing needs to be changed
 * elsewhere in the codebase. Technologies live in `config/tech.ts` and localized
 * copy lives in `messages/{en,tr}.json`.
 */
export const siteConfig = {
  /** Display name / brand. */
  name: "Your Name",
  /** Production URL (used for metadata, canonical links and structured data). */
  url: "https://example.com",
  /** Contact email address. */
  email: "you@example.com",
  /** Avatar image shown in the header and the status hover card. */
  avatar: "/avatar.png",

  /** Job title used in metadata and structured data, per locale. */
  jobTitle: {
    en: "Your Role",
    tr: "Unvanın",
  },

  /** SEO keywords. */
  keywords: ["Your Name", "Portfolio", "Developer"],

  /** GitHub username (shown as the handle in the status hover card). */
  github: {
    username: "yourusername",
  },

  /**
   * Discord user id for live presence via lantern.rest.
   * Leave empty to disable the live Discord presence.
   */
  lantern: {
    userId: "",
  },

  /** Social links shown in the footer. Leave as "#" to disable a link. */
  social: {
    github: "#",
    email: "#",
    linkedin: "#",
    x: "#",
    discord: "#",
  },

  /**
   * Featured projects. Copy (name + description) lives in
   * `messages/{en,tr}.json` under `projects.items`, matched to this list by
   * index, so keep both in the same order and length.
   *
   * Example:
   *   { image: "/my-project.png", href: "https://my-project.com" },
   */
  projects: [] as { image: string; href: string }[],
} as const;
