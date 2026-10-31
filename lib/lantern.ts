export type LanternStatus = "online" | "idle" | "dnd" | "offline";

type LanternSpotify = {
  track_id: string;
  song: string;
  artist: string | string[];
  album: string;
  album_cover: string;
  start_time: { unix: number; raw: string };
  end_time: { unix: number; raw: string };
  time: { current_human_readable: string; end_human_readable: string };
};

export type LanternUser = {
  metadata: {
    id: string;
    username: string;
    discriminator: string;
    global_name: string;
    display_avatar_url: string;
  };
  active_platforms: {
    desktop: LanternStatus;
    mobile: LanternStatus;
    web: LanternStatus;
    spotify: LanternSpotify | null;
  };
  status: LanternStatus;
};

export async function fetchLanternUser(
  userId: string,
  signal?: AbortSignal,
): Promise<LanternUser | null> {
  try {
    const res = await fetch(
      `https://lantern.rest/api/v1/users/${userId}`,
      { signal, cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as LanternUser;
  } catch {
    return null;
  }
}

export const STATUS_COLORS: Record<LanternStatus, string> = {
  online: "var(--success)",
  idle: "#f0b232",
  dnd: "#ed4245",
  offline: "#747f8d",
};
