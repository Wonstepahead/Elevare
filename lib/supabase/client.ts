import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig, readSupabasePublicEnv } from "@/lib/supabase/env";

export function createClient() {
  const { url, anonKey } = getSupabasePublicConfig();
  return createBrowserClient(url, anonKey);
}

/** Use in UI that must render without Supabase env (e.g. navbar). */
export function createClientOrNull() {
  const env = readSupabasePublicEnv();
  if (!env) return null;
  return createBrowserClient(env.url, env.anonKey);
}
