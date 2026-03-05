import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are an encouraging, knowledgeable AI career coach for Elevare, helping high school students and young adults explore careers and college majors. You use the Holland Code (RIASEC) framework when relevant. Be warm, supportive, and practical. Keep responses concise (2-4 paragraphs) unless the user asks for more detail. If they mention quiz results, majors, or careers, use that context. Don't make up specific salary numbers—stick to general ranges if needed. Encourage them to take our Career Quiz or Major Quiz if they haven't.`;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to use the career coach." }, { status: 401 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI features are not configured. Please add OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required." }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Something went wrong." },
      { status: 500 }
    );
  }
}
