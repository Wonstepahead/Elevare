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
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-accent-purple">Our Mission</h2>
          <p className="text-lg text-muted leading-relaxed mb-6">
            We believe everyone deserves clarity about their future. Whether you&apos;re a high school student deciding on a college major, a college student exploring careers, or someone considering a career change—Elevare helps you discover paths that align with who you are.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">How It Works</h2>
          <ul className="space-y-4 text-muted">
            <li className="flex gap-3">
              <span className="text-accent-primary font-bold">1.</span>
              <span>Take our comprehensive career or major quiz—40+ questions designed to uncover your interests, values, and work style.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-primary font-bold">2.</span>
              <span>We use the Holland Code (RIASEC) model—a proven framework used by career counselors worldwide—to match you with careers and majors.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-primary font-bold">3.</span>
              <span>Get personalized results and save them to your account so you can revisit and explore as you grow.</span>
            </li>
          </ul>
        </section>

        <section className="mb-16 p-8 rounded-2xl bg-card border border-border shadow-soft">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Who Is Elevare For?</h2>
          <p className="text-muted mb-6">
            High school students choosing a major. College students exploring careers. Career changers looking for a new direction. Anyone who wants to understand themselves better and find a path that fits.
          </p>
          <Link
            href="/career-quiz"
            className="inline-block px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
          >
            Take the Career Quiz
          </Link>
        </section>

        <p className="text-center text-muted text-sm">
          Built with care for the next generation. — Elevare Team
        </p>
      </div>
    </div>
  );
}
