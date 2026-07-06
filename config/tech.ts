import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechItem = { name: string; icon: IconType; href: string };

/** Technologies shown in the scrolling marquee on the home page. */
export const techStack: TechItem[] = [
  { name: "React", icon: SiReact, href: "https://react.dev" },
  { name: "Next.js", icon: SiNextdotjs, href: "https://nextjs.org" },
  { name: "TypeScript", icon: SiTypescript, href: "https://www.typescriptlang.org" },
  { name: "JavaScript", icon: SiJavascript, href: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { name: "Tailwind CSS", icon: SiTailwindcss, href: "https://tailwindcss.com" },
  { name: "Node.js", icon: SiNodedotjs, href: "https://nodejs.org" },
  { name: "Express", icon: SiExpress, href: "https://expressjs.com" },
  { name: "PostgreSQL", icon: SiPostgresql, href: "https://www.postgresql.org" },
  { name: "Git", icon: SiGit, href: "https://git-scm.com" },
  { name: "Vercel", icon: SiVercel, href: "https://vercel.com" },
];
