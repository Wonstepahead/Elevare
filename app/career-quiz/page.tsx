"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { careerQuestions } from "@/lib/quiz/career-questions";
import { careers } from "@/lib/data/careers";
import {
  createEmptyScores,
  addScores,
  matchCareers,
  type HollandScores,
} from "@/lib/quiz/scoring";
import type { CareerMatch } from "@/lib/types";

export default function CareerQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<HollandScores>(createEmptyScores());
  const [results, setResults] = useState<CareerMatch[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const question = careerQuestions[currentIndex];
  const totalQuestions = careerQuestions.length;

  const handleSelect = useCallback(
    (value: string) => {
      const option = question.options.find((o) => o.value === value);
      if (!option) return;

      setAnswers((prev) => ({ ...prev, [question.id]: value }));
      setScores((prev) => {
        const next = addScores(prev, option.codes);
        if (currentIndex === totalQuestions - 1) {
          setResults(matchCareers(next, careers, 8));
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
      router.push("/signup?redirect=/career-quiz");
      setSaving(false);
      return;
    }
    let finalScores = createEmptyScores();
    for (const q of careerQuestions) {
      const ans = answers[q.id];
      const opt = q.options.find((o) => o.value === ans);
      if (opt) finalScores = addScores(finalScores, opt.codes);
    }
    const { error } = await supabase.from("career_quiz_results").insert({
      user_id: user.id,
      holland_scores: finalScores,
      top_careers: results.map((r) => ({ id: r.career.id, name: r.career.name, description: r.career.description, match_percentage: r.match_percentage, job_options: r.career.job_options, future_proof_score: r.career.future_proof_score })),
    });
    setSaving(false);
    if (!error) setSaveSuccess(true);
  };

  if (results) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Your Career Matches</h1>
          <p className="text-muted mb-12">
            Based on your answers, these careers align with your interests and strengths.
          </p>

          <div className="space-y-6 mb-12">
            {results.map((match, i) => {
              const { career, match_percentage } = match;
              return (
                <div
                  key={career.id}
                  className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-foreground">{career.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-lg bg-accent-primary/15 text-accent-primary text-sm font-semibold">
                          {match_percentage}% match
                        </span>
                        {career.future_proof_score != null && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium" title="Future-proof score (1-10)">
                            Future-proof: {career.future_proof_score}/10
                          </span>
                        )}
                      </div>
                      <p className="text-muted mt-1">{career.description}</p>
                      {career.salary_min && career.salary_max && (
                        <p className="text-sm text-accent-primary font-medium mt-2">
                          Typical salary: ${(career.salary_min / 1000).toFixed(0)}K - ${(career.salary_max / 1000).toFixed(0)}K
                        </p>
                      )}
                      {career.job_options && career.job_options.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-foreground mb-1">Job options:</p>
                          <div className="flex flex-wrap gap-2">
                            {career.job_options.map((job) => (
                              <span
                                key={job}
                                className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium"
                              >
                                {job}
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
              className="px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition disabled:opacity-50 shadow-soft"
            >
              {saveSuccess ? "Saved!" : saving ? "Saving..." : "Save Results"}
            </button>
            <Link
              href="/results"
              className="px-6 py-3 rounded-xl border-2 border-accent-purple text-accent-purple font-medium hover:bg-accent-purple/5 transition"
            >
              View My Results
            </Link>
            <Link
              href="/career-quiz"
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
        <h1 className="text-3xl font-bold mb-2 text-foreground">Career Discovery Quiz</h1>
        <p className="text-muted mb-12">
          Answer honestly to discover careers that match your interests. There are no wrong answers.
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
