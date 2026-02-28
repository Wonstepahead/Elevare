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
import type { Major } from "@/lib/types";

export default function MajorQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<HollandScores>(createEmptyScores());
  const [results, setResults] = useState<Major[] | null>(null);
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
      top_majors: results.map((m) => ({ id: m.id, name: m.name, description: m.description })),
    });
    setSaving(false);
    if (!error) setSaveSuccess(true);
  };

  if (results) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Major Matches</h1>
          <p className="text-gray-400 mb-12">
            Based on your answers, these college majors align with your interests and strengths.
          </p>

          <div className="space-y-6 mb-12">
            {results.map((major, i) => (
              <div
                key={major.id}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/30 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-purple/20 text-accent-purple font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{major.name}</h3>
                    <p className="text-gray-400 mt-1">{major.description}</p>
                    {major.related_careers && major.related_careers.length > 0 && (
                      <p className="text-sm text-accent-purple mt-2">
                        Related careers: {major.related_careers.slice(0, 3).join(", ")}
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
              className="px-6 py-3 rounded-lg bg-accent-purple text-white font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {saveSuccess ? "Saved!" : saving ? "Saving..." : "Save Results"}
            </button>
            <Link
              href="/results"
              className="px-6 py-3 rounded-lg border border-accent-cyan text-accent-cyan font-medium hover:bg-accent-cyan/10 transition"
            >
              View My Results
            </Link>
            <Link
              href="/major-quiz"
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
        <h1 className="text-3xl font-bold mb-2">College Major Finder</h1>
        <p className="text-gray-400 mb-12">
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
            className="text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
