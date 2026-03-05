import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Quizzes",
    links: [
      { href: "/career-quiz", label: "Career Quiz" },
      { href: "/major-quiz", label: "Major Quiz" },
    ],
  },
  {
    title: "AI & Tools",
    links: [
      { href: "/coach", label: "AI Coach" },
      { href: "/what-if", label: "What-If" },
      { href: "/resume", label: "Resume" },
      { href: "/planning", label: "Planning" },
      { href: "/mapping", label: "Major↔Career" },
      { href: "/colleges", label: "Colleges" },
      { href: "/extracurriculars", label: "Extracurriculars" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/careers", label: "Careers" },
      { href: "/majors", label: "Majors" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-foreground hover:text-accent-primary transition">
              Elevare
            </Link>
            <p className="mt-3 text-sm text-muted max-w-xs">
              Discover your path with science-based career and major matching.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            Built to help teens discover their future paths.
          </p>
          <p className="text-sm font-medium text-foreground">© Elevare</p>
        </div>
      </div>
    </footer>
  );
}
