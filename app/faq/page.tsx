import Link from "next/link";

const faqs = [
  {
    q: "What is the Holland Code?",
    a: "The Holland Code (RIASEC) is a career theory that categorizes people and careers into six types: Realistic (hands-on), Investigative (analytical), Artistic (creative), Social (helping), Enterprising (leading), and Conventional (organizing). Our quiz identifies your top codes to match you with fitting careers and majors.",
  },
  {
    q: "How long does the quiz take?",
    a: "Each quiz takes about 10-15 minutes. There are 42 questions, and you can go at your own pace. You can also use the Back button to change previous answers.",
  },
  {
    q: "Do I need an account to take the quiz?",
    a: "No! You can take both quizzes without signing up. Create an account only if you want to save your results and revisit them later.",
  },
  {
    q: "Who is Elevare for?",
    a: "High school students choosing a major, college students exploring careers, career changers, or anyone who wants to understand themselves better and find a path that fits.",
  },
  {
    q: "Is Elevare free?",
    a: "Yes, Elevare is completely free to use.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h1>
        <p className="text-muted mb-12">Everything you need to know about Elevare.</p>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/career-quiz"
            className="inline-block px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition"
          >
            Take the Career Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
