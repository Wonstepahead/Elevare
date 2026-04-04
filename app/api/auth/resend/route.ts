import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const b = body as { email?: unknown; redirectTo?: unknown };
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const redirectTo = typeof b.redirectTo === "string" ? b.redirectTo : "/results";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  let url: string;
  let anonKey: string;
  try {
    ({ url, anonKey } = getSupabasePublicConfig());
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Supabase is not configured on the server." },
      { status: 503 }
    );
  }

  const origin = new URL(request.url).origin;
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

  const supabase = createClient(url, anonKey);
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
