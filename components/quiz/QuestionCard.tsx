"use client";

import type { QuizQuestion } from "@/lib/types";

interface QuestionCardProps {
  question: QuizQuestion;
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
              selectedValue === option.value
                ? "border-accent-primary bg-accent-primary/10 text-foreground"
                : "border-border bg-card text-foreground hover:border-accent-primary/50 hover:bg-accent-primary/5"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
