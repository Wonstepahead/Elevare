"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { majors } from "@/lib/data/majors";
import { getCareersForMajor } from "@/lib/utils/mapping";

export default function WhatIfPage() {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login?redirect=/what-if");
      else setUser(user);
    });
  }, [supabase, router]);

  const major = majors.find((m) => m.name === selectedMajor);
  const relatedCareers = major ? getCareersForMajor(major) : [];

  const handleGetInsight = async () => {
    if (!selectedMajor) return;
    setLoading(true);
    setError(null);
    setInsight(null);
    try {
      const res = await fetch("/api/what-if", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ majorName: selectedMajor }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setInsight(data.insight);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          &quot;What If?&quot; Major Simulator
        </h1>
        <p className="text-muted mb-8">
          Pick a major and explore career paths, salary outlook, and top schools. Get AI-powered insights.
        </p>

        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">
            What if I choose this major?
          </label>
          <select
            value={selectedMajor}
            onChange={(e) => {
              setSelectedMajor(e.target.value);
              setInsight(null);
              setError(null);
            }}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground"
          >
            <option value="">Select a major...</option>
            {majors.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {major && (
          <div className="space-y-6 mb-8">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">{major.name}</h3>
              <p className="text-muted text-sm mb-4">{major.description}</p>
              {major.future_proof_score != null && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Future-proof: {major.future_proof_score}/10
                </p>
              )}
            </div>

            {relatedCareers.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Related careers</h3>
                <div className="space-y-2">
                  {relatedCareers.map((c) => (
                    <div key={c.id} className="flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{c.name}</span>
                      {c.salary_min && c.salary_max && (
                        <span className="text-muted">
                          ${(c.salary_min / 1000).toFixed(0)}K–${(c.salary_max / 1000).toFixed(0)}K
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {major.top_schools && major.top_schools.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Top schools</h3>
                <p className="text-muted text-sm">{major.top_schools.join(", ")}</p>
              </div>
            )}

            <button
              onClick={handleGetInsight}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition disabled:opacity-50"
            >
              {loading ? "Generating insights..." : "Get AI insights"}
            </button>

            {error && (
              <div className="rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 text-sm">
                {error}
              </div>
            )}

            {insight && (
              <div className="p-6 rounded-2xl bg-accent-primary/5 border border-accent-primary/20">
                <h3 className="text-sm font-semibold text-foreground mb-2">AI insights</h3>
                <p className="text-foreground whitespace-pre-wrap text-sm">{insight}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4">
          <Link href="/major-quiz" className="text-accent-primary font-medium hover:underline">
            Take Major Quiz
          </Link>
          <Link href="/mapping" className="text-accent-purple font-medium hover:underline">
            Major-to-Career Map
          </Link>
        </div>
      </div>
    </div>
  );
}
