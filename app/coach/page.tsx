"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login?redirect=/coach");
      else setUser(user);
    });
  }, [supabase, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !user) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Error ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistant = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistant += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, content: assistant };
            } else {
              next.push({ role: "assistant", content: assistant });
            }
            return next;
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground">AI Career Coach</h1>
        <p className="text-muted mb-6">
          Ask questions about careers, majors, or your path. Get personalized guidance.
        </p>

        <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted py-12">
                <p className="mb-2">Start a conversation:</p>
                <p className="text-sm">"What careers fit someone who likes problem-solving?"</p>
                <p className="text-sm">"Should I major in Computer Science or Data Science?"</p>
                <p className="text-sm">"How do I get into a career in healthcare?"</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    m.role === "user"
                      ? "bg-accent-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-2 bg-muted text-muted-foreground text-sm">
                  Thinking...
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 text-sm">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-sm text-muted text-center">
          <Link href="/career-quiz" className="text-accent-primary hover:underline">Take Career Quiz</Link>
          {" · "}
          <Link href="/major-quiz" className="text-accent-purple hover:underline">Take Major Quiz</Link>
        </p>
      </div>
    </div>
  );
}
