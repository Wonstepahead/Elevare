import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const SCORING_PROMPT = `You are an expert resume reviewer for high school and college students. Analyze the resume text and return a JSON object with this exact structure (no other text):
{
  "overall_score": <number 1-100>,
  "clarity_score": <number 1-100>,
  "impact_score": <number 1-100>,
  "ats_score": <number 1-100, ATS/keyword optimization>,
  "strengths": [<2-4 short strings>],
  "improvements": [<2-4 short strings>],
  "summary": "<2-3 sentence overall feedback>"
}
Be encouraging but honest. For high school resumes, value leadership, initiative, and growth. Return ONLY valid JSON.`;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to get resume feedback." }, { status: 401 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI features are not configured. Please add OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    const { resumeText } = (await request.json()) as { resumeText: string };
    const text = typeof resumeText === "string" ? resumeText.trim() : "";
    if (!text || text.length < 50) {
      return NextResponse.json(
        { error: "Please paste at least 50 characters of your resume." },
        { status: 400 }
      );
    }
    if (text.length > 8000) {
      return NextResponse.json(
        { error: "Resume text is too long. Please limit to ~8000 characters." },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SCORING_PROMPT },
        { role: "user", content: `Review this resume:\n\n${text}` },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsed || typeof parsed.overall_score !== "number") {
      return NextResponse.json(
        { error: "Could not parse feedback. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      overall_score: parsed.overall_score,
      clarity_score: parsed.clarity_score ?? parsed.overall_score,
      impact_score: parsed.impact_score ?? parsed.overall_score,
      ats_score: parsed.ats_score ?? parsed.overall_score,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
    });
  } catch (err) {
    console.error("Resume API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Something went wrong." },
      { status: 500 }
    );
  }
}
