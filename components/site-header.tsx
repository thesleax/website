"use client";

import { SiSpotify } from "react-icons/si";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  STATUS_COLORS,
  STATUS_LABEL,
  type LanternStatus,
} from "@/lib/lantern";
import { useLanternUser } from "@/hooks/use-lantern";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { siteConfig } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";

export function SiteHeader({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { user } = useLanternUser(siteConfig.lantern.userId);

  const status: LanternStatus = user?.status ?? "offline";
  const color = STATUS_COLORS[status];
  const label = STATUS_LABEL[status][locale];
  const discordAvatar = user?.metadata.display_avatar_url ?? siteConfig.avatar;
  const spotify = user?.active_platforms.spotify ?? null;

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.avatar}
          alt={siteConfig.name}
          width={64}
          height={64}
          className="size-14 shrink-0 rounded-2xl border border-[var(--border)] object-cover shadow-sm"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {siteConfig.name}
            </h1>

          {/* Status pill next to the name shows the status label and opens the card. */}
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                aria-label={`Discord status: ${label}`}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] focus:outline-none"
              >
                <span
                  className="relative inline-flex size-2 rounded-full"
                  style={{ backgroundColor: color }}
                >
                  {status === "online" && (
                    <span
                      className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </span>
                {label}
              </button>
            </HoverCardTrigger>

            <HoverCardContent align="start" className="w-80 overflow-hidden p-0">
              <div className="flex items-center gap-3 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={discordAvatar}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 rounded-full border border-[var(--border)] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-semibold">
                      {user?.metadata.global_name ?? siteConfig.name}
                    </span>
                    <span
                      className="inline-block size-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <p className="truncate font-mono text-xs text-[var(--muted-foreground)]">
                    @{user?.metadata.username ?? siteConfig.github.username}
                  </p>
                </div>
              </div>

              {spotify ? (
                <a
                  href={`https://open.spotify.com/track/${spotify.track_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 border-t border-[var(--border)] bg-[var(--muted)]/40 p-4 transition-colors hover:bg-[var(--muted)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={spotify.album_cover}
                    alt={spotify.album}
                    width={48}
                    height={48}
                    className="size-12 rounded-xl border border-[var(--border)] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <SiSpotify className="size-3 shrink-0 text-[#1db954]" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        {locale === "tr" ? "Şu an dinliyor" : "Listening to"}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm font-medium">
                      {spotify.song}
                    </p>
                    <p className="truncate text-xs text-[var(--muted-foreground)]">
                      {Array.isArray(spotify.artist)
                        ? spotify.artist.join(", ")
                        : spotify.artist}
                    </p>
                  </div>
                </a>
              ) : null}

              <div className="border-t border-[var(--border)] px-4 py-2.5">
                <a
                  href="https://lantern.rest"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                >
                  Discord status powered by lantern.rest
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

          <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
            {dict.header.role}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <LanguageToggle locale={locale} />
        <ThemeToggle />
      </div>
    </header>
  );
}
