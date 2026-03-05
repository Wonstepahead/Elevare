import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { majors } from "@/lib/data/majors";
import { careers } from "@/lib/data/careers";
import { getCareersForMajor } from "@/lib/utils/mapping";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to use the What-If simulator." }, { status: 401 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI features are not configured. Please add OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    const { majorName } = (await request.json()) as { majorName: string };
    if (!majorName?.trim()) {
      return NextResponse.json({ error: "Major name is required." }, { status: 400 });
    }

    const major = majors.find((m) => m.name.toLowerCase() === majorName.trim().toLowerCase());
    if (!major) {
      return NextResponse.json({ error: "Major not found." }, { status: 404 });
    }

    const relatedCareers = getCareersForMajor(major);
    const careerSummaries = relatedCareers.map((c) => {
      const sal = c.salary_min && c.salary_max
        ? `$${(c.salary_min / 1000).toFixed(0)}K–$${(c.salary_max / 1000).toFixed(0)}K`
        : "varies";
      return `${c.name} (${sal})`;
    }).join(", ");

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a career advisor. Given a college major and its related careers, write a brief, encouraging "What if I choose this major?" analysis. Include: 1) Career paths and salary outlook, 2) Top schools for this major, 3) Skills to develop, 4) One practical next step. Keep it to 3-4 short paragraphs. Be specific using the data provided.`,
        },
        {
          role: "user",
          content: `Major: ${major.name}. Description: ${major.description}. Related careers with typical salaries: ${careerSummaries}. Top schools: ${major.top_schools?.join(", ") ?? "various"}. Future-proof score: ${major.future_proof_score ?? "N/A"}/10.`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "Unable to generate insights.";
    return NextResponse.json({ insight: text });
  } catch (err) {
    console.error("What-if API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Something went wrong." },
      { status: 500 }
    );
  }
}
