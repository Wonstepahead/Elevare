/**
 * Normalizes Supabase URL (trim, no trailing slash) so fetch targets a valid origin.
 */
export function readSupabasePublicEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "") ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!url || !anonKey) return null;
  try {
    new URL(url);
  } catch {
    return null;
  }
  return { url, anonKey };
}

export function getSupabasePublicConfig(): { url: string; anonKey: string } {
  const v = readSupabasePublicEnv();
  if (!v) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (e.g. in .env.local or your host’s env settings)."
    );
  }
  return v;
}

export function isSupabaseConfigured(): boolean {
  return readSupabasePublicEnv() !== null;
}
