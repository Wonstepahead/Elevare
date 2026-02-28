import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ResultsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/results");
  }

  const { data: careerResults } = await supabase
    .from("career_quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: majorResults } = await supabase
    .from("major_quiz_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Results</h1>
        <p className="text-gray-400 mb-12">Your saved career and major quiz results</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-6 text-accent-cyan">Career Quiz Results</h2>
            {careerResults && careerResults.length > 0 ? (
              <div className="space-y-4">
                {careerResults.map((result: { id: string; created_at: string; top_careers: { name: string }[] }) => (
                  <div
                    key={result.id}
                    className="p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="text-sm text-gray-400 mb-4">
                      {new Date(result.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(result.top_careers || []).slice(0, 5).map((c: { name: string }) => (
                        <span
                          key={c.name}
                          className="px-3 py-1 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center text-gray-400">
                <p className="mb-4">No career quiz results yet.</p>
                <Link
                  href="/career-quiz"
                  className="inline-block px-6 py-3 rounded-lg bg-accent-cyan text-background font-medium hover:opacity-90 transition"
                >
                  Take Career Quiz
                </Link>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6 text-accent-purple">Major Quiz Results</h2>
            {majorResults && majorResults.length > 0 ? (
              <div className="space-y-4">
                {majorResults.map((result: { id: string; created_at: string; top_majors: { name: string }[] }) => (
                  <div
                    key={result.id}
                    className="p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="text-sm text-gray-400 mb-4">
                      {new Date(result.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(result.top_majors || []).slice(0, 5).map((m: { name: string }) => (
                        <span
                          key={m.name}
                          className="px-3 py-1 rounded-lg bg-accent-purple/20 text-accent-purple text-sm"
                        >
                          {m.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center text-gray-400">
                <p className="mb-4">No major quiz results yet.</p>
                <Link
                  href="/major-quiz"
                  className="inline-block px-6 py-3 rounded-lg bg-accent-purple text-white font-medium hover:opacity-90 transition"
                >
                  Take Major Quiz
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
