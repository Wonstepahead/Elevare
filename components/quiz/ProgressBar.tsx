"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.min(100, (current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-muted mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-primary to-accent-purple transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
