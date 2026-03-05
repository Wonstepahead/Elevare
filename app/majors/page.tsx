import Link from "next/link";
import { majors } from "@/lib/data/majors";

export default function MajorsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Explore College Majors</h1>
          <p className="text-muted max-w-2xl mb-6">
            Browse 40+ majors. Perfect for high school students deciding what to study.
          </p>
          <Link
            href="/major-quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-purple text-white font-medium hover:bg-accent-purple/90 transition shadow-soft"
          >
            Take Major Quiz
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {majors.map((major) => (
            <Link
              key={major.id}
              href={`/majors/${major.id}`}
              className="group p-6 rounded-2xl bg-card border border-border shadow-soft card-hover block"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent-purple transition">{major.name}</h3>
              <p className="text-muted text-sm mb-4 line-clamp-2">{major.description}</p>
              {major.related_careers && major.related_careers.length > 0 && (
                <p className="text-sm text-accent-purple">
                  Careers: {major.related_careers.slice(0, 2).join(", ")}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
