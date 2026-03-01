"use client";

import Link from "next/link";

export default function ResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Something went wrong</h1>
        <p className="text-muted mb-6">
          {error.message.includes("relation") || error.message.includes("does not exist")
            ? "The database may not be set up yet. Run the Supabase migrations and seed from the README."
            : "We couldn't load your results. Please try again."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-border text-muted font-medium hover:bg-border transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
