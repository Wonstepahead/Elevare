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
import type { Career } from "@/lib/types";

export default function CareerQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<HollandScores>(createEmptyScores());
  const [results, setResults] = useState<Career[] | null>(null);
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
      top_careers: results.map((c) => ({ id: c.id, name: c.name, description: c.description })),
    });
    setSaving(false);
    if (!error) setSaveSuccess(true);
  };

  if (results) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Career Matches</h1>
          <p className="text-gray-400 mb-12">
            Based on your answers, these careers align with your interests and strengths.
          </p>

          <div className="space-y-6 mb-12">
            {results.map((career, i) => (
              <div
                key={career.id}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-cyan/20 text-accent-cyan font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{career.name}</h3>
                    <p className="text-gray-400 mt-1">{career.description}</p>
                    {career.salary_min && career.salary_max && (
                      <p className="text-sm text-accent-cyan mt-2">
                        Typical salary: ${(career.salary_min / 1000).toFixed(0)}K - ${(career.salary_max / 1000).toFixed(0)}K
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSaveResults}
              disabled={saving || saveSuccess}
              className="px-6 py-3 rounded-lg bg-accent-cyan text-background font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {saveSuccess ? "Saved!" : saving ? "Saving..." : "Save Results"}
            </button>
            <Link
              href="/results"
              className="px-6 py-3 rounded-lg border border-accent-purple text-accent-purple font-medium hover:bg-accent-purple/10 transition"
            >
              View My Results
            </Link>
            <Link
              href="/career-quiz"
              className="px-6 py-3 rounded-lg border border-white/20 text-gray-400 font-medium hover:bg-white/5 transition"
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
        <h1 className="text-3xl font-bold mb-2">Career Discovery Quiz</h1>
        <p className="text-gray-400 mb-12">
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
            className="text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
