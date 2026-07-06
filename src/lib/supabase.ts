import { createClient } from "@supabase/supabase-js";
import WebSocketImpl from "ws";

if (typeof globalThis.WebSocket === "undefined") {
  // Node 18 has no native WebSocket, which @supabase/realtime-js expects to find
  // even though this app never uses realtime subscriptions.
  globalThis.WebSocket = WebSocketImpl as unknown as typeof WebSocket;
}

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("Supabase no está configurado (faltan SUPABASE_URL o SUPABASE_SECRET_KEY).");
  }

  return createClient(url, key, {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
