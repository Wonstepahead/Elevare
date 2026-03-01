import Link from "next/link";

const GRADE_MILESTONES = [
  {
    grade: "9th Grade",
    subtitle: "Foundation year",
    color: "accent-primary",
    milestones: [
      "Focus on strong grades—GPA matters from day one",
      "Explore clubs and activities to discover interests",
      "Start a resume and track achievements",
      "Meet with your school counselor to discuss goals",
      "Take challenging courses (honors if available)",
    ],
  },
  {
    grade: "10th Grade",
    subtitle: "Explore & build",
    color: "accent-purple",
    milestones: [
      "Take the Career Quiz and Major Quiz to discover paths",
      "Dive deeper into 1–2 extracurriculars (leadership roles)",
      "Research colleges and majors that interest you",
      "Consider PSAT for practice",
      "Build relationships with teachers for future recommendations",
    ],
  },
  {
    grade: "11th Grade",
    subtitle: "Critical year",
    color: "accent-primary",
    milestones: [
      "Take SAT/ACT—plan test dates early",
      "Visit colleges (in person or virtually)",
      "Narrow down major and career interests",
      "Create a balanced college list (reach, match, safety)",
      "Start drafting college essays and personal statement",
    ],
  },
  {
    grade: "12th Grade",
    subtitle: "Apply & decide",
    color: "accent-purple",
    milestones: [
      "Submit college applications (early action/decision if applicable)",
      "Complete FAFSA and financial aid forms",
      "Apply for scholarships",
      "Make final college decision by May 1",
      "Celebrate and prepare for the transition!",
    ],
  },
];

export default function PlanningPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            High School → College Planning
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            A grade-by-grade roadmap to help you stay on track from freshman year to college acceptance.
          </p>
        </div>

        <div className="space-y-8">
          {GRADE_MILESTONES.map(({ grade, subtitle, color, milestones }, i) => (
            <section
              key={grade}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                    color === "accent-primary"
                      ? "bg-accent-primary"
                      : "bg-accent-purple"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{grade}</h2>
                  <p className="text-muted">{subtitle}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {milestones.map((m, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {j + 1}
                    </span>
                    <span className="text-foreground">{m}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-accent-purple/10 border border-border">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Ready to discover your path?
          </h3>
          <p className="text-muted mb-6">
            Take our quizzes to find careers and majors that match your interests, then use the Major-to-Career mapping and College Comparison tools to plan your future.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/career-quiz"
              className="px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
            >
              Career Quiz
            </Link>
            <Link
              href="/major-quiz"
              className="px-6 py-3 rounded-xl bg-accent-purple text-white font-medium hover:bg-accent-secondary transition"
            >
              Major Quiz
            </Link>
            <Link
              href="/mapping"
              className="px-6 py-3 rounded-xl border-2 border-accent-primary text-accent-primary font-medium hover:bg-accent-primary/5 transition"
            >
              Major-to-Career Map
            </Link>
            <Link
              href="/colleges/compare"
              className="px-6 py-3 rounded-xl border-2 border-accent-purple text-accent-purple font-medium hover:bg-accent-purple/5 transition"
            >
              Compare Colleges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
