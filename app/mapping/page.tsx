"use client";

import { useState } from "react";
import Link from "next/link";
import { majors } from "@/lib/data/majors";
import { careers } from "@/lib/data/careers";
import { getMajorsForCareer, getCareersForMajor } from "@/lib/utils/mapping";
import type { Major, Career } from "@/lib/types";

export default function MappingPage() {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [view, setView] = useState<"major" | "career">("major");

  const linkedCareers = selectedMajor ? getCareersForMajor(selectedMajor) : [];
  const linkedMajors = selectedCareer ? getMajorsForCareer(selectedCareer.name) : [];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          Major-to-Career Mapping
        </h1>
        <p className="text-muted mb-8 max-w-2xl">
          Explore how college majors connect to career paths. Select a major to see related careers, or a career to see which majors lead there.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => {
              setView("major");
              setSelectedMajor(null);
              setSelectedCareer(null);
            }}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              view === "major"
                ? "bg-accent-purple text-white"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            Browse by Major
          </button>
          <button
            onClick={() => {
              setView("career");
              setSelectedMajor(null);
              setSelectedCareer(null);
            }}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              view === "career"
                ? "bg-accent-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            Browse by Career
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Selection panel */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              {view === "major" ? "Select a major" : "Select a career"}
            </h2>
            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
              {view === "major"
                ? majors.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMajor(m);
                        setSelectedCareer(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        selectedMajor?.id === m.id
                          ? "border-accent-purple bg-accent-purple/10"
                          : "border-border hover:border-accent-purple/50 bg-card"
                      }`}
                    >
                      <span className="font-medium text-foreground">{m.name}</span>
                    </button>
                  ))
                : careers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCareer(c);
                        setSelectedMajor(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        selectedCareer?.id === c.id
                          ? "border-accent-primary bg-accent-primary/10"
                          : "border-border hover:border-accent-primary/50 bg-card"
                      }`}
                    >
                      <span className="font-medium text-foreground">{c.name}</span>
                    </button>
                  ))}
            </div>
          </div>

          {/* Results panel */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              {view === "major" ? "Related careers" : "Related majors"}
            </h2>
            <div className="min-h-[200px] p-6 rounded-2xl bg-card border border-border">
              {view === "major" && selectedMajor ? (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {selectedMajor.name}
                  </h3>
                  <p className="text-muted text-sm mb-4">{selectedMajor.description}</p>
                  {linkedCareers.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Careers this major leads to:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {linkedCareers.map((c) => (
                          <Link
                            key={c.id}
                            href={`/careers/${c.id}`}
                            className="px-3 py-1.5 rounded-lg bg-accent-primary/10 text-accent-primary text-sm font-medium hover:bg-accent-primary/20 transition"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                      {selectedMajor.top_schools && selectedMajor.top_schools.length > 0 && (
                        <p className="text-sm text-muted mt-4">
                          Top schools: {selectedMajor.top_schools.join(", ")}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted">
                      Related careers:{" "}
                      {selectedMajor.related_careers?.join(", ") ?? "—"}
                    </p>
                  )}
                </>
              ) : view === "career" && selectedCareer ? (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {selectedCareer.name}
                  </h3>
                  <p className="text-muted text-sm mb-4">{selectedCareer.description}</p>
                  {linkedMajors.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Majors that lead to this career:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {linkedMajors.map((m) => (
                          <Link
                            key={m.id}
                            href={`/majors/${m.id}`}
                            className="px-3 py-1.5 rounded-lg bg-accent-purple/10 text-accent-purple text-sm font-medium hover:bg-accent-purple/20 transition"
                          >
                            {m.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted">No majors in our database directly map to this career.</p>
                  )}
                </>
              ) : (
                <p className="text-muted">
                  Select a {view} from the list to see the connections.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/planning"
            className="text-accent-primary font-medium hover:underline"
          >
            ← Back to Planning
          </Link>
          <Link
            href="/colleges/compare"
            className="text-accent-purple font-medium hover:underline"
          >
            Compare Colleges →
          </Link>
        </div>
      </div>
    </div>
  );
}
