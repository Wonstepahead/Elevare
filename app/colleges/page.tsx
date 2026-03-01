import Link from "next/link";
import { colleges } from "@/lib/data/colleges";

const TYPE_LABELS: Record<string, string> = {
  public: "Public",
  private: "Private",
  "liberal-arts": "Liberal Arts",
  tech: "Tech/STEM",
  art: "Art School",
  music: "Music School",
};

export default function CollegesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Explore Colleges & Universities
        </h1>
        <p className="text-muted mb-8 max-w-2xl">
          Browse top schools and compare them side-by-side to find the best fit for your major and goals.
        </p>
        <div className="mb-8">
          <Link
            href="/colleges/compare"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
          >
            Compare Colleges
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
            >
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {college.name}
              </h3>
              <p className="text-sm text-muted mb-3">{college.location}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium mb-3">
                {TYPE_LABELS[college.type] ?? college.type}
              </span>
              <div className="space-y-1 text-sm text-muted">
                {college.acceptance_rate != null && (
                  <p>Acceptance: {college.acceptance_rate}%</p>
                )}
                {college.cost_annual != null && (
                  <p>~${(college.cost_annual / 1000).toFixed(0)}K/year</p>
                )}
              </div>
              <Link
                href={`/colleges/compare?add=${college.id}`}
                className="mt-4 inline-block text-sm text-accent-primary font-medium hover:underline"
              >
                Add to comparison →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
