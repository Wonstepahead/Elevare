"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { colleges } from "@/lib/data/colleges";
import type { College } from "@/lib/types";

const TYPE_LABELS: Record<string, string> = {
  public: "Public",
  private: "Private",
  "liberal-arts": "Liberal Arts",
  tech: "Tech/STEM",
  art: "Art School",
  music: "Music School",
};

function CompareContent() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const add = searchParams.get("add");
    if (add) setSelected((prev) => (prev.includes(add) ? prev : [...prev, add]));
  }, [searchParams]);

  const selectedColleges = selected
    .map((id) => colleges.find((c) => c.id === id))
    .filter(Boolean) as College[];

  const toggleCollege = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const removeCollege = (id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          College Comparison Tool
        </h1>
        <p className="text-muted mb-8 max-w-2xl">
          Select up to 4 colleges to compare side-by-side. Great for narrowing down your list.
        </p>

        <div className="mb-8 p-4 rounded-xl bg-card border border-border">
          <p className="text-sm font-medium text-foreground mb-3">
            Add colleges to compare (max 4):
          </p>
          <div className="flex flex-wrap gap-2">
            {colleges.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleCollege(c.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selected.includes(c.id)
                    ? "bg-accent-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {selectedColleges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden bg-card border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground w-40">
                    Criteria
                  </th>
                  {selectedColleges.map((c) => (
                    <th key={c.id} className="text-left p-4 font-semibold text-foreground min-w-[200px]">
                      <div className="flex items-center justify-between">
                        <span>{c.name}</span>
                        <button
                          onClick={() => removeCollege(c.id)}
                          className="text-muted hover:text-foreground text-sm"
                          aria-label="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4 text-muted text-sm">Location</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-foreground">{c.location}</td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 text-muted text-sm">Type</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-foreground">
                      {TYPE_LABELS[c.type] ?? c.type}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 text-muted text-sm">Acceptance Rate</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-foreground">
                      {c.acceptance_rate != null ? `${c.acceptance_rate}%` : "—"}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 text-muted text-sm">Est. Annual Cost</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-foreground">
                      {c.cost_annual != null
                        ? `~$${(c.cost_annual / 1000).toFixed(0)}K`
                        : "—"}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 text-muted text-sm">Student Body</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-foreground">
                      {c.student_body != null
                        ? c.student_body >= 1000
                          ? `${(c.student_body / 1000).toFixed(1)}K`
                          : c.student_body
                        : "—"}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4 text-muted text-sm">Strong Majors</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-foreground text-sm">
                      {c.strong_majors?.slice(0, 4).join(", ") ?? "—"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-card border border-border text-center text-muted">
            <p>Select colleges above to start comparing.</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link href="/colleges" className="text-accent-primary font-medium hover:underline">
            ← Browse Colleges
          </Link>
          <Link href="/planning" className="text-accent-purple font-medium hover:underline">
            Planning Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-16 px-6">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
