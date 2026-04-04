import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Supabase client for App Router Route Handlers. Session cookies must be set on the
 * same {@link NextResponse} you return — `cookies()` from `next/headers` often does not
 * attach Set-Cookie to the route response, which breaks login/signup.
 */
export function createRouteHandlerSupabaseClient(request: NextRequest, response: NextResponse) {
  const { url, anonKey } = getSupabasePublicConfig();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });
}
