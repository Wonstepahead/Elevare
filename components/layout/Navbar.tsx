"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/careers", label: "Careers" },
    { href: "/majors", label: "Majors" },
    { href: "/career-quiz", label: "Career Quiz" },
    { href: "/major-quiz", label: "Major Quiz" },
    { href: "/planning", label: "Planning" },
    { href: "/mapping", label: "Major↔Career" },
    { href: "/colleges", label: "Colleges" },
    { href: "/extracurriculars", label: "Extracurriculars" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    ...(user ? [{ href: "/results", label: "My Results" }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-accent-primary hover:text-accent-secondary transition">
          Elevare
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href
                  ? "text-accent-primary"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <form action="/auth/signout" method="post" className="inline">
              <button
                type="submit"
                className="text-sm text-muted hover:text-foreground transition"
              >
                Sign out
              </button>
            </form>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="text-sm text-muted hover:text-foreground transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-2 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-secondary transition shadow-soft"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-border"
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card py-4 px-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-sm text-muted">Theme</span>
              <ThemeToggle />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 text-sm font-medium ${
                  pathname === link.href ? "text-accent-primary" : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-3 pt-4 border-t border-border">
                <Link href="/login" className="flex-1 py-2 text-center text-sm font-medium text-accent-primary" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link href="/signup" className="flex-1 py-2 text-center text-sm font-medium bg-accent-primary text-white rounded-lg" onClick={() => setMobileMenuOpen(false)}>
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
