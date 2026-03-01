import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-lg font-bold text-accent-primary hover:text-accent-secondary transition">
            Elevare
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link href="/about" className="hover:text-foreground transition">About</Link>
            <Link href="/careers" className="hover:text-foreground transition">Careers</Link>
            <Link href="/majors" className="hover:text-foreground transition">Majors</Link>
            <Link href="/career-quiz" className="hover:text-foreground transition">Career Quiz</Link>
            <Link href="/major-quiz" className="hover:text-foreground transition">Major Quiz</Link>
            <Link href="/planning" className="hover:text-foreground transition">Planning</Link>
            <Link href="/mapping" className="hover:text-foreground transition">Major↔Career</Link>
            <Link href="/colleges" className="hover:text-foreground transition">Colleges</Link>
            <Link href="/extracurriculars" className="hover:text-foreground transition">Extracurriculars</Link>
            <Link href="/faq" className="hover:text-foreground transition">FAQ</Link>
          </div>
        </div>
        <p className="text-center text-muted text-sm mt-8">
          Built to help teens and people discover their future paths. — Elevare
        </p>
      </div>
    </footer>
  );
}
