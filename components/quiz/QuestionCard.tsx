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
      <h2 className="text-xl md:text-2xl font-semibold text-white">
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
                ? "border-accent-cyan bg-accent-cyan/10 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
