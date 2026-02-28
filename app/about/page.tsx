import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">About Elevare</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-accent-cyan">The Story Behind Elevare</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Saqibul Kazi, a 15-year-old, wanted to create a website to help teens and people like him find what their future paths will look like. He saw friends and classmates struggling with the same question: &quot;What do I want to do with my life?&quot;—and he wanted to build something that could help.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Elevare was born from that vision. The name means &quot;to elevate&quot;—and that&apos;s exactly what we aim to do: elevate your understanding of yourself and the opportunities that await you.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-accent-purple">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            We believe everyone deserves clarity about their future. Whether you&apos;re a high school student deciding on a college major, a college student exploring careers, or someone considering a career change—Elevare helps you discover paths that align with who you are.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3">
              <span className="text-accent-cyan font-bold">1.</span>
              <span>Take our comprehensive career or major quiz—40+ questions designed to uncover your interests, values, and work style.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-cyan font-bold">2.</span>
              <span>We use the Holland Code (RIASEC) model—a proven framework used by career counselors worldwide—to match you with careers and majors.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-cyan font-bold">3.</span>
              <span>Get personalized results and save them to your account so you can revisit and explore as you grow.</span>
            </li>
          </ul>
        </section>

        <section className="mb-16 p-8 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Who Is Elevare For?</h2>
          <p className="text-gray-300 mb-6">
            High school students choosing a major. College students exploring careers. Career changers looking for a new direction. Anyone who wants to understand themselves better and find a path that fits.
          </p>
          <Link
            href="/career-quiz"
            className="inline-block px-6 py-3 rounded-lg bg-accent-cyan text-background font-medium hover:opacity-90 transition"
          >
            Take the Career Quiz
          </Link>
        </section>

        <p className="text-center text-gray-500 text-sm">
          Built with care for the next generation. — Elevare Team
        </p>
      </div>
    </div>
  );
}
