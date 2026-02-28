import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,212,255,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-cyan via-white to-accent-purple bg-clip-text text-transparent">
              Discover Your Path
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Take our comprehensive quizzes to find careers and college majors that match your interests, values, and strengths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/career-quiz"
              className="px-8 py-4 rounded-xl bg-accent-cyan text-background font-semibold text-lg hover:opacity-90 transition shadow-lg shadow-accent-cyan/25"
            >
              Find Your Career
            </Link>
            <Link
              href="/major-quiz"
              className="px-8 py-4 rounded-xl border-2 border-accent-purple text-accent-purple font-semibold text-lg hover:bg-accent-purple/10 transition"
            >
              Find Your Major
            </Link>
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Built for Your Future</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-cyan/50 transition">
              <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-accent-cyan text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Assessment</h3>
              <p className="text-gray-400">40+ questions designed by career experts to uncover your true interests and work style.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-purple/50 transition">
              <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Science-Based Matching</h3>
              <p className="text-gray-400">Our Holland Code system matches you with careers and majors that fit your personality.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-cyan/50 transition">
              <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-accent-cyan text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Save & Track Results</h3>
              <p className="text-gray-400">Create an account to save your results and revisit them anytime as you grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to discover what&apos;s right for you?</h2>
          <p className="text-gray-400 mb-8">Whether you&apos;re a high school student choosing a major or exploring a career change.</p>
          <Link
            href="/about"
            className="text-accent-cyan hover:underline"
          >
            Learn more about Elevare →
          </Link>
        </div>
      </section>
    </div>
  );
}
