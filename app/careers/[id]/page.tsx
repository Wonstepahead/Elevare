import Link from "next/link";
import { notFound } from "next/navigation";
import { careers } from "@/lib/data/careers";
import { getMajorsForCareer } from "@/lib/utils/mapping";

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const career = careers.find((c) => c.id === id);
  if (!career) notFound();

  const relatedMajors = getMajorsForCareer(career.name);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/careers"
          className="text-muted hover:text-foreground text-sm mb-6 inline-block"
        >
          ← Back to Careers
        </Link>

        <div className="p-8 rounded-2xl bg-card border border-border shadow-soft">
          <div className="flex flex-wrap gap-2 mb-4">
            {career.future_proof_score != null && (
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                Future-proof: {career.future_proof_score}/10
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{career.name}</h1>
          <p className="text-muted mb-6">{career.description}</p>

          {career.salary_min && career.salary_max && (
            <p className="text-accent-primary font-medium mb-6">
              Typical salary: ${(career.salary_min / 1000).toFixed(0)}K - $
              {(career.salary_max / 1000).toFixed(0)}K
            </p>
          )}

          {career.job_options && career.job_options.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Job options
              </h3>
              <div className="flex flex-wrap gap-2">
                {career.job_options.map((job) => (
                  <span
                    key={job}
                    className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedMajors.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Majors that lead to this career
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedMajors.map((m) => (
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
            href="/career-quiz"
            className="text-accent-primary font-medium hover:underline"
          >
            Take Career Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
