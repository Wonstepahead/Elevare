"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/results";
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const emailRedirectTo = typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`
      : undefined;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(true);
    router.refresh();
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Check your email</h1>
          <p className="text-muted mb-4">
            We&apos;ve sent a confirmation link to <strong className="text-foreground">{email}</strong>. Click the link to activate your account.
          </p>
          <p className="text-sm text-muted mb-6">
            Can&apos;t find it? Check your spam folder. The link expires in 24 hours.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition shadow-soft"
          >
            Go to Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">Create your Elevare account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm text-muted mb-2">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-muted mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-muted mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
              placeholder="At least 6 characters"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition disabled:opacity-50 shadow-soft"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-center text-muted text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-accent-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center text-muted">Loading...</div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
