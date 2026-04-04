import { getSupabasePublicConfig } from "@/lib/supabase/env";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route-handler";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const b = body as {
    email?: unknown;
    password?: unknown;
    fullName?: unknown;
    redirectTo?: unknown;
  };

  const email = typeof b.email === "string" ? b.email.trim() : "";
  const password = typeof b.password === "string" ? b.password : "";
  const fullName = typeof b.fullName === "string" ? b.fullName.trim() : "";
  const redirectTo = typeof b.redirectTo === "string" ? b.redirectTo : "/results";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    getSupabasePublicConfig();
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Supabase is not configured on the server." },
      { status: 503 }
    );
  }

  const origin = new URL(request.url).origin;
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

  const response = NextResponse.json({ ok: true });
  const supabase = createRouteHandlerSupabaseClient(request, response);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: fullName ? { full_name: fullName } : undefined,
      emailRedirectTo,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (data?.user && !data?.session && (data.user.identities?.length ?? 0) === 0) {
    return NextResponse.json(
      { error: "An account with this email already exists. Try logging in instead." },
      { status: 409 }
    );
  }

  return response;
}
