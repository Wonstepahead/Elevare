import Link from "next/link";
import { careers } from "@/lib/data/careers";

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Explore Careers</h1>
        <p className="text-muted mb-12 max-w-2xl">
          Browse our catalog of 50+ careers. Take the quiz to get personalized matches based on your interests.
        </p>
        <div className="mb-8">
          <Link
            href="/career-quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
          >
            Take Career Quiz
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div
              key={career.id}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">{career.name}</h3>
              <p className="text-muted text-sm mb-4 line-clamp-2">{career.description}</p>
              {career.salary_min && career.salary_max && (
                <p className="text-sm text-accent-primary font-medium">
                  ${(career.salary_min / 1000).toFixed(0)}K - ${(career.salary_max / 1000).toFixed(0)}K
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
