import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Discover Your{" "}
            <span className="text-accent-primary">Path</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted mb-12 max-w-2xl mx-auto">
            Take our science-based quizzes to find careers and college majors that match your interests, values, and strengths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/career-quiz"
              className="px-8 py-4 rounded-xl bg-accent-primary text-white font-semibold text-lg hover:bg-accent-secondary transition shadow-soft-lg"
            >
              Find Your Career
            </Link>
            <Link
              href="/major-quiz"
              className="px-8 py-4 rounded-xl border-2 border-accent-primary text-accent-primary font-semibold text-lg hover:bg-accent-primary/5 transition"
            >
              Find Your Major
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-accent-primary">42+</p>
              <p className="text-muted text-sm mt-1">Career Questions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent-purple">42+</p>
              <p className="text-muted text-sm mt-1">Major Questions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent-primary">50+</p>
              <p className="text-muted text-sm mt-1">Career Paths</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent-purple">40+</p>
              <p className="text-muted text-sm mt-1">College Majors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Built for Your Future</h2>
          <p className="text-muted text-center mb-16 max-w-2xl mx-auto">
            Our Holland Code assessment helps you understand yourself and discover paths that fit.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border shadow-soft card-hover">
              <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Comprehensive Assessment</h3>
              <p className="text-muted">40+ questions designed to uncover your true interests and work style.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border shadow-soft card-hover">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Science-Based Matching</h3>
              <p className="text-muted">Holland Code (RIASEC) system matches you with careers and majors that fit.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border shadow-soft card-hover">
              <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Save & Track Results</h3>
              <p className="text-muted">Create an account to save results and revisit them as you grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore careers & majors */}
      <section className="py-24 px-6 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Explore Before You Quiz</h2>
          <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
            Browse our career and major catalogs to get inspired.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/careers"
              className="group p-8 rounded-2xl border-2 border-border hover:border-accent-primary transition bg-background"
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent-primary transition">Browse Careers</h3>
              <p className="text-muted mb-4">Explore 50+ career paths with descriptions and salary ranges.</p>
              <span className="text-accent-primary font-medium">Explore careers →</span>
            </Link>
            <Link
              href="/majors"
              className="group p-8 rounded-2xl border-2 border-border hover:border-accent-purple transition bg-background"
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent-purple transition">Browse Majors</h3>
              <p className="text-muted mb-4">Discover 40+ college majors and their related careers.</p>
              <span className="text-accent-purple font-medium">Explore majors →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to discover what&apos;s right for you?</h2>
          <p className="text-muted mb-8">Whether you&apos;re a high school student or exploring a career change.</p>
          <Link
            href="/about"
            className="text-accent-primary font-medium hover:underline"
          >
            Learn more about Elevare →
          </Link>
        </div>
      </section>
    </div>
  );
}
