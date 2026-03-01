import Link from "next/link";
import { notFound } from "next/navigation";
import { majors } from "@/lib/data/majors";
import { getCareersForMajor } from "@/lib/utils/mapping";

export default async function MajorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const major = majors.find((m) => m.id === id);
  if (!major) notFound();

  const relatedCareers = getCareersForMajor(major);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/majors"
          className="text-muted hover:text-foreground text-sm mb-6 inline-block"
        >
          ← Back to Majors
        </Link>

        <div className="p-8 rounded-2xl bg-card border border-border shadow-soft">
          <div className="flex flex-wrap gap-2 mb-4">
            {major.future_proof_score != null && (
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                Future-proof: {major.future_proof_score}/10
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{major.name}</h1>
          <p className="text-muted mb-6">{major.description}</p>

          {relatedCareers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Related careers
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedCareers.map((c) => (
                  <Link
                    key={c.id}
                    href={`/careers/${c.id}`}
                    className="px-3 py-1.5 rounded-lg bg-accent-primary/10 text-accent-primary text-sm font-medium hover:bg-accent-primary/20 transition"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {major.top_schools && major.top_schools.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Top schools for this major
              </h3>
              <div className="flex flex-wrap gap-2">
                {major.top_schools.map((school) => (
                  <span
                    key={school}
                    className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm"
                  >
                    {school}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/mapping"
            className="text-accent-purple font-medium hover:underline"
          >
            Explore Major-to-Career Map
          </Link>
          <Link
            href="/major-quiz"
            className="text-accent-primary font-medium hover:underline"
          >
            Take Major Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
