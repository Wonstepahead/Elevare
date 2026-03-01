import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-foreground">About Elevare</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-accent-primary">The Story Behind Elevare</h2>
          <p className="text-lg text-muted leading-relaxed mb-6">
            Saqibul Kazi, a 15-year-old, wanted to create a website to help teens and people like him find what their future paths will look like. He saw friends and classmates struggling with the same question: &quot;What do I want to do with my life?&quot;—and he wanted to build something that could help.
          </p>
          <p className="text-lg text-muted leading-relaxed mb-6">
            Elevare was born from that vision. The name means &quot;to elevate&quot;—and that&apos;s exactly what we aim to do: elevate your understanding of yourself and the opportunities that await you.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            Built by a teen, for teens and anyone at a crossroads, Elevare is a free resource designed to make career and education decisions a little less overwhelming—and a lot more informed.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-accent-purple">Our Mission</h2>
          <p className="text-lg text-muted leading-relaxed mb-6">
            We believe everyone deserves clarity about their future. Too many people choose careers or majors based on pressure from parents, trends, or guesswork—only to realize years later that it wasn&apos;t the right fit.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            Elevare exists to change that. We use the Holland Code (RIASEC)—a research-backed framework used by career counselors worldwide—to match you with careers and college majors that align with your interests, values, and natural strengths. No fluff, no ads, no paywalls. Just honest guidance to help you find your path.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">How It Works</h2>
          <ul className="space-y-6 text-muted">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-primary/10 text-accent-primary font-bold flex items-center justify-center">1</span>
              <div>
                <span className="font-medium text-foreground">Take the quiz.</span> Our career quiz has 42 questions; our major quiz has 42 as well. Each takes about 10–15 minutes. Answer honestly—there are no wrong answers. The questions explore what you enjoy, how you like to work, and what matters to you.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-primary/10 text-accent-primary font-bold flex items-center justify-center">2</span>
              <div>
                <span className="font-medium text-foreground">Get your Holland Code.</span> Your answers are scored across six dimensions: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional (RIASEC). Your top codes reveal your work personality and preferences.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-primary/10 text-accent-primary font-bold flex items-center justify-center">3</span>
              <div>
                <span className="font-medium text-foreground">See your matches.</span> We match your profile to 50+ careers and 40+ college majors. You&apos;ll get a ranked list with descriptions and, for careers, typical salary ranges. Create a free account to save your results and revisit them anytime.
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Who Is Elevare For?</h2>
          <p className="text-muted mb-8">
            Elevare is built for anyone asking &quot;what should I do with my life?&quot;—especially those who don&apos;t have easy access to career counseling. Here&apos;s who we serve:
          </p>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <h3 className="font-semibold text-foreground mb-2">High school students (grades 9–12)</h3>
              <p className="text-muted">
                You&apos;re facing big decisions: What classes should I take? What should I major in? Which colleges fit my goals? Our Major Quiz helps you discover college majors that match your interests and learning style, so you can narrow down options before applications.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <h3 className="font-semibold text-foreground mb-2">College and university students</h3>
              <p className="text-muted">
                You&apos;ve chosen a major—or you&apos;re still deciding. Either way, you want to know what careers your degree can lead to. Our Career Quiz and career catalog help you explore real-world paths and see how your interests translate into jobs.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <h3 className="font-semibold text-foreground mb-2">Career changers and adults</h3>
              <p className="text-muted">
                You&apos;re considering a new direction—whether you&apos;re unhappy in your current role, returning to work, or simply curious. Elevare helps you rediscover your interests and explore careers you might not have considered.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <h3 className="font-semibold text-foreground mb-2">Parents, teachers, and counselors</h3>
              <p className="text-muted">
                You want to support a young person in your life without pushing them toward a path that doesn&apos;t fit. Elevare is a free tool you can recommend—it gives them a starting point for self-reflection and exploration.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 p-8 rounded-2xl bg-card border border-border shadow-soft">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Why Holland Code?</h2>
          <p className="text-muted mb-4">
            The Holland Code (RIASEC) was developed by psychologist John Holland and has been used in career counseling for decades. It&apos;s based on the idea that people and work environments can be described by six types. When your type matches a career&apos;s type, you&apos;re more likely to feel satisfied and successful.
          </p>
          <p className="text-muted">
            We don&apos;t claim to tell you exactly what to do—only you can decide that. But we can help you understand yourself better and point you toward options worth exploring.
          </p>
        </section>

        <section className="text-center">
          <p className="text-muted mb-6">Ready to discover your path?</p>
          <Link
            href="/career-quiz"
            className="inline-block px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
          >
            Take the Career Quiz
          </Link>
          <span className="mx-4 text-muted">or</span>
          <Link
            href="/major-quiz"
            className="inline-block px-6 py-3 rounded-xl border-2 border-accent-purple text-accent-purple font-medium hover:bg-accent-purple/5 transition"
          >
            Take the Major Quiz
          </Link>
        </section>

        <p className="text-center text-muted text-sm mt-16">
          Built with care for the next generation. — Elevare Team
        </p>
      </div>
    </div>
  );
}
