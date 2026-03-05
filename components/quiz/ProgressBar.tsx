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
      <div className="h-2.5 w-full rounded-full bg-muted/30 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-purple transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
