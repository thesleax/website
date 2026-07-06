# Portfolio Template

A fast, bilingual personal portfolio built with Next.js 16. Everything that makes
it "yours" lives in a single config file, so it doubles as a reusable template.

## Features

- **Bilingual (EN / TR)** from a single `[locale]` route, with instant,
  refresh-free language switching (English at `/`, Turkish at `/tr`)
- **Light / dark / system** theme
- **Live Discord presence** via the [lantern.rest](https://lantern.rest) WebSocket
- Animated aurora backdrop, scrolling tech marquee, and a fuzzy 404 / error page
- Fully driven by `config/site.ts` — no identity or links hardcoded elsewhere

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19** and **TypeScript**
- **Tailwind CSS v4** with CSS-variable theming
- **next-themes** (theme), **lenis** (smooth scroll), **motion** (animation)
- **react-icons** for icons, **ogl** for the WebGL aurora

## Configuration

Make the site your own by editing:

- **`config/site.ts`** — name, URL, email, avatar, job title, keywords, social
  links, and the integration ids (`github.username`, `lantern.userId`).
- **`config/tech.ts`** — the technologies shown in the scrolling marquee.
- **`messages/en.json` / `messages/tr.json`** — all localized copy (intro, section
  titles, project names and descriptions).
- **`public/`** — project screenshots referenced from `config/site.ts` and the
  `avatar.png` used for social sharing.

## Development

```bash
npm install
npm run dev     # http://localhost:3008
npm run build
npm run start
npm run lint
```

## Project structure

```
app/[locale]/   Home and projects routes for both languages
app/            Root layout, 404 and error pages
components/     UI and section components (kebab-case)
config/         Site + tech configuration
hooks/          Custom React hooks (use-lantern, use-is-in-view)
lib/            i18n, SEO and lantern.rest helpers
types/          Shared domain types
messages/       EN / TR copy
public/         Static assets
proxy.ts        Maps / and /tr onto the internal /en and /tr segments
```

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it at [vercel.com](https://vercel.com) — Next.js is auto-detected and no
   environment variables are required.
