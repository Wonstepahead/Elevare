import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
          Elevare
        </Link>
        <div className="flex gap-8 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/career-quiz" className="hover:text-white transition">Career Quiz</Link>
          <Link href="/major-quiz" className="hover:text-white transition">Major Quiz</Link>
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs mt-8">
        Built to help teens and people discover their future paths. — Elevare
      </p>
    </footer>
  );
}
