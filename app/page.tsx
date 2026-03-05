import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-accent-primary mb-4 animate-fade-in opacity-0 [animation-fill-mode:forwards]">
            Science-based career & major discovery
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight animate-slide-up opacity-0 [animation-fill-mode:forwards]">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-purple bg-clip-text text-transparent">
              Path
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            Take our Holland Code quizzes to find careers and college majors that match your interests and strengths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
            <Link
              href="/career-quiz"
              className="px-8 py-4 rounded-xl bg-accent-primary text-white font-semibold text-lg hover:bg-accent-primary/90 transition shadow-lg hover:shadow-glow"
            >
              Find Your Career
            </Link>
            <Link
              href="/major-quiz"
              className="px-8 py-4 rounded-xl border-2 border-accent-primary text-accent-primary font-semibold text-lg hover:bg-accent-primary/10 transition"
            >
              Find Your Major
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "42+", label: "Career Questions", color: "accent-primary" },
              { value: "42+", label: "Major Questions", color: "accent-purple" },
              { value: "50+", label: "Career Paths", color: "accent-primary" },
              { value: "40+", label: "College Majors", color: "accent-purple" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover text-center opacity-0 animate-slide-up [animation-fill-mode:forwards]"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <p className={`text-2xl sm:text-3xl font-bold ${stat.color === "accent-primary" ? "text-accent-primary" : "text-accent-purple"}`}>
                  {stat.value}
                </p>
                <p className="text-muted text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI features */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
              AI-Powered
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Smart Career Tools
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Get personalized guidance with our AI features. Sign in to access.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { href: "/coach", emoji: "💬", title: "AI Career Coach", desc: "Chat about careers, majors, and your path." },
              { href: "/what-if", emoji: "🔮", title: "What-If Simulator", desc: "Explore outcomes for any major." },
              { href: "/resume", emoji: "📄", title: "Resume Feedback", desc: "Get AI scores and improvement tips." },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {item.title}
                </h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-3">Built for Your Future</h2>
            <p className="text-muted max-w-xl mx-auto">
              Our Holland Code assessment helps you understand yourself and discover paths that fit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, title: "Comprehensive Assessment", desc: "40+ questions designed to uncover your true interests and work style.", color: "accent-primary" },
              { num: 2, title: "Science-Based Matching", desc: "Holland Code (RIASEC) system matches you with careers and majors that fit.", color: "accent-purple" },
              { num: 3, title: "Save & Track Results", desc: "Create an account to save results and revisit them as you grow.", color: "accent-primary" },
            ].map((item) => (
              <div
                key={item.num}
                className="p-8 rounded-2xl bg-card border border-border shadow-soft card-hover"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-5 ${item.color === "accent-primary" ? "bg-accent-primary/10 text-accent-primary" : "bg-accent-purple/10 text-accent-purple"}`}>
                  {item.num}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student features */}
      <section className="py-24 px-6 bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Built for High School Students</h2>
            <p className="text-muted max-w-xl mx-auto">
              Planning tools to navigate from high school to college and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: "/planning", title: "High School → College", desc: "Grade-by-grade roadmap." },
              { href: "/mapping", title: "Major-to-Career Map", desc: "See how majors connect to careers." },
              { href: "/colleges/compare", title: "College Comparison", desc: "Compare schools side-by-side." },
              { href: "/extracurriculars", title: "Extracurriculars", desc: "Activities that match your interests." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 rounded-2xl border border-border hover:border-accent-primary/50 bg-background card-hover transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent-primary transition">
                  {item.title}
                </h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Explore Before You Quiz</h2>
            <p className="text-muted max-w-xl mx-auto">
              Browse our career and major catalogs to get inspired.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/careers"
              className="group p-8 rounded-2xl border-2 border-border hover:border-accent-primary/50 bg-card shadow-soft card-hover"
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent-primary transition">
                Browse Careers
              </h3>
              <p className="text-muted mb-4">Explore 50+ career paths with descriptions and salary ranges.</p>
              <span className="text-accent-primary font-medium inline-flex items-center gap-1">
                Explore careers
                <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/majors"
              className="group p-8 rounded-2xl border-2 border-border hover:border-accent-purple/50 bg-card shadow-soft card-hover"
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent-purple transition">
                Browse Majors
              </h3>
              <p className="text-muted mb-4">Discover 40+ college majors and their related careers.</p>
              <span className="text-accent-purple font-medium inline-flex items-center gap-1">
                Explore majors
                <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Ready to discover what&apos;s right for you?
          </h2>
          <p className="text-muted mb-8">
            Whether you&apos;re a high school student or exploring a career change.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-accent-primary font-medium hover:underline"
          >
            Learn more about Elevare
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
