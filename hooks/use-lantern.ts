"use client";

import { useEffect, useState } from "react";
import { fetchLanternUser, type LanternUser } from "@/lib/lantern";

const SOCKET_URL = "wss://lantern.rest/socket";

// Lantern WebSocket opcodes (see https://lantern.rest docs).
const OP_HELLO = 1;
const OP_INIT = 2;
const OP_INIT_ACK = 3;
const OP_HEARTBEAT = 4;
const OP_PRESENCE_UPDATE = 6;
const OP_USER_JOINED = 8;

export type LanternState = { user: LanternUser | null; ready: boolean };

/**
 * Live Discord presence via the lantern.rest WebSocket.
 * Subscribes to a single user and updates in real time (no polling / refresh),
 * with heartbeats and automatic reconnect.
 */
export function useLanternUser(userId: string): LanternState {
  const [user, setUser] = useState<LanternUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!userId) return; // no id configured: nothing to subscribe to
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let reconnect: ReturnType<typeof setTimeout> | null = null;
    let readyFallback: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    const applyData = (d: unknown) => {
      const data = Array.isArray(d) ? d[0] : d;
      if (data && typeof data === "object" && "status" in (data as object)) {
        setUser(data as LanternUser);
      }
      setReady(true);
    };

    const clearHeartbeat = () => {
      if (heartbeat) clearInterval(heartbeat);
      heartbeat = null;
    };

    const connect = () => {
      try {
        ws = new WebSocket(SOCKET_URL);
      } catch {
        setReady(true);
        return;
      }

      ws.onmessage = (event) => {
        let msg: { op?: number; d?: unknown };
        try {
          msg = JSON.parse(event.data as string);
        } catch {
          return;
        }

        switch (msg.op) {
          case OP_HELLO: {
            const interval =
              (msg.d as { heartbeat_interval?: number } | undefined)
                ?.heartbeat_interval ?? 30000;
            ws?.send(JSON.stringify({ op: OP_INIT, d: { user_id: userId } }));
            clearHeartbeat();
            heartbeat = setInterval(() => {
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: OP_HEARTBEAT }));
              }
            }, interval);
            break;
          }
          case OP_INIT_ACK:
          case OP_PRESENCE_UPDATE:
          case OP_USER_JOINED:
            applyData(msg.d);
            break;
          default:
            break;
        }
      };

      ws.onclose = () => {
        clearHeartbeat();
        setReady(true);
        if (!disposed) {
          reconnect = setTimeout(connect, 3000);
        }
      };

      ws.onerror = () => {
        try {
          ws?.close();
        } catch {
          /* noop */
        }
      };
    };

    // Fast initial value over REST so the status shows almost immediately,
    // while the WebSocket takes over for live updates.
    fetchLanternUser(userId).then((u) => {
      if (!disposed && u) {
        setUser(u);
        setReady(true);
      }
    });

    connect();
    // Stop showing a loading state even if the socket never connects.
    readyFallback = setTimeout(() => setReady(true), 4000);

    return () => {
      disposed = true;
      clearHeartbeat();
      if (reconnect) clearTimeout(reconnect);
      if (readyFallback) clearTimeout(readyFallback);
      try {
        ws?.close();
      } catch {
        /* noop */
      }
    };
  }, [userId]);

  return userId ? { user, ready } : { user: null, ready: true };
}
