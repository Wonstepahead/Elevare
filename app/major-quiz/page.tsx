"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { majorQuestions } from "@/lib/quiz/major-questions";
import { majors } from "@/lib/data/majors";
import {
  createEmptyScores,
  addScores,
  matchMajors,
  type HollandScores,
} from "@/lib/quiz/scoring";
import type { MajorMatch } from "@/lib/types";

export default function MajorQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<HollandScores>(createEmptyScores());
  const [results, setResults] = useState<MajorMatch[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const question = majorQuestions[currentIndex];
  const totalQuestions = majorQuestions.length;

  const handleSelect = useCallback(
    (value: string) => {
      const option = question.options.find((o) => o.value === value);
      if (!option) return;

      setAnswers((prev) => ({ ...prev, [question.id]: value }));
      setScores((prev) => {
        const next = addScores(prev, option.codes);
        if (currentIndex === totalQuestions - 1) {
          setResults(matchMajors(next, majors, 8));
        }
        return next;
      });

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((i) => i + 1);
      }
    },
    [question, currentIndex, totalQuestions]
  );

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleSaveResults = async () => {
    if (!results) return;
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/signup?redirect=/major-quiz");
      setSaving(false);
      return;
    }
    let finalScores = createEmptyScores();
    for (const q of majorQuestions) {
      const ans = answers[q.id];
      const opt = q.options.find((o) => o.value === ans);
      if (opt) finalScores = addScores(finalScores, opt.codes);
    }
    const { error } = await supabase.from("major_quiz_results").insert({
      user_id: user.id,
      holland_scores: finalScores,
      top_majors: results.map((r) => ({ id: r.major.id, name: r.major.name, description: r.major.description, match_percentage: r.match_percentage, top_schools: r.major.top_schools, future_proof_score: r.major.future_proof_score })),
    });
    setSaving(false);
    if (!error) setSaveSuccess(true);
  };

  if (results) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Your Major Matches</h1>
          <p className="text-muted mb-12">
            Based on your answers, these college majors align with your interests and strengths.
          </p>

          <div className="space-y-6 mb-12">
            {results.map((match, i) => {
              const { major, match_percentage } = match;
              return (
                <div
                  key={major.id}
                  className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-foreground">{major.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-lg bg-accent-purple/15 text-accent-purple text-sm font-semibold">
                          {match_percentage}% match
                        </span>
                        {major.future_proof_score != null && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium" title="Future-proof score (1-10)">
                            Future-proof: {major.future_proof_score}/10
                          </span>
                        )}
                      </div>
                      <p className="text-muted mt-1">{major.description}</p>
                      {major.related_careers && major.related_careers.length > 0 && (
                        <p className="text-sm text-accent-purple font-medium mt-2">
                          Related careers: {major.related_careers.slice(0, 3).join(", ")}
                        </p>
                      )}
                      {major.top_schools && major.top_schools.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-foreground mb-1">Top schools for this major:</p>
                          <div className="flex flex-wrap gap-2">
                            {major.top_schools.map((school) => (
                              <span
                                key={school}
                                className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium"
                              >
                                {school}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSaveResults}
              disabled={saving || saveSuccess}
              className="px-6 py-3 rounded-xl bg-accent-purple text-white font-medium hover:bg-accent-secondary transition disabled:opacity-50 shadow-soft"
            >
              {saveSuccess ? "Saved!" : saving ? "Saving..." : "Save Results"}
            </button>
            <Link
              href="/results"
              className="px-6 py-3 rounded-xl border-2 border-accent-primary text-accent-primary font-medium hover:bg-accent-primary/5 transition"
            >
              View My Results
            </Link>
            <Link
              href="/major-quiz"
              className="px-6 py-3 rounded-xl border border-border text-muted font-medium hover:bg-border transition"
            >
              Retake Quiz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground">College Major Finder</h1>
        <p className="text-muted mb-12">
          Perfect for high school students! Discover which college majors match your interests and learning style.
        </p>

        <div className="mb-8">
          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        </div>

        <div className="mb-8">
          <QuestionCard
            question={question}
            selectedValue={answers[question.id] ?? null}
            onSelect={handleSelect}
          />
        </div>

        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="text-muted hover:text-foreground transition"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
