"use client";

import { useState } from "react";
import Link from "next/link";
import { extracurriculars } from "@/lib/data/extracurriculars";
import { majors } from "@/lib/data/majors";
import { careers } from "@/lib/data/careers";
import { recommendByMajor, recommendByCareer } from "@/lib/utils/extracurriculars";

const CATEGORIES = [...new Set(extracurriculars.map((e) => e.category))].sort();

export default function ExtracurricularsPage() {
  const [filter, setFilter] = useState<"all" | "major" | "career">("all");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const displayed =
    filter === "major" && selectedMajor
      ? recommendByMajor(selectedMajor)
      : filter === "career" && selectedCareer
        ? recommendByCareer(selectedCareer)
        : extracurriculars;

  const filtered =
    categoryFilter === ""
      ? displayed
      : displayed.filter((e) => e.category === categoryFilter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          Extracurricular Recommendations
        </h1>
        <p className="text-muted mb-8 max-w-2xl">
          Discover activities that align with your interests and strengthen your college applications. Filter by major or career to get personalized suggestions.
        </p>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                filter === "all"
                  ? "bg-accent-purple text-white"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              Browse All
            </button>
            <button
              onClick={() => {
                setFilter("major");
                setSelectedMajor("");
              }}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                filter === "major"
                  ? "bg-accent-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              By Major
            </button>
            <button
              onClick={() => {
                setFilter("career");
                setSelectedCareer("");
              }}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                filter === "career"
                  ? "bg-accent-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              By Career
            </button>
          </div>

          {filter === "major" && (
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="px-4 py-2 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="">Select a major...</option>
              {majors.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          )}

          {filter === "career" && (
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="px-4 py-2 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="">Select a career...</option>
              {careers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter("")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                categoryFilter === ""
                  ? "bg-accent-primary/20 text-accent-primary"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              All categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  categoryFilter === cat
                    ? "bg-accent-primary/20 text-accent-primary"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <div
              key={e.id}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium mb-2">
                {e.category}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {e.name}
              </h3>
              <p className="text-muted text-sm mb-4">{e.description}</p>
              {e.related_majors && e.related_majors.length > 0 && (
                <p className="text-xs text-accent-purple">
                  Majors: {e.related_majors.slice(0, 3).join(", ")}
                </p>
              )}
              {e.related_careers && e.related_careers.length > 0 && (
                <p className="text-xs text-accent-primary mt-1">
                  Careers: {e.related_careers.slice(0, 3).join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Pro tip
          </h3>
          <p className="text-muted text-sm mb-4">
            Take our Career Quiz or Major Quiz to get personalized extracurricular recommendations based on your interests. Colleges look for depth—commit to 1–2 activities and aim for leadership roles.
          </p>
          <div className="flex gap-4">
            <Link
              href="/career-quiz"
              className="text-accent-primary font-medium hover:underline"
            >
              Take Career Quiz
            </Link>
            <Link
              href="/major-quiz"
              className="text-accent-purple font-medium hover:underline"
            >
              Take Major Quiz
            </Link>
            <Link
              href="/planning"
              className="text-muted font-medium hover:text-foreground"
            >
              Planning Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
