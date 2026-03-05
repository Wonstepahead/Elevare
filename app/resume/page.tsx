"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Feedback = {
  overall_score: number;
  clarity_score: number;
  impact_score: number;
  ats_score: number;
  strengths: string[];
  improvements: string[];
  summary: string;
};

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login?redirect=/resume");
      else setUser(user);
    });
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || loading) return;
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resumeText.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setFeedback(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const ScoreBar = ({ score, label }: { score: number; label: string }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted">{label}</span>
        <span className="font-medium text-foreground">{score}/100</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-accent-primary transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          Resume Feedback & Scoring
        </h1>
        <p className="text-muted mb-8">
          Paste your resume and get AI-powered feedback with scores for clarity, impact, and ATS optimization.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Paste your resume (50–8000 characters)
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary resize-y"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || resumeText.trim().length < 50}
            className="w-full py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Get feedback"}
          </button>

          {error && (
            <div className="rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 text-sm">
              {error}
            </div>
          )}
        </form>

        {feedback && (
          <div className="mt-8 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your scores</h3>
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent-primary">
                    {feedback.overall_score}
                  </span>
                </div>
                <span className="ml-2 text-muted">/ 100</span>
              </div>
              <div className="space-y-4">
                <ScoreBar score={feedback.clarity_score} label="Clarity" />
                <ScoreBar score={feedback.impact_score} label="Impact" />
                <ScoreBar score={feedback.ats_score} label="ATS optimization" />
              </div>
            </div>

            {feedback.summary && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Summary</h3>
                <p className="text-muted text-sm">{feedback.summary}</p>
              </div>
            )}

            {feedback.strengths.length > 0 && (
              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="text-sm font-semibold text-foreground mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-sm text-foreground space-y-1">
                  {feedback.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.improvements.length > 0 && (
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="text-sm font-semibold text-foreground mb-2">Areas to improve</h3>
                <ul className="list-disc list-inside text-sm text-foreground space-y-1">
                  {feedback.improvements.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className="mt-8 text-sm text-muted text-center">
          <Link href="/coach" className="text-accent-primary hover:underline">AI Career Coach</Link>
          {" · "}
          <Link href="/career-quiz" className="text-accent-purple hover:underline">Career Quiz</Link>
        </p>
      </div>
    </div>
  );
}
