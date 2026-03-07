"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const DROPDOWNS = [
  {
    label: "Quizzes",
    links: [
      { href: "/career-quiz", label: "Career Quiz" },
      { href: "/major-quiz", label: "Major Quiz" },
    ],
  },
  {
    label: "AI Tools",
    links: [
      { href: "/coach", label: "AI Coach" },
      { href: "/what-if", label: "What-If Simulator" },
      { href: "/resume", label: "Resume Feedback" },
    ],
  },
  {
    label: "Planning",
    links: [
      { href: "/planning", label: "High School → College" },
      { href: "/mapping", label: "Major↔Career Map" },
      { href: "/colleges", label: "Colleges" },
      { href: "/extracurriculars", label: "Extracurriculars" },
    ],
  },
  {
    label: "Explore",
    links: [
      { href: "/careers", label: "Careers" },
      { href: "/majors", label: "Majors" },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const isActive = (href: string) => pathname === href;
  const isDropdownActive = (links: { href: string }[]) => links.some((l) => pathname === l.href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground hover:text-accent-primary transition"
          >
            Elevare
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === "/" ? "text-accent-primary bg-accent-primary/10" : "text-muted hover:text-foreground hover:bg-muted/20"
              }`}
            >
              Home
            </Link>
            {DROPDOWNS.map((d) => (
              <div
                key={d.label}
                className="relative pt-1 pb-44 -mb-44"
                onMouseEnter={() => setOpenDropdown(d.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                    isDropdownActive(d.links)
                      ? "text-accent-primary bg-accent-primary/10"
                      : "text-muted hover:text-foreground hover:bg-muted/20"
                  }`}
                >
                  {d.label}
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === d.label && (
                  <div className="absolute top-full left-0 mt-1 pt-1 py-2 w-48 rounded-xl bg-card border border-border shadow-lg animate-fade-in">
                    {d.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2.5 text-sm transition ${
                          isActive(link.href)
                            ? "text-accent-primary bg-accent-primary/5 font-medium"
                            : "text-muted hover:text-foreground hover:bg-muted/20"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === "/about" ? "text-accent-primary bg-accent-primary/10" : "text-muted hover:text-foreground hover:bg-muted/20"
              }`}
            >
              About
            </Link>
            <Link
              href="/faq"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === "/faq" ? "text-accent-primary bg-accent-primary/10" : "text-muted hover:text-foreground hover:bg-muted/20"
              }`}
            >
              FAQ
            </Link>
            {user && (
              <Link
                href="/results"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/results" ? "text-accent-primary bg-accent-primary/10" : "text-muted hover:text-foreground hover:bg-muted/20"
                }`}
              >
                My Results
              </Link>
            )}
            <div className="w-px h-6 bg-border mx-2" />
            <ThemeToggle />
            {user ? (
              <form action="/auth/signout" method="post" className="inline">
                <button type="submit" className="px-4 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-muted/20 transition">
                  Sign out
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground transition">
                  Log in
                </Link>
                <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-primary text-white hover:bg-accent-primary/90 transition shadow-soft">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2.5 rounded-xl text-foreground hover:bg-muted/30 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-xl animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            <Link href="/" className="block py-3 px-4 rounded-xl text-foreground font-medium hover:bg-muted/30" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            {DROPDOWNS.map((d) => (
              <div key={d.label} className="py-2">
                <p className="px-4 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider">{d.label}</p>
                {d.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 px-4 rounded-xl text-sm transition ${
                      isActive(link.href) ? "text-accent-primary bg-accent-primary/10 font-medium" : "text-foreground hover:bg-muted/30"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/about" className="block py-3 px-4 rounded-xl text-foreground font-medium hover:bg-muted/30" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/faq" className="block py-3 px-4 rounded-xl text-foreground font-medium hover:bg-muted/30" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            {user && (
              <Link href="/results" className="block py-3 px-4 rounded-xl text-accent-primary font-medium hover:bg-accent-primary/10" onClick={() => setMobileMenuOpen(false)}>
                My Results
              </Link>
            )}
            {!user && (
              <div className="flex gap-3 pt-4">
                <Link href="/login" className="flex-1 py-3 text-center rounded-xl border border-border font-medium hover:bg-muted/30" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link href="/signup" className="flex-1 py-3 text-center rounded-xl bg-accent-primary text-white font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
